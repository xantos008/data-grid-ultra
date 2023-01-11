import {
  GridApiCommon,
  GridStateApi,
  GridStatePersistenceApi,
  GridColumnPinningApi,
  GridDetailPanelApi,
  GridRowPinningApi,
} from '../mediumGrid';
import { GridInitialStatePremium, GridStatePremium } from './gridStatePremium';
import type { GridRowGroupingApi, GridExcelExportApi, GridAggregationApi } from '../hooks';

type GridStateApiUntyped = {
  [key in keyof (GridStateApi<any> & GridStatePersistenceApi<any>)]: any;
};

/**
 * The api of `DataGridPremium`.
 * TODO: Do not redefine manually the pro features
 */
export interface GridApiPremium
  extends Omit<GridApiCommon, keyof GridStateApiUntyped>,
    GridStateApi<GridStatePremium>,
    GridStatePersistenceApi<GridInitialStatePremium>,
    GridColumnPinningApi,
    GridDetailPanelApi,
    GridRowGroupingApi,
    GridExcelExportApi,
    GridAggregationApi,
    GridRowPinningApi {}
