import { ExperimentLanguage } from '../abstract/language';
import { NotEnrolledCohort, markNotEnrolled } from '../helpers/markNotEnrolled';
import { ExperimentResolution } from './resolver';
import { ExperimentCore } from '../core/types';

type RequiredUpstream = ExperimentCore &
  ExperimentLanguage &
  Partial<NotEnrolledCohort>;

export const isEnglish = (language: string) =>
  language.toLowerCase().startsWith('en');

export const usePluginEnglishOnly = <Upstream extends RequiredUpstream>(
  ineligibilityReason: string = 'notEnglish',
) =>
  function useEnglishOnly(
    pipeline: Upstream,
  ): Upstream & Partial<ExperimentResolution> {
    return isEnglish(pipeline.language)
      ? pipeline
      : markNotEnrolled(ineligibilityReason, pipeline);
  };
