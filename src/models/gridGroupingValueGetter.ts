import React from "react";
import { GridValidRowModel, GridColDef, GridKeyValue } from 'data-grid-extra';
import { GridApiUltra } from './gridApiUltra';

export type GridGroupingValueGetter<
  R extends GridValidRowModel = GridValidRowModel,
  TValue = never,
> = (
  value: TValue,
  row: R,
  column: GridColDef<R>,
  apiRef: React.MutableRefObject<GridApiUltra>,
) => GridKeyValue | null | undefined;
