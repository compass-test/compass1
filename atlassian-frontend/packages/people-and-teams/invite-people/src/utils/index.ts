import { useEffect } from 'react';
import {
  AtlassianIcon,
  JiraIcon,
  BitbucketIcon,
  ConfluenceIcon,
  TrelloIcon,
  JiraServiceManagementIcon,
  JiraSoftwareIcon,
  JiraWorkManagementIcon,
  OpsgenieIcon,
  StatuspageIcon,
} from '@atlaskit/logo';
import { Resource, ResourceAri } from './../types';

const ADMIN_STAGING_URL = 'http://admin.stg.atlassian.com';

const ADMIN_PROD_URL = 'https://admin.atlassian.com';

export const isProd = (): boolean =>
  window.location.host.includes('-dev.com') ? false : true;

export const CLOUD_ADMIN_URL = isProd() ? ADMIN_PROD_URL : ADMIN_STAGING_URL;

export const extractDomainFromEmail = (email: string): string | null => {
  const parts = email.split('@');

  if (parts.length === 1) {
    return null;
  } else if (parts.length === 2 && !parts[0]) {
    return null;
  } else if (!parts[parts.length - 1]) {
    return null;
  }

  return parts[parts.length - 1];
};

export const makeAri = (productId: string, cloudId: string) =>
  `ari:cloud:${productId}::site/${cloudId}`;

// parsing logic from identity-common-frontend
export const parseAri = (resourceAri: ResourceAri): Resource => {
  const splittedAri = resourceAri.split(':');
  const resourceOwner = splittedAri[2];
  const resourceTypeIdPair = splittedAri[4];
  const [resourceType, ...resourceIdParts] = resourceTypeIdPair.split('/');
  const resourceId = resourceIdParts.join('/');
  return { resourceOwner, resourceType, resourceId };
};

export const getProductIdFromResource = (
  resourceAri: ResourceAri,
): string | undefined => {
  try {
    const { resourceOwner } = parseAri(resourceAri);
    return resourceOwner;
  } catch (err) {
    return undefined;
  }
};

export const getCloudIdFromResource = (
  resourceAri: ResourceAri,
): string | undefined => {
  try {
    const { resourceId } = parseAri(resourceAri);
    return resourceId;
  } catch (err) {
    return undefined;
  }
};

export const getProductTitle = (productId: string): string => {
  switch (productId) {
    case 'confluence':
      return 'Confluence';
    case 'jira-core':
      return 'Jira Work Management';
    case 'jira-servicedesk':
      return 'Jira Service Management';
    case 'jira-software':
      return 'Jira Software';
    case 'jira':
      return 'Jira';
    case 'opsgenie':
      return 'Opsgenie';
    case 'statuspage':
      return 'Statuspage';
    case 'trello':
      return 'Trello';
    case 'bitbucket':
      return 'Bitbucket';
    case 'compass':
      return 'Compass';
    case 'townsquare':
      return 'Team Central';
    default:
      // return resource owner if product doesn't match
      return productId || 'Atlassian';
  }
};

export const getProductTitleFromAri = (resourceAri: ResourceAri): string => {
  const productId = getProductIdFromResource(resourceAri);

  return getProductTitle(productId || '');
};

export const getProductId = (product: string): string => {
  switch (product) {
    case 'Confluence':
      return 'confluence';
    case 'Jira Work Management':
      return 'jira-core';
    case 'Jira Service Management':
      return 'jira-servicedesk';
    case 'Jira Software':
      return 'jira-software';
    case 'Jira':
      return 'jira';
    case 'Compass':
      return 'compass';
    case 'Team Central':
      return 'townsquare';
    default:
      // if product doesn't match return the same parameter
      return product;
  }
};

export const getLandingPathByProduct = (product: string): string => {
  switch (product) {
    case 'confluence':
      return '/wiki';
    case 'compass':
      return '/compass';
    default:
      return '';
  }
};

export const getProductIcon = (productId: string) => {
  switch (productId) {
    case 'confluence':
      return ConfluenceIcon;
    case 'jira-core':
      return JiraWorkManagementIcon;
    case 'jira-servicedesk':
      return JiraServiceManagementIcon;
    case 'jira-software':
      return JiraSoftwareIcon;
    case 'jira':
      return JiraIcon;
    case 'trello':
      return TrelloIcon;
    case 'bitbucket':
      return BitbucketIcon;
    case 'statuspage':
      return StatuspageIcon;
    case 'opsgenie':
      return OpsgenieIcon;
    case 'compass':
      return AtlassianIcon;
    case 'townsquare':
      return AtlassianIcon;
    default:
      return AtlassianIcon;
  }
};

export const normalizeJiraSubProduct = (subProduct: string) =>
  `jira-${subProduct.toLowerCase()}`;

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

export const isEnglishLocale = (locale: string): boolean => {
  return (locale || '').toLowerCase().startsWith('en');
};

export const createEmptyArray = (numberOfElements: number = 0): string[] => {
  const array = [];

  for (let i = 0; i < numberOfElements; i++) {
    array.push('');
  }

  return array;
};

export function Buggy() {
  useEffect(() => {
    throw new Error('Something wrong inside Invite people.');
  });

  return null;
}

export const getUniqueEmailDomains = (emails: string[]) => {
  const domains = new Set<string>();
  emails.forEach((email) => {
    const domain = extractDomainFromEmail(email);
    if (domain) {
      domains.add(domain);
    }
  });
  return Array.from(domains);
};

export enum ResultStatus {
  FULFILLED = 'fulfilled',
  FAILED = 'failed',
}

export type FulfilledResult<T> = {
  status: ResultStatus.FULFILLED;
  value: T;
};

export type RejectedResult<R> = {
  status: ResultStatus.FAILED;
  errorDetails: R;
};

const markFullfilled = <T>(value: T): FulfilledResult<T> => ({
  status: ResultStatus.FULFILLED,
  value: value,
});

const markRejected = <R>(errorDetails: R): RejectedResult<R> => ({
  status: ResultStatus.FAILED,
  errorDetails,
});

/**
 * Will wait for all promises to resolve or reject, wrapping their real results in
 * object containing the status so it's easy to filter it later. Loosely inspired by
 * [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
 * which can replace this implementation once it makes to the browsers.
 * @param promises
 */
export const waitForAllPromises = <T, R>(
  promises: Promise<T>[],
): Promise<(FulfilledResult<T> | RejectedResult<R>)[]> => {
  return Promise.all(
    promises.map((result: Promise<T>) =>
      result.then(markFullfilled).catch(markRejected),
    ),
  );
};

// This function is used to get the 'location' required for the direct access post endpoint.
export const getDirectAccessLocation = (productId: string): string => {
  switch (productId) {
    case 'confluence':
      return 'confluence.core-invites';
    case 'jira-core':
    case 'jira-servicedesk':
    case 'jira-software':
    case 'jira':
      return 'jira.core-invites';
    default:
      return 'others.core-invites';
  }
};

// extends unknown is to avoid type error when using Generics with arrow functions
// mutates cache reference, will clear once it gets too large.
export const tryCacheWithClear = <Type extends unknown>(
  cache: Map<string, Type>,
  key: string,
  value: Type,
  size: number = 50,
) => {
  if (cache.size >= size) {
    cache.clear();
  }

  cache.set(key, value);
};

// A number of experiments currently depend on inviteeList, checks if inviteeList is enabled
export const resolveCohort = <T>(
  cohort: T,
  defaultCohort: T,
  enableInviteeList: boolean,
  thirdPartyOk: boolean,
): [T, Array<string>] => {
  let finalCohort = cohort;
  const reasons = [];
  if (!enableInviteeList && !thirdPartyOk) {
    reasons.push('noInviteeList');
    finalCohort = defaultCohort;
  }

  return [finalCohort, reasons];
};
