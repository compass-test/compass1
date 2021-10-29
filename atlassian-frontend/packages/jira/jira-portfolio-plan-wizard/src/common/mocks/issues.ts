import compose from 'lodash/fp/compose';
import keyBy from 'lodash/fp/keyBy';
import mapValues from 'lodash/fp/mapValues';
import times from 'lodash/fp/times';

import {
  HierarchyConfiguration,
  IssueStatusCategory,
  IssueStatusType,
  IssueStatusTypeMap,
  IssueType,
  IssueTypeMap,
} from '../types';

const issueStatusCategories: IssueStatusCategory[] = [
  { id: '1', key: 'undefined', name: 'No Category', color: 'medium-gray' },
  {
    id: '2',
    key: 'new',
    name: 'To Do',
    color: 'blue-gray',
  },
  { id: '3', key: 'indeterminate', name: 'In Progress', color: 'yellow' },
  { id: '4', key: 'done', name: 'Done', color: 'green' },
];

const issueStatuses = [
  { id: '301', name: 'In Progress', categoryId: 3 },
  { id: '302', name: 'In Review', categoryId: 3 },
  { id: '303', name: 'Waiting for deployment', categoryId: 3 },
  { id: '401', name: 'Done', categoryId: 4 },
  { id: '402', name: 'Canceled', categoryId: 4 },
  { id: '403', name: 'No longer required', categoryId: 4 },
  { id: '201', name: 'Todo', categoryId: 2 },
  { id: '202', name: 'Gathering impact', categoryId: 2 },
  { id: '203', name: 'Needs design', categoryId: 2 },
  { id: '204', name: 'Requires Grooming', categoryId: 2 },
  { id: '205', name: 'Ready for engineering', categoryId: 2 },
];

const categoryMap = keyBy('id', issueStatusCategories);

export const issueStatusMap: IssueStatusTypeMap = compose(
  mapValues((status: IssueStatusType & { categoryId: number }) => {
    const category = categoryMap[status.categoryId] || issueStatusCategories[0];
    const { categoryId, ...statusProps } = status;
    return { ...statusProps, category };
  }),
  keyBy('id'),
)(issueStatuses);

export const hierarchyConfiguration: HierarchyConfiguration = {
  levels: [
    {
      title: 'Sub-Task',
      issueTypes: ['10001'],
    },
    {
      title: 'Story',
      issueTypes: ['10002', '10006', '10100', '101001'],
    },
    {
      title: 'Epic',
      issueTypes: ['10003'],
    },
    {
      title: 'Initiative',
      issueTypes: ['10004'],
    },
    {
      title: 'Uber-initiative',
      issueTypes: ['10005'],
    },
  ],
};

const BASE_URL_MOCK = 'https://jsw-premium-plai2.jira-dev.com';

export const issueTypes = [
  {
    name: 'Sub-task',
    iconUrl: `${BASE_URL_MOCK}/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype`,
    subTask: true,
    id: hierarchyConfiguration.levels[0].issueTypes[0],
  },
  {
    name: 'Story',
    iconUrl: `${BASE_URL_MOCK}/images/icons/issuetypes/story.svg`,
    subTask: false,
    id: hierarchyConfiguration.levels[1].issueTypes[0],
  },
  {
    name: 'Bug',
    iconUrl: `${BASE_URL_MOCK}/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype`,
    subTask: false,
    id: hierarchyConfiguration.levels[1].issueTypes[1],
  },
  {
    name: 'Epic',
    iconUrl: `${BASE_URL_MOCK}/images/icons/issuetypes/epic.svg`,
    subTask: false,
    id: hierarchyConfiguration.levels[2].issueTypes[0],
  },
  {
    name: 'Task',
    iconUrl: `${BASE_URL_MOCK}/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype`,
    subTask: false,
    id: 10003,
  },
  {
    name: 'Improvement',
    iconUrl: `${BASE_URL_MOCK}/images/icons/issuetypes/story.svg`,
    subTask: false,
    id: 10100,
  },
  {
    name: 'Docs',
    iconUrl: `${BASE_URL_MOCK}/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype`,
    subTask: false,
    id: 101001,
  },
];

export const issueTypeMap: IssueTypeMap = compose(
  mapValues((issueType: IssueType) => {
    const level = hierarchyConfiguration.levels.findIndex((level) =>
      level.issueTypes.includes(issueType.id),
    );
    return { ...issueType, level: Math.max(0, level) };
  }),
  keyBy('id'),
)(issueTypes);

export const issues = [
  {
    id: '15492',
    issueKey: 5,
    issueSources: [0],
    values: {
      type: 10001,
      project: 1,
      status: '201',
      summary: 'Example issue',
      lexoRank: '0|i00xrb:',
      excluded: false,
    },
    originals: {},
    assignments: [],
    annotations: [],
  },
  {
    id: '15493',
    issueKey: 6,
    issueSources: [0],
    values: {
      type: 10002,
      project: 1,
      status: '202',
      summary: 'Example issue 2 - extremely long name'.concat(
        times((index) => ` - extremely long name${index}`, 9).join(''),
      ),
      lexoRank: '0|i00xrj:',
      excluded: false,
    },
    originals: {},
    assignments: [],
    annotations: [],
  },
  {
    id: '10002',
    issueKey: 3,
    issueSources: [0],
    values: {
      type: 10002,
      project: 2,
      status: '203',
      summary: 'twoset',
      parent: '15489',
      lexoRank: '0|i00xo7:',
      storyPoints: 3.0,
      excluded: false,
      sprint: '1',
      dueDate: 1600041600000,
    },
    originals: {},
    assignments: [],
    annotations: [],
  },
  {
    id: '10000',
    issueKey: 1,
    issueSources: [0],
    values: {
      type: 10002,
      project: 3,
      // One mismatch in api so our code is sure to not crash
      status: '99999999',
      summary: 'apple',
      parent: '15489',
      lexoRank: '0|i00xnr:',
      storyPoints: 1.0,
      fixVersions: ['10003'],
      excluded: false,
      sprint: '1',
    },
    originals: {},
    assignments: [],
    annotations: [],
  },
  {
    id: '15489',
    issueKey: 4,
    issueSources: [0],
    values: {
      type: 10003,
      project: 10001,
      status: '302',
      summary: 'I am epic',
      lexoRank: '0|i00xnf:',
      excluded: false,
      sprint: '1',
      dueDate: 1600300800000,
      parent: '10001',
    },
    originals: {},
    assignments: [],
    annotations: [],
  },
  {
    id: '10001',
    issueKey: 2,
    issueSources: [0],
    values: {
      type: 10004,
      project: 2,
      status: '403',
      summary: 'Initiative',
      parent: '10501',
      lexoRank: '0|i00xnz:',
      storyPoints: 2.0,
      excluded: false,
      sprint: '1',
    },
    originals: {},
    assignments: [],
    annotations: [],
  },
  {
    id: '10501',
    issueKey: 10,
    issueSources: [0],
    values: {
      type: 10005,
      project: 2,
      status: '401',
      summary: 'Uber-epic-initiative',
      parent: '15489',
      lexoRank: '0|i00xnz:',
      storyPoints: 2.0,
      excluded: false,
      sprint: '1',
    },
    originals: {},
    assignments: [],
    annotations: [],
  },
]
  // Extra issues
  .concat(
    times(
      (index) => ({
        id: index.toString(),
        issueKey: 6,
        issueSources: [0],
        values: {
          type: 10002,
          project: 1,
          status: '302',
          summary: `${index} - something`,
          lexoRank: '0|i00xrj:',
          excluded: false,
        },
        originals: {},
        assignments: [],
        annotations: [],
      }),
      50,
    ),
  );
