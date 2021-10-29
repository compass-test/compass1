import { ExternalState } from './types';

// set

export const SET = 'external.SET';
export type SetPayload = ExternalState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
