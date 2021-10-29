import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { IntlProvider } from 'react-intl';
import { SearchSessionProvider } from '../../../common/search-session-provider';

import {
  ActiveProductSearchInputStateless,
  ChildrenProps,
} from '../active-product-search-input';

jest.unmock('lodash/debounce');

describe('ActiveProductSearchInputStateless', () => {
  const ref = createRef<HTMLInputElement>();
  const activeProductId = 'active product';
  const query = 'test';
  const setQuery = jest.fn();
  const setIsExpanded = jest.fn();
  const onNavigateGeneric = () => null;

  const getTestWrapper: React.FunctionComponent = ({ children }) => (
    <IntlProvider locale="en">
      <SearchSessionProvider sessionKey="">{children}</SearchSessionProvider>
    </IntlProvider>
  );

  const renderInput = (props: Partial<ChildrenProps>) => (
    <ActiveProductSearchInputStateless
      isExpanded={false}
      isLoading={false}
      activeProductId={activeProductId}
      query={query}
      setQuery={setQuery}
      setIsExpanded={setIsExpanded}
      onNavigateGeneric={onNavigateGeneric}
      {...props}
      forwardRef={ref}
    />
  );

  beforeEach(() => {
    setQuery.mockReset();
  });

  it('focuses input when expanded', () => {
    const { rerender } = render(
      renderInput({
        isExpanded: false,
      }),
      { wrapper: getTestWrapper },
    );

    const refSpy = jest.spyOn(ref.current as any, 'focus');

    rerender(
      renderInput({
        isExpanded: true,
      }),
    );
    expect(refSpy).toBeCalledTimes(1);
  });

  it('focuses input when the active product is changed', () => {
    const { rerender } = render(
      renderInput({
        isExpanded: true,
        activeProductId,
      }),
      { wrapper: getTestWrapper },
    );

    const refSpy = jest.spyOn(ref.current as any, 'focus');

    rerender(
      renderInput({
        isExpanded: true,
        activeProductId: 'some new product',
      }),
    );
    expect(refSpy).toBeCalledTimes(1);
  });

  it('does NOT focus the input when active product changes but the dialog is not expanded', () => {
    const { rerender } = render(
      renderInput({
        isExpanded: false,
        activeProductId,
      }),
      { wrapper: getTestWrapper },
    );

    const refSpy = jest.spyOn(ref.current as any, 'focus');

    rerender(
      renderInput({
        isExpanded: false,
        activeProductId: 'some new product',
      }),
    );
    expect(refSpy).not.toHaveBeenCalled();
  });
});
