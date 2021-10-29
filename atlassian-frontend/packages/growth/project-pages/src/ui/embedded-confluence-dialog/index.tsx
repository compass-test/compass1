import React, { useMemo, useEffect, useCallback, useState } from 'react';
import {
  ExperienceTracker,
  ExperienceTrackerContext,
  ExperienceEvent,
} from '@atlassian/experience-tracker';
import { NavigationPolicy } from '@atlassian/embedded-confluence/navigationPolicy';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { useEmbeddedPagesFlags } from './notifications-flags';
import { ViewPageDialog } from './view-page';
import { EditPageDialog } from './edit-page';
import { CloseModalOpts, Props } from './types';
import EmbeddedPageModal from './modal';
import { useEmbeddedPage } from '../../controllers/embedded-page';
import {
  useConfluencePageTree,
  pageAnalyticsAttributes,
} from '@atlassiansox/confluence-table-tree';
import { LoadingContainer } from './loading-container';
import CreatePageError from './create-page-error';
import { ContextualAnalyticsData, MODAL } from '@atlassian/analytics-bridge';
import ViewTracker from '../../common/analytics/view-tracker';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import {
  OPERATIONAL_EVENT_TYPE,
  PROJECT_PAGES_CHANNEL,
  TRACK_EVENT_TYPE,
} from '../../common/analytics/util';

// a list of experience tracker events that we're interested in to monitor
const MONITORED_EXPERIENCE_TRACKER_EVENT_NAMES = [
  'edit-page/load',
  'edit-page/publish',
  'view-content',
  'view-page/edit',
];

const EmbeddedConfluenceDialogView = ({ spaceKey, parentProduct }: Props) => {
  const {
    showPagePublishedFlag,
    showPageDeletedFlag,
    showDraftSavedFlag,
    showErrorFlag,
  } = useEmbeddedPagesFlags();
  const experienceTracker = useMemo(() => new ExperienceTracker(), []);
  const {
    mode,
    page,
    isOpen,
    isLoading,
    pageCreate,
    setEmbeddedPage,
  } = useEmbeddedPage();
  const { updatePage, removePage } = useConfluencePageTree();
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const sendTrackEvent = useCallback(
    (
      actionSubject: string,
      action: string,
      attributes?: Record<string, any>,
    ) => {
      createAnalyticsEvent({
        analyticsType: TRACK_EVENT_TYPE,
        action,
        actionSubject,
        embeddedPageAction: true,
        ...attributes,
      }).fire(PROJECT_PAGES_CHANNEL);
    },
    [createAnalyticsEvent],
  );
  // fires an operational event for an experience tracker event
  const sendExperienceTrackerEvent = useCallback(
    ({ action, name, attributes, id, startTime }: ExperienceEvent) => {
      createAnalyticsEvent({
        analyticsType: OPERATIONAL_EVENT_TYPE,
        actionSubject: 'embeddedPage',
        action,
        task: name,
        taskId: id,
        startTime,
        ...attributes,
      }).fire(PROJECT_PAGES_CHANNEL);
    },
    [createAnalyticsEvent],
  );
  // When showing a modal inside the embedded component, we stitch some shaded blankets around it make it look seamless
  const [isInnerModalOpen, setIsInnerModalOpen] = useState<boolean>(false);
  const navigationPolicy = useMemo<NavigationPolicy>(
    () => ({
      navigate(url, modifiers, defaultNavigate) {
        // When in edit mode, ignore defaultNavigate and delegate user actions to the experienceTracker
        if (mode === 'edit') {
          return;
        }
        // Note1: When in view mode, and when the edit button is clicked, and if the page supports
        // embedded editing, toggle the edit mode. defaultNavigate() is called for other cases (eg. synchrony pages)
        // Note2: deleting a comment triggers a navigation event with its target set to '_self'
        // other navigation events, like editing or deleting a page, have their target set to '_blank'
        if (
          mode === 'view' &&
          page &&
          page.hasEmbeddedEdit &&
          (modifiers.routeName === 'EDIT_PAGE_EMBED' ||
            url.includes('/edit-embed/')) // FIXME modifiers.routeName does not appear to be populated properly yet, remove this when it is
        ) {
          setEmbeddedPage({
            mode: 'edit',
            isLoading: true,
          });
          sendTrackEvent('embeddedPage', 'edit');
          return;
        }
        return defaultNavigate(url, modifiers);
      },
    }),
    [mode, page, sendTrackEvent, setEmbeddedPage],
  );

  const PageDialog = useMemo(() => {
    return mode === 'edit' ? EditPageDialog : ViewPageDialog;
  }, [mode]);

  const handleOnPublish = useCallback(async () => {
    if (page) {
      setEmbeddedPage({
        mode: 'view',
        isLoading: true,
        page: {
          ...page,
          isDraft: false,
        },
      });
      const publishedPage = await updatePage(page.id, 'current');
      // update the view URL now that the page is published
      if (publishedPage) {
        setEmbeddedPage({
          page: publishedPage,
        });
      }
    }
    showPagePublishedFlag();
    sendTrackEvent('embeddedPage', 'updated');
  }, [
    page,
    sendTrackEvent,
    setEmbeddedPage,
    showPagePublishedFlag,
    updatePage,
  ]);

  const handleOnClose = useCallback(async () => {
    if (page && page.isDraft) {
      const { id } = page;
      try {
        await updatePage(id, 'draft');
        showDraftSavedFlag();
      } catch (e) {
        showErrorFlag();
      }
    }
    setEmbeddedPage({
      page: null,
      isOpen: false,
      isLoading: false,
      pageCreate: null,
    });
    sendTrackEvent('embeddedPageDialog', 'closed');
  }, [
    page,
    setEmbeddedPage,
    sendTrackEvent,
    updatePage,
    showDraftSavedFlag,
    showErrorFlag,
  ]);

  const handleOpenInnerModal = useCallback(() => {
    setIsInnerModalOpen(true);
  }, []);

  const handleCloseInnerModal = useCallback(
    ({ closeOuterModal, updatePageTree }: CloseModalOpts) => {
      setIsInnerModalOpen(false);
      if (closeOuterModal) {
        handleOnClose();
        showPageDeletedFlag();
      }
      if (updatePageTree && page) {
        removePage(page.id);
      }
    },
    [handleOnClose, page, removePage, showPageDeletedFlag],
  );

  useEffect(
    () =>
      experienceTracker.subscribe((event) => {
        const { name, action } = event;
        if (MONITORED_EXPERIENCE_TRACKER_EVENT_NAMES.includes(name)) {
          sendExperienceTrackerEvent(event);
        }
        if (
          (name === 'view-page' || name === 'edit-page/load') &&
          action !== 'taskStart' // abort/fail/success
        ) {
          // turn off the Loading screen only when there is something to show in the iframe
          setEmbeddedPage({
            isLoading: false,
          });
        }
        if (name === 'edit-page/close' && action === 'taskSuccess') {
          if (page && page.isDraft) {
            handleOnClose();
          } else {
            // just switch back to view mode
            setEmbeddedPage({
              mode: 'view',
              isLoading: true,
            });
          }
          // fires for both drafts and published close clicks
          sendTrackEvent('embeddedPage', 'closed');
        }
        if (name === 'edit-page/publish' && action === 'taskSuccess') {
          handleOnPublish();
        }
        if (name === 'delete-page') {
          if (action === 'taskStart') {
            handleOpenInnerModal();
          } else {
            const success = action === 'taskSuccess';
            handleCloseInnerModal({
              closeOuterModal: success,
              updatePageTree: success,
            });
            if (success) {
              sendTrackEvent('embeddedPage', 'deleted', {
                actionType: 'delete',
              });
            }
          }
        }
        if (name === 'archiving/archive-pages') {
          if (action === 'taskStart') {
            handleOpenInnerModal();
          } else {
            const success = action === 'taskSuccess';
            handleCloseInnerModal({
              closeOuterModal: false, // unlike delete, archiving a page should not close the modal
              updatePageTree: success,
            });
            if (success) {
              sendTrackEvent('embeddedPage', 'deleted', {
                actionType: 'archive',
              });
            }
          }
        }
        if (name === 'archiving/restore-pages') {
          if (action === 'taskStart') {
            handleOpenInnerModal();
          } else {
            handleCloseInnerModal({
              closeOuterModal: false,
              // FIXME the problem is you can restore the page to a different parent...
              // also there seems to be a delay/race condition around this even if restored to same parent
              updatePageTree: action === 'taskSuccess',
            });
          }
        }
        if (name === 'add-page-comment' && action === 'taskSuccess') {
          sendTrackEvent('embeddedPageComment', 'created');
        }
        if (name === 'delete-page-comment' && action === 'taskSuccess') {
          sendTrackEvent('embeddedPageComment', 'deleted');
        }
      }),
    [
      experienceTracker,
      handleOnClose,
      handleOnPublish,
      handleOpenInnerModal,
      handleCloseInnerModal,
      page,
      setEmbeddedPage,
      showDraftSavedFlag,
      pageCreate,
      sendTrackEvent,
      sendExperienceTrackerEvent,
    ],
  );

  const content = useMemo<React.ReactNode | null>(() => {
    if (!isOpen) {
      return null;
    }
    if (pageCreate && pageCreate.error) {
      return (
        <CreatePageError spaceKey={spaceKey} onCloseModal={handleOnClose} />
      );
    }
    if (page && spaceKey) {
      return (
        <LoadingContainer isLoading={isLoading}>
          <PageDialog
            parentProduct={parentProduct}
            spaceKey={spaceKey}
            contentId={page.id}
            navigationPolicy={navigationPolicy}
          />
        </LoadingContainer>
      );
    }
    if (isLoading) {
      return <LoadingContainer isLoading={true} />;
    }
    return null;
  }, [
    PageDialog,
    handleOnClose,
    isLoading,
    isOpen,
    navigationPolicy,
    page,
    pageCreate,
    parentProduct,
    spaceKey,
  ]);

  return (
    <ExperienceTrackerContext.Provider value={experienceTracker}>
      <ModalTransition>
        {isOpen && (
          <EmbeddedPageModal
            mode={mode}
            headerBtnHref={page?.url}
            onClose={handleOnClose}
            isInnerModalOpen={isInnerModalOpen}
          >
            {content}
            <ViewTracker />
          </EmbeddedPageModal>
        )}
      </ModalTransition>
    </ExperienceTrackerContext.Provider>
  );
};

export const EmbeddedConfluenceDialog = (props: Props) => {
  const { page, mode, pageCreate } = useEmbeddedPage();
  return (
    <ContextualAnalyticsData
      sourceName="embeddedPage"
      sourceType={MODAL}
      attributes={{
        ...(page && pageAnalyticsAttributes(page)),
        embeddedPageMode: mode,
        ...(pageCreate
          ? {
              embeddedPageMode: 'create',
              createRootPage: pageCreate.isRoot,
            }
          : {}),
      }}
    >
      <EmbeddedConfluenceDialogView {...props} />
    </ContextualAnalyticsData>
  );
};
