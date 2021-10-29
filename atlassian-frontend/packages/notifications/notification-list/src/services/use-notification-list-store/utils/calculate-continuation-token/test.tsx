import { LoadingState } from '../../../../common/types';

import calculateContinuationToken from './index';

describe('calculateContinuationToken', () => {
  it('should return an the noContent continuationToken if noContent is complete but Content loading', () => {
    expect(
      calculateContinuationToken(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.LOADING,
        },
        'noContentToken',
        undefined,
      ),
    ).toEqual('noContentToken');
  });
  it('should return an the content continuationToken if noContent is complete and content is complete', () => {
    expect(
      calculateContinuationToken(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.COMPLETE,
        },
        'noContentToken',
        'contentToken',
      ),
    ).toEqual('contentToken');
  });
  it('should return an undefined continuationToken if no loading states complete', () => {
    expect(
      calculateContinuationToken(
        {
          withoutContent: LoadingState.LOADING,
          withContent: LoadingState.LOADING,
        },
        'noContentToken',
        'contentToken',
      ),
    ).toEqual(undefined);
  });
  it('should return an undefined continuationToken if loading states error', () => {
    expect(
      calculateContinuationToken(
        {
          withoutContent: LoadingState.ERROR,
          withContent: LoadingState.ERROR,
        },
        undefined,
        undefined,
      ),
    ).toEqual(undefined);
  });
  it('should return an undefined continuationToken if no token available after complete', () => {
    expect(
      calculateContinuationToken(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.COMPLETE,
        },
        undefined,
        undefined,
      ),
    ).toEqual(undefined);
  });
});
