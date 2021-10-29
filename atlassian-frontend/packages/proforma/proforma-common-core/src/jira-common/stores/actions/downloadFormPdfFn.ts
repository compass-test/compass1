import { AnalyticsEventName } from '../../utils/AnalyticsUtils';
import { FormViewModuleContext } from '../interfaces/FormViewModuleContext';

/**
 * Generates a function for the given `moduleContext` which downloads a form PDF. The function does not run immediately, it runs when called later.
 *
 * @param moduleContext The module context that identifies the current issue and provides necessary utils.
 * @param issueKey The key of the issue
 * @param issueId The id of the issue
 */
export function downloadFormPdfFn(
  moduleContext: FormViewModuleContext,
  issueKey: string,
  issueId: number,
): (formId: number) => void {
  let {
    permissions,
    apis: { formApi },
    utils: { analyticsUtils, browserUtils },
  } = moduleContext;
  return (formId: number): void => {
    if (permissions.download && issueId) {
      const fileUrl = formApi.getPdfDownloadUrl(issueId, formId);
      if (fileUrl) {
        browserUtils.downloadFile(fileUrl, `ProForma-${issueKey}.pdf`, 'pdf');
        analyticsUtils.track(AnalyticsEventName.DownloadPDF, {});
      }
    }
  };
}
