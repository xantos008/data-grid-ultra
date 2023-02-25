import {
  GridApiCommon,
  GridColumnReorderApi,
  GridRowMultiSelectionApi,
  GridRowProApi,
} from '../../minimal';
import { GridPrivateOnlyApiCommon } from '../../minimal/internals';
import { GridInitialStatePro, GridStatePro } from './gridStatePro';
import type {
  GridColumnPinningApi,
  GridDetailPanelApi,
  GridRowPinningApi,
  GridDetailPanelPrivateApi,
} from '../hooks';

/**
 * The api of `DataGridPro`.
 */
export interface GridApiPro
  extends GridApiCommon<GridStatePro, GridInitialStatePro>,
    GridRowProApi,
    GridColumnPinningApi,
    GridDetailPanelApi,
    GridRowPinningApi,
    // APIs that are private in Community plan, but public in Pro and Premium plans
    GridRowMultiSelectionApi,
    GridColumnReorderApi,
    GridRowProApi {}

export interface GridPrivateApiPro
  extends GridApiPro,
    GridPrivateOnlyApiCommon<GridApiPro, GridPrivateApiPro>,
    GridDetailPanelPrivateApi {}
