/* eslint-disable no-undef */
/* eslint-disable import/first */
import React, { FunctionComponent } from 'react';
import { render, act, fireEvent, RenderResult } from '@testing-library/react';
// We must import from response-types so we don't accidentally pull in the clients. We need to ensure the
// client modules are reset for every test to prevent caching behaviour
import { Scope } from '../../../src/jira/clients/response-types';
import uuid from 'uuid/v4';
import { utils } from '@atlaskit/util-service-support';
import {
  createJiraIssueResponse,
  createJiraBPFResponse,
  createJiraBPFPResponse,
  createJiraProjectResponse,
  createUrsPeopleResponse,
} from '../../../src/__tests__/__fixtures__/mock-jira-response';
import { createExperimentResponse } from '../../../src/__tests__/__fixtures__/mock-server-response';
import {
  awaitAllEvents,
  completeSearch,
  TriggerablePromise,
  triggerAllPromise,
} from '../../common';
import { DEFAULT_AB_TEST } from '../../../src/common/ab-test-provider';
import { ABTest } from '../../../src/common/clients';

export const SEARCH_SESSION_ID = uuid();
export const COMMON_RECENT_ISSUE_PREFIX = 'Test';

jest.mock('uuid/v4', () => () => 'im-a-search-session-id');
jest.mock(
  '@atlassiansox/engagekit/dist/esm/coordination/coordination-client',
  () => () => 'im-coordinationclient',
);

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

export interface SetupOptions {
  resultCount?: {
    recentIssues?: number;
    recentProjects?: number;
    recentBoardsProjectsFilters?: number;
    recentBoardsProjectsFiltersPlans?: number;
    searchIssues?: number;
    searchProjects?: number;
    searchBoardsProjectsFilters?: number;
    searchBoardsProjectsFiltersPlans?: number;
    searchPeople?: number;
  };
  abTest?: ABTest;
}

type SearchDialogTestWrapperModule = {
  DialogWrapper: FunctionComponent<{}>;
  onEvent: jest.Mock;
};

export const collaborationGraphContainerEntities = [];

export const setup = async ({
  resultCount: {
    recentIssues = 2,
    recentProjects = 2,
    recentBoardsProjectsFilters = 2,
    searchIssues = 2,
    searchProjects,
    searchBoardsProjectsFilters = 2,
    searchBoardsProjectsFiltersPlans = 2,
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

  let recentIssuesResults = createJiraIssueResponse(recentIssues);

  // We override the result sets produced by the generator above so they all share the same prefix
  recentIssuesResults = {
    ...recentIssuesResults,
    results: recentIssuesResults.results.map((result, idx) => ({
      ...result,
      name: `${COMMON_RECENT_ISSUE_PREFIX} ${result.attributes['@type']} ${idx}`,
    })),
  };

  const recentBoardsProjectsFiltersResults = createJiraBPFResponse(
    recentBoardsProjectsFilters,
  );
  const recentProjectResults = createJiraProjectResponse(recentProjects);

  const issuesResults = createJiraIssueResponse(searchIssues);
  const boardsProjectsFiltersResults = createJiraBPFResponse(
    searchBoardsProjectsFilters,
  );
  const boardsProjectsFiltersPlansResults = createJiraBPFPResponse(
    searchBoardsProjectsFiltersPlans,
  );
  const projectResults = createJiraProjectResponse(searchProjects);

  const ursResults = createUrsPeopleResponse(searchPeople);

  (utils.requestService as jest.Mock).mockImplementation(
    (_: any, options: any) => {
      const searchPath = `quicksearch/v1`;
      const experimentPath = `experiment/v1`;

      const collabGraphContainerPath = 'v1/collaborationgraph/user/container';

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

      if (options && options.path && options.path === experimentPath) {
        const body: any = JSON.parse(options.requestInit.body.toString());
        const response = createExperimentResponse(body.scopes, abTest);
        return TriggerablePromise.resolve(response);
      }

      if (options && options.path && options.path.startsWith(searchPath)) {
        if (options.requestInit && options.requestInit.body) {
          const body: any = JSON.parse(options.requestInit.body.toString());
          if (body && body.scopes) {
            const mockResponses: any[] = [];
            const isPreQuery = !body.query;

            (body.scopes as Scope[]).forEach((scope) => {
              switch (scope) {
                case Scope.JiraIssue:
                  if (isPreQuery) {
                    mockResponses.push(recentIssuesResults);
                  } else {
                    mockResponses.push(issuesResults);
                  }
                  break;
                case Scope.JiraBoardProjectFilter:
                  if (isPreQuery) {
                    mockResponses.push(recentBoardsProjectsFiltersResults);
                  } else {
                    mockResponses.push(boardsProjectsFiltersResults);
                  }
                  break;
                case Scope.JiraBoardProjectFilterPlan:
                  if (isPreQuery) {
                    mockResponses.push(recentBoardsProjectsFiltersResults);
                  } else {
                    mockResponses.push(boardsProjectsFiltersPlansResults);
                  }
                  break;
                case Scope.JiraProject:
                  if (isPreQuery) {
                    mockResponses.push(recentProjectResults);
                  } else {
                    mockResponses.push(projectResults);
                  }
                  break;
                case Scope.People:
                  mockResponses.push(ursResults);
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

  const input = await result.findByPlaceholderText('Search Jira');
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
     * Used to inspect all the events that has been fired, useful when debugging
     */
    getAllFiredEvents: () => {
      return onEvent.mock.calls;
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
      query: string = COMMON_RECENT_ISSUE_PREFIX,
    ) => {
      fireEvent.input(input, { target: { value: query } });
      await awaitAllEvents();
      await completeSearch();
    },

    transitionToFasterSearch: async (
      query: string = COMMON_RECENT_ISSUE_PREFIX,
    ) => {
      fireEvent.input(input, { target: { value: query } });
      await awaitAllEvents();
    },

    /**
     * These are the generated results, they can be used as part of assertions as the generated data is partially dynamic
     */
    results: {
      recentIssuesResults,
      recentBoardsProjectsFiltersResults,
      issuesResults,
      boardsProjectsFiltersResults,
    },
  };
};
