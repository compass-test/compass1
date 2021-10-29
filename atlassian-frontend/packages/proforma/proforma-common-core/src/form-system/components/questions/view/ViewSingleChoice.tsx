import React, { FC } from 'react';

import { RadioGroup } from '@atlaskit/radio';

import { SelectOption } from '../../../models/SelectOption';
import { ChoiceQuestionStyles } from '../common/commonStyles';
import {
  ChoiceFieldWrapper,
  ChoicePlaceholder,
} from '../common/questionWrappers';

import { ViewOtherOption } from './ViewOtherOption';

type ViewSingleChoiceProps = {
  id: string;
  value?: SelectOption;
  options?: SelectOption[];
  hasOtherOption: boolean;
  otherOptionText?: string;
};

export const ViewSingleChoice: FC<ViewSingleChoiceProps> = ({
  id,
  value,
  options,
  hasOtherOption,
  otherOptionText,
}) => {
  return (
    <ChoiceFieldWrapper isDisabled>
      <div>
        {options?.length ? (
          <ChoiceQuestionStyles>
            <RadioGroup name={id} value={value?.value} options={options} />
          </ChoiceQuestionStyles>
        ) : (
          <ChoicePlaceholder />
        )}
        <ViewOtherOption
          dropdown={false}
          display={hasOtherOption}
          value={otherOptionText}
        />
      </div>
    </ChoiceFieldWrapper>
  );
};
