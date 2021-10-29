import { User } from '@atlaskit/user-picker';
import { routes } from '@atlassian/dragonfruit-routes';
import type { RecentlyViewedTeam } from '@atlassian/compass-search-cache';

export const isUser = (
  teamOrUser: RecentlyViewedTeam | User,
): teamOrUser is User => (teamOrUser as User).name !== undefined;

export const getTeamOrUserDisplayName = (
  teamOrUser: RecentlyViewedTeam | User,
): string => (isUser(teamOrUser) ? teamOrUser.name : teamOrUser.displayName);

export const getTeamOrUserAvatar = (
  teamOrUser: RecentlyViewedTeam | User,
): string | undefined =>
  isUser(teamOrUser) ? teamOrUser.avatarUrl : teamOrUser.smallAvatarImageUrl;

export const getTeamOrUserURL = (
  teamOrUser: RecentlyViewedTeam | User,
): string =>
  isUser(teamOrUser)
    ? `${window.location.origin}/people/${teamOrUser.id}`
    : routes.TEAM_DETAILS(teamOrUser.id.replace('ari:cloud:teams::team/', ''));
