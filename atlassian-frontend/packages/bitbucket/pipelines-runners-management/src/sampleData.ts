import { Runner } from '@atlassian/pipelines-models';

export const sampleRunners = [
  new Runner({
    name: 'asdfghjklasdfghjkasdfghjksdfghserdtfghjklzsrxdctfvygbhjknmlqewrt',
    uuid: 'foo',
    labels: [
      'linux',
      'mozzarella1',
      'mozzarella2',
      'mozzarella3',
      'mozzarella4',
      'self.hosted',
      'tasty',
      'brie',
      'pecorino',
      'manchego',
      'grana.padano',
      'averylongrunnerlabelyouwouldnotbelievehowlongitis.',
    ],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'ONLINE',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
  new Runner({
    name: 'Windows',
    uuid: 'foo',
    labels: ['windows', 'self.hosted', 'gouda', 'swiss', 'feta', 'mozzarella'],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'DISABLED',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
  new Runner({
    name: 'Macos',
    uuid: 'foo',
    labels: [
      'self.hosted',
      'gouda',
      'swiss',
      'macos',
      'camembert',
      'feta',
      'mozzarella',
    ],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'OFFLINE',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
  new Runner({
    name: 'Farquaad',
    uuid: 'foo',
    labels: ['self.hosted', 'camembert', 'feta', 'linux'],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'ONLINE',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
  new Runner({
    name: 'Gingerbread Man',
    uuid: 'foo',
    labels: ['self.hosted', 'linux'],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'UNREGISTERED',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
  new Runner({
    name: 'Prince Charming',
    uuid: 'foo',
    labels: [
      'self.hosted',
      'tasty',
      'brie',
      'pecorino',
      'manchego',
      'grana.padano',
      'linux',
    ],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'ONLINE',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
  new Runner({
    name: 'Fairy God Mother',
    uuid: 'foo',
    labels: [
      'self.hosted',
      'gouda',
      'swiss',
      'camembert',
      'feta',
      'mozzarella',
      'linux',
    ],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'DISABLED',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
  new Runner({
    name: 'Puss in Boots',
    uuid: 'foo',
    labels: [
      'self.hosted',
      'gouda',
      'camembert',
      'feta',
      'mozzarella',
      'linux',
    ],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'OFFLINE',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
  new Runner({
    name: 'Dragon',
    uuid: 'foo',
    labels: ['self.hosted', 'camembert', 'feta', 'linux'],
    oauth_client: {
      id: 'oauth-client-id',
      token_endpoint: 'https://localhost/oauth/token',
      audience: 'api.atlassian.com',
    },
    state: {
      status: 'ONLINE',
    },
    updated_on: '2019-07-02T03:40:38.093328Z',
  }),
];
