import { ExperimentCore } from '../core/types';
import { NotEnrolledCohort } from '../helpers/markNotEnrolled';

type RequiredUpstream = ExperimentCore;

export const usePluginNotEnrolledCohort = <Upstream extends RequiredUpstream>(
  notEnrolledCohort: string,
) =>
  function useNotEnrolledCohort(
    pipeline: Upstream,
  ): Upstream & NotEnrolledCohort {
    return {
      ...pipeline,
      notEnrolledCohort,
    };
  };
