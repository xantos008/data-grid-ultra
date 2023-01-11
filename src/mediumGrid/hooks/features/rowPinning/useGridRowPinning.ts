import * as React from 'react';
import { useGridApiMethod } from '../../../../baseGrid';
import { getRowIdFromRowModel, GridStateInitializer } from '../../../../baseGrid/internals';

import { GridApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps, DataGridProProps } from '../../../models/dataGridProProps';
import {
  GridPinnedRowsProp,
  GridRowPinningApi,
  GridRowPinningInternalCache,
} from './gridRowPinningInterface';

function createPinnedRowsInternalCache(
  pinnedRows: GridPinnedRowsProp | undefined,
  getRowId: DataGridProProps['getRowId'],
) {
  const cache: GridRowPinningInternalCache = {
    topIds: [],
    bottomIds: [],
    idLookup: {},
  };

  pinnedRows?.top?.forEach((rowModel) => {
    const id = getRowIdFromRowModel(rowModel, getRowId);
    cache.topIds.push(id);
    cache.idLookup[id] = rowModel;
  });

  pinnedRows?.bottom?.forEach((rowModel) => {
    const id = getRowIdFromRowModel(rowModel, getRowId);
    cache.bottomIds.push(id);
    cache.idLookup[id] = rowModel;
  });

  return cache;
}

export const rowPinningStateInitializer: GridStateInitializer<
  Pick<DataGridProProcessedProps, 'pinnedRows' | 'getRowId' | 'experimentalFeatures'>
> = (state, props, apiRef) => {
  if (!props.experimentalFeatures?.rowPinning) {
    return state;
  }

  apiRef.current.unstable_caches.pinnedRows = createPinnedRowsInternalCache(
    props.pinnedRows,
    props.getRowId,
  );

  return {
    ...state,
    rows: {
      ...state.rows,
      additionalRowGroups: {
        ...state.rows?.additionalRowGroups,
        pinnedRows: { top: [], bottom: [] },
      },
    },
  };
};

export const useGridRowPinning = (
  apiRef: React.MutableRefObject<GridApiPro>,
  props: Pick<DataGridProProcessedProps, 'pinnedRows' | 'getRowId' | 'experimentalFeatures'>,
): void => {
  const setPinnedRows = React.useCallback<GridRowPinningApi['unstable_setPinnedRows']>(
    (newPinnedRows) => {
      if (!props.experimentalFeatures?.rowPinning) {
        return;
      }

      apiRef.current.unstable_caches.pinnedRows = createPinnedRowsInternalCache(
        newPinnedRows,
        props.getRowId,
      );

      apiRef.current.unstable_requestPipeProcessorsApplication('hydrateRows');
    },
    [apiRef, props.experimentalFeatures?.rowPinning, props.getRowId],
  );

  useGridApiMethod(
    apiRef,
    {
      unstable_setPinnedRows: setPinnedRows,
    },
    'rowPinningApi',
  );

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    apiRef.current.unstable_setPinnedRows(props.pinnedRows);
  }, [apiRef, props.pinnedRows]);
};
