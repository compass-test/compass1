import React, { useCallback, useState } from 'react';

import { ButtonGroup, LoadingButton } from '@atlaskit/button';
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
  useDeleteTeamCheckin,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useDeleteTeamCheckinFlags } from './flags';
import messages from './messages';

export type Props = {
  testId?: string;
  onCancel?: () => void;
  onFailure?: () => void;
  onSuccess?: () => void;
  teamCheckinId: string | null;
} & ModalDialogProps;

function DeleteTeamCheckinModal({
  testId = 'delete-team-checkin-modal',
  onCancel,
  onFailure,
  onSuccess,
  teamCheckinId,
}: Props) {
  const { formatMessage } = useIntl();
  const { cloudId } = useTenantInfo();
  const [deleteTeamCheckinMutation] = useDeleteTeamCheckin();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const {
    showDeleteTeamCheckinSuccessFlag,
    showDeleteTeamCheckinGenericErrorFlag,
  } = useDeleteTeamCheckinFlags();

  const handleSubmit = useCallback(async () => {
    setIsDeleting(true);

    const input = {
      cloudId,
      id: teamCheckinId as string,
    };

    try {
      const mutationResult = await deleteTeamCheckinMutation(input);
      checkCompassMutationSuccess(
        mutationResult?.data?.compass?.deleteTeamCheckin,
      );
      showDeleteTeamCheckinSuccessFlag();
      onSuccess?.();
    } catch (e) {
      showDeleteTeamCheckinGenericErrorFlag();
      onFailure?.();
    } finally {
      setIsDeleting(false);
    }
  }, [
    cloudId,
    deleteTeamCheckinMutation,
    onFailure,
    onSuccess,
    showDeleteTeamCheckinGenericErrorFlag,
    showDeleteTeamCheckinSuccessFlag,
    teamCheckinId,
  ]);

  return (
    <ModalDialog testId={testId} autoFocus={false}>
      <ModalHeader>
        <ModalTitle appearance="danger">
          {formatMessage(messages.deleteTeamCheckinModalTitle)}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        {formatMessage(messages.deleteTeamCheckinModalDescription)}
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            appearance="subtle"
            isDisabled={isDeleting}
            onClick={onCancel}
            testId={
              'dragonfruit-team-checkins.ui.delete-team-checkin-modal.cancel-button'
            }
          >
            {formatMessage(CommonMessages.cancel)}
          </Button>
          <LoadingButton
            testId={
              'dragonfruit-team-checkins.ui.delete-team-checkin-modal.delete-button'
            }
            appearance="danger"
            isDisabled={isDeleting}
            isLoading={isDeleting}
            onClick={handleSubmit}
          >
            {formatMessage(CommonMessages.delete)}
          </LoadingButton>
        </ButtonGroup>
      </ModalFooter>
    </ModalDialog>
  );
}

export default DeleteTeamCheckinModal;
