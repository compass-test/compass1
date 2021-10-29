import { ButtonProps } from '@atlaskit/button';
import { ModalDialogProps } from '@atlaskit/modal-dialog';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { TeamSelectValue } from '@atlassian/dragonfruit-services-components';

export type FormData = Pick<CompassComponent, 'id'> & {
  owner: TeamSelectValue;
};

export type UpdateOwnerModalProps = {
  onCancel?: ButtonProps['onClick'];
  updateOwner: (
    componentId: string,
    ownerId?: string | null,
  ) => Promise<boolean>;
  defaultValues?: Partial<FormData>;
  isEditModal: boolean;
  componentId: string;
} & ModalDialogProps;
