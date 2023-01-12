import { gridColumnLookupSelector } from '../../../mediumGrid';
import { createSelector } from '../../../mediumGrid/internals';
import { GridStateUltra } from '../../../models/gridStateUltra';

export const gridRowGroupingStateSelector = (state: GridStateUltra) => state.rowGrouping;

export const gridRowGroupingModelSelector = createSelector(
  gridRowGroupingStateSelector,
  (rowGrouping) => rowGrouping.model,
);

export const gridRowGroupingSanitizedModelSelector = createSelector(
  gridRowGroupingModelSelector,
  gridColumnLookupSelector,
  (model, columnsLookup) =>
    model.filter((field) => !!columnsLookup[field] && columnsLookup[field].groupable),
);
