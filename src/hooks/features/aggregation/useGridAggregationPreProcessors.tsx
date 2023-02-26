import * as React from 'react';
import { gridColumnLookupSelector } from 'data-grid-extra';
import {
  GridPipeProcessor,
  GridRestoreStatePreProcessingContext,
  useGridRegisterPipeProcessor,
} from 'data-grid-extra/internals';
import { GridPrivateApiUltra } from '../../../models/gridApiUltra';
import {
  getAvailableAggregationFunctions,
  addFooterRows,
  getAggregationRules,
  mergeStateWithAggregationModel,
} from './gridAggregationUtils';
import {
  wrapColumnWithAggregationValue,
  unwrapColumnFromAggregation,
} from './wrapColumnWithAggregation';
import { DataGridUltraProcessedProps } from '../../../models/dataGridUltraProps';
import { gridAggregationModelSelector } from './gridAggregationSelectors';
import { GridInitialStateUltra } from '../../../models/gridStateUltra';
import { GridAggregationRules } from './gridAggregationInterfaces';

export const useGridAggregationPreProcessors = (
  apiRef: React.MutableRefObject<GridPrivateApiUltra>,
  props: Pick<
    DataGridUltraProcessedProps,
    'aggregationFunctions' | 'disableAggregation' | 'getAggregationPosition' | 'slotProps' | 'slots'
  >,
) => {
  // apiRef.current.caches.aggregation.rulesOnLastColumnHydration is not used because by the time
  // that the pre-processor is called it will already have been updated with the current rules.
  const rulesOnLastColumnHydration = React.useRef<GridAggregationRules>({});

  const updateAggregatedColumns = React.useCallback<GridPipeProcessor<'hydrateColumns'>>(
    (columnsState) => {
      const aggregationRules = props.disableAggregation
        ? {}
        : getAggregationRules({
            columnsLookup: columnsState.lookup,
            aggregationModel: gridAggregationModelSelector(apiRef),
            aggregationFunctions: props.aggregationFunctions,
          });

      columnsState.orderedFields.forEach((field) => {
        const shouldHaveAggregationValue = !!aggregationRules[field];
        const haveAggregationColumnValue = !!rulesOnLastColumnHydration.current[field];

        let column = columnsState.lookup[field];

        if (haveAggregationColumnValue) {
          column = unwrapColumnFromAggregation({
            column,
          });
        }

        if (shouldHaveAggregationValue) {
          column = wrapColumnWithAggregationValue({
            column,
            aggregationRule: aggregationRules[field],
            apiRef,
          });
        }

        columnsState.lookup[field] = column;
      });

      rulesOnLastColumnHydration.current = aggregationRules;

      return columnsState;
    },
    [apiRef, props.aggregationFunctions, props.disableAggregation],
  );

  const addGroupFooterRows = React.useCallback<GridPipeProcessor<'hydrateRows'>>(
    (value) => {
      const aggregationRules = props.disableAggregation
        ? {}
        : getAggregationRules({
            columnsLookup: gridColumnLookupSelector(apiRef),
            aggregationModel: gridAggregationModelSelector(apiRef),
            aggregationFunctions: props.aggregationFunctions,
          });

      const hasAggregationRule = Object.keys(aggregationRules).length > 0;

      // If we did not have any aggregation footer before, and we still don't have any,
      // Then we can skip this step
      if (
        Object.keys(apiRef.current.caches.aggregation.rulesOnLastRowHydration).length === 0 &&
        !hasAggregationRule
      ) {
        return value;
      }

      apiRef.current.caches.aggregation.rulesOnLastRowHydration = aggregationRules;

      return addFooterRows({
        apiRef,
        groupingParams: value,
        getAggregationPosition: props.getAggregationPosition,
        hasAggregationRule,
      });
    },
    [apiRef, props.disableAggregation, props.getAggregationPosition, props.aggregationFunctions],
  );

  const addColumnMenuButtons = React.useCallback<GridPipeProcessor<'columnMenu'>>(
    (columnMenuItems, colDef) => {
      if (props.disableAggregation) {
        return columnMenuItems;
      }

      const availableAggregationFunctions = getAvailableAggregationFunctions({
        aggregationFunctions: props.aggregationFunctions,
        colDef,
      });

      if (availableAggregationFunctions.length === 0) {
        return columnMenuItems;
      }

      return [...columnMenuItems, 'ColumnMenuAggregationItem'];
    },
    [props.aggregationFunctions, props.disableAggregation],
  );

  const stateExportPreProcessing = React.useCallback<GridPipeProcessor<'exportState'>>(
    (prevState) => {
      if (props.disableAggregation) {
        return prevState;
      }

      const aggregationModelToExport = gridAggregationModelSelector(apiRef);

      if (Object.values(aggregationModelToExport).length === 0) {
        return prevState;
      }

      return {
        ...prevState,
        aggregation: {
          model: aggregationModelToExport,
        },
      };
    },
    [apiRef, props.disableAggregation],
  );

  const stateRestorePreProcessing = React.useCallback<GridPipeProcessor<'restoreState'>>(
    (params, context: GridRestoreStatePreProcessingContext<GridInitialStateUltra>) => {
      if (props.disableAggregation) {
        return params;
      }

      const aggregationModel = context.stateToRestore.aggregation?.model;
      if (aggregationModel != null) {
        apiRef.current.setState(mergeStateWithAggregationModel(aggregationModel));
      }
      return params;
    },
    [apiRef, props.disableAggregation],
  );

  useGridRegisterPipeProcessor(apiRef, 'hydrateColumns', updateAggregatedColumns);
  useGridRegisterPipeProcessor(apiRef, 'hydrateRows', addGroupFooterRows);
  useGridRegisterPipeProcessor(apiRef, 'columnMenu', addColumnMenuButtons);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
};
