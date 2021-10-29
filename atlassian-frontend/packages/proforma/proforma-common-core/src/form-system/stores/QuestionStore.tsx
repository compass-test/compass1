import { action, computed, observable } from 'mobx';
import { InjectedIntl } from 'react-intl';

import { isInsightChoiceApi } from '../../jira-common/models';
import {
  ChoiceMessage,
  IntlChoiceMessages,
} from '../components/questions/ChoiceMessages.intl';
import { SelectOption } from '../models';
import {
  FormAnswer,
  FormAnswerEmpty,
  FormChoice,
  FormQuestion,
  FormQuestionType,
} from '../models/Form';
import {
  ChoiceValidationError,
  DateTimeValidationError,
  NumberValidationError,
  TextValidationError,
  UserPickerValidationError,
  ValidationError,
} from '../utils/validation/validationErrorMessages.intl';
import {
  getChoiceValidation,
  getDateTimeValidation,
  getDateValidation,
  getNumberValidation,
  getTextValidation,
  getTimeValidation,
  getUserPickerValidation,
} from '../utils/validation/validators';

import { ChoiceApi, ProFormaChoiceApi } from './ChoiceApi';

type Answer = any; // TODO: EVAN: The answer type should be clarified/restricted.

export class QuestionStore {
  public readonly id: number;
  public readonly formQuestion: FormQuestion;
  public readonly conditions: number[];
  public readonly hasJiraField: boolean;
  public readonly hasDataConnection: boolean;
  @observable public answer?: Answer;
  @observable public modifiedAnswer?: Answer;
  @observable public validating: boolean = false;
  @observable public choiceApi: ChoiceApi = ProFormaChoiceApi;
  @observable public readonly choices: FormChoice[] = [];
  @observable public readonly savedInsightChoices: FormChoice[] = [];
  @observable public readonly modifiedInsightChoices: FormChoice[] = [];
  @observable public readonly searchedInsightChoices: FormChoice[] = [];
  @observable public hasMoreChoices?: boolean;
  @observable public otherChoiceId?: string;
  @observable public revisionToken: string;

  private readonly setFormStoreLastUpdated: (revisionToken: string) => void;

  public constructor(
    setFormStoreLastUpdated: (revisionToken: string) => void,
    questionKey: string,
    formQuestion: FormQuestion,
    choiceApi?: ChoiceApi,
    hasMoreChoices?: boolean,
    currentAnswer?: FormAnswer,
  ) {
    this.setFormStoreLastUpdated = setFormStoreLastUpdated;
    this.id = parseInt(questionKey, 10);
    this.revisionToken = `${this.id}-${Date.now()}`;
    this.formQuestion = formQuestion;
    this.conditions =
      formQuestion.conditions?.map(condition => parseInt(condition)) || [];
    this.hasJiraField = !!formQuestion.jiraField;
    this.hasDataConnection = !!formQuestion.dcId;
    this.choices.splice(
      0,
      this.choices.length,
      ...(formQuestion.choices || []),
    );
    if (choiceApi) {
      this.choiceApi = choiceApi;
    }
    this.hasMoreChoices = hasMoreChoices;
    const otherChoice = this.choices.find(choice => choice.other);
    this.otherChoiceId = otherChoice ? otherChoice.id : undefined;

    this.answer = extractAnswer(
      formQuestion.type,
      currentAnswer || FormAnswerEmpty,
    );

    switch (formQuestion.type) {
      case FormQuestionType.TextEmail:
        this.formQuestion.validation.rgx = {
          p: /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/,
        };
        break;
      case FormQuestionType.TextUrl:
        this.formQuestion.validation.rgx = {
          p: /((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/,
        };
        break;
      default:
    }

    this._update(true, formQuestion, currentAnswer);
  }

  @computed
  public get answerModified(): boolean {
    return this.modifiedAnswer !== undefined;
  }

  @computed
  public get currentAnswer(): Answer {
    if (this.modifiedAnswer !== undefined) {
      return this.modifiedAnswer;
    }
    if (this.answer !== null) {
      return this.answer;
    }
    return FormAnswerEmpty;
  }

  @computed
  public get isInsightQuestion() {
    return this.hasJiraField && isInsightChoiceApi(this.choiceApi);
  }

  @computed
  public get validationErrors():
    | ValidationError[]
    | TextValidationError[]
    | NumberValidationError[]
    | DateTimeValidationError[]
    | ChoiceValidationError[]
    | UserPickerValidationError[]
    | null {
    if (this.answerModified || this.validating) {
      switch (this.formQuestion.type) {
        case FormQuestionType.TextShort:
        case FormQuestionType.TextLong:
        case FormQuestionType.TextParagraph:
          return getTextValidation(
            this.formQuestion.validation,
            this.currentAnswer,
          );
        case FormQuestionType.TextEmail:
          return getTextValidation(
            this.formQuestion.validation,
            this.currentAnswer,
            FormQuestionType.TextEmail,
          );
        case FormQuestionType.TextUrl:
          return getTextValidation(
            this.formQuestion.validation,
            this.currentAnswer,
            FormQuestionType.TextUrl,
          );
        case FormQuestionType.Number:
          return getNumberValidation(
            this.formQuestion.validation,
            this.currentAnswer,
          );
        case FormQuestionType.DateTime:
          return getDateTimeValidation(
            this.formQuestion.validation,
            this.currentAnswer,
          );
        case FormQuestionType.Date:
          return getDateValidation(
            this.formQuestion.validation,
            this.currentAnswer,
          );
        case FormQuestionType.Time:
          return getTimeValidation(
            this.formQuestion.validation,
            this.currentAnswer,
          );
        case FormQuestionType.ChoiceSingle:
        case FormQuestionType.ChoiceMultiple:
        case FormQuestionType.ChoiceDropdown:
        case FormQuestionType.ChoiceDropdownMultiple:
          return getChoiceValidation(
            this.formQuestion.validation,
            this.choices,
            this.currentAnswer,
          );
        case FormQuestionType.UserSingle:
        case FormQuestionType.UserMultiple:
          return getUserPickerValidation(
            this.formQuestion.validation,
            this.currentAnswer,
          );
        default:
          return null;
      }
    }
    return null;
  }

  /**
   * Return a list of selected choices AND all choices.
   * This is used when a question supports search, so the dropdown can show selected items as well as those returned from a search query.
   */
  @computed
  public get currentAndSearchChoices(): FormChoice[] {
    const insightChoices = this.modifiedInsightChoices.length
      ? this.modifiedInsightChoices
      : this.savedInsightChoices;
    const allChoices = [
      ...insightChoices,
      ...this.searchedInsightChoices,
      ...this.choices,
    ];
    const lookup = new Map();
    allChoices.forEach(choice => lookup.set(choice.id, choice));
    return [...lookup.values()];
  }

  public availableOptions = (intl: InjectedIntl): SelectOption[] => {
    const choices = this.isInsightQuestion
      ? this.currentAndSearchChoices
      : this.choices;
    return choices.map(choice => {
      return {
        label: choice.other
          ? intl.formatMessage(
              IntlChoiceMessages[ChoiceMessage.OtherPlaceholder],
            )
          : choice.label,
        value: choice.id,
      } as SelectOption;
    });
  };

  @action private setLastUpdated = (): void => {
    this.revisionToken = `${this.id}-${Date.now()}`;
    this.setFormStoreLastUpdated(this.revisionToken);
  };

  @action public setAnswer = (answer: Answer): void => {
    this.modifiedAnswer = answer;
    this.setLastUpdated();
  };

  @action public setInsightAnswers = (currentChoiceIds: string[]): void => {
    // map the choice ids from the answer to insight choices
    const insightChoices = [
      ...this.savedInsightChoices,
      ...this.modifiedInsightChoices,
      ...this.searchedInsightChoices,
    ];
    this.modifiedInsightChoices.splice(
      0,
      this.modifiedInsightChoices.length,
      ...currentChoiceIds
        .map(id => insightChoices.findIndex(c => c.id === id))
        .filter(index => index >= 0)
        .map(index => insightChoices[index]),
    );
    this.setLastUpdated();
  };

  @action public validate = (): void => {
    this.validating = true;
  };

  @action public hideValidation = (): void => {
    this.validating = false;
    this.setLastUpdated();
  };

  @action public discardModifiedAnswer = (): void => {
    this.modifiedAnswer = undefined;
    this.modifiedInsightChoices.splice(0, this.modifiedInsightChoices.length);
    this.setLastUpdated();
  };

  @action public setAnswerFromFieldValue = (answer: FormAnswer) => {
    this.answer = extractAnswer(this.formQuestion.type, answer);
    this.modifiedAnswer = undefined;
    this.setLastUpdated();
  };

  @action public setInsightChoices = (choices: FormChoice[]) => {
    this.savedInsightChoices.splice(
      0,
      this.savedInsightChoices.length,
      ...choices,
    );
    this.setLastUpdated();
  };

  @action public setChoices = (choices: FormChoice[]) => {
    this.choices.splice(0, this.choices.length, ...choices);
    const otherChoice = choices.find(choice => choice.other);
    this.otherChoiceId = otherChoice?.id;
    this.setLastUpdated();
  };

  @action public setSearchedInsightChoices = (
    insightSearchChoices: FormChoice[],
  ) => {
    this.searchedInsightChoices.splice(
      0,
      this.searchedInsightChoices.length,
      ...insightSearchChoices,
    );
    this.setLastUpdated();
  };

  @action public setChoiceApi = (choiceApi: ChoiceApi) => {
    this.choiceApi = choiceApi;
  };

  @action public update = (
    formQuestion: FormQuestion,
    currentAnswer: FormAnswer,
  ) => this._update(false, formQuestion, currentAnswer);

  private _update = (
    constructing: boolean,
    formQuestion: FormQuestion,
    currentAnswer?: FormAnswer,
  ) => {
    this.choices.splice(
      0,
      this.choices.length,
      ...(formQuestion.choices || []),
    );
    this.otherChoiceId = this.choices.find(choice => choice.other)?.id;
    this.answer = extractAnswer(
      formQuestion.type,
      currentAnswer || formQuestion.defaultAnswer || FormAnswerEmpty,
    );
    if (!constructing) {
      if (this.modifiedInsightChoices) {
        this.savedInsightChoices.splice(
          0,
          this.savedInsightChoices.length,
          ...this.modifiedInsightChoices,
        );
      }
      this.searchedInsightChoices.splice(0, this.searchedInsightChoices.length);
      this.hideValidation();
      this.discardModifiedAnswer();
      this.setLastUpdated();
    }
  };
}

const extractAnswer = (
  questionType: FormQuestionType,
  answer: FormAnswer,
): Answer => {
  switch (questionType) {
    case FormQuestionType.TextShort:
    case FormQuestionType.TextLong:
    case FormQuestionType.TextParagraph:
    case FormQuestionType.TextEmail:
    case FormQuestionType.TextUrl:
      return answer.text || '';
    case FormQuestionType.Number:
      return answer.text || '';
    case FormQuestionType.DateTime:
      return { date: answer.date || '', time: answer.time || '' };
    case FormQuestionType.Date:
      return answer.date || '';
    case FormQuestionType.Time:
      return answer.time || '';
    case FormQuestionType.ChoiceSingle:
    case FormQuestionType.ChoiceMultiple:
    case FormQuestionType.ChoiceDropdown:
    case FormQuestionType.ChoiceDropdownMultiple:
      return { text: answer.text || '', choices: answer.choices || [] };
    case FormQuestionType.UserSingle:
    case FormQuestionType.UserMultiple:
      return answer.users || [];
    default:
      // eslint-disable-next-line no-console
      console.debug &&
        // eslint-disable-next-line no-console
        console.debug(`Question type ${questionType} is not handled.`);
      return '';
  }
};
