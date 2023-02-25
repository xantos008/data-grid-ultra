import { GridClassKey } from '../minimal';

export interface DataGridPremiumComponentNameToClassKey {
  MuiDataGrid: GridClassKey;
}

declare module '@mui/material/styles/overrides' {
  interface ComponentNameToClassKey extends DataGridPremiumComponentNameToClassKey {}
}
