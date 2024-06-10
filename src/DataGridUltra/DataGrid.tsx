/**
 * @deprecated Import DataGridUltra instead.
 */
export function DataGrid() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  throw new Error(
    [
      "You try to import `DataGrid` from xantos008/data-grid-ultra but this module doesn't exist.",
      '',
      "Instead, you can do `import DataGridUltra from 'xantos008/data-grid-ultra'`.",
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
      "You try to import `DataGridExtra` from xantos008/data-grid-ultra but this module doesn't exist.",
      '',
      "Instead, you can do `import DataGridUltra from 'xantos008/data-grid-ultra'`.",
    ].join('\n'),
  );
}
