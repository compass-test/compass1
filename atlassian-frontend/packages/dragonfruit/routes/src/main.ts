import {
  CompassComponent,
  Extension,
  User,
} from '@atlassian/dragonfruit-graphql';

import { ARI_PREFIX } from './constants';
import { extractComponentId } from './services/parse-ari';
import { getPublicPath } from './services/public-path';
import { encodeURIParam } from './services/uri-param';
import {
  ComponentDetailPageUrlParam,
  ComponentListTypeUrlParam,
} from './types';

const root = getPublicPath();

export const routes = {
  HOME: () => `${root}/`,

  COMPONENTS: (
    componentType?: ComponentListTypeUrlParam | ':componentType?',
  ) => {
    return componentType
      ? `${root}/components/${componentType}`
      : `${root}/components`;
  },

  COMPONENT_DETAILS: (
    componentId: CompassComponent['id'] | ':componentId',
    componentPage?: ComponentDetailPageUrlParam | ':componentPage?',
  ) => {
    // Extract the component ID from the provided ARI
    // If the value provided is not an ARI then the value will pass through unchanged
    componentId = extractComponentId(componentId) ?? '';

    return componentPage
      ? `${root}/component/${componentId}/${componentPage}`
      : `${root}/component/${componentId}`;
  },

  COMPONENT_DETAILS_APP: (
    componentId: CompassComponent['id'] | ':componentId',
    extensionId: Extension['id'] | ':extensionId',
  ) => {
    // Extract the component ID from the provided ARI
    // If the value provided is not an ARI then the value will pass through unchanged
    componentId = extractComponentId(componentId) ?? '';

    // Extension IDs are full ARIs that cannot be simplified, they can only be encoded
    extensionId = extensionId.startsWith(ARI_PREFIX)
      ? encodeURIParam(extensionId)
      : extensionId;

    return `${root}/component/${componentId}/app/${extensionId}`;
  },

  // TODO: Typehint to Team['id'] | ':teamId'
  // We don't have teams in AGG/GraphQL so there's no auto-generated type we can reference yet.
  TEAM_DETAILS: (teamId: string | ':teamId') => `${root}/people/team/${teamId}`,

  TEAMS: () => `${root}/people/teams`,

  PEOPLE: (accountID: User['accountId'] | ':accountId') =>
    `${root}/people/${accountID}`,

  SETTINGS: () => `${root}/settings`,

  SCORECARD_LIST: () => `${root}/scorecards`,
  SCORECARD_DETAILS: (scorecardId: string | ':scorecardId') =>
    `${root}/scorecard/${scorecardId}`,

  APPS: () => `${root}/apps`,

  APP_CONFIGURATION: (extensionId: Extension['id'] | ':extensionId') => {
    // Extension IDs are full ARIs that cannot be simplified, they can only be encoded
    extensionId = extensionId.startsWith(ARI_PREFIX)
      ? encodeURIParam(extensionId)
      : extensionId;

    return `${root}/apps/${extensionId}`;
  },

  CSV_IMPORT: () => `${root}/csv-import`,
};
