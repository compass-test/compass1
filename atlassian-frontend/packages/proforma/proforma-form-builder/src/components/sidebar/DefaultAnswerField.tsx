import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import { DatePicker, TimePicker } from '@atlaskit/datetime-picker';
import { ValueType } from '@atlaskit/select';
import { OptionType } from '@atlaskit/select/types';
import Textfield from '@atlaskit/textfield';
import { N800 } from '@atlaskit/theme/colors';
import { DateTimePicker } from '@atlassian/proforma-common-core/form-system';
import {
  FormChoice,
  QuestionParametersAnswer,
} from '@atlassian/proforma-common-core/form-system-models';
import {
  DataConnectionResponse,
  JiraField,
} from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../models/FormBuilderReferenceData';

import { MultipleChoiceSelect } from './choices/MultipleChoiceSelect';
import { SingleChoiceSelect } from './choices/SingleChoiceSelect';
import {
  DefaultAnswerFieldMessage,
  IntlDefaultAnswerFieldMessages,
} from './DefaultAnswerFieldMessages.intl';
import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from './QuestionSidebarMessages.intl';
import { SideBarSelectStyles } from './styles';

interface DefaultAnswerFieldProps {
  type: string;
  value?: QuestionParametersAnswer;
  jiraField?: JiraField;
  dataConnection?: DataConnectionResponse;
  refData: FormBuilderReferenceData;
  choices: FormChoice[];
  onChange: (answer?: QuestionParametersAnswer) => void;
}

const darkSelectProps = { styles: SideBarSelectStyles };

export const DefaultAnswerField = injectIntl(
  ({
    type,
    value,
    onChange,
    jiraField,
    dataConnection,
    refData,
    choices,
    intl,
  }: DefaultAnswerFieldProps & InjectedIntlProps) => {
    const label = (
      <GroupLabel>
        <FormattedMessage
          {...IntlQuestionSidebarMessages[QuestionSidebarMessage.DefaultAnswer]}
        />
      </GroupLabel>
    );

    const placeholder = intl.formatMessage(
      IntlQuestionSidebarMessages[
        QuestionSidebarMessage.DefaultAnswerPlaceholder
      ],
    );

    let defaultValue;

    switch (type) {
      case 'pg':
      case 'te':
      case 'tl':
      case 'ts':
      case 'tu':
        defaultValue = (value && value.text) || '';
        return (
          <>
            {label}
            <Textfield
              value={defaultValue}
              isReadOnly={false}
              placeholder={placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(
                  e.target.value !== undefined ? { text: e.target.value } : {},
                );
              }}
            />
          </>
        );
      case 'no':
        defaultValue = (value && value.text) || '';
        return (
          <>
            {label}
            <Textfield
              value={defaultValue}
              isReadOnly={false}
              placeholder={placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value.trim().replace(/[^\d.-]/g, '');
                onChange(newValue !== undefined ? { text: newValue } : {});
              }}
            />
          </>
        );
      case 'da':
        defaultValue = (value && value.date) || '';
        return (
          <>
            {label}
            <DatePicker
              id="date"
              value={defaultValue}
              placeholder={placeholder}
              locale={intl && intl.locale ? intl.locale : 'en-US'}
              selectProps={darkSelectProps}
              onChange={(e: string) => {
                onChange(e !== undefined ? { date: e.trim() } : {});
              }}
            />
          </>
        );
      case 'ti':
        defaultValue = (value && value.time) || '';
        return (
          <>
            {label}
            <TimePicker
              id="time"
              value={defaultValue}
              placeholder={placeholder}
              selectProps={darkSelectProps}
              timeIsEditable
              onChange={(e: string) => {
                onChange(e !== undefined ? { time: e.trim() } : {});
              }}
            />
          </>
        );
      case 'dt':
        const defaultDateValue = (value && value.date) || '';
        const defaultTimeValue = (value && value.time) || '';
        return (
          <>
            {label}
            <DateTimePicker
              dark
              dateValue={defaultDateValue || ''}
              timeValue={defaultTimeValue || ''}
              onDateChange={(newDateValue: string | undefined) => {
                onChange(
                  newDateValue !== undefined
                    ? { date: newDateValue.trim(), time: defaultTimeValue }
                    : {},
                );
              }}
              onTimeChange={(newTimeValue: string | undefined) => {
                onChange(
                  newTimeValue !== undefined
                    ? { date: defaultDateValue, time: newTimeValue.trim() }
                    : {},
                );
              }}
              datePlaceholder={intl.formatMessage(
                IntlDefaultAnswerFieldMessages[
                  DefaultAnswerFieldMessage.DatePlaceholder
                ],
              )}
              timePlaceholder={intl.formatMessage(
                IntlDefaultAnswerFieldMessages[
                  DefaultAnswerFieldMessage.TimePlaceholder
                ],
              )}
              locale={intl && intl.locale ? intl.locale : 'en-US'}
            />
          </>
        );
      case 'cd':
      case 'cs':
        defaultValue = (value && value.choices) || [];
        return (
          <>
            {label}
            <SingleChoiceSelect
              noResponse
              placeholder={placeholder}
              isDisabled={false}
              value={defaultValue.length > 0 ? defaultValue[0] : ''}
              jiraField={jiraField}
              dataConnection={dataConnection}
              refData={refData}
              choices={choices}
              onChange={(v: ValueType<FormChoice>) => {
                const choiceId = (v as FormChoice).id;
                onChange(
                  choiceId !== undefined && choiceId !== ''
                    ? { choices: [choiceId] }
                    : {},
                );
              }}
            />
          </>
        );
      case 'cm':
      case 'cl':
        return (
          <>
            {label}
            <MultipleChoiceSelect
              placeholder={placeholder}
              isDisabled={false}
              values={value && value.choices ? value.choices : []}
              jiraField={jiraField}
              dataConnection={dataConnection}
              refData={refData}
              choices={choices}
              onChange={(v: ValueType<OptionType>) => {
                if (v && v.length > 0) {
                  const choiceIds = ((v as any) as OptionType[]).map(
                    (option: OptionType) => String(option.value),
                  );
                  onChange({ choices: choiceIds });
                } else {
                  onChange({});
                }
              }}
            />
          </>
        );
      default:
        return <></>;
    }
  },
);

const GroupLabel = styled.div`
  font-size: 12px;
  font-style: inherit;
  line-height: 1.33333;
  color: ${N800};
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 4px;
`;
