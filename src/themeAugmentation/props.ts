import { ComponentsOverrides, ComponentsProps } from '@mui/material/styles';
import { DataGridUltraProps } from '../models/dataGridUltraProps';

export interface DataGridUltraComponentsPropsList {
  MuiDataGrid: DataGridUltraProps;
}

export interface DataGridUltraComponents<Theme = unknown> {
  MuiDataGrid?: {
    defaultProps?: ComponentsProps['MuiDataGrid'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDataGrid'];
  };
}

declare module '@mui/material/styles' {
  interface ComponentsPropsList extends DataGridUltraComponentsPropsList {}
  interface Components<Theme = unknown> extends DataGridUltraComponents<Theme> {}
}
