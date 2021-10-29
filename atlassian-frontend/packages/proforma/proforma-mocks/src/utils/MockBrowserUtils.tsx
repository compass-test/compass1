import React from 'react';

import ReactDOM from 'react-dom';

import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import {
  IntlValues,
  Notice,
  NoticeType,
} from '@atlassian/proforma-common-core/jira-common';
import { BrowserUtils } from '@atlassian/proforma-common-core/jira-common-utils';
import { Locale } from '@atlassian/proforma-translations';

export class MockBrowserUtils implements BrowserUtils {
  private readonly locale: Locale;

  public constructor(locale: Locale) {
    this.locale = locale;
  }

  createJiraUrl(relativePath: string): string {
    return relativePath;
  }

  goToUrl(fullPath: string) {
    window.location.href = fullPath;
  }

  openUrl(path: string): Window | null {
    return window.open(path, '_blank');
  }

  downloadFile(
    fullPath: string,
    nameToSaveAs: string,
    fileType: 'pdf' | 'xlsx',
  ) {
    const downloadLink = document.createElement('a');

    downloadLink.href = fullPath;
    if (nameToSaveAs) {
      downloadLink.setAttribute('download', nameToSaveAs);
    }

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  closeExternalDialog(data?: any): Promise<any> {
    return new Promise<any>(() => {});
  }

  getJwtQueryParameter(): string {
    return '';
  }

  searchUser(query: string): Promise<SelectOption[]> {
    const users: SelectOption[] = [
      {
        label: 'Automation for Jira',
        value: '557058:f58131cb-b67d-43c7-b30d-6b58d40bd077',
      },
      {
        label: 'Charles Gutjahr',
        value: '557058:7f243ab6-e67b-427f-850a-041bacec20d0',
      },
      { label: 'David Meiklejohn', value: '5b26fb5da85c48535467d76f' },
      {
        label: 'Kate Caldecott',
        value: '557058:c46f2eba-6006-42cc-a5fd-25369c89cd24',
      },
      { label: 'Peter Preston', value: '5c6135fbf3071d5706237989' },
      {
        label: 'ProForma Lite: Forms for Jira',
        value: '5b751124d52162052839447f',
      },
      { label: 'Robert Courtney', value: '5bd64feba6ec23204d6be970' },
      {
        label: 'Simon Herd',
        value: '557058:2334f03e-1868-41c6-aaa4-c4b3cd330a35',
      },
      {
        label: 'Simon Test',
        value:
          'qm:33249a7a-67f9-4b0f-890b-610a8bf0e8b6:467ccfa9-e9ee-4075-be65-79192bd7c259',
      },
      {
        label: 'simonhd@thinktilt.com',
        value:
          'qm:33249a7a-67f9-4b0f-890b-610a8bf0e8b6:936ab544-43b7-4a50-b99e-f4f12952a57e',
      },
      {
        label: 'swahn fraye',
        value: '557058:3fbc9d10-78fa-458c-a512-d3611f385c2a',
      },
    ];
    return new Promise<SelectOption[]>(resolve => {
      setTimeout(() => {
        resolve(
          users.filter(i =>
            i.label.toLowerCase().includes(query.toLowerCase()),
          ),
        );
      }, 1000);
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
        resolve(confirmed);
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

  private closeNotice(): boolean {
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
    return (issueTypeId: string, requestTypeId?: string) => {
      return `http://mockIssueFormUrl/${projectId}/${templateFormId}/${issueTypeId}`;
    };
  }
}
