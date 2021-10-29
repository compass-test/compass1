import React from 'react';

import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { UNIDENTIFIED_TEAM } from './constants';
import { TeamFilter } from './types';

import { SelectedFiltersProvider, useSelectedFilters } from './index';

describe('useSelectedFilters', () => {
  describe('when initialized with no selected teams by default', () => {
    it('should return an empty list of filters', () => {
      const expected: Array<TeamFilter> = [];

      const wrapper: React.FC = ({ children }) => (
        <SelectedFiltersProvider>{children}</SelectedFiltersProvider>
      );

      const { result } = renderHook(() => useSelectedFilters(), { wrapper });

      const [{ filters }] = result.current;

      expect(filters).toEqual(expected);
    });
  });

  describe('toggleUnownedFilter', () => {
    it('should return a filter for unowned teams when toggled', () => {
      const unownedTeamsFilter: Array<TeamFilter> = [
        {
          name: 'ownerId',
          filter: { eq: UNIDENTIFIED_TEAM },
        },
      ];

      const wrapper: React.FC = ({ children }) => (
        <SelectedFiltersProvider>{children}</SelectedFiltersProvider>
      );

      const { result } = renderHook(() => useSelectedFilters(), { wrapper });

      const [, { toggleUnownedFilter }] = result.current;

      // Add filter to exclude any teams that already have owners
      act(() => {
        toggleUnownedFilter();
      });

      const [{ filters }] = result.current;

      expect(filters).toEqual(expect.arrayContaining(unownedTeamsFilter));
    });
  });

  describe('toggleLowPerformingFilter', () => {
    it('should return a filter for low performing components when toggled', () => {
      const lowPerformingFilter: Array<TeamFilter> = [
        {
          name: 'score',
          filter: { lt: '50' },
        },
      ];

      const wrapper: React.FC = ({ children }) => (
        <SelectedFiltersProvider>{children}</SelectedFiltersProvider>
      );

      const { result } = renderHook(() => useSelectedFilters(), { wrapper });

      const [, { toggleLowPerformingFilter }] = result.current;

      act(() => {
        toggleLowPerformingFilter();
      });

      const [{ filters }] = result.current;

      expect(filters).toEqual(expect.arrayContaining(lowPerformingFilter));
    });
  });
});
