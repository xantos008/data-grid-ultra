import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TrapFocus, { TrapFocusProps } from '@mui/material/Unstable_TrapFocus';
import { styled, Theme } from '@mui/material/styles';
import { MUIStyledCommonProps } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';

type OwnerState = DataGridProcessedProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['panelWrapper'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridPanelWrapperRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PanelWrapper',
  overridesResolver: (props, styles) => styles.panelWrapper,
})<{ ownerState: OwnerState }>({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '&:focus': {
    outline: 0,
  },
});

const isEnabled = () => true;

export interface GridPanelWrapperProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
    MUIStyledCommonProps<Theme> {
  slotProps?: {
    TrapFocus?: TrapFocusProps;
  };
}

const GridPanelWrapper = React.forwardRef<HTMLDivElement, GridPanelWrapperProps>(
  function GridPanelWrapper(props, ref) {
    const { className, slotProps = {}, ...other } = props;
    const rootProps = useGridRootProps();
    const classes = useUtilityClasses(rootProps);

    return (
      <TrapFocus open disableEnforceFocus isEnabled={isEnabled} {...slotProps.TrapFocus}>
        <GridPanelWrapperRoot
          ref={ref}
          tabIndex={-1}
          className={clsx(className, classes.root)}
          ownerState={rootProps}
          {...other}
        />
      </TrapFocus>
    );
  },
);

GridPanelWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  slotProps: PropTypes.object,
} as any;

export { GridPanelWrapper };
