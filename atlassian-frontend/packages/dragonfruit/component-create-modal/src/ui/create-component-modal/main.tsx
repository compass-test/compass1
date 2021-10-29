import React from 'react';

import Blanket from '@atlaskit/blanket';
import { ModalDialogProps } from '@atlaskit/modal-dialog';
import {
  TeamCreateDialog,
  useAddFlag,
} from '@atlassian/dragonfruit-people-teams';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

import {
  CreateComponentModalProvider,
  useCreateComponentModalControls,
} from '../../controllers/create-component-modal-controller';

import { CreateComponentFormModal } from './create-component-form-modal';
import {
  CreateComponentFormProps,
  FormData,
} from './create-component-form-modal/create-component-form';

type CreateComponentModalProps = ModalDialogProps &
  Pick<CreateComponentFormProps, 'onSuccess'> & {
    defaultValues?: Partial<FormData>;
  };

export const CreateComponentModalInternal = (
  props: CreateComponentModalProps,
) => {
  const { cloudId, accountId, orgId } = useTenantInfo();

  const [
    { isCreateComponentFormOpen, isCreateTeamFormOpen },
    {
      onCloseTeamForm,
      onTeamCreateSuccess,
      setComponentName,
      setComponentType,
      setSelectedTeamId,
    },
  ] = useCreateComponentModalControls();

  const { addFlag } = useAddFlag();

  if (props.defaultValues?.name) {
    setComponentName(props.defaultValues.name);
  }
  if (props.defaultValues?.type) {
    setComponentType(props.defaultValues.type);
  }
  if (props.defaultValues?.owner) {
    setSelectedTeamId(props.defaultValues.owner.value);
  }
  return (
    <div data-testid={props.testId}>
      {isCreateComponentFormOpen && (
        <CreateComponentFormModal {...props} isBlanketHidden={true} />
      )}
      {isCreateTeamFormOpen && (
        <TeamCreateDialog
          principalId={accountId}
          cloudId={cloudId}
          orgId={orgId}
          product="compass"
          addFlag={addFlag}
          onCreateTeamSuccess={onTeamCreateSuccess}
          onClose={onCloseTeamForm}
          isBlanketHidden
        ></TeamCreateDialog>
      )}
      <Blanket isTinted={true} />
    </div>
  );
};

export const CreateComponentModal = (props: CreateComponentModalProps) => {
  return (
    <CreateComponentModalProvider>
      <CreateComponentModalInternal {...props} />
    </CreateComponentModalProvider>
  );
};
