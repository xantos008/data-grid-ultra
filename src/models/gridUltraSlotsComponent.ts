import { GridExtraSlotsComponent, UncapitalizedGridProSlotsComponent } from 'data-grid-extra';
import { UncapitalizeObjectKeys } from 'data-grid-extra/internals';
import { GridUltraIconSlotsComponent } from './gridUltraIconSlotsComponent';

/**
 * Grid components React prop interface containing all the overridable components
 * for Ultra package
 */
export interface GridUltraSlotsComponent
  extends GridExtraSlotsComponent,
    GridUltraIconSlotsComponent {}

// TODO: remove in v7
export interface UncapitalizedGridUltraSlotsComponent
  extends UncapitalizedGridProSlotsComponent,
    UncapitalizeObjectKeys<GridUltraIconSlotsComponent> {}
