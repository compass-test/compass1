import { action, observable } from 'mobx';

import { ViewMode } from '@atlassian/proforma-common-core/form-system';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import { FormStore } from '@atlassian/proforma-common-core/form-system-stores';
import { FormApiV3 } from '@atlassian/proforma-common-core/jira-common-apis';
import {
  ApiFormChoicesResponse,
  UserSearchType,
} from '@atlassian/proforma-common-core/jira-common-models';
import {
  CancelEditForm,
  cancelEditSelectedFormFn,
  downloadFormPdfFn,
  FormIndexStore,
  FormViewModuleContext,
  loadChoicesFn,
  loadFieldValuesFn,
  saveSelectedFormFn,
  SubmitSelectedForm,
  submitSelectedFormFn,
} from '@atlassian/proforma-common-core/jira-common-stores';
import { BrowserUtils } from '@atlassian/proforma-common-core/jira-common-utils';

export class PortalViewStore implements SubmitSelectedForm, CancelEditForm {
  public readonly serviceDeskId: number;
  public readonly issueKey: string;
  public readonly issueId: number;
  @observable public readonly formIndexStore: FormIndexStore;
  @observable public selectedFormStore?: FormStore;
  @observable public viewMode?: ViewMode;
  @observable public savingForm: boolean = false;
  @observable public submittingForm: boolean = false;

  private readonly cancelEditSelectedFormFn: () => Promise<void>;
  private readonly saveSelectedFormFn: () => Promise<void>;
  private readonly submitSelectedFormFn: () => Promise<void>;

  private readonly formApiV3: FormApiV3;
  private readonly browserUtils: BrowserUtils;

  public constructor(
    moduleContext: FormViewModuleContext,
    serviceDeskId: number,
    projectId: number,
    issueKey: string,
    issueId: number,
  ) {
    this.serviceDeskId = serviceDeskId;
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
      undefined,
      undefined,
      downloadFormPdfFn(moduleContext, issueKey, issueId),
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

    this.formApiV3 = moduleContext.apis.formApiV3;
    this.browserUtils = moduleContext.utils.browserUtils;
  }

  @action private formSelected = (
    formId?: number,
    loadForm: boolean = true,
  ): void => {
    if (!formId) {
      this.selectedFormStore = undefined;
      this.viewMode = undefined;
    } else if (loadForm) {
      this.formApiV3.getForm(formId).then(form => {
        this.selectedFormStore = new FormStore(
          loadFieldValuesFn(
            this.formApiV3.postFieldValues.bind(this.formApiV3),
          ),
          loadChoicesFn(
            (
              templateFormId: number,
              formId?: number,
            ): Promise<ApiFormChoicesResponse> =>
              (formId && this.formApiV3.getFormChoices(formId)) ||
              Promise.reject(),
            this.formApiV3.getInsightChoices.bind(this.formApiV3),
          ),
          (
            searchType: UserSearchType | undefined,
            questionId: number,
            query: string,
          ): Promise<SelectOption[]> => {
            if (searchType) {
              return this.formApiV3.searchUsers(1, questionId, query);
            }
            return this.browserUtils.searchUser(query);
          },
          form,
          this.issueKey,
        );
        this.viewMode = ViewMode.View;
      });
    }
  };

  @action public setViewMode = (viewMode: ViewMode): void => {
    this.viewMode = viewMode;
  };

  @action
  public readonly cancelEditSelectedForm = (): Promise<void> => {
    return this.cancelEditSelectedFormFn();
  };

  @action
  public readonly saveSelectedForm = (): Promise<void> => {
    return this.saveSelectedFormFn();
  };

  @action
  public readonly submitSelectedForm = (): Promise<void> => {
    return this.submitSelectedFormFn();
  };
}
