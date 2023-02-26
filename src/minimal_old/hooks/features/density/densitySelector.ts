import { createSelector } from '../../../utils/createSelector';
import { GridStateCommunity } from '../../../models/gridStateCommunity';

export const gridDensitySelector = (state: GridStateCommunity) => state.density;

export const gridDensityValueSelector = createSelector(
  gridDensitySelector,
  (density) => density.value,
);

export const gridDensityFactorSelector = createSelector(
  gridDensitySelector,
  (density) => density.factor,
);
