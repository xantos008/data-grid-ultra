import * as React from 'react';
import {
  unstable_composeClasses as composeClasses,
  unstable_useEventCallback as useEventCallback,
} from '@mui/utils';
import { styled, alpha, useTheme } from '@mui/material/styles';
import {
  getDataGridUtilityClass,
  gridClasses,
  useGridSelector,
  useGridApiEventHandler,
  gridVisibleColumnFieldsSelector,
  GridColumnHeaderSeparatorSides,
} from '../../minimal';
import {
  GridColumnHeaders,
  GridColumnHeadersInner,
  useGridColumnHeaders,
} from '../../minimal/internals';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { DataGridProProcessedProps } from '../models/dataGridProProps';
import {
  gridPinnedColumnsSelector,
  GridPinnedPosition,
  GridPinnedColumns,
} from '../hooks/features/columnPinning';
import { filterColumns } from './DataGridProVirtualScroller';

type OwnerState = DataGridProProcessedProps & {
  leftPinnedColumns: GridPinnedColumns['left'];
  rightPinnedColumns: GridPinnedColumns['right'];
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { leftPinnedColumns, rightPinnedColumns, classes } = ownerState;

  const slots = {
    leftPinnedColumns: [
      'pinnedColumnHeaders',
      leftPinnedColumns && leftPinnedColumns.length > 0 && `pinnedColumnHeaders--left`,
    ],
    rightPinnedColumns: [
      'pinnedColumnHeaders',
      rightPinnedColumns && rightPinnedColumns.length > 0 && `pinnedColumnHeaders--right`,
      'withBorderColor',
    ],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

interface GridColumnHeadersPinnedColumnHeadersProps {
  side: GridPinnedPosition;
  showCellVerticalBorder: boolean;
}

// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
const getOverlayAlpha = (elevation: number) => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return alphaValue / 100;
};

const GridColumnHeadersPinnedColumnHeaders = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedColumnHeaders',
  overridesResolver: (props, styles) => [
    { [`&.${gridClasses['pinnedColumnHeaders--left']}`]: styles['pinnedColumnHeaders--left'] },
    { [`&.${gridClasses['pinnedColumnHeaders--right']}`]: styles['pinnedColumnHeaders--right'] },
    styles.pinnedColumnHeaders,
  ],
})<{ ownerState: OwnerState & GridColumnHeadersPinnedColumnHeadersProps }>(
  ({ theme, ownerState }) => ({
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[2],
    backgroundColor: ((theme as any).vars || theme).palette.background.default,
    ...((theme as any).vars
      ? {
          backgroundImage: (theme as any).vars.overlays?.[2],
        }
      : {
          ...(theme.palette.mode === 'dark' && {
            backgroundImage: `linear-gradient(${alpha('#fff', getOverlayAlpha(2))}, ${alpha(
              '#fff',
              getOverlayAlpha(2),
            )})`,
          }),
        }),
    ...(ownerState.side === GridPinnedPosition.left && { left: 0 }),
    ...(ownerState.side === GridPinnedPosition.right && { right: 0 }),
    ...(ownerState.side === GridPinnedPosition.right &&
      ownerState.showCellVerticalBorder && {
        borderLeftWidth: '1px',
        borderLeftStyle: 'solid',
      }),
  }),
);

interface DataGridProColumnHeadersProps extends React.HTMLAttributes<HTMLDivElement> {
  innerRef?: React.Ref<HTMLDivElement>;
}

export const DataGridProColumnHeaders = React.forwardRef<
  HTMLDivElement,
  DataGridProColumnHeadersProps
>(function DataGridProColumnHeaders(props, ref) {
  const { style, className, innerRef, ...other } = props;
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();
  const visibleColumnFields = useGridSelector(apiRef, gridVisibleColumnFieldsSelector);
  const [scrollbarSize, setScrollbarSize] = React.useState(0);
  const theme = useTheme();

  const handleContentSizeChange = useEventCallback(() => {
    const rootDimensions = apiRef.current.getRootDimensions();
    if (!rootDimensions) {
      return;
    }

    const newScrollbarSize = rootDimensions.hasScrollY ? rootDimensions.scrollBarSize : 0;
    if (scrollbarSize !== newScrollbarSize) {
      setScrollbarSize(newScrollbarSize);
    }
  });

  useGridApiEventHandler(apiRef, 'virtualScrollerContentSizeChange', handleContentSizeChange);

  const pinnedColumns = useGridSelector(apiRef, gridPinnedColumnsSelector);
  const [leftPinnedColumns, rightPinnedColumns] = filterColumns(
    pinnedColumns,
    visibleColumnFields,
    theme.direction === 'rtl',
  );

  const {
    isDragging,
    renderContext,
    getRootProps,
    getInnerProps,
    getColumnHeaders,
    getColumnGroupHeaders,
  } = useGridColumnHeaders({
    innerRef,
    minColumnIndex: leftPinnedColumns.length,
  });

  const ownerState = {
    ...rootProps,
    leftPinnedColumns,
    rightPinnedColumns,
    classes: rootProps.classes,
  };
  const classes = useUtilityClasses(ownerState);

  const leftRenderContext =
    renderContext && leftPinnedColumns.length
      ? {
          ...renderContext,
          firstColumnIndex: 0,
          lastColumnIndex: leftPinnedColumns.length,
        }
      : null;

  const rightRenderContext =
    renderContext && rightPinnedColumns.length
      ? {
          ...renderContext,
          firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
          lastColumnIndex: visibleColumnFields.length,
        }
      : null;

  const innerProps = getInnerProps();

  const pinnedColumnHeadersProps = {
    role: innerProps.role,
  };

  return (
    <GridColumnHeaders ref={ref} className={className} {...getRootProps(other)}>
      {leftRenderContext && (
        <GridColumnHeadersPinnedColumnHeaders
          className={classes.leftPinnedColumns}
          ownerState={{
            ...ownerState,
            side: GridPinnedPosition.left,
            showCellVerticalBorder: rootProps.showCellVerticalBorder,
          }}
          {...pinnedColumnHeadersProps}
        >
          {getColumnGroupHeaders({
            renderContext: leftRenderContext,
            minFirstColumn: leftRenderContext.firstColumnIndex,
            maxLastColumn: leftRenderContext.lastColumnIndex,
          })}
          {getColumnHeaders(
            {
              renderContext: leftRenderContext,
              minFirstColumn: leftRenderContext.firstColumnIndex,
              maxLastColumn: leftRenderContext.lastColumnIndex,
            },
            { disableReorder: true },
          )}
        </GridColumnHeadersPinnedColumnHeaders>
      )}
      <GridColumnHeadersInner isDragging={isDragging} {...innerProps}>
        {getColumnGroupHeaders({
          renderContext,
          minFirstColumn: leftPinnedColumns.length,
          maxLastColumn: visibleColumnFields.length - rightPinnedColumns.length,
        })}
        {getColumnHeaders({
          renderContext,
          minFirstColumn: leftPinnedColumns.length,
          maxLastColumn: visibleColumnFields.length - rightPinnedColumns.length,
        })}
      </GridColumnHeadersInner>
      {rightRenderContext && (
        <GridColumnHeadersPinnedColumnHeaders
          ownerState={{
            ...ownerState,
            side: GridPinnedPosition.right,
            showCellVerticalBorder: rootProps.showCellVerticalBorder,
          }}
          className={classes.rightPinnedColumns}
          style={{ paddingRight: scrollbarSize }}
          {...pinnedColumnHeadersProps}
        >
          {getColumnGroupHeaders({
            renderContext: rightRenderContext,
            minFirstColumn: rightRenderContext.firstColumnIndex,
            maxLastColumn: rightRenderContext.lastColumnIndex,
          })}
          {getColumnHeaders(
            {
              renderContext: rightRenderContext,
              minFirstColumn: rightRenderContext.firstColumnIndex,
              maxLastColumn: rightRenderContext.lastColumnIndex,
            },
            { disableReorder: true, separatorSide: GridColumnHeaderSeparatorSides.Left },
          )}
        </GridColumnHeadersPinnedColumnHeaders>
      )}
    </GridColumnHeaders>
  );
});
