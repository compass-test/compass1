import { State } from '../types';
import { ConfluenceState } from './types';

export const getConfluence = (state: State): ConfluenceState =>
  state.confluence;
