import { ExperimentCore } from '../core/types';
import { markCohort } from '../helpers/markCohort';
import { toResolution } from '../helpers/toResolution';

export interface ExperimentResolution {
  cohort: string | undefined;
  ineligibilityReasons: string[];
}

export type ResolverResultFull = {
  cohort?: string;
  ineligibilityReasons?: string[];
};

export type ResolverResultIneligible = {
  ineligible: string;
};

export type ResolverResult =
  | ResolverResultFull
  | string
  | ResolverResultIneligible
  | undefined;

interface ResolverFunc<Upstream> {
  (pipeline: Upstream): ResolverResult;
}

type RequiredUpstream = ExperimentCore & Partial<ExperimentResolution>;

export const usePluginResolver = <Upstream extends RequiredUpstream>(
  resolve: ResolverFunc<Upstream>,
) =>
  function useResolver(pipeline: Upstream): Upstream & ExperimentResolution {
    const result = resolve(pipeline);
    if (
      result == null &&
      pipeline &&
      pipeline.cohort &&
      pipeline.ineligibilityReasons
    ) {
      return pipeline as Upstream & ExperimentResolution;
    }
    return markCohort(toResolution(result), pipeline);
  };
