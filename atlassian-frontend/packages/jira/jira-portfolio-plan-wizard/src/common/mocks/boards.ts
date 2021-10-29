import { Board } from '../types';

export function buildBoard(payload?: Partial<Board>): Board {
  return Object.assign(
    {
      id: 0,
      name: 'LAZY board',
      isUsingStoryPoints: true,
      hasNextGenProjects: false,
    },
    payload,
  );
}

export const boards: Board[] = [
  buildBoard({
    id: 2,
    name: 'LAZY board',
  }),
  buildBoard({
    id: 3,
    name: 'SUPER_LAZY board',
  }),
  buildBoard({
    id: 5,
    name: 'SIMPLE board',
  }),
  buildBoard({
    id: 6,
    name: 'COMPLEX board',
  }),
  buildBoard({
    id: 7,
    name: 'LARGE board',
  }),
  buildBoard({
    id: 8,
    name: 'TEAM-MANAGED board',
    hasNextGenProjects: true,
    schedulingMode: 'AGILITY',
  }),
  buildBoard({
    id: 9,
    name: 'SCRUM board',
    schedulingMode: 'SCRUM',
  }),
  buildBoard({
    id: 10,
    name: 'KANBAN board',
    schedulingMode: 'KANBAN',
  }),
];
