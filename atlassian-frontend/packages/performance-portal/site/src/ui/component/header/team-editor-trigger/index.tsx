import React, { useCallback, useState } from 'react';

import { PrimaryButton } from '@atlaskit/atlassian-navigation';
import { useFeatureFlag } from '@atlassian/performance-portal-feature-flags';
import { TeamEditorModal } from '@atlassian/performance-portal-team-editor';

export const ModalTrigger = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);

  const closeModalHandler = useCallback(() => setEditorOpen(false), [
    setEditorOpen,
  ]);

  const openModalHandler = useCallback(() => setEditorOpen(true), [
    setEditorOpen,
  ]);

  const isTeamEditorEnabled = useFeatureFlag('team-editor', false);

  if (!isTeamEditorEnabled) {
    return null;
  }

  return (
    <>
      <PrimaryButton onClick={openModalHandler}>Team editor</PrimaryButton>
      {isEditorOpen && (
        <TeamEditorModal
          isOpen={isEditorOpen}
          closeModalHandler={closeModalHandler}
        />
      )}
    </>
  );
};

export default ModalTrigger;
