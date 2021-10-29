import React from 'react';

import Select, { ValueType } from '@atlaskit/select';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

import { SideBarSelectStyles } from '../styles';

interface QuestionDropdownProps {
  questions: QuestionParameters[];
  currentQuestion?: QuestionParameters;
  onChange: (newQuestion?: QuestionParameters) => void;
}

export const QuestionDropdown: React.FC<QuestionDropdownProps> = ({
  questions,
  currentQuestion,
  onChange,
}) => {
  const options = questions.map(question => ({
    value: question.id,
    label: question.label,
  }));
  const currentValue = currentQuestion
    ? { value: currentQuestion.id, label: currentQuestion.label }
    : undefined;

  const handleSelectChange = (
    newValue: ValueType<{ value: number; label: string }>,
  ): void => {
    // @ts-ignore
    const selectedQuestion = questions.find(
      question => question.id === newValue?.value,
    );
    onChange(selectedQuestion);
  };

  return (
    <Select
      options={options}
      value={currentValue}
      onChange={handleSelectChange}
      styles={SideBarSelectStyles}
    />
  );
};
