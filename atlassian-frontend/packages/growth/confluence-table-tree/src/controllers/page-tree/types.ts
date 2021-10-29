import {
  Errors,
  TreeStates,
  PageTreeItem,
  AnalyticsWebClient,
  PageTreeItemProperties,
} from '../../types';

export interface PageTreeInternals {
  spaceKey: string | null;
  rootContentId: string | null;
  items: PageTreeItem[] | null;
  errorType: Errors | null;
  accountId: string;
  expandSubtree: (contentId: string) => Promise<void>;
  collapseSubtree: (contentId: string) => void;
}

export interface PageTree {
  treeState: TreeStates;
  setContent: (spaceKey: string, contentId?: string) => void;
  insertPage: (
    contentId: string,
    parentContentId?: string,
  ) => Promise<PageTreeItemProperties | undefined>;
  updatePage: (
    contentId: string,
    status: 'draft' | 'current',
  ) => Promise<PageTreeItemProperties | undefined>;
  removePage: (contentId: string) => Promise<void>;
}

export interface PageTreeContextType extends PageTreeInternals, PageTree {}

export interface ConfluencePageTreeProviderProps {
  analyticsClient: AnalyticsWebClient;
  accountId: string;
  onError?: (error: Error) => void;
  children: React.ReactNode;
}
