import React, { Component } from 'react';
import styled from 'styled-components';
import {
  ConfluencePageTree,
  TreeStates,
  AnalyticsProvider,
} from '@atlassiansox/confluence-table-tree';
import { ContextualAnalyticsData, SCREEN } from '@atlassian/analytics-bridge';
import { OK } from '../../state/confluence/connected-space/types';

import mountTrackerFactory from '../../common/analytics/mount-tracker-factory';
import {
  CONFTREE_NO_ACCESS_TEASER,
  CONFTREE_ACCESS_LOADING,
} from '../../state/ui/types';
import { getAnalyticsWebClient } from '../../common/analytics/analytics-web-client';
import EmptyPageTree from '../../ui/project-pages-improvement/common/empty-page-tree';
import EmptyState from '../../ui/project-pages-improvement/empty-state/connected';
import PageTreeUnknownError from '../../ui/project-pages-improvement/error-states/page-tree-unknown-error';

import { Props } from './types';

type State = {
  pageTreeContainerWidth: string;
  treeState: TreeStates | null;
};

interface PageTreeContainerProps {
  pageTreeContainerWidth: string;
}

const PageTreeContainer = styled.div<PageTreeContainerProps>`
  ${({ pageTreeContainerWidth }) => `width: ${pageTreeContainerWidth}`};
`;

interface DisplayWrapperProps {
  isShown: boolean;
}

const DisplayWrapper = styled.div<DisplayWrapperProps>`
  display: ${(props) => (props.isShown ? 'initial' : 'none')};
`;

const MountTracker = mountTrackerFactory('confluencePageTree');

class ConfluenceTree extends Component<Props, State> {
  state: State = {
    pageTreeContainerWidth: '100%',
    treeState: null,
  };

  onStateChanged = (status: TreeStates) => {
    this.setState({
      treeState: status,
    });
  };

  render() {
    const {
      contentId,
      cloudId,
      spaceKey,
      onError,
      permissionState,
      projectPagesContent,
      EmbeddedProductUpdater,
      analyticsClient = getAnalyticsWebClient(),
      locale,
    } = this.props;

    const { pageTreeContainerWidth, treeState } = this.state;
    const showRealTree = treeState === TreeStates.RenderedChildren;

    let emptyTree = null;
    switch (treeState) {
      case TreeStates.Empty:
        emptyTree = <EmptyState />;
        break;
      case TreeStates.Error:
        emptyTree = <PageTreeUnknownError />;
        break;
      case TreeStates.Loading:
        emptyTree = <EmptyPageTree />;
        break;
    }

    return (
      <PageTreeContainer
        id="confluence-page-tree-container"
        pageTreeContainerWidth={pageTreeContainerWidth}
      >
        <AnalyticsProvider analyticsClient={analyticsClient}>
          <ContextualAnalyticsData
            sourceType={SCREEN}
            sourceName="projectPages"
          >
            {/* always render the real tree into the DOM, but sometimes hide it */}
            <DisplayWrapper isShown={showRealTree}>
              <ConfluencePageTree
                key={contentId || ''} // force this component to remount whenever contentId changes to reset its internal state, otherwise onStateChanged will not be fired
                contentId={
                  projectPagesContent === CONFTREE_NO_ACCESS_TEASER ||
                  projectPagesContent === CONFTREE_ACCESS_LOADING
                    ? null
                    : contentId
                }
                cloudId={cloudId}
                spaceKey={spaceKey}
                readOnly={permissionState !== OK}
                onError={onError}
                onStateChanged={this.onStateChanged}
                locale={locale || undefined}
              />
            </DisplayWrapper>
            {emptyTree}
          </ContextualAnalyticsData>
        </AnalyticsProvider>
        <MountTracker />
        {treeState === TreeStates.RenderedChildren &&
          EmbeddedProductUpdater && (
            <EmbeddedProductUpdater embeddedProduct="confluence" />
          )}
      </PageTreeContainer>
    );
  }
}

export default ConfluenceTree;
