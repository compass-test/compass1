import { ConfluenceUserState } from './types';

// set
export const SET: string = 'confluence.user.SET';
export type SetPayload = ConfluenceUserState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
