import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridParamsApi } from '../../../models/api/gridParamsApi';
import { GridRowId, GridTreeNodeWithRender } from '../../../models/gridRows';
import { GridCellParams, GridValueGetterParams } from '../../../models/params/gridCellParams';
import { GridRowParams } from '../../../models/params/gridRowParams';
import {
  getGridCellElement,
  getGridColumnHeaderElement,
  getGridRowElement,
} from '../../../utils/domUtils';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridFocusCellSelector, gridTabIndexCellSelector } from '../focus/gridFocusStateSelector';

let warnedOnceMissingColumn = false;
function warnMissingColumn(field: string) {
  console.warn(
    [
      `MUI: You are calling getValue('${field}') but the column \`${field}\` is not defined.`,
      `Instead, you can access the data from \`params.row.${field}\`.`,
    ].join('\n'),
  );
  warnedOnceMissingColumn = true;
}

/**
 * @requires useGridColumns (method)
 * @requires useGridRows (method)
 * @requires useGridFocus (state)
 * @requires useGridEditing (method)
 * TODO: Impossible priority - useGridEditing also needs to be after useGridParamsApi
 * TODO: Impossible priority - useGridFocus also needs to be after useGridParamsApi
 */
export function useGridParamsApi(apiRef: React.MutableRefObject<GridPrivateApiCommunity>) {
  const getColumnHeaderParams = React.useCallback<GridParamsApi['getColumnHeaderParams']>(
    (field) => ({
      field,
      colDef: apiRef.current.getColumn(field),
    }),
    [apiRef],
  );

  const getRowParams = React.useCallback<GridParamsApi['getRowParams']>(
    (id) => {
      const row = apiRef.current.getRow(id);

      if (!row) {
        throw new Error(`No row with id #${id} found`);
      }

      const params: GridRowParams = {
        id,
        columns: apiRef.current.getAllColumns(),
        row,
      };
      return params;
    },
    [apiRef],
  );

  const getBaseCellParams = React.useCallback(
    (id: GridRowId, field: string) => {
      const row = apiRef.current.getRow(id);
      const rowNode = apiRef.current.getRowNode<GridTreeNodeWithRender>(id);

      if (!row || !rowNode) {
        throw new Error(`No row with id #${id} found`);
      }

      const cellFocus = gridFocusCellSelector(apiRef);
      const cellTabIndex = gridTabIndexCellSelector(apiRef);

      const params: GridValueGetterParams = {
        id,
        field,
        row,
        rowNode,
        value: row[field],
        colDef: apiRef.current.getColumn(field),
        cellMode: apiRef.current.getCellMode(id, field),
        api: apiRef.current,
        hasFocus: cellFocus !== null && cellFocus.field === field && cellFocus.id === id,
        tabIndex: cellTabIndex && cellTabIndex.field === field && cellTabIndex.id === id ? 0 : -1,
      };

      return params;
    },
    [apiRef],
  );

  const getCellParams = React.useCallback<GridParamsApi['getCellParams']>(
    (id, field) => {
      const colDef = apiRef.current.getColumn(field);
      const value = apiRef.current.getCellValue(id, field);
      const row = apiRef.current.getRow(id);
      const rowNode = apiRef.current.getRowNode(id);

      if (!row || !rowNode) {
        throw new Error(`No row with id #${id} found`);
      }

      const cellFocus = gridFocusCellSelector(apiRef);
      const cellTabIndex = gridTabIndexCellSelector(apiRef);

      const params: GridCellParams<any, any, any, any> = {
        id,
        field,
        row,
        rowNode,
        colDef,
        cellMode: apiRef.current.getCellMode(id, field),
        hasFocus: cellFocus !== null && cellFocus.field === field && cellFocus.id === id,
        tabIndex: cellTabIndex && cellTabIndex.field === field && cellTabIndex.id === id ? 0 : -1,
        value,
        formattedValue: value,
      };
      if (colDef && colDef.valueFormatter) {
        params.formattedValue = colDef.valueFormatter({
          id,
          field: params.field,
          value: params.value,
          api: apiRef.current,
        });
      }
      params.isEditable = colDef && apiRef.current.isCellEditable(params);

      return params;
    },
    [apiRef],
  );

  const getCellValue = React.useCallback<GridParamsApi['getCellValue']>(
    (id, field) => {
      const colDef = apiRef.current.getColumn(field);

      if (process.env.NODE_ENV !== 'production') {
        if (!colDef && !warnedOnceMissingColumn) {
          warnMissingColumn(field);
        }
      }

      if (!colDef || !colDef.valueGetter) {
        const rowModel = apiRef.current.getRow(id);

        if (!rowModel) {
          throw new Error(`No row with id #${id} found`);
        }

        return rowModel[field];
      }

      return colDef.valueGetter(getBaseCellParams(id, field));
    },
    [apiRef, getBaseCellParams],
  );

  const getColumnHeaderElement = React.useCallback<GridParamsApi['getColumnHeaderElement']>(
    (field) => {
      if (!apiRef.current.rootElementRef!.current) {
        return null;
      }
      return getGridColumnHeaderElement(apiRef.current.rootElementRef!.current!, field);
    },
    [apiRef],
  );
  const getRowElement = React.useCallback<GridParamsApi['getRowElement']>(
    (id) => {
      if (!apiRef.current.rootElementRef!.current) {
        return null;
      }
      return getGridRowElement(apiRef.current.rootElementRef!.current!, id);
    },
    [apiRef],
  );

  const getCellElement = React.useCallback<GridParamsApi['getCellElement']>(
    (id, field) => {
      if (!apiRef.current.rootElementRef!.current) {
        return null;
      }
      return getGridCellElement(apiRef.current.rootElementRef!.current!, { id, field });
    },
    [apiRef],
  );

  const paramsApi: GridParamsApi = {
    getCellValue,
    getCellParams,
    getCellElement,
    getRowParams,
    getRowElement,
    getColumnHeaderParams,
    getColumnHeaderElement,
  };

  useGridApiMethod(apiRef, paramsApi, 'public');
}
