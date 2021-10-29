import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import {
  FETCH_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES,
  updateConfluenceAccessRequestCapabilities,
} from '../actions';
import { getCloudId } from '../context/selectors';
import { State } from '../types';
import { Action } from 'redux';
import { getConfluenceAccessRequestCapabilities$ } from './requests';
import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import { AccessRequestCapabilityType } from '../confluence/access-request-capabilities/types';

const confluenceAccessRequestCapabilitiesEpic: Epic<Action, State> = (
  action$,
  store,
) =>
  action$.ofType(FETCH_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES).switchMap(() => {
    const state = store.getState();
    const cloudId = getCloudId(state);
    return getConfluenceAccessRequestCapabilities$(cloudId)
      .mergeMap((response) => {
        fetchSuccess('confluence.access-request-capabilities');
        const results = Object.values(response.results);
        // check we got exactly 1 result and the result is known, otherwise error
        if (
          results.length !== 1 ||
          !Object.values(AccessRequestCapabilityType).includes(results[0])
        ) {
          return of(
            updateConfluenceAccessRequestCapabilities(
              AccessRequestCapabilityType.ERROR,
            ),
          );
        }
        return of(updateConfluenceAccessRequestCapabilities(results[0]));
      })
      .catch((err) => {
        fetchFailed('confluence.access-request-capabilities', err);
        return of(
          updateConfluenceAccessRequestCapabilities(
            AccessRequestCapabilityType.ERROR,
          ),
        );
      });
  });

export default confluenceAccessRequestCapabilitiesEpic;
