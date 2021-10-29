import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { ActionsObservable } from 'redux-observable';

import {
  NO_VALID_KEY,
  noValidKeyFailure,
  updateSuggestedKey,
} from '../actions';

import { checkConfluenceSpaceAvailability$ } from './requests';
import { sendTrackAnalyticsEvent } from '../../common/analytics/analytics-web-client';

// Fall back method to create space keys if none of the suggestions are available
export const randomlyGenerateSpaceKey = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5)
    .toUpperCase();

const failureAnalytics = ({ message }: { message: string }) => {
  sendTrackAnalyticsEvent({
    source: 'space.key',
    action: 'error',
    actionSubject: 'randomly.generate',
    attributes: { errorMessage: message },
  });
};

const successAnalytics = () => {
  sendTrackAnalyticsEvent({
    source: 'space.key',
    action: 'success',
    actionSubject: 'randomly.generate',
  });
};

const RETRY_ATTEMPTS = 3;

export default (action$: ActionsObservable<any>) =>
  action$.ofType(NO_VALID_KEY).mergeMap(() =>
    of(null)
      .mergeMap(() => {
        const generatedKey = randomlyGenerateSpaceKey();
        return checkConfluenceSpaceAvailability$(generatedKey).map(
          ({ available, key }) => {
            if (available) {
              successAnalytics();
              return updateSuggestedKey(key);
            }
            throw new Error('Random key not available');
          },
        );
      })
      .retry(RETRY_ATTEMPTS)
      .catch((error) => {
        failureAnalytics(error);
        return of(noValidKeyFailure());
      }),
  );
