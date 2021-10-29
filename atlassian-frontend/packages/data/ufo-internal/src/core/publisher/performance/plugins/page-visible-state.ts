import {
  ExperienceData,
  PageLoadExperienceData,
  PageVisibleState,
} from '@atlassian/ufo-experimental/types';

type PageVisibleStateReturnType = {
  'experience:pageVisible': PageVisibleState;
};

export const pageVisibleState = (
  data: ExperienceData | PageLoadExperienceData,
): PageVisibleStateReturnType => {
  return {
    'experience:pageVisible':
      data.pageVisibleState ??
      (document.hidden ? PageVisibleState.HIDDEN : PageVisibleState.VISIBLE),
  };
};
