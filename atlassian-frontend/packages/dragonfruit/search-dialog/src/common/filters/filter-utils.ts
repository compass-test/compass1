import { PeopleFilterOption } from '../../confluence/filter-context';
import { UserDetails } from '../user-context/user-context';
import { FilterOptionSource } from './types';

type UserFilterOptions = PeopleFilterOption;

export const attemptPrependCurrentUserToFilters = (
  user: UserDetails,
  filters: Array<UserFilterOptions>,
): Array<UserFilterOptions> => {
  if (user.name && user.id && user.avatarUrl) {
    return [
      {
        id: user.id,
        displayName: user.name,
        avatarUrl: user.avatarUrl,
        filterSource: FilterOptionSource.CURRENT_USER,
        isChecked: false,
        isVisible: false,
      },
      ...filters.filter((f) => f.id !== user.id),
    ];
  }
  return filters;
};
