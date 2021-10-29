import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';

import { useDeleteModalController } from './index';

const mockInput = {
  componentId: '1234',
  ownerId: '4321',
};

describe('useDeleteModalController', () => {
  let wrapper: React.FC;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
    );
  });

  describe('initial behavior', () => {
    it('defaults to the modal being closed', () => {
      const { result } = renderHook(() => useDeleteModalController(), {
        wrapper,
      });
      const [{ isDeleteModalOpen }] = result.current;

      expect(isDeleteModalOpen).toEqual(false);
    });
  });

  describe('mutations', () => {
    describe('open/close modal', () => {
      it('sets the proper state when open/close actions called', () => {
        const { result } = renderHook(() => useDeleteModalController(), {
          wrapper,
        });

        const [, { openDeleteModal }] = result.current;

        act(() => {
          openDeleteModal();
        });

        let [{ isDeleteModalOpen }, { closeDeleteModal }] = result.current;

        expect(isDeleteModalOpen).toEqual(true);

        act(() => {
          closeDeleteModal();
        });

        [{ isDeleteModalOpen }] = result.current;

        expect(isDeleteModalOpen).toEqual(false);
      });
    });

    describe('deleteOwner', () => {
      it('updating the owner via the delete modal resets the modal', () => {
        const { result } = renderHook(() => useDeleteModalController(), {
          wrapper,
        });

        const [, { openDeleteModal }] = result.current;

        act(() => {
          openDeleteModal();
        });

        let [{ isDeleteModalOpen }, { deleteOwner }] = result.current;

        act(() => {
          deleteOwner(mockInput.componentId, mockInput.ownerId);
        });

        [{ isDeleteModalOpen }] = result.current;

        expect(isDeleteModalOpen).toEqual(false);
      });
    });
  });
});
