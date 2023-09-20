export { SUBMIT_FILTER_STROKE_TIME, SUBMIT_FILTER_DATE_STROKE_TIME } from '@mui/x-data-grid';

/**
 * @deprecated Import DataGridUltra instead.
 */
export function DataGrid() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  throw new Error(
    [
      "You try to import `DataGrid` from data-grid-ultra but this module doesn't exist.",
      '',
      "Instead, you can do `import { DataGridUltra } from 'data-grid-ultra'`.",
    ].join('\n'),
  );
}

/**
 * @deprecated Import DataGridUltra instead.
 */
export function DataGridExtra() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  throw new Error(
    [
      "You try to import `DataGridExtra` from data-grid-ultra but this module doesn't exist.",
      '',
      "Instead, you can do `import { DataGridUltra } from 'data-grid-ultra'`.",
    ].join('\n'),
  );
}
