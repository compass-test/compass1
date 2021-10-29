import React from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { FormChoice } from '@atlassian/proforma-common-core/form-system-models';

interface ConditionChoicesProps {
  choices: FormChoice[];
  selectedChoiceIds: string[];
  onChange: (newChoices: string[]) => void;
}

export const ConditionChoices: React.FC<ConditionChoicesProps> = ({
  choices,
  selectedChoiceIds,
  onChange,
}) => {
  const handleCheckboxEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedChoiceId = e.target.value;
    let newChoices = [...selectedChoiceIds];
    if (newChoices.includes(selectedChoiceId)) {
      newChoices = newChoices.filter(choiceId => choiceId !== selectedChoiceId);
    } else {
      newChoices.push(selectedChoiceId);
    }
    onChange(newChoices);
  };

  const isChoiceSelected = (choiceId: string): boolean => {
    return selectedChoiceIds.includes(choiceId);
  };

  const getAvailableChoices = (): React.ReactElement[] => {
    return choices.map(choice => (
      <Checkbox
        key={choice.id}
        label={choice.label}
        value={choice.id}
        name={choice.label}
        onChange={handleCheckboxEvent}
        isChecked={isChoiceSelected(choice.id)}
      />
    ));
  };

  const availableChoices = getAvailableChoices();
  return <div>{availableChoices}</div>;
};
