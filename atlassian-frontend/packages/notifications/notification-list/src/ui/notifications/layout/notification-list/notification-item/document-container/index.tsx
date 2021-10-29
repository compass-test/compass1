import React, { KeyboardEvent, MouseEvent, useContext, useState } from 'react';

import { ExperienceTrackerContext } from '@atlassian/experience-tracker';

import { LoadingState, Notification } from '../../../../../../common/types';
import {
  DocumentError,
  DocumentSkeleton,
} from '../../../../../../common/ui/document';
import ErrorBoundary from '../../../../../../common/ui/error-boundary';
import { SloFailureReason } from '../../../../../../common/utils/analytics/types';
import { generateNotificationContentRenderExperienceName } from '../../../../../../common/utils/experience-tracking';

import ExpandableDocument from './document';
import { ContentBox } from './styled';

export type Props = {
  loadingState: LoadingState;
  onToggleExpand: () => void;
  notificationContext: Notification;
  notificationPosition: number;
  isExpanded: boolean;
};

const KeypressCodes = new Set(['Enter', 'Space']);

const DocumentContainer = ({
  loadingState,
  onToggleExpand,
  notificationContext,
  notificationPosition,
  isExpanded,
}: Props) => {
  const [hasAdfError, setHasAdfError] = useState(false);

  const experienceTracker = useContext(ExperienceTrackerContext);

  const errorBoundaryExperienceCallback = () => {
    experienceTracker.stopOnError({
      name: generateNotificationContentRenderExperienceName(
        notificationContext,
      ),
      error: new Error(SloFailureReason.ADF_RENDER_FAILED),
    });
  };

  const handleDocumentEvents = (event: KeyboardEvent | MouseEvent) => {
    // If there is currently selected text on the page, ignore the event mouse clicks
    // otherwise users can't select text.
    const selectedText = window.getSelection()?.toString();
    if (event.type === 'click' && selectedText) {
      return;
    }

    if (hasAdfError || loadingState === LoadingState.LOADING) {
      return;
    }

    if (event.type === 'click') {
      onToggleExpand();
      return;
    }

    // Using the nativeEvent as SyntheticEvent does not have code property set
    // and event.key for space is literal of ' '.
    const { nativeEvent } = event as KeyboardEvent;

    if (event.type === 'keydown' && nativeEvent.repeat) {
      return;
    }

    if (event.type === 'keydown' && KeypressCodes.has(nativeEvent.code)) {
      // Stop the container scrolling
      event.preventDefault();
      onToggleExpand();
    }
  };

  const enableAdfErrorView = () => setHasAdfError(true);

  if (loadingState === LoadingState.LOADING) {
    return (
      <DocumentSkeleton
        showQuoteSkeleton={notificationContext.bodyItemCount === 2}
        testId="notification-document-skeleton"
      />
    );
  }

  if (loadingState === LoadingState.ERROR) {
    return <DocumentError />;
  }

  return (
    <ErrorBoundary
      subjectId="adf"
      fallbackUI={<DocumentError />}
      onErrorCallback={() => {
        enableAdfErrorView();
        errorBoundaryExperienceCallback();
      }}
      notificationContext={notificationContext}
      notificationPosition={notificationPosition}
      isCritical
    >
      <ContentBox
        role="button"
        aria-expanded={isExpanded}
        data-testid="notification-item-document-wrapper"
        tabIndex={0}
        onClick={handleDocumentEvents}
        onKeyDown={handleDocumentEvents}
        // Fix for ACT-1954 Focus ring should not persist when expanding notification content
        onMouseDown={(e) => e.preventDefault()}
      >
        <ExpandableDocument
          bodyItems={notificationContext.content.body?.items ?? []}
          isExpanded={isExpanded}
          notificationId={notificationContext.id}
        />
      </ContentBox>
    </ErrorBoundary>
  );
};

export default DocumentContainer;
