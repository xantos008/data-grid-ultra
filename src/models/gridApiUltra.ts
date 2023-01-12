import {
  GridApiCommon,
  GridStateApi,
  GridStatePersistenceApi,
  GridColumnPinningApi,
  GridDetailPanelApi,
  GridRowPinningApi,
} from '../mediumGrid';
import { GridInitialStateUltra, GridStateUltra } from './gridStateUltra';
import type { GridRowGroupingApi, GridExcelExportApi, GridAggregationApi } from '../hooks';

type GridStateApiUntyped = {
  [key in keyof (GridStateApi<any> & GridStatePersistenceApi<any>)]: any;
};

/**
 * The api of `DataGridUltra`.
 * TODO: Do not redefine manually the pro features
 */
export interface GridApiUltra
  extends Omit<GridApiCommon, keyof GridStateApiUntyped>,
    GridStateApi<GridStateUltra>,
    GridStatePersistenceApi<GridInitialStateUltra>,
    GridColumnPinningApi,
    GridDetailPanelApi,
    GridRowGroupingApi,
    GridExcelExportApi,
    GridAggregationApi,
    GridRowPinningApi {}
