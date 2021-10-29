import {
  ContextPayload,
  NonPrivacySafeContext,
  SearchResultContextPayload,
} from '../../common/analytics/events';
import React, { Reducer, useCallback, useReducer } from 'react';
import { getWordCount, sha1Hash } from '../../common/analytics/utils';

interface AdditionalAnalyticsContextState {
  queryVersion: number;
  isLoading: boolean;
}

export type AnalyticsContextAction =
  | { type: 'reset' }
  | {
      type: 'queryVersion';
      value: number;
    }
  | {
      type: 'isLoading';
      value: boolean;
    };

const defaultAnalyticsContextState: AdditionalAnalyticsContextState = {
  queryVersion: 0,
  isLoading: false,
};

export type SupportedContext = SearchResultContextPayload | ContextPayload;

const analyticsContextReducer: Reducer<
  AdditionalAnalyticsContextState,
  AnalyticsContextAction
> = (state, action) => {
  switch (action.type) {
    case 'queryVersion':
      return { ...state, queryVersion: action.value };
    case 'isLoading':
      return { ...state, isLoading: action.value };
    case 'reset':
      return defaultAnalyticsContextState;
    default:
      throw new Error();
  }
};

type AnalyticsHook = (
  query: string,
) => {
  isLoading: boolean;
  setAdditionalAnalyticsContext: React.Dispatch<AnalyticsContextAction>;
  addAnalyticContext: () => ContextPayload;
  nonPrivacySafeContext: () => NonPrivacySafeContext;
  queryVersion: number;
};

export const useAnalyticsContext: AnalyticsHook = (query: string) => {
  const [
    { queryVersion, isLoading },
    setAdditionalAnalyticsContext,
  ] = useReducer(analyticsContextReducer, defaultAnalyticsContextState);
  const addAnalyticContext = useCallback(() => {
    return {
      wordCount: getWordCount(query),
      queryLength: query.length,
      queryHash: sha1Hash(query),
      queryVersion: queryVersion,
    };
  }, [query, queryVersion]);
  const nonPrivacySafeContext = useCallback(() => {
    return { query };
  }, [query]);

  return {
    isLoading,
    setAdditionalAnalyticsContext,
    addAnalyticContext,
    nonPrivacySafeContext,
    queryVersion,
  };
};
