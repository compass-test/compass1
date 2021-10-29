import 'rxjs/add/operator/mergeMap';
import { from } from 'rxjs/observable/from';

import { ActionsObservable } from 'redux-observable';
import {
  CHANGE_SPACE_NAME,
  generateSpaceKey,
  noValidKey,
  toggleSpaceNameInvalid,
  updateSpaceName,
  updateSuggestedKey,
} from '../actions';

const isWhitespace = (str: string) => /^\s+$/.test(str);
const containsAlphanumeric = (str: string) => /[a-zA-Z0-9]/g.test(str);

export default (action$: ActionsObservable<any>) =>
  action$
    .ofType(CHANGE_SPACE_NAME)
    .mergeMap(({ name }) =>
      from([
        updateSuggestedKey(null),
        updateSpaceName(name),
        toggleSpaceNameInvalid(isWhitespace(name)),
        ...(containsAlphanumeric(name)
          ? [generateSpaceKey(name)]
          : [noValidKey()]),
      ]),
    );
