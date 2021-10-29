import React, { useState } from 'react';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { ModalTransition } from '@atlaskit/modal-dialog';
import {
  CompassAnnouncement,
  CompassComponentOverviewFragment,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { DeleteAnnouncementModal } from './delete-announcement-modal';
import messages from './messages';
import { UpdateAnnouncementModal } from './update-announcement-modal';

type Props = {
  announcement: CompassAnnouncement;
  component: CompassComponentOverviewFragment;
};

export function AnnouncementActionsMenu(props: Props) {
  const { announcement, component } = props;

  const { formatMessage } = useIntl();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <DropdownMenu
        testId={'component-announcement.actions'}
        triggerType="button"
        triggerButtonProps={{
          appearance: 'subtle',
          iconBefore: (
            <MoreIcon
              label={formatMessage(messages.actionsLabel)}
              size="medium"
            />
          ),
        }}
        position="bottom right"
      >
        <DropdownItemGroup>
          <DropdownItem
            data-testId={'component-announcement.actions.edit'}
            onClick={openEditModal}
          >
            {formatMessage(messages.editAnnouncement)}
          </DropdownItem>
        </DropdownItemGroup>
        <DropdownItemGroup>
          <DropdownItem
            data-testId={'component-announcement.actions.delete'}
            onClick={openDeleteModal}
          >
            {formatMessage(messages.deleteAnnouncement)}
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>

      <ModalTransition>
        {isEditModalOpen && (
          <UpdateAnnouncementModal
            announcement={announcement}
            component={component}
            onSuccess={closeEditModal}
            onCancel={closeEditModal}
          />
        )}
      </ModalTransition>

      <ModalTransition>
        {isDeleteModalOpen && (
          <DeleteAnnouncementModal
            announcementId={announcement.id}
            component={component}
            onSuccess={closeDeleteModal}
            onCancel={closeDeleteModal}
          />
        )}
      </ModalTransition>
    </>
  );
}
