import React from 'react';

import ReactDOM from 'react-dom';

import { Locale } from '@atlassian/proforma-translations';

import { SelectOption } from '../../../form-system/models/SelectOption';
import { IntlValues, Notice } from '../../components/Notice';
import { NoticeType } from '../../components/Notice/noticeTypes';
import { BackendEnvironment } from '../../models/BackendEnvironment';
import { BackendSettings } from '../../models/BackendSettings';
import { FoundUsers } from '../../models/jira/FoundUsers';
import { AuthUtil } from '../auth/AuthUtil';
import { BrowserUtils } from '../BrowserUtils';
import { cloudEnvironment } from '../environments';

interface WindowWithUrl extends Window {
  URL: typeof URL;
}

declare const window: WindowWithUrl;

export class LiveBrowserUtils<ContextType> implements BrowserUtils {
  protected readonly authUtil: AuthUtil;
  protected readonly env: BackendEnvironment = cloudEnvironment;
  protected readonly settings: BackendSettings<ContextType>;
  protected readonly locale: Locale; // DO NOT USE. Only used for passing locale to showNotice

  constructor(
    settings: BackendSettings<ContextType>,
    authUtil: AuthUtil,
    locale: Locale,
  ) {
    this.settings = settings;
    this.authUtil = authUtil;
    this.locale = locale;
  }

  createJiraUrl(relativePath: string): string {
    const jiraBaseUrl = this.settings.urls.jira;
    const slashRelativePath =
      relativePath.charAt(0) === '/' ? relativePath : `/${relativePath}`;
    return `${jiraBaseUrl}${slashRelativePath}`;
  }

  goToUrl(fullPath: string) {
    window.location.assign(fullPath);
  }

  openUrl(path: string): Window | null {
    return window.open(path, '_blank');
  }

  downloadFile(
    relativePath: string,
    nameToSaveAs: string,
    fileType: 'pdf' | 'xlsx',
  ) {
    const contentType =
      fileType === 'pdf'
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    const apiBaseUrl = this.settings.urls.api;

    const preFlight: RequestInit = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': contentType,
        Authorization: `Bearer ${this.authUtil.authToken}`,
      },
    };

    return fetch(apiBaseUrl + relativePath, preFlight)
      .then((response: any) => {
        if (response.ok) {
          return response.blob();
        }
        throw response;
      })
      .then((blob: any) => {
        const fileUrl = window.URL.createObjectURL(blob);

        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, nameToSaveAs);
          return;
        }

        const downloadLink = window.document.createElement('a');

        downloadLink.href = fileUrl;
        downloadLink.setAttribute('download', nameToSaveAs);

        window.document.body.appendChild(downloadLink);
        downloadLink.click();
        window.document.body.removeChild(downloadLink);
      });
  }

  closeExternalDialog(data?: any): Promise<any> {
    return new Promise<void>(resolve => {
      resolve();
      this.closeNotice();
    });
  }

  getJwtQueryParameter(): string {
    return `jwt=${this.settings.token}`;
  }

  searchUser(query: string): Promise<SelectOption[]> {
    return fetch(`/rest/api/3/user/picker?query=${encodeURIComponent(query)}`)
      .then<FoundUsers>(response => response.json())
      .then(data =>
        data.users.map(user => ({
          value: user.accountId,
          label: user.displayName ?? '',
        })),
      )
      .catch((e: any) => {
        // eslint-disable-next-line no-console
        console.warn(e);
        throw e;
      });
  }

  showNotice(
    noticeType: NoticeType,
    intlValues?: IntlValues,
    errorDetails?: string,
  ): Promise<boolean> {
    return new Promise(resolve => {
      const dialogTargetNode = document.getElementById('pf-dialog-container');
      if (!dialogTargetNode) {
        // eslint-disable-next-line no-console
        console.error(
          `Could not show notice ${noticeType}. The target Node for the dialog is not available`,
        );
        resolve(false);
      }

      const handleClose = (confirmed?: boolean): void => {
        resolve(!!confirmed);
        this.closeNotice();
      };

      ReactDOM.render(
        <Notice
          noticeType={noticeType}
          handleClose={handleClose}
          settings={{ intlValues, errorDetails, customLocale: this.locale }}
        />,
        dialogTargetNode,
      );
    });
  }

  protected closeNotice(): boolean {
    const dialogTargetNode = document.getElementById('pf-dialog-container');
    if (!dialogTargetNode) {
      // eslint-disable-next-line no-console
      console.error(
        `Could not close notice. The target Node for the dialog is not available`,
      );
      return false;
    }

    const closed = ReactDOM.unmountComponentAtNode(dialogTargetNode);
    if (!closed) {
      // eslint-disable-next-line no-console
      console.error(`Could not close notice. There is no dialog to unmount`);
    }

    return closed;
  }

  createIssueFormUrl(
    projectId: number,
    templateFormId: number,
  ): (issueTypeId: string, requestTypeId?: string) => string {
    const jiraBaseUrl = this.settings.urls.jira.endsWith('/')
      ? this.settings.urls.jira
      : `${this.settings.urls.jira}/`;
    return (issueTypeId: string, requestTypeId?: string) => {
      const requestType = requestTypeId
        ? `&ac.requesttype.id=${requestTypeId}`
        : '';
      return `${jiraBaseUrl}plugins/servlet/ac/${this.env.appKey}/create-issue-direct?ac.project.id=${projectId}&ac.form.id=${templateFormId}&ac.issuetype.id=${issueTypeId}${requestType}`;
    };
  }
}
