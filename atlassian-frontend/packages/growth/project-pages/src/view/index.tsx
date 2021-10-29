import React, { useCallback, useEffect, useMemo } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import PageHeader from '@atlaskit/page-header';
import styled from 'styled-components';

import { CONFLUENCE_ACTIVE } from '../state/context/types';
import {
  CONFTREE_CONFLUENCE_ACTIVATING,
  CONFTREE_CONNECT_SPACE,
  CONFTREE_CROSS_SELL,
  CONFTREE_DISPLAY_PAGETREE,
  CONFTREE_ERROR,
  CONFTREE_NO_ACCESS_TEASER,
  CONFTREE_SPACE_OR_PAGE_NOT_FOUND,
} from '../state/ui/types';

import ViewTracker from '../common/analytics/view-tracker';
import SpaceConnectionTracker from '../common/analytics/space-connection-tracker/connected';
import TemplatePreview from '../ui/project-pages-improvement/template-preview/connected';
import ProjectPagesImprovementTitle from '../ui/project-pages-improvement/title';
import ProjectPagesImprovement from '../ui/project-pages-improvement';
import SpaceNotFound from '../ui/project-pages-improvement/error-states/space-not-found/connected';
import CrossJoinAnalyticsContext from './cross-join-analytics-context/connected';
import LearnMoreBanner from './learn-more';
import GranularPagesAnalyticsContext from './granular-pages-analytics-context/connected';
import ConfluenceTree from './confluence-tree/connected';
import PagesProductionisationConfluenceTree from '../ui/page-tree/connected';
import { EmbeddedConfluenceDialog } from '../ui/embedded-confluence-dialog';
import { EmbeddedPageProvider } from '../controllers/embedded-page';

import { Props } from './types';
import EmbeddedPagesAnalyticsContext from './embedded-pages-analytics-context';
import { ConfluencePageTreeProvider } from '@atlassiansox/confluence-table-tree';
import { getAnalyticsWebClient } from '../common/analytics/analytics-web-client';
import {
  EMBEDDED_PAGES_EXPERIMENT_FLAG_KEY,
  useFeatureFlags,
} from '../controllers/feature-flags';

const ViewContainer = styled.div`
  min-width: 684px;
  padding-bottom: 24px;
`;

const BreadcrumbsWrapper = styled.div`
  margin-left: -4px;
`;

const View = ({
  ConnectSpaceDialog,
  CreateSpaceDialog,
  GranularConnectSpaceDialog,
  GranularMoreMenu,
  ConnectSpace,
  ServerError,
  ConfluenceActivating,
  PagesHeading,
  Flags,
  MoreMenu,
  breadcrumbs,
  EmbeddedProductUpdater,
  triggerShowConnectSpaceDialog,
  triggerHideConnectSpaceDialog,
  triggerProductsLicenceCheck,
  triggerErrorFlag,
  projectPagesContent,
  confluenceState,
  isGranularPagesExperiment,
  isJswConfluenceSilentBundlingExperiment,
  isProjectPagesProductionisation,
  isEmbeddedPagesExperiment,
  learnMoreBannerVisibility,
  locale,
  project,
  cloudId,
  projectSpaceKey,
  isPostExpand,
  isThereATemplatesUIError,
  dismissLearnMoreBanner,
  accountId,
}: Props & InjectedIntlProps) => {
  useEffect(() => {
    triggerProductsLicenceCheck();
  }, [triggerProductsLicenceCheck]);

  const { fireFeatureExposed } = useFeatureFlags();
  useEffect(() => {
    if (projectPagesContent === CONFTREE_DISPLAY_PAGETREE) {
      fireFeatureExposed(EMBEDDED_PAGES_EXPERIMENT_FLAG_KEY);
    }
  }, [fireFeatureExposed, projectPagesContent]);

  const isErrorState = useMemo(() => {
    return [CONFTREE_ERROR, CONFTREE_NO_ACCESS_TEASER].includes(
      projectPagesContent,
    );
  }, [projectPagesContent]);

  const analyticsClient = useMemo(getAnalyticsWebClient, []);

  const handleReload = useCallback(() => window.location.reload(), []);

  const shouldShowMeatballMenu =
    !isErrorState && confluenceState === CONFLUENCE_ACTIVE;

  const isCrossSell = projectPagesContent === CONFTREE_CROSS_SELL;
  const isConnectSpace = projectPagesContent === CONFTREE_CONNECT_SPACE;

  const shouldShowLearnMoreBanner =
    isJswConfluenceSilentBundlingExperiment && learnMoreBannerVisibility;

  const shouldShowSpaceNotFound =
    isThereATemplatesUIError ||
    projectPagesContent === CONFTREE_SPACE_OR_PAGE_NOT_FOUND;

  const shouldShowPageTree =
    !isErrorState &&
    !shouldShowSpaceNotFound &&
    !isCrossSell &&
    !isConnectSpace &&
    projectPagesContent !== CONFTREE_CONFLUENCE_ACTIVATING &&
    projectPagesContent !== CONFTREE_ERROR;

  const viewContainer = (
    <ViewContainer id="project-pages-view-container">
      {shouldShowLearnMoreBanner && (
        <LearnMoreBanner
          cloudId={cloudId}
          projectName={project.name}
          projectSpaceKey={projectSpaceKey}
          onClose={dismissLearnMoreBanner}
          locale={locale}
        />
      )}
      <PageHeader
        breadcrumbs={<BreadcrumbsWrapper>{breadcrumbs}</BreadcrumbsWrapper>}
        actions={
          shouldShowMeatballMenu ? (
            isGranularPagesExperiment ? (
              <GranularMoreMenu />
            ) : (
              <MoreMenu />
            )
          ) : undefined
        }
      >
        <ProjectPagesImprovementTitle isPreExpand={isCrossSell} />
      </PageHeader>
      <PagesHeading key="PagesHeading" isPreExpand={isCrossSell} />
      {isCrossSell && <TemplatePreview />}
      {shouldShowPageTree &&
        (isProjectPagesProductionisation ? (
          <PagesProductionisationConfluenceTree
            EmbeddedProductUpdater={EmbeddedProductUpdater}
            analyticsClient={analyticsClient}
          />
        ) : (
          <ConfluenceTree
            EmbeddedProductUpdater={EmbeddedProductUpdater}
            analyticsClient={analyticsClient}
          />
        ))}
      {projectPagesContent === CONFTREE_CONFLUENCE_ACTIVATING && (
        <ConfluenceActivating />
      )}
      {isConnectSpace && (
        <ConnectSpace
          key="ConnectSpace"
          isGranularPagesExperiment={isGranularPagesExperiment}
        />
      )}
      {projectPagesContent === CONFTREE_ERROR && <ServerError />}
      {projectPagesContent === CONFTREE_NO_ACCESS_TEASER && (
        <ServerError type="access" />
      )}
      {projectPagesContent !== CONFTREE_NO_ACCESS_TEASER &&
        shouldShowSpaceNotFound && <SpaceNotFound />}

      {isGranularPagesExperiment ? (
        <GranularConnectSpaceDialog
          key="GranularConnectSpaceDialog"
          onCancel={triggerHideConnectSpaceDialog}
        />
      ) : (
        <ConnectSpaceDialog
          key="ConnectSpaceDialog"
          onCancel={triggerHideConnectSpaceDialog}
        />
      )}
      <CreateSpaceDialog
        key="CreateSpaceDialog"
        onCancel={triggerShowConnectSpaceDialog}
      />
      {isEmbeddedPagesExperiment && (
        <EmbeddedConfluenceDialog
          spaceKey={projectSpaceKey}
          parentProduct={'JSW'}
        />
      )}
      <ViewTracker />
      <SpaceConnectionTracker
        isGranularPagesExperiment={isGranularPagesExperiment}
      />
      <Flags onReload={handleReload} />
    </ViewContainer>
  );

  return (
    <CrossJoinAnalyticsContext>
      <GranularPagesAnalyticsContext>
        <EmbeddedPagesAnalyticsContext>
          {isEmbeddedPagesExperiment ? (
            <EmbeddedPageProvider>
              <ConfluencePageTreeProvider
                onError={triggerErrorFlag}
                analyticsClient={analyticsClient}
                accountId={accountId}
              >
                <ProjectPagesImprovement isPostExpand={isPostExpand}>
                  {viewContainer}
                </ProjectPagesImprovement>
              </ConfluencePageTreeProvider>
            </EmbeddedPageProvider>
          ) : (
            <ProjectPagesImprovement isPostExpand={isPostExpand}>
              {viewContainer}
            </ProjectPagesImprovement>
          )}
        </EmbeddedPagesAnalyticsContext>
      </GranularPagesAnalyticsContext>
    </CrossJoinAnalyticsContext>
  );
};

export default injectIntl<Props>(View);
