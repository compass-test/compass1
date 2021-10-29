import { observable } from 'mobx';

import {
  FormQuestionType,
  SelectOption,
} from '@atlassian/proforma-common-core/form-system-models';
import { FormStore } from '@atlassian/proforma-common-core/form-system-stores';
import {
  ApiFormChoicesResponse,
  UserSearchType,
} from '@atlassian/proforma-common-core/jira-common-models';
import {
  loadChoicesFn,
  loadFieldValuesFn,
} from '@atlassian/proforma-common-core/jira-common-stores';
import {
  AnalyticsEventName,
  AnalyticsUtils,
} from '@atlassian/proforma-common-core/jira-common-utils';

import { PortalCreateModuleContext } from '../components';

export type RegisterPortalForm = (
  validateForm: (callback: (boolean: boolean) => void) => void,
  serializeFormAnswers: (callback: (any: any) => void) => void,
) => void;

export class PortalCreateStore {
  public readonly serviceDeskId: number;
  public readonly requestTypeId: number;
  @observable public loadingForm: boolean = true;
  @observable public formStore?: FormStore;
  @observable public creatingIssue: boolean = false;

  private readonly global: any = global;
  private readonly analyticsUtils: AnalyticsUtils;

  public constructor(
    moduleContext: PortalCreateModuleContext,
    serviceDeskId: number,
    requestTypeId: number,
    registerPortalForm: RegisterPortalForm,
  ) {
    this.serviceDeskId = serviceDeskId;
    this.requestTypeId = requestTypeId;
    this.analyticsUtils = moduleContext.utils.analyticsUtils;

    moduleContext.apis.formApiV3
      .getForm(0)
      .then(form => {
        if (form) {
          this.formStore = new FormStore(
            loadFieldValuesFn(
              moduleContext.apis.formApiV3.postFieldValues.bind(
                moduleContext.apis.formApiV3,
              ),
            ),
            loadChoicesFn(
              (
                templateFormId: number,
                formId?: number,
              ): Promise<ApiFormChoicesResponse> =>
                (formId &&
                  moduleContext.apis.formApiV3.getFormChoices(formId)) ||
                Promise.reject(),
              moduleContext.apis.formApiV3.getInsightChoices.bind(
                moduleContext.apis.formApiV3,
              ),
            ),
            (
              searchType: UserSearchType | undefined,
              questionId: number,
              query: string,
            ): Promise<SelectOption[]> => {
              if (searchType) {
                return moduleContext.apis.formApiV3.searchUsers(
                  1,
                  questionId,
                  query,
                );
              }
              return moduleContext.utils.browserUtils.searchUser(query);
            },
            form,
          );

          // Register callbacks to the Service desk `Send` action.
          if (this.global?.proFormaFillin?.registerPortalForm) {
            this.global.proFormaFillin.registerPortalForm(
              this.serviceDeskId,
              this.requestTypeId,
              this.attemptValidatingForm.bind(this),
              this.attemptSerializeFormAnswers.bind(this),
            );
          }
          registerPortalForm(
            this.attemptValidatingForm.bind(this),
            this.attemptSerializeFormAnswers.bind(this),
          );
        }
      })
      .finally(() => {
        this.loadingForm = false;
      });
  }

  private attemptValidatingForm = (
    callback: (boolean: boolean) => void,
  ): void => {
    if (!this.loadingForm) {
      if (this.formStore) {
        if (this.formStore.validateOnCreate) {
          this.formStore.validate();
        }
        callback(!this.formStore.invalid);
        return;
      }

      // There is no form so pass the validation
      callback(true);
      return;
    }
    // User clicked the "Create" button before the form finished loading so auto-fail validation
    callback(false);
  };

  private attemptSerializeFormAnswers = (
    callback: (any: any) => void,
  ): void => {
    const serializedFormAnswers = this.serializeFormAnswers();
    this.analyticsUtils.track(AnalyticsEventName.PortalCreateForm, {});
    callback(serializedFormAnswers);
  };

  private serializeFormAnswers = (): any => {
    if (!this.formStore) {
      return undefined;
    }
    const serializedData: any = { t: {}, c: {}, ta: {} };
    this.formStore.questions.forEach(question => {
      const answer = question.currentAnswer;
      switch (question.formQuestion.type) {
        case FormQuestionType.TextShort:
        case FormQuestionType.TextLong:
        case FormQuestionType.TextParagraph:
        case FormQuestionType.TextEmail:
        case FormQuestionType.TextUrl:
        case FormQuestionType.Number:
          if (answer) {
            const newTextObj = { [`q${question.id}t`]: answer };
            // Merge the new text answer into the serializedData obj
            serializedData.t = {
              ...serializedData.t,
              ...newTextObj,
            };
          }
          break;
        case FormQuestionType.DateTime:
          if (answer) {
            const newDateObj = answer.date && {
              [`q${question.id}d`]: answer.date,
            };
            const newTimeObj = answer.time && {
              [`q${question.id}ti`]: answer.time,
            };
            // Merge the new date time answer into the serializedData obj
            serializedData.t = {
              ...serializedData.t,
              ...newDateObj,
              ...newTimeObj,
            };
          }
          break;
        case FormQuestionType.Date:
          if (answer) {
            const newDateObj = answer && {
              [`q${question.id}d`]: answer,
            };
            // Merge the new Date answer into the serializedData obj
            serializedData.t = {
              ...serializedData.t,
              ...newDateObj,
            };
          }
          break;
        case FormQuestionType.Time:
          if (answer) {
            const newTimeObj = answer && {
              [`q${question.id}ti`]: answer,
            };
            // Merge the new Time answer into the serializedData obj
            serializedData.t = {
              ...serializedData.t,
              ...newTimeObj,
            };
          }
          break;
        case FormQuestionType.ChoiceSingle:
        case FormQuestionType.ChoiceMultiple:
        case FormQuestionType.ChoiceDropdown:
        case FormQuestionType.ChoiceDropdownMultiple:
          if (answer) {
            // Get array of Selected choices Ids
            // take a copy of the selected IDs. If this is not done, the IDs get lost after serialisation
            const selectedChoiceIds = [...answer.choices];
            const newChoiceObj = {
              [`q${question.id}c`]: selectedChoiceIds,
            };
            // Merge the new choice answer into the serializedData obj
            serializedData.c = {
              ...serializedData.c,
              ...newChoiceObj,
            };
            // Conditionally merge in the other text value to the serializedData obj
            if (answer.text) {
              serializedData.t = {
                ...serializedData.t,
                [`q${question.id}t`]: answer.text,
              };
            }
          }
          break;
        case FormQuestionType.UserSingle:
        case FormQuestionType.UserMultiple:
          if (answer) {
            // Create array with all fields for each user e.g. [ user1id, user1name, user2id, user2name, ... ]
            const selectedUsers = answer
              .map((user: any) => {
                return [user.id, user.name];
              })
              .reduce(function (acc: any, cur: any) {
                return acc.concat(cur);
              }, []);
            const newUserObj = {
              [`q${question.id}${question.formQuestion.type}`]: selectedUsers,
            };
            // Merge the new users answer into the serializedData obj
            serializedData.ta = {
              ...serializedData.ta,
              ...newUserObj,
            };
          }
          break;
        default:
          break;
      }
    });
    return {
      forms: [
        {
          id: this.formStore.templateFormId,
          ...serializedData,
        },
      ],
    };
  };
}
