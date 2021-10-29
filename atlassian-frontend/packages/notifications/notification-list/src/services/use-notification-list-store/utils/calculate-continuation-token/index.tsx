import { LoadingState } from '../../../../common/types';
import { LoadingStates } from '../../types';

export default function calculateContinuationToken(
  loadingStates: LoadingStates,
  withoutContentContinuationToken: string | undefined,
  withContentContinuationToken: string | undefined,
) {
  if (loadingStates.withContent === LoadingState.COMPLETE) {
    return withContentContinuationToken;
  }
  if (loadingStates.withoutContent === LoadingState.COMPLETE) {
    return withoutContentContinuationToken;
  }
  return undefined;
}
