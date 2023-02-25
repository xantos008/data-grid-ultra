import { GridClassKey } from '../../minimal';

export interface DataGridProComponentNameToClassKey {
  MuiDataGrid: GridClassKey;
}

declare module '@mui/material/styles/overrides' {
  interface ComponentNameToClassKey extends DataGridProComponentNameToClassKey {}
}
