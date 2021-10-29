import { TreeStates } from '../../types';
import { PageTreeItemProperties } from '../page-tree-for-embedded-pages/types';

// NB. for embedded pages experiment, contentId, spaceKey, onError, onStateChanged are handled via context and the ones passed here will be ignored
export interface ConfluencePageTreeProps {
  contentId: string | null;
  cloudId: string | null;
  spaceKey: string | null;
  onError: (error: Error) => void;
  onStateChanged: (status: TreeStates) => void;
  onEdit?: PageActionHandler;
  onView?: PageActionHandler;
  onAddChildPage?: (parentContentId: string) => void;
  readOnly: boolean;
  locale?: string;
  isEmbeddedPagesExperiment: boolean;
}

export type PageActionHandler = (page: PageTreeItemProperties) => void;
