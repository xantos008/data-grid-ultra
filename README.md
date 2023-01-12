# data-grid-ultra

This package is a full customized data grid component base on mui data grid library.

## Installation

Install the package in your project directory with:

```sh
npm install data-grid-ultra
```

## Usage

```sh
import { DataGridUltra } from 'data-grid-ultra';

export default function DataGridUltraDemo() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
    editable: true,
  });

  return (
      <DataGridUltra
        {...data}
        loading={data.rows.length === 0}
        rowHeight={38}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
  );
}
```

## Props

Name | Type                      | Default | Description |
:---  |:--------------------------| :--- | :--- |
columns* | `Array<object>` || Set of columns of type GridColumns. |
rows* | `Array<object>` || Set of rows of type GridRowsProp.
aggregationFunctions | object | GRID_AGGREGATION_FUNCTIONS | Aggregation functions available on the grid.
aggregationModel | object |  | Set the aggregation model of the grid.
aggregationRowsScope | 'all' \| 'filtered' | "filtered" | Rows used to generate the aggregated value. If `filtered`, the aggregated values will be generated using only the rows currently passing the filtering process. If `all`, the aggregated values will be generated using all the rows.
apiRef | { current: object } |  | The ref object that allows grid manipulation. Can be instantiated with useGridApiRef().
aria-label | string |  | The label of the grid.
aria-labelledby | string |  | The id of the element containing a label for the grid.
autoHeight | bool | false | If `true`, the grid height is dynamic and follow the number of rows in the grid.
autoPageSize | bool | false | If `true`, the pageSize is calculated according to the container size and the max number of rows to avoid rendering a vertical scroll bar.
cellModesModel | object |  | Controls the modes of the cells.
checkboxSelection | bool | false | If `true`, the grid get a first column with a checkbox that allows to select rows.
checkboxSelectionVisibleOnly | bool | false | If `true`, the "Select All" header checkbox selects only the rows on the current page. To be used in combination with `checkboxSelection`. It only works if the pagination is enabled.
classes | object |  | Override or extend the styles applied to the component. See [CSS API](https://github.com/xantos008/data-grid-ultra#css) below for more details.
columnBuffer | number | 3 | Number of extra columns to be rendered before/after the visible slice.
columnThreshold | number | 3 | Number of rows from the `columnBuffer` that can be visible before a new slice is rendered.
columnTypes | object |  | Extend native column types with your new column types.
columnVisibilityModel | object |  | Set the column visibility model of the grid. If defined, the grid will ignore the hide property in [GridColDef](https://mui.com/x/api/data-grid/grid-col-def/).
components | object |  | Overrideable components.
componentsProps | object |  | Overrideable components props dynamically passed to the component at rendering.
defaultGroupingExpansionDepth | number | 0 | If above 0, the row children will be expanded up to this depth. If equal to -1, all the row children will be expanded.
density | 'comfortable' \| 'compact' \| 'standard' | "standard" | Set the density of the grid.
detailPanelExpandedRowIds | `Array<number \| string>` |  | The row ids to show the detail panel.
disableAggregation | bool | false | If `true`, aggregation is disabled.
disableChildrenFiltering | bool | false | If `true`, the filtering will only be applied to the top level rows when grouping rows with the `treeData` prop.
disableChildrenSorting | bool | false | If `true`, the sorting will only be applied to the top level rows when grouping rows with the `treeData` prop.
disableColumnFilter | bool | false | If `true`, column filters are disabled.
disableColumnMenu | bool | false | If `true`, the column menu is disabled.
disableColumnPinning | bool | false | If `true`, the column pinning is disabled.
disableColumnReorder | bool | false | If `true`, reordering columns is disabled.
disableColumnResize | bool | false | If `true`, resizing columns is disabled.
disableColumnSelector | bool | false | If `true`, hiding/showing columns is disabled.
disableDensitySelector | bool | false | If `true`, the density selector is disabled.
disableExtendRowFullWidth | bool | false | If `true`, rows will not be extended to fill the full width of the grid container.
disableIgnoreModificationsIfProcessingProps | bool | false | If `true`, modification to a cell will not be discarded if the mode is changed from "edit" to "view" while processing props.
disableMultipleColumnsFiltering | bool | false | If `true`, filtering with multiple columns is disabled.
disableMultipleColumnsSorting | bool | false | If `true`, sorting with multiple columns is disabled.
disableMultipleSelection | bool | false | If `true`, multiple selection using the Ctrl or CMD key is disabled.
disableRowGrouping | bool | false | If `true`, the row grouping is disabled.
disableSelectionOnClick | bool | false | If `true`, the selection on click on a row or cell is disabled.
disableVirtualization | bool | false | If `true`, the virtualization is disabled.
editMode | 'cell' \| 'row' | "cell" | Controls whether to use the cell or row editing.
editRowsModel | object |  | Set the edit rows model of the grid.
error | any |  | An error that will turn the grid into its error state and display the error component.
experimentalFeatures | `{ aggregation?: bool, columnGrouping?: bool, lazyLoading?: bool, newEditingApi?: bool, preventCommitWhileValidating?: bool, rowPinning?: bool, warnIfFocusStateIsNotSynced?: bool }` | | Features under development. For each feature, if the flag is not explicitly set to `true`, the feature will be fully disabled and any property / method call will not have any effect.
filterMode | 'client' \| 'server' | "client" | Filtering can be processed on the server or client-side. Set it to 'server' if you would like to handle filtering on the server-side.
filterModel | `{ items: Array<{ columnField: string, id?: number \| string, operatorValue?: string, value?: any }>, linkOperator?: 'and' \| 'or', quickFilterLogicOperator?: 'and' \| 'or', quickFilterValues?: array }` | | Set the filter model of the grid.
getAggregationPosition | func | `(groupNode) => groupNode == null ? 'footer' : 'inline'` |Determines the position of an aggregated value. <br /><br /> **Signature**:<br />`function(groupNode: GridRowTreeNodeConfig \| null) => GridAggregationPosition \| null`<br />_groupNode_: The current group (`null` being the top level group).<br />_returns_: GridAggregationPosition \| null): Position of the aggregated value (if `null`, the group will not be aggregated).
getCellClassName | func |  | Function that applies CSS classes dynamically on cells.<br/><br/>**Signature:**<br/>`function(params: GridCellParams) => string`<br/>_params_: With all properties from [GridCellParams](https://mui.com/x/api/data-grid/grid-cell-params/). <br/>_returns_ (string): The CSS class to apply to the cell.
getDetailPanelContent | func |  | Function that returns the element to render in row detail.<br /><br />**Signature:**<br />`function(params: GridRowParams) => JSX.Element`<br />_params_: With all properties from [GridRowParams](https://mui.com/x/api/data-grid/grid-row-params/). <br />_returns_ (JSX.Element): The row detail element.
getDetailPanelHeight | func | "() => 500"  | Function that returns the height of the row detail panel.<br /><br />**Signature:**<br />`function(params: GridRowParams) => number \| string`<br />_params_: With all properties from [GridRowParams](https://mui.com/x/api/data-grid/grid-row-params/). <br />_returns_ (number \| string): The height in pixels or "auto" to use the content height.
getEstimatedRowHeight | func |  | Function that returns the estimated height for a row. Only works if dynamic row height is used. Once the row height is measured this value is discarded.<br /><br />**Signature:**<br />`function(params: GridRowHeightParams) => number \| null`<br />_params_: With all properties from GridRowHeightParams.<br />_returns_ (number \| null): The estimated row height value. If `null` or `undefined` then the default row height, based on the density, is applied.
getRowClassName | func |  | Function that applies CSS classes dynamically on rows. <br /><br />**Signature:** <br/> `function(params: GridRowClassNameParams) => string`<br />_params_: With all properties from [GridRowClassNameParams](https://mui.com/x/api/data-grid/grid-row-class-name-params/). <br />_returns_ (string): The CSS class to apply to the row.
getRowHeight | func |  | Function that sets the row height per row. <br /><br />**Signature:**<br />`function(params: GridRowHeightParams) => GridRowHeightReturnValue`<br />_params_: With all properties from GridRowHeightParams.<br />_returns_ (GridRowHeightReturnValue): The row height value. If `null` or `undefined` then the default row height is applied. If "auto" then the row height is calculated based on the content.
getRowId | func |  | Return the id of a given GridRowModel.
getRowSpacing | func |  | Function that allows to specify the spacing between rows. <br /><br />**Signature:** <br />`function(params: GridRowSpacingParams) => GridRowSpacing` <br />_params_: With all properties from [GridRowSpacingParams](https://mui.com/x/api/data-grid/grid-row-spacing-params/). <br />_returns_ (GridRowSpacing): The row spacing values.
getTreeDataPath | func |  | Determines the path of a row in the tree data. For instance, a row with the path ["A", "B"] is the child of the row with the path ["A"]. Note that all paths must contain at least one element. <br /><br />**Signature:** <br />`function(row: R) => Array<string>`  <br />_row_: The row from which we want the path. <br />_returns_ (Array): The path to the row.
groupingColDef | func \| object |  | The grouping column used by the tree data.
headerHeight | number | 56 | Set the height in pixel of the column headers in the grid.
hideFooter | bool | false | If `true`, the footer component is hidden.
hideFooterPagination | bool | false | If `true`, the pagination component in the footer is hidden.
hideFooterRowCount | bool | false | If `true`, the row count in the footer is hidden. It has no effect if the pagination is enabled.
hideFooterSelectedRowCount | bool | false | If `true`, the selected row count in the footer is hidden.
initialState | object |  |
isCellEditable | func |  | Callback fired when a cell is rendered, returns true if the cell is editable. <br /><br /> **Signature:** <br />`function(params: GridCellParams) => boolean` <br />_params_: With all properties from [GridCellParams](https://mui.com/x/api/data-grid/grid-cell-params/). <br />_returns_ (boolean): A boolean indicating if the cell is editable.
isGroupExpandedByDefault | func  |  | Determines if a group should be expanded after its creation. This prop takes priority over the defaultGroupingExpansionDepth prop. <br /><br />**Signature:** <br />`function(node: GridRowTreeNodeConfig) => boolean` <br />_node_: The node of the group to test. <br />_returns_ (boolean): A boolean indicating if the group is expanded.
isRowSelectable | func  |  | Determines if a row can be selected. <br /><br />**Signature:** <br />`function(params: GridRowParams) => boolean` <br />_params_: With all properties from [GridRowParams](https://mui.com/x/api/data-grid/grid-row-params/). <br />_returns_ (boolean): A boolean indicating if the cell is selectable.
keepColumnPositionIfDraggedOutside | bool  | false | If `true`, moving the mouse pointer outside the grid before releasing the mouse button in a column re-order action will not cause the column to jump back to its original position.
keepNonExistentRowsSelected | bool  | false | If `true`, the selection model will retain selected rows that do not exist. Useful when using server side pagination and row selections need to be retained when changing pages.
loading | bool  | false | If `true`, a loading overlay is displayed.
localeText | object  |  | Set the locale text of the grid. You can find all the translation keys supported in [the source](https://github.com/xantos008/data-grid-ultra/blob/main/src/baseGrid/constants/localeTextConstants.ts) in the GitHub repository.
logger | { debug: func, error: func, info: func, warn: func }  | console | Pass a custom logger in the components that implements the Logger interface.
logLevel | 'debug' \| 'error' \| 'info' \| 'warn' \| false | "error" ("warn" in dev mode) | Allows to pass the logging level or false to turn off logging.
nonce | string |  | Nonce of the inline styles for [Content Security Policy](https://www.w3.org/TR/2016/REC-CSP2-20161215/#script-src-the-nonce-attribute). 
onAggregationModelChange | func |  | Callback fired when the row grouping model changes. <br /><br />**Signature:**`function(model: GridAggregationModel, details: GridCallbackDetails) => void` <br />_model_: The aggregated columns. <br />_details_: Additional details for this callback.
onCellClick | func |  | Callback fired when any cell is clicked. <br /><br />**Signature:** <br />`function(params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from [GridCellParams](https://mui.com/x/api/data-grid/grid-cell-params/). <br />_event_: The event object. <br />_details_: Additional details for this callback.
onCellDoubleClick | func |  | Callback fired when a double click event comes from a cell element. <br /><br />**Signature:** <br />`function(params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from [GridCellParams](https://mui.com/x/api/data-grid/grid-cell-params/). <br />_event_: The event object. <br />_details_: Additional details for this callback.
onCellEditCommit | func |  | Callback fired when the cell changes are committed. <br /><br />**Signature:** <br />`function(params: GridCellEditCommitParams, event: MuiEvent<MuiBaseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridCellEditCommitParams. <br />_event_: The event that caused this prop to be called. <br />_details_: Additional details for this callback.
onCellEditStart | func |  | Callback fired when the cell turns to edit mode. <br /><br />**Signature:** <br /> `function(params: GridCellParams, event: MuiEvent<React.KeyboardEvent \| React.MouseEvent>) => void` <br />_params_: With all properties from [GridCellParams](https://mui.com/x/api/data-grid/grid-cell-params/). <br />_event_: The event that caused this prop to be called.
onCellEditStop | func |  | Callback fired when the cell turns to view mode. <br /><br />**Signature:** <br /> `function(params: GridCellParams, event: MuiEvent<MuiBaseEvent>) => void` <br />_params_: With all properties from [GridCellParams](https://mui.com/x/api/data-grid/grid-cell-params/). <br />_event_: The event that caused this prop to be called.
onCellFocusOut | func |  | Callback fired when a cell loses focus. <br /><br />**Signature:** <br />`function(params: GridCellParams, event: MuiEvent<MuiBaseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from [GridCellParams](https://mui.com/x/api/data-grid/grid-cell-params/).  <br />_event_: The event object.  <br />_details_: Additional details for this callback.
onCellKeyDown | func |  | Callback fired when a keydown event comes from a cell element. <br /><br />**Signature:** <br />`function(params: GridCellParams, event: MuiEvent<KeyboardEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from [GridCellParams](https://mui.com/x/api/data-grid/grid-cell-params/).  <br />_event_: The event object.  <br />_details_: Additional details for this callback.
onCellModesModelChange | func |  | Callback fired when the `cellModesModel` prop changes. <br /><br />**Signature:** <br />`function(cellModesModel: GridCellModesModel, details: GridCallbackDetails) => void` <br />_cellModesModel_: Object containig which cells are in "edit" mode. <br />_details_: Additional details for this callback.
onColumnHeaderClick | func |  | Callback fired when a click event comes from a column header element. <br /><br />**Signature:** <br />`function(params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnHeaderParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onColumnHeaderDoubleClick | func |  | Callback fired when a double click event comes from a column header element. <br /><br />**Signature:** <br />`function(params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnHeaderParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onColumnHeaderEnter | func |  | Callback fired when a mouse enter event comes from a column header element. <br /><br />**Signature:**<br />`function(params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnHeaderParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onColumnHeaderLeave | func |  | Callback fired when a mouse leave event comes from a column header element. <br /><br />**Signature:**<br />`function(params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnHeaderParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onColumnHeaderOut | func |  | Callback fired when a mouseout event comes from a column header element. <br /><br />**Signature:**<br />`function(params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnHeaderParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onColumnHeaderOver | func |  | Callback fired when a mouseover event comes from a column header element. <br /><br />**Signature:**<br />`function(params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnHeaderParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onColumnOrderChange | func |  | Callback fired when a column is reordered. <br /><br />**Signature:** <br />`function(params: GridColumnOrderChangeParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnOrderChangeParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onColumnResize | func |  | Callback fired while a column is being resized. <br /><br />**Signature:** <br />`function(params: GridColumnResizeParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnResizeParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onColumnVisibilityModelChange | func |  | Callback fired when the column visibility model changes. <br /><br />**Signature:** <br />`function(model: GridColumnVisibilityModel, details: GridCallbackDetails) => void` <br />_model_: The new model.<br />_details_: Additional details for this callback.
onColumnWidthChange | func |  | Callback fired when the width of a column is changed. <br /><br />**Signature:** <br />`function(params: GridColumnResizeParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridColumnResizeParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onDetailPanelExpandedRowIdsChange | func |  | Callback fired when the detail panel of a row is opened or closed. <br /><br />**Signature:** <br />`function(ids: Array<GridRowId>, details: GridCallbackDetails) => void` <br />_ids_: The ids of the rows which have the detail panel open. <br />_details_: Additional details for this callback.
onEditCellPropsChange | func |  | **Deprecated**: use `preProcessEditCellProps` from the [GridColDef](https://mui.com/x/api/data-grid/grid-col-def/)
onEditRowsModelChange | func |  | Callback fired when the editRowsModel changes. <br /><br />**Signature:** <br /><br />`function(editRowsModel: GridEditRowsModel, details: GridCallbackDetails) => void` <br />_editRowsModel_: With all properties from GridEditRowsModel. <br />_details_: Additional details for this callback.
onError | func |  | Callback fired when an exception is thrown in the grid. <br /><br />**Signature:** <br />`function(args: any, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_args_: The arguments passed to the showError call. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onFetchRows | func |  | Callback fired when rowCount is set and the next batch of virtualized rows is rendered. <br /><br />**Signature:** <br />`function(params: GridFetchRowsParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridFetchRowsParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onFilterModelChange | func |  | Callback fired when the Filter model changes before the filters are applied. <br /><br />**Signature:** <br />`function(model: GridFilterModel, details: GridCallbackDetails) => void` <br />_model_: With all properties from [GridFilterModel](https://mui.com/x/api/data-grid/grid-filter-model/). <br />_details_: Additional details for this callback.
onMenuClose | func |  | Callback fired when the menu is closed. <br /><br />**Signature:** <br />`function(params: GridMenuParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridMenuParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onMenuOpen | func |  | Callback fired when the menu is opened. <br /><br />**Signature:** <br />`function(params: GridMenuParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridMenuParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onPageChange | func |  | Callback fired when the current page has changed. <br /><br />**Signature:** <br />`function(page: number, details: GridCallbackDetails) => void` <br />_page_: Index of the page displayed on the Grid. <br />_details_: Additional details for this callback.
onPageSizeChange | func |  | Callback fired when the page size has changed. <br /><br />**Signature:** <br />`function(pageSize: number, details: GridCallbackDetails) => void` <br />_page_: Index of the page displayed on the Grid. <br />_details_: Additional details for this callback.
onPinnedColumnsChange | func |  | Callback fired when the pinned columns have changed. <br /><br />**Signature:** <br />`function(pinnedColumns: GridPinnedColumns, details: GridCallbackDetails) => void` <br />_pinnedColumns_: The changed pinned columns. <br />_details_: Additional details for this callback.
onPreferencePanelClose | func |  | Callback fired when the preferences panel is closed. <br /><br />**Signature:** <br />`function(params: GridPreferencePanelParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridPreferencePanelParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onPreferencePanelOpen | func |  | Callback fired when the preferences panel is opened. <br /><br />**Signature:** <br />`function(params: GridPreferencePanelParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridPreferencePanelParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onProcessRowUpdateError | func |  | Callback called when processRowUpdate throws an error or rejects. <br /><br />**Signature:** <br />`function(error: any) => void` <br />_error_: The error thrown.
onResize | func |  | Callback fired when the grid is resized. <br /><br />**Signature:** <br />`function(containerSize: ElementSize, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_containerSize_: With all properties from ElementSize. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onRowClick | func |  | Callback fired when a row is clicked. Not called if the target clicked is an interactive element added by the built-in columns. <br /><br />**Signature:** <br />`function(params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from [GridRowParams](https://mui.com/x/api/data-grid/grid-row-params/). <br />_event_: The event object. <br />_details_: Additional details for this callback.
onRowDoubleClick | func |  | Callback fired when a double click event comes from a row container element. <br /><br />**Signature:** <br />`function(params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void` <br />_params_: With all properties from RowParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onRowEditCommit | func |  | Callback fired when the row changes are committed. <br /><br />**Signature:**`function(id: GridRowId, event: MuiEvent<MuiBaseEvent>) => void` <br />_id_: The row id. <br />_event_: The event that caused this prop to be called.
onRowEditStart | func |  | Callback fired when the row turns to edit mode.<br />**Signature:** <br />`function(params: GridRowParams, event: MuiEvent<React.KeyboardEvent \| React.MouseEvent>) => void` <br />_params_: With all properties from [GridRowParams](https://mui.com/x/api/data-grid/grid-row-params/). <br />_event_: The event that caused this prop to be called. 
onRowEditStop | func |  | Callback fired when the row turns to view mode.<br /><br />**Signature:** <br />`function(params: GridRowParams, event: MuiEvent<MuiBaseEvent>) => void` <br />_params_: With all properties from [GridRowParams](https://mui.com/x/api/data-grid/grid-row-params/). <br />_event_: The event that caused this prop to be called.
onRowGroupingModelChange | func |  | Callback fired when the row grouping model changes.<br /><br />**Signature:** <br />`function(model: GridRowGroupingModel, details: GridCallbackDetails) => void` <br />_model_: Columns used as grouping criteria. <br />_details_: Additional details for this callback.
onRowModesModelChange | func |  | Callback fired when the rowModesModel prop changes.<br /><br />**Signature:** <br />`function(rowModesModel: GridRowModesModel, details: GridCallbackDetails) => void` <br />_rowModesModel_: Object containig which rows are in "edit" mode. <br />_details_: Additional details for this callback.
onRowOrderChange | func |  | Callback fired when a row is being reordered.<br /><br />**Signature:** <br />`function(params: GridRowOrderChangeParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridRowOrderChangeParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onRowsScrollEnd | func |  | Callback fired when scrolling to the bottom of the grid viewport.<br /><br />**Signature:** <br />`function(params: GridRowScrollEndParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void` <br />_params_: With all properties from GridRowScrollEndParams. <br />_event_: The event object. <br />_details_: Additional details for this callback.
onSelectionModelChange | func |  | Callback fired when the selection state of one or multiple rows changes.<br /><br />**Signature:** <br />`function(selectionModel: GridSelectionModel, details: GridCallbackDetails) => void` <br />_selectionModel_: With all the row ids GridSelectionModel. <br />_details_: Additional details for this callback.
onSortModelChange | func |  | Callback fired when the sort model changes before a column is sorted.<br /><br />**Signature:** <br />`function(model: GridSortModel, details: GridCallbackDetails) => void` <br />_model_: With all properties from GridSortModel. <br />_details_: Additional details for this callback.
page | number | 0 | The zero-based index of the current page.
pageSize | number | 100 | Set the number of rows in one page. If some of the rows have children (for instance in the tree data), this number represents the amount of top level rows wanted on each page.
pagination | bool | false | If `true`, pagination is enabled.
paginationMode | 'client' \| 'server' | "client" | Pagination can be processed on the server or client-side. Set it to 'client' if you would like to handle the pagination on the client-side. Set it to 'server' if you would like to handle the pagination on the server-side.
pinnedColumns | `{ left?: Array<string>, right?: Array<string> }` | | The column fields to display pinned to left or right.
pinnedRows | `{ left?: Array<string>, right?: Array<string> }` | | Rows data to pin on top or bottom.
processRowUpdate | func |  | Callback called before updating a row with new values in the row and cell editing. Only applied if `props.experimentalFeatures.newEditingApi: true`. <br /><br />**Signature:** <br />`function(newRow: R, oldRow: R) => Promise<R> \| R` <br />_newRow_: Row object with the new values. <br />_oldRow_: Row object with the old values. <br />_returns_ (Promise | R): The final values to update the row.
rowBuffer | number | 3 | Number of extra rows to be rendered before/after the visible slice.
rowCount | number |  | Set the total number of rows, if it is different from the length of the value `rows` prop. If some rows have children (for instance in the tree data), this number represents the amount of top level rows.
rowGroupingColumnMode | 'multiple' \| 'single' | "single" | If `single`, all column we are grouping by will be represented in the same grouping the same column. <br/> If `multiple`, each column we are grouping by will be represented in its own column.
rowGroupingModel | `Array<string>` |  | Set the row grouping model of the grid.
rowHeight | number | 52 | Set the height in pixel of a row in the grid.
rowModesModel | object |  | Controls the modes of the rows.
rowReordering | bool | false | If `true`, the reordering of rows is enabled.
rowsLoadingMode | 'client' \| 'server' |  | Loading rows can be processed on the server or client-side. Set it to 'client' if you would like enable infnite loading. Set it to 'server' if you would like to enable lazy loading. * @default "client"
rowSpacingType | 'border' \| 'margin' | "margin" | Sets the type of space between rows added by `getRowSpacing`.
rowsPerPageOptions | `Array<number>` | [25, 50, 100] | Select the pageSize dynamically using the component UI.
rowThreshold | number | 3 | Number of rows from the `rowBuffer` that can be visible before a new slice is rendered.
scrollbarSize | number |  | Override the height/width of the grid inner scrollbar.
scrollEndThreshold | number | 80 | Set the area in `px` at the bottom of the grid viewport where onRowsScrollEnd is called.
selectionModel | `Array<number \| string> \| number \| string` |  | Set the selection model of the grid.
showCellRightBorder | bool | false | If `true`, the right border of the cells are displayed.
showColumnRightBorder | bool | false | If `true`, the right border of the column headers are displayed.
sortingMode | 'client' \| 'server' | "client" | Sorting can be processed on the server or client-side. Set it to 'client' if you would like to handle sorting on the client-side. Set it to 'server' if you would like to handle sorting on the server-side.
sortingOrder | `Array<'asc' \| 'desc'>` | ['asc', 'desc', null] | The order of the sorting sequence.
sortModel | `Array<{ field: string, sort?: 'asc' \| 'desc' }>` |  | Set the sort model of the grid.
sx | number | `Array<func \| object \| bool>` \| func \| object | The system prop that allows defining system overrides as well as additional CSS styles. See the [`sx` page](https://mui.com/system/getting-started/the-sx-prop/) for more details.
throttleRowsMs | number | 0 | If positive, the Grid will throttle updates coming from `apiRef.current.updateRows` and `apiRef.current.setRows`. It can be useful if you have a high update rate but do not want to do heavy work like filtering / sorting or rendering on each individual update.
treeData | bool | false | If `true`, the rows will be gathered in a tree structure according to the `getTreeDataPath` prop.

## Slots

Name | Type                      | Default | Description |
:---  |:--------------------------| :--- | :--- |
BaseButton | elementType | Button | The custom Button component used in the grid.
BaseCheckbox | elementType | Checkbox | The custom Checkbox component used in the grid for both header and cells.
BaseFormControl | elementType | FormControl | The custom FormControl component used in the grid.
BasePopper | elementType | Popper | The custom Popper component used in the grid.
BaseSelect | elementType | Select | The custom Select component used in the grid.
BaseSwitch | elementType | Switch | The custom Switch component used in the grid.
BaseTextField | elementType | TextField | The custom TextField component used in the grid.
BaseTooltip | elementType | Tooltip | The custom Tooltip component used in the grid.
BooleanCellFalseIcon | elementType | GridCloseIcon | Icon displayed on the boolean cell to represent the false value.
BooleanCellTrueIcon | elementType | GridCheckIcon | Icon displayed on the boolean cell to represent the true value.
Cell | elementType | GridCell | Component rendered for each cell.
ColumnFilteredIcon | elementType | GridFilterAltIcon | Icon displayed on the column header menu to show that a filter has been applied to the column.
ColumnHeaderFilterIconButton | elementType | GridColumnHeaderFilterIconButton | Filter icon component rendered in each column header.
ColumnMenu | elementType | GridColumnMenu | Column menu component rendered by clicking on the 3 dots "kebab" icon in column headers.
ColumnMenuIcon | elementType | GridTripleDotsVerticalIcon | Icon displayed on the side of the column header title to display the filter input component.
ColumnResizeIcon | elementType | GridSeparatorIcon | Icon displayed in between two column headers that allows to resize the column header.
ColumnSelectorIcon | elementType | GridColumnIcon | Icon displayed on the column menu selector tab.
ColumnSortedAscendingIcon | elementType \| null | GridArrowUpwardIcon | Icon displayed on the side of the column header title when sorted in ascending order.
ColumnSortedDescendingIcon | elementType \| null | GridArrowDownwardIcon | Icon displayed on the side of the column header title when sorted in descending order.
ColumnsPanel | elementType | GridColumnsPanel | GridColumns panel component rendered when clicking the columns button.
ColumnUnsortedIcon | elementType \| null | GridColumnUnsortedIcon | Icon displayed on the side of the column header title when unsorted.
DensityComfortableIcon | elementType | GridViewStreamIcon | Icon displayed on the "comfortable" density option in the toolbar.
DensityCompactIcon | elementType | GridViewHeadlineIcon | Icon displayed on the compact density option in the toolbar.
DensityStandardIcon | elementType | GridTableRowsIcon | Icon displayed on the standard density option in the toolbar.
DetailPanelCollapseIcon | elementType | GridRemoveIcon | Icon displayed on the detail panel toggle column when expanded.
DetailPanelExpandIcon | elementType | GridAddIcon | Icon displayed on the detail panel toggle column when collapsed.
ErrorOverlay | elementType | ErrorOverlay | Error overlay component rendered above the grid when an error is caught.
ExportIcon | elementType | GridSaveAltIcon | Icon displayed on the open export button present in the toolbar by default.
FilterPanel | elementType | GridFilterPanel | Filter panel component rendered when clicking the filter button.
FilterPanelDeleteIcon | elementType | GridCloseIcon | Icon displayed for deleting the filter from filter Panel.
Footer | elementType | GridFooter | Footer component rendered at the bottom of the grid viewport.
GroupingCriteriaCollapseIcon | elementType | GridExpandMoreIcon | Icon displayed on the grouping column when the children are expanded
GroupingCriteriaExpandIcon | elementType | GridKeyboardArrowRight | Icon displayed on the grouping column when the children are collapsed
Header | elementType | GridHeader | Header component rendered above the grid column header bar. Prefer using the `Toolbar` slot. You should never need to use this slot.
LoadingOverlay | elementType | GridLoadingOverlay | Loading overlay component rendered when the grid is in a loading state.
MoreActionsIcon | elementType | GridMoreVertIcon | Icon displayed on the `actions` column type to open the menu.
NoResultsOverlay | elementType | GridNoResultsOverlay | No results overlay component rendered when the grid has no results after filtering.
NoRowsOverlay | elementType | GridNoRowsOverlay | No rows overlay component rendered when the grid has no rows.
OpenFilterButtonIcon | elementType | GridFilterListIcon | Icon displayed on the open filter button present in the toolbar by default.
Pagination | elementType \| null | Pagination | Pagination component rendered in the grid footer by default.
Panel | elementType | GridPanel | Panel component wrapping the filters and columns panels.
PreferencesPanel | elementType | GridPreferencesPanel | PreferencesPanel component rendered inside the Header component.
QuickFilterClearIcon | elementType | GridCloseIcon | Icon displayed on the quick filter reset input.
QuickFilterIcon | elementType | GridSearchIcon | Icon displayed on the quick filter input.
Row | elementType | GridRow | Component rendered for each row.
RowReorderIcon | elementType | GridDragIcon | Icon displayed on the `reorder` column type to reorder a row.
SkeletonCell | elementType | GridSkeletonCell | Component rendered for each skeleton cell.
Toolbar | elementType \| null | null | Toolbar component rendered inside the Header component.
TreeDataCollapseIcon | elementType | GridExpandMoreIcon | Icon displayed on the tree data toggling column when the children are expanded
TreeDataExpandIcon | elementType | GridKeyboardArrowRight | Icon displayed on the tree data toggling column when the children are collapsed

The `ref` is forwarded to the root element.

#CSS
Rule name | Global class          | Description |
:-------  |:----------------------| :---------- |
actionsCell | .MuiDataGrid-actionsCell | Styles applied to the root element of the cell with type="actions".
aggregationColumnHeader | .MuiDataGrid-aggregationColumnHeader | Styles applied to the root element of the column header when aggregated.
aggregationColumnHeader--alignLeft | .MuiDataGrid-aggregationColumnHeader--alignLeft | Styles applied to the root element of the header when aggregation if `headerAlign="left"`.
aggregationColumnHeader--alignCenter | .MuiDataGrid-aggregationColumnHeader--alignCenter | Styles applied to the root element of the header when aggregation if `headerAlign="center"`.
aggregationColumnHeader--alignRight | .MuiDataGrid-aggregationColumnHeader--alignRight | Styles applied to the root element of the header when aggregation if `headerAlign="right"`.
aggregationColumnHeaderLabel | .MuiDataGrid-aggregationColumnHeaderLabel | Styles applied to the aggregation label in the column header when aggregated.
autoHeight | .MuiDataGrid-autoHeight | Styles applied to the root element if `autoHeight={true}`.
booleanCell | .MuiDataGrid-booleanCell | Styles applied to the icon of the boolean cell.
cell--editable | .MuiDataGrid-cell--editable | Styles applied to the cell element if the cell is editable.
cell--editing | .MuiDataGrid-cell--editing | Styles applied to the cell element if the cell is in edit mode.
cell--textCenter | .MuiDataGrid-cell--textCenter | Styles applied to the cell element if `align="center"`.
cell--textLeft | .MuiDataGrid-cell--textLeft | Styles applied to the cell element if `align="left"`.
cell--textRight | .MuiDataGrid-cell--textRight | Styles applied to the cell element if `align="right"`.
cell--withRenderer | .MuiDataGrid-cell--withRenderer | Styles applied to the cell element if the cell has a custom renderer.
cell | .MuiDataGrid-cell | Styles applied to the cell element.
cellContent | .MuiDataGrid-cellContent | Styles applied to the element that wraps the cell content.
cellCheckbox | .MuiDataGrid-cellCheckbox | Styles applied to the cell checkbox element.
cellSkeleton | .MuiDataGrid-cellSkeleton | Styles applied to the skeleton cell element.
checkboxInput | .MuiDataGrid-checkboxInput | Styles applied to the selection checkbox element.
columnHeader--alignCenter | .MuiDataGrid-columnHeader--alignCenter | Styles applied to the column header if `headerAlign="center"`.
columnHeader--alignLeft | .MuiDataGrid-columnHeader--alignLeft | Styles applied to the column header if `headerAlign="left"`.
columnHeader--alignRight | .MuiDataGrid-columnHeader--alignRight | Styles applied to the column header if `headerAlign="right"`.
columnHeader--dragging | .MuiDataGrid-columnHeader--dragging | Styles applied to the floating column header element when it is dragged.
columnHeader--moving | .MuiDataGrid-columnHeader--moving | Styles applied to the column header if it is being dragged.
columnHeader--numeric | .MuiDataGrid-columnHeader--numeric | Styles applied to the column header if the type of the column is `number`.
columnHeader--sortable | .MuiDataGrid-columnHeader--sortable | Styles applied to the column header if the column is sortable.
columnHeader--sorted | .MuiDataGrid-columnHeader--sorted | Styles applied to the column header if the column is sorted.
columnHeader--filtered | .MuiDataGrid-columnHeader--filtered | Styles applied to the column header if the column has a filter applied to it.
columnHeader | .MuiDataGrid-columnHeader | Styles applied to the column header element.
columnGroupHeader | .MuiDataGrid-columnGroupHeader | Styles applied to the column group header element.
columnHeaderCheckbox | .MuiDataGrid-columnHeaderCheckbox | Styles applied to the header checkbox cell element.
columnHeaderDraggableContainer | .MuiDataGrid-columnHeaderDraggableContainer | Styles applied to the column header's draggable container element.
rowReorderCellPlaceholder | .MuiDataGrid-rowReorderCellPlaceholder | Styles applied to the row's draggable placeholder element inside the special row reorder cell.
columnHeaderDropZone | .MuiDataGrid-columnHeaderDropZone | Styles applied to the column headers wrapper if a column is being dragged.
columnHeaderTitle | .MuiDataGrid-columnHeaderTitle | Styles applied to the column header's title element;
columnHeaderTitleContainer | .MuiDataGrid-columnHeaderTitleContainer | Styles applied to the column header's title container element.
columnHeaderTitleContainerContent | .MuiDataGrid-columnHeaderTitleContainerContent | Styles applied to the column header's title excepted buttons.
columnHeader--filledGroup | .MuiDataGrid-columnHeader--filledGroup | Styles applied to the column group header cell if not empty.
columnHeader--emptyGroup | .MuiDataGrid-columnHeader--emptyGroup | Styles applied to the empty column group header cell.
columnHeader--showColumnBorder | .MuiDataGrid-columnHeader--showColumnBorder | Styles applied to the column group header cell when show column border.
columnHeaders | .MuiDataGrid-columnHeaders | Styles applied to the column headers.
columnHeadersInner | .MuiDataGrid-columnHeadersInner | Styles applied to the column headers's inner element.
columnHeadersInner--scrollable | .MuiDataGrid-columnHeadersInner--scrollable | Styles applied to the column headers's inner element if there is a horizontal scrollbar.
columnSeparator--resizable | .MuiDataGrid-columnSeparator--resizable | Styles applied to the column header separator if the column is resizable.
columnSeparator--resizing | .MuiDataGrid-columnSeparator--resizing | Styles applied to the column header separator if the column is being resized.
columnSeparator--sideLeft | .MuiDataGrid-columnSeparator--sideLeft | Styles applied to the column header separator if the side is "left".
columnSeparator--sideRight | .MuiDataGrid-columnSeparator--sideRight | Styles applied to the column header separator if the side is "right".
columnSeparator | .MuiDataGrid-columnSeparator | Styles applied to the column header separator element.
columnsPanel | .MuiDataGrid-columnsPanel | Styles applied to the columns panel element.
columnsPanelRow | .MuiDataGrid-columnsPanelRow | Styles applied to the columns panel row element.
detailPanel | .MuiDataGrid-detailPanel | Styles applied to the detail panel element.
detailPanels | .MuiDataGrid-detailPanels | Styles applied to the detail panels wrapper element.
detailPanelToggleCell | .MuiDataGrid-detailPanelToggleCell | Styles applied to the detail panel toggle cell element.
detailPanelToggleCell--expanded | .MuiDataGrid-detailPanelToggleCell--expanded | Styles applied to the detail panel toggle cell element if expanded.
footerCell | .MuiDataGrid-footerCell | Styles applied to the root element of the cell inside a footer row.
panel | .MuiDataGrid-panel | Styles applied to the panel element.
panelHeader | .MuiDataGrid-panelHeader | Styles applied to the panel header element.
panelWrapper | .MuiDataGrid-panelWrapper | Styles applied to the panel wrapper element.
panelContent | .MuiDataGrid-panelContent | Styles applied to the panel content element.
panelFooter | .MuiDataGrid-panelFooter | Styles applied to the panel footer element.
paper | .MuiDataGrid-paper | Styles applied to the paper element.
editBooleanCell | .MuiDataGrid-editBooleanCell | Styles applied to root of the boolean edit component.
filterForm | .MuiDataGrid-filterForm | Styles applied to the root of the filter form component.
filterFormDeleteIcon | .MuiDataGrid-filterFormDeleteIcon | Styles applied to the delete icon of the filter form component.
filterFormLinkOperatorInput | .MuiDataGrid-filterFormLinkOperatorInput | Styles applied to the link operator inout of the filter form component.
filterFormColumnInput | .MuiDataGrid-filterFormColumnInput | Styles applied to the column input of the filter form component.
filterFormOperatorInput | .MuiDataGrid-filterFormOperatorInput | Styles applied to the operator input of the filter form component.
filterFormValueInput | .MuiDataGrid-filterFormValueInput | Styles applied to the value input of the filter form component.
editInputCell | .MuiDataGrid-editInputCell | Styles applied to the root of the input component.
filterIcon | .MuiDataGrid-filterIcon | Styles applied to the filter icon element.
footerContainer | .MuiDataGrid-footerContainer | Styles applied to the footer container element.
iconButtonContainer | .MuiDataGrid-iconButtonContainer | Styles applied to the column header icon's container.
iconSeparator | .MuiDataGrid-iconSeparator | Styles applied to the column header separator icon element.
main | .MuiDataGrid-main | Styles applied to the main container element.
menu | .MuiDataGrid-menu | Styles applied to the menu element.
menuIcon | .MuiDataGrid-menuIcon | Styles applied to the menu icon element.
menuIconButton | .MuiDataGrid-menuIconButton | Styles applied to the menu icon button element.
menuOpen | .MuiDataGrid-menuOpen | Styles applied to the menu icon element if the menu is open.
menuList | .MuiDataGrid-menuList | Styles applied to the menu list element.
overlay | .MuiDataGrid-overlay | Styles applied to the overlay element.
virtualScroller | .MuiDataGrid-virtualScroller | Styles applied to the virtualization container.
virtualScrollerContent | .MuiDataGrid-virtualScrollerContent | Styles applied to the virtualization content.
virtualScrollerContent--overflowed | .MuiDataGrid-virtualScrollerContent--overflowed | Styles applied to the virtualization content when its height is bigger than the virtualization container.
virtualScrollerRenderZone | .MuiDataGrid-virtualScrollerRenderZone | Styles applied to the virtualization render zone.
pinnedColumns | .MuiDataGrid-pinnedColumns | Styles applied to the pinned columns.
pinnedColumns--left | .MuiDataGrid-pinnedColumns--left | Styles applied to the left pinned columns.
pinnedColumns--right | .MuiDataGrid-pinnedColumns--right | Styles applied to the right pinned columns.
pinnedColumnHeaders | .MuiDataGrid-pinnedColumnHeaders | Styles applied to the pinned column headers.
pinnedColumnHeaders--left | .MuiDataGrid-pinnedColumnHeaders--left | Styles applied to the left pinned column headers.
pinnedColumnHeaders--right | .MuiDataGrid-pinnedColumnHeaders--right | Styles applied to the right pinned column headers.
root | .MuiDataGrid-root | Styles applied to the root element.
root--densityStandard | .MuiDataGrid-root--densityStandard | Styles applied to the root element if density is "standard" (default).
root--densityComfortable | .MuiDataGrid-root--densityComfortable | Styles applied to the root element if density is "comfortable".
root--densityCompact | .MuiDataGrid-root--densityCompact | Styles applied to the root element if density is "compact".
row--editable | .MuiDataGrid-row--editable | Styles applied to the row element if the row is editable.
row--editing | .MuiDataGrid-row--editing | Styles applied to the row element if the row is in edit mode.
row--dragging | .MuiDataGrid-row--dragging | Styles applied to the floating special row reorder cell element when it is dragged.
row--lastVisible | .MuiDataGrid-row--lastVisible | Styles applied to the last visible row element on every page of the grid.
row--dynamicHeight | .MuiDataGrid-row--dynamicHeight | Styles applied to the row if it has dynamic row height.
row--detailPanelExpanded | .MuiDataGrid-row--detailPanelExpanded | Styles applied to the row if its detail panel is open.
row | .MuiDataGrid-row | Styles applied to the row element.
rowCount | .MuiDataGrid-rowCount | Styles applied to the footer row count element to show the total number of rows. Only works when pagination is disabled.
rowReorderCellContainer | .MuiDataGrid-rowReorderCellContainer | Styles applied to the row reorder cell container element.
rowReorderCell | .MuiDataGrid-rowReorderCell | Styles applied to the root element of the row reorder cell
rowReorderCell--draggable | .MuiDataGrid-rowReorderCell--draggable | Styles applied to the root element of the row reorder cell when dragging is allowed
scrollArea | .MuiDataGrid-scrollArea | Styles applied to both scroll area elements.
scrollArea--left | .MuiDataGrid-scrollArea--left | Styles applied to the left scroll area element.
scrollArea--right | .MuiDataGrid-scrollArea--right | Styles applied to the right scroll area element.
selectedRowCount | .MuiDataGrid-selectedRowCount | Styles applied to the footer selected row count element.
sortIcon | .MuiDataGrid-sortIcon | Styles applied to the sort icon element.
toolbarContainer | .MuiDataGrid-toolbarContainer | Styles applied to the toolbar container element.
toolbarFilterList | .MuiDataGrid-toolbarFilterList | Styles applied to the toolbar filter list element.
withBorder | .MuiDataGrid-withBorder | Styles applied to both the cell and the column header if `showColumnRightBorder={true}`.
treeDataGroupingCell | .MuiDataGrid-treeDataGroupingCell | Styles applied to the root of the grouping cell of the tree data.
treeDataGroupingCellToggle | .MuiDataGrid-treeDataGroupingCellToggle | Styles applied to the toggle of the grouping cell of the tree data.
groupingCriteriaCell | .MuiDataGrid-groupingCriteriaCell | Styles applied to the root element of the grouping criteria cell
groupingCriteriaCellToggle | .MuiDataGrid-groupingCriteriaCellToggle | Styles applied to the toggle of the grouping criteria cell
pinnedRows | .MuiDataGrid-pinnedRows | Styles applied to the pinned rows container.
pinnedRows--top | .MuiDataGrid-pinnedRows--top | Styles applied to the top pinned rows container.
pinnedRows--bottom | .MuiDataGrid-pinnedRows--bottom | Styles applied to the bottom pinned rows container.
pinnedRowsRenderZone | .MuiDataGrid-pinnedRowsRenderZone | Styles applied to pinned rows render zones.
