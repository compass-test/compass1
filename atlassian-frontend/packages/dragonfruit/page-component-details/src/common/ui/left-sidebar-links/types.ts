import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { Extension } from '@atlassian/forge-ui';

export type LeftSidebarLinksProps = {
  componentId: CompassComponent['id'];
  componentPageApps: ExtensionSideBarInfo[];
  unacknowledgedAnnouncementCount?: number;
};

export type ComponentDetailsCustomUIExtension = {
  cloudId: string;
  contextId: string;
  extension: Extension;
};

export type ExtensionSideBarInfo = {
  id: string;
  title: string;
  icon: string;
  displayConditions?: {
    componentTypes: string[];
  };
  customUIExtension?: ComponentDetailsCustomUIExtension;
};
