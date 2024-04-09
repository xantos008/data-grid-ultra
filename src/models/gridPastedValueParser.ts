import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { GridApiUltra } from './gridApiUltra';

export type GridPastedValueParser<
  R extends GridValidRowModel = GridValidRowModel,
  V = any,
  F = V,
> = (
  value: string,
  row: R,
  column: GridColDef<R, V, F>,
  apiRef: React.MutableRefObject<GridApiUltra>,
) => V | undefined;
