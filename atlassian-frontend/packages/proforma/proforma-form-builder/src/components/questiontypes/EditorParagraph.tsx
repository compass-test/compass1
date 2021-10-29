import React from 'react';

import TextArea from '@atlaskit/textarea';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

export const EditorParagraph: React.FunctionComponent<QuestionParameters> = props => {
  const { defaultAnswer, validation } = props;
  const { rq } = validation;
  return (
    <TextArea
      appearance="standard"
      isCompact={false}
      isDisabled={false}
      isReadOnly={true}
      isRequired={rq}
      isInvalid={false}
      minimumRows={5}
      maxHeight="500px"
      isMonospaced={false}
      value={defaultAnswer?.text || ''}
      defaultValue={undefined}
      resize="smart"
      spellCheck={false}
      theme={undefined}
      onBlur={undefined}
      onChange={undefined}
      onFocus={undefined}
    />
  );
};
