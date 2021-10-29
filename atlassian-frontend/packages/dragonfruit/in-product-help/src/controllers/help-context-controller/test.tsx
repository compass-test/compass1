import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { HelpProvider, useHelp } from './index';

const wrapper: React.FC = ({ children }) => (
  <HelpProvider>{children}</HelpProvider>
);

describe('useHelp', () => {
  describe('initial behavior', () => {
    it('defaults to help not open and blank articleId', () => {
      const { result } = renderHook(() => useHelp(), {
        wrapper,
      });

      const [{ isHelpOpen, articleId }] = result.current;

      expect(isHelpOpen).toEqual(false);
      expect(articleId).toEqual('');
    });
  });

  describe('updating values', () => {
    it('toggleHelp toggles isHelpOpen and clears articleId when closing', () => {
      const { result } = renderHook(() => useHelp(), {
        wrapper,
      });

      let [, { setArticleId, toggleHelp }] = result.current;

      act(() => {
        setArticleId('abc');
        toggleHelp();
      });
      let [{ isHelpOpen, articleId }] = result.current;

      expect(articleId).toEqual('abc');
      expect(isHelpOpen).toEqual(true);

      [, { toggleHelp }] = result.current;

      act(() => {
        toggleHelp();
      });

      [{ isHelpOpen, articleId }] = result.current;

      expect(isHelpOpen).toEqual(false);
      expect(articleId).toEqual('');
    });
  });
});
