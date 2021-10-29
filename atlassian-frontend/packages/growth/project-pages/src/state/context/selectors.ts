import OriginTracing from '@atlassiansox/origin-tracing';
import { State } from '../types';
import {
  CONFLUENCE_ACTIVE,
  ConfluenceInstanceState,
  ContextState,
} from './types';

export const getContext = (state: State): ContextState => state.context;
export const getBaseUrl = (state: State): string => state.context.baseUrl;
export const getLocale = (state: State): string => state.context.locale;
export const isAdmin = (state: State): boolean => state.context.isAdmin;
export const getCloudId = (state: State): string => state.context.cloudId;
export const getAccountId = (state: State): string => state.context.accountId;
export const getOrigin = (state: State): OriginTracing | null =>
  state?.context?.origin || null;
export const getConfluenceState = (state: State): ConfluenceInstanceState =>
  state.context.confluenceState;
export const getSuggestedKey = (state: State): string | null | undefined =>
  state.context.suggestedKey;

export const isConfluenceActive = (state: State): boolean =>
  getConfluenceState(state) === CONFLUENCE_ACTIVE;
