import { FormStore } from '../../../form-system/stores/FormStore';
import { FormIndexStore } from '../FormIndexStore';

export interface DeleteSelectedForm {
  formIndexStore: FormIndexStore;
  selectedFormStore?: FormStore;
}

/**
 * Generates a function which asks the user if a form should be deleted, and performs the deletion if confirmed.
 * The function does not run immediately, it runs when called later.
 */
export const deleteSelectedFormFn = (
  store: DeleteSelectedForm,
): (() => Promise<void>) => {
  return (): Promise<void> => {
    const formStore = store.selectedFormStore;
    if (!formStore || !formStore.formId) {
      // eslint-disable-next-line no-console
      console.error(
        'Cannot delete the selected form when there is no selected form.',
      );
      return Promise.reject();
    }
    return store.formIndexStore.deleteForm!(
      formStore.formId,
      formStore.formName || '',
    );
  };
};
