import { createSelector } from 'data-grid-extra/internals';
import { GridStateUltra } from '../../../models/gridStateUltra';

export const gridAggregationStateSelector = (state: GridStateUltra) => state.aggregation;

/**
 * Get the aggregation model, containing the aggregation function of each column.
 * If a column is not in the model, it is not aggregated.
 * @category Aggregation
 */
export const gridAggregationModelSelector = createSelector(
  gridAggregationStateSelector,
  (aggregationState) => aggregationState.model,
);

/**
 * Get the aggregation results as a lookup.
 * @category Aggregation
 */
export const gridAggregationLookupSelector = createSelector(
  gridAggregationStateSelector,
  (aggregationState) => aggregationState.lookup,
);
