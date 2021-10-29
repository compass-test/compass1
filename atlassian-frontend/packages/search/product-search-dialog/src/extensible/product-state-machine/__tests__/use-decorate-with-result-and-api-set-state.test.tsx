import { renderHook } from '@testing-library/react-hooks';
import { useDecorateWithResultAndAPISetState } from '../use-decorate-with-result-and-api-set-state';

jest.mock('../../query-context', () => ({
  useQuery: jest.fn(),
}));

import { useQuery } from '../../query-context';
import { APIStates } from '../product-state-machine-types';
import { SearchItems } from '../../product-router/product/result-types';

const mockAcceptedResponse: SearchItems = {
  size: 5,
  sections: [
    {
      id: 'product.scope0',
      title: 'Scope 0',
      size: 5,
      searchResults: [
        { title: '', id: '', meta: '', url: '', iconUrl: '' },
        { title: '', id: '', meta: '', url: '', iconUrl: '' },
        { title: '', id: '', meta: '', url: '', iconUrl: '' },
        { title: '', id: '', meta: '', url: '', iconUrl: '' },
        { title: '', id: '', meta: '', url: '', iconUrl: '' },
      ],
    },
  ],
};

describe('useDecorateWithResultAndAPISetState', () => {
  let commonProps: any;
  let setState: any;
  let searchItemSupplier: any;
  let setAPIState: any;

  beforeEach(() => {
    setState = jest.fn();
    searchItemSupplier = jest
      .fn()
      .mockImplementation((arg: { query: string }) => {
        if (arg.query === 'accepted') {
          return Promise.resolve(mockAcceptedResponse);
        }
      });
    setAPIState = jest.fn();
    commonProps = { setState, searchItemSupplier, setAPIState };
  });

  it('should resolve if query has not changed', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({ query: 'accepted' }));
    const { result } = renderHook(() =>
      useDecorateWithResultAndAPISetState({
        ...commonProps,
      }),
    );

    await result.current({ query: 'accepted' });

    expect(setAPIState.mock.calls).toEqual([
      [APIStates.Loading],
      [APIStates.Success],
    ]);
  });

  it('should not resolve if query has changed (JANK)', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({ query: 'test1' }));
    const { result, rerender } = renderHook(() =>
      useDecorateWithResultAndAPISetState({
        ...commonProps,
      }),
    );
    result.current({ query: 'test1' }); // to replicate API calls i.e. control has returned

    (useQuery as jest.Mock).mockImplementation(() => ({ query: 'accepted' })); // change the query before the promise resolves
    rerender(); // changing the context would cause a re render of the component.

    await result.current({ query: 'accepted' }); // state machine would trigger a fetch again for query change. If the previous promise is not cancelled then it will also resolve.

    expect(setAPIState.mock.calls).toEqual([
      [APIStates.Loading],
      [APIStates.Loading],
      [APIStates.Success],
    ]);

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith(mockAcceptedResponse); // asserts that we didnt resolve for test1
  });
});
