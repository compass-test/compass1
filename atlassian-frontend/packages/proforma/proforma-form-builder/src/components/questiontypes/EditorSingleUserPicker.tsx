import React from 'react';

import AsyncSelect from '@atlaskit/select';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

export const EditorSingleUserPicker: React.FunctionComponent<QuestionParameters> = question => {
  const { id, users } = question;
  return (
    <AsyncSelect
      autoFocus={false}
      instanceId={`pf-fb-questionview-${id}`}
      isInvalid={false}
      isMulti={false}
      isDisabled={true}
      value={
        users &&
        users.length >= 1 && {
          label: users[0].label,
          value: users[0].id,
        }
      }
    />
  );
};
