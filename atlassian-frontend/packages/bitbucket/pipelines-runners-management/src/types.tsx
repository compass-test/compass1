import { ThemeAppearance } from '@atlaskit/lozenge';

export type SelectOptions = {
  label: string;
  value: string;
  __isNew__?: boolean;
};

export type RunnerStatusType =
  | 'ONLINE'
  | 'DISABLED'
  | 'OFFLINE'
  | 'UNREGISTERED';

export const RunnerStatusTagColors: {
  [K in RunnerStatusType]: { appearance: ThemeAppearance };
} = {
  ONLINE: { appearance: 'success' },
  DISABLED: { appearance: 'removed' },
  OFFLINE: { appearance: 'moved' },
  UNREGISTERED: { appearance: 'default' },
};

export enum ManagementTableColumn {
  NAME = 'NAME',
  LABELS = 'LABELS',
  STATUS = 'STATUS',
  UPDATED = 'UPDATED',
  ACTIONS = 'ACTIONS',
}
