import type { GridUltraIconSlotsComponent } from '../models';
import { GridWorkspacesIcon, GridGroupWorkIcon, GridFunctionsIcon } from './icons';

const iconsSlots: GridUltraIconSlotsComponent = {
  ColumnMenuUngroupIcon: GridWorkspacesIcon,
  ColumnMenuGroupIcon: GridGroupWorkIcon,
  ColumnMenuAggregationIcon: GridFunctionsIcon,
};

const materialSlots = {
  ...iconsSlots,
};

export default materialSlots;
