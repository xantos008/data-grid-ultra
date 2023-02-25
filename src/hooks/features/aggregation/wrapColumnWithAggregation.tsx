import * as React from 'react';
import { GridRowId } from '../../../medium';
import { GridBaseColDef } from '../../../medium/internals';
import { GridApiPremium } from '../../../models/gridApiPremium';
import {
  GridAggregationCellMeta,
  GridAggregationHeaderMeta,
  GridAggregationLookup,
  GridAggregationPosition,
  GridAggregationRule,
} from './gridAggregationInterfaces';
import { gridAggregationLookupSelector } from './gridAggregationSelectors';
import { GridFooterCell } from '../../../components/GridFooterCell';
import { GridAggregationHeader } from '../../../components/GridAggregationHeader';

const AGGREGATION_WRAPPABLE_PROPERTIES = [
  'valueGetter',
  'valueFormatter',
  'renderCell',
  'renderHeader',
  'filterOperators',
] as const;

type WrappableColumnProperty = typeof AGGREGATION_WRAPPABLE_PROPERTIES[number];

interface GridColDefWithAggregationWrappers extends GridBaseColDef {
  aggregationWrappedProperties?: {
    [P in WrappableColumnProperty]?: { original: GridBaseColDef[P]; wrapped: GridBaseColDef[P] };
  };
}

type ColumnPropertyWrapper<P extends WrappableColumnProperty> = (params: {
  apiRef: React.MutableRefObject<GridApiPremium>;
  value: GridBaseColDef[P];
  colDef: GridBaseColDef;
  aggregationRule: GridAggregationRule;
  getCellAggregationResult: (
    id: GridRowId,
    field: string,
  ) => GridAggregationLookup[GridRowId][string] | null;
}) => GridBaseColDef[P];

const getAggregationValueWrappedValueGetter: ColumnPropertyWrapper<'valueGetter'> = ({
  value: valueGetter,
  getCellAggregationResult,
}) => {
  const wrappedValueGetter: GridBaseColDef['valueGetter'] = (params) => {
    const cellAggregationResult = getCellAggregationResult(params.id, params.field);
    if (cellAggregationResult != null) {
      return cellAggregationResult?.value ?? null;
    }

    if (valueGetter) {
      return valueGetter(params);
    }

    return params.row[params.field];
  };

  return wrappedValueGetter;
};

const getAggregationValueWrappedValueFormatter: ColumnPropertyWrapper<'valueFormatter'> = ({
  value: valueFormatter,
  aggregationRule,
  getCellAggregationResult,
}) => {
  // If neither the inline aggregation function nor the footer aggregation function have a custom value formatter,
  // Then we don't wrap the column value formatter
  if (!aggregationRule.aggregationFunction.valueFormatter) {
    return valueFormatter;
  }

  const wrappedValueFormatter: GridBaseColDef['valueFormatter'] = (params) => {
    if (params.id != null) {
      const cellAggregationResult = getCellAggregationResult(params.id, params.field);
      if (cellAggregationResult != null) {
        return aggregationRule.aggregationFunction.valueFormatter!(params);
      }
    }

    if (valueFormatter) {
      return valueFormatter(params);
    }

    return params.value;
  };

  return wrappedValueFormatter;
};

const getAggregationValueWrappedRenderCell: ColumnPropertyWrapper<'renderCell'> = ({
  value: renderCell,
  aggregationRule,
  getCellAggregationResult,
}) => {
  const wrappedRenderCell: GridBaseColDef['renderCell'] = (params) => {
    const cellAggregationResult = getCellAggregationResult(params.id, params.field);
    if (cellAggregationResult != null) {
      if (!renderCell) {
        if (cellAggregationResult.position === 'footer') {
          return <GridFooterCell {...params} />;
        }

        return params.formattedValue;
      }

      const aggregationMeta: GridAggregationCellMeta = {
        hasCellUnit: aggregationRule!.aggregationFunction.hasCellUnit ?? true,
        aggregationFunctionName: aggregationRule!.aggregationFunctionName,
      };

      return renderCell({ ...params, aggregation: aggregationMeta });
    }

    if (!renderCell) {
      return params.formattedValue;
    }

    return renderCell(params);
  };

  return wrappedRenderCell;
};

/**
 * Skips the filtering for aggregated rows
 */
const getWrappedFilterOperators: ColumnPropertyWrapper<'filterOperators'> = ({
  value: filterOperators,
  getCellAggregationResult,
}) =>
  filterOperators!.map((operator) => {
    return {
      ...operator,
      getApplyFilterFn: (filterItem, column) => {
        const originalFn = operator.getApplyFilterFn(filterItem, column);
        if (!originalFn) {
          return null;
        }

        return (params) => {
          if (getCellAggregationResult(params.id, params.field) != null) {
            return true;
          }

          return originalFn(params);
        };
      },
    };
  });

/**
 * Add the aggregation method around the header name
 */
const getWrappedRenderHeader: ColumnPropertyWrapper<'renderHeader'> = ({
  value: renderHeader,
  aggregationRule,
}) => {
  const wrappedRenderCell: GridBaseColDef['renderHeader'] = (params) => {
    const aggregationMeta: GridAggregationHeaderMeta = {
      aggregationRule,
    };

    if (!renderHeader) {
      return <GridAggregationHeader {...params} aggregation={aggregationMeta} />;
    }

    return renderHeader({ ...params, aggregation: aggregationMeta });
  };

  return wrappedRenderCell;
};

/**
 * Add a wrapper around each wrappable property of the column to customize the behavior of the aggregation cells.
 */
export const wrapColumnWithAggregationValue = ({
  column,
  apiRef,
  aggregationRule,
}: {
  column: GridBaseColDef;
  apiRef: React.MutableRefObject<GridApiPremium>;
  aggregationRule: GridAggregationRule;
}): GridBaseColDef => {
  const getCellAggregationResult = (
    id: GridRowId,
    field: string,
  ): GridAggregationLookup[GridRowId][string] | null => {
    let cellAggregationPosition: GridAggregationPosition | null = null;
    const rowNode = apiRef.current.getRowNode(id)!;

    if (rowNode.type === 'group') {
      cellAggregationPosition = 'inline';
    } else if (id.toString().startsWith('auto-generated-group-footer-')) {
      cellAggregationPosition = 'footer';
    }

    if (cellAggregationPosition == null) {
      return null;
    }

    // TODO: Add custom root id
    const groupId = cellAggregationPosition === 'inline' ? id : rowNode.parent ?? '';

    const aggregationResult = gridAggregationLookupSelector(apiRef)[groupId]?.[field];
    if (!aggregationResult || aggregationResult.position !== cellAggregationPosition) {
      return null;
    }

    return aggregationResult;
  };

  const aggregationWrappedProperties: GridColDefWithAggregationWrappers['aggregationWrappedProperties'] =
    {};
  const wrappedColumn: GridColDefWithAggregationWrappers = {
    ...column,
    aggregationWrappedProperties,
  };

  const wrapColumnProperty = <P extends WrappableColumnProperty>(
    property: P,
    wrapper: ColumnPropertyWrapper<P>,
  ) => {
    const originalValue = column[property];
    const wrappedProperty = wrapper({
      apiRef,
      value: originalValue,
      colDef: column,
      aggregationRule,
      getCellAggregationResult,
    });

    if (wrappedProperty !== originalValue) {
      aggregationWrappedProperties[property] = {
        original: originalValue,
        wrapped: wrappedProperty,
      } as any;
      wrappedColumn[property] = wrappedProperty;
    }
  };

  wrapColumnProperty('valueGetter', getAggregationValueWrappedValueGetter);
  wrapColumnProperty('valueFormatter', getAggregationValueWrappedValueFormatter);
  wrapColumnProperty('renderCell', getAggregationValueWrappedRenderCell);
  wrapColumnProperty('renderHeader', getWrappedRenderHeader);
  wrapColumnProperty('filterOperators', getWrappedFilterOperators);

  if (Object.keys(aggregationWrappedProperties).length === 0) {
    return column;
  }

  return wrappedColumn;
};

/**
 * Remove the aggregation wrappers around the wrappable properties of the column.
 */
export const unwrapColumnFromAggregation = ({
  column,
}: {
  column: GridColDefWithAggregationWrappers;
}) => {
  if (!column.aggregationWrappedProperties) {
    return column;
  }

  const originalProperties = Object.entries(column.aggregationWrappedProperties);
  if (originalProperties.length === 0) {
    return column;
  }

  const unwrappedColumn: GridBaseColDef = { ...column };

  originalProperties.forEach(([propertyName, { original, wrapped }]) => {
    // The value changed since we wrapped it
    if (wrapped !== column[propertyName as WrappableColumnProperty]) {
      return;
    }

    unwrappedColumn[propertyName as WrappableColumnProperty] = original as any;
  });

  return unwrappedColumn;
};
