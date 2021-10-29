import { State } from '../../types';
import { ConnectSpaceDialogError } from './types';

export const getConnectSpaceDialogErrorState = (
  state: State,
): ConnectSpaceDialogError =>
  state.ui.connectSpaceDialog.connectSpaceDialogErrorState;

export const getSelectedSpace = (state: State) =>
  state.ui.connectSpaceDialog.selectedSpace;

export const isConnectingSpace = (state: State): boolean =>
  state.ui.connectSpaceDialog.connectingSpace;

export const isConnectSpaceDialogOpen = (state: State) =>
  state.ui.connectSpaceDialog.connectSpaceDialogOpen;

export const isSubmitAllowed = (state: State): boolean =>
  state.ui.connectSpaceDialog.selectedSpace !== null;

export const isDisconnectedTemplatesClick = (state: State): boolean =>
  state.ui.connectSpaceDialog.disconnectedTemplatesClick;
