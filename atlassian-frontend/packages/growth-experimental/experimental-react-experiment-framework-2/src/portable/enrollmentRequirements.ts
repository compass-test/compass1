import { NotEnrolledCohort, isNotEnrolled } from '../helpers/markNotEnrolled';
import { ExperimentResolution } from './resolver';
import { ExperimentCore } from '../core/types';
import {
  UnmetEnrollmentRequirements,
  markUnmetEnrollmentRequirements,
  defaultIneligibilityReason,
} from '../helpers/markEnrollmentRequirements';

type UnenrollmentPlugin<Upstream> =
  | ((pipeline: Upstream) => ExperimentResolution)
  | ((pipeline?: Upstream) => boolean);

/**
 * This plugin takes plugin as a parameter or a function that returns boolean
 * For boolean function, if the result is false,
 * it will mark the pipeline to has unmet enrollment requirements,
 * Same behaviour applies for plugin, if the returned cohort is same as `notEnrolledCohortName`,
 *
 * which means that user will be unenrolled and there will be no fire exposed event fired
 * This is the same way as marking the user to not even be included in any cohort,
 * and ignored from the experiment
 */
export const usePluginUnmetRequirements = <
  Upstream extends ExperimentCore & Partial<NotEnrolledCohort>
>(
  plugin: UnenrollmentPlugin<Upstream>,
  ineligibilityReason?: string,
) =>
  function useUnmetRequirements(
    pipeline: Upstream,
  ): Upstream & Partial<UnmetEnrollmentRequirements> {
    const reason = ineligibilityReason || defaultIneligibilityReason;

    const result = plugin(pipeline);
    if (typeof result === 'boolean') {
      return result
        ? pipeline
        : markUnmetEnrollmentRequirements(reason, pipeline);
    }

    return isNotEnrolled({ ...pipeline, ...result })
      ? markUnmetEnrollmentRequirements(reason, pipeline)
      : pipeline;
  };
