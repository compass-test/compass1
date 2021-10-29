import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import { RadioGroup } from '@atlaskit/radio';
import Textfield from '@atlaskit/textfield';
import {
  ChoicePlaceholder,
  EditChoiceMessage,
  IntlEditChoiceMessages,
} from '@atlassian/proforma-common-core/form-system';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

import { ChoiceQuestionStyles } from './styles';

interface EditorSingleChoiceProps extends QuestionParameters {}

export const EditorSingleChoice = injectIntl(
  ({
    defaultAnswer,
    choices,
    intl,
  }: EditorSingleChoiceProps & InjectedIntlProps) => {
    const hasOtherChoice =
      choices && choices.findIndex(choice => choice.other) >= 0;

    return (
      <ChoiceQuestionStyles>
        {choices && choices.length ? (
          <RadioGroup
            value={
              defaultAnswer?.choices?.length ? defaultAnswer.choices[0] : ''
            }
            options={choices.map(item => {
              return {
                name: item.label,
                label: item.label,
                value: item.id.toString(),
              };
            })}
          />
        ) : (
          <ChoicePlaceholder />
        )}
        {hasOtherChoice && (
          <OtherDiv>
            <Textfield
              width="small"
              placeholder={intl.formatMessage(
                IntlEditChoiceMessages[EditChoiceMessage.NewOptionPlaceholder],
              )}
            />
          </OtherDiv>
        )}
      </ChoiceQuestionStyles>
    );
  },
);

const OtherDiv = styled.div`
  margin-left: 28px;
`;
