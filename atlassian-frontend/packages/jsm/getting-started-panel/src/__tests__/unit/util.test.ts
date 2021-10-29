import {
  BasicsTaskIds,
  ChangesTaskIds,
  ChecklistTabKey,
  IncidentsTaskIds,
  Product,
  TaskId,
} from '../../common/types';
import {
  getCompletedTasks,
  getLinkTarget,
  getTabTaskIds,
  getComponentTestId,
} from '../../common/util';
import { deterministicShuffle } from '../_testUtils';

const { Basics, Changes, Incidents } = ChecklistTabKey;

type TestCase = [
  string,
  {
    input: {
      completedTasks: TaskId[];
    };
    output: {
      [Basics]: TaskId[];
      [Changes]: TaskId[];
      [Incidents]: TaskId[];
    };
  },
];

type ArrayTransformTestCase = [string, (taskIds: TaskId[]) => TaskId[]];

describe('getCompletedTasks', () => {
  const noneCompleted: TestCase = [
    'none completed',
    {
      input: { completedTasks: [] },
      output: { [Basics]: [], [Changes]: [], [Incidents]: [] },
    },
  ];

  const oneChange: TestCase = [
    'one change',
    {
      input: {
        completedTasks: ChangesTaskIds.slice(1, 2),
      },
      output: {
        [Basics]: [],
        [Changes]: ChangesTaskIds.slice(1, 2),
        [Incidents]: [],
      },
    },
  ];

  const threeOfTheSame: TestCase = [
    'three of the same',
    {
      input: {
        completedTasks: [
          ...ChangesTaskIds.slice(2, 3),
          ...ChangesTaskIds.slice(2, 3),
          ...ChangesTaskIds.slice(2, 3),
        ],
      },
      output: {
        [Basics]: [],
        [Changes]: ChangesTaskIds.slice(2, 3),
        [Incidents]: [],
      },
    },
  ];

  const someBasicsAndChanges: TestCase = [
    'some basics and changes',
    {
      input: {
        completedTasks: [
          ...BasicsTaskIds.slice(0, 3),
          ...ChangesTaskIds.slice(0, 2),
        ],
      },
      output: {
        [Basics]: BasicsTaskIds.slice(0, 3),
        [Changes]: ChangesTaskIds.slice(0, 2),
        [Incidents]: [],
      },
    },
  ];

  const justSomeIncidents: TestCase = [
    'just some incidents',
    {
      input: {
        completedTasks: IncidentsTaskIds.slice(0, 3),
      },
      output: {
        [Basics]: [],
        [Changes]: [],
        [Incidents]: IncidentsTaskIds.slice(0, 3),
      },
    },
  ];

  const allCompleted: TestCase = [
    'all completed',
    {
      input: {
        completedTasks: [
          ...BasicsTaskIds,
          ...ChangesTaskIds,
          ...IncidentsTaskIds,
        ],
      },
      output: {
        [Basics]: BasicsTaskIds,
        [Changes]: ChangesTaskIds,
        [Incidents]: IncidentsTaskIds,
      },
    },
  ];

  describe.each([
    noneCompleted,
    oneChange,
    threeOfTheSame,
    someBasicsAndChanges,
    justSomeIncidents,
    allCompleted,
  ])('%s', (_, { input, output }) => {
    describe.each([
      ['as is', (x) => x],
      ['shuffled', deterministicShuffle],
      ['reversed', (x) => [...x].reverse()],
      ['sorted', (x) => [...x].sort()],
      ['reverse sorted', (x) => [...x].sort().reverse()],
      ['duplicated', (x) => [...x, ...x]],
    ] as ArrayTransformTestCase[])('%s', (_, transformer) => {
      const transformedArray = transformer(input.completedTasks);
      it.each([
        ChecklistTabKey.Basics,
        ChecklistTabKey.Changes,
        ChecklistTabKey.Incidents,
      ])('should have correct completed tasks for %s', (checklistTabKey) => {
        const activeTabCompletedTasks = getCompletedTasks(
          transformedArray,
          getTabTaskIds(checklistTabKey),
        );

        expect(activeTabCompletedTasks).toEqual(
          expect.arrayContaining(output[checklistTabKey]),
        );

        expect(activeTabCompletedTasks.length).toEqual(
          output[checklistTabKey].length,
        );
      });
    });
  });
});

describe('getLinkTarget', () => {
  it('should return _self when linking to the same product', () => {
    expect(getLinkTarget(Product.ServiceDesk, Product.ServiceDesk)).toBe(
      '_self',
    );
    expect(getLinkTarget(Product.Opsgenie, Product.Opsgenie)).toBe('_self');
  });
  it('should return _blank when linking to the other product', () => {
    expect(getLinkTarget(Product.ServiceDesk, Product.Opsgenie)).toBe('_blank');
    expect(getLinkTarget(Product.Opsgenie, Product.ServiceDesk)).toBe('_blank');
  });
});

describe('getComponentTestId', () => {
  it('should return prefixed test id', () => {
    expect(getComponentTestId('')).toBe('jsm-getting-started-panel--');
    expect(getComponentTestId('mockComponent')).toBe(
      'jsm-getting-started-panel--mockComponent',
    );
  });
});
