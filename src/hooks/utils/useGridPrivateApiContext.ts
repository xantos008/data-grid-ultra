import { useGridPrivateApiContext as useCommunityGridPrivateApiContext } from '../../minimal/internals';
import { GridPrivateApiPremium } from '../../models/gridApiPremium';

export const useGridPrivateApiContext = useCommunityGridPrivateApiContext<GridPrivateApiPremium>;
