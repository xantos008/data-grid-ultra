import * as React from 'react';

export interface GridUltraIconSlotsComponent {
  /**
   * Icon displayed in column menu for ungrouping
   * @default GridWorkspacesIcon
   */
  columnMenuUngroupIcon: React.JSXElementConstructor<any>;
  /**
   * Icon displayed in column menu for grouping
   * @default GridGroupWorkIcon
   */
  columnMenuGroupIcon: React.JSXElementConstructor<any>;
  /**
   * Icon displayed in column menu for aggregation
   * @default GridFunctionsIcon
   */
  columnMenuAggregationIcon: React.JSXElementConstructor<any>;
}
