import * as React from 'react';
import { GridRootPropsContext } from '../../context/GridRootPropsContext';
import type { DataGridProcessedProps } from '../../models/props/DataGridProps';

export const useGridRootProps = () => {
  const contextValue = React.useContext(GridRootPropsContext);

  if (!contextValue) {
    throw new Error(
      'useGridRootProps should only be used inside the DataGrid, DataGridPro or DataGridUltra component.',
    );
  }

  return contextValue as DataGridProcessedProps;
};
