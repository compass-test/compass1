import faker from 'faker';
import {
  Attribute,
  AttributeIssue,
  ServerResponse,
  Scope,
  AttributeType,
  AttributeBoard,
  AttributeProject,
  AttributeFilter,
  AttributePlan,
  Avatar,
  UrsServerResponse,
} from '../../jira/clients/response-types';
import { JiraSearchClient } from '../../jira/clients/jira-search-client';

faker.seed(777);

const array = (length: number) => [...Array(length)];

export function createJiraIssueResponse(
  resultLimit?: number,
): ServerResponse<Scope.JiraIssue> {
  const results: ServerResponse<Scope.JiraIssue>['results'] = [];
  for (
    let i = 0;
    i < (resultLimit || JiraSearchClient.ITEM_RESULT_LIMIT);
    i++
  ) {
    results.push(createServerResponseResult(createJiraAttributeIssue()));
  }
  return {
    id: Scope.JiraIssue,
    results,
    size: results.length,
  };
}

export function createJiraPlanResponse(
  resultLimit?: number,
): ServerResponse<Scope.JiraPlan> {
  const results: ServerResponse<Scope.JiraPlan>['results'] = [];
  for (
    let i = 0;
    i < (resultLimit || JiraSearchClient.ITEM_RESULT_LIMIT);
    i++
  ) {
    results.push(createServerResponseResult(createJiraAttributePlan()));
  }
  return {
    id: Scope.JiraPlan,
    results,
    size: results.length,
  };
}

export function createJiraBPFResponse(
  resultLimit?: number,
): ServerResponse<Scope.JiraBoardProjectFilter> {
  const results: ServerResponse<Scope.JiraBoardProjectFilter>['results'] = [];
  const totalLimit = resultLimit || JiraSearchClient.ITEM_RESULT_LIMIT;
  const perScopeLimit = Math.ceil(totalLimit) / 3;
  for (let i = 0; i < perScopeLimit; i++) {
    results.push(createServerResponseResult(createJiraAttributeBoard()));
    results.push(createServerResponseResult(createJiraAttributeProject()));
    results.push(createServerResponseResult(createJiraAttributeFilter()));
  }
  const sortMap = {
    [AttributeType.board]: 0,
    [AttributeType.project]: 1,
    [AttributeType.filter]: 2,
  };
  results.sort(
    (a, b) =>
      +(sortMap[a.attributes['@type']] > sortMap[b.attributes['@type']]),
  );

  // Strip out any extra results from rounding up
  while (results.length > totalLimit) {
    results.pop();
  }

  return {
    id: Scope.JiraBoardProjectFilter,
    results,
  };
}

export function createJiraBPFPResponse(
  resultLimit?: number,
): ServerResponse<Scope.JiraBoardProjectFilterPlan> {
  const results: ServerResponse<
    Scope.JiraBoardProjectFilterPlan
  >['results'] = [];
  const totalLimit = resultLimit || JiraSearchClient.ITEM_RESULT_LIMIT;
  const perScopeLimit = Math.ceil(totalLimit) / 4;
  for (let i = 0; i < perScopeLimit; i++) {
    results.push(createServerResponseResult(createJiraAttributeBoard()));
    results.push(createServerResponseResult(createJiraAttributeProject()));
    results.push(createServerResponseResult(createJiraAttributeFilter()));
    results.push(createServerResponseResult(createJiraAttributePlan()));
  }
  const sortMap = {
    [AttributeType.board]: 0,
    [AttributeType.project]: 1,
    [AttributeType.filter]: 2,
    [AttributeType.plan]: 3,
  };
  results.sort(
    (a, b) =>
      +(sortMap[a.attributes['@type']] > sortMap[b.attributes['@type']]),
  );

  // Strip out any extra results from rounding up
  while (results.length > totalLimit) {
    results.pop();
  }

  return {
    id: Scope.JiraBoardProjectFilterPlan,
    results,
  };
}

export function createJiraProjectResponse(
  resultLimit?: number,
): ServerResponse<Scope.JiraProject> {
  const results: ServerResponse<Scope.JiraProject>['results'] = [];
  const totalLimit = resultLimit || JiraSearchClient.ITEM_RESULT_LIMIT;
  for (let i = 0; i < totalLimit; i++) {
    results.push(createServerResponseResult(createJiraAttributeProject()));
  }

  return {
    id: Scope.JiraProject,
    results,
  };
}

function createServerResponseResult<T extends Attribute>(attributes: T) {
  return {
    id: faker.random.uuid(),
    name: faker.lorem.words(),
    url: `${faker.internet.url()}`,
    attributes,
  };
}

/**
 * Mocks a response for a urs people scoped search to the aggregator
 */
export const createUrsPeopleResponse = (
  numberOfResults: number = 1,
): UrsServerResponse => ({
  id: Scope.People,
  results: array(numberOfResults).map(() => ({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    avatarUrl: faker.image.people(),
    entityType: 'USER',
    nickname: `nickname-${faker.random.alphaNumeric(5)}`,
  })),
});

function createJiraAttributeIssue(): AttributeIssue {
  return {
    '@type': AttributeType.issue,
    key: createIssueKey(),
    issueTypeId: faker.random.uuid(),
    issueTypeName: faker.random.arrayElement(['Epic', 'Story', 'Task', 'Bug']),
    containerId: faker.random.uuid(),
    container: {
      title: faker.random.words(),
      id: faker.random.uuid(),
    },
    avatar: createAvatarSingle(),
    updated: '2004-12-05T16:50:06.678Z',
    isRecentResult: false,
  };
}

function createJiraAttributeBoard(): AttributeBoard {
  const containerName = faker.random.words();
  return {
    '@type': AttributeType.board,
    containerId: faker.random.uuid(),
    container: {
      title: containerName,
      id: faker.random.uuid(),
    },
    containerName,
    avatar: createAvatarSingle(),
  };
}

function createJiraAttributeProject(): AttributeProject {
  return {
    '@type': AttributeType.project,
    projectType: faker.random.arrayElement(['software', 'next-gen']),
    avatar: createAvatarMultiple(),
  };
}

function createJiraAttributeFilter(): AttributeFilter {
  return {
    '@type': AttributeType.filter,
    ownerId: faker.random.uuid(),
    ownerName: faker.name.findName(),
  };
}

function createJiraAttributePlan(): AttributePlan {
  return {
    '@type': AttributeType.plan,
  };
}

function createIssueKey() {
  let baseWord;
  do {
    baseWord = faker.random.word();
  } while (baseWord.length < 3);
  baseWord = baseWord.substr(0, 3).toUpperCase();
  return `${baseWord}-${faker.random.number(10000000)}`;
}

function createAvatarSingle(): Avatar {
  return {
    url: faker.internet.url(),
  };
}

function createAvatarMultiple(): Avatar {
  return {
    urls: {
      '16x16': faker.image.imageUrl(),
      '24x24': faker.image.imageUrl(),
      '32x32': faker.image.imageUrl(),
      '48x48': faker.image.imageUrl(),
    },
  };
}
