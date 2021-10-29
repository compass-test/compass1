import React, { useMemo } from 'react';

import { graphql, useFragment } from 'react-relay';

import DropdownMenu, { DropdownItemGroup } from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';

import type { configureMenuHeaderFragment$key } from './__generated__/configureMenuHeaderFragment.graphql';
import { useDeleteConfirmationModal } from './use-delete-confirmation-modal';
import { useEditAlertsModal } from './use-edit-alerts-modal';
import { useEditExperienceModal } from './use-edit-experience-modal';

type Props = {
  data: configureMenuHeaderFragment$key;
};

export const ConfigureMenu = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment configureMenuHeaderFragment on Metric {
        id
      }
    `,
    props.data,
  );

  const [
    renderEditExperienceMenuItem,
    renderEditExperienceModal,
  ] = useEditExperienceModal();

  const [
    renderConfigureAlertsMenuItem,
    renderConfigureAlertsModal,
  ] = useEditAlertsModal(data.id);

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
