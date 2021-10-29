import React from 'react';

import AsyncSelect from '@atlaskit/select';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

export const EditorMultipleUserPicker: React.FunctionComponent<QuestionParameters> = question => {
  const { id, users } = question;
  return (
    <AsyncSelect
      autoFocus={false}
      instanceId={`pf-fb-questionview-${id}`}
      isInvalid={false}
      isMulti={true}
      isDisabled={true}
      value={
        users &&
        users.map(function (user) {
          return {
            label: user.label,
            value: user.id,
          };
        })
      }
    />
  );
};
