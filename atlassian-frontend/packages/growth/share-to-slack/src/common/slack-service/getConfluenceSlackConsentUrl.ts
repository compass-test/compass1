import { getConfluencePageMetadata } from '../confluencePageMetadata';
import { CONFLUENCE_METADATA_ERROR } from '../constants';
import loadCookies from '../loadCookies';
import type { Environment, GetSlackConsentUrlResult } from '../types';

import {
  CLIENT_ERROR_CODE,
  CLIENT_ERROR_MESSAGE,
  CLIENT_ERROR_STATUS,
  SOURCE,
} from './constants';
import getEnvironment from './getEnvironment';
import { ConfluenceSlackServiceAnalytics } from './types';
import { RequestResult } from './util';

const consentUrl: {
  [key in Environment]: string;
} = {
  prod: `https://confluence-chats-integr.services.atlassian.com/api/slack/teams/login?source=${SOURCE}`,
  staging: `https://confluence-chats-integr.dev.services.atlassian.com/api/slack/teams/login?source=${SOURCE}`,
};

const connectKey: { [key in Environment]: string } = {
  prod: 'confluence-chats-integration',
  staging: 'confluence-chats-integration-ddev',
};

const ACQUIRE_CSRF_TIMEOUT_MS = 2000;

type ConfluenceSlackIntegrationDialogParams = {
  contextJwt: string;
  url: string;
};

export default async function getConfluenceSlackConsentUrl(
  location: Pick<Location, 'hostname' | 'pathname'>,
  analytics: ConfluenceSlackServiceAnalytics,
  signal?: AbortSignal,
): Promise<GetSlackConsentUrlResult> {
  const environment = getEnvironment(location.hostname);
  const response = await getConfluenceSlackIntegrationDialogParams(
    location,
    signal,
  );

  if (!response.ok) {
    if (!response.aborted) {
      analytics.onFetchConnectMetadataFailed({
        status: response.status,
        errorMessage: response.message,
      });
    }

    return response;
  }

  analytics.onFetchConnectMetadataSucceeded();

  const { contextJwt, url } = response.result;

  // Prime the consent URL’s origin with any cookies it needs (namely, the CSRF
  // token) which would ordinarily be set by integration’s dialog.
  //
  // Explanation: This ensures a cookie containing a valid CSRF token is set on
  // the Slack consent popup window’s origin. This is a necessary step because
  // the Slack integration requires a valid CSRF token in the consent page
  // request when its URL contains a jwt query parameter. Failure to provide a
  // CSRF token cookie results in an invalid CSRF token error.
  try {
    await loadCookies(url, ACQUIRE_CSRF_TIMEOUT_MS);
    analytics.onRefreshIntegrationCsrfTokenSucceeded();
  } catch (error) {
    analytics.onRefreshIntegrationCsrfTokenFailed();
    // Ignore and hope there’s already a valid CSRF token.
  }

  return {
    ok: true,
    result: `${consentUrl[environment]}&jwt=${encodeURIComponent(contextJwt)}`,
  };
}

async function getConfluenceSlackIntegrationDialogParams(
  location: Pick<Location, 'hostname' | 'pathname'>,
  signal?: AbortSignal,
): Promise<RequestResult<ConfluenceSlackIntegrationDialogParams>> {
  const metadata = await getConfluencePageMetadata(location.pathname);

  if (!metadata) {
    throw new Error(CONFLUENCE_METADATA_ERROR);
  }

  const { type, spaceId, spaceKey, pageId, pageTitle, version } = metadata;
  const connectPath = getConnectPath(location);

  try {
    const response = await fetch(connectPath, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      signal,
      body: Object.entries({
        'plugin-key': 'confluence-chats-integration',
        key: 'dialog',
        productContext: JSON.stringify({
          'content.id': pageId,
          'content.type': type,
          'content.version': `${version}`,
          'page.id': pageId,
          'page.title': pageTitle,
          'page.type': type,
          'page.version': `${version}`,
          'space.id': `${spaceId}`,
          'space.key': spaceKey,
        }),
        classifier: 'json',
      })
        .map((kvp) => kvp.map(encodeURIComponent).join('='))
        .join('&'),
    });

    if (response.ok) {
      return {
        ok: true,
        result: (await response.json()) as { contextJwt: string; url: string },
      };
    }

    return {
      ok: false,
      aborted: false,
      status: response.status,
      code: `${response.status}`,
      message: await response.text(),
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          ok: false,
          aborted: true,
        };
      }

      return {
        ok: false,
        aborted: false,
        status: CLIENT_ERROR_STATUS,
        code: CLIENT_ERROR_CODE,
        message: error.message || CLIENT_ERROR_MESSAGE,
      };
    }

    return {
      ok: false,
      aborted: false,
      status: CLIENT_ERROR_STATUS,
      code: CLIENT_ERROR_CODE,
      message: CLIENT_ERROR_MESSAGE,
    };
  }
}

function getConnectPath(location: Pick<Location, 'hostname' | 'pathname'>) {
  const environment = getEnvironment(location.hostname);

  return `/wiki/plugins/servlet/ac/${connectKey[environment]}/dialog`;
}
