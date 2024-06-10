import * as React from 'react';
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
  return <GridColumnMenuRowUngroupItem {...props} />;
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

export const GridUltraColumnMenu = React.forwardRef<HTMLUListElement, GridColumnMenuProps>(
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
