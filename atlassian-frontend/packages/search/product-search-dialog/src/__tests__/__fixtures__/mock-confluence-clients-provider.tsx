/**
 * Provide a fake confluence clients provider for use in storybook
 */
import React, { FunctionComponent } from 'react';
import { Products } from '../../common/product-context';
import { ConfluenceSearchClientsContext } from '../../confluence/clients/confluence-search-provider';
import CancellablePromise from '../../utils/cancellable-promise';
import { Scope } from '../../confluence/clients';
import {
  createPageBlogAttachmentResults,
  createPeopleResults,
  createSpaceResponse,
} from './mock-search-results';
import { DEFAULT_AB_TEST } from '../../common/ab-test-provider';
import {
  createCollaborationContainerResponse,
  createCollaborationUsersResponse,
} from './mock-server-response';

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

const mockClients = (mode: ClientMode) => {
  const resultCount = { ...{ item: 99, space: 10, people: 10 } };

  return {
    cloudId: 'mock-cloud',
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
      getUsers: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(
              createCollaborationUsersResponse(10),
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
    recentClient: {
      getRecentItems: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(
              createPageBlogAttachmentResults(resultCount.item),
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
      getRecentSpaces: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(
              createSpaceResponse(resultCount.space),
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
              [Scope.ConfluencePageBlogAttachment]: delayed(
                createPageBlogAttachmentResults(resultCount.item),
                getDelay(mode),
              ),
              [Scope.ConfluenceSpace]: delayed(
                createSpaceResponse(resultCount.space),
                getDelay(mode),
              ),
              [Scope.People]: delayed(
                createPeopleResults(resultCount.people),
                getDelay(mode),
              ),
            };
          case 'loading':
            return {
              [Scope.ConfluencePageBlogAttachment]: NEVER_ENDING_PROMISE,
              [Scope.ConfluenceSpace]: NEVER_ENDING_PROMISE,
              [Scope.People]: NEVER_ENDING_PROMISE,
            };
          case 'error':
            return {
              [Scope.ConfluencePageBlogAttachment]: delayedFailedPromise(
                'theres a gremlin',
                0,
              ),
              [Scope.ConfluenceSpace]: delayedFailedPromise(
                'theres a gremlin',
                0,
              ),
              [Scope.People]: delayedFailedPromise('theres a gremlin', 0),
            };
          default:
            EXHAUSIVE_CHECK(mode);
        }
      },
      searchSpaces: () => {
        switch (mode) {
          case 'instant':
          case 'slow':
          case 'normal':
            return delayed(
              createSpaceResponse(resultCount.space),
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
      searchUsers: () => {
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
  };
};

export interface MockConfluenceClientsProviderProps {
  mode?: ClientMode;
}

export const MockConfluenceClientsProvider: FunctionComponent<MockConfluenceClientsProviderProps> = ({
  children,
  mode = 'instant',
}) => {
  const clients = mockClients(mode);

  return (
    <ConfluenceSearchClientsContext.Provider value={clients}>
      {children}
    </ConfluenceSearchClientsContext.Provider>
  );
};
