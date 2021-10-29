import React from 'react';
import { TreeStates } from '@atlassiansox/confluence-table-tree';
import EmptyState from '../../project-pages-improvement/empty-state/connected';
import EmbeddedPagesEmptyState from '../../empty-state/connected';
import PageTreeUnknownError from '../../project-pages-improvement/error-states/page-tree-unknown-error';
import { PageTreeSkeleton } from '../page-tree-skeleton';
import { useFeatureFlags } from '../../../controllers/feature-flags';

export const PageTreePlaceholder = ({
  treeState,
}: {
  treeState: TreeStates | null;
}) => {
  const { isEmbeddedPagesExperiment } = useFeatureFlags();
  switch (treeState) {
    case TreeStates.Empty:
      return isEmbeddedPagesExperiment ? (
        <EmbeddedPagesEmptyState />
      ) : (
        <EmptyState />
      );
    case TreeStates.Error:
      return <PageTreeUnknownError />;
    case TreeStates.Loading:
      return <PageTreeSkeleton />;
    default:
      return null;
  }
};
