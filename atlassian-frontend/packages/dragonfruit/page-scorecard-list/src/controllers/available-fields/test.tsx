import React from 'react';

import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { OPTIONS } from './constants';

import { AvailableFieldsProvider, useAvailableFields } from './index';

describe('useAvailableFields', () => {
  describe('when initialized with no initial claims', () => {
    it('should return a list of all available fields in state', () => {
      const expected = OPTIONS.slice();

      const wrapper: React.FC = ({ children }) => (
        <AvailableFieldsProvider>{children}</AvailableFieldsProvider>
      );

      const { result } = renderHook(() => useAvailableFields(), { wrapper });

      const [{ fields }] = result.current;

      expect(fields).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('when initialized with initial claims', () => {
    it('should return a subset of available fields in state excluding active claims', () => {
      const claimedField = OPTIONS[0];
      const expected = OPTIONS.slice(1);

      const wrapper: React.FC = ({ children }) => (
        <AvailableFieldsProvider
          hookArgs={[[claimedField.value].map((value) => value.toString())]}
        >
          {children}
        </AvailableFieldsProvider>
      );

      const { result } = renderHook(() => useAvailableFields(), {
        wrapper,
      });

      const [{ fields }] = result.current;

      expect(fields).toEqual(expect.arrayContaining(expected));
      expect(expected).toEqual(expect.arrayContaining(fields));
    });
  });

  describe('claimField', () => {
    it('should maintain an active list of claims', () => {
      const claimedField = OPTIONS[0];

      const wrapper: React.FC = ({ children }) => (
        <AvailableFieldsProvider
          hookArgs={[[claimedField.value].map((value) => value.toString())]}
        >
          {children}
        </AvailableFieldsProvider>
      );

      const { result } = renderHook(() => useAvailableFields(), {
        wrapper,
      });

      const expected = [...OPTIONS.slice(2), OPTIONS[0]];

      const [, { claimField }] = result.current;

      // Claim OPTIONS[1] as the new filed. OPTIONS[0] is the oldField.
      act(() => {
        claimField(OPTIONS[0].value.toString(), OPTIONS[1].value.toString());
      });

      const newFields = result.current[0].fields;
      expect(newFields).toEqual(expect.arrayContaining(expected));
      expect(expected).toEqual(expect.arrayContaining(newFields));
    });
  });
});
