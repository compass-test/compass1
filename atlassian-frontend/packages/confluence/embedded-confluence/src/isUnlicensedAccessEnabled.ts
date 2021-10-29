import urlModule from 'url';

import { getIframeObservable_DO_NOT_USE } from './iframe/getIframeObservable';
import type { IframePassThroughProps } from './iframe/IframeElementType';

const UNLICENSED_ACCESS_PROP_KEYS: (keyof IframePassThroughProps)[] = [
  'parentProduct',
  'parentProductContentContainerId',
];

/*
  This function checks whether Confluence FE should send custom headers for Unlicensed Access by checking the props that Parent Product provides.
  To allow Unlicensed Access, Parent Product must provide "parentProduct" and "parentProductContentContainerId" props.
  Parent Product can then use a Feature Flag to control when they want to enable this feature.
  https://hello.atlassian.net/wiki/spaces/CSOL/pages/1078550026/FE+Integration+with+Northstar+MVP+for+Unlicensed+User+Access
*/
export const isUnlicensedAccessEnabled_DO_NOT_USE = (location?: {
  search: string;
}): boolean => {
  if (!location) {
    location = window.location;
  }

  const { query } = urlModule.parse(location.search, true);
  const observableObject = getIframeObservable_DO_NOT_USE();

  return UNLICENSED_ACCESS_PROP_KEYS.every((key) =>
    Boolean(query[key] || observableObject?.object?.[key]),
  );
};
