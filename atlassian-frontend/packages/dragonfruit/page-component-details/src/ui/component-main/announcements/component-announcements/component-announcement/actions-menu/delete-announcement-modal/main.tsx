import React, { useCallback, useState } from 'react';

import { ButtonProps, LoadingButton } from '@atlaskit/button';
import Button from '@atlaskit/button/standard-button';
import ModalDialog, {
  ModalBody,
  ModalDialogProps,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  checkCompassMutationSuccess,
  CompassAnnouncement,
  CompassComponentOverviewFragment,
  useDeleteAnnouncement,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useAnnouncementDeleteErrorHandler } from './error-handling';
import { useAnnouncementDeleteMutationFlags } from './error-handling/flags';
import messages from './messages';

type Props = {
  announcementId: CompassAnnouncement['id'];
  component: CompassComponentOverviewFragment;
  onSuccess?: () => void;
  onCancel?: ButtonProps['onClick'];
} & ModalDialogProps;

export function DeleteAnnouncementModal(props: Props) {
  const { announcementId, component, onSuccess, onCancel } = props;

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { formatMessage } = useIntl();
  const { cloudId } = useTenantInfo();
  const [deleteAnnouncement] = useDeleteAnnouncement();
  const { handleAnnouncementDeleteError } = useAnnouncementDeleteErrorHandler();
  const {
    showAnnouncementDeleteSuccessFlag,
  } = useAnnouncementDeleteMutationFlags();

  const handleSubmit = useCallback(() => {
    setIsDeleting(true);

    const mutationInput = {
      cloudId,
      id: announcementId,
    };

    return deleteAnnouncement(mutationInput, component.id)
      .then((res) => {
        const payload = res?.data?.compass?.deleteAnnouncement;
        checkCompassMutationSuccess(payload);

        showAnnouncementDeleteSuccessFlag();
        onSuccess?.();
      })
      .catch((error) => {
        handleAnnouncementDeleteError(error, onSuccess);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }, [
    announcementId,
    cloudId,
    component.id,
    deleteAnnouncement,
    handleAnnouncementDeleteError,
    onSuccess,
    showAnnouncementDeleteSuccessFlag,
  ]);

  return (
    <ModalDialog autoFocus={false}>
      <ModalHeader>
        <ModalTitle appearance="warning">
          {formatMessage(messages.modalTitle)}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>{formatMessage(messages.modalDescription)}</ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onCancel}>
          {formatMessage(CommonMessages.cancel)}
        </Button>
        <LoadingButton
          testId={'component-announcement.delete-modal.delete'}
          appearance="warning"
          isLoading={isDeleting}
          onClick={handleSubmit}
        >
          {formatMessage(CommonMessages.delete)}
        </LoadingButton>
      </ModalFooter>
    </ModalDialog>
  );
}
