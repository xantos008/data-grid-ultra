import * as React from 'react';
import PropTypes from 'prop-types';
import {
  GridGenericColumnMenu,
  GridColumnMenuProps,
  GRID_COLUMN_MENU_SLOTS,
  GRID_COLUMN_MENU_SLOT_PROPS,
  GridColumnMenuItemProps,
} from 'data-grid-extra';
import { GridColumnMenuAggregationItem } from './GridColumnMenuAggregationItem';
import { isGroupingColumn } from '../hooks/features/rowGrouping';
import { GridColumnMenuRowGroupItem } from './GridColumnMenuRowGroupItem';
import { GridColumnMenuRowUngroupItem } from './GridColumnMenuRowUngroupItem';

export function GridColumnMenuGroupingItem(props: GridColumnMenuItemProps) {
  const { colDef } = props;
  if (isGroupingColumn(colDef.field)) {
    return <GridColumnMenuRowGroupItem {...props} />;
  }
  if (colDef.groupable) {
    return <GridColumnMenuRowUngroupItem {...props} />;
  }
  return null;
}

export const GRID_COLUMN_MENU_SLOTS_ULTRA = {
  ...GRID_COLUMN_MENU_SLOTS,
  columnMenuAggregationItem: GridColumnMenuAggregationItem,
  columnMenuGroupingItem: GridColumnMenuGroupingItem,
};

export const GRID_COLUMN_MENU_SLOT_PROPS_ULTRA = {
  ...GRID_COLUMN_MENU_SLOT_PROPS,
  columnMenuAggregationItem: { displayOrder: 23 },
  columnMenuGroupingItem: { displayOrder: 27 },
};

const GridUltraColumnMenu = React.forwardRef<HTMLUListElement, GridColumnMenuProps>(
  function GridUltraColumnMenuSimple(props, ref) {
    return (
      <GridGenericColumnMenu
        ref={ref}
        {...props}
        defaultSlots={GRID_COLUMN_MENU_SLOTS_ULTRA}
        defaultSlotProps={GRID_COLUMN_MENU_SLOT_PROPS_ULTRA}
      />
    );
  },
);

GridUltraColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
} as any;

export { GridUltraColumnMenu };
