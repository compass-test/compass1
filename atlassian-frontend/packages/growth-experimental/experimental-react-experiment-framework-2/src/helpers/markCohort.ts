import { ExperimentCore } from '../core/types';
import { ExperimentResolution, ResolverResult } from '../portable/resolver';
import { toResolution } from './toResolution';
import { mark } from './mark';

export const markCohort = <
  Upstream extends ExperimentCore & Partial<ExperimentResolution>
>(
  result: ResolverResult | null | undefined,
  pipeline: Upstream,
): Upstream & ExperimentResolution => {
  const resolution = toResolution(result);
  const cohort =
    pipeline.cohort === 'not-enrolled' ? 'not-enrolled' : resolution.cohort;
  const ineligibilityReasons = [
    ...(pipeline.ineligibilityReasons || []),
    ...(resolution.ineligibilityReasons || []),
  ];
  return mark(
    {
      cohort,
      ineligibilityReasons,
    },
    pipeline,
  );
};
