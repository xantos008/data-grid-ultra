import * as React from 'react';
import {
  GridCallbackDetails,
  GridValidRowModel,
  GridRowTreeNodeConfig,
} from '../mediumGrid';
import {
  GridExperimentalProFeatures,
  DataGridProPropsWithDefaultValue,
  DataGridProPropsWithoutDefaultValue,
  DataGridPropsWithComplexDefaultValueAfterProcessing,
  DataGridPropsWithComplexDefaultValueBeforeProcessing,
} from '../mediumGrid/internals';
import type { GridRowGroupingModel } from '../hooks/features/rowGrouping';
import type {
  GridAggregationModel,
  GridAggregationFunction,
  GridAggregationPosition,
} from '../hooks/features/aggregation';
import { GridInitialStateUltra } from './gridStateUltra';
import { GridApiUltra } from './gridApiUltra';

export interface GridExperimentalUltraFeatures extends GridExperimentalProFeatures {
  /**
   * Enables the aggregation feature.
   */
  aggregation: boolean;
}

/**
 * The props users can give to the `DataGridProProps` component.
 */
export interface DataGridUltraProps<R extends GridValidRowModel = any>
  extends Omit<
    Partial<DataGridUltraPropsWithDefaultValue> &
      DataGridPropsWithComplexDefaultValueBeforeProcessing &
      DataGridUltraPropsWithoutDefaultValue<R>,
    DataGridUltraForcedPropsKey
  > {
  /**
   * Features under development.
   * For each feature, if the flag is not explicitly set to `true`, the feature will be fully disabled and any property / method call will not have any effect.
   */
  experimentalFeatures?: Partial<GridExperimentalUltraFeatures>;
}

/**
 * The props of the `DataGridUltra` component after the pre-processing phase.
 */
export interface DataGridUltraProcessedProps
  extends DataGridUltraPropsWithDefaultValue,
    DataGridPropsWithComplexDefaultValueAfterProcessing,
    DataGridUltraPropsWithoutDefaultValue {}

export type DataGridUltraForcedPropsKey = 'signature';

/**
 * The `DataGridUltra` options with a default value overridable through props
 * None of the entry of this interface should be optional, they all have default values and `DataGridProps` already applies a `Partial<DataGridSimpleOptions>` for the public interface
 * The controlled model do not have a default value at the prop processing level, so they must be defined in `DataGridOtherProps`
 */
export interface DataGridUltraPropsWithDefaultValue extends DataGridProPropsWithDefaultValue {
  /**
   * If `true`, aggregation is disabled.
   * @default false
   */
  disableAggregation: boolean;
  /**
   * If `true`, the row grouping is disabled.
   * @default false
   */
  disableRowGrouping: boolean;
  /**
   * If `single`, all column we are grouping by will be represented in the same grouping the same column.
   * If `multiple`, each column we are grouping by will be represented in its own column.
   * @default 'single'
   */
  rowGroupingColumnMode: 'single' | 'multiple';
  /**
   * Aggregation functions available on the grid.
   * @default GRID_AGGREGATION_FUNCTIONS
   */
  aggregationFunctions: Record<string, GridAggregationFunction>;
  /**
   * Rows used to generate the aggregated value.
   * If `filtered`, the aggregated values will be generated using only the rows currently passing the filtering process.
   * If `all`, the aggregated values will be generated using all the rows.
   * @default "filtered"
   */
  aggregationRowsScope: 'filtered' | 'all';
  /**
   * Determines the position of an aggregated value.
   * @param {GridRowTreeNodeConfig | null} groupNode The current group (`null` being the top level group).
   * @returns {GridAggregationPosition | null} Position of the aggregated value (if `null`, the group will not be aggregated).
   * @default `(groupNode) => groupNode == null ? 'footer' : 'inline'`
   */
  getAggregationPosition: (
    groupNode: GridRowTreeNodeConfig | null,
  ) => GridAggregationPosition | null;
}

export interface DataGridUltraPropsWithoutDefaultValue<R extends GridValidRowModel = any>
  extends Omit<DataGridProPropsWithoutDefaultValue<R>, 'initialState' | 'apiRef'> {
  /**
   * The ref object that allows grid manipulation. Can be instantiated with [[useGridApiRef()]].
   */
  apiRef?: React.MutableRefObject<GridApiUltra>;
  /**
   * The initial state of the DataGridUltra.
   * The data in it will be set in the state on initialization but will not be controlled.
   * If one of the data in `initialState` is also being controlled, then the control state wins.
   */
  initialState?: GridInitialStateUltra;
  /**
   * Set the row grouping model of the grid.
   */
  rowGroupingModel?: GridRowGroupingModel;
  /**
   * Callback fired when the row grouping model changes.
   * @param {GridRowGroupingModel} model Columns used as grouping criteria.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onRowGroupingModelChange?: (model: GridRowGroupingModel, details: GridCallbackDetails) => void;
  /**
   * Set the aggregation model of the grid.
   */
  aggregationModel?: GridAggregationModel;
  /**
   * Callback fired when the row grouping model changes.
   * @param {GridAggregationModel} model The aggregated columns.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onAggregationModelChange?: (model: GridAggregationModel, details: GridCallbackDetails) => void;
}
