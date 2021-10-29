import React, { useCallback, useEffect, useState } from 'react';

import {
  AnalyticsProvider,
  ConfluencePageTreeWithoutHeading,
  DraftsToggle,
  PageActionHandler,
  TreeStates,
  useConfluencePageTree,
} from '@atlassiansox/confluence-table-tree';
import { ContextualAnalyticsData, SCREEN } from '@atlassian/analytics-bridge';

import mountTrackerFactory from '../../common/analytics/mount-tracker-factory';
import { getAnalyticsWebClient } from '../../common/analytics/analytics-web-client';

import { useProjectPages } from '../../controllers/project-pages';

import { PageTreePlaceholder } from './placeholder';
import { DisplayWrapper } from './styles';
import { Props } from './types';
import { useFeatureFlags } from '../../controllers/feature-flags';
import { useEmbeddedPage } from '../../controllers/embedded-page';
import { useCreateEmbeddedPage } from '../../controllers/embedded-page/utils';

const MountTracker = mountTrackerFactory('confluencePageTree');

export const PageTree = ({
  contentId,
  spaceKey,
  onError,
  readOnly,
  EmbeddedProductUpdater,
  analyticsClient = getAnalyticsWebClient(),
}: Props) => {
  const { isEmbeddedPagesExperiment } = useFeatureFlags();
  const { treeState: providerTreeState, setContent } = useConfluencePageTree();
  const [legacyTreeState, setLegacyTreeState] = useState<TreeStates | null>(
    null,
  );
  const { setEmbeddedPage } = useEmbeddedPage();
  const treeState = isEmbeddedPagesExperiment
    ? providerTreeState
    : legacyTreeState;
  const showRealTree = treeState === TreeStates.RenderedChildren;
  const isTreeLoaded = treeState !== TreeStates.Loading && treeState !== null;
  const { cloudId, locale } = useProjectPages();
  const handleEdit = useCallback<PageActionHandler>(
    (page) => {
      if (!page.hasEmbeddedEdit) {
        window.open(page.editUrl, '_blank');
      } else {
        setEmbeddedPage({
          isOpen: true,
          isLoading: true,
          page,
          mode: 'edit',
        });
      }
    },
    [setEmbeddedPage],
  );
  const handleView = useCallback<PageActionHandler>(
    (page) => {
      setEmbeddedPage({
        isOpen: true,
        isLoading: true,
        page,
        mode: 'view',
      });
    },
    [setEmbeddedPage],
  );
  const createEmbeddedPage = useCreateEmbeddedPage(spaceKey);
  const handleAddChildPage = useCallback(
    async (parentContentId: string) => {
      await createEmbeddedPage(parentContentId, false);
    },
    [createEmbeddedPage],
  );
  useEffect(() => {
    if (isEmbeddedPagesExperiment && spaceKey) {
      setContent(spaceKey, contentId || undefined);
    }
  }, [contentId, isEmbeddedPagesExperiment, setContent, spaceKey]);

  const pageTree = (
    <>
      <ContextualAnalyticsData sourceType={SCREEN} sourceName="projectPages">
        {isEmbeddedPagesExperiment && isTreeLoaded && (
          <DraftsToggle locale={locale} />
        )}
        {/* always render the real tree into the DOM, but sometimes hide it */}
        <DisplayWrapper isShown={showRealTree}>
          <ConfluencePageTreeWithoutHeading
            key={`${spaceKey}${contentId}`} // force this component to remount whenever contentId changes to reset its internal state, otherwise onStateChanged will not be fired
            contentId={contentId}
            cloudId={cloudId}
            spaceKey={spaceKey}
            readOnly={readOnly}
            onError={onError}
            onEdit={isEmbeddedPagesExperiment ? handleEdit : undefined}
            onView={isEmbeddedPagesExperiment ? handleView : undefined}
            onAddChildPage={
              isEmbeddedPagesExperiment ? handleAddChildPage : undefined
            }
            onStateChanged={setLegacyTreeState}
            locale={locale}
            isEmbeddedPagesExperiment={isEmbeddedPagesExperiment}
          />
        </DisplayWrapper>
        <PageTreePlaceholder treeState={treeState} />
      </ContextualAnalyticsData>
      {showRealTree && <EmbeddedProductUpdater embeddedProduct="confluence" />}
      <MountTracker />
    </>
  );

  // in the embedded pages experiment, ConfluencePageTreeProvider includes the AnalyticsProvider already
  return isEmbeddedPagesExperiment ? (
    pageTree
  ) : (
    <AnalyticsProvider analyticsClient={analyticsClient}>
      {pageTree}
    </AnalyticsProvider>
  );
};
