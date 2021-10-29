import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';

import { useUpdateModalController } from './index';

const mockInput = {
  componentId: '1234',
  ownerId: '4321',
};

describe('useUpdateModalController', () => {
  let wrapper: React.FC;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
    );
  });

  describe('initial behavior', () => {
    it('defaults to the modal being closed', () => {
      const { result } = renderHook(() => useUpdateModalController(), {
        wrapper,
      });
      const [{ isEditModalOpen }] = result.current;

      expect(isEditModalOpen).toEqual(false);
    });
  });

  describe('mutations', () => {
    describe('openEditModal/closeEditModal', () => {
      it('sets the proper state when open/close actions called', () => {
        const { result } = renderHook(() => useUpdateModalController(), {
          wrapper,
        });

        const [, { openEditModal }] = result.current;

        act(() => {
          openEditModal();
        });

        let [{ isEditModalOpen }, { closeEditModal }] = result.current;

        expect(isEditModalOpen).toEqual(true);

        act(() => {
          closeEditModal();
        });

        [{ isEditModalOpen }] = result.current;

        expect(isEditModalOpen).toEqual(false);
      });
    });

    describe('updateOwner', () => {
      it('updating the owner via the update modal resets the modal', () => {
        const { result } = renderHook(() => useUpdateModalController(), {
          wrapper,
        });

        const [, { openEditModal }] = result.current;

        act(() => {
          openEditModal();
        });

        let [{ isEditModalOpen }, { updateOwner }] = result.current;

        act(() => {
          updateOwner(mockInput.componentId, mockInput.ownerId);
        });

        [{ isEditModalOpen }] = result.current;

        expect(isEditModalOpen).toEqual(false);
      });
    });
  });
});
