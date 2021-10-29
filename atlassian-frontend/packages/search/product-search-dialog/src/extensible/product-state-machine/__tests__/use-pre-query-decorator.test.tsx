import { usePreQueryDecorator } from '../use-pre-query-decorator';
import { renderHook } from '@testing-library/react-hooks';

describe('usePreQueryDecorator', () => {
  const setAPIState = jest.fn();
  const setState = jest.fn();
  const preQueryItemSupplier = jest.fn();

  it(`should only envoke preQueryItemSupplier once`, () => {
    preQueryItemSupplier.mockResolvedValue({ size: 6, sections: [] });

    const { result, rerender } = renderHook(() =>
      usePreQueryDecorator({
        preQueryItemSupplier,
        setAPIState,
        setState,
      }),
    );

    result.current({ sectionIds: [] });
    rerender();

    result.current({ sectionIds: [] });
    rerender();

    result.current({ sectionIds: [] });
    rerender();

    expect(preQueryItemSupplier).toBeCalledTimes(1);
  });
});
