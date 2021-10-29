import { AppListViewFragment } from '@atlassian/dragonfruit-graphql';
import { Extension } from '@atlassian/forge-ui';

export type CustomUIExtension = FUIExtension & {
  customUIExtension?: Extension;
};

export type FUIExtension = {
  id: string;
  title: string;
  icon?: string;
};

export type InstallationContext = {
  id: string;
  environmentKey: string;
};

export type AppListViewInfo = {
  metadata: AppListViewFragment;
  adminPageExtension?: FUIExtension | CustomUIExtension;
  installation: InstallationContext;
};
