// We import the mock like this instead of '@atlaskit/util-service-support' even though they would resolve to the same
// module for a storybook because we want to have the typed versions of the additional test methods.
import {
  utils,
  ServiceConfig,
  RequestServiceOptions,
} from './util-service-support-mock';
import {
  createUrsPeopleResponse,
  createPageBlogAttachmentResponse,
  createSpaceResponse,
  createCpusPeopleResponse,
  createExperimentResponse,
  createCollaborationUser,
  createCollaborationContainer,
  createScopesResponse,
} from '../../src/__tests__/__fixtures__/mock-server-response';
import { Scope } from '../../src/confluence/clients/response-types';
import faker from 'faker';
import {
  ABTest,
  CollaborationGraphResponse,
  ProductsPermissionsResponse,
} from '../../src/common/clients';
import {
  ExperimentResponse,
  CollaborationGraphUserAPIResponse,
  CollaborationGraphContainerAPIResponse,
} from '../../src/common/clients/common-types';

const delay: () => number = () => faker.random.number(500) + 300;

function delayedPromise<T>(resolveValue: T, delayTime: number): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(resolveValue), delayTime),
  );
}

export const mockScopes = () => {
  const scopesPath = 'scopes/v1';

  utils.intercept<ProductsPermissionsResponse<any>>(
    (_: ServiceConfig, options?: RequestServiceOptions) => {
      if (options?.path === scopesPath) {
        const body = JSON.parse((options.requestInit?.body || {}).toString());
        const response = createScopesResponse(body.products);
        return new Promise((resolve) =>
          setTimeout(() => resolve(response), 2000),
        );
      }
      return null;
    },
  );
};

export const mockExperiment = (abTest: ABTest) => {
  const experimentPath = `experiment/v1`;

  utils.intercept<ExperimentResponse<Scope>>(
    (_: ServiceConfig, options?: RequestServiceOptions) => {
      if (options && options.path && options.path === experimentPath) {
        const body: any = JSON.parse(
          (options.requestInit?.body || {}).toString(),
        );
        const response = createExperimentResponse(body.scopes, abTest);
        return new Promise((resolve) =>
          setTimeout(() => resolve(response), 2000),
        );
      }

      return null;
    },
  );
};

export const mockSearch = () => {
  const path = `quicksearch/v1`;

  utils.intercept<{ scopes: any[] }>(
    (_: ServiceConfig, options?: RequestServiceOptions) => {
      if (options && options.path && options.path.startsWith(path)) {
        if (options.requestInit && options.requestInit.body) {
          const body: any = JSON.parse(options.requestInit.body.toString());
          if (body && body.scopes) {
            const mockResponses: any[] = [];

            (body.scopes as Scope[]).forEach((scope) => {
              switch (scope) {
                case Scope.ConfluencePageBlogAttachment:
                  mockResponses.push(createPageBlogAttachmentResponse(20));
                  break;
                case Scope.ConfluenceSpace:
                  mockResponses.push(createSpaceResponse(20));
                  break;
                case Scope.People:
                  mockResponses.push(createCpusPeopleResponse(20));
                  break;
                case Scope.UserConfluence:
                  mockResponses.push(createUrsPeopleResponse(20));
                  break;
                default: {
                  throw new Error('Invalid Scope requested');
                }
              }
            });

            return delayedPromise(
              {
                scopes: mockResponses,
              },
              delay(),
            );
          }
        }
      }

      return null;
    },
  );
};

export const mockCollaborationGraph = () => {
  const userPath = `v1/collaborationgraph/user/user`;
  const containerPath = `v1/collaborationgraph/user/container`;

  // Mock the recent call path
  utils.intercept<
    CollaborationGraphResponse<CollaborationGraphUserAPIResponse>
  >((_: ServiceConfig, options?: RequestServiceOptions) => {
    if (options && options.path && options.path === userPath) {
      return delayedPromise(
        {
          collaborationGraphEntities: [
            createCollaborationUser(),
            createCollaborationUser(),
            createCollaborationUser(),
            createCollaborationUser(),
            createCollaborationUser(),
            createCollaborationUser(),
            createCollaborationUser(),
            createCollaborationUser(),
            createCollaborationUser(),
            createCollaborationUser(),
          ],
          timings: 123,
        },
        delay(),
      );
    }

    return null;
  });

  utils.intercept<
    CollaborationGraphResponse<CollaborationGraphContainerAPIResponse>
  >((_: ServiceConfig, options?: RequestServiceOptions) => {
    if (options && options.path && options.path === containerPath) {
      return delayedPromise(
        {
          collaborationGraphEntities: [
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
          ],
          timings: 123,
        },
        delay(),
      );
    }

    return null;
  });
};

export const restore = () => {
  utils.restore();
};
