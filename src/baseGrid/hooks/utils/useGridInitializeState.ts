import * as React from 'react';
import { GridApiCommon } from '../../models/api/gridApiCommon';
import { GridApiCommunity } from '../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type GridStateInitializer<
  P extends Partial<DataGridProcessedProps> = DataGridProcessedProps,
  Api extends GridApiCommon = GridApiCommunity,
> = (
  state: DeepPartial<Api['state']>,
  props: P,
  apiRef: React.MutableRefObject<Api>,
) => DeepPartial<Api['state']>;

export const useGridInitializeState = <
  P extends Partial<DataGridProcessedProps>,
  Api extends GridApiCommon = GridApiCommunity,
>(
  initializer: GridStateInitializer<P, Api>,
  apiRef: React.MutableRefObject<Api>,
  props: P,
) => {
  const isInitialized = React.useRef(false);

  if (!isInitialized.current) {
    apiRef.current.state = initializer(apiRef.current.state, props, apiRef) as Api['state'];
    isInitialized.current = true;
  }
};
