import '@atlaskit/css-reset';
import React from 'react';
import fetchMock from 'fetch-mock/cjs/client';
import { action } from '@storybook/addon-actions';
import {
  NOT_CONNECTED,
  UNKNOWN,
} from '../state/confluence/connected-space/types';
import { CONFLUENCE_INACTIVE, ProductKeys } from '../state/context/types';
import { NO_ERROR as NO_ERROR_CONNECT } from '../state/ui/connect-space/types';
import { NO_ERROR as NO_ERROR_CREATE } from '../state/ui/create-space/types';
import ProjectPagesComponent from '../index';
import { defaultLocale } from '../common/constants/supported-locales';
import { generateMetadata } from '../common/util/storybook';
import { BaseCrossFlowApiProvider } from '@atlassiansox/cross-flow-api-internals';
import styled from 'styled-components';
import {
  boolean,
  withKnobs,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import { AccessRequestCapabilityType } from '../state/confluence/access-request-capabilities/types';
import { Collaborator } from '../state/confluence/collaborators/types';
import { ScreenTypes, AnalyticsSource } from '../common/analytics/util';

const initialStore = {
  confluence: {
    connectedSpace: {
      blueprintsState: UNKNOWN,
      blueprints: null,
      connectionState: NOT_CONNECTED,
      projectSpaceKey: null,
      projectSpacePageId: null,
    },
    spaces: {
      availableSpaces: [],
      spacesLoaded: false,
    },
  },
  context: {
    baseUrl: '/jira',
    locale: defaultLocale,
    isAdmin: true,
    cloudId: '00000000-0000-0000-0000-000000000000',
    confluenceState: CONFLUENCE_INACTIVE,
    suggestedKey: null,
    accountId: '0000000000',
  },
  project: {
    name: 'Example Project Name',
    key: 'EXAMPLE',
    id: 10001,
    type: 'Storybook',
  },
  ui: {
    blueprints: {
      defaultBlueprints: [
        {
          name: 'Blank page',
          itemModuleCompleteKey:
            'com.atlassian.confluence.plugins.confluence-create-content-plugin:create-blank-page',
          contentBlueprintId: '00000000-0000-0000-0000-000000000000',
        },
        {
          name: 'Decision',
          itemModuleCompleteKey:
            'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-blueprint-item',
          contentBlueprintId: '5f4151a9-31cb-4466-8b9a-4d2797da3d0c',
        },
        {
          name: 'Meeting notes',
          itemModuleCompleteKey:
            'com.atlassian.confluence.plugins.confluence-business-blueprints:meeting-notes-item',
          contentBlueprintId: '8b2245c5-60eb-4ba4-9139-563a4f0a8d9e',
        },
        {
          name: 'Product requirements',
          itemModuleCompleteKey:
            'com.atlassian.confluence.plugins.confluence-software-blueprints:requirements-item',
          contentBlueprintId: 'd436e36c-2779-455b-ad86-adb6398d1a99',
        },
        {
          name: 'Retrospective',
          itemModuleCompleteKey:
            'com.atlassian.confluence.plugins.confluence-software-blueprints:retrospectives-item',
          contentBlueprintId: '5e76e3f2-8835-4568-8848-5b87e0bea05e',
        },
      ],
    },
    connectSpaceDialog: {
      selectedSpace: null,
      connectingSpace: false,
      connectSpaceDialogErrorState: NO_ERROR_CONNECT,
      connectSpaceDialogOpen: false,
    },
    createSpaceDialog: {
      createSpaceDialogOpen: false,
      createSpaceDialogErrorState: NO_ERROR_CREATE,
      creatingSpace: false,
      generatingKey: false,
      userEnteredSpaceNameInvalid: false,
      userEnteredSpaceName: '',
    },
  },
  external: {},
};

interface MockOptions {
  hasConfluence?: boolean;
  hasConfluenceAccess?: boolean;
  hasLinkedSpace?: boolean;
  hasLinkedSpaceHomepage?: boolean;
  hasLinkedPage?: boolean;
  hasPages?: number;
  isSpaceNotFound?: boolean;
  isSpaceHomepageNotFound?: boolean;
  isLinkError?: boolean;
  crossJoinStatus?: AccessRequestCapabilityType;
  numCollaborators?: number;
  failPageFetches?: boolean;
  delay?: number;
  showSpotlight?: boolean;
  spaceOrPageTitle?: string;
}

const MOCK_JOB_TITLES = [
  'Lap Tester',
  'Kitten Manager',
  'Cat Food Tester',
  'People Manager',
  'Herald',
  'Post Scratcher',
];

const mockTitles = [
  `Page title with with very long name to demonstrate that if the page title is long enough,
  the title will be wraped by the page tree component. Adding more words to increase the size of the page title`,
  'Page title with a few special characters !@#$%^&',
  'A normal page title',
  'Page',
];

const mockStatuses = ['current', 'current', 'draft'];

const mockFriendlyWhen = [
  'less than a minute ago',
  'Nov 17, 2017',
  'a minute ago',
  '34 minutes ago',
  'yesterday',
  'Jan 03, 2018',
  'an hour ago',
  '3 hours ago',
  'Mar 31, 2012',
];

const getMockPage = (id: number, hasChildren: boolean) => {
  const status = mockStatuses[id % mockStatuses.length];
  const editUi = `/pages/resumedraft.action?draftId=${id}`;
  const isDraft = status === 'draft';
  return {
    ...getMockPageDetails(id),
    id: `page-${id}`,
    type: 'page',
    status: status,
    title: `${mockTitles[id % mockTitles.length]} ${id}`,
    childTypes: {
      page: {
        value: hasChildren,
      },
    },
    version: {
      collaborators: {
        users: [],
      },
      friendlyWhen: 'an hour ago',
      number: 1,
    },
    ancestors: [],
    container: {
      key: 'QQQ',
      name: 'qqq',
      type: 'global',
      status: 'current',
    },
    _links: {
      webui: isDraft ? editUi : `/spaces/QQQ/pages/${id}/My+little+page`,
      editui: editUi,
    },
    extensions: {
      position: hasChildren ? 'none' : id,
    },
    metadata: {
      currentuser: {
        lastmodified: {
          version: {
            by: getMockUser(Math.floor(Math.random() * 10)),
            when: '2021-07-06T03:58:57.039Z',
            message: '',
            number: 1,
            minorEdit: false,
            contentTypeModified: false,
            collaborators: null,
            content: null,
          },
          friendlyLastModified: 'Jul 06, 2021',
        },
        _expandable: {
          favourited: '',
          scheduled: '',
          viewed: '',
          lastcontributed: '',
        },
      },
      frontend: {
        collabService: id % 2 === 0 ? 'synchrony' : 'ncs',
      },
    },
    ...(isDraft && {
      history: {
        latest: false,
        contributors: {
          publishers: {
            users: [],
            userAccountIds: [],
          },
        },
        _expandable: {
          previousVersion: '',
          nextVersion: '',
        },
        _links: {
          self: `/wiki/rest/api/content/${id}/history`,
        },
      },
    }),
  };
};

const getMockUser = (num: number) => ({
  type: 'known',
  profilePicture: {
    path: `https://placekitten.com/${240 + num}/${240 + num}`,
  },
  displayName: `Dummy Cat ${num}`,
});

const getMockContributors = (max: number) => ({
  publishers: {
    users: [...Array(Math.floor(Math.random() * max) + 1).keys()].map(() =>
      getMockUser(Math.floor(Math.random() * max)),
    ),
  },
});

const getMockPageDetails = (id: number) => ({
  id: `page-${id}`,
  type: 'page',
  title: `Page ${id}`,
  space: {
    key: `Placeholder space`,
    name: `Placeholder name`,
  },
  history: {
    lastUpdated: {
      friendlyWhen: mockFriendlyWhen[id % mockFriendlyWhen.length],
    },
    contributors: getMockContributors(5),
  },
});

const getMockCollaborator = (num: number): Collaborator => ({
  id: `user${num}`,
  name: `User ${num}`,
  avatarUrl: `https://placekitten.com/${240 + num}/${240 + num}`,
});

const initMocks = ({
  hasConfluence,
  hasConfluenceAccess,
  hasLinkedSpace,
  hasLinkedSpaceHomepage,
  hasLinkedPage,
  hasPages,
  isSpaceNotFound,
  isSpaceHomepageNotFound,
  isLinkError,
  crossJoinStatus,
  numCollaborators,
  failPageFetches,
  delay,
  spaceOrPageTitle = 'Linked page title',
}: MockOptions) => {
  const confluenceProduct = {
    [ProductKeys.CONFLUENCE]: {
      state: 'ACTIVE',
      edition: 'standard',
    },
  };
  // get the list of products on this tenant
  fetchMock.get(
    'express:/xflow/:cloudId/license-information',
    {
      hostname: 'some-instance',
      maintenanceEndDate: '2017-10-31',
      maintenanceStartDate: '2017-10-24',
      products: {
        [ProductKeys.JIRA_SOFTWARE]: {
          billingPeriod: 'MONTHLY',
          trialEndDate: '2017-10-31',
          state: 'ACTIVE',
          edition: 'free',
        },
        ...(hasConfluence ? confluenceProduct : {}),
      },
    },
    { delay },
  );
  if (hasConfluence) {
    if (hasLinkedSpace || hasLinkedPage) {
      // get the linked space
      if (isLinkError) {
        fetchMock.get('express:/xflow/:cloudId/:projectKey/projectspace', 500, {
          delay,
        });
      } else {
        fetchMock.get(
          'express:/xflow/:cloudId/:projectKey/projectspace',
          {
            spaceKey: 'FOO',
            ...(hasLinkedPage ? { linkedPageId: '1' } : { pageId: 1 }),
          },
          { delay },
        );
      }
      // mock space name & icon
      fetchMock.get('express:/wiki/rest/api/space/:spaceKey', {
        name: spaceOrPageTitle,
        ...(hasLinkedSpaceHomepage
          ? {
              homepage: {
                id: 1,
              },
            }
          : {}),
        icon: { path: '/40/40' },
        _links: { base: 'https://placekitten.com' },
      });
      if (isSpaceHomepageNotFound) {
        fetchMock.get('express:/wiki/rest/api/content/:contentId', 500, {
          delay,
        });
      } else {
        // mock linked page content
        fetchMock.get(
          'express:/wiki/rest/api/content/1',
          {
            title: spaceOrPageTitle,
            space: { key: 'FOO' },
            _links: { webui: 'some-content-link', base: 'some-content-base' },
          },
          { delay },
        );
      }
      // get a list of spaces
      fetchMock.get(
        'express:/wiki/rest/api/space',
        {
          results: [
            {
              id: 1234,
              key: 'SPA',
              name: 'Test space',
              icon: { path: '/16/16' },
              _links: { webui: '/spaces/SPA' },
            },
          ],
          _links: {
            base: 'https://placekitten.com',
            context: '',
          },
        },
        delay,
      );
    } else {
      fetchMock.get('express:/xflow/:cloudId/:projectKey/projectspace', 404, {
        delay,
      });
    }
    // get the user's permissions
    if (hasConfluenceAccess) {
      fetchMock.get(
        '/wiki/rest/api/user/current?expand=operations',
        {
          accountId: '5bffffffffffffffffffffff',
          accountType: 'atlassian',
          email: 'foo@bar.com',
          publicName: 'Foo Bar',
          displayName: 'Foo Bar',
          operations: [
            { operation: 'use', targetType: 'application' },
            { operation: 'administer', targetType: 'application' },
            { operation: 'create_space', targetType: 'application' },
          ],
        },
        { delay },
      );
    } else {
      fetchMock.get('/wiki/rest/api/user/current?expand=operations', 403, {
        delay,
      });
    }
    // get user spaces
    fetchMock.get(
      'express:/wiki/rest/create-dialog/1.0/spaces',
      {
        promotedSpaces: {
          spaces: [
            { id: 'ES', text: 'Empty space' },
            { id: 'TS', text: 'Test space' },
          ],
          resultsLimit: 10,
          resultsTruncated: false,
        },
        otherSpaces: {
          spaces: [],
          resultsLimit: 1000,
          resultsTruncated: false,
        },
      },
      { delay },
    );
    // get invitation status if supplied
    if (crossJoinStatus) {
      fetchMock.get(
        '/gateway/api/invitations/v1/access-requests/capabilities?resource=ari%3Acloud%3Aconfluence%3A%3Asite%2F00000000-0000-0000-0000-000000000000',
        {
          userAccessLevel: 'INTERNAL',
          verificationStatus: 'NOT_REQUIRED',
          results: {
            'ari:cloud:confluence::site/00000000-0000-0000-0000-000000000000': crossJoinStatus,
          },
        },
        { delay },
      );
    }
    // get the list of blueprints
    fetchMock.get(
      'express:/wiki/rest/create-dialog/1.0/blueprints/web-items',
      isSpaceNotFound ? 400 : [],
      { delay },
    );
    const mockPageIds: number[] = !!hasPages
      ? [...Array(hasPages - 10).keys()]
      : [];
    const mockDraftIds: number[] = !!hasPages ? [...Array(10).keys()] : [];
    // get the pages under the linked space
    if (!failPageFetches) {
      // get child page of space homepage
      fetchMock.get(
        'express:/wiki/rest/api/content/:contentId/child/page',
        {
          results: mockPageIds.map((i) => getMockPage(i, i % 5 === 0)),
          start: 0,
          limit: 200,
          size: mockPageIds.length,
          _links: { base: 'https://foobar.com/wiki' },
        },
        { delay },
      );
      fetchMock.get(
        {
          name: 'Search everything',
          url: 'express:/wiki/rest/api/content/search',
          query: { cqlcontext: '{"contentStatuses":["draft"]}' },
        },
        {
          results: mockDraftIds.map((i) =>
            getMockPage((hasPages || 0) + i, i % 5 === 0),
          ),
          start: 0,
          limit: 200,
          size: mockPageIds.length,
          _links: { base: 'https://foobar.com/wiki' },
        },
        { delay },
      );
      // get root pages if space homepage doesn't exist
      fetchMock.get(
        'express:/wiki/rest/api/space/:spaceKey/content',
        {
          page: {
            results: mockPageIds.map((i) => getMockPage(i, i % 3 === 0)),
            start: 0,
            limit: 200,
            size: mockPageIds.length,
          },
          _links: { base: 'https://foobar.com/wiki' },
        },
        { delay },
      );
      // get page details (can be removed after pages productionisation rollout)
      fetchMock.get(
        'express:/wiki/rest/api/content/search',
        {
          results: mockPageIds.map(getMockPageDetails),
          start: 0,
          limit: 200,
          size: mockPageIds.length,
        },
        { delay },
      );
    } else {
      fetchMock.get(
        'express:/wiki/rest/api/content/:contentId/child/page',
        500,
        { delay },
      );
      // get page details
      // TODO fix storybooks for dynamic space link change
      fetchMock.get('express:/wiki/rest/api/content/search', 500, { delay });
    }
  }
  if (numCollaborators !== undefined) {
    fetchMock.get(
      'express:/gateway/api/xflow/:cloudId/confluence/collaborators',
      [...Array(numCollaborators).keys()].map(getMockCollaborator),
      {
        delay,
      },
    );
  }
  fetchMock.post(
    'express:/gateway/api/directory/graphql',
    async (
      url: string,
      opts: { method: string; headers: Headers },
      req: Request,
    ) => {
      const body = await req.json();
      const userId = body.variables.userId;
      const userNumber = Number(userId.match(/[0-9]/)[0]);
      return {
        data: {
          User: {
            id: userId,
            isCurrentUser: false,
            status: 'active',
            statusModifiedDate: null,
            isBot: false,
            isNotMentionable: false,
            fullName: userId,
            nickname: userId,
            email: `${userId}@felinefriends.com`,
            meta: MOCK_JOB_TITLES[userNumber % MOCK_JOB_TITLES.length],
            location: null,
            companyName: 'Feline Friends',
            avatarUrl: `https://placekitten.com/${240 + userNumber}/${
              240 + userNumber
            }`,
            remoteWeekdayIndex: '3',
            remoteWeekdayString: 'Wed',
            remoteTimeString: '4:27pm',
          },
        },
        extensions: { errorNumber: 0 },
      };
    },
    {
      delay,
    },
  );
  // toggle pref
  fetchMock.get(
    'express:/rest/api/3/user/properties/growth.project-pages.confluence-table-tree.show-drafts',
    {
      key: 'growth.project-pages.confluence-table-tree.show-drafts',
      value: true,
    },
    { delay },
  );
};

export default generateMetadata('ProjectPagesComponent');

const onOpen = async (...args: any) => {
  action('onOpen')(...args);
  return { success: true };
};

// add a wrapper to highlight how it would look inside the page container in Jira with its padding
const PageContainer = styled.div`
  border: 1px solid gray;
  padding: 0 40px;
  max-width: 80vw;
  margin-top: 58px;
  will-change: padding-left;
`;

const Breadcrumbs = styled.div`
  margin-left: 4px;
`;

const BaseProjectPagesComponent = AnalyticsSource<any>(
  'projectPages',
  ScreenTypes.SCREEN,
)(
  ({
    isJswConfluenceSilentBundlingExperiment,
    isProjectPagesProductionisation,
    isEmbeddedPagesExperiment,
    hasConfluence,
    learnMoreBannerVisibility,
    key,
  }: {
    isJswConfluenceSilentBundlingExperiment?: boolean;
    isProjectPagesProductionisation?: boolean;
    isEmbeddedPagesExperiment?: boolean;
    hasConfluence?: boolean;
    learnMoreBannerVisibility?: boolean;
    key?: string;
  }) => (
    <PageContainer>
      <ProjectPagesComponent
        key={key}
        accountId={initialStore.context.accountId}
        baseUrl={initialStore.context.baseUrl}
        locale={initialStore.context.locale}
        isAdmin={initialStore.context.isAdmin}
        cloudId={initialStore.context.cloudId}
        projectKey={initialStore.project.key}
        projectId={initialStore.project.id}
        projectName={initialStore.project.name}
        projectType={initialStore.project.type}
        external={initialStore.external}
        breadcrumbs={<Breadcrumbs>Breadcrumbs</Breadcrumbs>}
        onGetFeatureFlagValue={() => ({
          // Example FF
          // isGrapeOn: (defaultValue) => defaultValue,
        })}
        EmbeddedProductUpdater={() => null}
        isGranularPagesExperiment={true} // this is always on now
        isJswConfluenceSilentBundlingExperiment={
          isJswConfluenceSilentBundlingExperiment || false
        }
        hasConfluence={hasConfluence || false}
        learnMoreBannerVisibility={learnMoreBannerVisibility || false}
        dismissLearnMoreBanner={action('dismissLearnMoreBanner')}
        onFireExposureEvent={action('fireExposure')}
        isProjectPagesProductionisation={
          isProjectPagesProductionisation || false
        }
        isEmbeddedPagesExperiment={isEmbeddedPagesExperiment || false}
      />
    </PageContainer>
  ),
);

export const CrossSell = () => {
  fetchMock.restore();
  initMocks({});
  return (
    <BaseCrossFlowApiProvider onOpen={onOpen}>
      <BaseProjectPagesComponent />
    </BaseCrossFlowApiProvider>
  );
};

export const PostExpand = () => {
  const mockOpts: MockOptions = {
    hasConfluence: true,
    hasConfluenceAccess: true,
    hasLinkedSpace: boolean('Has linked space?', false),
    hasPages: number('Add mock pages', 0),
    isSpaceNotFound: boolean('Is space not found?', false),
    delay: number('fetchMock delays in ms', 0),
  };
  fetchMock.restore();
  initMocks(mockOpts);
  const isProjectPagesProductionisation = boolean(
    'Is productionisation?',
    false,
  );
  return (
    <BaseCrossFlowApiProvider onOpen={onOpen}>
      <BaseProjectPagesComponent
        key={JSON.stringify(mockOpts)}
        hasConfluence
        isProjectPagesProductionisation={isProjectPagesProductionisation}
      />
    </BaseCrossFlowApiProvider>
  );
};
PostExpand.decorators = [withKnobs];

export const CrossJoin = () => {
  const isProjectPagesProductionisation = boolean(
    'Is project pages productionisation?',
    true,
  );
  const isEmbeddedPagesExperiment = boolean(
    'Is embedded pages experiment?',
    true,
  );
  const mockOpts: MockOptions = {
    hasConfluence: true,
    hasConfluenceAccess: boolean('Has user got Confluence access?', false),
    crossJoinStatus: select<AccessRequestCapabilityType>(
      'Confluence access request capability',
      Object.values(AccessRequestCapabilityType),
      AccessRequestCapabilityType.REQUEST_ACCESS,
    ),
    numCollaborators: number('Number of collaborators', 10, {}),
    hasLinkedSpace: boolean('Has linked space?', false),
    hasLinkedSpaceHomepage: boolean('Linked space has a homepage?', true),
    isLinkError: boolean('Fail to fetch projectspace link?', false),
    hasPages: number('Add mock pages', 0),
    isSpaceNotFound: boolean('Is space not found?', false),
    failPageFetches: boolean('Fail to fetch pages?', false),
    delay: number('fetchMock delays in ms', 0),
  };
  fetchMock.restore();
  initMocks(mockOpts);
  return (
    <BaseCrossFlowApiProvider onOpen={onOpen}>
      <BaseProjectPagesComponent
        key={JSON.stringify({
          ...mockOpts,
          isProjectPagesProductionisation,
          isEmbeddedPagesExperiment,
        })}
        isProjectPagesProductionisation={isProjectPagesProductionisation}
        isEmbeddedPagesExperiment={isEmbeddedPagesExperiment}
        hasConfluence
      />
    </BaseCrossFlowApiProvider>
  );
};
CrossJoin.decorators = [withKnobs];

export const EmbeddedPages = () => {
  const isProjectPagesProductionisation = boolean(
    'Is project pages productionisation?',
    true,
  );
  const isEmbeddedPagesExperiment = boolean(
    'Is embedded pages experiment?',
    true,
  );
  const mockOpts: MockOptions = {
    hasConfluence: true,
    hasConfluenceAccess: true,
    hasLinkedSpace: boolean('Has linked space?', true),
    hasLinkedSpaceHomepage: boolean('Linked space has a homepage?', true),
    isLinkError: boolean('Fail to fetch projectspace link?', false),
    hasPages: number('Add mock pages', 20),
    isSpaceNotFound: boolean('Is space not found?', false),
    failPageFetches: boolean('Fail to fetch pages?', false),
    spaceOrPageTitle: text('Linked space or page name', 'Linked page title'),
    delay: number('fetchMock delays in ms', 0),
  };
  fetchMock.restore();
  initMocks(mockOpts);
  return (
    <BaseCrossFlowApiProvider onOpen={onOpen}>
      <BaseProjectPagesComponent
        key={JSON.stringify({
          ...mockOpts,
          isProjectPagesProductionisation,
          isEmbeddedPagesExperiment,
        })}
        isProjectPagesProductionisation={isProjectPagesProductionisation}
        isEmbeddedPagesExperiment={isEmbeddedPagesExperiment}
        hasConfluence
      />
    </BaseCrossFlowApiProvider>
  );
};
EmbeddedPages.decorators = [withKnobs];

export const SilentBundling = () => {
  const isJswConfluenceSilentBundlingExperiment = boolean(
    'Is silent bundling experiment',
    true,
  );
  const learnMoreBannerVisible = boolean('learn more banner visible', true);

  const mockOpts: MockOptions = {
    hasConfluence: true,
    hasConfluenceAccess: true,
    hasLinkedSpace: boolean('Has linked space?', true),
    hasPages: number('Add mock pages', 0),
    isSpaceNotFound: boolean('Is space not found?', false),
  };
  fetchMock.restore();
  initMocks(mockOpts);

  return (
    <BaseCrossFlowApiProvider onOpen={onOpen}>
      <BaseProjectPagesComponent
        learnMoreBannerVisibility={learnMoreBannerVisible}
        isJswConfluenceSilentBundlingExperiment={
          isJswConfluenceSilentBundlingExperiment
        }
        hasConfluence
      />
    </BaseCrossFlowApiProvider>
  );
};
SilentBundling.decorators = [withKnobs];
