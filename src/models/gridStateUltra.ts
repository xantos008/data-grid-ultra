import {
  GridInitialState as GridInitialStatePro,
  GridState as GridStatePro,
} from 'data-grid-extra';
import type {
  GridRowGroupingState,
  GridRowGroupingInitialState,
  GridAggregationState,
  GridAggregationInitialState,
  GridCellSelectionModel,
} from '../hooks';

/**
 * The state of `DataGridUltra`.
 */
export interface GridStateUltra extends GridStatePro {
  rowGrouping: GridRowGroupingState;
  aggregation: GridAggregationState;
  cellSelection: GridCellSelectionModel;
}

/**
 * The initial state of `DataGridUltra`.
 */
export interface GridInitialStateUltra extends GridInitialStatePro {
  rowGrouping?: GridRowGroupingInitialState;
  aggregation?: GridAggregationInitialState;
  cellSelection?: GridCellSelectionModel;
}
