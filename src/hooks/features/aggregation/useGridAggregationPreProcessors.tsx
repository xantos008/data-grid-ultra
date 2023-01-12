import * as React from 'react';
import MuiDivider from '@mui/material/Divider';
import { gridColumnLookupSelector } from '../../../mediumGrid';
import {
  GridPipeProcessor,
  GridRestoreStatePreProcessingContext,
  GridRowTreeCreationValue,
  useGridRegisterPipeProcessor,
} from '../../../mediumGrid/internals';
import { GridApiUltra } from '../../../models/gridApiUltra';
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
import { GridAggregationColumnMenuItem } from '../../../components/GridAggregationColumnMenuItem';
import { gridAggregationModelSelector } from './gridAggregationSelectors';
import { GridInitialStateUltra } from '../../../models/gridStateUltra';
import { GridAggregationRules } from './gridAggregationInterfaces';

const Divider = () => <MuiDivider onClick={(event) => event.stopPropagation()} />;

export const useGridAggregationPreProcessors = (
  apiRef: React.MutableRefObject<GridApiUltra>,
  props: Pick<
    DataGridUltraProcessedProps,
    'aggregationFunctions' | 'disableAggregation' | 'getAggregationPosition'
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

      columnsState.all.forEach((field) => {
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
    (groupingParams) => {
      let newGroupingParams: GridRowTreeCreationValue;
      let rulesOnLastRowHydration: GridAggregationRules;

      if (props.disableAggregation) {
        newGroupingParams = groupingParams;
        rulesOnLastRowHydration = {};
      } else {
        const aggregationRules = getAggregationRules({
          columnsLookup: gridColumnLookupSelector(apiRef),
          aggregationModel: gridAggregationModelSelector(apiRef),
          aggregationFunctions: props.aggregationFunctions,
        });

        rulesOnLastRowHydration = aggregationRules;

        // If no column have an aggregation rule
        // Then don't create the footer rows
        if (Object.values(aggregationRules).length === 0) {
          newGroupingParams = groupingParams;
        } else {
          newGroupingParams = addFooterRows({
            groupingParams,
            aggregationRules,
            getAggregationPosition: props.getAggregationPosition,
            apiRef,
          });
        }
      }

      apiRef.current.unstable_caches.aggregation.rulesOnLastRowHydration = rulesOnLastRowHydration;

      return newGroupingParams;
    },
    [apiRef, props.disableAggregation, props.getAggregationPosition, props.aggregationFunctions],
  );

  const addColumnMenuButtons = React.useCallback<GridPipeProcessor<'columnMenu'>>(
    (initialValue, column) => {
      if (props.disableAggregation) {
        return initialValue;
      }

      const availableAggregationFunctions = getAvailableAggregationFunctions({
        aggregationFunctions: props.aggregationFunctions,
        column,
      });

      if (availableAggregationFunctions.length === 0) {
        return initialValue;
      }

      return [
        ...initialValue,
        <Divider />,
        <GridAggregationColumnMenuItem
          column={column}
          label={apiRef.current.getLocaleText('aggregationMenuItemHeader')}
          availableAggregationFunctions={availableAggregationFunctions}
        />,
      ];
    },
    [apiRef, props.aggregationFunctions, props.disableAggregation],
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
