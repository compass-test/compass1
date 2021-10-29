import { ViewMode } from '../../../form-system/components/ViewModeBar';
import { FormStore } from '../../../form-system/stores/FormStore';
import { NoticeType } from '../../components/Notice/noticeTypes';
import { BrowserUtils } from '../../utils/BrowserUtils';
import { clearAllFocus } from '../../utils/CommonUtils';

export interface CancelEditForm {
  selectedFormStore?: FormStore;
  setViewMode: (viewMode: ViewMode) => void;
}

/**
 * Generates a function which asks the user if editing a form should be cancelled, and performs the cancellation if confirmed.
 * The function does not run immediately, it runs when called later.
 */
export const cancelEditSelectedFormFn = (
  store: CancelEditForm,
  browserUtils: BrowserUtils,
): (() => Promise<void>) => {
  return (): Promise<void> => {
    const formStore = store.selectedFormStore;
    if (!formStore) {
      return Promise.reject();
    }
    clearAllFocus();
    if (formStore.answersModified) {
      return browserUtils
        .showNotice(NoticeType.ConfirmCancelEdit, {
          msgVars: { formName: formStore.formName || 'Unknown form' },
        })
        .then(confirmed => {
          if (confirmed) {
            onCancelEdit(formStore, store.setViewMode.bind(store));
          }
        });
    }
    onCancelEdit(formStore, store.setViewMode.bind(store));
    return Promise.resolve();
  };
};

const onCancelEdit = (
  formStore: FormStore,
  setViewMode: (viewMode: ViewMode) => void,
): void => {
  formStore.discardModifiedAnswers();
  formStore.hideValidations();
  setViewMode(ViewMode.View);
};
