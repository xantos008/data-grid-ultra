import { GridValueFormatterParams } from 'data-grid-extra';
import { isNumber } from 'data-grid-extra/internals';
import { GridAggregationFunction } from './gridAggregationInterfaces';

const sumAgg: GridAggregationFunction<number> = {
  apply: ({ values }) => {
    let sum = 0;
    for (let i = 0; i < values.length; i += 1) {
      const value = values[i];
      if (value != null) {
        sum += value;
      }
    }

    return sum;
  },
  columnTypes: ['number'],
};

const avgAgg: GridAggregationFunction<number> = {
  apply: (params) => {
    if (params.values.length === 0) {
      return null;
    }

    const sum = sumAgg.apply(params) as number;
    return sum / params.values.length;
  },
  columnTypes: ['number'],
};

const minAgg: GridAggregationFunction<number | Date> = {
  apply: ({ values }) => {
    if (values.length === 0) {
      return null;
    }

    let min: number | Date = +Infinity;
    for (let i = 0; i < values.length; i += 1) {
      const value = values[i];
      if (value != null && value < min) {
        min = value;
      }
    }

    return min;
  },
  columnTypes: ['number', 'date', 'dateTime'],
};

const maxAgg: GridAggregationFunction<number | Date> = {
  apply: ({ values }) => {
    if (values.length === 0) {
      return null;
    }

    let max: number | Date = -Infinity;
    for (let i = 0; i < values.length; i += 1) {
      const value = values[i];
      if (value != null && value > max) {
        max = value;
      }
    }

    return max;
  },
  columnTypes: ['number', 'date', 'dateTime'],
};

const sizeAgg: GridAggregationFunction<number> = {
  apply: ({ values }) => {
    return values.length;
  },
  valueFormatter: (params: GridValueFormatterParams) => {
    if (params.value == null || !isNumber(params.value)) {
      return params.value;
    }

    return params.value.toLocaleString();
  },
  hasCellUnit: false,
};

export const GRID_AGGREGATION_FUNCTIONS = {
  sum: sumAgg,
  avg: avgAgg,
  min: minAgg,
  max: maxAgg,
  size: sizeAgg,
};
