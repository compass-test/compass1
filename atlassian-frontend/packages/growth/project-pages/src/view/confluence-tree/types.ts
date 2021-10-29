import { AnalyticsWebClient } from '@atlassiansox/confluence-table-tree';
import { ComponentType } from 'react';
import { BlueprintsState } from '../../state/confluence/connected-space/types';
import { ConfluenceTreeTemplatesList } from '../../state/ui/types';

export interface OwnProps {
  EmbeddedProductUpdater: ComponentType<any>;
  analyticsClient?: AnalyticsWebClient;
}

export interface StateProps {
  cloudId: string | null;
  contentId: string | null;
  spaceKey: string | null;
  onError: (error: Error) => void;
  permissionState: BlueprintsState;
  projectPagesContent: ConfluenceTreeTemplatesList;
  locale: string | null;
}

export type Props = OwnProps & StateProps;
