import React, { useCallback } from 'react';

import { DropdownItem } from '@atlaskit/dropdown-menu';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import { useFeatureFlag } from '@atlassian/performance-portal-feature-flags';
import { EditMetricEditorModal } from '@atlassian/performance-portal-metric-editor';

// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { useModalOpenState } from '../../utils';

export const useEditExperienceModal = () => {
  const isMetricEditorEnabled = useFeatureFlag('metric-editor', false);

  const [renderModal, openModal] = useModalOpenState(
    (isOpen, closeModalCallback) => {
      if (!isMetricEditorEnabled) {
        return null;
      }
      return (
        <EditMetricEditorModal
          isOpen={isOpen}
          closeModalHandler={closeModalCallback}
        />
      );
    },
  );

  const renderMenuItem = useCallback(() => {
    if (!isMetricEditorEnabled) {
      return null;
    }
    return (
      <DropdownItem
        key="edit-experience"
        elemBefore={<EditFilledIcon size="small" label="edit" />}
        onClick={openModal}
      >
        Edit metadata
      </DropdownItem>
    );
  }, [isMetricEditorEnabled, openModal]);

  return [renderMenuItem, renderModal];
};
