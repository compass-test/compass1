import { ConnectedSpaceState } from './types';

export const SET = 'confluence.connectedSpace.SET';
export type SetPayload = ConnectedSpaceState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
