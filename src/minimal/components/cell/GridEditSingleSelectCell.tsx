import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { SelectProps, SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
import { isEscapeKey } from '../../utils/keyboardUtils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { GridEditModes } from '../../models/gridEditRowModel';
import { GridSingleSelectColDef, ValueOptions } from '../../models/colDef/gridColDef';
import {
  getValueFromValueOptions,
  isSingleSelectColDef,
} from '../panel/filterPanel/filterPanelUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';

export interface GridEditSingleSelectCellProps
  extends GridRenderEditCellParams,
    Omit<SelectProps, 'id' | 'tabIndex' | 'value'>,
    Pick<GridSingleSelectColDef, 'getOptionLabel' | 'getOptionValue'> {
  /**
   * Callback called when the value is changed by the user.
   * @param {SelectChangeEvent<any>} event The event source of the callback.
   * @param {any} newValue The value that is going to be passed to `apiRef.current.setEditCellValue`.
   * @returns {Promise<void> | void} A promise to be awaited before calling `apiRef.current.setEditCellValue`
   */
  onValueChange?: (event: SelectChangeEvent<any>, newValue: any) => Promise<void> | void;
  /**
   * If true, the select opens by default.
   */
  initialOpen?: boolean;
}

function isKeyboardEvent(event: any): event is React.KeyboardEvent {
  return !!event.key;
}

function GridEditSingleSelectCell(props: GridEditSingleSelectCellProps) {
  const rootProps = useGridRootProps();
  const {
    id,
    value: valueProp,
    formattedValue,
    api,
    field,
    row,
    rowNode,
    colDef,
    cellMode,
    isEditable,
    tabIndex,
    className,
    hasFocus,
    isValidating,
    isProcessingProps,
    error,
    onValueChange,
    initialOpen = rootProps.editMode === GridEditModes.Cell,
    getOptionLabel: getOptionLabelProp,
    getOptionValue: getOptionValueProp,
    ...other
  } = props;

  const apiRef = useGridApiContext();
  const ref = React.useRef<any>();
  const inputRef = React.useRef<any>();
  const [open, setOpen] = React.useState(initialOpen);

  const baseSelectProps = rootProps.slotProps?.baseSelect || {};
  const isSelectNative = baseSelectProps.native ?? false;

  useEnhancedEffect(() => {
    if (hasFocus) {
      inputRef.current?.focus();
    }
  }, [hasFocus]);

  if (!isSingleSelectColDef(colDef)) {
    return null;
  }

  let valueOptions: Array<ValueOptions> | undefined;
  if (typeof colDef?.valueOptions === 'function') {
    valueOptions = colDef?.valueOptions({ id, row, field });
  } else {
    valueOptions = colDef?.valueOptions;
  }

  if (!valueOptions) {
    return null;
  }

  const getOptionValue = getOptionValueProp || colDef.getOptionValue!;
  const getOptionLabel = getOptionLabelProp || colDef.getOptionLabel!;

  const handleChange: SelectProps['onChange'] = async (event) => {
    if (!isSingleSelectColDef(colDef) || !valueOptions) {
      return;
    }

    setOpen(false);
    const target = event.target as HTMLInputElement;
    // NativeSelect casts the value to a string.
    const formattedTargetValue = getValueFromValueOptions(
      target.value,
      valueOptions,
      getOptionValue,
    );

    if (onValueChange) {
      await onValueChange(event, formattedTargetValue);
    }

    await apiRef.current.setEditCellValue({ id, field, value: formattedTargetValue }, event);
  };

  const handleClose = (event: React.KeyboardEvent, reason: string) => {
    if (rootProps.editMode === GridEditModes.Row) {
      setOpen(false);
      return;
    }
    if (reason === 'backdropClick' || isEscapeKey(event.key)) {
      apiRef.current.stopCellEditMode({ id, field, ignoreModifications: true });
    }
  };

  const handleOpen: SelectProps['onOpen'] = (event) => {
    if (isKeyboardEvent(event) && event.key === 'Enter') {
      return;
    }
    setOpen(true);
  };

  const OptionComponent = isSelectNative ? 'option' : MenuItem;

  if (!valueOptions || !colDef) {
    return null;
  }

  return (
    <rootProps.slots.baseSelect
      ref={ref}
      inputRef={inputRef}
      value={valueProp}
      onChange={handleChange}
      open={open}
      onOpen={handleOpen}
      MenuProps={{
        onClose: handleClose,
      }}
      error={error}
      native={isSelectNative}
      fullWidth
      {...other}
      {...rootProps.slotProps?.baseSelect}
    >
      {valueOptions.map((valueOption) => {
        const value = getOptionValue(valueOption);

        return (
          <OptionComponent key={value} value={value}>
            {getOptionLabel(valueOption)}
          </OptionComponent>
        );
      })}
    </rootProps.slots.baseSelect>
  );
}

GridEditSingleSelectCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * GridApi that let you manipulate the grid.
   */
  api: PropTypes.object.isRequired,
  /**
   * The mode of the cell.
   */
  cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,
  changeReason: PropTypes.oneOf(['debouncedSetEditCellValue', 'setEditCellValue']),
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The cell value formatted with the column valueFormatter.
   */
  formattedValue: PropTypes.any,
  /**
   * Used to determine the label displayed for a given value option.
   * @param {ValueOptions} value The current value option.
   * @returns {string} The text to be displayed.
   */
  getOptionLabel: PropTypes.func,
  /**
   * Used to determine the value used for a value option.
   * @param {ValueOptions} value The current value option.
   * @returns {string} The value to be used.
   */
  getOptionValue: PropTypes.func,
  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * If true, the select opens by default.
   */
  initialOpen: PropTypes.bool,
  /**
   * If true, the cell is editable.
   */
  isEditable: PropTypes.bool,
  isProcessingProps: PropTypes.bool,
  isValidating: PropTypes.bool,
  /**
   * Callback called when the value is changed by the user.
   * @param {SelectChangeEvent<any>} event The event source of the callback.
   * @param {any} newValue The value that is going to be passed to `apiRef.current.setEditCellValue`.
   * @returns {Promise<void> | void} A promise to be awaited before calling `apiRef.current.setEditCellValue`
   */
  onValueChange: PropTypes.func,
  /**
   * The row model of the row that the current cell belongs to.
   */
  row: PropTypes.any.isRequired,
  /**
   * The node of the row that the current cell belongs to.
   */
  rowNode: PropTypes.object.isRequired,
  /**
   * the tabIndex value.
   */
  tabIndex: PropTypes.oneOf([-1, 0]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
} as any;

export { GridEditSingleSelectCell };

export const renderEditSingleSelectCell = (params: GridEditSingleSelectCellProps) => (
  <GridEditSingleSelectCell {...params} />
);
