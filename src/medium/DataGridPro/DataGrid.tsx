/**
 * @deprecated Import DataGridPro instead.
 */
export function DataGrid() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  throw new Error(
    [
      "You try to import `DataGrid` from data-grid-ultra but this module doesn't exist.",
      '',
      "Instead, you can do `import { DataGridPro } from data-grid-ultra`.",
    ].join('\n'),
  );
}

/**
 * @deprecated Import DataGridPro instead.
 */
export function DataGridUltra() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  throw new Error(
    [
      "You try to import `DataGridUltra` but this module doesn't exist.",
      '',
      "Instead, you can do `import { DataGridUltra } from 'data-grid-ultra'`.",
    ].join('\n'),
  );
}
