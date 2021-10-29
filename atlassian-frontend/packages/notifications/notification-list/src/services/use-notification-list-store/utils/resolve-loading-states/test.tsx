import { LoadingState } from '../../../../common/types';

import resolveLoadingStates from './index';

describe('calculateFetchState', () => {
  it('should return INITIAL loading state when nothing is loading', () => {
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.INITIAL,
          withContent: LoadingState.INITIAL,
        },
        LoadingState.INITIAL,
      ),
    ).toEqual(LoadingState.INITIAL);
  });
  it('should return LOADING loading state when either client is loading', () => {
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.LOADING,
        },
        LoadingState.INITIAL,
      ),
    ).toEqual(LoadingState.LOADING);
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.LOADING,
          withContent: LoadingState.ERROR,
        },
        LoadingState.INITIAL,
      ),
    ).toEqual(LoadingState.LOADING);
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.ERROR,
          withContent: LoadingState.LOADING,
        },
        LoadingState.INITIAL,
      ),
    ).toEqual(LoadingState.LOADING);
  });
  it('should return COMPLETE loading state when content client is complete', () => {
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.LOADING,
          withContent: LoadingState.COMPLETE,
        },
        LoadingState.LOADING,
      ),
    ).toEqual(LoadingState.COMPLETE);
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.ERROR,
          withContent: LoadingState.COMPLETE,
        },
        LoadingState.LOADING,
      ),
    ).toEqual(LoadingState.COMPLETE);
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.COMPLETE,
        },
        LoadingState.LOADING,
      ),
    ).toEqual(LoadingState.COMPLETE);
  });
  it('should return COMPLETE loading state when content client is failed but withoutContent passes', () => {
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.ERROR,
        },
        LoadingState.LOADING,
      ),
    ).toEqual(LoadingState.COMPLETE);
  });
  it('should return ERROR loading state when both clients are errored', () => {
    expect(
      resolveLoadingStates(
        {
          withoutContent: LoadingState.ERROR,
          withContent: LoadingState.ERROR,
        },
        LoadingState.INITIAL,
      ),
    ).toEqual(LoadingState.ERROR);
  });
});
