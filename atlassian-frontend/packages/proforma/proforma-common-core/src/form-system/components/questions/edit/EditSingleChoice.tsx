import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { RadioGroup } from '@atlaskit/radio';
import SectionMessage from '@atlaskit/section-message';

import { SelectOption } from '../../../models/SelectOption';
import { ChoiceQuestionStyles } from '../common/commonStyles';
import {
  ChoiceFieldWrapper,
  ChoicePlaceholder,
} from '../common/questionWrappers';

import { EditOtherOption } from './EditOtherOption';

type EditSingleChoiceProps = {
  id: string;
  options?: SelectOption[];
  value?: SelectOption;
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

export const EditSingleChoice: FC<EditSingleChoiceProps> = ({
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
              <RadioGroup
                name={id}
                options={options}
                value={value?.value ?? null} // When `undefined` this is an uncontrolled component and uses internal state.
                onChange={onChange}
              />
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
