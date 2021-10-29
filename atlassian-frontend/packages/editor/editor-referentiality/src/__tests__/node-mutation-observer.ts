import { NodeMutationObserver } from '../node-mutation-observer';
import { tableNode } from './__fixtures__/table-node';
const localId = '123abc';

describe('NodeMutationObserver', () => {
  let dataSourceProviderMock = { createOrUpdate: jest.fn() } as any;
  const nodeMutationObserver = new NodeMutationObserver(dataSourceProviderMock);

  describe('emit', () => {
    it('should call dataSourceProvider createOrUpdate', () => {
      nodeMutationObserver.emit(localId, tableNode);
      expect(dataSourceProviderMock.createOrUpdate).toHaveBeenCalledWith(
        localId,
        tableNode,
      );
    });
  });
});
