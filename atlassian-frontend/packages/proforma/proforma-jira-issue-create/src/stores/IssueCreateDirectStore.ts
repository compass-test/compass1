import { action, observable } from 'mobx';

import { NoticeType } from '@atlassian/proforma-common-core/jira-common';
import {
  AnalyticsEventName,
  AnalyticsUtils,
  BrowserUtils,
  ErrorUtils,
} from '@atlassian/proforma-common-core/jira-common-utils';

import { IssueCreateFormApiV3 } from '../apis/IssueCreateFormApiV3';
import { IssueCreateDirectContext } from '../components';

import { loadCreateFormStoreFn } from './actions/loadCreateFormStoreFn';
import { CreateFormStore } from './CreateFormStore';

export class IssueCreateDirectStore {
  @observable public loading: boolean = true;
  @observable public createFormStore?: CreateFormStore;
  @observable public invalid: boolean = false;

  private readonly analyticsUtils: AnalyticsUtils;
  private readonly browserUtils: BrowserUtils;
  private readonly errorUtils: ErrorUtils;
  private readonly issueCreateFormApiV3: IssueCreateFormApiV3;

  public constructor(
    moduleContext: IssueCreateDirectContext,
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ) {
    this.analyticsUtils = moduleContext.utils.analyticsUtils;
    this.browserUtils = moduleContext.utils.browserUtils;
    this.errorUtils = moduleContext.utils.errorUtils;
    this.issueCreateFormApiV3 = moduleContext.apis.issueCreateFormApiV3;

    moduleContext.apis.issueCreateFormApiV3
      .getFormDetails(projectId, templateFormId, issueTypeId, requestTypeId)
      .then(formDetails => {
        if (formDetails) {
          return loadCreateFormStoreFn(
            moduleContext.utils.browserUtils,
            moduleContext.utils.errorUtils,
            moduleContext.apis.issueCreateFormApiV3,
          )(formDetails).then(createFormStore => {
            this.createFormStore = createFormStore;
            if (!createFormStore) {
              this.invalid = true;
            }
          });
        } else {
          this.invalid = true;
        }
      })
      .catch(_ => {
        this.invalid = true;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  @action public createIssue = (): Promise<void> => {
    if (!this.createFormStore) {
      // eslint-disable-next-line no-console
      console.error(
        'Cannot create the issue because the create form store is not defined.',
      );
      return Promise.reject();
    }
    return this.createFormStore
      .create()
      .then(newIssueDetails => {
        this.analyticsUtils.track(AnalyticsEventName.IssueCreateDirect, {});
        const newJiraIssueUrl = this.issueCreateFormApiV3.getIssuePageUrl(
          newIssueDetails.issueKey,
        );
        this.browserUtils.goToUrl(newJiraIssueUrl);
      })
      .catch(error => {
        if (error) {
          const errorDetails = error.details || undefined;
          return this.errorUtils.notifyUser(
            NoticeType.ErrorApiCreateIssueFailed,
            errorDetails,
          );
        }
      });
  };
}
