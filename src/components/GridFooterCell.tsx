import * as React from 'react';
import { getDataGridUtilityClass, GridRenderCellParams } from '@mui/x-data-grid';
import { styled, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { DataGridUltraProcessedProps } from '../models/dataGridUltraProps';

const GridFooterCellRoot = styled(Box, {
  name: 'MuiDataGrid',
  slot: 'FooterCell',
  overridesResolver: (_, styles) => styles.footerCell,
})<{ ownerState: OwnerState }>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: ((theme as any).vars || theme).palette.primary.dark,
}));

interface GridFooterCellProps extends GridRenderCellParams {
  sx?: SxProps<Theme>;
}

type OwnerState = DataGridUltraProcessedProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['footerCell'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

function GridFooterCell(props: GridFooterCellProps) {
  const {
    formattedValue,
    colDef,
    cellMode,
    row,
    api,
    id,
    value,
    rowNode,
    field,
    focusElementRef,
    hasFocus,
    tabIndex,
    isEditable,
    ...other
  } = props;
  const rootProps = useGridRootProps();

  const ownerState = rootProps;
  const classes = useUtilityClasses(ownerState);

  return (
    <GridFooterCellRoot ownerState={ownerState} className={classes.root} {...other}>
      {formattedValue}
    </GridFooterCellRoot>
  );
}

export { GridFooterCell };
