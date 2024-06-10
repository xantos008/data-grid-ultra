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
import type { DataGridUltraProcessedProps } from './dataGridUltraProps';

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
    GridRowMultiSelectionApi,
    GridColumnReorderApi {}

export interface GridPrivateApiUltra
  extends GridApiUltra,
    GridPrivateOnlyApiCommon<GridApiUltra, GridPrivateApiUltra, DataGridUltraProcessedProps>,
    GridDetailPanelPrivateApi {}
