import OriginTracing from '@atlassiansox/origin-tracing';
import { BlueprintData } from '../../../state/ui/blueprints/types';
import { ConfluenceTreeTemplatesList } from '../../../state/ui/types';
import { AccessRequestCapabilityType } from '../../../state/confluence/access-request-capabilities/types';
import { ProjectState } from '../../../state/project/types';

export interface DispatchProps {
  redirectToConfluenceTemplate: (
    templateId: string | null | undefined,
    skipHowToUse: boolean,
    pageTitle?: string,
  ) => void;
  showError: () => void;
}

export interface OwnProps {
  children: React.ReactNode;
}

export interface StateProps {
  blueprints: BlueprintData[];
  areTemplatesEnabled: boolean;
  projectPagesContent: ConfluenceTreeTemplatesList;
  origin: OriginTracing | null;
  accessRequestCapability?: AccessRequestCapabilityType;
  project: ProjectState;
  spaceKey: string | null;
  contentId: string | null;
  cloudId: string;
  accountId: string;
  isPostJoin: boolean;
}

export type Props = DispatchProps & StateProps & OwnProps;
