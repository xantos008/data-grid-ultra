import { DATA_GRID_EXTRA_DEFAULT_SLOTS_COMPONENTS } from 'data-grid-extra/internals';
import { GridUltraSlotsComponent, GridUltraIconSlotsComponent } from '../models';
import { GridWorkspacesIcon, GridGroupWorkIcon, GridFunctionsIcon } from '../components';
import { GridUltraColumnMenu } from '../components/GridUltraColumnMenu';

export const DEFAULT_GRID_ULTRA_ICON_SLOTS_COMPONENTS: GridUltraIconSlotsComponent = {
  ColumnMenuUngroupIcon: GridWorkspacesIcon,
  ColumnMenuGroupIcon: GridGroupWorkIcon,
  ColumnMenuAggregationIcon: GridFunctionsIcon,
};

export const DATA_GRID_ULTRA_DEFAULT_SLOTS_COMPONENTS: GridUltraSlotsComponent = {
  ...DATA_GRID_EXTRA_DEFAULT_SLOTS_COMPONENTS,
  ...DEFAULT_GRID_ULTRA_ICON_SLOTS_COMPONENTS,
  ColumnMenu: GridUltraColumnMenu,
};
