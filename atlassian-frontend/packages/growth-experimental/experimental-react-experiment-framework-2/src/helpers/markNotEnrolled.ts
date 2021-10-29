import { ExperimentResolution } from '../portable/resolver';
import { ExperimentCore } from '../core/types';

export type NotEnrolledCohort = {
  notEnrolledCohort: string;
};

export const isNotEnrolled = <
  Upstream extends ExperimentCore &
    Partial<NotEnrolledCohort> &
    ExperimentResolution
>(
  pipeline: Upstream,
) => {
  const notEnrolledName = pipeline.notEnrolledCohort || 'not-enrolled';
  return pipeline.cohort === notEnrolledName;
};

export const markNotEnrolled = <
  Upstream extends ExperimentCore & Partial<NotEnrolledCohort>
>(
  ineligibilityReason: string,
  pipeline: Upstream,
): Upstream & ExperimentResolution => {
  return {
    ...pipeline,
    cohort: pipeline.notEnrolledCohort || ('not-enrolled' as const),
    ineligibilityReasons: [
      ineligibilityReason || 'marked as not enrolled by experiment plugin',
    ],
  };
};
