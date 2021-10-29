import { NotEnrolledCohort, markNotEnrolled } from './markNotEnrolled';

export type UnmetEnrollmentRequirements = {
  unmetEnrollmentRequirements: boolean;
};

import { ExperimentCore } from '../core/types';

export const isUnmetEnrollmentRequirements = <
  Upstream extends ExperimentCore & Partial<UnmetEnrollmentRequirements>
>(
  pipeline: Upstream,
) => pipeline.unmetEnrollmentRequirements;

export const defaultIneligibilityReason = 'unmetExperimentRequirements';

export const markUnmetEnrollmentRequirements = <
  Upstream extends ExperimentCore & Partial<NotEnrolledCohort>
>(
  ineligibilityReason: string,
  pipeline: Upstream,
): Upstream & UnmetEnrollmentRequirements => {
  return {
    ...markNotEnrolled(
      ineligibilityReason || defaultIneligibilityReason,
      pipeline,
    ),
    unmetEnrollmentRequirements: true,
  };
};
