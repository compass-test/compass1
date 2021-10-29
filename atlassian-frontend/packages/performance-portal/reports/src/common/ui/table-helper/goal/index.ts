import { ToplineTrendGoal } from '../../../types';

export const getGoal = (goals?: ToplineTrendGoal[]) => {
  if (!goals || goals.length === 0) {
    return undefined;
  }
  return goals.reduce(
    (acc, goal) => {
      if (goal.value < acc.value) {
        return goal;
      }
      return acc;
    },
    { value: Number.POSITIVE_INFINITY, name: 'initial', id: '' },
  );
};
