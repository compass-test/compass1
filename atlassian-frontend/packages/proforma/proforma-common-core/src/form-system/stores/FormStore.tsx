import { action, computed, observable, runInAction } from 'mobx';

import { filter } from '@atlaskit/adf-utils';

import { JiraField } from '../../jira-common/models/JiraField';
import { UserSearchType } from '../../jira-common/models/UserSearchType';
import {
  Form,
  FormConditions,
  FormLayout,
  FormSection,
  FormStatus,
  FormVisibility,
  ShowCondition,
  UnsavedForm,
} from '../models/Form';
import { SelectOption } from '../models/SelectOption';

import { QuestionStore } from './QuestionStore';

interface FormStoreSection extends FormSection {
  questions?: string[];
}

interface FormStoreSections {
  [sectionId: string]: FormStoreSection;
}

export class FormStore {
  public readonly formId?: number;
  public readonly issueKey?: string;
  @observable public savingAnswers = false;
  @observable public submittingForm = false;
  public readonly templateFormId: number;
  public readonly formName?: string;
  public readonly language?: string;
  @observable public updated?: string;
  @observable public status?: FormStatus;
  public readonly submitLock: boolean;
  public readonly submitPdf: boolean;
  @observable public readonly questions: QuestionStore[];
  public readonly layout?: FormLayout[];
  @observable public internal?: boolean;
  public readonly conditions?: ShowCondition | FormConditions;
  public readonly sections?: FormStoreSections;
  @observable public invalid?: boolean;
  public readonly createOpen: boolean;
  public readonly validateOnCreate: boolean;
  public readonly portalCanSubmit: boolean;
  @observable public revisionToken: string;

  public readonly loadFieldValues: () => Promise<void>;
  public readonly loadChoices: (
    questionId?: number,
    query?: string,
  ) => Promise<void>;
  public readonly searchUsers: (
    searchType: UserSearchType | undefined,
    questionId: number,
    query: string,
  ) => Promise<SelectOption[]>;

  /**
   * Creates a new form store.
   *
   * @param loadFieldValuesFn The function to generate the function to load the field values
   * @param loadChoicesFn The function to generate the function to load the form choices
   * @param searchUsers The function to search for users
   * @param form The form to populate the store with
   * @param issueKey The key of the current issue, if known
   * @param jiraFieldMap The map of Jira fields (only used in the Form Builder)
   */
  public constructor(
    loadFieldValuesFn: (formStore: FormStore) => () => Promise<void>,
    loadChoicesFn: (
      formStore: FormStore,
    ) => (questionId?: number, query?: string) => Promise<void>,
    searchUsers: (
      searchType: UserSearchType | undefined,
      questionId: number,
      query: string,
    ) => Promise<SelectOption[]>,
    form: Form | UnsavedForm,
    issueKey?: string,
    jiraFieldMap?: Map<string, JiraField>,
  ) {
    this.revisionToken = `*-${Date.now()}`;
    this.formId = form.id;
    this.issueKey = issueKey;

    const formSettings = form.design.settings;
    this.templateFormId = formSettings.templateId;
    this.formName = formSettings.name;
    this.language = formSettings.language;
    this.submitLock = formSettings.submit.lock;
    this.submitPdf = formSettings.submit.pdf;
    this.createOpen =
      form.publish?.portal !== undefined && !form.publish.portal.submitOnCreate;
    this.validateOnCreate =
      !this.createOpen ||
      (form.publish?.portal !== undefined &&
        form.publish.portal.validateOnCreate);
    this.portalCanSubmit =
      !formSettings.portal || formSettings.portal.canSubmit;
    this.conditions = form.design.conditions;
    this.layout = form.design.layout;
    this.sections = form.design.sections;
    this.attachQuestionsToSections();

    if (form.design.questions) {
      this.questions = Object.keys(form.design.questions).map(questionKey => {
        const formQuestion = form.design.questions[questionKey];
        const jiraField = formQuestion.jiraField
          ? jiraFieldMap?.get(formQuestion.jiraField)
          : undefined;
        const questionStore = new QuestionStore(
          (revisionToken: string) => {
            this.revisionToken = revisionToken;
          },
          questionKey,
          formQuestion,
          jiraField?.choiceApi,
          jiraField?.hasMoreChoices,
          form.state.answers[questionKey],
        );
        return questionStore;
      });
    } else {
      this.questions = [];
    }

    this.loadFieldValues = loadFieldValuesFn(this);
    this.loadChoices = loadChoicesFn(this);
    this.searchUsers = searchUsers;

    this._update(true, form);
  }

  @computed
  public get formIsBlank(): boolean {
    if (!this.layout) {
      return true;
    }
    return this.layout.every(subLayout => subLayout.content.length === 0);
  }

  @computed
  public get answersModified(): boolean {
    for (const questionStore of this.questions) {
      if (questionStore.answerModified) {
        return true;
      }
    }
    return false;
  }

  @computed
  public get satisfiedConditions(): string[] {
    if (!this.conditions) {
      return [];
    }

    const satisfiedConditions: string[] = [];
    Object.keys(this.conditions).forEach(conditionKey => {
      // @ts-ignore
      const condition = this.conditions![conditionKey];
      if (this.conditionIsSatisfied(condition)) {
        satisfiedConditions.push(conditionKey);
      }
    });
    return satisfiedConditions;
  }

  private conditionIsSatisfied(condition: ShowCondition): boolean {
    // Currently this code only supports conditions with 'choice - one of' inputs
    if (condition.i.co) {
      // Currently this code only supports one input per condition, because it returns from the first iteration of this loop
      for (const conditionQuestionId in condition.i.co.cIds) {
        const trackedQuestion = this.questions.find(
          question => `${question.id}` === conditionQuestionId,
        );
        if (!trackedQuestion?.currentAnswer?.choices) {
          return false;
        }
        const conditionInput: string[] =
          condition.i.co.cIds[conditionQuestionId];
        return trackedQuestion.currentAnswer.choices.some((choice: string) =>
          conditionInput.includes(choice),
        );
      }
    }
    return false;
  }

  @computed
  public get visibleSections(): string[] {
    if (!this.sections) {
      return ['0'];
    }

    const { satisfiedConditions } = this;
    const visibleSections: string[] = ['0'];
    Object.keys(this.sections).forEach(sectionKey => {
      const section = this.sections![sectionKey];
      if (!section.conditions) {
        visibleSections.push(sectionKey);
      }
      if (
        section.conditions &&
        section.conditions.every(condition =>
          satisfiedConditions.includes(condition),
        )
      ) {
        visibleSections.push(sectionKey);
      }
    });
    return visibleSections;
  }

  @computed
  private get hiddenQuestions(): string[] {
    if (!this.sections) {
      return this.questions.map(question => question.id.toString());
    }

    const hiddenSections: FormStoreSection[] = [];
    Object.keys(this.sections).forEach(sectionKey => {
      if (!this.visibleSections.includes(sectionKey)) {
        hiddenSections.push(this.sections![sectionKey]);
      }
    });
    return this.questions
      .filter(question => {
        return hiddenSections.some(
          hiddenSection =>
            hiddenSection.questions &&
            hiddenSection.questions.includes(question.id.toString()),
        );
      })
      .map(question => question.id.toString());
  }

  @computed
  public get visibleQuestions(): QuestionStore[] {
    return this.questions.filter(
      question => !this.hiddenQuestions.includes(question.id.toString()),
    );
  }

  @action private attachQuestionsToSections = (): void => {
    if (!this.layout || !this.layout[0]) {
      return;
    }

    const sectionsAdf = this.layout.map((sectionLayout, index) => ({
      id: index,
      questions: sectionLayout.content
        ? this.getQuestionIdsFromSectionContent(sectionLayout)
        : [],
    }));
    sectionsAdf.forEach(section => {
      const { sections } = this;
      if (sections && sections[section.id]) {
        sections[section.id].questions = section.questions;
      }
    });
  };

  private getQuestionIdsFromSectionContent = (
    sectionContent: any,
  ): string[] => {
    return filter(sectionContent, (node: any) => {
      if (!node.attrs || !node.attrs.parameters || !node.attrs.parameters.id) {
        return false;
      }
      return node.attrs.extensionKey === 'question';
    }).map((node: any) => node.attrs!.parameters.id.toString());
  };

  @action public update = (form: Form): Promise<void> => {
    return this._update(false, form);
  };

  private _update = (
    constructing: boolean,
    form: Form | UnsavedForm,
  ): Promise<void> => {
    this.updated = form.updated;
    this.status = form.state.status;
    this.internal = form.state.visibility === FormVisibility.Internal;
    if (!constructing) {
      this.invalid = false;
      this.questions.forEach(question => {
        const questionKey = question.id.toString();
        const formQuestion = form.design.questions[questionKey];
        question.update(formQuestion, form.state.answers[questionKey]);
      });
    }

    // NOTE: `loadFieldValues` sets the `choiceApi` which is used on `loadChoices`.
    return this.loadFieldValues().then(_ => this.loadChoices());
  };

  public validate = (): void => {
    const visibleQuestions = this.questions.filter(
      question => !this.hiddenQuestions.includes(question.id.toString()),
    );

    // Validate each question
    let allQuestionsValid = true;
    visibleQuestions.forEach(questionStore => {
      // activate validations on question
      questionStore.validate();
      if (questionStore.validationErrors) {
        allQuestionsValid = false;
      }
    });

    runInAction((): void => {
      this.invalid = !allQuestionsValid;
    });
  };

  @action public hideValidations = (): void => {
    this.invalid = false;
    this.questions.forEach(question => question.hideValidation());
  };

  @action public discardModifiedAnswers = (): void => {
    this.questions.forEach(question => question.discardModifiedAnswer());
  };
}
