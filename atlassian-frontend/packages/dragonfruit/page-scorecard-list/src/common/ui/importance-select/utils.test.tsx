import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ImportanceOptions } from './utils';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;

describe('ImportanceOptions', () => {
  const wrapper: React.FC = ({ children }) => (
    <CompassTestProvider locale="en">{children}</CompassTestProvider>
  );

  it('should return the REQUIRED, RECOMMENDED, USER_DEFINED options for admin users', () => {
    const { result } = renderHook(() => ImportanceOptions(true), {
      wrapper,
    });

    const options = result.current;
    expect(options.length).toEqual(3);
    const optionValues = options.map((option) => option.value);
    expect(optionValues).toContain('REQUIRED');
    expect(optionValues).toContain('RECOMMENDED');
    expect(optionValues).toContain('USER_DEFINED');
  });

  it('should return the RECOMMENDED, USER_DEFINED options for non admin users', () => {
    const { result } = renderHook(() => ImportanceOptions(false), {
      wrapper,
    });

    const options = result.current;
    expect(options.length).toEqual(2);
    const optionValues = options.map((option) => option.value);
    expect(optionValues).toContain('RECOMMENDED');
    expect(optionValues).toContain('USER_DEFINED');
  });
});
