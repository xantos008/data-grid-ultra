import { GridCellParams, GridKeyValue, GridValidRowModel } from 'data-grid-extra';
import type {
  GridControlledStateEventLookupExtra,
  GridApiCachesExtra,
  GridEventLookupExtra,
} from 'data-grid-extra/typeOverloads';
import type { GridGroupingValueGetterParams } from '../models';
import type {
  GridRowGroupingModel,
  GridAggregationModel,
  GridAggregationCellMeta,
  GridAggregationHeaderMeta,
  GridCellSelectionModel,
} from '../hooks';
import { GridRowGroupingInternalCache } from '../hooks/features/rowGrouping/gridRowGroupingInterfaces';
import { GridAggregationInternalCache } from '../hooks/features/aggregation/gridAggregationInterfaces';

export interface GridControlledStateEventLookupUltra {
  /**
   * Fired when the aggregation model changes.
   */
  aggregationModelChange: { params: GridAggregationModel };
  /**
   * Fired when the row grouping model changes.
   */
  rowGroupingModelChange: { params: GridRowGroupingModel };
  /**
   * Fired when the selection state of one or multiple cells change.
   */
  cellSelectionChange: { params: GridCellSelectionModel };
  /**
   * Fired when the state of the Excel export task changes
   */
  excelExportStateChange: { params: 'pending' | 'finished' };
}

interface GridEventLookupUltra extends GridEventLookupExtra {
  /**
   * Fired when the clipboard paste operation starts.
   */
  clipboardPasteStart: { params: { data: string[][] } };
  /**
   * Fired when the clipboard paste operation ends.
   */
  clipboardPasteEnd: {};
}

export interface GridColDefUltra<R extends GridValidRowModel = any, V = any, F = V> {
  /**
   * If `true`, the cells of the column can be aggregated based.
   * @default true
   */
  aggregable?: boolean;
  /**
   * Limit the aggregation function usable on this column.
   * By default, the column will have all the aggregation functions that are compatible with its type.
   */
  availableAggregationFunctions?: string[];
  /**
   * Function that transforms a complex cell value into a key that be used for grouping the rows.
   * @param {GridGroupingValueGetterParams} params Object containing parameters for the getter.
   * @returns {GridKeyValue | null | undefined} The cell key.
   */
  groupingValueGetter?: (
    params: GridGroupingValueGetterParams<R, V>,
  ) => GridKeyValue | null | undefined;
  /**
   * Function that takes the clipboard-pasted value and converts it to a value used internally.
   * @param {string} value The pasted value.
   * @param {GridCellParams<R, V, F>} params The cell params.
   * @returns {V} The converted value.
   */
  pastedValueParser?: (value: string, params: GridCellParams<R, V, F>) => V | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GridRenderCellParamsUltra<R extends GridValidRowModel = any, V = any, F = V> {
  aggregation?: GridAggregationCellMeta;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GridColumnHeaderParamsUltra<R extends GridValidRowModel = any, V = any, F = V> {
  aggregation?: GridAggregationHeaderMeta;
}

export interface GridApiCachesUltra extends GridApiCachesExtra {
  rowGrouping: GridRowGroupingInternalCache;
  aggregation: GridAggregationInternalCache;
}

declare module 'data-grid-extra' {
  interface GridEventLookup extends GridEventLookupUltra {}

  interface GridControlledStateEventLookup
    extends GridControlledStateEventLookupExtra,
      GridControlledStateEventLookupUltra {}

  interface GridRenderCellParams<R, V, F> extends GridRenderCellParamsUltra<R, V, F> {}

  interface GridColumnHeaderParams<R, V, F> extends GridColumnHeaderParamsUltra<R, V, F> {}

  interface GridApiCaches extends GridApiCachesUltra {}
}

declare module 'data-grid-extra/internals' {
  interface GridApiCaches extends GridApiCachesUltra {}

  interface GridBaseColDef<R, V, F> extends GridColDefUltra<R, V, F> {}
}
