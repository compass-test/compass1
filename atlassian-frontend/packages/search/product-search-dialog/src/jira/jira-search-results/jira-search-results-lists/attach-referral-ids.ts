import { addQueryParams } from '../../../utils/url-utils';

interface ReferralIds {
  searchSessionId: string;
  searchObjectId: string;
  searchContainerId?: string;
  searchContentType: 'issue' | 'board' | 'project' | 'filter' | 'plan';
}

export const attachJiraReferralIds = (href: string, ids: ReferralIds) => {
  return addQueryParams(href, ids);
};
