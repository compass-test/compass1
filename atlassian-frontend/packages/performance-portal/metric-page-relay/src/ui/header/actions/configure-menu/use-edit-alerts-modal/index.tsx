import React, { useCallback } from 'react';

import { DropdownItem } from '@atlaskit/dropdown-menu';
import NotificationAllIcon from '@atlaskit/icon/glyph/notification-all';
import { EditAlertConfigModal } from '@atlassian/performance-portal-metric-alerts-config-editor';

// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { useModalOpenState } from '../../utils';

export const useEditAlertsModal = (metricId: string) => {
  const [renderModal, openModal] = useModalOpenState(
    (isOpen, closeModalCallback) => {
      return (
        <EditAlertConfigModal
          isOpen={isOpen}
          closeModalHandler={closeModalCallback}
          metricId={metricId}
        />
      );
    },
  );

  const renderMenuItem = useCallback(() => {
    return (
      <DropdownItem
        key="edit-alerts"
        elemBefore={<NotificationAllIcon size="small" label="edit" />}
        onClick={openModal}
      >
        Manage alerts
      </DropdownItem>
    );
  }, [openModal]);

  return [renderMenuItem, renderModal];
};
