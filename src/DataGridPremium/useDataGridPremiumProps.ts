import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { DATA_GRID_PRO_PROPS_DEFAULT_VALUES, GRID_DEFAULT_LOCALE_TEXT } from '../medium';
import { computeSlots, uncapitalizeObjectKeys } from '../medium/internals';
import {
  DataGridPremiumProps,
  DataGridPremiumProcessedProps,
  DataGridPremiumPropsWithDefaultValue,
} from '../models/dataGridPremiumProps';
import { GridPremiumSlotsComponent, UncapitalizedGridPremiumSlotsComponent } from '../models';
import { GRID_AGGREGATION_FUNCTIONS } from '../hooks/features/aggregation';
import { DATA_GRID_PREMIUM_DEFAULT_SLOTS_COMPONENTS } from '../constants/dataGridPremiumDefaultSlotsComponents';

/**
 * The default values of `DataGridPremiumPropsWithDefaultValue` to inject in the props of DataGridPremium.
 */
export const DATA_GRID_PREMIUM_PROPS_DEFAULT_VALUES: DataGridPremiumPropsWithDefaultValue = {
  ...DATA_GRID_PRO_PROPS_DEFAULT_VALUES,
  unstable_cellSelection: false,
  disableAggregation: false,
  disableRowGrouping: false,
  rowGroupingColumnMode: 'single',
  aggregationFunctions: GRID_AGGREGATION_FUNCTIONS,
  aggregationRowsScope: 'filtered',
  getAggregationPosition: (groupNode) => (groupNode.depth === -1 ? 'footer' : 'inline'),
};

const defaultSlots = uncapitalizeObjectKeys(DATA_GRID_PREMIUM_DEFAULT_SLOTS_COMPONENTS)!;

export const useDataGridPremiumProps = (inProps: DataGridPremiumProps) => {
  const { components, componentsProps, ...themedProps } = useThemeProps({
    props: inProps,
    name: 'MuiDataGrid',
  });

  const localeText = React.useMemo(
    () => ({ ...GRID_DEFAULT_LOCALE_TEXT, ...themedProps.localeText }),
    [themedProps.localeText],
  );

  const slots = React.useMemo<UncapitalizedGridPremiumSlotsComponent>(
    () =>
      computeSlots<GridPremiumSlotsComponent>({
        defaultSlots,
        components,
        slots: themedProps.slots,
      }),
    [components, themedProps.slots],
  );

  return React.useMemo<DataGridPremiumProcessedProps>(
    () => ({
      ...DATA_GRID_PREMIUM_PROPS_DEFAULT_VALUES,
      ...themedProps,
      slotProps: themedProps.slotProps ?? componentsProps,
      localeText,
      slots,
      signature: 'DataGridPremium',
    }),
    [themedProps, componentsProps, localeText, slots],
  );
};
