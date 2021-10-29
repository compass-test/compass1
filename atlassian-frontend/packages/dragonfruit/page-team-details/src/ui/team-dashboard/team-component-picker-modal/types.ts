import { ModalDialogProps } from '@atlaskit/modal-dialog';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

import { ComponentOption } from '../../../controllers/components-add-team-owner';

export type TeamComponentPickerModalProps = {
  onFormSubmit: (
    componentId: string,
    componentName: string,
    componentType: CompassComponentType,
    description?: string | null,
  ) => Promise<void>;
  ownerId: string;
} & ModalDialogProps;

export interface TeamComponentPickerFormData {
  component: ComponentOption;
}
