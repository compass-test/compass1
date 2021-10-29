import { ContextState } from './types';

// set

export const SET = 'context.SET';
export type SetPayload = ContextState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
