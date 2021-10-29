import { ExperiencePerformanceTypes } from '@atlassian/ufo-experimental';
import {
  ExperienceData,
  PageLoadExperienceData,
} from '@atlassian/ufo-experimental/types';

export const isInitialPageLoad = (
  data: ExperienceData | PageLoadExperienceData,
) => {
  return (
    data.performanceType === ExperiencePerformanceTypes.PageLoad &&
    (data as PageLoadExperienceData).initial === true
  );
};
