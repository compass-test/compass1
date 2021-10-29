import type { UserInputType } from '../types';
import { ANSWERS } from '../constants';

type MockUserInput = { [key: string]: any };

const ORDERED_KEYS: Array<keyof UserInputType> = [
  'task',
  'allDependencies',
  'hasSingletons',
  'upgradeIdentifier',
  'hasPostUpgradeTasks',
  'rolloutStrategy',
];

const DEPENDENCIES = '@react@^17.0.0, @react-dom@^17.0.0, simple-get@^2.0.0';

export function makeSequenceInOrder(mock: MockUserInput, proceed = true) {
  const array = ORDERED_KEYS.map(key => mock[key]).filter(
    answer => answer !== undefined,
  );
  array.push(proceed);
  return array;
}

export function convertToUserInput(mock: MockUserInput) {
  const userInput = {
    ...mock,
    allDependencies: mock.allDependencies
      ? mock.allDependencies.split(',').map((x: string) => x.trim())
      : [],
  };
  return userInput;
}

export const DEP_UPGRADE_SINGLE_ROLLOUT: MockUserInput = {
  task: ANSWERS.TASK_DEPENDENCY_UPGRADE,
  allDependencies: DEPENDENCIES,
  hasSingletons: true,
  upgradeIdentifier: 'test identifier',
  hasPostUpgradeTasks: true,
  rolloutStrategy: ANSWERS.ROLLOUT_SINGLE,
};

export const DEP_UPGRADE_PACKAGE_ROLLOUT: MockUserInput = {
  task: ANSWERS.TASK_DEPENDENCY_UPGRADE,
  allDependencies: DEPENDENCIES,
  hasSingletons: false,
  hasPostUpgradeTasks: true,
  rolloutStrategy: ANSWERS.ROLLOUT_PER_PACKAGE,
};

export const DEP_UPGRADE_TEAM_ROLLOUT: MockUserInput = {
  task: ANSWERS.TASK_DEPENDENCY_UPGRADE,
  allDependencies: DEPENDENCIES,
  hasSingletons: false,
  hasPostUpgradeTasks: false,
  rolloutStrategy: ANSWERS.ROLLOUT_PER_TEAM,
};
