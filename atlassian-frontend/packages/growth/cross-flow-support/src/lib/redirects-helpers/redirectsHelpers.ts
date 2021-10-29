import { TargetType, Targets } from '@atlassiansox/cross-flow-api-internals';
import {
  WAC_STAGING_URL,
  WAC_PROD_URL,
  WAC_BUNDLE_SIGNUP_PATH,
  OPSGENIE_SIGNUP_PATH,
  WAC_SIGNUP_PATH,
} from './constants';
import { Environment, UtmCampaign, UtmCampaignType } from '../types';

type BundleKeys =
  | typeof Targets.JIRA_SOFTWARE
  | typeof Targets.JIRA_SERVICE_DESK
  | typeof Targets.JIRA_CORE
  | typeof Targets.CONFLUENCE;

type CustomRedirectKeys = typeof Targets.OPSGENIE;

const utmCampaignMap = {
  'atlassian-switcher': UtmCampaign['atlassian-switcher'],
};

const isBundledProduct = (productKey: TargetType): productKey is BundleKeys => {
  return [
    Targets.JIRA_SOFTWARE,
    Targets.JIRA_SERVICE_DESK,
    Targets.JIRA_CORE,
    Targets.CONFLUENCE,
  ].includes(productKey as BundleKeys);
};

const getBundleSignUpParams = (productKey: BundleKeys) => {
  const bundles: Record<BundleKeys, string> = {
    [Targets.JIRA_SOFTWARE]: 'jira-software',
    [Targets.JIRA_SERVICE_DESK]: 'jira-service-desk',
    [Targets.JIRA_CORE]: 'jira-core',
    [Targets.CONFLUENCE]: 'confluence',
  };
  // Bundles default to free
  return `bundle=${bundles[productKey]}&edition=free`;
};

const isProductWithCustomSignUpPath = (
  productKey: TargetType,
): productKey is CustomRedirectKeys => {
  return [Targets.OPSGENIE].includes(productKey as CustomRedirectKeys);
};

const getProductCustomSignUpPath = (productKey: CustomRedirectKeys) => {
  // Only Opsgenie. Trello, Bitbucket and Statuspage are handled by Product Store directly.
  const links: Record<CustomRedirectKeys, string> = {
    [Targets.OPSGENIE]: OPSGENIE_SIGNUP_PATH,
  };
  return links[productKey];
};

const isSourceComponentWithUtmParams = (
  sourceComponent: string,
): sourceComponent is UtmCampaignType => {
  return Boolean(utmCampaignMap[sourceComponent as UtmCampaignType]);
};

const getUtmParams = (sourceComponent?: string, sourceContext?: string) => {
  let utmParams = '';
  if (sourceComponent && isSourceComponentWithUtmParams(sourceComponent)) {
    utmParams =
      utmParams +
      `utm_campaign=${utmCampaignMap[sourceComponent]}&utm_medium=in_product_ad`;

    if (sourceContext) {
      utmParams = utmParams + `&utm_source=${sourceContext}`;
    }
  }

  return utmParams;
};

export const getProductSignUpLink = (
  productKey: TargetType,
  env?: Environment,
  sourceComponent?: string,
  sourceContext?: string,
) => {
  const wacUrl = env === 'staging' ? WAC_STAGING_URL : WAC_PROD_URL;
  const utmParams = getUtmParams(sourceComponent, sourceContext);
  let queryParams = '';
  let bundleParams = '';
  let path = WAC_SIGNUP_PATH;

  if (isBundledProduct(productKey)) {
    path = WAC_BUNDLE_SIGNUP_PATH;
    bundleParams = getBundleSignUpParams(productKey);
  } else if (isProductWithCustomSignUpPath(productKey)) {
    path = getProductCustomSignUpPath(productKey);
  }

  if (!!bundleParams) {
    queryParams = queryParams + `?${bundleParams}`;
  }

  if (!!utmParams) {
    queryParams = queryParams + (!!queryParams ? '&' : '?') + utmParams;
  }

  return wacUrl + path + queryParams;
};

export const setProductSignUpLocation = (
  productKey: TargetType,
  env: Environment = 'production',
  sourceComponent?: string,
  sourceContext?: string,
) => {
  const url = getProductSignUpLink(
    productKey,
    env,
    sourceComponent,
    sourceContext,
  );
  window.open(url, '_blank');
};
