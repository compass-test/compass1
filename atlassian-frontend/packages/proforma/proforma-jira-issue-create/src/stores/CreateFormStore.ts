import { action, observable } from 'mobx';

import { FormStore } from '@atlassian/proforma-common-core/form-system-stores';
import { convertAnswers } from '@atlassian/proforma-common-core/form-system-utils';
import { NoticeType } from '@atlassian/proforma-common-core/jira-common';
import {
  BrowserUtils,
  clearAllFocus,
} from '@atlassian/proforma-common-core/jira-common-utils';

import {
  FormDetails,
  IssueCreateFormApiV3,
} from '../apis/IssueCreateFormApiV3';

export class CreateFormStore {
  public readonly formDetails: FormDetails;
  public readonly formStore: FormStore;
  @observable public cancelling = false;
  @observable public creating = false;
  @observable public completed = false;

  private readonly browserUtils: BrowserUtils;
  private readonly issueCreateFormApiV3: IssueCreateFormApiV3;

  public constructor(
    formDetails: FormDetails,
    formStore: FormStore,
    browserUtils: BrowserUtils,
    issueCreateFormApiV3: IssueCreateFormApiV3,
  ) {
    this.formDetails = formDetails;
    this.formStore = formStore;
    this.browserUtils = browserUtils;
    this.issueCreateFormApiV3 = issueCreateFormApiV3;
  }

  @action public cancel = (): Promise<boolean> => {
    if (this.completed || this.cancelling) {
      return Promise.reject();
    }
    this.cancelling = true;
    clearAllFocus();
    if (this.formStore.answersModified) {
      return this.browserUtils
        .showNotice(NoticeType.ConfirmCancelEdit, {
          msgVars: { formName: this.formStore.formName || 'Unknown form' },
        })
        .then(confirmed => {
          if (confirmed) {
            this.resetForm();
            this.completed = true;
          }
          return confirmed;
        })
        .finally(() => {
          this.cancelling = false;
        });
    } else {
      this.resetForm();
      this.cancelling = false;
      this.completed = true;
      return Promise.resolve(true);
    }
  };

  @action public resetForm = (): void => {
    this.formStore.discardModifiedAnswers();
    this.formStore.hideValidations();
  };

  @action public create = (): Promise<{
    issueKey: string;
    projectId: number;
  }> => {
    if (this.completed || this.creating) {
      return Promise.reject();
    }
    this.creating = true;
    if (this.formStore.validateOnCreate) {
      this.formStore.validate();
    }
    if (this.formStore.invalid) {
      this.creating = false;
      return Promise.reject();
    }
    return this.issueCreateFormApiV3
      .createIssue(
        this.formDetails.projectId,
        this.formDetails.projectFormId,
        this.formDetails.issueType.id,
        this.formDetails.requestType?.id,
        convertAnswers(this.formStore.questions),
      )
      .finally(() => {
        this.creating = false;
      });
  };
}
