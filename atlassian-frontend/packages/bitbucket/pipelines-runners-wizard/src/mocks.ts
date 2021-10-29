import { Runner } from '@atlassian/pipelines-models';

import { CreateRunner, EditRunner, FetchRunner } from './types';

export const createRunner: CreateRunner = (
  runnerName: string,
  runnerLabels: string[],
) =>
  new Promise((resolve) =>
    setTimeout(() => {
      const client = {
        audience: 'string',
        id: 'hZqHZ1fDwho0uvbr90sYNekeHOKfZaYg',
        secret:
          'GL4hlCJzWgGbLchBWMEp9VGKJ1YdbOwuxO5iFBH4nGbI4dBem_m8H0EBtrjyYy-K',
        token_endpoint: 'string',
      };
      resolve(
        new Runner({
          labels: runnerLabels,
          oauth_client: client,
          name: runnerName,
          uuid: '{3b7fd7c7-6bc8-4954-9g53-69182c6e4d2f}',
          state: {
            status: 'UNREGISTERED',
          },
        }),
      );
    }, 1000),
  );

export const fetchRunner: FetchRunner = (runnerUuid: string) =>
  new Promise((resolve) =>
    setTimeout(() => {
      const client = {
        audience: 'string',
        id: 'hZqHZ1fDwho0uvbr90sYNekeHOKfZaYg',
        token_endpoint: 'string',
      };
      resolve(
        new Runner({
          labels: ['self.hosted', 'linux'],
          oauth_client: client,
          name: 'test',
          uuid: '{3b7fd7c7-6bc8-4954-9g53-69182c6e4d2f}',
          state: {
            status: 'UNREGISTERED',
          },
        }),
      );
    }, 1000),
  );

export const editRunner: EditRunner = (
  runnerUuid: string,
  newRunnerName: string,
  newRunnerLabels: string[],
) =>
  new Promise((resolve) =>
    setTimeout(() => {
      const client = {
        audience: 'string',
        id: 'hZqHZ1fDwho0uvbr90sYNekeHOKfZaYg',
        secret:
          'GL4hlCJzWgGbLchBWMEp9VGKJ1YdbOwuxO5iFBH4nGbI4dBem_m8H0EBtrjyYy-K',
        token_endpoint: 'string',
      };
      resolve(
        new Runner({
          labels: newRunnerLabels,
          oauth_client: client,
          name: newRunnerName,
          uuid: runnerUuid,
          state: {
            status: 'UNREGISTERED',
          },
        }),
      );
    }, 1000),
  );

export const createRunnerError: CreateRunner = (
  runnerName: string,
  runnerLabels: string[],
) => Promise.reject('could not create runner');

export const fetchRunnerError: FetchRunner = (runnerUuid: string) =>
  Promise.reject('could not create runner');

export const editRunnerError: EditRunner = (
  runnerUuid: string,
  runnerName: string,
  runnerLabels: string[],
) => Promise.reject('could not create runner');

export const repositoryUuid = '{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}';
export const workspaceUuid = '{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}';

export const runner = new Runner({
  name: 'Shrek',
  uuid: '{3b7fd7c7-6bc8-4954-9g53-69182c6e4d2f}',
  labels: ['self.hosted', 'linux', 'tasty', 'brie'],
  latest_version: '1.0.0',
  oauth_client: {
    audience: 'string',
    id: 'hZqHZ1fDwho0uvbr90sYNekeHOKfZaYg',
    secret: 'GL4hlCJzWgGbLchBWMEp9VGKJ1YdbOwuxO5iFBH4nGbI4dBem_m8H0EBtrjyYy-K',
    token_endpoint: 'string',
  },
  state: {
    status: 'ONLINE',
    step: {
      type: 'pipelines_step',
      uuid: '{7b52159c-1a33-11eb-adc1-0242ac120002}',
    },
  },
});
