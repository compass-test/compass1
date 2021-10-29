import { SelectOption } from '../../form-system/models/SelectOption';
import { IntlValues } from '../components/Notice';
import { NoticeType } from '../components/Notice/noticeTypes';

export interface BrowserUtils {
  createJiraUrl(relativePath: string): string;
  goToUrl(fullPath: string): any;
  openUrl(path: string): Window | null;
  downloadFile(
    relativePath: string,
    nameToSaveAs: string,
    fileType: 'pdf' | 'xlsx',
  ): any;
  closeExternalDialog(data?: any): Promise<any>; // Used to close other dialogs outside of ui-notices e.g: IssueCreate
  getJwtQueryParameter(): string;

  // User picker
  searchUser(query: string): Promise<SelectOption[]>;

  showNotice: (
    noticeType: NoticeType,
    intlValues?: IntlValues,
    errorDetails?: string,
    isNotInJiraIframe?: boolean,
  ) => Promise<boolean>;

  createIssueFormUrl(
    projectId: number,
    templateFormId: number,
  ): (issueTypeId: string, requestTypeId?: string) => string;
}
