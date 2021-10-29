import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { fromPromise } from 'rxjs/observable/fromPromise';
import fetchJson$ from '../../common/fetch/as-json-stream';
import FetchError from '../../common/fetch/errors';
import {
  ConfluenceBlueprintPage,
  ConfluencePage,
  ConfluenceSearchResultWithLinks,
  ConfluenceSpaceExpanded,
} from '../confluence/types';
import { AccessRequestCapabilityResponse } from '../confluence/access-request-capabilities/types';
import { Collaborator } from '../confluence/collaborators/types';
import { LicenceInformation } from '../context/types';

const noContentStatus = 204;

const XFLOW_SERVICE_DEV_URL = 'https://api-private.stg.atlassian.com/xflow';
const XFLOW_SERVICE_URL = '/gateway/api/xflow';

const IGNORE_MAU_HEADER = 'x-atlassian-mau-ignore';

export const CONFLUENCE_CREATE_SPACE_URL = '/wiki/rest/api/space';
export const CONFLUENCE_QUERY_SPACES_URL =
  '/wiki/rest/create-dialog/1.0/spaces?promotedSpacesLimit=10&otherSpacesLimit=1000';

export const getBlueprintsUrl = (spaceKey: string) =>
  `/wiki/rest/create-dialog/1.0/blueprints/web-items?spaceKey=${spaceKey}&_=${Date.now()}`;

export const getConfluenceCurrentUserUrl = () =>
  `/wiki/rest/api/user/current?expand=operations`;

const getXflowUrl = (w: any = window) => {
  let isLocalhost = false;
  try {
    isLocalhost = w.location.hostname === 'localhost';
  } catch (e) {
    // silence
  }
  return isLocalhost ? XFLOW_SERVICE_DEV_URL : XFLOW_SERVICE_URL;
};

export const getLicenseInformationUrl = (cloudId: string) =>
  `${getXflowUrl()}/${encodeURIComponent(cloudId)}/license-information`;

export const getProjectSpaceLinkUrl = (cloudId: string, projectKey: string) =>
  `${getXflowUrl()}/${encodeURIComponent(cloudId)}/${encodeURIComponent(
    projectKey,
  )}/projectspace`;

export const getSpaceContentUrl = (spaceKey: string) =>
  `/wiki/rest/api/space/${spaceKey}/content?depth=root`;

/**
 * Returns the license state of the specified product on the current instance.
 * Caveat: the requesting user has to be logged in, otherwise the request won't be authenticated.
 *
 * @param cloudId the identifier for the current instance
 * @returns LicenceInformation
 */
export const requestProductLicenceState$ = (cloudId: string) =>
  fetchJson$<LicenceInformation>(getLicenseInformationUrl(cloudId), {
    credentials: 'include',
  });

export const requestConfluenceSpaces$ = () =>
  fetchJson$(CONFLUENCE_QUERY_SPACES_URL, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [IGNORE_MAU_HEADER]: 'true',
    },
  }).map((response) => [
    ...new Set([
      ...response.promotedSpaces.spaces,
      ...response.otherSpaces.spaces,
    ]),
  ]);

/**
 * Attempts to create a confluence space given a space name
 * @param confluenceSpaceName name of the space being created
 * @param confluenceSpaceKey unique space key on Confluence
 * @param projectKey project key of the Jira project creating the confluence space
 *
 * Returns the newly created space's id
 */
export const requestCreateConfluenceSpace$ = (
  confluenceSpaceName: string,
  confluenceSpaceKey: string,
  projectKey: string,
) =>
  fetchJson$(CONFLUENCE_CREATE_SPACE_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [IGNORE_MAU_HEADER]: 'true',
    },
    body: JSON.stringify({
      key: confluenceSpaceKey,
      name: confluenceSpaceName,
      description: {
        plain: {
          value: projectKey
            ? `Confluence Space created for Jira Project ${projectKey}`
            : '',
          representation: 'plain',
        },
      },
    }),
  }).map((response) => ({
    spaceKey: response.key,
    spaceUrl: `${response._links?.base}${response._links?.webui}`,
    projectKey,
  }));

/**
 * Returns whether a space with the provided key already exists or not.
 *
 * @param key - the space key to check the availability of
 *
 * Returns a boolean
 */
export const checkConfluenceSpaceAvailability$ = (key: string) =>
  fetchJson$(`/wiki/ajax/spaceavailable.action?key=${key}`, {
    credentials: 'include',
    headers: {
      [IGNORE_MAU_HEADER]: 'true',
    },
  }).map((response) => ({ available: response.available, key }));

/**
 * Retrieves the root page id from a space
 * @param spaceKey
 */
export const retrieveRootPageId$ = (spaceKey: string) =>
  fetchJson$(getSpaceContentUrl(spaceKey), {
    credentials: 'include',
    headers: {
      [IGNORE_MAU_HEADER]: 'true',
    },
  }).map((response) => {
    const firstRootPageFallback = response.page.results[0].id;
    const rootPageWithSlashOverview = response.page.results
      .filter(
        (
          result: any, // dictated by the shape of the response from confluence
        ) =>
          // find the page at the root level that is the space home
          result._links.webui.indexOf('/overview') >= 0,
      )
      .map((rootPage: { id: any }) => rootPage.id);
    return rootPageWithSlashOverview.length
      ? rootPageWithSlashOverview[0]
      : firstRootPageFallback;
  });

export const putFirstSpaceCreatedFlag$ = () =>
  fromPromise(
    fetch('/wiki/rest/onboarding/1/store/global', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        [IGNORE_MAU_HEADER]: 'true',
      },
      body: JSON.stringify({
        key: 'is-first-space-created',
        value: 'true',
      }),
    }).then((response) => {
      if (!response.ok) {
        const { status } = response;
        return response.text().then((str) => {
          throw new FetchError(status, str);
        });
      }

      return null;
    }),
  );

// TODO remove pageId after productionisation -- needs a change in xflow to remove it as well
interface ProjectSpaceLinkContext {
  spaceKey: string;
  projectKey: string;
  pageId: string; // Home page of linked space
  cloudId: string;
  linkedPageId?: string;
}

export const putProjectSpaceLinkViaXflow$ = ({
  cloudId,
  projectKey,
  spaceKey,
  pageId,
  linkedPageId,
}: ProjectSpaceLinkContext) =>
  fromPromise(
    fetch(getProjectSpaceLinkUrl(cloudId, projectKey), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spaceKey,
        pageId,
        linkedPageId,
      }),
    }).then((response) => {
      if (!response.ok) {
        const { status } = response;
        return response.text().then((str) => {
          throw new FetchError(status, str);
        });
      }

      if (response.status === noContentStatus) {
        // We want it to return a `null` value.
        // Using `Observable.empty()` would just hang as `mergeMap`
        // will be waiting for values that would never come.
        return null;
      }

      // explicitly handle empty responses until Cloud Admin fix their statusCode
      return response.json().catch(
        () =>
          // return null if json not available
          null,
      );
    }),
  );

export const fetchProjectSpaceLinkViaXflow$ = (
  cloudId: string,
  projectKey: string,
) =>
  fetchJson$(getProjectSpaceLinkUrl(cloudId, projectKey), {
    credentials: 'include',
  }).map(({ spaceKey, pageId, linkedPageId }) => ({
    spaceKey,
    pageId,
    linkedPageId,
  }));

export const fetchConnectedSpaceBlueprints$ = (spaceKey: string) =>
  fetchJson$(getBlueprintsUrl(spaceKey), {
    credentials: 'include',
    headers: {
      [IGNORE_MAU_HEADER]: 'true',
    },
  });

export const fetchConfluenceCurrentUser = () =>
  fetchJson$(getConfluenceCurrentUserUrl(), {
    credentials: 'include',
    headers: {
      [IGNORE_MAU_HEADER]: 'true',
    },
  });

export const createConfluenceDraft$ = ({
  templateId,
  projectSpaceKey,
  projectPageLinkedId,
  pageTitle,
}: {
  templateId: string;
  projectSpaceKey: string;
  projectPageLinkedId: string | null;
  pageTitle?: string;
}) => {
  const response = fetchJson$<ConfluenceBlueprintPage>(
    `/wiki/rest/create-dialog/1.0/content/blueprint/${templateId}/instance`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        [IGNORE_MAU_HEADER]: 'true',
      },
      body: JSON.stringify({
        content: {
          type: 'page',
          status: 'draft',
          space: { key: projectSpaceKey },
          ...(projectPageLinkedId && {
            ancestors: [{ id: projectPageLinkedId }],
          }),
          title: pageTitle,
        },
        contentBlueprintSpec: {
          context: {},
          blueprintId: templateId,
        },
      }),
    },
  );
  return response;
};

export const createConfluenceBlank$ = ({
  spaceKey,
  projectPageLinkedId,
}: {
  spaceKey: string;
  projectPageLinkedId: string | null;
}) =>
  fetchJson$<ConfluencePage>('/wiki/rest/api/content', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [IGNORE_MAU_HEADER]: 'true',
    },
    body: JSON.stringify({
      type: 'page',
      status: 'draft',
      metadata: {
        properties: {
          editor: {
            value: 'v2',
          },
        },
      },
      space: {
        key: spaceKey,
      },
      ...(projectPageLinkedId && {
        ancestors: [{ id: projectPageLinkedId }],
      }),
    }),
  });

const sanitizeInput = (input = '') => input.replace(/"|\*|~/g, '\\$&');

export const searchConfluencePages = (searchString?: string) => {
  let cqlQuery: string;
  if (searchString) {
    cqlQuery = `type=page and title ~ "${sanitizeInput(searchString)}"`;
  } else {
    cqlQuery = `type=page`;
  }

  return fetchJson$<ConfluenceSearchResultWithLinks>(
    `/wiki/rest/api/content/search?cql=${encodeURIComponent(
      cqlQuery,
    )}&expand=space,link`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        [IGNORE_MAU_HEADER]: 'true',
      },
    },
  ).toPromise();
};

interface CrossProductSearchSpaceItem {
  title: string;
  baseUrl: string;
  space: {
    key: string;
    icon: {
      path: string;
    };
  };
  url: 'string';
}
export interface CrossProductSearchSpaceResult {
  scopes: [
    {
      id: 'confluence.space';
      results: CrossProductSearchSpaceItem[];
      size: Number;
    },
  ];
}

export const searchConfluenceSpaces = ({
  searchString,
  cloudId,
  limit,
}: {
  searchString?: string;
  cloudId: string;
  limit: number;
}) => {
  const query = searchString ? sanitizeInput(searchString) : '';
  return fetchJson$<CrossProductSearchSpaceResult>(
    `/gateway/api/xpsearch-aggregator/quicksearch/v1`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        cloudId,
        limit,
        scopes: ['confluence.space'],
        experience: 'jira.projectPages',
      }),
    },
  ).toPromise();
};

export const getConfluenceAccessRequestCapabilities$ = (cloudId: string) => {
  const params = new URLSearchParams({
    resource: `ari:cloud:confluence::site/${cloudId}`,
  });
  return fetchJson$<AccessRequestCapabilityResponse>(
    `/gateway/api/invitations/v1/access-requests/capabilities?${params.toString()}`,
    {
      credentials: 'include',
    },
  );
};

export const getConfluenceCollaborators$ = (cloudId: string) =>
  fetchJson$<Collaborator[]>(
    `/gateway/api/xflow/${cloudId}/confluence/collaborators`,
    {
      credentials: 'include',
    },
  );

export const getConfluencePageContent$ = (pageId: string) =>
  fetchJson$<ConfluencePage>(`/wiki/rest/api/content/${pageId}`, {
    credentials: 'include',
  });

export const getConfluenceSpace$ = (spaceKey: string) =>
  fetchJson$<ConfluenceSpaceExpanded>(
    `/wiki/rest/api/space/${spaceKey}?expand=icon,homepage`,
    {
      credentials: 'include',
    },
  );
