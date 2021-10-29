import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ActionsObservable } from 'redux-observable';
import uniq from 'lodash/uniq';
import Diacritics from 'diacritic';
import { sendTrackAnalyticsEvent } from '../../common/analytics/analytics-web-client';
import {
  GENERATE_SPACE_KEY,
  noValidKey,
  noValidKeyFailure,
  updateSuggestedKey,
} from '../actions';

import { checkConfluenceSpaceAvailability$ } from './requests';

const generateKey = (name: string): string[] => {
  // Create a list of suggestions
  let keySuggestions: string[] = [];

  // Restrict length of the final key
  const minKeyLength = 1;
  const maxKeyLength = 10;

  // These words will not be used in key generation for acronyms.
  const IGNORED_WORDS = ['THE', 'A', 'AN', 'AS', 'AND', 'OF', 'OR'];

  const getTotalLength = (words: string[]) => words.join('').length;

  const removeIgnoredWords = (words: string[]) =>
    words.filter((word) => !IGNORED_WORDS.includes(word));

  const createAcronym = (words: string[]) =>
    words.map((word) => word.charAt(0)).join('');

  const getFirstSyllable = (word: string) => {
    // Best guess at getting the first syllable
    // Returns the substring up to and including the first consonant to appear after a vowel
    const vowelIndex = word.search(/[AEIOUYaeiouy]/);
    return vowelIndex ? word.substr(0, vowelIndex + 1) : word;
  };
  const trimmedName = Diacritics.clean(name.trim());
  if (!trimmedName) {
    return [];
  }

  // Split into words
  let nameAsArray = trimmedName
    .replace(/[^a-zA-Z0-9' ']/g, '')
    .toUpperCase()
    .split(' ');

  // Remove ignored words
  nameAsArray =
    nameAsArray > getTotalLength(nameAsArray)
      ? removeIgnoredWords(nameAsArray)
      : nameAsArray;

  if (nameAsArray.length === 0) {
    // No words were worthy!
    keySuggestions = [];
  } else {
    // Get the first syllable
    const word = nameAsArray[0];
    if (getFirstSyllable(word)) {
      keySuggestions.push(getFirstSyllable(word));
    }
    // The first word as a key
    keySuggestions.push(word);
    // The first letter from each
    keySuggestions.push(createAcronym(nameAsArray));
  }

  // Limit the length of the key suggestions
  const results = keySuggestions
    .map((keyOption) =>
      keyOption.length > maxKeyLength
        ? keyOption.substr(0, maxKeyLength).toUpperCase()
        : keyOption.toUpperCase(),
    )
    .filter((keyOption) => keyOption.length >= minKeyLength)
    .sort();
  return uniq(results);
};

const failureAnalytics = () => {
  sendTrackAnalyticsEvent({
    source: 'space.key',
    action: 'error',
    actionSubject: 'generate',
  });
};

const successAnalytics = () => {
  sendTrackAnalyticsEvent({
    source: 'space.key',
    action: 'success',
    actionSubject: 'generate',
  });
};

const noValidKeyAnalytics = () => {
  sendTrackAnalyticsEvent({
    source: 'space.key',
    action: 'no.valid',
    actionSubject: 'generate',
  });
};

export const GENERATE_KEY_DEBOUNCE = 1000;

export default (action$: ActionsObservable<any>) =>
  action$
    .ofType(GENERATE_SPACE_KEY)
    .debounceTime(GENERATE_KEY_DEBOUNCE)
    .mergeMap(({ name }) =>
      forkJoin(
        ...generateKey(name).map((key) =>
          checkConfluenceSpaceAvailability$(key).catch((err) => of(err)),
        ),
      )
        .map((payloads: any[]) => {
          const someSucceeded = payloads.some(
            (payload) => !(payload instanceof Error),
          );

          if (someSucceeded) {
            const availablePayload = payloads.find(
              (payload) => payload.available,
            );
            if (availablePayload) {
              successAnalytics();
              return updateSuggestedKey(availablePayload.key);
            }
            noValidKeyAnalytics();
            return noValidKey();
          }

          failureAnalytics();
          return noValidKeyFailure();
        })
        .catch(() => {
          failureAnalytics();
          return of(noValidKeyFailure());
        }),
    );
