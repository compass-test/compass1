import { ComponentType } from 'react';
import OriginTracing from '@atlassiansox/origin-tracing';

import { ConfluenceTreeTemplatesList } from '../state/ui/types';
import { ConfluenceInstanceState } from '../state/context/types';
import { OwnProps as ServerErrorProps } from './empty-state/server-error/types';
import { OwnProps as ConnectSpaceDialogProps } from './connect-space-dialog/types';
import { OwnProps as CreateSpaceDialogProps } from './create-space-dialog/types';
import { OwnProps as GranularMoreMenuProps } from '../ui/granular-pages/more-menu/types';
import { OwnProps as ConnectSpaceProps } from './empty-state/connect-space/types';
import { OwnProps as ConfluenceActivatingProps } from './empty-state/confluence-activating';
import { OwnProps as PagesHeadingProps } from './pages-heading/types';
import { OwnProps as FlagProps } from './flags/types';
import { OwnProps as MoreMenuProps } from './more-menu/types';
import { ProjectState } from '../state/project/types';

export interface WithGranularPagesExperimentProps {
  isGranularPagesExperiment: boolean;
}

export interface WithProjectPagesProductionisationProps {
  isProjectPagesProductionisation: boolean;
}

export interface WithEmbeddedPagesExperimentProps {
  isEmbeddedPagesExperiment: boolean;
}

export interface WithJSWConfluenceSilentBundlingExperimentProps {
  isJswConfluenceSilentBundlingExperiment: boolean;
  learnMoreBannerVisibility: boolean;
  dismissLearnMoreBanner: () => void;
}

export interface WithFireExposureEventProps {
  onFireExposureEvent: (flagKey: string) => void;
}

export interface StateProps {
  ConnectSpaceDialog: ComponentType<ConnectSpaceDialogProps>;
  CreateSpaceDialog: ComponentType<CreateSpaceDialogProps>;
  GranularConnectSpaceDialog: ComponentType<ConnectSpaceDialogProps>;
  GranularMoreMenu: ComponentType<GranularMoreMenuProps>;

  ConnectSpace: ComponentType<ConnectSpaceProps>;
  ServerError: ComponentType<ServerErrorProps>;
  ConfluenceActivating: ComponentType<ConfluenceActivatingProps>;
  PagesHeading: ComponentType<PagesHeadingProps>;
  Flags: ComponentType<FlagProps>;
  MoreMenu: ComponentType<MoreMenuProps>;
  projectPagesContent: ConfluenceTreeTemplatesList;
  confluenceState: ConfluenceInstanceState;
  isPostExpand: boolean;
  isThereATemplatesUIError: boolean;
  origin: OriginTracing | null;
  project: ProjectState;
  cloudId: string;
  projectSpaceKey: string | null;
  projectSpacePageTitleHasBeenFetched: boolean;
  accountId: string;
}

export interface OwnProps
  extends WithGranularPagesExperimentProps,
    WithJSWConfluenceSilentBundlingExperimentProps,
    WithFireExposureEventProps,
    WithProjectPagesProductionisationProps,
    WithEmbeddedPagesExperimentProps {
  breadcrumbs: React.ReactElement<any>;
  locale: string;
  EmbeddedProductUpdater: ComponentType<any>;
  hasConfluence: boolean;
}

export interface DispatchProps {
  triggerProductsLicenceCheck: () => void;
  triggerShowConnectSpaceDialog: () => void;
  triggerHideConnectSpaceDialog: () => void;
  triggerErrorFlag: () => void;
}

export type Props = {} & StateProps & DispatchProps & OwnProps;
