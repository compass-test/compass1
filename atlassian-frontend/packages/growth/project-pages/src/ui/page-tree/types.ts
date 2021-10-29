import { AnalyticsWebClient } from '@atlassiansox/confluence-table-tree';
import { ComponentType } from 'react';

import { BlueprintsState } from '../../state/confluence/connected-space/types';
import { ConfluenceTreeTemplatesList } from '../../state/ui/types';

export interface OwnProps {
  EmbeddedProductUpdater: ComponentType<any>;
  analyticsClient?: AnalyticsWebClient;
}

export interface StateProps {
  contentId: string | null;
  spaceKey: string | null;
  permissionState: BlueprintsState;
  projectPagesContent: ConfluenceTreeTemplatesList;
  projectSpacePageTitleHasBeenFetched: boolean;
}

export interface DispatchProps {
  onError: () => void;
}

export type Props = {
  readOnly: boolean;
} & Pick<StateProps, 'contentId' | 'spaceKey'> &
  DispatchProps &
  OwnProps;
