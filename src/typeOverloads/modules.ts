import { GridKeyValue, GridValidRowModel } from '../mediumGrid';
import type {
  GridControlledStateEventLookupPro,
  GridApiCachesPro,
} from '../mediumGrid/typeOverloads';
import type { GridGroupingValueGetterParams } from '../models';
import type {
  GridRowGroupingModel,
  GridAggregationModel,
  GridAggregationCellMeta,
  GridAggregationHeaderMeta,
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
    params: GridGroupingValueGetterParams<V, R>,
  ) => GridKeyValue | null | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GridRenderCellParamsPremium<V = any, R extends GridValidRowModel = any, F = V> {
  aggregation?: GridAggregationCellMeta;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GridColumnHeaderParamsPremium<V = any, R extends GridValidRowModel = any, F = V> {
  aggregation?: GridAggregationHeaderMeta;
}

export interface GridApiCachesPremium extends GridApiCachesPro {
  rowGrouping: GridRowGroupingInternalCache;
  aggregation: GridAggregationInternalCache;
}

declare module '../mediumGrid' {
  interface GridColDef<R, V, F> extends GridColDefPremium<R, V, F> {}

  interface GridControlledStateEventLookup
    extends GridControlledStateEventLookupPro,
      GridControlledStateEventLookupPremium {}

  interface GridRenderCellParams<V, R, F> extends GridRenderCellParamsPremium<V, R, F> {}

  interface GridColumnHeaderParams<V, R, F> extends GridColumnHeaderParamsPremium<V, R, F> {}

  interface GridApiCaches extends GridApiCachesPremium {}
}

declare module '../mediumGrid/internals' {
  interface GridApiCaches extends GridApiCachesPremium {}
}
