import { ExperimentCore, ExperimentLoading } from '../core/types';
import { mark } from './mark';

export const markLoading = <
  Upstream extends ExperimentCore & Partial<ExperimentLoading>
>(
  isLoading: boolean,
  pipeline: Upstream,
): Upstream & ExperimentLoading =>
  mark(
    {
      loading: !!(pipeline.loading || isLoading),
    },
    pipeline,
  );
