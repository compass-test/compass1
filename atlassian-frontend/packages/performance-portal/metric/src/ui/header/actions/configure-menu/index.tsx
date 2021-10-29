import React, { useMemo } from 'react';

import DropdownMenu, { DropdownItemGroup } from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';

import { useMetricPageState } from '../../../../common/utils/metric-page-state';

import { useDeleteConfirmationModal } from './use-delete-confirmation-modal';
import { useEditAlertsModal } from './use-edit-alerts-modal';
import { useEditExperienceModal } from './use-edit-experience-modal';

export const ConfigureMenu = () => {
  const [state] = useMetricPageState();

  const [
    renderEditExperienceMenuItem,
    renderEditExperienceModal,
  ] = useEditExperienceModal();

  const [
    renderConfigureAlertsMenuItem,
    renderConfigureAlertsModal,
  ] = useEditAlertsModal(state.metric!.id);

  const [
    renderDeleteConfirmationMenuItem,
    renderDeleteConfirmationModal,
  ] = useDeleteConfirmationModal();

  const menuItems = useMemo(
    () =>
      [
        renderEditExperienceMenuItem(),
        renderConfigureAlertsMenuItem(),
        renderDeleteConfirmationMenuItem(),
      ].filter((i) => i != null),
    [
      renderConfigureAlertsMenuItem,
      renderDeleteConfirmationMenuItem,
      renderEditExperienceMenuItem,
    ],
  );

  if (menuItems.length === 0) {
    return null;
  }
  return (
    <>
      <DropdownMenu
        triggerButtonProps={{
          iconBefore: <MoreIcon label="more" />,
        }}
        triggerType="button"
        position="bottom right"
      >
        <DropdownItemGroup>{menuItems}</DropdownItemGroup>
      </DropdownMenu>

      {renderEditExperienceModal()}
      {renderConfigureAlertsModal()}
      {renderDeleteConfirmationModal()}
    </>
  );
};
