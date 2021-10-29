import { FieldProps } from '@atlaskit/form';

import { ComponentOption } from '../../../../controllers/components-add-team-owner';

export type TeamComponentPickerType = {
  ownerId: string;
} & FieldProps<ComponentOption>;
