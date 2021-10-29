import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Select, { GroupedOptionsType, ValueType } from '@atlaskit/select';
import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';
import {
  IntlQuestionTypeMessages,
  QuestionTypeMessage,
} from '@atlassian/proforma-common-core/jira-common';

import { CheckBoxIcon } from '../customIcons/CheckBoxIcon';
import { DateIcon } from '../customIcons/DateIcon';
import { DateTimeIcon } from '../customIcons/DateTimeIcon';
import { DropdownIcon } from '../customIcons/DropdownIcon';
import { EmailIcon } from '../customIcons/EmailIcon';
import { LongTextIcon } from '../customIcons/LongTextIcon';
import { MultipleUsersIcon } from '../customIcons/MultipleUsersIcon';
import { NumberIcon } from '../customIcons/NumberIcon';
import { ParagraphIcon } from '../customIcons/ParagraphIcon';
import { RadioIcon } from '../customIcons/RadioIcon';
import { ShortTextIcon } from '../customIcons/ShortTextIcon';
import { SingleUserIcon } from '../customIcons/SingleUserIcon';
import { TimeIcon } from '../customIcons/TimeIcon';
import { UrlIcon } from '../customIcons/UrlIcon';

import {
  IntlQuestionTypeDropdownMessages,
  QuestionTypeDropdownMessage,
} from './QuestionTypeDropdownMessages.intl';
import { SideBarSelectStyles } from './styles';

interface QuestionTypeDropdownProps {
  value: FormQuestionType;
  onChange: (value: FormQuestionType) => void;
}

interface QuestionTypeOption {
  label: React.ReactNode;
  value: FormQuestionType;
  icon: JSX.Element;
}

const Option = styled.div`
  display: flex;
  align-items: center;
`;

const OptionLabel = styled.span`
  padding-left: 8px;
`;

export const QuestionTypeDropdown: React.FunctionComponent<QuestionTypeDropdownProps> = props => {
  const { value, onChange } = props;

  const types: Record<FormQuestionType, QuestionTypeOption> = {
    [FormQuestionType.TextShort]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.TextShortLabel]}
        />
      ),
      value: FormQuestionType.TextShort,
      icon: <ShortTextIcon />,
    },
    [FormQuestionType.TextLong]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.TextLongLabel]}
        />
      ),
      value: FormQuestionType.TextLong,
      icon: <LongTextIcon />,
    },
    [FormQuestionType.TextParagraph]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.TextParagraphLabel]}
        />
      ),
      value: FormQuestionType.TextParagraph,
      icon: <ParagraphIcon />,
    },
    [FormQuestionType.TextEmail]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.TextEmailLabel]}
        />
      ),
      value: FormQuestionType.TextEmail,
      icon: <EmailIcon />,
    },
    [FormQuestionType.TextUrl]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.TextUrlLabel]}
        />
      ),
      value: FormQuestionType.TextUrl,
      icon: <UrlIcon />,
    },
    [FormQuestionType.ChoiceSingle]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.ChoiceSingleLabel]}
        />
      ),
      value: FormQuestionType.ChoiceSingle,
      icon: <RadioIcon />,
    },
    [FormQuestionType.ChoiceMultiple]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.ChoiceMultipleLabel]}
        />
      ),
      value: FormQuestionType.ChoiceMultiple,
      icon: <CheckBoxIcon />,
    },
    [FormQuestionType.ChoiceDropdown]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.ChoiceDropdownLabel]}
        />
      ),
      value: FormQuestionType.ChoiceDropdown,
      icon: <DropdownIcon />,
    },
    [FormQuestionType.ChoiceDropdownMultiple]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[
            QuestionTypeMessage.ChoiceDropdownMultipleLabel
          ]}
        />
      ),
      value: FormQuestionType.ChoiceDropdownMultiple,
      icon: <DropdownIcon />,
    },
    [FormQuestionType.Date]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.DateLabel]}
        />
      ),
      value: FormQuestionType.Date,
      icon: <DateIcon />,
    },
    [FormQuestionType.DateTime]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.DateTimeLabel]}
        />
      ),
      value: FormQuestionType.DateTime,
      icon: <DateTimeIcon />,
    },
    [FormQuestionType.Time]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.TimeLabel]}
        />
      ),
      value: FormQuestionType.Time,
      icon: <TimeIcon />,
    },
    [FormQuestionType.Number]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.NumberLabel]}
        />
      ),
      value: FormQuestionType.Number,
      icon: <NumberIcon />,
    },
    [FormQuestionType.UserSingle]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.UserSingleLabel]}
        />
      ),
      value: FormQuestionType.UserSingle,
      icon: <SingleUserIcon />,
    },
    [FormQuestionType.UserMultiple]: {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[QuestionTypeMessage.UserMultipleLabel]}
        />
      ),
      value: FormQuestionType.UserMultiple,
      icon: <MultipleUsersIcon />,
    },
  };

  const questionTypeOptions: GroupedOptionsType<QuestionTypeOption> = [
    {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[
            QuestionTypeMessage.TextQuestionsGroupLabel
          ]}
        />
      ),
      options: [
        types[FormQuestionType.TextShort],
        types[FormQuestionType.TextLong],
        types[FormQuestionType.TextParagraph],
        types[FormQuestionType.TextEmail],
        types[FormQuestionType.TextUrl],
      ],
    },
    {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[
            QuestionTypeMessage.ChoiceQuestionsGroupLabel
          ]}
        />
      ),
      options: [
        types[FormQuestionType.ChoiceSingle],
        types[FormQuestionType.ChoiceMultiple],
        types[FormQuestionType.ChoiceDropdown],
        types[FormQuestionType.ChoiceDropdownMultiple],
      ],
    },
    {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[
            QuestionTypeMessage.DateQuestionsGroupLabel
          ]}
        />
      ),
      options: [
        types[FormQuestionType.Date],
        types[FormQuestionType.DateTime],
        types[FormQuestionType.Time],
      ],
    },
    {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[
            QuestionTypeMessage.NumericQuestionsGroupLabel
          ]}
        />
      ),
      options: [types[FormQuestionType.Number]],
    },
    {
      label: (
        <FormattedMessage
          {...IntlQuestionTypeMessages[
            QuestionTypeMessage.UserQuestionsGroupLabel
          ]}
        />
      ),
      options: [
        types[FormQuestionType.UserSingle],
        types[FormQuestionType.UserMultiple],
      ],
    },
  ];

  return (
    <Select
      placeholder={
        <FormattedMessage
          {...IntlQuestionTypeDropdownMessages[
            QuestionTypeDropdownMessage.ChooseAQuestionType
          ]}
        />
      }
      options={questionTypeOptions}
      value={types[value]}
      onChange={(v: ValueType<QuestionTypeOption>) => onChange(v!.value)}
      formatOptionLabel={option => (
        <Option>
          {option.icon}
          <OptionLabel>{option.label}</OptionLabel>
        </Option>
      )}
      styles={SideBarSelectStyles}
    />
  );
};
