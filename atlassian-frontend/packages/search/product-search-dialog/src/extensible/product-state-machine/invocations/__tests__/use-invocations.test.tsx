import { renderHook } from '@testing-library/react-hooks';
import {
  PostQueryProps,
  PreQueryProps,
  RetryArgs,
  useOnRetryInvocation,
  usePostQueryInvocation,
  usePreQueryInvocation,
} from '../use-invocations';

describe('useInvocations', () => {
  describe('usePostQueryInvocation', () => {
    let postQueryItemSupplier = jest.fn();
    let setPostQueryItems = jest.fn();
    let setPostQueryAPIState = jest.fn();
    let defaultProps: PostQueryProps;

    beforeEach(() => {
      jest.useFakeTimers();
      postQueryItemSupplier = jest
        .fn()
        .mockResolvedValue({ size: 6, sections: [{}] });
      setPostQueryAPIState = jest.fn();
      setPostQueryItems = jest.fn();

      defaultProps = {
        postQueryItemSupplier,
        setPostQueryItems,
        isDisplayed: true,
        query: '',
        debounceTime: 0,
        sectionIds: ['section'],
        setPostQueryAPIState,
      };
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should reset postQuery items when user starts searching', async () => {
      const { rerender } = renderHook(
        (props: PostQueryProps) => usePostQueryInvocation(props),
        {
          initialProps: defaultProps,
        },
      );

      rerender({ ...defaultProps, query: `test1` });

      expect(setPostQueryItems).toHaveBeenCalledTimes(1);
      expect(setPostQueryItems).toHaveBeenCalledWith({ sections: [], size: 0 });
    });

    it('should reset postQuery API state when user clears out the query and transitions to pre-query state', async () => {
      const { rerender } = renderHook(
        (props: PostQueryProps) => usePostQueryInvocation(props),
        {
          initialProps: { ...defaultProps, query: 'test' },
        },
      );

      rerender({ ...defaultProps, query: `` });

      expect(setPostQueryAPIState).toBeCalledTimes(1);
      expect(setPostQueryAPIState).toHaveBeenCalledWith('loading'); // success is the beginning/default state of API state for both pre and post query.
    });

    it('should invoke postQuerySupplier only if the product is in displayed state', async () => {
      const { rerender } = renderHook(
        (props: PostQueryProps) => usePostQueryInvocation(props),
        {
          initialProps: { ...defaultProps, isDisplayed: false },
        },
      );

      jest.advanceTimersByTime(100);
      rerender({ ...defaultProps, query: `test-1`, isDisplayed: false });

      expect(postQueryItemSupplier).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(100);
      rerender({ ...defaultProps, query: `test-2`, isDisplayed: false });

      expect(postQueryItemSupplier).toHaveBeenCalledTimes(0);
    });

    it('should invoke postQuerySupplier only if the query changes after a search is made', async () => {
      const { rerender } = renderHook(
        (props: PostQueryProps) => usePostQueryInvocation(props),
        {
          initialProps: { ...defaultProps },
        },
      );

      jest.advanceTimersByTime(100);
      rerender({ ...defaultProps, query: 'test' });
      expect(setPostQueryAPIState).toBeCalledTimes(1);
    });

    it('should invoke setPostQueryAPIState if the query changes to blank after a search is made', () => {
      const { rerender } = renderHook(
        (props: PostQueryProps) => usePostQueryInvocation(props),
        {
          initialProps: { ...defaultProps },
        },
      );

      rerender({ ...defaultProps, query: 'test' });

      expect(setPostQueryAPIState).toBeCalledTimes(1);

      rerender({ ...defaultProps, query: '' });

      expect(setPostQueryAPIState).toBeCalledTimes(2);

      rerender({ ...defaultProps, query: 'test' });

      expect(setPostQueryAPIState).toBeCalledTimes(3);
    });

    it('should not invoke postQuerySupplier via debounce when product becomes active', async () => {
      const { rerender } = renderHook(
        (props: PostQueryProps) => usePostQueryInvocation(props),
        {
          initialProps: { ...defaultProps, isDisplayed: false },
        },
      );

      jest.advanceTimersByTime(100);
      rerender({ ...defaultProps, query: `test-1`, isDisplayed: false });

      expect(postQueryItemSupplier).toHaveBeenCalledTimes(0);

      // This means that product is now active and it should skip that debounce loop.
      rerender({ ...defaultProps, query: `test-changed`, isDisplayed: true });

      expect(postQueryItemSupplier).toHaveBeenCalledTimes(1);
    });

    it('should debounce invocation of postQuerySupplier', async () => {
      const { rerender } = renderHook(
        (props: PostQueryProps) => usePostQueryInvocation(props),
        {
          initialProps: { ...defaultProps, debounceTime: 100 },
        },
      );

      jest.advanceTimersByTime(30);
      rerender({ ...defaultProps, debounceTime: 100, query: `test-1` });

      expect(postQueryItemSupplier).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(70); // configured debounce time for these tests is 100ms
      rerender({ ...defaultProps, debounceTime: 100, query: `test-2` });

      expect(postQueryItemSupplier).toHaveBeenCalledTimes(1);
    });

    it('should debounce invocation of postQuerySupplier and not call the supplier if query hasnt changed', async () => {
      const { rerender } = renderHook(
        (props: PostQueryProps) => usePostQueryInvocation(props),
        {
          initialProps: { ...defaultProps, query: 'test' },
        },
      );

      jest.advanceTimersByTime(50);
      rerender({ ...defaultProps, debounceTime: 100, query: `test` });

      expect(postQueryItemSupplier).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(50); // configured debounce time for these tests is 100ms
      rerender({ ...defaultProps, debounceTime: 100, query: `test` });

      expect(postQueryItemSupplier).toHaveBeenCalledTimes(0);
    });
  });

  describe('usePreQueryInvocation', () => {
    let preQueryItemSupplier: any;
    let defaultProps: PreQueryProps;

    beforeEach(() => {
      preQueryItemSupplier = jest
        .fn()
        .mockResolvedValue({ size: 6, sections: [{}] });

      defaultProps = {
        preQueryItemSupplier,
        isDisplayed: false,
        query: '',
        sectionIds: ['section'],
        isPrefetchingEnabled: false,
      };
    });

    it('should not invoke supplier for query empty and inactive product and sections present', () => {
      renderHook((props: PreQueryProps) => usePreQueryInvocation(props), {
        initialProps: defaultProps,
      });

      expect(preQueryItemSupplier).not.toHaveBeenCalled();
    });

    it('should not invoke supplier for non empty query and active product and sections present', () => {
      renderHook((props: PreQueryProps) => usePreQueryInvocation(props), {
        initialProps: { ...defaultProps, isDisplayed: true, query: 'test' },
      });

      expect(preQueryItemSupplier).not.toHaveBeenCalled();
    });

    it('should not invoke supplier for empty query and active product and sections absent', () => {
      renderHook((props: PreQueryProps) => usePreQueryInvocation(props), {
        initialProps: {
          ...defaultProps,
          isDisplayed: true,
          query: '',
          sectionIds: [],
        },
      });

      expect(preQueryItemSupplier).not.toHaveBeenCalled();
    });

    it('should invoke supplier for empty query and active product and sections present', () => {
      renderHook((props: PreQueryProps) => usePreQueryInvocation(props), {
        initialProps: { ...defaultProps, isDisplayed: true },
      });

      expect(preQueryItemSupplier).toHaveBeenCalled();
    });

    it('should invoke supplier for empty query and inactive product and sections present, but isPrefetchingEnabled', () => {
      renderHook((props: PreQueryProps) => usePreQueryInvocation(props), {
        initialProps: { ...defaultProps, isPrefetchingEnabled: true },
      });

      expect(preQueryItemSupplier).toHaveBeenCalled();
    });
  });

  describe('useRetryInvocation', () => {
    const mockSupplier = jest
      .fn()
      .mockResolvedValue({ size: 6, sections: [{}] });
    const args: RetryArgs = {
      isDisplayed: true,
      sectionIds: ['section'],
      postQueryItemSupplier: mockSupplier,
    };

    beforeEach(() => {
      mockSupplier.mockReset();
    });

    it('causes a state update when retry is called', () => {
      const { result } = renderHook(() => useOnRetryInvocation(args));

      result.current();

      expect(mockSupplier).toHaveBeenCalledTimes(1);
      expect(mockSupplier).toHaveBeenCalledWith({
        query: '',
        sectionIds: args.sectionIds,
      });
    });

    it('calls the supplied retry function when the child onRetry is called', () => {
      const mockOnRetry = jest.fn();
      const { result } = renderHook(() =>
        useOnRetryInvocation({ ...args, onRetry: mockOnRetry }),
      );

      result.current();

      expect(mockSupplier).toHaveBeenCalledTimes(1);
      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });
  });
});
