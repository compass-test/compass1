import { freeze } from 'icepick';
import { SET } from './actions';
import { ProjectState } from './types';
import { AnyAction } from 'redux';

export const initialProjectState: ProjectState = {
  key: '',
  id: -1,
  type: '',
  name: '',
};

export default (
  state: ProjectState = initialProjectState,
  action: AnyAction,
): ProjectState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    default:
      return state;
  }
};
