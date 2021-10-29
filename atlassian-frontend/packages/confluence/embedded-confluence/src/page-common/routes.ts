export const EDIT_PAGE_EMBED = {
  name: 'EDIT_PAGE_EMBED',
  pattern:
    '/wiki/spaces/:spaceKey/:contentType(pages)/edit-embed/:contentId(\\d+)/:contentSlug?',
};

export const EDIT_PAGE_V2 = {
  name: 'EDIT_PAGE_V2',
  pattern:
    '/wiki/spaces/:spaceKey/:contentType(pages)/edit-v2/:contentId(\\d+)/:contentSlug?',
};

export const SPACE_OVERVIEW = {
  name: 'SPACE_OVERVIEW',
  pattern: '/wiki/spaces/:spaceKey/overview',
};

export const VIEW_PAGE = {
  name: 'VIEW_PAGE',
  pattern: '/wiki/spaces/:spaceKey/pages/:contentId(\\d+)/:contentSlug?',
};

export const VIEW_BLOG = {
  name: 'VIEW_BLOG',
  pattern: '/wiki/spaces/:spaceKey/blog/:contentId(\\d+)/:contentSlug?',
};

export const VIEW_BLOG_DATE_LEGACY = {
  name: 'VIEW_BLOG_DATE_LEGACY',
  pattern:
    '/wiki/spaces/:spaceKey/blog/:year(\\d+)/:month(\\d+)/:day(\\d+)/:contentId(\\d+)/:contentSlug?',
};
