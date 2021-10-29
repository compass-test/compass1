import React, { useCallback, useState } from 'react';

import { PrimaryButton } from '@atlaskit/atlassian-navigation';
import { useFeatureFlag } from '@atlassian/performance-portal-feature-flags';
import { CreateMetricEditorModal } from '@atlassian/performance-portal-metric-editor';

export const CreateMetricTrigger = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);
  const closeModalHandler = useCallback(() => setEditorOpen(false), [
    setEditorOpen,
  ]);
  const openModalHandler = useCallback(() => setEditorOpen(true), [
    setEditorOpen,
  ]);
  const isMetricEditorEnabled = useFeatureFlag('metric-editor', false);

  if (!isMetricEditorEnabled) {
    return null;
  }

  return (
    <>
      <PrimaryButton onClick={openModalHandler}>Add metric</PrimaryButton>
      {isEditorOpen && (
        <CreateMetricEditorModal
          isOpen={isEditorOpen}
          closeModalHandler={closeModalHandler}
        />
      )}
    </>
  );
};

export default CreateMetricTrigger;
