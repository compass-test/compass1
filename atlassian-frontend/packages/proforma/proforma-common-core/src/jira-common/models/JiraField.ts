import { FormChoice, FormQuestionType } from '../../form-system/models/Form';
import { ChoiceApi } from '../../form-system/stores/ChoiceApi';

import {
  IntlJiraFieldMessages,
  JiraFieldMessage,
} from './JiraFieldMessages.intl';
import {
  IntlQuestionTypeMessages,
  QuestionTypeMessage,
} from './QuestionTypeMessages.intl';

export enum JiraFieldType {
  Date = 'date',
  DateTime = 'datetime',
  InsightObject = 'insightobject',
  InsightObjects = 'insightobjects',
  MultiChoice = 'multichoice',
  MultiUser = 'multiuser',
  Number = 'number',
  SingleChoice = 'singlechoice',
  SingleUser = 'singleuser',
  Text = 'text',
  Url = 'url',
  Unsupported = 'unsupported',
  None = '',
}

const jiraFieldTypeToQuestionTypeAry: [JiraFieldType, FormQuestionType[]][] = [
  [JiraFieldType.Date, [FormQuestionType.Date]],
  [JiraFieldType.DateTime, [FormQuestionType.DateTime]],
  [
    JiraFieldType.InsightObject,
    [FormQuestionType.ChoiceSingle, FormQuestionType.ChoiceDropdown],
  ],
  [
    JiraFieldType.InsightObjects,
    [FormQuestionType.ChoiceMultiple, FormQuestionType.ChoiceDropdownMultiple],
  ],
  [
    JiraFieldType.MultiChoice,
    [FormQuestionType.ChoiceMultiple, FormQuestionType.ChoiceDropdownMultiple],
  ],
  [JiraFieldType.MultiUser, [FormQuestionType.UserMultiple]],
  [JiraFieldType.Number, [FormQuestionType.Number]],
  [
    JiraFieldType.SingleChoice,
    [FormQuestionType.ChoiceSingle, FormQuestionType.ChoiceDropdown],
  ],
  [JiraFieldType.SingleUser, [FormQuestionType.UserSingle]],
  [
    JiraFieldType.Text,
    [
      FormQuestionType.TextShort,
      FormQuestionType.TextLong,
      FormQuestionType.TextParagraph,
    ],
  ],
  [JiraFieldType.Url, [FormQuestionType.TextUrl]],
];

export const jiraFieldTypeToQuestionTypeMap = new Map<
  JiraFieldType,
  FormQuestionType[]
>(jiraFieldTypeToQuestionTypeAry);

export interface JiraField {
  key: string;
  name: string;
  fieldType: JiraFieldType;
  choiceApi?: ChoiceApi;
  choices?: FormChoice[];
  hasMoreChoices?: boolean;
  readOnly?: boolean;
}

const jiraFieldTypeDescriptions: Record<
  JiraFieldType,
  ReactIntl.FormattedMessage.MessageDescriptor
> = {
  [JiraFieldType.Text]: IntlJiraFieldMessages[JiraFieldMessage.TextLabel],
  [JiraFieldType.Date]: IntlQuestionTypeMessages[QuestionTypeMessage.DateLabel],
  [JiraFieldType.DateTime]:
    IntlQuestionTypeMessages[QuestionTypeMessage.DateTimeLabel],
  [JiraFieldType.InsightObject]:
    IntlJiraFieldMessages[JiraFieldMessage.ChoiceSingleLabel],
  [JiraFieldType.InsightObjects]:
    IntlJiraFieldMessages[JiraFieldMessage.ChoiceMultipleLabel],
  [JiraFieldType.MultiChoice]:
    IntlJiraFieldMessages[JiraFieldMessage.ChoiceMultipleLabel],
  [JiraFieldType.MultiUser]:
    IntlQuestionTypeMessages[QuestionTypeMessage.UserMultipleLabel],
  [JiraFieldType.Number]:
    IntlQuestionTypeMessages[QuestionTypeMessage.NumberLabel],
  [JiraFieldType.SingleChoice]:
    IntlJiraFieldMessages[JiraFieldMessage.ChoiceSingleLabel],
  [JiraFieldType.SingleUser]:
    IntlQuestionTypeMessages[QuestionTypeMessage.UserSingleLabel],
  [JiraFieldType.Url]:
    IntlQuestionTypeMessages[QuestionTypeMessage.TextUrlLabel],
  [JiraFieldType.Unsupported]:
    IntlJiraFieldMessages[JiraFieldMessage.UnsupportedLabel],
  [JiraFieldType.None]: IntlJiraFieldMessages[JiraFieldMessage.NoneLabel],
};

export function jiraFieldTypeDescription(
  fieldType: JiraFieldType,
): ReactIntl.FormattedMessage.MessageDescriptor {
  return (
    jiraFieldTypeDescriptions[fieldType] ||
    IntlJiraFieldMessages[JiraFieldMessage.NoneLabel]
  );
}
