import * as React from 'react';
import MuiDivider from '@mui/material/Divider';
import {
  GridEventListener,
  useGridApiEventHandler,
  useGridApiMethod,
  gridFilteredDescendantCountLookupSelector,
  gridColumnLookupSelector,
} from '../../../mediumGrid';
import {
  useGridRegisterPipeProcessor,
  GridPipeProcessor,
  GridRestoreStatePreProcessingContext,
  GridStateInitializer,
} from '../../../mediumGrid/internals';
import { GridApiPremium } from '../../../models/gridApiPremium';
import {
  gridRowGroupingModelSelector,
  gridRowGroupingSanitizedModelSelector,
} from './gridRowGroupingSelector';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
import {
  getRowGroupingFieldFromGroupingCriteria,
  ROW_GROUPING_STRATEGY,
  isGroupingColumn,
  mergeStateWithRowGroupingModel,
  setStrategyAvailability,
  getGroupingRules,
  areGroupingRulesEqual,
} from './gridRowGroupingUtils';
import { GridRowGroupingApi } from './gridRowGroupingInterfaces';
import { GridRowGroupableColumnMenuItems } from '../../../components/GridRowGroupableColumnMenuItems';
import { GridRowGroupingColumnMenuItems } from '../../../components/GridRowGroupingColumnMenuItems';
import { GridInitialStatePremium } from '../../../models/gridStatePremium';

const Divider = () => <MuiDivider onClick={(event) => event.stopPropagation()} />;

export const rowGroupingStateInitializer: GridStateInitializer<
  Pick<DataGridPremiumProcessedProps, 'rowGroupingModel' | 'initialState'>
> = (state, props, apiRef) => {
  apiRef.current.unstable_caches.rowGrouping = {
    rulesOnLastRowTreeCreation: [],
  };

  return {
    ...state,
    rowGrouping: {
      model: props.rowGroupingModel ?? props.initialState?.rowGrouping?.model ?? [],
    },
  };
};

/**
 * @requires useGridColumns (state, method) - can be after, async only
 * @requires useGridRows (state, method) - can be after, async only
 * @requires useGridParamsApi (method) - can be after, async only
 */
export const useGridRowGrouping = (
  apiRef: React.MutableRefObject<GridApiPremium>,
  props: Pick<
    DataGridPremiumProcessedProps,
    | 'initialState'
    | 'rowGroupingModel'
    | 'onRowGroupingModelChange'
    | 'defaultGroupingExpansionDepth'
    | 'isGroupExpandedByDefault'
    | 'groupingColDef'
    | 'rowGroupingColumnMode'
    | 'disableRowGrouping'
  >,
) => {
  apiRef.current.unstable_registerControlState({
    stateId: 'rowGrouping',
    propModel: props.rowGroupingModel,
    propOnChange: props.onRowGroupingModelChange,
    stateSelector: gridRowGroupingModelSelector,
    changeEvent: 'rowGroupingModelChange',
  });

  /**
   * API METHODS
   */
  const setRowGroupingModel = React.useCallback<GridRowGroupingApi['setRowGroupingModel']>(
    (model) => {
      const currentModel = gridRowGroupingModelSelector(apiRef);
      if (currentModel !== model) {
        apiRef.current.setState(mergeStateWithRowGroupingModel(model));
        setStrategyAvailability(apiRef, props.disableRowGrouping);
        apiRef.current.forceUpdate();
      }
    },
    [apiRef, props.disableRowGrouping],
  );

  const addRowGroupingCriteria = React.useCallback<GridRowGroupingApi['addRowGroupingCriteria']>(
    (field, groupingIndex) => {
      const currentModel = gridRowGroupingModelSelector(apiRef);
      if (currentModel.includes(field)) {
        return;
      }

      const cleanGroupingIndex = groupingIndex ?? currentModel.length;

      const updatedModel = [
        ...currentModel.slice(0, cleanGroupingIndex),
        field,
        ...currentModel.slice(cleanGroupingIndex),
      ];

      apiRef.current.setRowGroupingModel(updatedModel);
    },
    [apiRef],
  );

  const removeRowGroupingCriteria = React.useCallback<
    GridRowGroupingApi['removeRowGroupingCriteria']
  >(
    (field) => {
      const currentModel = gridRowGroupingModelSelector(apiRef);
      if (!currentModel.includes(field)) {
        return;
      }
      apiRef.current.setRowGroupingModel(currentModel.filter((el) => el !== field));
    },
    [apiRef],
  );

  const setRowGroupingCriteriaIndex = React.useCallback<
    GridRowGroupingApi['setRowGroupingCriteriaIndex']
  >(
    (field, targetIndex) => {
      const currentModel = gridRowGroupingModelSelector(apiRef);
      const currentTargetIndex = currentModel.indexOf(field);

      if (currentTargetIndex === -1) {
        return;
      }

      const updatedModel = [...currentModel];
      updatedModel.splice(targetIndex, 0, updatedModel.splice(currentTargetIndex, 1)[0]);

      apiRef.current.setRowGroupingModel(updatedModel);
    },
    [apiRef],
  );

  const rowGroupingApi: GridRowGroupingApi = {
    setRowGroupingModel,
    addRowGroupingCriteria,
    removeRowGroupingCriteria,
    setRowGroupingCriteriaIndex,
  };

  useGridApiMethod(apiRef, rowGroupingApi, 'GridRowGroupingApi');

  /**
   * PRE-PROCESSING
   */
  const addColumnMenuButtons = React.useCallback<GridPipeProcessor<'columnMenu'>>(
    (initialValue, column) => {
      if (props.disableRowGrouping) {
        return initialValue;
      }

      let menuItems: React.ReactNode;
      if (isGroupingColumn(column.field)) {
        menuItems = <GridRowGroupingColumnMenuItems />;
      } else if (column.groupable) {
        menuItems = <GridRowGroupableColumnMenuItems />;
      } else {
        menuItems = null;
      }

      if (menuItems == null) {
        return initialValue;
      }

      return [...initialValue, <Divider />, menuItems];
    },
    [props.disableRowGrouping],
  );

  const stateExportPreProcessing = React.useCallback<GridPipeProcessor<'exportState'>>(
    (prevState, context) => {
      const rowGroupingModelToExport = gridRowGroupingModelSelector(apiRef);

      const shouldExportRowGroupingModel =
        // Always export if the `exportOnlyDirtyModels` property is activated
        !context.exportOnlyDirtyModels ||
        // Always export if the model is controlled
        props.rowGroupingModel != null ||
        // Always export if the model has been initialized
        props.initialState?.rowGrouping?.model != null ||
        // Export if the model is not empty
        Object.keys(rowGroupingModelToExport).length > 0;

      if (!shouldExportRowGroupingModel) {
        return prevState;
      }

      return {
        ...prevState,
        rowGrouping: {
          model: rowGroupingModelToExport,
        },
      };
    },
    [apiRef, props.rowGroupingModel, props.initialState?.rowGrouping?.model],
  );

  const stateRestorePreProcessing = React.useCallback<GridPipeProcessor<'restoreState'>>(
    (params, context: GridRestoreStatePreProcessingContext<GridInitialStatePremium>) => {
      if (props.disableRowGrouping) {
        return params;
      }

      const rowGroupingModel = context.stateToRestore.rowGrouping?.model;
      if (rowGroupingModel != null) {
        apiRef.current.setState(mergeStateWithRowGroupingModel(rowGroupingModel));
      }
      return params;
    },
    [apiRef, props.disableRowGrouping],
  );

  useGridRegisterPipeProcessor(apiRef, 'columnMenu', addColumnMenuButtons);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);

  /**
   * EVENTS
   */
  const handleCellKeyDown = React.useCallback<GridEventListener<'cellKeyDown'>>(
    (params, event) => {
      const cellParams = apiRef.current.getCellParams(params.id, params.field);
      if (isGroupingColumn(cellParams.field) && event.key === ' ' && !event.shiftKey) {
        event.stopPropagation();
        event.preventDefault();

        const filteredDescendantCount =
          gridFilteredDescendantCountLookupSelector(apiRef)[params.id] ?? 0;

        const isOnGroupingCell =
          props.rowGroupingColumnMode === 'single' ||
          getRowGroupingFieldFromGroupingCriteria(params.rowNode.groupingField) === params.field;
        if (!isOnGroupingCell || filteredDescendantCount === 0) {
          return;
        }

        apiRef.current.setRowChildrenExpansion(params.id, !params.rowNode.childrenExpanded);
      }
    },
    [apiRef, props.rowGroupingColumnMode],
  );

  const checkGroupingColumnsModelDiff = React.useCallback<
    GridEventListener<'columnsChange'>
  >(() => {
    const sanitizedRowGroupingModel = gridRowGroupingSanitizedModelSelector(apiRef);
    const rulesOnLastRowTreeCreation =
      apiRef.current.unstable_caches.rowGrouping.rulesOnLastRowTreeCreation;

    const groupingRules = getGroupingRules({
      sanitizedRowGroupingModel,
      columnsLookup: gridColumnLookupSelector(apiRef),
    });

    if (!areGroupingRulesEqual(rulesOnLastRowTreeCreation, groupingRules)) {
      apiRef.current.unstable_caches.rowGrouping.rulesOnLastRowTreeCreation = groupingRules;
      apiRef.current.unstable_requestPipeProcessorsApplication('hydrateColumns');
      setStrategyAvailability(apiRef, props.disableRowGrouping);

      // Refresh the row tree creation strategy processing
      // TODO: Add a clean way to re-run a strategy processing without publishing a private event
      if (apiRef.current.unstable_getActiveStrategy('rowTree') === ROW_GROUPING_STRATEGY) {
        apiRef.current.publishEvent('activeStrategyProcessorChange', 'rowTreeCreation');
      }
    }
  }, [apiRef, props.disableRowGrouping]);

  useGridApiEventHandler(apiRef, 'cellKeyDown', handleCellKeyDown);
  useGridApiEventHandler(apiRef, 'columnsChange', checkGroupingColumnsModelDiff);
  useGridApiEventHandler(apiRef, 'rowGroupingModelChange', checkGroupingColumnsModelDiff);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (props.rowGroupingModel !== undefined) {
      apiRef.current.setRowGroupingModel(props.rowGroupingModel);
    }
  }, [apiRef, props.rowGroupingModel]);
};
