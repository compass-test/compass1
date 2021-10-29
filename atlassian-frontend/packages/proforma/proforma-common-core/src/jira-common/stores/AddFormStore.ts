import { action, observable } from 'mobx';

import { SelectOption } from '../../form-system/models/SelectOption';
import { FormStore } from '../../form-system/stores/FormStore';
import { AvailableForms, FormApi } from '../apis/FormApi';
import { AddFormActions } from '../components/AddForm/AddFormActions';
import { UserSearchType } from '../models/UserSearchType';

export class AddFormStore implements AddFormActions {
  public readonly issueKey: string;
  public readonly issueId: number;
  public readonly hideAddForm: () => void;
  @observable public loadingAvailableForms: boolean = true;
  @observable public availableForms?: AvailableForms;
  @observable public previewTemplateFormId?: number;
  @observable public loadingFormPreview: boolean = false;
  @observable public previewFormStore?: FormStore;

  private readonly formApi: FormApi;
  private readonly addFormCallback: (templateFormId: number) => Promise<void>;
  private readonly loadFieldValuesFn: (
    formStore: FormStore,
  ) => () => Promise<void>;
  private readonly loadChoicesFn: (
    formStore: FormStore,
  ) => (questionId?: number, query?: string) => Promise<void>;
  private readonly searchUsers: (
    searchType: UserSearchType | undefined,
    questionId: number,
    query: string,
  ) => Promise<SelectOption[]>;

  public constructor(
    issueKey: string,
    issueId: number,
    formApi: FormApi,
    addFormCallback: (templateFormId: number) => Promise<void>,
    loadFieldValuesFn: (formStore: FormStore) => () => Promise<void>,
    loadChoicesFn: (
      formStore: FormStore,
    ) => (questionId?: number, query?: string) => Promise<void>,
    searchUsers: (
      searchType: UserSearchType | undefined,
      questionId: number,
      query: string,
    ) => Promise<SelectOption[]>,
    hideAddFormCallback: () => void,
  ) {
    this.issueKey = issueKey;
    this.issueId = issueId;
    this.hideAddForm = hideAddFormCallback;

    this.formApi = formApi;
    this.addFormCallback = addFormCallback;
    this.loadFieldValuesFn = loadFieldValuesFn;
    this.loadChoicesFn = loadChoicesFn;
    this.searchUsers = searchUsers;

    // Automatically load the available forms:
    formApi
      .findAvailableFormsForIssue(this.issueId)
      .then((availableForms: AvailableForms): void => {
        this.availableForms = availableForms;
      })
      .finally((): void => {
        this.loadingAvailableForms = false;
      });
  }

  @action
  public setPreviewTemplateFormId(templateFormId: number): void {
    this.previewTemplateFormId = templateFormId;
  }

  @action
  public loadFormPreview = (templateFormId: number): void => {
    this.loadingFormPreview = true;
    this.formApi
      .getFormPreview(this.issueId, templateFormId)
      .then(formPreview => {
        this.previewFormStore = new FormStore(
          this.loadFieldValuesFn,
          this.loadChoicesFn,
          this.searchUsers,
          formPreview,
          this.issueKey,
        );
      })
      .finally((): void => {
        this.loadingFormPreview = false;
      });
  };

  @action public addForm = (): void => {
    this.hideAddForm();
    this.previewTemplateFormId &&
      this.addFormCallback(this.previewTemplateFormId);
  };
}
