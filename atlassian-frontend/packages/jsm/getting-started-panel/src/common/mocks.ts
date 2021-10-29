import { useState } from 'react';
import {
  ActiveState,
  BasicsTaskIds,
  ChangesTaskIds,
  Checklist,
  HeaderState,
  ChecklistTab,
  ChecklistTabKey,
  ProductTourKey,
  GspSectionKey,
  GspState,
  HasSeenReopenSpotlight,
  IncidentsTaskIds,
  ProductTours,
  SectionState,
  TaskId,
  VisualState,
  ContainerType,
  ExplicitStringBoolean,
} from './types';

export const mockChecklistTab: ChecklistTab = {
  activeTask: TaskId.AddChangeApprovers,
};

export const mockChecklist: Checklist = {
  headerState: HeaderState.Expanded,
  activeTab: ChecklistTabKey.Basics,
  tabs: {
    basics: { ...mockChecklistTab },
    incidents: { ...mockChecklistTab },
    changes: { ...mockChecklistTab },
  },
};

export const mockProductTours: ProductTours = {
  headerState: HeaderState.Minimized,
  activeTour: ProductTourKey.IncidentManagement,
};

export const mockServiceDeskBaseUrl = 'https://oopsies.atlassian.net';
export const mockOpsgenieBaseUrl = 'https://oopsies.app.opsgenie.com';

export const mockSectionState: SectionState = {
  version: 2,
  activeSection: GspSectionKey.Checklist,
  sections: {
    checklist: { ...mockChecklist },
    productTours: { ...mockProductTours },
  },
};

export const mockSectionState_old: SectionState = {
  version: 1,
  activeSection: GspSectionKey.Checklist,
  sections: {
    checklist: { ...mockChecklist },
    productTours: { activeTour: mockProductTours.activeTour },
  },
};

export const mockGspState: GspState = {
  completedItems: [],
  properties: {
    containers: [
      {
        containerId: '12344',
        containerType: ContainerType.Project,
        properties: {
          projectDeleted: ExplicitStringBoolean.Yes,
        },
      },
      {
        containerId: '12345',
        containerType: ContainerType.Project,
        properties: {},
      },
    ],
    user: {
      activeState: ActiveState.On,
      visualState: VisualState.FullPanel,
      projectId: '12345',
      sectionState: JSON.stringify(mockSectionState),
      hasSeenReopenSpotlight: HasSeenReopenSpotlight.Yes,
    },
  },
};

export const mockGspState_old: GspState = {
  completedItems: [],
  properties: {
    containers: [],
    user: {
      activeState: ActiveState.On,
      visualState: VisualState.FullPanel,
      projectId: '12345',
      sectionState: JSON.stringify(mockSectionState_old),
      hasSeenReopenSpotlight: HasSeenReopenSpotlight.Yes,
    },
  },
};

export const mockCompletedTasks = [
  TaskId.CreateItsmProject,
  TaskId.SetupTeam,
  TaskId.AddTeamMember,
];

// https://jdog.jira-dev.com/browse/JIG-804
// this is a quick copy / paste fix to unblock jira rapid board development
// long term we should probably add a separate entry point for mock files
const deterministicShuffle = <T>(
  array: T[],
  seedString: string = 'There once was a man named Chandler, whose wife made him die inside',
): T[] => {
  const NUM_OF_POSSIBLE_LETTERS = 26;

  // array of numbers in range [0, 1)
  const randomEnoughNumbers: number[] = seedString
    .replace(/[^a-z]/gi, '')
    .toLowerCase()
    .split('')
    .map(
      (char) =>
        (char.charCodeAt(0) - 'a'.charCodeAt(0)) / NUM_OF_POSSIBLE_LETTERS,
    );

  // cycle through randomEnoughNumbers
  let randIndex = 0;
  const getRandomEnoughNumber = () => {
    return randomEnoughNumbers[randIndex++ % randomEnoughNumbers.length];
  };

  const copy = [...array];

  // in place shuffle from good ol' stack overflow https://stackoverflow.com/a/6274381
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(getRandomEnoughNumber() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// a more versatile utility for storybook testing
const allTasks = [...BasicsTaskIds, ...ChangesTaskIds, ...IncidentsTaskIds];
const randomisedTasks = deterministicShuffle(allTasks);
const keepInBounds = (num: number, array: TaskId[]) =>
  Math.max(Math.min(num, array.length), 0);
export const useMockCompletedTasks = (
  nInitialCompleted = 0,
): [
  { completedTasks: TaskId[] },
  { more: () => void; less: () => void; onTaskComplete: (id: TaskId) => void },
] => {
  const [numCompletedTasks, setNumCompletedTasks] = useState<number>(
    keepInBounds(nInitialCompleted, randomisedTasks),
  );
  const completedTasks = randomisedTasks.slice(0, numCompletedTasks);

  const more = () =>
    setNumCompletedTasks((n) => keepInBounds(n + 1, randomisedTasks));
  const less = () =>
    setNumCompletedTasks((n) => keepInBounds(n - 1, randomisedTasks));

  const [forceCompletedTasks, setForceCompletedTasks] = useState<TaskId[]>([]);
  const onTaskComplete = (id: TaskId) =>
    setForceCompletedTasks([...forceCompletedTasks, id]);

  return [
    { completedTasks: [...completedTasks, ...forceCompletedTasks] },
    { more, less, onTaskComplete },
  ];
};
