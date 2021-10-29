/**
 * Provides mock server response. These mocks are primarily for the clients and should not be used anywhere else unless there's good reason to
 */

import faker from 'faker';
import {
  ConfUrsPeopleResponse,
  Scope,
  ConfItemResponse,
  ConfluenceItemContentType,
  ConfPeopleResponse,
  ConfSpaceResponse,
} from '../../confluence/clients/response-types';
import { DEFAULT_AB_TEST } from '../../common/ab-test-provider';
import {
  ExperimentResponse,
  CollaborationGraphUserAPIResponse,
  CollaborationGraphContainerAPIResponse,
} from '../../common/clients/common-types';
import {
  ABTest,
  ContainerType,
  ProductsPermissionsResponse,
} from '../../common/clients';

faker.seed(777);

export const DUMMY_CONFLUENCE_HOST = 'http://localhost';

export const MOCK_SPACE = {
  id: '123',
  key: 'S&S',
  icon: 'icon',
  name: 'Search & Smarts',
};

const array = (length: number) => [...Array(length)];
const partialUrl = (suffix: string = '') =>
  `/${faker.random.alphaNumeric(3)}/${faker.random.alphaNumeric(3)}`;

/**
 * Fixes the randomness of randomly generate responses. This is useful to ensure that tests are deterministic.
 *
 * The default is just some arbitrary number.
 */
export const enableDeterministicResponses = (seed: number = 777) =>
  faker.seed(seed);

/**
 * Mocks a response for a urs people scoped search to the aggregator
 */
export const createUrsPeopleResponse = (
  numberOfResults: number = 1,
): ConfUrsPeopleResponse => ({
  id: Scope.UserConfluence,
  results: array(numberOfResults).map(() => ({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    avatarUrl: faker.image.people(),
    entityType: 'USER',
    nickname: `nickname-${faker.random.alphaNumeric(5)}`,
  })),
});

/**
 * Mocks a response for a cpus people scoped search to the aggregator
 */
export const createCpusPeopleResponse = (
  numberOfResults: number = 1,
): ConfPeopleResponse => ({
  id: Scope.People,
  results: array(numberOfResults).map(() => ({
    account_id: faker.random.uuid(),
    name: faker.name.findName(),
    nickname: `nickname-${faker.random.alphaNumeric(5)}`,
    picture: faker.image.people(),
    job_title: faker.random.arrayElement([faker.name.jobTitle(), undefined]),
  })),
});

/**
 * Mocks a response for a call to the experiment api
 */
export const createExperimentResponse = (
  scopes: Scope[],
  abTest: ABTest = DEFAULT_AB_TEST,
): ExperimentResponse<Scope> => {
  const responseByScope = scopes.map((scope) => ({ id: scope, abTest }));
  return { scopes: responseByScope };
};

/**
 * Mocks a response for a call to the scopes api
 */
export const createScopesResponse = (
  products: string[],
): ProductsPermissionsResponse<any> => ({
  products: products.reduce((acc, product) => {
    acc[product] = [];
    return acc;
  }, {} as any),
});

/**
 * Mocks a response for page blog attachment (aka 'item') search to the aggregator
 */
export const createPageBlogAttachmentResponse = (
  numberOfResults: number = 1,
): ConfItemResponse => ({
  id: Scope.ConfluencePageBlogAttachment,
  results: array(numberOfResults).map(() => {
    const type: ConfluenceItemContentType = faker.random.arrayElement([
      'page',
      'blogpost',
    ]);
    const icon = 'aui-iconfont-page-default';

    return {
      title: faker.lorem.words(5),
      container: {
        title: faker.company.companyName(),
        displayUrl: partialUrl(),
      },
      url: partialUrl(),
      baseUrl: DUMMY_CONFLUENCE_HOST,
      content: {
        id: faker.random.uuid(),
        type,
      },
      iconCssClass: icon,
      lastModified: faker.random.arrayElement([
        '2019-10-28T23:35:34.642Z',
        '2019-07-08T02:54:38.822Z',
      ]),
      friendlyLastModified: faker.random.arrayElement([
        'about 7 hours ago',
        'Dec 23, 2018',
        'Jun 17, 2018',
        'Jan 23, 2018',
      ]),
    };
  }),
  size: 99,
});

/**
 * Mocks a response for space search to the aggregator
 */
export const createSpaceResponse = (
  numberOfResults: number = 1,
): ConfSpaceResponse => ({
  id: Scope.ConfluenceSpace,
  results: array(numberOfResults).map(() => {
    const key = `KEY-${faker.random.word().toUpperCase()}`;

    return {
      title: faker.lorem.words(5),
      container: {
        title: faker.company.companyName(),
        displayUrl: `/spaces/${key}`,
      },
      url: partialUrl(),
      baseUrl: DUMMY_CONFLUENCE_HOST,
      content: {
        id: key,
        type: 'space',
      },
      space: {
        key,
        icon: {
          path: faker.image.cats(),
        },
      },
      iconCssClass: 'aui-iconfont-space-default',
      lastModified: faker.random.arrayElement([
        '2019-10-28T23:35:34.642Z',
        '2019-07-08T02:54:38.822Z',
      ]),
      friendlyLastModified: faker.random.arrayElement([
        'about 7 hours ago',
        'Dec 23, 2018',
        'Jun 17, 2018',
        'Jan 23, 2018',
      ]),
    };
  }),
});

export const searchError = () => 'this is a mock error response';

export function createCollaborationContainerResponse(num: number) {
  return {
    collaborationGraphEntities: array(num).map(() =>
      createCollaborationContainer(),
    ),
  };
}

export function createCollaborationContainer(
  overrides: Partial<CollaborationGraphContainerAPIResponse> = {},
): CollaborationGraphContainerAPIResponse {
  const id = faker.random.uuid();
  const defaultContainer: CollaborationGraphContainerAPIResponse = {
    id,
    entityType: 'CONTAINER',
    containerType: 'space' as ContainerType,
    containerDetails: {
      id,
      key: faker.random.uuid(),
      name: faker.random.word(),
      url: faker.internet.url(),
      iconUrl: faker.internet.url(),
      score: faker.random.number(),
    },
  };

  return { ...defaultContainer, ...overrides };
}

export function createCollaborationUsersResponse(num: number) {
  return {
    collaborationGraphEntities: array(num).map(() => createCollaborationUser()),
  };
}

export function createCollaborationUser(
  overrides: Partial<CollaborationGraphUserAPIResponse> = {},
): CollaborationGraphUserAPIResponse {
  const id = faker.random.uuid();
  const defaultContainer: CollaborationGraphUserAPIResponse = {
    id,
    entityType: 'USER',
    userProfile: {
      account_id: id,
      name: faker.random.word(),
      email: faker.internet.email(),
      picture: faker.internet.url(),
      account_status: ['active', 'deactivated', 'deleted'][
        faker.random.number(2)
      ],
      account_type: 'atlassian',
      locale: 'en-US',
      score: faker.random.number(),
    },
  };

  return { ...defaultContainer, ...overrides };
}
