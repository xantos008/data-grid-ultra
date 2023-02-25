import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useGridSelector } from '../../../../hooks/utils/useGridSelector';
import { gridSortModelSelector } from '../../../../hooks/features/sorting/gridSortingSelector';
import { GridSortDirection } from '../../../../models/gridSortModel';
import { useGridApiContext } from '../../../../hooks/utils/useGridApiContext';
import { GridColumnMenuItemProps } from '../GridColumnMenuItemProps';
import { useGridRootProps } from '../../../../hooks/utils/useGridRootProps';

function GridColumnMenuSortItem(props: GridColumnMenuItemProps) {
  const { colDef, onClick } = props;
  const apiRef = useGridApiContext();
  const sortModel = useGridSelector(apiRef, gridSortModelSelector);
  const rootProps = useGridRootProps();

  const sortDirection = React.useMemo(() => {
    if (!colDef) {
      return null;
    }
    const sortItem = sortModel.find((item) => item.field === colDef.field);
    return sortItem?.sort;
  }, [colDef, sortModel]);

  const sortingOrder: GridSortDirection[] = colDef.sortingOrder ?? rootProps.sortingOrder;

  const onSortMenuItemClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onClick(event);
      const direction = event.currentTarget.getAttribute('data-value') || null;
      apiRef.current.sortColumn(
        colDef!,
        (direction === sortDirection ? null : direction) as GridSortDirection,
      );
    },
    [apiRef, colDef, onClick, sortDirection],
  );

  if (!colDef || !colDef.sortable || !sortingOrder.some((item) => !!item)) {
    return null;
  }

  return (
    <React.Fragment>
      {sortingOrder.includes('asc') && sortDirection !== 'asc' ? (
        <MenuItem onClick={onSortMenuItemClick} data-value="asc">
          <ListItemIcon>
            <rootProps.slots.columnMenuSortAscendingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{apiRef.current.getLocaleText('columnMenuSortAsc')}</ListItemText>
        </MenuItem>
      ) : null}
      {sortingOrder.includes('desc') && sortDirection !== 'desc' ? (
        <MenuItem onClick={onSortMenuItemClick} data-value="desc">
          <ListItemIcon>
            <rootProps.slots.columnMenuSortDescendingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{apiRef.current.getLocaleText('columnMenuSortDesc')}</ListItemText>
        </MenuItem>
      ) : null}
      {sortingOrder.includes(null) && sortDirection != null ? (
        <MenuItem onClick={onSortMenuItemClick}>
          <ListItemIcon />
          <ListItemText>{apiRef.current.getLocaleText('columnMenuUnsort')}</ListItemText>
        </MenuItem>
      ) : null}
    </React.Fragment>
  );
}

GridColumnMenuSortItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
} as any;

export { GridColumnMenuSortItem };
