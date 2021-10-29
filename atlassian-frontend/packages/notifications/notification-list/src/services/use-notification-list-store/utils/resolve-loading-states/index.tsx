import { LoadingState } from '../../../../common/types';
import { LoadingStates } from '../../types';

export default function resolveLoadingStates(
  loadingStates: LoadingStates,
  previousCombinedLoadingState: LoadingState,
): LoadingState {
  if (loadingStates.withContent === LoadingState.COMPLETE) {
    return LoadingState.COMPLETE;
  }
  if (
    loadingStates.withoutContent === LoadingState.LOADING ||
    loadingStates.withContent === LoadingState.LOADING
  ) {
    return LoadingState.LOADING;
  }
  if (
    loadingStates.withoutContent === LoadingState.ERROR &&
    loadingStates.withContent === LoadingState.ERROR
  ) {
    return LoadingState.ERROR;
  }
  if (previousCombinedLoadingState === LoadingState.INITIAL) {
    return LoadingState.INITIAL;
  }
  return LoadingState.COMPLETE;
}
