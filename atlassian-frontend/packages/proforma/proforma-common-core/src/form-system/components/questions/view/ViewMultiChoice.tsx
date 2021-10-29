import React, { FC } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { ValueType } from '@atlaskit/select';

import { SelectOption } from '../../../models/SelectOption';
import { ChoiceQuestionStyles } from '../common/commonStyles';
import {
  ChoiceFieldWrapper,
  ChoicePlaceholder,
} from '../common/questionWrappers';

import { ViewOtherOption } from './ViewOtherOption';

type ViewMultiChoiceProps = {
  id: string;
  value?: ValueType<SelectOption, true>;
  options?: SelectOption[];
  hasOtherOption: boolean;
  otherOptionText?: string;
};

export const ViewMultiChoice: FC<ViewMultiChoiceProps> = ({
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
            <div id={id}>
              {options.map(option => (
                <Checkbox
                  name={id}
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  isChecked={value?.includes(option)}
                />
              ))}
            </div>
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
