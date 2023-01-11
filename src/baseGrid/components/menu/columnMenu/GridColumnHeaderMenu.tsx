import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType } from '@mui/utils';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { GridMenu, GridMenuProps } from '../GridMenu';

export interface GridColumnHeaderMenuProps {
  columnMenuId?: string;
  columnMenuButtonId?: string;
  ContentComponent: React.JSXElementConstructor<any>;
  contentComponentProps?: any;
  field: string;
  open: boolean;
  target: HTMLElement | null;
  onExited?: GridMenuProps['onExited'];
}

function GridColumnHeaderMenu({
  columnMenuId,
  columnMenuButtonId,
  ContentComponent,
  contentComponentProps,
  field,
  open,
  target,
  onExited,
}: GridColumnHeaderMenuProps) {
  const apiRef = useGridApiContext();
  const currentColumn = apiRef.current.getColumn(field);

  const hideMenu = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Prevent triggering the sorting
      event.stopPropagation();
      apiRef.current.hideColumnMenu();
    },
    [apiRef],
  );

  if (!target) {
    return null;
  }

  return (
    <GridMenu
      placement={`bottom-${currentColumn!.align === 'right' ? 'start' : 'end'}` as any}
      open={open}
      target={target}
      onClickAway={hideMenu}
      onExited={onExited}
    >
      <ContentComponent
        currentColumn={currentColumn}
        hideMenu={hideMenu}
        open={open}
        id={columnMenuId}
        labelledby={columnMenuButtonId}
        {...contentComponentProps}
      />
    </GridMenu>
  );
}

GridColumnHeaderMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnMenuButtonId: PropTypes.string,
  columnMenuId: PropTypes.string,
  ContentComponent: PropTypes.elementType.isRequired,
  contentComponentProps: PropTypes.any,
  field: PropTypes.string.isRequired,
  onExited: PropTypes.func,
  open: PropTypes.bool.isRequired,
  target: HTMLElementType,
} as any;

export { GridColumnHeaderMenu };
