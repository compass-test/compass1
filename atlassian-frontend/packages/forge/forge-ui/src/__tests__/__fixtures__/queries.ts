import { ForgeUIExtensionType } from '@atlassian/forge-ui-types';

export const EXTENSION_LIST_RESULTS: ForgeUIExtensionType[] = [
  {
    id: '123-2:button-1-key',
    properties: {
      title: 'My button app',
      description: 'It only contains button',
    },
    environmentType: 'DEVELOPMENT',
    installationId: '123',
    environmentId: '234',
    appVersion: '2.20.0',
  },
  {
    id: '123-2:button-2-key',
    properties: {
      title: 'My other button app',
      description: 'It only contains a red button',
    },
    environmentType: 'DEVELOPMENT',
    installationId: '123',
    environmentId: '234',
    appVersion: '2.20.0',
  },
];
