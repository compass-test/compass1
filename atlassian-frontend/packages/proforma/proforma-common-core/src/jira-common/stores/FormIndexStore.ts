import Cookies from 'js-cookie';
import { action, computed, observable } from 'mobx';

import { FormStatus } from '../../form-system/models/Form';
import { FormStore } from '../../form-system/stores/FormStore';
import { FormApiV3 } from '../apis/FormApiV3';
import { ListFormsItem } from '../components/ListForms/ListForms';
import { ListFormsActions } from '../components/ListForms/ListFormsActions';
import { NoticeType } from '../components/Notice/noticeTypes';
import { IssueIndexForm } from '../models/IssueIndexForm';
import { PermissionLevel } from '../models/PermissionLevel';
import { AnalyticsEventName, AnalyticsUtils } from '../utils/AnalyticsUtils';
import { BrowserUtils } from '../utils/BrowserUtils';

const LAST_VIEWED_FORM_COOKIE_NAME_PREFIX = 'lastViewedForm-';

interface LastViewedFormCookie {
  templateFormId: number | undefined;
}

export class FormIndexStore implements ListFormsActions {
  public readonly projectId: number;
  public readonly issueKey: string;
  public readonly issueId: number;
  @observable public isIndexLoading: boolean = true;
  @observable public readonly formIndex: IssueIndexForm[] = [];
  @observable public selectedFormId?: number;

  public readonly setSelectedFormIdCallback: (
    formId?: number,
    loadForm?: boolean,
  ) => void;
  private readonly selectedFormStore: () => FormStore | undefined;
  public readonly showAddForm?: () => void;
  public readonly deleteFormRequest?: (
    issueId: number,
    formId: number,
  ) => Promise<any>;
  public readonly downloadFormPdf?: (formId: number) => void;
  public readonly downloadFormXlsx?: (formId: number) => void;

  private readonly formApiV3: FormApiV3;
  private readonly analyticsUtils: AnalyticsUtils;
  private readonly browserUtils: BrowserUtils;
  private readonly permissions: PermissionLevel;

  public constructor(
    projectId: number,
    issueKey: string,
    issueId: number,
    formApiV3: FormApiV3,
    analyticsUtils: AnalyticsUtils,
    browserUtils: BrowserUtils,
    permissions: PermissionLevel,
    setSelectedFormIdCallback: (formId?: number, loadForm?: boolean) => void,
    selectedFormStore: () => FormStore | undefined,
    showAddForm?: () => void,
    deleteForm?: (issueId: number, formId: number) => Promise<any>,
    downloadFormPdf?: (formId: number) => void,
    downloadFormXlsx?: (formId: number) => void,
  ) {
    this.projectId = projectId;
    this.issueKey = issueKey;
    this.issueId = issueId;

    this.setSelectedFormIdCallback = setSelectedFormIdCallback;
    this.selectedFormStore = selectedFormStore;
    this.showAddForm = showAddForm;
    this.deleteFormRequest = deleteForm;
    this.downloadFormPdf = downloadFormPdf;
    this.downloadFormXlsx = downloadFormXlsx;

    this.formApiV3 = formApiV3;
    this.analyticsUtils = analyticsUtils;
    this.browserUtils = browserUtils;
    this.permissions = permissions;

    this.loadIndex().then(_ => {
      let issueIndexForm: IssueIndexForm | undefined;
      if (this.formIndex.length === 1) {
        issueIndexForm = this.formIndex[0];
      } else if (this.formIndex.length > 1) {
        const lastViewedTemplateFormId = getLastViewedForm(projectId)
          ?.templateFormId;
        if (lastViewedTemplateFormId) {
          // Open the most recent response to the form:
          const formResponses = this.formIndex.filter(
            issueIndexForm =>
              issueIndexForm.projectFormId === lastViewedTemplateFormId,
          );
          if (formResponses.length > 0) {
            issueIndexForm = formResponses[formResponses.length - 1];
          }
        } else if (!hasLastViewedForm(projectId)) {
          issueIndexForm = this.formIndex.find(
            issueIndexForm => !issueIndexForm.submitted && !issueIndexForm.lock,
          );
        }
      }
      if (issueIndexForm) {
        return this._setSelectedFormId(issueIndexForm.id);
      }
    });
  }

  @computed get formList(): ListFormsItem[] {
    return this.formIndex.map(formIndex => ({
      id: formIndex.id,
      internal: formIndex.internal,
      status: formIndex.lock
        ? FormStatus.Locked
        : formIndex.submitted
        ? FormStatus.Submitted
        : FormStatus.Open,
      name: formIndex.name,
    }));
  }

  @action public loadIndex = (): Promise<void> => {
    this.isIndexLoading = true;
    return this.formApiV3.getFormIndex().then(newFormIndex => {
      this.formIndex.splice(0, this.formIndex.length, ...newFormIndex);
      this.isIndexLoading = false;
    });
  };

  /** @return whether the requested `formId` was selected. */
  @action public setSelectedFormId = (
    formId?: number,
    loadForm: boolean = true,
  ): Promise<boolean> => {
    const selectedFormStore = this.selectedFormStore();
    if (selectedFormStore?.answersModified) {
      return this.browserUtils
        .showNotice(NoticeType.ConfirmCancelEdit, {
          msgVars: { formName: selectedFormStore.formName || 'Unknown form' },
        })
        .then(confirmed => {
          if (confirmed) {
            this._setSelectedFormId(formId, loadForm);
          }
          return confirmed;
        });
    }
    this._setSelectedFormId(formId, loadForm);
    return Promise.resolve(true);
  };

  @action private _setSelectedFormId = (
    formId?: number,
    loadForm: boolean = true,
  ): void => {
    this.selectedFormId = formId;
    setLastViewedForm(this.projectId, {
      templateFormId: this.selectedFormIndex()?.projectFormId,
    });
    this.setSelectedFormIdCallback(formId, loadForm);
  };

  @action public selectedFormIndex = (): IssueIndexForm | undefined => {
    return this.formIndex.find(
      formIndex => formIndex.id === this.selectedFormId,
    );
  };

  @action public deleteForm = (
    formId: number,
    formName: string,
  ): Promise<any> => {
    if (!this.deleteFormRequest) {
      // eslint-disable-next-line no-console
      console.error(
        'A form response deletion has been requested, but it is not supported.',
      );
      return Promise.reject();
    }
    if (!this.permissions.delete) {
      return Promise.reject();
    }
    return this.browserUtils
      .showNotice(NoticeType.ConfirmDeleteForm, { msgVars: { formName } })
      .then(confirmed => {
        if (confirmed) {
          return this.deleteFormRequest!(this.issueId, formId).then(
            (): void => {
              // Remove the form from the form index:
              const i = this.formIndex.findIndex(
                formIndex => formIndex.id === formId,
              );
              if (i >= 0) {
                this.formIndex.splice(i, 1);
              }
              // If deleting the selected form, then unset it:
              if (this.selectedFormId === formId) {
                this._setSelectedFormId();
              }
              this.analyticsUtils.track(AnalyticsEventName.DeleteForm, {});
            },
          );
        }
      });
  };

  @action public updateSelectedFormStatus(formStatus: FormStatus): void {
    const formIndex = this.selectedFormIndex();
    if (formIndex) {
      switch (formStatus) {
        case FormStatus.Open:
          formIndex.submitted = false;
          formIndex.lock = false;
          break;
        case FormStatus.Submitted:
          formIndex.submitted = true;
          formIndex.lock = false;
          break;
        case FormStatus.Locked:
          formIndex.submitted = true;
          formIndex.lock = true;
          break;
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('No form index selected to reopen:', this.selectedFormId);
    }
  }
}

const hasLastViewedForm = (projectId: number): boolean => {
  return !!Cookies.get(`${LAST_VIEWED_FORM_COOKIE_NAME_PREFIX}${projectId}`);
};

const getLastViewedForm = (
  projectId: number,
): LastViewedFormCookie | undefined => {
  return Cookies.getJSON(`${LAST_VIEWED_FORM_COOKIE_NAME_PREFIX}${projectId}`);
};

const setLastViewedForm = (
  projectId: number,
  lastViewedFormCookie: LastViewedFormCookie | undefined,
): void => {
  Cookies.set(
    `${LAST_VIEWED_FORM_COOKIE_NAME_PREFIX}${projectId}`,
    // @ts-ignore
    lastViewedFormCookie,
    { sameSite: 'None', Secure: true },
  );
};
