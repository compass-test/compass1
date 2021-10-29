import { action, observable } from 'mobx';

import { NoticeType } from '@atlassian/proforma-common-core/jira-common';

import { FormDetails } from '../apis/IssueCreateFormApiV3';
import { IssueCreateModuleContext } from '../components';

import { loadCreateFormStoreFn } from './actions/loadCreateFormStoreFn';
import { ChangeIssueFormStore } from './ChangeIssueFormStore';
import { CreateFormStore } from './CreateFormStore';

export class IssueCreateStore {
  @observable public loadingPreferredFormDetails: boolean = true;
  @observable public loadingForm: boolean = false;
  @observable public createFormStore?: CreateFormStore;
  @observable public changeIssueFormStore?: ChangeIssueFormStore;
  @observable public createAnother: boolean = false;
  @observable public creatingIssue: boolean = false;
  @observable public showIssueCreateSuccessBanner: boolean = false;

  private readonly loadCreateFormStore: (
    formDetails: FormDetails,
  ) => Promise<CreateFormStore | undefined>;

  private readonly moduleContext: IssueCreateModuleContext;
  private currentProjectId?: number;

  public constructor(
    moduleContext: IssueCreateModuleContext,
    projectId?: number,
  ) {
    this.moduleContext = moduleContext;

    this.loadCreateFormStore = loadCreateFormStoreFn(
      moduleContext.utils.browserUtils,
      moduleContext.utils.errorUtils,
      moduleContext.apis.issueCreateFormApiV3,
    );

    moduleContext.apis.userApi
      .getPreferredForm(projectId)
      .then(this.loadForm.bind(this))
      .finally(() => {
        this.loadingPreferredFormDetails = false;
      });
  }

  @action private loadForm = (formDetails: FormDetails): Promise<void> => {
    this.loadingForm = true;
    this.currentProjectId = formDetails.projectId;
    return this.loadCreateFormStore(formDetails)
      .then(createFormStore => {
        this.createFormStore = createFormStore;
      })
      .finally(() => {
        this.loadingForm = false;
      });
  };
  @action public cancel = (): Promise<void> =>
    this.moduleContext.utils.browserUtils.closeExternalDialog();

  @action public showChangeForm = (): void => {
    this.changeIssueFormStore = new ChangeIssueFormStore(
      this.moduleContext,
      this.setFormDetails,
      this.currentProjectId,
    );
  };

  @action public setCreateAnother = (value: boolean): void => {
    this.createAnother = value;
  };

  @action private setFormDetails = (
    formDetails: FormDetails,
  ): Promise<void> => {
    this.changeIssueFormStore = undefined;
    return this.loadForm(formDetails);
  };

  @action public createIssue = (): Promise<void> => {
    const createFormStore = this.createFormStore;
    if (!createFormStore) {
      // eslint-disable-next-line no-console
      console.error(
        'Cannot create the issue because the create form store is not defined.',
      );
      return Promise.reject();
    }
    this.creatingIssue = true;
    return createFormStore
      .create()
      .then(newIssueDetails => {
        if (this.createAnother) {
          this.popIssueCreateSuccessBanner();
          createFormStore.resetForm();
        } else {
          const newJiraIssueUrl = this.moduleContext.apis.issueCreateFormApiV3.getIssuePageUrl(
            newIssueDetails.issueKey,
          );
          this.moduleContext.utils.browserUtils.goToUrl(newJiraIssueUrl);
          return this.moduleContext.utils.browserUtils.closeExternalDialog();
        }
      })
      .catch(error => {
        if (error) {
          const errorDetails = error.details || undefined;
          return this.moduleContext.utils.errorUtils.notifyUser(
            NoticeType.ErrorApiCreateIssueFailed,
            errorDetails,
          );
        }
      })
      .finally(() => {
        this.creatingIssue = false;
      });
  };

  @action
  private popIssueCreateSuccessBanner(): void {
    this.showIssueCreateSuccessBanner = true;
    setTimeout((): void => {
      this.showIssueCreateSuccessBanner = false;
    }, 5000);
  }
}
