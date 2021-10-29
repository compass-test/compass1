import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';

import { mockScorecard } from './mocks';

import { useDeleteDialogController } from './index';

describe('useDeleteDialogController', () => {
  let wrapper: React.FC;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
    );
  });

  describe('initial behavior', () => {
    it('defaults to the modal being closed', () => {
      const { result } = renderHook(() => useDeleteDialogController(), {
        wrapper,
      });
      const [{ isDeleteModalOpen }] = result.current;

      expect(isDeleteModalOpen).toEqual(false);
    });
  });

  describe('mutations', () => {
    describe('openDeleteModal/closeDeleteModal', () => {
      it('sets the active scorecard when the modal is opened and resets it when closed', () => {
        const { result } = renderHook(() => useDeleteDialogController(), {
          wrapper,
        });

        const [, { openDeleteModal }] = result.current;

        act(() => {
          openDeleteModal(mockScorecard);
        });

        let [
          { isDeleteModalOpen, activeScorecard },
          { closeDeleteModal },
        ] = result.current;

        expect(isDeleteModalOpen).toEqual(true);
        expect(activeScorecard?.id).toEqual(mockScorecard.id);

        act(() => {
          closeDeleteModal();
        });

        [{ isDeleteModalOpen, activeScorecard }] = result.current;

        expect(isDeleteModalOpen).toEqual(false);
        expect(activeScorecard).toBeNull();
      });
    });

    describe('deleteScorecard', () => {
      it('deletes the scorecard and resets the modal', () => {
        const { result } = renderHook(() => useDeleteDialogController(), {
          wrapper,
        });

        const [, { openDeleteModal }] = result.current;

        act(() => {
          openDeleteModal(mockScorecard);
        });

        let [, { deleteScorecard }] = result.current;

        act(() => {
          deleteScorecard();
        });

        const [{ isDeleteModalOpen, activeScorecard }] = result.current;

        expect(isDeleteModalOpen).toEqual(false);
        expect(activeScorecard).toBeNull();
      });
    });
  });
});
