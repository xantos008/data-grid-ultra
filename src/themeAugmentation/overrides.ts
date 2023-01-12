import { GridClassKey } from '../baseGrid';

export interface DataGridUltraComponentNameToClassKey {
  MuiDataGrid: GridClassKey;
}

declare module '@mui/material/styles/overrides' {
  interface ComponentNameToClassKey extends DataGridUltraComponentNameToClassKey {}
}
