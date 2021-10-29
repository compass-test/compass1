import { useReactProps_DO_NOT_USE } from '../useReactProps';
import { act, renderHook } from '@testing-library/react-hooks';

import { ObservableObject } from '../ObservableObject';

describe('useReactProps', () => {
  let observableObject: ObservableObject<object>;
  let mockedWindowFrameElement: jest.SpyInstance;

  beforeEach(() => {
    observableObject = new ObservableObject();
    mockedWindowFrameElement = jest.spyOn(window, 'frameElement', 'get');
  });

  afterEach(() => {
    mockedWindowFrameElement.mockRestore();
  });

  it('props should remain null if window does not have iframe element', () => {
    mockedWindowFrameElement.mockReturnValue(null);

    const { result } = renderHook(() => useReactProps_DO_NOT_USE());

    expect(result.current).toBe(null);
  });

  it('props should remain null if observable object is not available', () => {
    mockedWindowFrameElement.mockReturnValue({});

    const { result } = renderHook(() => useReactProps_DO_NOT_USE());

    expect(result.current).toBe(null);
  });

  it('should update props when observable object has updated', () => {
    mockedWindowFrameElement.mockReturnValue({
      __EP_REACT_PROPS_OBSERVABLE_OBJECT__: observableObject,
    });

    observableObject.object = { name: 'test' };

    const { result } = renderHook(() => useReactProps_DO_NOT_USE());

    expect(result.current).toStrictEqual({
      name: 'test',
    });

    void act(() => {
      observableObject.object = { name: '123' };
    });

    expect(result.current).toStrictEqual({
      name: '123',
    });
  });

  it('should unsubscribe to update props when component has unmount', () => {
    mockedWindowFrameElement.mockReturnValue({
      __EP_REACT_PROPS_OBSERVABLE_OBJECT__: observableObject,
    });

    observableObject.object = { name: 'test' };

    const { result, unmount } = renderHook(() => useReactProps_DO_NOT_USE());

    expect(result.current).toStrictEqual({
      name: 'test',
    });

    unmount();

    void act(() => {
      observableObject.object = { name: '123' };
    });

    expect(result.current).toStrictEqual({
      name: 'test',
    });
  });
});
