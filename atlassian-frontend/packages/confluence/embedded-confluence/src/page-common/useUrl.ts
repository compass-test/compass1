import urlModule from 'url';
import { useMemo } from 'react';

import { EMBEDDED_CONFLUENCE_MODE } from './EmbeddedConfluenceMode';
import type { PageCommonProps } from './PageCommonProps';

type EmbeddedUrlQuery = Partial<
  Pick<
    PageCommonProps,
    'parentProductContentContainerId' | 'parentProductContentId'
  >
> & {
  NO_SSR?: string;
  parentProduct?: string;
};

export type UrlProps = Pick<
  PageCommonProps,
  | 'hostname'
  | 'spaceKey'
  | 'parentProductContentContainerId'
  | 'parentProductContentId'
> & {
  mode: EMBEDDED_CONFLUENCE_MODE;
  contentId: string;
  parentProduct?: string;
  protocol?: string;
};

export const useUrl = ({
  hostname,
  spaceKey,
  contentId,
  parentProduct,
  parentProductContentContainerId,
  parentProductContentId,
  protocol,
  mode,
}: UrlProps) => {
  const queryParams = useMemo(() => {
    const query: EmbeddedUrlQuery = {};

    if (parentProduct) {
      query.parentProduct = parentProduct;
    }

    if (parentProductContentContainerId) {
      query.parentProductContentContainerId = parentProductContentContainerId;
    }

    if (parentProductContentId) {
      query.parentProductContentId = parentProductContentId;
    }

    // SSR is disabled for EP view page as https://hello.atlassian.net/browse/CBT-399
    // Ticket to re-enable SSR: https://hello.atlassian.net/browse/CBT-400
    if (mode === EMBEDDED_CONFLUENCE_MODE.VIEW_MODE) {
      query.NO_SSR = '1';
    }

    return urlModule.format({ query });
  }, [
    parentProduct,
    parentProductContentContainerId,
    parentProductContentId,
    mode,
  ]);

  return useMemo(
    () =>
      constructUrl(mode, {
        protocol,
        hostname,
        spaceKey,
        contentId,
        queryParams,
      }),
    [mode, protocol, hostname, spaceKey, contentId, queryParams],
  );
};

type ConstructUrlProps = {
  spaceKey: string | undefined;
  contentId: string;
  queryParams: string;
  protocol?: string;
  hostname?: string;
};

const CONTEXT_PATH = '/wiki/spaces';

const invalidUrls = {
  standaloneConfluenceUrl: null,
  embeddedConfluenceUrl: null,
};

function constructUrl(
  mode: string | undefined,
  { protocol, hostname, spaceKey, contentId, queryParams }: ConstructUrlProps,
) {
  if (!contentId) {
    /* eslint-disable-next-line no-console */
    console.error('Content ID is undefined');
    return invalidUrls;
  }
  if (!spaceKey) {
    /* eslint-disable-next-line no-console */
    console.error('Space key is undefined');
    return invalidUrls;
  }

  const prefix =
    (hostname ? `${protocol || 'https:'}//${hostname}` : '') + CONTEXT_PATH;

  let base: string;

  switch (mode) {
    case EMBEDDED_CONFLUENCE_MODE.VIEW_MODE:
      base = `${spaceKey}/pages/${contentId}`;
      break;

    // Not exposed yet, will update readme after content migration
    case EMBEDDED_CONFLUENCE_MODE.EDIT_MODE:
      base = `${spaceKey}/pages/edit-embed/${contentId}`;
      break;

    default:
      base = '';
  }

  if (!base) {
    /* eslint-disable-next-line no-console */
    console.error('URL is not yet supported');
    return invalidUrls;
  }

  const standaloneConfluenceUrl = `${prefix}/${base}`;
  const embeddedConfluenceUrl = `${standaloneConfluenceUrl}${queryParams}`;
  return { standaloneConfluenceUrl, embeddedConfluenceUrl };
}
