import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { DATA_GRID_EXTRA_PROPS_DEFAULT_VALUES, GRID_DEFAULT_LOCALE_TEXT } from 'data-grid-extra';
import { computeSlots, useProps, uncapitalizeObjectKeys } from 'data-grid-extra/internals';
import {
  DataGridUltraProps,
  DataGridUltraProcessedProps,
  DataGridUltraPropsWithDefaultValue,
} from '../models/dataGridUltraProps';
import { GridUltraSlotsComponent, UncapitalizedGridUltraSlotsComponent } from '../models';
import { GRID_AGGREGATION_FUNCTIONS } from '../hooks/features/aggregation';
import { DATA_GRID_ULTRA_DEFAULT_SLOTS_COMPONENTS } from '../constants/dataGridUltraDefaultSlotsComponents';

/**
 * The default values of `DataGridUltraPropsWithDefaultValue` to inject in the props of DataGridUltra.
 */
export const DATA_GRID_ULTRA_PROPS_DEFAULT_VALUES: DataGridUltraPropsWithDefaultValue = {
  ...DATA_GRID_EXTRA_PROPS_DEFAULT_VALUES,
  unstable_cellSelection: false,
  disableAggregation: false,
  disableRowGrouping: false,
  rowGroupingColumnMode: 'single',
  aggregationFunctions: GRID_AGGREGATION_FUNCTIONS,
  aggregationRowsScope: 'filtered',
  getAggregationPosition: (groupNode) => (groupNode.depth === -1 ? 'footer' : 'inline'),
  disableClipboardPaste: false,
  unstable_splitClipboardPastedText: (pastedText) => {
    // Excel on Windows adds an empty line break at the end of the copied text.
    const text = pastedText.replace(/\r?\n$/, '');
    return text.split(/\r\n|\n|\r/).map((row) => row.split('\t'));
  },
};

const defaultSlots = uncapitalizeObjectKeys(DATA_GRID_ULTRA_DEFAULT_SLOTS_COMPONENTS)!;

export const useDataGridUltraProps = (inProps: DataGridUltraProps) => {
  const [components, componentsProps, themedProps] = useProps(
    useThemeProps({
      props: inProps,
      name: 'MuiDataGrid',
    }),
  );

  const localeText = React.useMemo(
    () => ({ ...GRID_DEFAULT_LOCALE_TEXT, ...themedProps.localeText }),
    [themedProps.localeText],
  );

  const slots = React.useMemo<UncapitalizedGridUltraSlotsComponent>(
    () =>
      computeSlots<GridUltraSlotsComponent>({
        defaultSlots,
        components,
        slots: themedProps.slots,
      }),
    [components, themedProps.slots],
  );

  return React.useMemo<DataGridUltraProcessedProps>(
    () => ({
      ...DATA_GRID_ULTRA_PROPS_DEFAULT_VALUES,
      ...themedProps,
      slotProps: themedProps.slotProps ?? componentsProps,
      localeText,
      slots,
      signature: 'DataGridUltra',
    }),
    [themedProps, componentsProps, localeText, slots],
  );
};
