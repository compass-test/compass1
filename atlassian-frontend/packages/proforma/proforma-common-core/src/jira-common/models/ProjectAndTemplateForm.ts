import { TemplateForm } from '../../form-system/models/Form';

import { Project } from './Project';

export interface ProjectAndTemplateForm {
  project: Project;
  form: TemplateForm;
}
