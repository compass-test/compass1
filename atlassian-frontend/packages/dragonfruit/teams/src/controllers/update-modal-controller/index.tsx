import { useCallback, useState } from 'react';

import { useUpdateComponentOwner } from '@atlassian/dragonfruit-graphql';

export const useUpdateModalController: () => [
  {
    isEditModalOpen: boolean;
  },
  {
    openEditModal: () => void;
    closeEditModal: () => void;
    updateOwner: (
      componentId: string,
      ownerId?: string | null,
    ) => Promise<boolean>;
  },
] = () => {
  const [updateOwnerMutation] = useUpdateComponentOwner();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = useCallback(() => {
    setIsEditModalOpen(true);
  }, [setIsEditModalOpen]);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, [setIsEditModalOpen]);

  const updateOwner = useCallback(
    async (componentId: string, ownerId?: string | null): Promise<boolean> => {
      const input = {
        id: componentId,
        ownerId: ownerId,
      };
      setIsEditModalOpen(false);
      const mutationResult = await updateOwnerMutation(input);
      let result = false;
      // close modal either way but return true or flase to display flags
      if (mutationResult?.data?.compass?.updateComponent?.success) {
        result = true;
      }
      return result;
    },
    [updateOwnerMutation, setIsEditModalOpen],
  );

  return [
    {
      isEditModalOpen,
    },
    {
      openEditModal,
      closeEditModal,
      updateOwner,
    },
  ];
};
