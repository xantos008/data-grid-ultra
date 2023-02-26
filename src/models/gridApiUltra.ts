import { GridPrivateOnlyApiCommon } from '@mui/x-data-grid/internals';
import {
  GridApiCommon,
  GridColumnPinningApi,
  GridDetailPanelApi,
  GridDetailPanelPrivateApi,
  GridRowPinningApi,
  GridRowMultiSelectionApi,
  GridColumnReorderApi,
  GridRowProApi,
} from 'data-grid-extra';
import { GridInitialStateUltra, GridStateUltra } from './gridStateUltra';
import type { GridRowGroupingApi, GridExcelExportApi, GridAggregationApi } from '../hooks';
import { GridCellSelectionApi } from '../hooks/features/cellSelection/gridCellSelectionInterfaces';

/**
 * The api of `DataGridUltra`.
 * TODO: Do not redefine manually the pro features
 */
export interface GridApiUltra
  extends GridApiCommon<GridStateUltra, GridInitialStateUltra>,
    GridRowProApi,
    GridColumnPinningApi,
    GridDetailPanelApi,
    GridRowGroupingApi,
    GridExcelExportApi,
    GridAggregationApi,
    GridRowPinningApi,
    GridCellSelectionApi,
    // APIs that are private in Community plan, but public in Pro and Premium plans
    GridRowMultiSelectionApi,
    GridColumnReorderApi,
    GridRowProApi {}

export interface GridPrivateApiUltra
  extends GridApiUltra,
    GridPrivateOnlyApiCommon<GridApiUltra, GridPrivateApiUltra>,
    GridDetailPanelPrivateApi {}
