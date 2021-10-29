import {
  CommonQueryErrorFragment,
  QueryError,
  SearchComponentsQuery,
} from '@atlassian/dragonfruit-graphql';

export { default as MessagesIntlProvider } from './services/messages-intl-provider';
export { default as addSupportedLocaleData } from './utils/add-supported-locale-data';
export { getTheme } from './common/utils';

export {
  withErrorBoundary,
  withDetailedErrorBoundary,
} from './ui/error-boundary';

export { CompassIntlProvider, useIntl } from './services/intl-context';

export { FetchError, fetchJson, postJson } from './services/rest';
export { useService, useGetRequestState } from './utils/use-service';
export type { FetchableServiceState, ServiceState } from './utils/use-service';

export type { Modify } from './utils/modify-type';

export { useDevMode, isInDevMode } from './services/dev-mode';

export {
  getAppConfigUrl,
  getComponentLinkUrl,
  getTeamDashboardUrl,
  mapPublicIdToAri,
  mapAriToPublicId,
  decodeUrlParamToAri,
} from './utils/urls';

export { teamIdToIdentityAri } from './utils/ari-utils';

export { validateUrl } from './utils/validate-url';
export { withContext } from './utils/with-context';

export {
  ComponentListTypeUrlParam,
  ComponentDetailPageUrlParam,
} from './constants';

// Runs the new page in a separate process
export const openInNewTab = (url: string) => {
  const otherWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (otherWindow) {
    otherWindow.opener = null;
  }
};

declare const COMPASS_PUBLIC_PATH: string;

export const getPublicPath = () => {
  // Default to /compass if the var doesn't exits
  // It will only exist when defined in the Webpack config with DefinePlugin
  if (typeof COMPASS_PUBLIC_PATH === 'undefined') {
    return '/compass';
  }

  return COMPASS_PUBLIC_PATH;
};

export {
  readJsonFromLocalStorage,
  writeToLocalStorage,
} from './services/cache/local-storage';

type SearchComponentsData = Required<
  Exclude<Required<SearchComponentsQuery>['compass'], null>
>['searchComponents'];
export type SearchComponentsComponentConnection = Exclude<
  SearchComponentsData,
  { __typename?: 'QueryError' } & CommonQueryErrorFragment
>;

export type SearchResponse = {
  endCursor?: string;
  queryError?: QueryError;
  connection?: SearchComponentsComponentConnection;
};

export function parseSearchComponentsResponse(
  res?: SearchComponentsData,
): SearchResponse {
  if (!res) {
    return {};
  }
  const connection =
    res.__typename === 'CompassSearchComponentConnection' ? res : undefined;
  const endCursor =
    res.__typename === 'CompassSearchComponentConnection' &&
    res.pageInfo.endCursor
      ? res.pageInfo.endCursor
      : undefined;
  const queryError = res.__typename === 'QueryError' ? res : undefined;

  return {
    queryError,
    endCursor,
    connection,
  };
}

export {
  buildComponentAri,
  buildTeamAri,
  buildAtlassianTeamProfileURL,
} from './main';

export { useSmartLinks } from './services/smart-links';
