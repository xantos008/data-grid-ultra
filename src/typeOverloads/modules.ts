import { GridKeyValue, GridValidRowModel } from '../medium';
import type {
  GridControlledStateEventLookupPro,
  GridApiCachesPro,
} from '../medium/typeOverloads';
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

export interface GridControlledStateEventLookupPremium {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GridColDefPremium<R extends GridValidRowModel = any, V = any, F = V> {
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
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GridRenderCellParamsPremium<R extends GridValidRowModel = any, V = any, F = V> {
  aggregation?: GridAggregationCellMeta;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GridColumnHeaderParamsPremium<R extends GridValidRowModel = any, V = any, F = V> {
  aggregation?: GridAggregationHeaderMeta;
}

export interface GridApiCachesPremium extends GridApiCachesPro {
  rowGrouping: GridRowGroupingInternalCache;
  aggregation: GridAggregationInternalCache;
}

declare module '../medium' {
  interface GridControlledStateEventLookup
    extends GridControlledStateEventLookupPro,
      GridControlledStateEventLookupPremium {}

  interface GridRenderCellParams<R, V, F> extends GridRenderCellParamsPremium<R, V, F> {}

  interface GridColumnHeaderParams<R, V, F> extends GridColumnHeaderParamsPremium<R, V, F> {}

  interface GridApiCaches extends GridApiCachesPremium {}
}

declare module '../medium/internals' {
  interface GridApiCaches extends GridApiCachesPremium {}

  interface GridBaseColDef<R, V, F> extends GridColDefPremium<R, V, F> {}
}
