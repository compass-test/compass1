import {
  ExperiencePerformanceTypes,
  ExperienceTypes,
  UFOExperienceState,
} from '@atlassian/ufo-experimental';
import {
  ExperienceData,
  PageLoadExperienceData,
  PageVisibleState,
} from '@atlassian/ufo-experimental/types';

export const experienceDataMock = (
  extraData: Partial<ExperienceData> = {},
): ExperienceData => ({
  id: 'mocked-experience',
  type: ExperienceTypes.Experience,
  pageVisibleState: PageVisibleState.VISIBLE,
  uuid: null,
  category: null,
  featureFlags: [],
  children: [],
  isSSROutputAsFMP: false,
  performanceType: ExperiencePerformanceTypes.Custom,
  state: UFOExperienceState.SUCCEEDED,
  metadata: {},
  metrics: {
    startTime: 0,
    endTime: 100,
    marks: [],
  },
  result: {
    success: true,
    startTime: 0,
    duration: 100,
  },
  platform: null,
  ...extraData,
});

export const pageLoadExperienceDataMock = (
  extraData: Partial<PageLoadExperienceData> = {},
): PageLoadExperienceData => ({
  ...experienceDataMock(),
  initial: true,
  ...extraData,
});
