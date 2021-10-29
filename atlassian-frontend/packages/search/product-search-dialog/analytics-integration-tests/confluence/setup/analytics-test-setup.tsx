/* eslint-disable no-undef */
/* eslint-disable import/first */
import {
  createRecentPage,
  createPageBlogAttachmentResponse,
  createSpaceResponse,
  createCpusPeopleResponse,
  createUrsPeopleResponse,
  createRecentSpace,
  createExperimentResponse,
  createCollaborationUser,
  createCollaborationContainer,
} from '../../../src/__tests__/__fixtures__/mock-server-response';
import React, { FunctionComponent } from 'react';
import { render, act, RenderResult, fireEvent } from '@testing-library/react';
// We must import from response-types so we don't accidentally pull in the clients. We need to ensure the
// client modules are reset for every test to prevent caching behaviour
import { Scope } from '../../../src/confluence/clients/response-types';
import uuid from 'uuid/v4';
import { utils } from '@atlaskit/util-service-support';
import { DEFAULT_AB_TEST } from '../../../src/common/ab-test-provider';
import { ABTest } from '../../../src/common/clients';
// @ts-ignore
import { Products as MockProducts } from '../../../src/common/product-context';
import faker from 'faker';
import {
  TriggerablePromise,
  triggerAllPromise,
  completeSearch,
  awaitAllEvents,
} from '../../common';

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1024,
});

jest.mock('../../../src/common/product-context', () => {
  const actualProductContext = jest.requireActual(
    '../../../src/common/product-context',
  );
  return {
    ...actualProductContext,
    useActiveProduct: () => MockProducts.confluence,
    usePrimaryProduct: () => MockProducts.confluence,
  };
});

jest.mock('@atlaskit/width-detector', () => ({
  WidthObserver: () => null,
}));

jest.mock('uuid/v4', () => () => 'im-a-search-session-id');

jest.mock('@atlaskit/util-service-support', () => ({
  utils: {
    requestService: jest.fn(),
  },
}));

jest.mock(
  'lodash/debounce',
  () => (fn: (...args: any[]) => any, timer: number) => {
    const actualDebounce = jest.requireActual('lodash/debounce');
    return actualDebounce(fn, 0);
  },
);

export const SEARCH_SESSION_ID = uuid();
export const COMMON_RECENT_PAGE_PREFIX = 'Test';

export const collabGraphEntryId = '123356-66';
export const collabGraphEntryName = `collab graph user ${faker.random.uuid()}`;

export const collaborationGraphUserEntities = [
  createCollaborationUser({
    id: collabGraphEntryId,
    userProfile: {
      account_id: collabGraphEntryId,
      name: collabGraphEntryName,
      email: faker.internet.email(),
      picture: faker.internet.url(),
      account_status: ['active', 'deactivated', 'deleted'][
        faker.random.number(2)
      ],
      account_type: 'atlassian',
      locale: 'en-US',
      score: faker.random.number(),
    },
  }),
  createCollaborationUser(),
  createCollaborationUser(),
  createCollaborationUser(),
  createCollaborationUser(),
  createCollaborationUser(),
  createCollaborationUser(),
  createCollaborationUser(),
  createCollaborationUser(),
  createCollaborationUser(),
];

export const collaborationGraphContainerEntities = [
  createCollaborationContainer(),
  createCollaborationContainer(),
  createCollaborationContainer(),
  createCollaborationContainer(),
  createCollaborationContainer(),
  createCollaborationContainer(),
  createCollaborationContainer(),
  createCollaborationContainer(),
  createCollaborationContainer(),
  createCollaborationContainer(),
];

export const EXPECTED_FILTERS = {
  container: {
    applied: [],
    recommendedIds: collaborationGraphContainerEntities.map((space) => ({
      id: space.containerDetails.key,
      source: 'COLLABORATION_GRAPH',
    })),
  },
  contributor: {
    applied: [],
    recommendedIds: collaborationGraphUserEntities.map((user) => ({
      id: user.id,
      source: 'COLLABORATION_GRAPH',
    })),
  },
};

export interface SetupOptions {
  resultCount?: {
    recentItem?: number;
    recentSpace?: number;
    recentPeople?: number;
    searchItem?: number;
    searchSpace?: number; // Same as recent space
    searchPeople?: number;
  };
  abTest?: ABTest;
}

type SearchDialogTestWrapperModule = {
  DialogWrapper: FunctionComponent<{}>;
  onEvent: jest.Mock;
};

export const setup = async ({
  resultCount: {
    recentItem = 2,
    recentSpace = 2,
    recentPeople = 2,
    searchItem = 2,
    searchSpace = 2,
    searchPeople = 2,
  } = {},
  abTest = DEFAULT_AB_TEST,
}: SetupOptions = {}) => {
  let searchDialogTestWrapperModule: SearchDialogTestWrapperModule | null = null;

  /**
   * Isolate all dialog modules so we can reset them (and by extension any caches they might have) for each test
   */
  jest.isolateModules(() => {
    // eslint-disable-next-line global-require
    searchDialogTestWrapperModule = require('./search-dialog-test-wrapper');
  });

  if (!searchDialogTestWrapperModule) {
    throw new Error('Failed to initialise ./search-dialog-test-wrapper');
  }

  const {
    DialogWrapper,
    onEvent,
  } = searchDialogTestWrapperModule as SearchDialogTestWrapperModule;

  const recentPageResults = [...Array(recentItem)].map((_, idx) => {
    const type = idx % 2 === 0 ? 'page' : 'blogpost';
    return createRecentPage(type, {
      title: `${COMMON_RECENT_PAGE_PREFIX} ${type} ${idx}`,
    });
  });

  const recentSpaceResults = createRecentSpace(recentSpace);
  const recentPeopleResults = createUrsPeopleResponse(recentPeople);

  const pageBlogAttachmentSearchResults = createPageBlogAttachmentResponse(
    searchItem,
  );
  const spaceSearchResults = createSpaceResponse(searchSpace);
  const peopleSearchResults = createCpusPeopleResponse(searchPeople);

  (utils.requestService as jest.Mock).mockImplementation(
    (_: any, options: any) => {
      const recentPagePath = `rest/recentlyviewed/1.0/recent`;
      const recentSpacePath = `rest/recentlyviewed/1.0/recent/spaces`;
      const searchPath = `quicksearch/v1`;
      const experimentPath = `experiment/v1`;

      const collabGraphUserPath = 'v1/collaborationgraph/user/user';
      const collabGraphContainerPath = 'v1/collaborationgraph/user/container';

      if (options && options.path && options.path === recentPagePath) {
        return TriggerablePromise.resolve(recentPageResults);
      }

      if (options && options.path && options.path === recentSpacePath) {
        return TriggerablePromise.resolve(recentSpaceResults);
      }

      if (options && options.path && options.path === experimentPath) {
        const body: any = JSON.parse(options.requestInit.body.toString());
        const response = createExperimentResponse(body.scopes, abTest);
        return TriggerablePromise.resolve(response);
      }

      if (options && options.path && options.path === collabGraphUserPath) {
        const response = {
          collaborationGraphEntities: collaborationGraphUserEntities,
        };
        return TriggerablePromise.resolve(response);
      }

      if (
        options &&
        options.path &&
        options.path === collabGraphContainerPath
      ) {
        const response = {
          collaborationGraphEntities: collaborationGraphContainerEntities,
        };
        return TriggerablePromise.resolve(response);
      }

      if (options && options.path && options.path.startsWith(searchPath)) {
        if (options.requestInit && options.requestInit.body) {
          const body: any = JSON.parse(options.requestInit.body.toString());
          if (body && body.scopes) {
            const mockResponses: any[] = [];

            (body.scopes as Scope[]).forEach((scope) => {
              switch (scope) {
                case Scope.ConfluencePageBlogAttachment:
                  mockResponses.push(pageBlogAttachmentSearchResults);
                  break;
                case Scope.ConfluenceSpace:
                  mockResponses.push(spaceSearchResults);
                  break;
                case Scope.People:
                  mockResponses.push(peopleSearchResults);
                  break;
                case Scope.UserConfluence:
                  // This scope is for recent people only
                  mockResponses.push(recentPeopleResults);
                  break;
                default:
                  break;
              }
            });

            return TriggerablePromise.resolve({
              scopes: mockResponses,
            });
          }
        }
      }

      return TriggerablePromise.resolve([]);
    },
  );

  let resultMaybe: RenderResult | undefined;

  act(() => {
    resultMaybe = render(<DialogWrapper />);
  });

  await triggerAllPromise();

  await completeSearch();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const result = resultMaybe!;

  const input = await result.findByPlaceholderText('Search Confluence');
  input.focus();

  return {
    ...result,
    /**
     * Gets all events that either exactly match or partially match the given event name.
     *
     * Event names are recorded as {actionSubject} {action} ({actionSubjectId}), an example would be
     * 'button clicked (advancedSearchLink)'.
     */
    getFiredEvents: (eventName: string, matchPartial: boolean = true) => {
      return onEvent.mock.calls
        .filter(([name]: [string, object]) => {
          if (
            matchPartial &&
            name.toLowerCase().indexOf(eventName.toLowerCase()) !== -1
          ) {
            return true;
          }

          if (name.toLowerCase() === eventName.toLowerCase()) {
            return true;
          }

          return false;
        })
        .map(([_, payload]) => payload);
    },
    /**
     * Used if you need to test interactions with components outside the dialog
     */
    getElementOutsideDialog: () => {
      return result.getByText('Dummy button outside dialog');
    },

    getInputField: () => {
      return input;
    },

    transitionToPostQuery: async (
      query: string = COMMON_RECENT_PAGE_PREFIX,
    ) => {
      fireEvent.input(input, { target: { value: query } });
      await awaitAllEvents();
      await completeSearch();
    },

    transitionToFasterSearch: async (
      query: string = COMMON_RECENT_PAGE_PREFIX,
    ) => {
      fireEvent.input(input, { target: { value: query } });
      await awaitAllEvents();
    },

    /**
     * These are the generated results, they can be used as part of assertions as the generated data is partially dynamic
     */
    results: {
      recentPageResults,
      recentSpaceResults,
      recentPeopleResults,
      pageBlogAttachmentSearchResults,
      spaceSearchResults,
      peopleSearchResults,
    },

    /**
     * Methods that are used to debug test
     */
    debugEvents: {
      /**
       * Used to inspect all the events that has been fired
       */
      getAllFiredEvents: () => {
        return onEvent.mock.calls;
      },
    },
  };
};
