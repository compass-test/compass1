import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { Errors, TreeStates, PageTreeItem } from '../../types';

export interface PageTreeBaseWithoutHeadingProps {
  contentId?: string | null;
  cloudId?: string | null;
  spaceKey?: string | null;
  readOnly?: boolean;
  onError?: (error: Error) => void;
  onStateChanged?: (status: TreeStates) => void;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
}

export interface PageTreeBaseWithoutHeadingState {
  items: PageTreeItem[] | null;
  errorType: Errors | null;
  stickyRowContentId: string | null;
}
