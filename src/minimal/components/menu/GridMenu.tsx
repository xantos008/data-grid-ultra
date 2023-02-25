import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ClickAwayListener, { ClickAwayListenerProps } from '@mui/material/ClickAwayListener';
import { unstable_composeClasses as composeClasses, HTMLElementType } from '@mui/utils';
import Grow, { GrowProps } from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper, { PopperProps } from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import { getDataGridUtilityClass, gridClasses } from '../../constants/gridClasses';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';

type MenuPosition =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top'
  | undefined;

type OwnerState = DataGridProcessedProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['menu'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridMenuRoot = styled(Popper, {
  name: 'MuiDataGrid',
  slot: 'Menu',
  overridesResolver: (_, styles) => styles.menu,
})<{ ownerState: OwnerState }>(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  [`& .${gridClasses.menuList}`]: {
    outline: 0,
  },
}));

export interface GridMenuProps extends Omit<PopperProps, 'onKeyDown' | 'children'> {
  open: boolean;
  target: HTMLElement | null;
  onClickAway: ClickAwayListenerProps['onClickAway'];
  position?: MenuPosition;
  onExited?: GrowProps['onExited'];
  children: React.ReactNode;
}

const transformOrigin = {
  'bottom-start': 'top left',
  'bottom-end': 'top right',
};

function GridMenu(props: GridMenuProps) {
  const { open, target, onClickAway, children, position, className, onExited, ...other } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const classes = useUtilityClasses(rootProps);

  React.useEffect(() => {
    // Emit menuOpen or menuClose events
    const eventName = open ? 'menuOpen' : 'menuClose';
    apiRef.current.publishEvent(eventName, { target });
  }, [apiRef, open, target]);

  const handleExited = (popperOnExited: (() => void) | undefined) => (node: HTMLElement) => {
    if (popperOnExited) {
      popperOnExited();
    }

    if (onExited) {
      onExited(node);
    }
  };

  return (
    <GridMenuRoot
      as={rootProps.slots.basePopper}
      className={clsx(className, classes.root)}
      ownerState={rootProps}
      open={open}
      anchorEl={target as any}
      transition
      placement={position}
      {...other}
      {...rootProps.slotProps?.basePopper}
    >
      {({ TransitionProps, placement }) => (
        <ClickAwayListener onClickAway={onClickAway} mouseEvent="onMouseDown">
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: transformOrigin[placement as keyof typeof transformOrigin] }}
            onExited={handleExited(TransitionProps?.onExited)}
          >
            <Paper>{children}</Paper>
          </Grow>
        </ClickAwayListener>
      )}
    </GridMenuRoot>
  );
}

GridMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,
  onClickAway: PropTypes.func.isRequired,
  onExited: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  position: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  target: HTMLElementType,
} as any;

export { GridMenu };
