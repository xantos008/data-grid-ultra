import { gridColumnLookupSelector } from 'data-grid-extra';
import { createSelector, createSelectorMemoized } from '@mui/x-data-grid/internals';
import { GridStateUltra } from '../../../models/gridStateUltra';

const gridRowGroupingStateSelector = (state: GridStateUltra) => state.rowGrouping;

export const gridRowGroupingModelSelector = createSelector(
  gridRowGroupingStateSelector,
  (rowGrouping) => rowGrouping.model,
);

export const gridRowGroupingSanitizedModelSelector = createSelectorMemoized(
  gridRowGroupingModelSelector,
  gridColumnLookupSelector,
  (model, columnsLookup) =>
    model.filter((field) => !!columnsLookup[field] && columnsLookup[field].groupable),
);
