export interface ListFormsActions {
  setSelectedFormId: (formId?: number) => Promise<boolean>;
  showAddForm?: () => void;
  deleteForm?: (formId: number, formName: string) => void;

  downloadFormPdf?: (formId: number) => void;
  downloadFormXlsx?: (formId: number, formName: string) => void;
}
