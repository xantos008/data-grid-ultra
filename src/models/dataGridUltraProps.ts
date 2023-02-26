import * as React from 'react';
import { GridCallbackDetails, GridValidRowModel, GridGroupNode } from 'data-grid-extra';
import {
  GridExperimentalExtraFeatures,
  DataGridExtraPropsWithDefaultValue,
  DataGridExtraPropsWithoutDefaultValue,
  DataGridPropsWithComplexDefaultValueAfterProcessing,
  DataGridPropsWithComplexDefaultValueBeforeProcessing,
} from 'data-grid-extra/internals';
import type { GridRowGroupingModel } from '../hooks/features/rowGrouping';
import type {
  GridAggregationModel,
  GridAggregationFunction,
  GridAggregationPosition,
} from '../hooks/features/aggregation';
import {
  GridUltraSlotsComponent,
  UncapitalizedGridUltraSlotsComponent,
} from './gridUltraSlotsComponent';
import { GridInitialStateUltra } from './gridStateUltra';
import { GridApiUltra } from './gridApiUltra';
import { GridCellSelectionModel } from '../hooks/features/cellSelection';

export interface GridExperimentalUltraFeatures extends GridExperimentalExtraFeatures {}

export interface DataGridUltraPropsWithComplexDefaultValueBeforeProcessing
  extends Pick<DataGridPropsWithComplexDefaultValueBeforeProcessing, 'localeText'> {
  /**
   * Overrideable components.
   * @deprecated Use the `slots` prop instead.
   */
  components?: Partial<GridUltraSlotsComponent>;
  /**
   * Overrideable components.
   */
  slots?: Partial<UncapitalizedGridUltraSlotsComponent>;
}

/**
 * The props users can give to the `DataGridUltraProps` component.
 */
export interface DataGridUltraProps<R extends GridValidRowModel = any>
  extends Omit<
    Partial<DataGridUltraPropsWithDefaultValue> &
      DataGridUltraPropsWithComplexDefaultValueBeforeProcessing &
      DataGridUltraPropsWithoutDefaultValue<R>,
    DataGridUltraForcedPropsKey
  > {
  /**
   * Unstable features, breaking changes might be introduced.
   * For each feature, if the flag is not explicitly set to `true`, then the feature is fully disabled, and neither property nor method calls will have any effect.
   */
  experimentalFeatures?: Partial<GridExperimentalUltraFeatures>;
}

export interface DataGridUltraPropsWithComplexDefaultValueAfterProcessing
  extends Pick<DataGridPropsWithComplexDefaultValueAfterProcessing, 'localeText'> {
  slots: UncapitalizedGridUltraSlotsComponent;
}

/**
 * The props of the `DataGridUltra` component after the pre-processing phase.
 */
export interface DataGridUltraProcessedProps
  extends DataGridUltraPropsWithDefaultValue,
    DataGridUltraPropsWithComplexDefaultValueAfterProcessing,
    Omit<DataGridUltraPropsWithoutDefaultValue, 'componentsProps'> {}

export type DataGridUltraForcedPropsKey = 'signature';

/**
 * The `DataGridUltra` options with a default value overridable through props.
 * None of the entry of this interface should be optional, they all have default values and `DataGridProps` already applies a `Partial<DataGridSimpleOptions>` for the public interface.
 * The controlled model do not have a default value at the prop processing level, so they must be defined in `DataGridOtherProps`.
 */
export interface DataGridUltraPropsWithDefaultValue extends DataGridExtraPropsWithDefaultValue {
  /**
   * If `true`, the cell selection mode is enabled.
   * @default false
   */
  unstable_cellSelection: boolean;
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
   * If `single`, all the columns that are grouped are represented in the same grid column.
   * If `multiple`, each column that is grouped is represented in its own grid column.
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
   * If `filtered`, the aggregated values are generated using only the rows currently passing the filtering process.
   * If `all`, the aggregated values are generated using all the rows.
   * @default "filtered"
   */
  aggregationRowsScope: 'filtered' | 'all';
  /**
   * Determines the position of an aggregated value.
   * @param {GridGroupNode} groupNode The current group.
   * @returns {GridAggregationPosition | null} Position of the aggregated value (if `null`, the group isn't aggregated).
   * @default `(groupNode) => groupNode == null ? 'footer' : 'inline'`
   */
  getAggregationPosition: (groupNode: GridGroupNode) => GridAggregationPosition | null;
}

export interface DataGridUltraPropsWithoutDefaultValue<R extends GridValidRowModel = any>
  extends Omit<DataGridExtraPropsWithoutDefaultValue<R>, 'initialState' | 'apiRef'> {
  /**
   * The ref object that allows grid manipulation. Can be instantiated with `useGridApiRef()`.
   */
  apiRef?: React.MutableRefObject<GridApiUltra>;
  /**
   * The initial state of the DataGridUltra.
   * The data in it is set in the state on initialization but isn't controlled.
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
  /**
   * Set the cell selection model of the grid.
   */
  unstable_cellSelectionModel?: GridCellSelectionModel;
  /**
   * Callback fired when the selection state of one or multiple cells changes.
   * @param {GridCellSelectionModel} cellSelectionModel Object in the shape of [[GridCellSelectionModel]] containg the selected cells.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  unstable_onCellSelectionModelChange?: (
    cellSelectionModel: GridCellSelectionModel,
    details: GridCallbackDetails,
  ) => void;
  /**
   * Callback fired when the state of the Excel export changes.
   * @param {string} inProgress Indicates if the task is in progress.
   */
  onExcelExportStateChange?: (inProgress: 'pending' | 'finished') => void;
}
