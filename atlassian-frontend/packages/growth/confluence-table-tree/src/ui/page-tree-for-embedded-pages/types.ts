import { PageActionHandler } from '../confluence-page-tree/types';

export interface PageTreeBaseForEmbeddedPagesProps {
  cloudId?: string | null;
  readOnly?: boolean;
  onEdit?: PageActionHandler;
  onView?: PageActionHandler;
  onAddChildPage?: (parentContentId: string) => void;
}

export interface PageTreeItemProperties {
  id: string;
  url: string;
  editUrl: string;
  hasEmbeddedEdit: boolean;
  isDraft: boolean;
}
