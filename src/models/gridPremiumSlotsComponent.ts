import { GridProSlotsComponent, UncapitalizedGridProSlotsComponent } from '../medium';
import { UncapitalizeObjectKeys } from '../medium/internals';
import { GridPremiumIconSlotsComponent } from './gridPremiumIconSlotsComponent';

/**
 * Grid components React prop interface containing all the overridable components
 * for Premium package
 */
export interface GridPremiumSlotsComponent
  extends GridProSlotsComponent,
    GridPremiumIconSlotsComponent {}

// TODO: remove in v7
export interface UncapitalizedGridPremiumSlotsComponent
  extends UncapitalizedGridProSlotsComponent,
    UncapitalizeObjectKeys<GridPremiumIconSlotsComponent> {}
