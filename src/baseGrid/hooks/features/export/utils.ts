import * as React from 'react';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { gridColumnDefinitionsSelector, gridVisibleColumnDefinitionsSelector } from '../columns';
import { GridExportOptions, GridCsvGetRowsToExportParams } from '../../../models/gridExport';
import { GridStateColDef } from '../../../models/colDef/gridColDef';
import { gridFilteredSortedRowIdsSelector } from '../filter';
import { GridRowId } from '../../../models';
import { gridPinnedRowsSelector, gridRowTreeSelector } from '../rows/gridRowsSelector';

interface GridGetColumnsToExportParams {
  /**
   * The API of the grid.
   */
  apiRef: React.MutableRefObject<GridApiCommunity>;
  options: GridExportOptions;
}

export const getColumnsToExport = ({
  apiRef,
  options,
}: GridGetColumnsToExportParams): GridStateColDef[] => {
  const columns = gridColumnDefinitionsSelector(apiRef);

  if (options.fields) {
    return options.fields
      .map((field) => columns.find((column) => column.field === field))
      .filter((column): column is GridStateColDef => !!column);
  }

  const validColumns = options.allColumns ? columns : gridVisibleColumnDefinitionsSelector(apiRef);
  return validColumns.filter((column) => !column.disableExport);
};

export const defaultGetRowsToExport = ({ apiRef }: GridCsvGetRowsToExportParams): GridRowId[] => {
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const rowTree = gridRowTreeSelector(apiRef);
  const selectedRows = apiRef.current.getSelectedRows();
  const bodyRows = filteredSortedRowIds.filter((id) => (rowTree[id].position ?? 'body') === 'body');
  const pinnedRows = gridPinnedRowsSelector(apiRef);
  const topPinnedRowsIds = pinnedRows?.top?.map((row) => row.id) || [];
  const bottomPinnedRowsIds = pinnedRows?.bottom?.map((row) => row.id) || [];

  bodyRows.unshift(...topPinnedRowsIds);
  bodyRows.push(...bottomPinnedRowsIds);

  if (selectedRows.size > 0) {
    return bodyRows.filter((id) => selectedRows.has(id));
  }

  return bodyRows;
};
