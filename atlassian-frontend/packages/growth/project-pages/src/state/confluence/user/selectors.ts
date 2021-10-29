import { State } from '../../types';
import { FORBIDDEN, LOADING, UNKNOWN } from './types';

export const doesUserHaveConfluenceAccess = (
  state: State,
): boolean | undefined =>
  state.confluence.user.access !== LOADING &&
  state.confluence.user.access !== UNKNOWN
    ? state.confluence.user.access !== FORBIDDEN
    : undefined;
