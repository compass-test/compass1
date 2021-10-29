import faker from 'faker';
import {
  Result,
  Results,
  Scope,
  ContentType,
  AttributeType,
} from '../../jira/clients';
import {
  Result as SingleResultType,
  AttributeProject,
  AttributeBoard,
  AttributeFilter,
  AttributePlan,
} from '../../jira/clients/response-types';

faker.seed(777);

const issueTypes = ['Story', 'Epic', 'Bug', 'Task'];

const array = (length: number) => [...Array(length)];

export const createJiraIssueResponse = (
  num: number,
  isCached: boolean = false,
  timings: number = 0,
  totalSize?: number,
): Results<Scope.JiraIssue> => {
  const issues: Result<Scope.JiraIssue>[] = [...Array(num)].map(() => {
    const projectId = `projectid_${faker.random.uuid()}`;
    const projectName = faker.random.words(3);
    const projectKey = projectName
      .split(' ')
      .map((word) => word.substring(0, 1).toUpperCase())
      .join('');

    const key = `${projectKey}-${faker.random.number({
      min: 1,
      max: 1000000,
      precision: 1,
    })}`;

    const fakeIssue: Result<Scope.JiraIssue> = {
      resultId: faker.random.uuid(),
      name: faker.lorem.words(5),
      href: `/browse/${key}`,
      contentType: ContentType.JiraIssue,
      attributes: {
        '@type': AttributeType.issue,
        key,
        issueTypeId: `issuetypeid_${faker.random.uuid()}`,
        issueTypeName: faker.random.arrayElement(issueTypes),
        containerId: projectId,
        container: {
          title: `Project ${projectName}`,
          id: projectId,
        },
        avatar: {
          url: faker.image.cats(),
        },
        isRecentResult: false,
        updated: '2004-12-05T16:50:06.678Z',
      },
      isCached,
    };
    return fakeIssue;
  });

  return {
    items: issues,
    timings,
    totalSize: totalSize || num,
  };
};

export const createSingleBoard: (
  isCached?: boolean,
) => SingleResultType<AttributeBoard> = (isCached = false) => {
  const containerId = `container_${faker.random.uuid()}`;
  const containerName = faker.random.words(3);
  const id = faker.random.uuid();

  const board: SingleResultType<AttributeBoard> = {
    resultId: id,
    name: faker.lorem.words(5),
    href: `/secure/RapidBoard.jspa?rapidView=${id}`,
    contentType: ContentType.JiraBoard,
    attributes: {
      '@type': AttributeType.board,
      containerId,
      containerName,
      container: {
        id: containerId,
        title: containerName,
      },
      avatar: {
        url: faker.image.cats(),
      },
    },
    isCached,
  };

  return board;
};

const createSingleProject: (
  isCached?: boolean,
) => SingleResultType<AttributeProject> = (isCached = false) => {
  const projectId = `projectid_${faker.random.uuid()}`;
  const projectName = faker.random.words(3);
  const projectKey = projectName
    .split(' ')
    .map((word) => word.substring(0, 1).toUpperCase())
    .join('');

  const project: SingleResultType<AttributeProject> = {
    resultId: projectId,
    name: faker.lorem.words(5),
    href: `/browse/${projectKey}`,
    contentType: ContentType.JiraProject,
    attributes: {
      '@type': AttributeType.project,
      projectType: faker.random.arrayElement([
        'business',
        'software',
        'servicedesk',
      ]),
      avatar: {
        urls: {
          '48x48': faker.image.cats(48, 48),
          '32x32': faker.image.cats(32, 32),
          '24x24': faker.image.cats(24, 24),
          '16x16': faker.image.cats(16, 16),
        },
      },
    },
    isCached,
  };

  return project;
};

const createSingleFilter: (
  isCached?: boolean,
) => SingleResultType<AttributeFilter> = (isCached = false) => {
  const id = `filter_${faker.random.uuid()}`;

  const filter: SingleResultType<AttributeFilter> = {
    resultId: id,
    name: faker.lorem.words(5),
    href: `/issues/?filter=${id}`,
    contentType: ContentType.JiraFilter,
    attributes: {
      '@type': AttributeType.filter,
    },
    isCached,
  };

  return filter;
};

const createSinglePlan: (
  isCached?: boolean,
) => SingleResultType<AttributePlan> = (isCached = false) => {
  const id = `plan_${faker.random.uuid()}`;

  const plan: SingleResultType<AttributePlan> = {
    resultId: id,
    name: faker.lorem.words(5),
    href: `/issues/?filter=${id}`,
    contentType: ContentType.JiraPlan,
    attributes: {
      '@type': AttributeType.plan,
    },
    isCached,
  };

  return plan;
};

export const createBoardProjectFilterResponse = (
  num: number,
  isCached: boolean = false,
  timings: number = 0,
): Results<Scope.JiraBoardProjectFilter> => {
  const numberOfEachResponseType = Math.floor(num / 3);
  const numberOfLeftOver = num % 3;

  const numberOfBoards = numberOfEachResponseType;
  const numberOfProjects = numberOfEachResponseType + numberOfLeftOver;
  const numberOfFilters = numberOfEachResponseType;

  const boards = [...Array(numberOfBoards)].map(() =>
    createSingleBoard(isCached),
  );
  const projects = [...Array(numberOfProjects)].map(() =>
    createSingleProject(isCached),
  );
  const filters = [...Array(numberOfFilters)].map(() =>
    createSingleFilter(isCached),
  );

  return {
    items: [...boards, ...projects, ...filters],
    timings,
    totalSize: numberOfBoards + numberOfProjects + numberOfFilters,
  };
};

export const createBoardProjectFilterPlanResponse = (
  num: number,
  isCached: boolean = false,
  timings: number = 0,
): Results<Scope.JiraBoardProjectFilterPlan> => {
  const numberOfEachResponseType = Math.floor(num / 4);
  const numberOfLeftOver = num % 3;

  const numberOfBoards = numberOfEachResponseType;
  const numberOfProjects = numberOfEachResponseType + numberOfLeftOver;
  const numberOfFilters = numberOfEachResponseType;
  const numberOfPlans = numberOfEachResponseType;

  const boards = [...Array(numberOfBoards)].map(() =>
    createSingleBoard(isCached),
  );
  const projects = [...Array(numberOfProjects)].map(() =>
    createSingleProject(isCached),
  );
  const filters = [...Array(numberOfFilters)].map(() =>
    createSingleFilter(isCached),
  );
  const plans = [...Array(numberOfPlans)].map(() => createSinglePlan(isCached));

  return {
    items: [...boards, ...projects, ...filters, ...plans],
    timings,
    totalSize:
      numberOfBoards + numberOfProjects + numberOfFilters + numberOfPlans,
  };
};

/**
 * Mocks a response for a projects search to the aggregator
 */
export const createProjectResults = (
  numberOfResults: number = 1,
  timings: number = 0,
): Results<Scope.JiraProject> => {
  return {
    items: array(numberOfResults).map(() => createSingleProject()),
    timings,
    totalSize: numberOfResults,
  };
};

/**
 * Mocks a response for a urs people scoped search to the aggregator
 */
export const createPeopleResults = (
  numberOfResults: number = 1,
  timings: number = 0,
): Results<Scope.People> => {
  return {
    items: array(numberOfResults).map(() => {
      const id = faker.random.uuid();
      return {
        resultId: `people-${id}`,
        name: faker.name.findName(),
        href: `/people/${id}`,
        contentType: ContentType.JiraPeople,
        attributes: {
          '@type': AttributeType.people,
          avatarUrl: faker.image.people(),
          userId: id,
        },
        isCached: false,
      };
    }),
    timings,
    totalSize: numberOfResults,
  };
};
