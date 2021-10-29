import React, { useCallback } from 'react';

import { DropdownItem } from '@atlaskit/dropdown-menu';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import { useFeatureFlag } from '@atlassian/performance-portal-feature-flags';
import { DeleteMetricConfirmationModal } from '@atlassian/performance-portal-metric-editor';

// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { useModalOpenState } from '../utils';

export const useDeleteConfirmationModal = () => {
  const isMetricEditorEnabled = useFeatureFlag('metric-editor', false);

  const [renderModal, openModal] = useModalOpenState(
    (isOpen, closeModalCallback) => {
      if (!isMetricEditorEnabled) {
        return null;
      }
      return <DeleteMetricConfirmationModal closeModal={closeModalCallback} />;
    },
  );

  const renderMenuItem = useCallback(() => {
    if (!isMetricEditorEnabled) {
      return null;
    }
    return (
      <DropdownItem
        elemBefore={<TrashIcon size="small" label="delete" />}
        onClick={openModal}
      >
        Delete
      </DropdownItem>
    );
  }, [isMetricEditorEnabled, openModal]);

  return [renderMenuItem, renderModal];
};
