import { State } from '../types';

export const isThereAnError = (state: State): boolean => state.flags.hasErrors;
export const successfullyConnectedSpace = (state: State): boolean =>
  state.flags.showSuccessFlag;
export const getConnectedSpaceName = (
  state: State,
): string | null | undefined => state.flags.connectedSpaceName;
export const getIsConnectedToPage = (
  state: State,
): boolean | null | undefined => state.flags.isConnectedToPage;
export const getCustomFlagTitle = (state: State): string | null | undefined =>
  state.flags.title;
export const getCustomFlagDescription = (
  state: State,
): string | null | undefined => state.flags.description;
