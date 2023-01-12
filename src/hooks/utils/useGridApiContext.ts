import * as React from 'react';
import {
  GridApiCommon,
  useGridApiContext as useCommunityGridApiContext,
} from '../../mediumGrid';
import { GridApiUltra } from '../../models/gridApiUltra';

export const useGridApiContext = useCommunityGridApiContext as <
  GridApi extends GridApiCommon = GridApiUltra,
>() => React.MutableRefObject<GridApi>;
