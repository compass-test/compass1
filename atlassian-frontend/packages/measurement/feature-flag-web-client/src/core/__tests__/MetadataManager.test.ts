import {
  ClientCauseReason,
  ClientStorageState,
  ClientUserState,
} from '../../fetcher/types';
import Storage from '../../storage';
import { version } from '../../util/version';
import MetadataManager from '../MetadataManager';
import { SCHEDULER_OPTIONS_DEFAULT } from '../Refresh';
import { PollingConfig } from '../types';

describe('Core - MetadataManager', () => {
  const pollingConfig: PollingConfig = SCHEDULER_OPTIONS_DEFAULT;

  let manager: MetadataManager;

  beforeEach(() => {
    manager = new MetadataManager(pollingConfig);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return client', () => {
    expect(manager.get().client).toEqual({
      name: 'feature-flag-web-client',
      version,
    });
  });

  test('should return config polling seconds', () => {
    expect(manager.get().config).toEqual({
      pollingSeconds: 300,
    });
  });

  test('should return visibility state', () => {
    jest
      .spyOn(document, 'visibilityState', 'get')
      .mockReturnValueOnce('visible');
    expect(manager.get().state.visibility).toEqual('visible');

    jest
      .spyOn(document, 'visibilityState', 'get')
      .mockReturnValueOnce('hidden');
    expect(manager.get().state.visibility).toEqual('hidden');
  });

  test('should return storage state', () => {
    jest
      .spyOn(Storage, 'getStorageStatus')
      .mockReturnValueOnce(ClientStorageState.AVAILABLE);
    expect(manager.get().state.storage).toEqual(ClientStorageState.AVAILABLE);

    jest
      .spyOn(Storage, 'getStorageStatus')
      .mockReturnValueOnce(ClientStorageState.ERRORED);
    expect(manager.get().state.storage).toEqual(ClientStorageState.ERRORED);
  });

  test('should return user context if available', () => {
    expect(manager.get().state.userContext).toEqual(undefined);

    manager.updateClientUserState(ClientUserState.NEW);
    expect(manager.get().state.userContext).toEqual(ClientUserState.NEW);
  });

  test('should return cause if available', () => {
    expect(manager.get().state.cause).toEqual(undefined);

    manager.updateClientCauseReason(ClientCauseReason.INITIALIZATION);
    expect(manager.get().state.cause).toEqual(ClientCauseReason.INITIALIZATION);
  });
});
