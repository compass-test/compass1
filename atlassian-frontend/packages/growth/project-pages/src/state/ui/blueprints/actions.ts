import { BlueprintsState } from './types';

// set

export const SET = 'ui.blueprints.SET';
export type SetPayload = BlueprintsState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
