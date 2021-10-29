import {
  disconnectSlackWorkSpace,
  getConnectedSlackWorkSpace,
  setConnectedSlackWorkSpace,
} from '../../../../components/ThirdParty/localStorageUtils';

const products = ['jira', 'confluence'];
const localStorageGetItemSpy = jest.spyOn(localStorage, 'getItem');
const localStorageSetItemSpy = jest.spyOn(localStorage, 'setItem');
const localStorageRemoveItemSpy = jest.spyOn(localStorage, 'removeItem');

describe('localStorageUtils', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  products.forEach((product) => {
    describe(`getConnectedSlackWorkSpace for '${product}' product`, () => {
      it('should return null when not yet stored in local storage', () => {
        expect(getConnectedSlackWorkSpace(product)).toBe(null);
      });

      it('should return null when item retrieval throws error', () => {
        setConnectedSlackWorkSpace(product, 'whatever');

        localStorageGetItemSpy.mockImplementationOnce(() => {
          throw new Error();
        });

        const connectedSlackWorkSpace = getConnectedSlackWorkSpace(product);
        expect(connectedSlackWorkSpace).toBe(null);
      });

      it('should return specified value when product is stored in local storage', () => {
        const value = 'whatever';
        setConnectedSlackWorkSpace(product, value);

        const connectedSlackWorkSpace = getConnectedSlackWorkSpace(product);
        expect(connectedSlackWorkSpace).toBe(value);
      });
    });

    describe(`setConnectedSlackWorkSpace for '${product}' product`, () => {
      it('should return null when setting item throws error', () => {
        localStorageSetItemSpy.mockImplementationOnce(() => {
          throw new Error();
        });

        setConnectedSlackWorkSpace(product, 'whatever');

        const connectedSlackWorkSpace = getConnectedSlackWorkSpace(product);
        expect(connectedSlackWorkSpace).toBe(null);
      });

      it('should set the product with specified value in local storage', () => {
        const value = 'whatever';
        setConnectedSlackWorkSpace(product, value);

        const connectedSlackWorkSpace = getConnectedSlackWorkSpace(product);
        expect(connectedSlackWorkSpace).toBe(value);
      });
    });

    describe(`disconnectSlackWorkSpace for '${product}' product`, () => {
      const value = 'whatever';

      beforeEach(() => {
        setConnectedSlackWorkSpace(product, value);
        expect(getConnectedSlackWorkSpace(product)).toBe(value);
      });

      it('should not keep the product in local storage once disconnected', () => {
        disconnectSlackWorkSpace(product);

        expect(getConnectedSlackWorkSpace(product)).toBe(null);
      });

      it(
        'should not remove the product in local storage once disconnected ' +
          'when item removal throws error',
        () => {
          localStorageRemoveItemSpy.mockImplementationOnce(() => {
            throw new Error();
          });

          disconnectSlackWorkSpace(product);

          const connectedSlackWorkSpace = getConnectedSlackWorkSpace(product);
          expect(connectedSlackWorkSpace).toBe(value);
        },
      );
    });
  });
});
