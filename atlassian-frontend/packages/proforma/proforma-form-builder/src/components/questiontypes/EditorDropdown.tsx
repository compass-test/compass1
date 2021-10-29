import React from 'react';

import Select from '@atlaskit/select';
import { OptionType } from '@atlaskit/select/types';
import {
  FormChoice,
  QuestionParameters,
} from '@atlassian/proforma-common-core/form-system-models';

export const EditorDropdown: React.FunctionComponent<QuestionParameters> = question => {
  const { id, defaultAnswer, choices } = question;
  const options: OptionType[] = (choices || []).map((choice: FormChoice) => {
    return {
      label: choice.label,
      value: choice.id,
    };
  });

  let selectedOption: OptionType | undefined | null = null;
  if (defaultAnswer?.choices?.length) {
    const choiceId = defaultAnswer.choices[0];
    if (choiceId !== undefined) {
      selectedOption = options.find(
        (option: OptionType) => option.value === choiceId,
      );
    }
  }

  return (
    <Select
      autoFocus={false}
      instanceId={`pf-fb-questionview-${id}`}
      isInvalid={false}
      isDisabled={true}
      value={selectedOption}
    />
  );
};
