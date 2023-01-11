import { createSelector } from '../../../../baseGrid/internals';
import { GridStatePro } from '../../../models/gridStatePro';

export const gridColumnResizeSelector = (state: GridStatePro) => state.columnResize;

export const gridResizingColumnFieldSelector = createSelector(
  gridColumnResizeSelector,
  (columnResize) => columnResize.resizingColumnField,
);
