import { ViewMode } from '../../../form-system/components/ViewModeBar';
import { FormStore } from '../../../form-system/stores/FormStore';
import { convertAnswers } from '../../../form-system/utils/conversion/convertAnswers';
import { FormApi } from '../../apis/FormApi';
import { FormApiV3 } from '../../apis/FormApiV3';
import { NoticeType } from '../../components/Notice/noticeTypes';
import { PfUtils } from '../../context/providers/UtilsProvider';
import { AnalyticsEventName } from '../../utils/AnalyticsUtils';
import { ErrorUtils } from '../../utils/ErrorUtils';
import { FormIndexStore } from '../FormIndexStore';

export interface SaveSelectedForm {
  issueKey: string;
  issueId: number;
  savingForm: boolean;
  selectedFormStore?: FormStore;
}

/**
 * Generates a function which asks the user if a form should be saved, and performs the save if confirmed.
 * The function does not run immediately, it runs when called later.
 */
export const saveSelectedFormFn = (
  store: SaveSelectedForm,
  formApi: FormApi,
  errorUtils: ErrorUtils,
): (() => Promise<void>) => {
  return (): Promise<void> => {
    const formStore = store.selectedFormStore;
    if (!formStore || formStore.formId === undefined) {
      return Promise.reject();
    }
    store.savingForm = true;
    const answers = convertAnswers(formStore.visibleQuestions);
    return formApi
      .saveAnswers(store.issueId, formStore.formId, answers)
      .then(formStore.update.bind(formStore))
      .catch(_ => {
        return errorUtils.notifyUser(NoticeType.ErrorApiSaveFormFailed);
      })
      .finally(() => {
        store.savingForm = false;
      });
  };
};

export interface SubmitSelectedForm extends SaveSelectedForm {
  formIndexStore: FormIndexStore;
  submittingForm: boolean;
  setViewMode: (viewMode: ViewMode) => void;
}

/**
 * Generates a function which asks the user if a form should be submitted, and performs the submit if confirmed.
 * The function does not run immediately, it runs when called later.
 */
export const submitSelectedFormFn = (
  store: SubmitSelectedForm,
  formApi: FormApi,
  formApiV3: FormApiV3,
  utils: PfUtils,
): (() => Promise<void>) => {
  return (): Promise<void> => {
    const formStore = store.selectedFormStore;
    if (!formStore || formStore.formId === undefined) {
      return Promise.reject();
    }
    store.submittingForm = true;
    return saveAndValidateForm(store, formApi, utils.errorUtils, formStore)
      .then(isValid => {
        if (isValid) {
          let noticeType: NoticeType = NoticeType.ConfirmSubmitForm;
          if (formStore.submitPdf && formStore.submitLock) {
            noticeType = NoticeType.ConfirmSubmitFormPdfLock;
          } else if (formStore.submitPdf) {
            noticeType = NoticeType.ConfirmSubmitFormPdf;
          } else if (formStore.submitLock) {
            noticeType = NoticeType.ConfirmSubmitFormLock;
          }
          return utils.browserUtils.showNotice(noticeType).then(confirmed => {
            if (confirmed) {
              return formApiV3
                .submitForm(
                  store.issueId,
                  formStore.formId!,
                  formStore.submitLock,
                )
                .then(updatedForm => {
                  return formStore.update(updatedForm).then(_ => {
                    formStore.hideValidations();
                    store.setViewMode(ViewMode.View);
                    store.formIndexStore.updateSelectedFormStatus(
                      updatedForm.state.status,
                    );
                    utils.analyticsUtils.track(
                      AnalyticsEventName.SubmitForm,
                      {},
                    );
                  });
                })
                .catch(_ => {
                  utils.errorUtils.notifyUser(
                    NoticeType.ErrorApiSubmitFormFailed,
                  );
                });
            }
          });
        }
      })
      .finally(() => {
        store.submittingForm = false;
      });
  };
};

const saveAndValidateForm = (
  store: SaveSelectedForm,
  formApi: FormApi,
  errorUtils: ErrorUtils,
  formStore: FormStore,
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject): void => {
    // If needed, save form
    if (formStore.answersModified) {
      saveSelectedFormFn(store, formApi, errorUtils)()
        .then(_ => {
          formStore.validate();
          resolve(!formStore.invalid);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      formStore.validate();
      resolve(!formStore.invalid);
    }
  });
};
