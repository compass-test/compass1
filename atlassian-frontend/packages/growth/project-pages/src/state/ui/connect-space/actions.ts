import { ConnectSpaceDialogState } from './types';

// set

export const SET = 'ui.connectSpaceDialog.SET';
export type SetPayload = ConnectSpaceDialogState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
