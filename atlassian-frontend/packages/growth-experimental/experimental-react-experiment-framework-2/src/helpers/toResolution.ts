import {
  ExperimentResolution,
  ResolverResult,
  ResolverResultFull,
  ResolverResultIneligible,
} from '../portable/resolver';

export const toResolution = (
  result: ResolverResult | null | undefined,
): ExperimentResolution => {
  if (result == null) {
    return { cohort: undefined, ineligibilityReasons: [] };
  }
  if (typeof result === 'string') {
    return { cohort: result, ineligibilityReasons: [] };
  }
  if ((result as ResolverResultIneligible).ineligible) {
    return {
      cohort: 'not-enrolled',
      ineligibilityReasons: [(result as ResolverResultIneligible).ineligible],
    };
  }
  return {
    cohort: (result as ResolverResultFull).cohort,
    ineligibilityReasons:
      (result as ResolverResultFull).ineligibilityReasons || [],
  };
};
