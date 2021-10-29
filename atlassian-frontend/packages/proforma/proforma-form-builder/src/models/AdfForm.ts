import { FormLayoutNode } from '@atlassian/proforma-common-core/form-system-models';

/**
 * A representation of a ProForma form completely encapsulated inside an ADF (Atlassian Document Format) document.
 * Equivalent to TemplateForm and Form, except that the heirarchy is inverted so that the form is inside the ADF document
 * instead of the ADF being inside the form.
 */
export type AdfForm = FormLayoutNode;
