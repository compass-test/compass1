import type { App } from '../../common/types';

export const refineApp = (json: any): App => {
  try {
    // Guard the type
    if (
      typeof json.key === 'string' &&
      typeof json.name === 'string' &&
      typeof json._embedded.logo._links.image.href === 'string' &&
      typeof json._links.alternate.href === 'string'
    ) {
      return {
        key: json.key,
        name: json.name,
        logoUrl: json._embedded.logo._links.image.href,
        marketplaceUrl: `https://marketplace.atlassian.com${json._links.alternate.href}`,
      };
    }

    // Marketplace returns unexpected type, throw error
    throw new Error();
  } catch (err) {
    // Re-throw error to have meaningful error message
    throw new Error('Marketplace API response type error');
  }
};
