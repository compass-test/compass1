import { DataSourceProvider } from '../data-source-provider';
import { tableNode } from './__fixtures__/table-node';
const localId = '123abc';

describe('DataSourceProvider', () => {
  const dataSourceProvider = new DataSourceProvider();
  const notifySubscribersSpy = jest.spyOn(
    dataSourceProvider,
    // @ts-ignore
    'notifySubscribers',
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrUpdate', () => {
    beforeAll(() => {
      dataSourceProvider.createOrUpdate(localId, tableNode);
    });

    it('should register new/updated node data', () => {
      expect(dataSourceProvider.get(localId)).toEqual(tableNode);
    });

    it('should call notifySubscribers', () => {
      // @ts-ignore
      requestAnimationFrame.step();

      expect(notifySubscribersSpy).toHaveBeenCalledWith(localId, tableNode);
    });
  });

  describe('subscribe', () => {
    it('should register the given id and callback', () => {
      const callBack = () => {};
      dataSourceProvider.subscribe(localId, callBack);
      expect(
        // @ts-ignore
        dataSourceProvider.subscriptions.get(localId).has(callBack),
      ).toEqual(true);
    });
  });

  describe('unsubscribe', () => {
    it('should unregister given callback for given id', () => {
      const callBack = () => {};
      const callbacks = new Set([callBack]);
      // @ts-ignore
      dataSourceProvider.subscriptions.set(localId, callbacks);
      dataSourceProvider.unsubscribe(localId, callBack);
      // @ts-ignore
      expect(dataSourceProvider.subscriptions.has(localId)).toEqual(true);
      expect(
        // @ts-ignore
        dataSourceProvider.subscriptions.get(localId).has(callBack),
      ).toEqual(false);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      // @ts-ignore
      dataSourceProvider.dataSources.set(localId, tableNode);
      dataSourceProvider.delete(localId);
    });

    it('should unregister node data for given id', () => {
      expect(dataSourceProvider.get(localId)).toEqual(null);
    });

    it('should call notifySubscribers', () => {
      expect(notifySubscribersSpy).toHaveBeenCalledWith(localId, null);
    });
  });

  describe('get', () => {
    it('should return data registered for the given id', () => {
      // @ts-ignore
      dataSourceProvider.dataSources.set(localId, tableNode);
      expect(dataSourceProvider.get(localId)).toEqual(tableNode);
    });

    it('should return null if there is no data for given id', () => {
      // @ts-ignore
      dataSourceProvider.dataSources.delete(localId);
      expect(dataSourceProvider.get(localId)).toEqual(null);
    });
  });
});
