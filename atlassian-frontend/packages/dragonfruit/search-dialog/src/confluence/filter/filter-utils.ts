import { FilterOptionSource } from '../../common/filters/types';
import { CurrentSpaceInfo } from '../confluence-features/confluence-features';
import { SpaceFilterOption } from '../filter-context';

export const attemptPrependCurrentSpaceToSpaceFilters = (
  spaceFilters: SpaceFilterOption[],
  currentSpace?: CurrentSpaceInfo,
): SpaceFilterOption[] => {
  if (
    currentSpace &&
    currentSpace.iconUrl &&
    currentSpace.spaceKey &&
    currentSpace.spaceName
  ) {
    return [
      {
        spaceName: currentSpace.spaceName,
        id: currentSpace.spaceKey,
        iconUrl: currentSpace.iconUrl,
        filterSource: FilterOptionSource.EXTERNAL,
        isChecked: false,
        isVisible: false,
      },
      ...spaceFilters.filter((f) => f.id !== currentSpace.spaceKey),
    ];
  }
  return spaceFilters;
};
