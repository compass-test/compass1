import { ProductKeys } from '../constants';

export const siteUrlForProduct = (
  baseUrl: string,
  product: ProductKeys,
): string => {
  if (!baseUrl) {
    return '';
  }
  // Jira uses the base URL, confluence uses base URL + '/wiki'
  if (product === ProductKeys.CONFLUENCE) {
    return baseUrl + '/wiki';
  } else {
    return baseUrl;
  }
};

// Resolve the product key to a display name.
// TODO - There must be a more standard way to do this.
export const productDisplayName = (product: ProductKeys): string => {
  if (product === ProductKeys.CONFLUENCE) {
    return 'Confluence';
  } else if (product === ProductKeys.JIRA_SOFTWARE) {
    return 'Jira Software';
  } else {
    return product;
  }
};

export const adminHubProductAccessHref = (cloudId: string): string => {
  return cloudId ? `/s/${cloudId}/apps` : '';
};

export const adminHubManageUsersHref = (cloudId: string): string => {
  return cloudId ? `/s/${cloudId}/users` : '';
};

export const titleCase = (sentence: string): string | null => {
  if (typeof sentence !== 'string') {
    return null;
  }
  return sentence
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
};
