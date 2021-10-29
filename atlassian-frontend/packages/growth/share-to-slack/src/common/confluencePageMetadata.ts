type BaseContentPage = {
  spaceId: number;
  spaceKey: string;
  pageId: string;
  pageTitle: string;
  version: number;
};

type Page = BaseContentPage & { type: 'page' };
type BlogPost = BaseContentPage & { type: 'blogpost' };

type ContentPage = Page | BlogPost;

type ContentPageResponse = {
  id: number;
  title: string;
  space: {
    id: number;
    key: string;
  };
  version: {
    number: number;
  };
};

type OverviewResponse = {
  id: number; // space ID
  homepage: {
    id: string;
    type: 'page';
    title: string;
    version: {
      number: number;
    };
  };
};

const pagePattern = /^\/wiki\/spaces\/[^/]+\/pages\/(\d+)/;
const blogPostPattern = /^\/wiki\/spaces\/[^/]+\/blog\/\d{4}\/\d{2}\/\d{2}\/([0-9]+)\//;
const overviewPagePattern = /^\/wiki\/spaces\/([^/]+)\/overview/;

/**
 * Fetch a Confluence page's metadata given its URL's path.
 *
 * @param pathname - a Confluence page URL's path
 * @returns the content page's metadata or undefined if the path isn't that of a
 *          content page
 */
export async function getConfluencePageMetadata(
  pathname: string,
): Promise<ContentPage | undefined> {
  if (pagePattern.test(pathname)) {
    return getPage(pathname);
  }

  if (blogPostPattern.test(pathname)) {
    return getBlogPost(pathname);
  }

  if (overviewPagePattern.test(pathname)) {
    return getOverview(pathname);
  }

  return undefined;
}

async function getPage(pathname: string): Promise<Page> {
  const [, pageId] = pagePattern.exec(pathname)!;

  const { title, version, space } = await fetch(
    `/wiki/rest/api/content/${pageId}`,
  ).then<ContentPageResponse>((response) => response.json());

  return {
    type: 'page',
    spaceId: space.id,
    spaceKey: space.key,
    pageId,
    pageTitle: title,
    version: version.number,
  };
}

async function getBlogPost(pathname: string): Promise<BlogPost> {
  const [, pageId] = blogPostPattern.exec(pathname)!;

  const { title, version, space } = await fetch(
    `/wiki/rest/api/content/${pageId}`,
  ).then<ContentPageResponse>((response) => response.json());

  return {
    type: 'blogpost',
    spaceId: space.id,
    spaceKey: space.key,
    pageId,
    pageTitle: title,
    version: version.number,
  };
}

async function getOverview(pathname: string): Promise<Page> {
  const [, spaceKey] = overviewPagePattern.exec(pathname)!;

  const { id, homepage } = await fetch(
    `/wiki/rest/api/space/${spaceKey}?expand=homepage.version`,
  ).then<OverviewResponse>((response) => response.json());

  return {
    type: 'page',
    spaceId: id,
    spaceKey,
    pageId: homepage.id,
    pageTitle: homepage.title,
    version: homepage.version.number,
  };
}
