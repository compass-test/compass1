import { FlagsState } from './types';

// set

export const SET = 'flags.SET';
export type SetPayload = FlagsState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
