import { ProjectState } from './types';

// set

export const SET = 'project.SET';
export type SetPayload = ProjectState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
