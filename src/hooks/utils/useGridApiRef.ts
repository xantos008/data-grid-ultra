import * as React from 'react';
import { GridApiCommon, useGridApiRef as useCommunityGridApiRef } from '../../mediumGrid';
import { GridApiUltra } from '../../models/gridApiUltra';

export const useGridApiRef = useCommunityGridApiRef as <
  Api extends GridApiCommon = GridApiUltra,
>() => React.MutableRefObject<Api>;
