export interface AddFormActions {
  setPreviewTemplateFormId: (templateFormId: number) => void;
  loadFormPreview: (templateFormId: number) => void;
  addForm: () => void;
  hideAddForm: () => void;
}
