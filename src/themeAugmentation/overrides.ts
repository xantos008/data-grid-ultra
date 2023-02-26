import { GridClassKey } from '@mui/x-data-grid';

export interface DataGridUltraComponentNameToClassKey {
  MuiDataGrid: GridClassKey;
}

declare module '@mui/material/styles/overrides' {
  interface ComponentNameToClassKey extends DataGridUltraComponentNameToClassKey {}
}
