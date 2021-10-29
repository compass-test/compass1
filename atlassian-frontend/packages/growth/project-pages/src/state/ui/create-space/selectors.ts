import { State } from '../../types';
import { CreateSpaceDialogError } from './types';

export const isCreateSpaceDialogOpen = (state: State) =>
  state.ui.createSpaceDialog.createSpaceDialogOpen;

export const getCreateSpaceDialogErrorState = (
  state: State,
): CreateSpaceDialogError =>
  state.ui.createSpaceDialog.createSpaceDialogErrorState;

export const isCreatingSpace = (state: State): boolean =>
  state.ui.createSpaceDialog.creatingSpace;

export const isGeneratingKey = (state: State): boolean =>
  state.ui.createSpaceDialog.generatingKey;

export const isUserEnteredSpaceNameInvalid = (state: State): boolean =>
  state.ui.createSpaceDialog.userEnteredSpaceNameInvalid;

export const getUserEnteredSpaceName = (state: State): string =>
  state.ui.createSpaceDialog.userEnteredSpaceName;
