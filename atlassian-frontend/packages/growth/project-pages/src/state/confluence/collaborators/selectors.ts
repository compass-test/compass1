import { State } from '../../types';
import { Collaborator } from './types';

export const getCollaborators = (state: State): Collaborator[] | undefined =>
  state.confluence.collaborators.loaded
    ? state.confluence.collaborators.users
    : undefined;
