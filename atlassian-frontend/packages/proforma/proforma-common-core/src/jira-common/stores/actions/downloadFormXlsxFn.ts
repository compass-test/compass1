import { ExportFormat } from '../../models/ExportFormat';
import { AnalyticsEventName } from '../../utils/AnalyticsUtils';
import { FormViewModuleContext } from '../interfaces/FormViewModuleContext';

/**
 * Generates a function for the given `moduleContext` which downloads a form spreadsheet. The function does not run immediately, it runs when called later.
 *
 * @param moduleContext The module context that identifies the current issue and provides necessary utils.
 * @param issueKey The key of the issue
 * @param issueKey The id of the issue
 */
export function downloadFormXlsxFn(
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
    if (permissions.download && issueKey) {
      const fileUrl = formApi.getXlsxDownloadUrl(issueId, issueKey, formId);
      if (fileUrl) {
        browserUtils.downloadFile(
          fileUrl,
          `ProForma-${issueKey}-form-${formId}.xlsx`,
          ExportFormat.Xlsx,
        );
        analyticsUtils.track(AnalyticsEventName.ExportSingleResponse, {
          exportType: ExportFormat.Xlsx,
        });
      }
    }
  };
}
