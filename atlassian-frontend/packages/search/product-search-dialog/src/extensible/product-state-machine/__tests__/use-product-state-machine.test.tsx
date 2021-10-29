import React from 'react';
import {
  ProductStateMachinePossibleStates,
  useProductStateMachine,
} from '../use-product-state-machine';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('../../query-context', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../dialog-expansion-context', () => ({
  useDialogExpansionContext: () => ({
    isExpanded: true,
  }),
}));

import { useQuery } from '../../query-context';
import { delay } from '../../utils/test-utils';
import { Product, ProductRouter } from '../../product-router';
import { EMPTY_SEARCH_ITEMS } from '../../product-router/product';
import {
  PRE_QUERY_ITEMS,
  POST_QUERY_ITEMS,
} from '../../product-router/__mocks__/results';
import { CancelError } from '../../../utils/cancellable-promise';

const MOCK_PRODUCT: Product = {
  isDisplayed: true,
  id: 'product',
  title: 'title',
  order: 0,
  sectionIds: ['some-section'],
};

describe('useProductStateMachine', () => {
  let setPreQueryItems: any;
  let setPostQueryItems: any;
  let preQueryItemSupplier: any;
  let postQueryItemSupplier: any;
  let getWrapper: (products: Product[]) => React.FC;
  let commonProps: any;

  beforeEach(() => {
    setPreQueryItems = jest.fn();
    setPostQueryItems = jest.fn();
    preQueryItemSupplier = jest.fn();
    postQueryItemSupplier = jest.fn();
    jest.setTimeout(300);
    getWrapper = (products) => ({ children }) => (
      <ProductRouter __initialProducts={products}>{children}</ProductRouter>
    );
    commonProps = {
      setPreQueryItems,
      setPostQueryItems,
      preQueryItemSupplier,
      postQueryItemSupplier,
      id: 'product',
      debounceTime: 0,
    };
  });

  describe('pre-fetching', () => {
    beforeEach(() => {
      mockQueryValue('');

      preQueryItemSupplier.mockResolvedValue(PRE_QUERY_ITEMS);
    });

    it(`should invoke preQueryItemSupplier on initial render if isPrefetchingEnabled is passed`, async () => {
      const mockProduct = {
        ...MOCK_PRODUCT,
        isDisplayed: true,
      };

      const { result } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
            isPrefetchingEnabled: true,
          }),
        { wrapper: getWrapper([mockProduct]) },
      );
      await delay(0);
      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.success,
      );
      expect(setPreQueryItems).toBeCalledWith(PRE_QUERY_ITEMS);
      expect(preQueryItemSupplier).toBeCalledTimes(1);
      expect(preQueryItemSupplier).toHaveBeenCalledWith({
        sectionIds: MOCK_PRODUCT.sectionIds,
      });
    });

    it(`should not invoke preQueryItemSupplier on initial render if isPrefetchingEnabled is false`, async () => {
      const mockProduct = {
        ...MOCK_PRODUCT,
        isDisplayed: false,
      };

      const { result } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
            isPrefetchingEnabled: false,
          }),
        { wrapper: getWrapper([mockProduct]) },
      );
      await delay(100);

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.loading,
      );
      expect(setPreQueryItems).not.toBeCalled();
      expect(preQueryItemSupplier).not.toBeCalled();
    });

    it(`should not invoke preQueryItemSupplier if the product has no displayed sections`, async () => {
      const mockProduct = {
        ...MOCK_PRODUCT,
        isDisplayed: true,
        sectionIds: [],
      };
      mockQueryValue('');

      const { result } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
          }),
        { wrapper: getWrapper([mockProduct]) },
      );
      await delay(100);

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.loading,
      );
      expect(setPreQueryItems).not.toBeCalled();
      expect(preQueryItemSupplier).not.toBeCalled();
    });
  });

  describe('for pre-query', () => {
    beforeEach(() => {
      mockQueryValue('');
    });
    it(`should return ${ProductStateMachinePossibleStates.preQuery.loading} on initial render`, async () => {
      const { result } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
          }),
        { wrapper: getWrapper([{ ...MOCK_PRODUCT, isDisplayed: false }]) },
      );
      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.loading,
      );
    });

    it(`should return ${ProductStateMachinePossibleStates.preQuery.noresult} if no results are returned`, async () => {
      preQueryItemSupplier.mockResolvedValue({ size: 0, sections: [] });

      const { result, waitForNextUpdate } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
          }),
        { wrapper: getWrapper([MOCK_PRODUCT]) },
      );

      await waitForNextUpdate();
      await delay(0);

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.noresult,
      );
      expect(setPreQueryItems).toBeCalledWith({ sections: [], size: 0 });
      expect(setPostQueryItems).not.toBeCalled();
    });

    it(`should return ${ProductStateMachinePossibleStates.preQuery.success} if results are returned`, async () => {
      preQueryItemSupplier.mockResolvedValue(PRE_QUERY_ITEMS);

      const { result, waitForNextUpdate } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
            preQueryItemSupplier,
          }),
        { wrapper: getWrapper([MOCK_PRODUCT]) },
      );

      await waitForNextUpdate();
      await delay(0);

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.success,
      );
      expect(setPreQueryItems).toBeCalledWith(PRE_QUERY_ITEMS);
      expect(setPostQueryItems).not.toBeCalled();
    });

    it(`should not set state if it is unmounted before results are returned`, async () => {
      preQueryItemSupplier.mockResolvedValue({ size: 5, sections: [] });

      const { result, unmount } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
            preQueryItemSupplier,
          }),
        { wrapper: getWrapper([MOCK_PRODUCT]) },
      );

      unmount();
      await delay(50);
      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.loading,
      );
      expect(setPreQueryItems).not.toBeCalled(); // this checks that the state change didnt happen.
      expect(setPostQueryItems).not.toBeCalled();
    });

    it(`should return ${ProductStateMachinePossibleStates.preQuery.error} if preQueryItemSupplier blows up`, async () => {
      preQueryItemSupplier.mockRejectedValue('error');

      const { result, waitForNextUpdate } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
            preQueryItemSupplier,
          }),
        { wrapper: getWrapper([MOCK_PRODUCT]) },
      );
      await waitForNextUpdate();
      await delay(0);

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.error,
      );
      expect(setPreQueryItems).toBeCalledWith({ sections: [], size: 0 });
      expect(setPostQueryItems).not.toBeCalled();
    });

    it(`should return ${ProductStateMachinePossibleStates.preQuery.loading} if preQueryItemSupplier triggers call`, async () => {
      preQueryItemSupplier.mockImplementation(() => new Promise(() => {}));

      const { result } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
            preQueryItemSupplier,
          }),
        { wrapper: getWrapper([MOCK_PRODUCT]) },
      );

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.loading,
      );
      expect(setPreQueryItems).not.toBeCalled();
      expect(setPostQueryItems).not.toBeCalled();
    });
  });

  describe('for post-query', () => {
    const renderPostQueryStateMachine = () => {
      const { result, rerender } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
            postQueryItemSupplier,
          }),
        { wrapper: getWrapper([MOCK_PRODUCT]) },
      );

      const waitForQueryChange = async (query: string) => {
        mockQueryValue(query);

        rerender();

        await delay(0); // This sets the debounce state to true.
        rerender(); // Re-render so that the debounce state's effect can execute i.e. the postQuerySupplier is invoked.
        await delay(0); // PostQuerySupplier is an async function, its set state happens after the promise resolves. This ensures that the state is set.
      };

      return {
        result,
        rerender,
        waitForQueryChange,
      };
    };

    beforeEach(() => {
      mockQueryValue('test');
    });

    it(`should return ${ProductStateMachinePossibleStates.postQuery.loading} on initial render`, async () => {
      const { result } = renderPostQueryStateMachine();
      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.postQuery.loading,
      );
      expect(setPreQueryItems).not.toBeCalled();
      expect(setPostQueryItems).not.toBeCalled();
    });

    it(`should return ${ProductStateMachinePossibleStates.postQuery.noresult} if no results are returned`, async () => {
      postQueryItemSupplier.mockResolvedValue({ size: 0, sections: [] });

      const { result, waitForQueryChange } = renderPostQueryStateMachine();

      await waitForQueryChange('test2');

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.postQuery.noresult,
      );
      expect(setPreQueryItems).toBeCalledTimes(0); //first render
      expect(setPostQueryItems).toBeCalledWith({ sections: [], size: 0 });
    });

    it(`should return ${ProductStateMachinePossibleStates.postQuery.success} if results are returned and reset state followed by setting of new results`, async () => {
      postQueryItemSupplier.mockResolvedValue(POST_QUERY_ITEMS);

      const { result, waitForQueryChange } = renderPostQueryStateMachine();

      await waitForQueryChange('test2');

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.postQuery.success,
      );
      expect(setPreQueryItems).toBeCalledTimes(0); //first render
      await delay(0);
      expect(setPostQueryItems.mock.calls).toEqual([
        [{ sections: [], size: 0 }],
        [POST_QUERY_ITEMS],
      ]);
    });

    it('should always return a loading state when transitioning to pre-query', async () => {
      postQueryItemSupplier.mockResolvedValue({ size: 0, sections: [] });

      const {
        result,
        rerender,
        waitForQueryChange,
      } = renderPostQueryStateMachine();

      await waitForQueryChange('test2');

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.postQuery.noresult,
      );
      expect(setPreQueryItems).toBeCalledTimes(0);
      expect(setPostQueryItems).toBeCalledWith({ sections: [], size: 0 });

      mockQueryValue('');
      rerender();

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.preQuery.loading,
      );

      mockQueryValue('again');
      rerender();

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.postQuery.loading,
      );
    });

    it(`should return ${ProductStateMachinePossibleStates.postQuery.error} if postQueryItemSupplier blows up`, async () => {
      postQueryItemSupplier.mockRejectedValue('blows up');

      const { result, waitForQueryChange } = renderPostQueryStateMachine();

      await waitForQueryChange('test2');

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.postQuery.error,
      );
      expect(setPreQueryItems).toBeCalledTimes(0);
      expect(setPostQueryItems).toBeCalledWith({ sections: [], size: 0 });
    });

    it(`should not set state if postQueryItemSupplier blows up with CancelError`, async () => {
      /**
       * This scenario means that a promise was cancelled because there is fresher call in progress.
       * In such cases we dont want the state changes of previous promise to happen as it will cause a jank/momentary flash of old results.
       */
      postQueryItemSupplier.mockRejectedValue(
        new CancelError('Cancelled to avoid repeated calls.'),
      );

      // render as pre query
      const { result, rerender } = renderHook(
        () =>
          useProductStateMachine({
            ...commonProps,
            postQueryItemSupplier,
          }),
        { wrapper: getWrapper([MOCK_PRODUCT]) },
      );

      // transition to post query
      mockQueryValue('test2');
      rerender();

      // let the debounce finish
      await delay(0);
      rerender();

      // let the side effects of debounce execute
      await delay(0);

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.postQuery.loading,
      );

      // This is here to ensure that the setter of prequery is not called accidentally.
      expect(setPreQueryItems).toBeCalledTimes(0);

      // theres only one call because we reset post query items when query changes here it changes from blank to "query2"
      // Note there are no calls for setting state after the postQuerySupplier is invoked because of the promise being rejected.
      expect(setPostQueryItems).toBeCalledTimes(1);
      expect(setPostQueryItems).toHaveBeenCalledWith({ sections: [], size: 0 });
    });

    it(`should return ${ProductStateMachinePossibleStates.postQuery.loading} if postQueryItemSupplier triggers call`, async () => {
      postQueryItemSupplier.mockImplementation(() => new Promise(() => {}));

      const { result, waitForQueryChange } = renderPostQueryStateMachine();

      await waitForQueryChange('test2');

      expect(result.current.state).toEqual(
        ProductStateMachinePossibleStates.postQuery.loading,
      );
      expect(setPreQueryItems).toBeCalledTimes(0); //first render
      expect(setPostQueryItems).toBeCalledWith(EMPTY_SEARCH_ITEMS);
    });

    describe('onRetry', () => {
      beforeEach(() => {
        mockQueryValue('');
      });

      it('Should call the post query supplier if onRetry is called', async () => {
        postQueryItemSupplier.mockResolvedValue(POST_QUERY_ITEMS);

        const { result, waitForQueryChange } = renderPostQueryStateMachine();

        await waitForQueryChange('retry');

        expect(result.current.state).toEqual(
          ProductStateMachinePossibleStates.postQuery.success,
        );

        result.current.onRetry();

        expect(result.current.state).toEqual(
          ProductStateMachinePossibleStates.postQuery.loading,
        );

        expect(postQueryItemSupplier).toHaveBeenCalledTimes(2);
      });

      it('Should call the supplied onRetry if the child onRetry is called', async () => {
        postQueryItemSupplier.mockResolvedValue(POST_QUERY_ITEMS);

        const mockOnRetry = jest.fn();

        const { result } = renderHook(
          () =>
            useProductStateMachine({
              ...commonProps,
              postQueryItemSupplier,
              onRetry: mockOnRetry,
            }),
          { wrapper: getWrapper([MOCK_PRODUCT]) },
        );

        await postQueryItemSupplier();

        result.current.onRetry();

        expect(mockOnRetry).toHaveBeenCalled();
      });
    });
  });
});

function mockQueryValue(value: string) {
  (useQuery as jest.Mock).mockImplementation(() => ({
    query: value,
    setAdditionalAnalyticsContext: jest.fn(),
  }));
}
