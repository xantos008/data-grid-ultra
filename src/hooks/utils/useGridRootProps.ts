import { useGridRootProps as useCommunityGridRootProps } from '../../mediumGrid';
import { DataGridPremiumProcessedProps } from '../../models/dataGridPremiumProps';

export const useGridRootProps = useCommunityGridRootProps as () => DataGridPremiumProcessedProps;
