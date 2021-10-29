import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { Checkbox } from '@atlaskit/checkbox';
import SectionMessage from '@atlaskit/section-message';
import { ValueType } from '@atlaskit/select';

import { SelectOption } from '../../../models/SelectOption';
import { ChoiceQuestionStyles } from '../common/commonStyles';
import {
  ChoiceFieldWrapper,
  ChoicePlaceholder,
} from '../common/questionWrappers';

import { EditOtherOption } from './EditOtherOption';

type EditMultiChoiceProps = {
  id: string;
  options?: SelectOption[];
  value?: ValueType<SelectOption, true>;
  isInvalid: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  hasOtherOption: boolean;
  otherOptionSelected: boolean;
  otherOptionText?: string;
  onOtherOptionTextChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  warningMessage?: ReactIntl.FormattedMessage.MessageDescriptor;
};

export const EditMultiChoice: FC<EditMultiChoiceProps> = ({
  id,
  options,
  value,
  isInvalid,
  onChange,
  hasOtherOption,
  otherOptionSelected,
  otherOptionText,
  onOtherOptionTextChange,
  warningMessage,
}) => {
  return (
    <>
      <ChoiceFieldWrapper isDisabled={false} isInvalid={isInvalid}>
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
                    onChange={onChange}
                  />
                ))}
              </div>
            </ChoiceQuestionStyles>
          ) : (
            <ChoicePlaceholder />
          )}
          {hasOtherOption && (
            <EditOtherOption
              dropdown={false}
              value={otherOptionText}
              isDisabled={!otherOptionSelected}
              onChange={onOtherOptionTextChange}
            />
          )}
        </div>
      </ChoiceFieldWrapper>
      {warningMessage && (
        <SectionMessage appearance="warning">
          <FormattedMessage {...warningMessage} />
        </SectionMessage>
      )}
    </>
  );
};
