import urlModule from 'url';

import { isEmbeddedConfluenceInIframe_DO_NOT_USE } from './iframe/isEmbeddedConfluenceInIframe';

export const isEmbeddedConfluence_DO_NOT_USE = (location?: {
  search: string;
}): boolean => {
  if (!location) {
    location = window.location;
  }

  const { query } = urlModule.parse(location.search, true);

  return (
    query.embedded === 'true' ||
    Boolean(query.parentProduct) ||
    isEmbeddedConfluenceInIframe_DO_NOT_USE()
  );
};
