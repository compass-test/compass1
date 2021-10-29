import { useCallback, useState } from 'react';

import { useUpdateComponentOwner } from '@atlassian/dragonfruit-graphql';

export const useDeleteModalController: () => [
  {
    isDeleteModalOpen: boolean;
  },
  {
    openDeleteModal: () => void;
    closeDeleteModal: () => void;
    deleteOwner: (
      componentId: string,
      ownerId?: string | null,
    ) => Promise<boolean>;
  },
] = () => {
  const [updateOwnerMutation] = useUpdateComponentOwner();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, [setIsDeleteModalOpen]);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, [setIsDeleteModalOpen]);

  const deleteOwner = useCallback(
    async (componentId: string, ownerId?: string | null): Promise<boolean> => {
      const input = {
        id: componentId,
        ownerId: ownerId,
      };
      setIsDeleteModalOpen(false);
      const mutationResult = await updateOwnerMutation(input);
      let result = false;
      // close modal either way but return true or flase to display flags
      if (mutationResult?.data?.compass?.updateComponent?.success) {
        result = true;
      }
      return result;
    },
    [updateOwnerMutation, setIsDeleteModalOpen],
  );

  return [
    {
      isDeleteModalOpen,
    },
    {
      openDeleteModal,
      closeDeleteModal,
      deleteOwner,
    },
  ];
};
