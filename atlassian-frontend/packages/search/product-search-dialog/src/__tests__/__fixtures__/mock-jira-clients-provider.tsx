/**
 * Provide a fake Jira clients provider for use in storybook
 */
import React, { FunctionComponent } from 'react';
import { Products } from '../../common/product-context';
import { JiraSearchClientContext } from '../../jira/clients/jira-search-provider';
import { Scope } from '../../jira/clients';
import CancellablePromise from '../../utils/cancellable-promise';
import {
  createPeopleResults,
  createProjectResults,
  createJiraIssueResponse,
  createBoardProjectFilterResponse,
} from './mock-jira-results';
import { DEFAULT_AB_TEST } from '../../common/ab-test-provider';
import { createCollaborationContainerResponse } from './mock-server-response';

const NEVER_ENDING_PROMISE = CancellablePromise.from(new Promise(() => null));
const EXHAUSIVE_CHECK = (error: never) => new Error(error);

function delayed<T>(resolveValue: T, delay: number): CancellablePromise<T> {
  return CancellablePromise.from(
    delay === 0
      ? Promise.resolve(resolveValue)
      : new Promise((resolve) =>
          setTimeout(() => resolve(resolveValue), delay),
        ),
  );
}

function delayedFailedPromise<T>(
  rejectValue: T,
  delay: number,
): CancellablePromise<T> {
  return CancellablePromise.from(
    delay === 0
      ? Promise.reject(rejectValue)
      : new Promise((_, reject) =>
          setTimeout(() => reject(rejectValue), delay),
        ),
  );
}

type ClientMode = 'instant' | 'normal' | 'loading' | 'slow' | 'error';

const NO_DELAY = 0;
const NORMAL_DELAY = 100;
const SLOW_DELAY = 5000;

const getDelay = (mode: ClientMode) => {
  switch (mode) {
    case 'instant':
      return NO_DELAY;
    case 'normal':
      return NORMAL_DELAY;
    case 'slow':
      return SLOW_DELAY;
    case 'loading':
    case 'error':
      return NO_DELAY;
    default:
      EXHAUSIVE_CHECK(mode);
  }

  return NO_DELAY;
};

export const mockClients = (mode: ClientMode, clientOverrides: any) => {
  const resultCount = {
    item: 99,
    project: 10,
    people: 10,
    boardProjectFilter: 1,
    issues: 1,
  };

  return {
    cloudId: 'mock-cloud',
    sites: [
      {
        product: Products.jira,
        avatarUrl: '',
        cloudId: 'mock-cloud',
        siteName: 'mock',
        siteUrl: 'http://mock.cloud',
      },
    ],
    collabGraphClient: {
      getContainers: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(
              createCollaborationContainerResponse(10),
              getDelay(mode),
            ).promise();
          case 'loading':
            return NEVER_ENDING_PROMISE.promise();
          case 'error':
            return delayedFailedPromise('theres a gremlin', 0).promise();
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
    } as any,
    searchClient: {
      getProductPermissions(products: Products[]) {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(products, getDelay(mode)).promise();
          case 'loading':
            return NEVER_ENDING_PROMISE.promise();
          case 'error':
            return delayedFailedPromise('theres a gremlin', 0).promise();
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
      search: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return {
              [Scope.JiraBoardProjectFilter]: delayed(
                createBoardProjectFilterResponse(
                  resultCount.boardProjectFilter,
                ),
                getDelay(mode),
              ),
              [Scope.JiraIssue]: delayed(
                createJiraIssueResponse(resultCount.boardProjectFilter),
                getDelay(mode),
              ),
              [Scope.JiraProject]: delayed(
                createProjectResults(resultCount.boardProjectFilter),
                getDelay(mode),
              ),
              [Scope.People]: delayed(
                createPeopleResults(resultCount.boardProjectFilter),
                getDelay(mode),
              ),
            };
          case 'loading':
            return {
              [Scope.JiraBoardProjectFilter]: NEVER_ENDING_PROMISE,
              [Scope.JiraIssue]: NEVER_ENDING_PROMISE,
              [Scope.JiraProject]: NEVER_ENDING_PROMISE,
              [Scope.People]: NEVER_ENDING_PROMISE,
            };
          case 'error':
            return {
              [Scope.JiraBoardProjectFilter]: delayedFailedPromise(
                'theres a gremlin',
                0,
              ),
              [Scope.JiraIssue]: delayedFailedPromise('theres a gremlin', 0),
              [Scope.JiraProject]: delayedFailedPromise('theres a gremlin', 0),
              [Scope.People]: delayedFailedPromise('theres a gremlin', 0),
            };
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
      getRecentBoardsProjectsFilters: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(createBoardProjectFilterResponse(1), getDelay(mode));
          case 'loading':
            return NEVER_ENDING_PROMISE;
          case 'error':
            return delayedFailedPromise('theres a gremlin', 0);
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
      getRecentIssues: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(createJiraIssueResponse(1), getDelay(mode));
          case 'loading':
            return NEVER_ENDING_PROMISE;
          case 'error':
            return delayedFailedPromise('theres a gremlin', 0);
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
      getRecentProjects: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(
              createProjectResults(resultCount.project),
              getDelay(mode),
            );
          case 'loading':
            return NEVER_ENDING_PROMISE;
          case 'error':
            return delayedFailedPromise('theres a gremlin', 0);
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
      getRecentPeople: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(
              createPeopleResults(resultCount.people),
              getDelay(mode),
            );
          case 'loading':
            return NEVER_ENDING_PROMISE;
          case 'error':
            return delayedFailedPromise('theres a gremlin', 0);
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
      getAbTestData: async () => DEFAULT_AB_TEST,
    } as any,
    currentUserClient: {
      getCurrentUser() {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(
              {
                displayName: 'John Doe',
                emailAddress: 'john.doe@johnnydough.com',
                avatarUrls: {
                  '48x48': 'http://lorempixel.com/48/48/people',
                  '24x24': 'http://lorempixel.com/24/24/people',
                  '16x16': 'http://lorempixel.com/16/16/people',
                  '32x32': 'http://lorempixel.com/32/32/people',
                },
              },
              getDelay(mode),
            ).promise();
          case 'loading':
            return NEVER_ENDING_PROMISE.promise();
          case 'error':
            return delayedFailedPromise('theres a gremlin', 0).promise();
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
    } as any,
    ...clientOverrides,
  };
};

export interface MockJiraClientsProviderProps {
  mode?: ClientMode;
  clientOverrides?: any;
}

export const MockJiraClientsProvider: FunctionComponent<MockJiraClientsProviderProps> = ({
  children,
  mode = 'instant',
  clientOverrides = {},
}) => {
  const clients = mockClients(mode, clientOverrides);

  return (
    <JiraSearchClientContext.Provider value={clients}>
      {children}
    </JiraSearchClientContext.Provider>
  );
};
