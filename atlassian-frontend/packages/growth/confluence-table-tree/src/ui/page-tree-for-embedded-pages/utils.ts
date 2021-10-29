import { PageTreeItemProperties } from './types';

export const pageAnalyticsAttributes = (page: PageTreeItemProperties) => ({
  hasEmbeddedEditing: page.hasEmbeddedEdit,
  pageType: page.isDraft ? 'draft' : 'page',
});
