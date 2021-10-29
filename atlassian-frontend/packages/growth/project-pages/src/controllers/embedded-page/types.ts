import { PageTreeItemProperties } from '@atlassiansox/confluence-table-tree';
import { BlueprintData } from '../../state/ui/blueprints/types';

export type EmbeddedDialogMode = 'view' | 'edit';

export interface EmbeddedPageState {
  mode: EmbeddedDialogMode;
  page: PageTreeItemProperties | null;
  isOpen: boolean;
  isLoading: boolean;
  pageCreate: {
    error: Error | null;
    parentContentId: string | undefined;
    isRoot: boolean;
    blueprint: BlueprintData | undefined;
  } | null;
}

export interface EmbeddedPage extends EmbeddedPageState {
  setEmbeddedPage: (state: Partial<EmbeddedPageState>) => void;
}
