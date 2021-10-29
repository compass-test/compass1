import { CreateSpaceDialogState } from './types';

// set

export const SET = 'ui.createSpaceDialog.SET';
export type SetPayload = CreateSpaceDialogState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
