export const NO_ERROR = 'NO_ERROR';
export const KEY_ERROR = 'KEY_ERROR';
export const CREATE_ERROR = 'CREATE_ERROR';

export type CreateSpaceDialogError =
  | typeof NO_ERROR
  | typeof KEY_ERROR
  | typeof CREATE_ERROR;

export type CreateSpaceDialogState = {
  createSpaceDialogOpen: boolean;
  createSpaceDialogErrorState: CreateSpaceDialogError;
  creatingSpace: boolean;
  generatingKey: boolean;
  userEnteredSpaceNameInvalid: boolean;
  userEnteredSpaceName: string;
};
