import { DATA_GRID_EXTRA_DEFAULT_SLOTS_COMPONENTS } from 'data-grid-extra/internals';
import type { GridUltraSlotsComponent } from '../models';
import { GridUltraColumnMenu } from '../components/GridUltraColumnMenu';
import materialSlots from '../material';

export const DATA_GRID_ULTRA_DEFAULT_SLOTS_COMPONENTS: GridUltraSlotsComponent = {
  ...DATA_GRID_EXTRA_DEFAULT_SLOTS_COMPONENTS,
  ...materialSlots,
  columnMenu: GridUltraColumnMenu,
};
