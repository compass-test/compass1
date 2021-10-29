import React from 'react';

import Textfield from '@atlaskit/textfield';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

export const EditorLongText: React.FunctionComponent<QuestionParameters> = question => {
  const { id, defaultAnswer } = question;
  return (
    <Textfield
      id={`pf-fb-questionview-${id}`}
      value={(defaultAnswer && defaultAnswer.text) || ''}
      readOnly={true}
    />
  );
};
