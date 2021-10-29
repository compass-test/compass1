import { render } from '@testing-library/react';
import React, { createRef } from 'react';

import { ActiveProductSearchInputStateless } from '../active-product-search-input';

describe('ActiveProductSearchInputStateless', () => {
  const ref = createRef<HTMLInputElement>();
  const activeProductId = 'active product';
  const query = 'test';
  const setQuery = jest.fn();
  const setIsExpanded = jest.fn();

  beforeEach(() => {
    setQuery.mockReset();
  });

  it('should reset query when collapsed', () => {
    const { rerender } = render(
      <ActiveProductSearchInputStateless
        isExpanded={true}
        forwardRef={ref}
        activeProductId={activeProductId}
        query={query}
        setQuery={setQuery}
        setIsExpanded={setIsExpanded}
      >
        {() => <></>}
      </ActiveProductSearchInputStateless>,
    );

    rerender(
      <ActiveProductSearchInputStateless
        isExpanded={false}
        forwardRef={ref}
        activeProductId={activeProductId}
        query={query}
        setQuery={setQuery}
        setIsExpanded={setIsExpanded}
      >
        {() => <></>}
      </ActiveProductSearchInputStateless>,
    );
    expect(setQuery).toBeCalledWith('');
  });

  it('focuses input when expanded', () => {
    const { rerender } = render(
      <ActiveProductSearchInputStateless
        isExpanded={false}
        forwardRef={ref}
        activeProductId={activeProductId}
        query={query}
        setQuery={setQuery}
        setIsExpanded={setIsExpanded}
      >
        {({ forwardRef }) => {
          return <input ref={forwardRef}></input>;
        }}
      </ActiveProductSearchInputStateless>,
    );

    const refSpy = jest.spyOn(ref.current as any, 'focus');

    rerender(
      <ActiveProductSearchInputStateless
        isExpanded={true}
        forwardRef={ref}
        activeProductId={activeProductId}
        query={query}
        setQuery={setQuery}
        setIsExpanded={setIsExpanded}
      >
        {({ forwardRef }) => {
          return <input ref={forwardRef}></input>;
        }}
      </ActiveProductSearchInputStateless>,
    );
    expect(refSpy).toBeCalledTimes(1);
  });
});
