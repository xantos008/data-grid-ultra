import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { DATA_GRID_EXTRA_PROPS_DEFAULT_VALUES, GRID_DEFAULT_LOCALE_TEXT } from 'data-grid-extra';
import { computeSlots, useProps } from 'data-grid-extra/internals';
import {
  DataGridUltraProps,
  DataGridUltraProcessedProps,
  DataGridUltraPropsWithDefaultValue,
} from '../models/dataGridUltraProps';
import { GridUltraSlotsComponent } from '../models';
import { GRID_AGGREGATION_FUNCTIONS } from '../hooks/features/aggregation';
import { DATA_GRID_ULTRA_DEFAULT_SLOTS_COMPONENTS } from '../constants/dataGridUltraDefaultSlotsComponents';

/**
 * The default values of `DataGridUltraPropsWithDefaultValue` to inject in the props of DataGridUltra.
 */
export const DATA_GRID_ULTRA_PROPS_DEFAULT_VALUES: DataGridUltraPropsWithDefaultValue = {
  ...DATA_GRID_EXTRA_PROPS_DEFAULT_VALUES,
  cellSelection: false,
  disableAggregation: false,
  disableRowGrouping: false,
  rowGroupingColumnMode: 'single',
  aggregationFunctions: GRID_AGGREGATION_FUNCTIONS,
  aggregationRowsScope: 'filtered',
  getAggregationPosition: (groupNode) => (groupNode.depth === -1 ? 'footer' : 'inline'),
  disableClipboardPaste: false,
  splitClipboardPastedText: (pastedText) => {
    // Excel on Windows adds an empty line break at the end of the copied text.
    // See https://github.com/mui/mui-x/issues/9103
    const text = pastedText.replace(/\r?\n$/, '');
    return text.split(/\r\n|\n|\r/).map((row) => row.split('\t'));
  },
};

const defaultSlots = DATA_GRID_ULTRA_DEFAULT_SLOTS_COMPONENTS;

export const useDataGridUltraProps = (inProps: DataGridUltraProps) => {
  const themedProps = useProps(
    // eslint-disable-next-line material-ui/mui-name-matches-component-name
    useThemeProps({
      props: inProps,
      name: 'MuiDataGrid',
    }),
  );

  const localeText = React.useMemo(
    () => ({ ...GRID_DEFAULT_LOCALE_TEXT, ...themedProps.localeText }),
    [themedProps.localeText],
  );

  const slots = React.useMemo<GridUltraSlotsComponent>(
    () =>
      computeSlots<GridUltraSlotsComponent>({
        defaultSlots,
        slots: themedProps.slots,
      }),
    [themedProps.slots],
  );

  return React.useMemo<DataGridUltraProcessedProps>(
    () => ({
      ...DATA_GRID_ULTRA_PROPS_DEFAULT_VALUES,
      ...themedProps,
      localeText,
      slots,
      signature: 'DataGridUltra',
    }),
    [themedProps, localeText, slots],
  );
};
