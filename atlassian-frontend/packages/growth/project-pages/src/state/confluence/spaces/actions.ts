import { SpacesState } from './types';

// set

export const SET = 'confluence.spaces.SET';
export type SetPayload = SpacesState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
