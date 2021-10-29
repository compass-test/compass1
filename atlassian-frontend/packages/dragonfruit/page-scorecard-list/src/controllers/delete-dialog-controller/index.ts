import { useCallback, useState } from 'react';

import { useDeleteScorecard } from '@atlassian/dragonfruit-graphql';

import { CompassScorecardType } from '../../types';

export const useDeleteDialogController: () => [
  {
    isDeleteModalOpen: boolean;
    activeScorecard: CompassScorecardType | null;
  },
  {
    openDeleteModal: (scorecard: CompassScorecardType) => void;
    closeDeleteModal: () => void;
    deleteScorecard: () => Promise<any>;
  },
] = () => {
  const [deleteScorecardMutation] = useDeleteScorecard();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Data for the specific scorecard remove link that was clicked
  const [
    activeScorecard,
    setActiveScorecard,
  ] = useState<CompassScorecardType | null>(null);

  const openDeleteModal = useCallback(
    (scorecard: CompassScorecardType) => {
      setActiveScorecard(scorecard);
      setIsDeleteModalOpen(true);
    },
    [setActiveScorecard, setIsDeleteModalOpen],
  );

  const closeDeleteModal = useCallback(() => {
    setActiveScorecard(null);
    setIsDeleteModalOpen(false);
  }, [setActiveScorecard, setIsDeleteModalOpen]);

  const deleteScorecard = useCallback((): Promise<any> => {
    const result = deleteScorecardMutation(activeScorecard!.id);

    setActiveScorecard(null);
    setIsDeleteModalOpen(false);

    return result;
  }, [
    activeScorecard,
    deleteScorecardMutation,
    setActiveScorecard,
    setIsDeleteModalOpen,
  ]);

  return [
    {
      isDeleteModalOpen,
      activeScorecard,
    },
    {
      openDeleteModal,
      closeDeleteModal,
      deleteScorecard,
    },
  ];
};
