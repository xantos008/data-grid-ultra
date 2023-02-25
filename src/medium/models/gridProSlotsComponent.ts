import { GridSlotsComponent, UncapitalizedGridSlotsComponent } from '../../minimal';
import { UncapitalizeObjectKeys } from '../../minimal/internals';
import { GridProIconSlotsComponent } from './gridProIconSlotsComponent';

/**
 * Grid components React prop interface containing all the overridable components
 * for Pro package
 */
export interface GridProSlotsComponent extends GridSlotsComponent, GridProIconSlotsComponent {}

// TODO: remove in v7
export interface UncapitalizedGridProSlotsComponent
  extends UncapitalizedGridSlotsComponent,
    UncapitalizeObjectKeys<GridProIconSlotsComponent> {}
