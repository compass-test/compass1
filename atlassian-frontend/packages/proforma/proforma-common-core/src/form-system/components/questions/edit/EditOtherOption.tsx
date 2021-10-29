import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Textfield from '@atlaskit/textfield';

import {
  EditChoiceMessage,
  IntlEditChoiceMessages,
} from './EditChoiceMessages.intl';

type EditOtherOptionProps = {
  dropdown: boolean;
  isDisabled: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditOtherOption = injectIntl(
  ({
    dropdown,
    isDisabled,
    value,
    onChange,
    intl,
  }: EditOtherOptionProps & InjectedIntlProps) => {
    const TextWrapper = dropdown
      ? OptionalTextWrapperDropdown
      : OptionalTextWrapper;
    return (
      <TextWrapper>
        <Textfield
          value={value}
          width="small"
          isDisabled={isDisabled}
          onChange={onChange}
          placeholder={intl.formatMessage(
            IntlEditChoiceMessages[EditChoiceMessage.NewOptionPlaceholder],
          )}
        />
      </TextWrapper>
    );
  },
);

const OptionalTextWrapper = styled.div`
  margin-left: 28px;
`;

const OptionalTextWrapperDropdown = styled.div`
  margin-top: 5px;
`;
