import * as React from 'react';
import { GridApiCommon, useGridApiContext as useCommunityGridApiContext } from '../../../baseGrid';
import { GridApiPro } from '../../models/gridApiPro';

export const useGridApiContext = useCommunityGridApiContext as <
  GridApi extends GridApiCommon = GridApiPro,
>() => React.MutableRefObject<GridApi>;
