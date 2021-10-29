import { action, observable } from 'mobx';

import { ViewMode } from '@atlassian/proforma-common-core/form-system';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import { FormStore } from '@atlassian/proforma-common-core/form-system-stores';
import {
  FormApi,
  FormApiV3,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  ApiFormChoicesResponse,
  PermissionLevel,
  UserSearchType,
} from '@atlassian/proforma-common-core/jira-common-models';
import {
  AddFormStore,
  CancelEditForm,
  cancelEditSelectedFormFn,
  DeleteSelectedForm,
  deleteSelectedFormFn,
  downloadFormPdfFn,
  downloadFormXlsxFn,
  FormIndexStore,
  FormViewModuleContext,
  loadChoicesFn,
  loadFieldValuesFn,
  ReopenSelectedForm,
  reopenSelectedFormFn,
  saveSelectedFormFn,
  SubmitSelectedForm,
  submitSelectedFormFn,
  UpdateSelectedFormVisibility,
  updateSelectedFormVisibilityFn,
} from '@atlassian/proforma-common-core/jira-common-stores';
import { BrowserUtils } from '@atlassian/proforma-common-core/jira-common-utils';

export class IssueViewStore
  implements
    SubmitSelectedForm,
    CancelEditForm,
    ReopenSelectedForm,
    UpdateSelectedFormVisibility,
    DeleteSelectedForm {
  public readonly issueKey: string;
  public readonly issueId: number;
  @observable public readonly formIndexStore: FormIndexStore;
  @observable public selectedFormStore?: FormStore;
  @observable public viewMode?: ViewMode;
  @observable public savingForm: boolean = false;
  @observable public submittingForm: boolean = false;
  @observable public addFormStore?: AddFormStore;
  @observable public reopeningForm: boolean = false;
  @observable public updatingFormVisibility: boolean = false;

  private readonly _loadFieldValuesFn: (
    formStore: FormStore,
  ) => () => Promise<void>;
  private readonly _loadChoicesFn: (
    formStore: FormStore,
  ) => (questionId?: number, query?: string) => Promise<void>;
  private readonly cancelEditSelectedFormFn: () => Promise<void>;
  private readonly saveSelectedFormFn: () => Promise<void>;
  private readonly submitSelectedFormFn: () => Promise<void>;
  private readonly reopenSelectedFormFn: () => Promise<void>;
  private readonly updateSelectedFormVisibilityFn: (
    toInternal: boolean,
  ) => Promise<void>;
  private readonly deleteSelectedFormFn: () => Promise<void>;

  private readonly formApi: FormApi;
  private readonly formApiV3: FormApiV3;
  private readonly browserUtils: BrowserUtils;
  private readonly permissions: PermissionLevel;

  public constructor(
    moduleContext: FormViewModuleContext,
    projectId: number,
    issueKey: string,
    issueId: number,
  ) {
    this.issueKey = issueKey;
    this.issueId = issueId;
    this.formIndexStore = new FormIndexStore(
      projectId,
      issueKey,
      issueId,
      moduleContext.apis.formApiV3,
      moduleContext.utils.analyticsUtils,
      moduleContext.utils.browserUtils,
      moduleContext.permissions,
      this.formSelected.bind(this),
      () => this.selectedFormStore,
      this.showAddForm.bind(this),
      moduleContext.apis.formApi.deleteForm.bind(moduleContext.apis.formApi),
      downloadFormPdfFn(moduleContext, issueKey, issueId),
      downloadFormXlsxFn(moduleContext, issueKey, issueId),
    );

    this._loadFieldValuesFn = loadFieldValuesFn(
      moduleContext.apis.formApiV3.postFieldValues.bind(
        moduleContext.apis.formApiV3,
      ),
    );
    this._loadChoicesFn = loadChoicesFn(
      (
        templateFormId: number,
        formId?: number,
      ): Promise<ApiFormChoicesResponse> =>
        (formId && this.formApiV3.getFormChoices(formId)) || Promise.reject(),
      moduleContext.apis.formApiV3.getInsightChoices.bind(
        moduleContext.apis.formApiV3,
      ),
    );
    this.cancelEditSelectedFormFn = cancelEditSelectedFormFn(
      this,
      moduleContext.utils.browserUtils,
    );
    this.saveSelectedFormFn = saveSelectedFormFn(
      this,
      moduleContext.apis.formApi,
      moduleContext.utils.errorUtils,
    );
    this.submitSelectedFormFn = submitSelectedFormFn(
      this,
      moduleContext.apis.formApi,
      moduleContext.apis.formApiV3,
      moduleContext.utils,
    );
    this.reopenSelectedFormFn = reopenSelectedFormFn(
      this,
      this._loadFieldValuesFn.bind(this),
      this._loadChoicesFn.bind(this),
      this.searchUsers.bind(this),
      moduleContext.apis.formApiV3,
      moduleContext.utils,
      moduleContext.permissions,
    );
    this.updateSelectedFormVisibilityFn = updateSelectedFormVisibilityFn(
      this,
      moduleContext.apis.formApi,
      moduleContext.utils,
      moduleContext.permissions,
    );
    this.deleteSelectedFormFn = deleteSelectedFormFn(this);

    this.formApi = moduleContext.apis.formApi;
    this.formApiV3 = moduleContext.apis.formApiV3;
    this.browserUtils = moduleContext.utils.browserUtils;
    this.permissions = moduleContext.permissions;
  }

  private searchUsers = (
    searchType: UserSearchType | undefined,
    questionId: number,
    query: string,
  ): Promise<SelectOption[]> => {
    if (this.formIndexStore.selectedFormId) {
      if (searchType) {
        return this.formApiV3.searchUsers(
          this.formIndexStore.selectedFormId,
          questionId,
          query,
        );
      }
      return this.browserUtils.searchUser(query);
    }
    return Promise.resolve([]);
  };

  @action private formSelected = (
    formId?: number,
    loadForm: boolean = true,
  ): void => {
    this.hideAddForm();
    if (!formId) {
      this.selectedFormStore = undefined;
      this.viewMode = undefined;
    } else if (loadForm) {
      this.formApiV3.getForm(formId).then(form => {
        this.selectedFormStore = new FormStore(
          this._loadFieldValuesFn.bind(this),
          this._loadChoicesFn.bind(this),
          this.searchUsers.bind(this),
          form,
        );
        this.setViewMode(ViewMode.View);
      });
    }
  };

  @action public setViewMode = (viewMode: ViewMode): void => {
    this.viewMode = viewMode;
  };

  @action public showAddForm = (): void => {
    if (this.permissions.addForm) {
      this.formIndexStore.setSelectedFormId().then(clearedSelectedForm => {
        if (clearedSelectedForm) {
          this.addFormStore = new AddFormStore(
            this.issueKey,
            this.issueId,
            this.formApi,
            this.addForm.bind(this),
            this._loadFieldValuesFn.bind(this),
            this._loadChoicesFn.bind(this),
            this.searchUsers.bind(this),
            this.hideAddForm.bind(this),
          );
        }
      });
    }
  };

  @action private hideAddForm = (): void => {
    this.addFormStore = undefined;
  };

  @action public addForm = (templateFormId: number): Promise<void> => {
    return this.formApi.addForm(this.issueId, templateFormId).then(form => {
      return this.formIndexStore
        .loadIndex()
        .then(_ => this.formIndexStore.setSelectedFormId(form.id, false))
        .then(selectedTheAddedForm => {
          if (selectedTheAddedForm) {
            this.selectedFormStore = new FormStore(
              this._loadFieldValuesFn.bind(this),
              this._loadChoicesFn.bind(this),
              this.searchUsers.bind(this),
              form,
              this.issueKey,
            );
            this.setViewMode(ViewMode.Edit);
          }
        });
    });
  };

  @action public cancelEditSelectedForm = (): Promise<void> =>
    this.cancelEditSelectedFormFn();

  @action public saveSelectedForm = (): Promise<void> =>
    this.saveSelectedFormFn();

  @action public submitSelectedForm = (): Promise<void> =>
    this.submitSelectedFormFn();

  @action public reopenSelectedForm = (): Promise<void> =>
    this.reopenSelectedFormFn();

  @action public updateSelectedFormVisibility = (
    toInternal: boolean,
  ): Promise<void> => this.updateSelectedFormVisibilityFn(toInternal);

  @action public deleteSelectedForm = (): Promise<void> =>
    this.deleteSelectedFormFn();
}
