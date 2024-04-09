import type { GridUltraIconSlotsComponent } from '../models';
import { GridWorkspacesIcon, GridGroupWorkIcon, GridFunctionsIcon } from './icons';

const iconsSlots: GridUltraIconSlotsComponent = {
  columnMenuUngroupIcon: GridWorkspacesIcon,
  columnMenuGroupIcon: GridGroupWorkIcon,
  columnMenuAggregationIcon: GridFunctionsIcon,
};

const materialSlots = {
  ...iconsSlots,
};

export default materialSlots;
