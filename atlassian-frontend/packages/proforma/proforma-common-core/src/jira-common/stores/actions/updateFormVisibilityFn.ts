import { FormStore } from '../../../form-system/stores/FormStore';
import { FormApi } from '../../apis/FormApi';
import { NoticeType } from '../../components/Notice/noticeTypes';
import { PfUtils } from '../../context/providers/UtilsProvider';
import { PermissionLevel } from '../../models/PermissionLevel';
import { AnalyticsEventName } from '../../utils/AnalyticsUtils';
import { FormIndexStore } from '../FormIndexStore';

export interface UpdateSelectedFormVisibility {
  issueId: number;
  formIndexStore: FormIndexStore;
  updatingFormVisibility: boolean;
  selectedFormStore?: FormStore;
}

/**
 * Generates a function which asks the user if a form's visibility should be updated, and performs the update if confirmed.
 * The function does not run immediately, it runs when called later.
 */
export const updateSelectedFormVisibilityFn = (
  store: UpdateSelectedFormVisibility,
  formApi: FormApi,
  utils: PfUtils,
  permissions: PermissionLevel,
): ((toInternal: boolean) => Promise<void>) => {
  return (toInternal: boolean): Promise<void> => {
    if (!permissions.toggleAccess) {
      return Promise.reject();
    }
    const formStore = store.selectedFormStore;
    if (!formStore || formStore.formId === undefined) {
      return Promise.reject();
    }
    store.updatingFormVisibility = true;
    const noticeType = toInternal
      ? NoticeType.ConfirmChangeFormAvailabilityToInternal
      : NoticeType.ConfirmChangeFormAvailabilityToExternal;
    return utils.browserUtils
      .showNotice(noticeType)
      .then(confirmed => {
        if (confirmed) {
          formApi
            .updateFormVisibility(store.issueId, formStore.formId!, toInternal)
            .then(_ => {
              formStore.internal = toInternal;
              const formIndex = store.formIndexStore.selectedFormIndex();
              if (formIndex) {
                formIndex.internal = toInternal;
              } else {
                // eslint-disable-next-line no-console
                console.error(
                  'Could not find form index to update form visibility:',
                  store.formIndexStore.selectedFormId,
                );
              }
              const analyticsEventName = toInternal
                ? AnalyticsEventName.MakeFormInternal
                : AnalyticsEventName.MakeFormExternal;
              utils.analyticsUtils.track(analyticsEventName, {});
            });
        }
      })
      .finally(() => {
        store.updatingFormVisibility = false;
      });
  };
};
