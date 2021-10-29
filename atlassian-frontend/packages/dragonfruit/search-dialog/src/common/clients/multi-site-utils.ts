import { Site } from './common-types';

interface SiteConfig {
  siteUrl?: string;
  sites?: Array<Site>;
}

export const extractSiteUrl = ({ siteUrl, sites }: SiteConfig): string => {
  if (siteUrl) {
    return siteUrl;
  }

  if (sites && sites.length > 0) {
    return sites[0].siteUrl;
  }

  return '';
};

export const mapTenantIdToSiteUrl = (
  siteId: string,
  sites: Array<Site>,
): string => {
  const matchingSite = sites.find((site) => site.cloudId === siteId);
  return matchingSite ? matchingSite.siteUrl : '';
};

export const extractSiteIdBySiteUrl = (
  absSiteUrl: string,
  sites: Array<Site> = [],
): string => {
  const baseUrlRegex = /^(http(s)?:\/\/[^\/]+)/;
  const urlRegexMatches = absSiteUrl.match(baseUrlRegex);
  if (!urlRegexMatches) {
    return '';
  }
  const baseUrl = urlRegexMatches[0];
  const matchingSite = sites.find((site) => site.siteUrl === baseUrl);
  return matchingSite ? matchingSite.cloudId : '';
};

/**
 * Absolute urls lead to people profile i.e. <host>/people/<id> ,
 * but inside confluence/jira we want to retain <host>/wiki/people/<id> or <host>/jira/people/<id>.
 * Aggregator is unaware CPUS is being called from which product.
 * Hence this field will be used for only the multi site behaviour.
 */
export const generatePeopleProfileUrl = (
  isMultiSite: boolean,
  absoluteUrl: string = '',
  accountId: string,
  contextPath: string = '',
) => {
  if (isMultiSite && absoluteUrl) {
    return absoluteUrl;
  }
  return contextPath
    ? `/${contextPath}/people/${accountId}`
    : `/people/${accountId}`;
};

const MAX_SITES_INITIAL_QUERY = 3;

export const limitToMaxSiteUsage = (sites: Site[] = []): Site[] => {
  return sites.slice(0, MAX_SITES_INITIAL_QUERY);
};
