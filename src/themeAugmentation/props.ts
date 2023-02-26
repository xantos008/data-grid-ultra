import { ComponentsOverrides, ComponentsProps } from '@mui/material/styles';
import {DataGridProProps} from "../medium/models/dataGridProProps";
import { DataGridPremiumProps } from '../models/dataGridPremiumProps';

export interface DataGridProComponentsPropsList {
  MuiDataGrid: DataGridProProps;
}

export interface DataGridProComponents<Theme = unknown> {
  MuiDataGrid?: {
    defaultProps?: ComponentsProps['MuiDataGrid'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDataGrid'];
  };
}

export interface DataGridPremiumComponentsPropsList extends DataGridProComponentsPropsList{
  MuiDataGrid: DataGridPremiumProps;
}

export interface DataGridPremiumComponents<Theme = unknown> extends DataGridProComponents{
  MuiDataGrid?: {
    defaultProps?: ComponentsProps['MuiDataGrid'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDataGrid'];
  };
}

declare module '@mui/material/styles' {
  interface ComponentsPropsList extends DataGridPremiumComponentsPropsList {}
  interface Components<Theme = unknown> extends DataGridPremiumComponents<Theme> {}
}
