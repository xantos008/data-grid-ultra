import { GridClassKey } from '../baseGrid';

export interface DataGridPremiumComponentNameToClassKey {
  MuiDataGrid: GridClassKey;
}

declare module '@mui/material/styles/overrides' {
  interface ComponentNameToClassKey extends DataGridPremiumComponentNameToClassKey {}
}
