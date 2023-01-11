import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { getDataGridUtilityClass, useGridSelector, GridRenderCellParams } from '../../baseGrid';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { DataGridProProcessedProps } from '../models/dataGridProProps';
import { gridDetailPanelExpandedRowsContentCacheSelector } from '../hooks/features/detailPanel/gridDetailPanelSelector';
import { GridApiPro } from '../models/gridApiPro';

type OwnerState = { classes: DataGridProProcessedProps['classes']; isExpanded: boolean };

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes, isExpanded } = ownerState;

  const slots = {
    root: ['detailPanelToggleCell', isExpanded && 'detailPanelToggleCell--expanded'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridDetailPanelToggleCell = (props: GridRenderCellParams) => {
  const { id, value: isExpanded } = props;

  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext<GridApiPro>();
  const ownerState: OwnerState = { classes: rootProps.classes, isExpanded };
  const classes = useUtilityClasses(ownerState);

  const contentCache = useGridSelector(apiRef, gridDetailPanelExpandedRowsContentCacheSelector);
  const hasContent = React.isValidElement(contentCache[id]);

  const Icon = isExpanded
    ? rootProps.components.DetailPanelCollapseIcon
    : rootProps.components.DetailPanelExpandIcon;

  return (
    <IconButton
      size="small"
      tabIndex={-1}
      disabled={!hasContent}
      className={classes.root}
      aria-label={
        isExpanded
          ? apiRef.current.getLocaleText('collapseDetailPanel')
          : apiRef.current.getLocaleText('expandDetailPanel')
      }
    >
      <Icon fontSize="inherit" />
    </IconButton>
  );
};

GridDetailPanelToggleCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * GridApi that let you manipulate the grid.
   * @deprecated Use the `apiRef` returned by `useGridApiContext` or `useGridApiRef` (only available in `@mui/x-data-grid-pro`)
   */
  api: PropTypes.any.isRequired,
  /**
   * The mode of the cell.
   */
  cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * A ref allowing to set imperative focus.
   * It can be passed to the element that should receive focus.
   * @ignore - do not document.
   */
  focusElementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focus: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * The cell value formatted with the column valueFormatter.
   */
  formattedValue: PropTypes.any,
  /**
   * Get the cell value of a row and field.
   * @param {GridRowId} id The row id.
   * @param {string} field The field.
   * @returns {any} The cell value.
   * @deprecated Use `params.row` to directly access the fields you want instead.
   */
  getValue: PropTypes.func.isRequired,
  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * If true, the cell is editable.
   */
  isEditable: PropTypes.bool,
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

export { GridDetailPanelToggleCell };
