import { UIState } from './types';

// set

export const SET = 'ui.SET';
export type SetPayload = UIState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
