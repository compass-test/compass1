import {
  FormChoice,
  FormQuestionType,
  FormStatus,
} from '../../../form-system/models/Form';
import { FormStore } from '../../../form-system/stores/FormStore';
import { QuestionStore } from '../../../form-system/stores/QuestionStore';
import { ApiFormChoicesResponse } from '../../models/ApiFormChoicesResponse';
import {
  InsightChoiceApi,
  InsightChoiceApiType,
  isInsightChoiceApi,
} from '../../models/ChoiceApis';
import {
  getInsightObjectQuery,
  INSIGHT_OBJECT_LIMIT,
  InsightApiResponse,
  InsightObject,
  InsightObjectQuery,
} from '../../models/InsightApiResponse';

const CUSTOM_FIELD_PREFIX = 'customfield_';

export const loadChoicesFn = (
  getFormChoices: (
    templateFormId: number,
    formId?: number,
  ) => Promise<ApiFormChoicesResponse>,
  getInsightChoices: (
    customFieldId: number,
    choiceApi: InsightChoiceApi,
    query: InsightObjectQuery,
  ) => Promise<InsightApiResponse>,
): ((
  formStore: FormStore,
) => (questionId?: number, query?: string) => Promise<void>) => {
  return (
    formStore: FormStore,
  ): ((questionId?: number, query?: string) => Promise<void>) => {
    return (questionId?: number, query?: string): Promise<void> => {
      if (formStore.status !== FormStatus.Open) {
        // When a form is submitted, the choices are stored within the questions.
        return Promise.resolve();
      }

      // map jiraField to string[] for easy lookup of values for each Jira field, in a format that can be passed to the Insight API.
      const insightContextValuesMap: Map<string, string> = new Map();
      // Find questions linked to Jira field and store the answers in a way that can be used for querying to Insight.
      formStore.questions.forEach(question => {
        if (
          question.formQuestion.jiraField &&
          !insightContextValuesMap.has(question.formQuestion.jiraField)
        ) {
          const insightContextValue = getInsightContextValue(question);
          if (insightContextValue !== undefined) {
            insightContextValuesMap.set(
              question.formQuestion.jiraField,
              insightContextValue,
            );
          }
        }
      });

      // map jiraField to QuestionStore[] for easy lookup of all questions which are linked to a Jira field (excluding Insight fields).
      const jiraFieldQuestionMap: Map<string, QuestionStore[]> = new Map();
      // map jiraField to QuestionStore[] for easy lookup of all questions which are linked to a Jira Insight field.
      const jiraInsightQuestionMap: Map<string, QuestionStore[]> = new Map();
      // map jiraField to QuestionStore[] for easy lookup of all questions which are linked to a data connection.
      const dataConnectionQuestionMap: Map<string, QuestionStore[]> = new Map();
      // Allocate out each linked choice question to either the appropriate map.
      formStore.questions.forEach(question => {
        if (!questionId || questionId === question.id) {
          if (
            question.formQuestion.jiraField &&
            isChoiceType(question.formQuestion.type)
          ) {
            const isInsight = isInsightChoiceApi(question.choiceApi);
            if (
              isInsight &&
              !questionId &&
              (question.formQuestion.type === FormQuestionType.ChoiceDropdown ||
                question.formQuestion.type ===
                  FormQuestionType.ChoiceDropdownMultiple)
            ) {
              return;
            } // Dropdowns do not need the choices preloaded.
            const questionMap = isInsight
              ? jiraInsightQuestionMap
              : jiraFieldQuestionMap;
            let questionStores: QuestionStore[];
            if (questionMap.has(question.formQuestion.jiraField)) {
              questionStores = questionMap.get(
                question.formQuestion.jiraField,
              )!;
            } else {
              questionStores = [];
              questionMap.set(question.formQuestion.jiraField, questionStores);
            }
            questionStores.push(question);
          }
          if (question.formQuestion.dcId) {
            let questionStores = dataConnectionQuestionMap.get(
              question.formQuestion.dcId,
            );
            if (questionStores === undefined) {
              questionStores = [];
              dataConnectionQuestionMap.set(
                question.formQuestion.dcId,
                questionStores,
              );
            }
            questionStores.push(question);
          }
        }
      });

      const lookups: Promise<void>[] = [];

      // Retrieve formStore choices from the backend if there are any linked choice fields handled by ProForma
      if (jiraFieldQuestionMap.size > 0 || dataConnectionQuestionMap.size > 0) {
        lookups.push(
          getFormChoices(formStore.templateFormId, formStore.formId).then(
            (response: ApiFormChoicesResponse) => {
              const { fields, dataConnections } = response;

              jiraFieldQuestionMap.forEach((questionStores, jiraField) => {
                if (fields[jiraField]) {
                  questionStores.forEach(questionStore => {
                    questionStore.setChoices(fields[jiraField]);
                  });
                }
              });

              dataConnectionQuestionMap.forEach((questionStores, dcId) => {
                if (dataConnections[dcId]) {
                  questionStores.forEach(questionStore => {
                    questionStore.setChoices(dataConnections[dcId]);
                  });
                }
              });
            },
          ),
        );
      }

      // Retrieve formStore choices from Insight if there are any linked choice fields handled by Insight
      if (jiraInsightQuestionMap.size > 0) {
        jiraInsightQuestionMap.forEach((questionStores, jiraField) => {
          const choiceApi = questionStores[0].choiceApi;
          if (jiraField.startsWith(CUSTOM_FIELD_PREFIX) && choiceApi) {
            try {
              if (
                isInsightChoiceApi(choiceApi) &&
                choiceApi.api !== InsightChoiceApiType.Readonly
              ) {
                const customFieldId = parseInt(
                  jiraField.substring(CUSTOM_FIELD_PREFIX.length),
                  10,
                );
                // eslint-disable-next-line no-console
                console.info(
                  `Looking up Insight field ${customFieldId} (field config ${choiceApi.fieldConfigId})`,
                );
                const insightContextValues = getInsightContextValues(
                  jiraField,
                  insightContextValuesMap,
                );
                lookups.push(
                  getInsightChoices(
                    customFieldId,
                    choiceApi,
                    getInsightObjectQuery(
                      formStore.issueKey,
                      insightContextValues,
                      query,
                    ),
                  ).then(response => {
                    const choices: FormChoice[] = response.objects
                      ? response.objects.map((obj: InsightObject) => ({
                          id: `${obj.id}`,
                          label: obj.label,
                        }))
                      : [];
                    const hasMoreChoices = response.size > INSIGHT_OBJECT_LIMIT;
                    if (hasMoreChoices) {
                      // Remove the extra choice that proves that there are more choices.
                      choices.pop();
                    }
                    questionStores.forEach(questionStore => {
                      questionStore.setSearchedInsightChoices(choices);
                      if (!query) {
                        questionStore.hasMoreChoices = hasMoreChoices;
                      }
                    });
                  }),
                );
              } else if (choiceApi.api !== InsightChoiceApiType.Readonly) {
                // eslint-disable-next-line no-console
                console.warn(
                  `Not looking up field choices for ${jiraField} due to unsupported choice API:`,
                  choiceApi.api,
                );
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error(
                `Not looking up Insight field ${jiraField} due to error`,
                e,
              );
            }
          }
        });
      }

      return Promise.all(lookups).then(_ => {});
    };
  };
};

function isChoiceType(questionType: FormQuestionType): boolean {
  return (
    questionType === FormQuestionType.ChoiceDropdown ||
    questionType === FormQuestionType.ChoiceSingle ||
    questionType === FormQuestionType.ChoiceMultiple ||
    questionType === FormQuestionType.ChoiceDropdownMultiple
  );
}

// Extract the answer and convert it into a format that can be used for passing into a query for the Insight API.
const getInsightContextValue = (
  question: QuestionStore,
): string | undefined => {
  switch (question.formQuestion.type) {
    case FormQuestionType.TextShort:
    case FormQuestionType.TextLong:
    case FormQuestionType.TextParagraph:
    case FormQuestionType.Number:
      return question.currentAnswer !== undefined
        ? question.currentAnswer
        : undefined;
    case FormQuestionType.ChoiceDropdown:
    case FormQuestionType.ChoiceSingle:
    case FormQuestionType.ChoiceMultiple:
    case FormQuestionType.ChoiceDropdownMultiple:
      // Insight appears to use "," as a separator between values in IssueRequestUtil
      return question.currentAnswer && question.currentAnswer.choices
        ? question.currentAnswer.choices.join(',')
        : undefined;
    default:
      return undefined;
  }
};

// Get Insight context values for Jira fields other than the one provided.
const getInsightContextValues = (
  jiraField: string,
  insightContextValuesMap: Map<string, string>,
) => {
  const newMap: Map<string, string> = new Map();
  insightContextValuesMap.forEach((value, key) => {
    if (key !== jiraField) {
      newMap.set(key, value);
    }
  });
  return newMap;
};
