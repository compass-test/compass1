import { ConfluenceState } from './types';

// set

export const SET: string = 'confluence.SET';
export type SetPayload = ConfluenceState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
