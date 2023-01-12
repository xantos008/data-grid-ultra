import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import {
  DATA_GRID_PRO_PROPS_DEFAULT_VALUES,
  DATA_GRID_DEFAULT_SLOTS_COMPONENTS,
  GRID_DEFAULT_LOCALE_TEXT,
  GridSlotsComponent,
} from '../mediumGrid';
import {
  DataGridUltraProps,
  DataGridUltraProcessedProps,
  DataGridUltraPropsWithDefaultValue,
} from '../models/dataGridUltraProps';
import { GRID_AGGREGATION_FUNCTIONS } from '../hooks/features/aggregation';

/**
 * The default values of `DataGridUltraPropsWithDefaultValue` to inject in the props of DataGridUltra.
 */
export const DATA_GRID_PREMIUM_PROPS_DEFAULT_VALUES: DataGridUltraPropsWithDefaultValue = {
  ...DATA_GRID_PRO_PROPS_DEFAULT_VALUES,
  disableAggregation: false,
  disableRowGrouping: false,
  rowGroupingColumnMode: 'single',
  aggregationFunctions: GRID_AGGREGATION_FUNCTIONS,
  aggregationRowsScope: 'filtered',
  getAggregationPosition: (groupNode) => (groupNode == null ? 'footer' : 'inline'),
};

export const useDataGridUltraProps = (inProps: DataGridUltraProps) => {
  const themedProps = useThemeProps({ props: inProps, name: 'MuiDataGrid' });

  const localeText = React.useMemo(
    () => ({ ...GRID_DEFAULT_LOCALE_TEXT, ...themedProps.localeText }),
    [themedProps.localeText],
  );

  const components = React.useMemo<GridSlotsComponent>(() => {
    const overrides = themedProps.components;

    if (!overrides) {
      return { ...DATA_GRID_DEFAULT_SLOTS_COMPONENTS };
    }

    const mergedComponents = {} as GridSlotsComponent;

    type GridSlots = keyof GridSlotsComponent;
    Object.entries(DATA_GRID_DEFAULT_SLOTS_COMPONENTS).forEach(([key, defaultComponent]) => {
      mergedComponents[key as GridSlots] =
        overrides[key as GridSlots] === undefined ? defaultComponent : overrides[key as GridSlots];
    });

    return mergedComponents;
  }, [themedProps.components]);

  return React.useMemo<DataGridUltraProcessedProps>(
    () => ({
      ...DATA_GRID_PREMIUM_PROPS_DEFAULT_VALUES,
      ...themedProps,
      disableAggregation:
        themedProps.disableAggregation || !themedProps.experimentalFeatures?.aggregation,
      localeText,
      components,
      signature: 'DataGridUltra',
    }),
    [themedProps, localeText, components],
  );
};
