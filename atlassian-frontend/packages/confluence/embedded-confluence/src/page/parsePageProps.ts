import urlModule from 'url';
import { matchPath } from 'react-router';

import type { PageCommonProps } from '../page-common';
import { namedRoutes } from '../page-common';
import type { PageProps } from './Page';
import {
  VIEW_PAGE,
  VIEW_BLOG,
  VIEW_BLOG_DATE_LEGACY,
  EDIT_PAGE_EMBED,
  EDIT_PAGE_V2,
} from '../page-common/routes';
import { EMBEDDED_CONFLUENCE_MODE } from '../page-common/EmbeddedConfluenceMode';

type ParsedProps = PageCommonProps & {
  contentId: string;
  parentProduct: string;
  protocol: string;
  mode: EMBEDDED_CONFLUENCE_MODE | null | undefined;
};

export function parsePageProps(props: PageProps): ParsedProps {
  let {
    contentId = '',
    hostname,
    parentProduct = '',
    spaceKey,
    url,
    ...passThroughProps
  } = props;

  if (!url) {
    return {
      contentId,
      hostname,
      parentProduct,
      spaceKey,
      protocol: 'https:',
      mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
      ...passThroughProps,
    };
  }

  const parsedProps = parseUrl(url);

  if (!parsedProps) {
    return {
      hostname,
      contentId,
      spaceKey,
      parentProduct,
      mode: null,
      protocol: 'https:',
      ...passThroughProps,
    };
  }

  // If the props are explicity passed in along with URL, those passed-in props will be overriding the URL-extract props.
  contentId = contentId || parsedProps.contentId;
  parentProduct = parentProduct || parsedProps.parentProduct;
  hostname = hostname || parsedProps.hostname || window.location.hostname;
  spaceKey = spaceKey || parsedProps.spaceKey;

  let mode = null;
  switch (parsedProps.route) {
    case VIEW_PAGE.name:
    case VIEW_BLOG.name:
    case VIEW_BLOG_DATE_LEGACY.name:
      mode = EMBEDDED_CONFLUENCE_MODE.VIEW_MODE;
      break;
    case EDIT_PAGE_EMBED.name:
    case EDIT_PAGE_V2.name:
      mode = EMBEDDED_CONFLUENCE_MODE.EDIT_MODE;
  }

  return {
    hostname,
    contentId,
    spaceKey,
    parentProduct,
    mode,
    protocol: parsedProps.protocol,
    ...passThroughProps,
  };
}

function parseUrl(url: string | undefined) {
  if (!url) {
    return null;
  }

  const matchedRoute = findAndMatchRoute(namedRoutes, url);

  if (!matchedRoute) {
    return null;
  }

  const { routeName, ...match } = matchedRoute;
  return {
    route: routeName,
    hostname: match.host,
    protocol: match.protocol,
    contentId: match.params.contentId || '',
    spaceKey: match.params.spaceKey || '',
    // EP currently supports only 1 parent product, no more than 1 parent product should be passed in
    parentProduct: Array.isArray(match.query.parentProduct)
      ? match.query.parentProduct[0]
      : match.query.parentProduct || '',
  };
}

function findAndMatchRoute(routes: typeof namedRoutes, url: string) {
  for (const routeName of Object.keys(routes)) {
    const pattern = routes[routeName].pattern;
    const match = matchUrl(pattern, url);
    if (match) {
      return { routeName, ...match };
    }
  }
}

type UrlMatch = {
  url: string;
  protocol: string;
  host: string;
  pathname: string;
  search: string;
  hash: string;
  pattern: string;
  params: { [key: string]: string };
  query: { [key: string]: string | string[] | undefined };
};

function matchUrl(pattern: string, url: string): UrlMatch | null {
  const parsed = urlModule.parse(url, true);

  const pathname: string = parsed.pathname || '';

  let match = matchPath<{ [key: string]: string }>(pathname, {
    path: pattern,
    exact: true,
  });

  // some of our routes need query params to match
  if (!match) {
    match = matchPath(`${pathname}${parsed.search}`, {
      path: pattern,
      exact: true,
    });
  }

  if (!match) {
    return null;
  }

  // URI decode params
  const decodedParams: { [key: string]: string } = {};
  if (match && match.params) {
    for (const [key, value] of Object.entries(match.params)) {
      decodedParams[key] = value;
    }
  }

  return {
    url,
    protocol: parsed?.protocol || 'https:',
    host: parsed?.host || '',
    pathname,
    search: parsed.search || '',
    hash: parsed.hash || '',
    pattern,
    params: decodedParams,
    query: parsed.query || '',
  };
}
