import { State } from '../../types';
import { SpacesData, SpacesState } from './types';

export const getSpaces = (state: State): SpacesState => state.confluence.spaces;
export const getAvailableSpaces = (state: State): SpacesData[] =>
  state.confluence.spaces.availableSpaces;
export const areSpacesLoaded = (state: State): boolean =>
  state.confluence.spaces.spacesLoaded;
