import { ViewMode } from '../../../form-system/components/ViewModeBar';
import { FormStatus } from '../../../form-system/models/Form';
import { SelectOption } from '../../../form-system/models/SelectOption';
import { FormStore } from '../../../form-system/stores/FormStore';
import { FormApiV3 } from '../../apis/FormApiV3';
import { NoticeType } from '../../components/Notice/noticeTypes';
import { PfUtils } from '../../context/providers/UtilsProvider';
import { PermissionLevel } from '../../models/PermissionLevel';
import { UserSearchType } from '../../models/UserSearchType';
import { AnalyticsEventName } from '../../utils/AnalyticsUtils';
import { FormIndexStore } from '../FormIndexStore';

export interface ReopenSelectedForm {
  issueId: number;
  formIndexStore: FormIndexStore;
  reopeningForm: boolean;
  selectedFormStore?: FormStore;
  setViewMode: (viewMode: ViewMode) => void;
}

/**
 * Generates a function which asks the user if a form should be reopened, and performs the reopen if confirmed.
 * The function does not run immediately, it runs when called later.
 */
export const reopenSelectedFormFn = (
  store: ReopenSelectedForm,
  loadFieldValuesFn: (formStore: FormStore) => () => Promise<void>,
  loadChoicesFn: (
    formStore: FormStore,
  ) => (questionId?: number, query?: string) => Promise<void>,
  searchUsers: (
    searchType: UserSearchType | undefined,
    questionId: number,
    query: string,
  ) => Promise<SelectOption[]>,
  formApiV3: FormApiV3,
  utils: PfUtils,
  permissions: PermissionLevel,
): (() => Promise<void>) => {
  return (): Promise<void> => {
    if (!permissions.toggleAccess) {
      return Promise.reject();
    }
    const formStore = store.selectedFormStore;
    if (!formStore || formStore.formId === undefined) {
      return Promise.reject();
    }
    store.reopeningForm = true;
    return utils.browserUtils
      .showNotice(NoticeType.ConfirmReopenForm)
      .then(confirmed => {
        if (confirmed) {
          (formStore.status === FormStatus.Locked
            ? formApiV3.unlockForm(store.issueId, formStore.formId!)
            : formApiV3.reopenForm(store.issueId, formStore.formId!)
          ).then(updatedForm => {
            formStore.update(updatedForm).then(_ => {
              store.formIndexStore.updateSelectedFormStatus(
                updatedForm.state.status,
              );
              store.setViewMode(ViewMode.Edit);
              utils.analyticsUtils.track(AnalyticsEventName.ReopenForm, {});
            });
          });
        }
      })
      .finally(() => {
        store.reopeningForm = false;
      });
  };
};
