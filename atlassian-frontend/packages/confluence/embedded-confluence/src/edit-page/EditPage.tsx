import React from 'react';

import { ExperienceTrackerContext } from '@atlassian/experience-tracker';

import {
  EMBEDDED_CONFLUENCE_MODE,
  PageCommonProps,
  useUrl,
} from '../page-common';
import { Iframe } from '../iframe';
import { withAnalyticsListener } from '../analytics';
import {
  useExperienceTracker,
  useSetUpExperience,
  ExperienceNames,
} from '../experience-tracker';

export type EditPageProps = PageCommonProps & {
  contentId: string;
  parentProduct: string;
  draftShareId?: string;
  /** @deprecated Subscribe to `ExperienceTracker` and handle the event `taskSuccess` of the experience `edit-page/close` instead. */
  onClose?: ({ isUnpublishedDraft }: { isUnpublishedDraft: boolean }) => void;
  /** @deprecated Subscribe to `ExperienceTracker` and handle the event `taskSuccess` of the experience `edit-page/publish` instead. */
  onPublishSuccess?: ({ createdDate }: { createdDate: string }) => void;
};

export const EditPageImpl: React.FC<EditPageProps> = (props) => {
  const { spaceKey, contentId, ...passThroughProps } = props;

  const experienceTracker = useExperienceTracker();

  useSetUpExperience({
    experienceTracker,
    contentId,
    spaceKey,
    experience: ExperienceNames.EDIT_PAGE,
    ccExperience: ExperienceNames.CC_EDIT_PAGE_EMBED,
  });

  const { embeddedConfluenceUrl } = useUrl({
    ...props,
    mode: EMBEDDED_CONFLUENCE_MODE.EDIT_MODE,
  });

  return (
    <ExperienceTrackerContext.Provider value={experienceTracker}>
      {embeddedConfluenceUrl && (
        <Iframe src={embeddedConfluenceUrl} {...passThroughProps} />
      )}
    </ExperienceTrackerContext.Provider>
  );
};

export const EditPage = withAnalyticsListener(EditPageImpl);
