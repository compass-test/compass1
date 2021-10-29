import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { Disclosure, useDisclosureController } from './index';

describe('Disclosure', () => {
  it('should yield ARIA properties to `useDisclosureController` based on a supplied `id`', () => {
    const { result } = renderHook(() => useDisclosureController(), {
      wrapper: ({ children }) => {
        return <Disclosure id={'foo'}>{children}</Disclosure>;
      },
    });

    const [{ toggleProps }] = result.current;

    expect(toggleProps).toHaveProperty('aria-controls', 'foo');
  });

  it('should yield ID properties to `useDisclosureController` based on a supplied `id`', () => {
    const { result } = renderHook(() => useDisclosureController(), {
      wrapper: ({ children }) => {
        return <Disclosure id={'foo'}>{children}</Disclosure>;
      },
    });

    const [{ disclosureProps }] = result.current;

    expect(disclosureProps).toHaveProperty('id', 'foo');
  });

  it('should yield test ID properties to `useDisclosureController` based on a supplied `testId`', () => {
    const { result } = renderHook(() => useDisclosureController(), {
      wrapper: ({ children }) => {
        return <Disclosure testId={'foo'}>{children}</Disclosure>;
      },
    });

    const [{ disclosureProps, toggleProps }] = result.current;

    expect(disclosureProps).toHaveProperty('data-testid', 'foo');
    expect(toggleProps).toHaveProperty('data-testid', 'foo.toggle');
  });

  it('should yield an `isExpanded` value and a corresponding ARIA value consistent with a supplied `expanded`', () => {
    let { result } = renderHook(() => useDisclosureController(), {
      wrapper: ({ children }) => {
        return <Disclosure expanded={true}>{children}</Disclosure>;
      },
    });

    let [{ toggleProps, isExpanded }] = result.current;

    expect(isExpanded).toBe(true);
    expect(toggleProps).toHaveProperty('aria-expanded', true);

    ({ result } = renderHook(() => useDisclosureController(), {
      wrapper: ({ children }) => {
        return <Disclosure expanded={false}>{children}</Disclosure>;
      },
    }));

    [{ toggleProps, isExpanded }] = result.current;

    expect(isExpanded).toBe(false);
    expect(toggleProps).toHaveProperty('aria-expanded', false);
  });

  it('should maintain separate state in separate component instances', () => {
    const { result: result1 } = renderHook(() => useDisclosureController(), {
      wrapper: ({ children }) => {
        return <Disclosure expanded={true}>{children}</Disclosure>;
      },
    });

    const { result: result2 } = renderHook(() => useDisclosureController(), {
      wrapper: ({ children }) => {
        return <Disclosure expanded={false}>{children}</Disclosure>;
      },
    });

    const [{ isExpanded: isExpanded1 }] = result1.current;
    const [{ isExpanded: isExpanded2 }] = result2.current;

    expect(isExpanded1).toBe(true);
    expect(isExpanded2).toBe(false);
  });

  describe('useDisclosureController', () => {
    it('should set `isExpanded` to `true` when invoking `show`', () => {
      const { result } = renderHook(() => useDisclosureController(), {
        wrapper: ({ children }) => {
          return <Disclosure>{children}</Disclosure>;
        },
      });

      let [{ isExpanded }, { show }] = result.current;

      expect(isExpanded).toBe(false);

      act(() => {
        show();
      });

      [{ isExpanded }] = result.current;

      expect(isExpanded).toBe(true);

      act(() => {
        show();
      });

      [{ isExpanded }] = result.current;

      expect(isExpanded).toBe(true);
    });

    it('should set `isExpanded` to `false` when invoking `hide`', () => {
      const { result } = renderHook(() => useDisclosureController(), {
        wrapper: ({ children }) => {
          return <Disclosure expanded={true}>{children}</Disclosure>;
        },
      });

      let [{ isExpanded }, { hide }] = result.current;

      expect(isExpanded).toBe(true);

      act(() => {
        hide();
      });

      [{ isExpanded }] = result.current;

      expect(isExpanded).toBe(false);

      act(() => {
        hide();
      });

      [{ isExpanded }] = result.current;

      expect(isExpanded).toBe(false);
    });

    it('should toggle `isExpanded` when invoking `toggle`', () => {
      const { result } = renderHook(() => useDisclosureController(), {
        wrapper: ({ children }) => {
          return <Disclosure>{children}</Disclosure>;
        },
      });

      let [{ isExpanded }, { toggle }] = result.current;

      expect(isExpanded).toBe(false);

      act(() => {
        toggle();
      });

      [{ isExpanded }] = result.current;

      expect(isExpanded).toBe(true);

      act(() => {
        toggle();
      });

      [{ isExpanded }] = result.current;

      expect(isExpanded).toBe(false);
    });
  });
});
