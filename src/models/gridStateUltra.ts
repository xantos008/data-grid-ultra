import {
  GridInitialState as GridInitialStatePro,
  GridState as GridStatePro,
} from '../mediumGrid';
import type {
  GridRowGroupingState,
  GridRowGroupingInitialState,
  GridAggregationState,
  GridAggregationInitialState,
} from '../hooks';

/**
 * The state of `DataGridUltra`.
 */
export interface GridStateUltra extends GridStatePro {
  rowGrouping: GridRowGroupingState;
  aggregation: GridAggregationState;
}

/**
 * The initial state of `DataGridUltra`.
 */
export interface GridInitialStateUltra extends GridInitialStatePro {
  rowGrouping?: GridRowGroupingInitialState;
  aggregation?: GridAggregationInitialState;
}
