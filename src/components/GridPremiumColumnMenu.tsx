import * as React from 'react';
import PropTypes from 'prop-types';
import {
  GridGenericColumnMenu,
  GridColumnMenuProps,
  GRID_COLUMN_MENU_COMPONENTS,
  GRID_COLUMN_MENU_COMPONENTS_PROPS,
  GridColumnMenuItemProps,
} from '../medium';
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

export const GRID_COLUMN_MENU_COMPONENTS_PREMIUM = {
  ...GRID_COLUMN_MENU_COMPONENTS,
  ColumnMenuAggregationItem: GridColumnMenuAggregationItem,
  ColumnMenuGroupingItem: GridColumnMenuGroupingItem,
};

export const GRID_COLUMN_MENU_COMPONENTS_PROPS_PREMIUM = {
  ...GRID_COLUMN_MENU_COMPONENTS_PROPS,
  columnMenuAggregationItem: { displayOrder: 23 },
  columnMenuGroupingItem: { displayOrder: 27 },
};

const GridPremiumColumnMenu = React.forwardRef<HTMLUListElement, GridColumnMenuProps>(
  function GridPremiumColumnMenuSimple(props, ref) {
    return (
      <GridGenericColumnMenu
        ref={ref}
        {...props}
        defaultComponents={GRID_COLUMN_MENU_COMPONENTS_PREMIUM}
        defaultComponentsProps={GRID_COLUMN_MENU_COMPONENTS_PROPS_PREMIUM}
      />
    );
  },
);

GridPremiumColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
} as any;

export { GridPremiumColumnMenu };
