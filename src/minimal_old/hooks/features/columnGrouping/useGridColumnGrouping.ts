import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
import { GridColumnNode, isLeaf } from '../../../models/gridColumnGrouping';
import {
  gridColumnGroupsLookupSelector,
  gridColumnGroupsUnwrappedModelSelector,
} from './gridColumnGroupsSelector';
import { GridColumnGroupLookup } from './gridColumnGroupsInterfaces';
import { GridColumnGroupingApi } from '../../../models/api/gridColumnGroupingApi';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { getColumnGroupsHeaderStructure, unwrapGroupingColumnModel } from './gridColumnGroupsUtils';
import { useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { GridEventListener } from '../../../models/events';
import {
  gridColumnFieldsSelector,
  // GridColumnsState,
  gridVisibleColumnFieldsSelector,
} from '../columns';
import { useGridSelector } from '../../utils/useGridSelector';

const createGroupLookup = (columnGroupingModel: GridColumnNode[]): GridColumnGroupLookup => {
  let groupLookup: GridColumnGroupLookup = {};

  columnGroupingModel.forEach((node) => {
    if (isLeaf(node)) {
      return;
    }
    const { groupId, children, ...other } = node;
    if (!groupId) {
      throw new Error(
        'MUI: An element of the columnGroupingModel does not have either `field` or `groupId`.',
      );
    }
    if (!children) {
      console.warn(`MUI: group groupId=${groupId} has no children.`);
    }
    const groupParam = { ...other, groupId };
    const subTreeLookup = createGroupLookup(children);
    if (subTreeLookup[groupId] !== undefined || groupLookup[groupId] !== undefined) {
      throw new Error(
        `MUI: The groupId ${groupId} is used multiple times in the columnGroupingModel.`,
      );
    }
    groupLookup = { ...groupLookup, ...subTreeLookup, [groupId]: groupParam };
  });

  return { ...groupLookup };
};

export const columnGroupsStateInitializer: GridStateInitializer<
  Pick<DataGridProcessedProps, 'columnGroupingModel' | 'experimentalFeatures'>
> = (state, props, apiRef) => {
  if (!props.experimentalFeatures?.columnGrouping) {
    return state;
  }

  const columnFields = gridColumnFieldsSelector(apiRef);
  const visibleColumnFields = gridVisibleColumnFieldsSelector(apiRef);

  const groupLookup = createGroupLookup(props.columnGroupingModel ?? []);
  const unwrappedGroupingModel = unwrapGroupingColumnModel(props.columnGroupingModel ?? []);
  const columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(
    columnFields,
    unwrappedGroupingModel,
  );
  const maxDepth =
    visibleColumnFields.length === 0
      ? 0
      : Math.max(...visibleColumnFields.map((field) => unwrappedGroupingModel[field]?.length ?? 0));

  return {
    ...state,
    columnGrouping: {
      lookup: groupLookup,
      unwrappedGroupingModel,
      headerStructure: columnGroupsHeaderStructure,
      maxDepth,
    },
  };
};

/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
export const useGridColumnGrouping = (
  apiRef: React.MutableRefObject<GridPrivateApiCommunity>,
  props: Pick<DataGridProcessedProps, 'columnGroupingModel' | 'experimentalFeatures'>,
) => {
  /**
   * API METHODS
   */
  const getColumnGroupPath = React.useCallback<
    GridColumnGroupingApi['unstable_getColumnGroupPath']
  >(
    (field) => {
      const unwrappedGroupingModel = gridColumnGroupsUnwrappedModelSelector(apiRef);

      return unwrappedGroupingModel[field] ?? [];
    },
    [apiRef],
  );

  const getAllGroupDetails = React.useCallback<
    GridColumnGroupingApi['unstable_getAllGroupDetails']
  >(() => {
    const columnGroupLookup = gridColumnGroupsLookupSelector(apiRef);
    return columnGroupLookup;
  }, [apiRef]);

  const columnGroupingApi: GridColumnGroupingApi = {
    unstable_getColumnGroupPath: getColumnGroupPath,
    unstable_getAllGroupDetails: getAllGroupDetails,
  };

  useGridApiMethod(apiRef, columnGroupingApi, 'public');

  const handleColumnIndexChange = React.useCallback<GridEventListener<'columnIndexChange'>>(() => {
    const unwrappedGroupingModel = unwrapGroupingColumnModel(props.columnGroupingModel ?? []);

    apiRef.current.setState((state) => {
      const orderedFields = state.columns?.orderedFields ?? [];

      const columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(
        orderedFields as string[],
        unwrappedGroupingModel,
      );
      return {
        ...state,
        columnGrouping: {
          ...state.columnGrouping,
          headerStructure: columnGroupsHeaderStructure,
        },
      };
    });
  }, [apiRef, props.columnGroupingModel]);

  useGridApiEventHandler(apiRef, 'columnIndexChange', handleColumnIndexChange);

  const columnFields = useGridSelector(apiRef, gridColumnFieldsSelector);
  const visibleColumnFields = useGridSelector(apiRef, gridVisibleColumnFieldsSelector);
  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (!props.experimentalFeatures?.columnGrouping) {
      return;
    }
    const groupLookup = createGroupLookup(props.columnGroupingModel ?? []);
    const unwrappedGroupingModel = unwrapGroupingColumnModel(props.columnGroupingModel ?? []);
    const columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(
      columnFields,
      unwrappedGroupingModel,
    );
    const maxDepth =
      visibleColumnFields.length === 0
        ? 0
        : Math.max(
            ...visibleColumnFields.map((field) => unwrappedGroupingModel[field]?.length ?? 0),
          );

    apiRef.current.setState((state) => {
      return {
        ...state,
        columnGrouping: {
          lookup: groupLookup,
          unwrappedGroupingModel,
          headerStructure: columnGroupsHeaderStructure,
          maxDepth,
        },
      };
    });
  }, [
    apiRef,
    columnFields,
    visibleColumnFields,
    props.columnGroupingModel,
    props.experimentalFeatures?.columnGrouping,
  ]);
};
