import {
  GridInitialState as GridInitialStateExtra,
  GridState as GridStateExtra,
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
export interface GridStateUltra extends GridStateExtra {
  rowGrouping: GridRowGroupingState;
  aggregation: GridAggregationState;
  cellSelection: GridCellSelectionModel;
}

/**
 * The initial state of `DataGridUltra`.
 */
export interface GridInitialStateUltra extends GridInitialStateExtra {
  rowGrouping?: GridRowGroupingInitialState;
  aggregation?: GridAggregationInitialState;
  cellSelection?: GridCellSelectionModel;
}
