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
 * The state of `DataGridPremium`.
 */
export interface GridStatePremium extends GridStatePro {
  rowGrouping: GridRowGroupingState;
  aggregation: GridAggregationState;
}

/**
 * The initial state of `DataGridPremium`.
 */
export interface GridInitialStatePremium extends GridInitialStatePro {
  rowGrouping?: GridRowGroupingInitialState;
  aggregation?: GridAggregationInitialState;
}
