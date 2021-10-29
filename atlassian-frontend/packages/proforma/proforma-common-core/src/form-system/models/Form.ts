import { UserSearchType } from '../../jira-common/models/UserSearchType';

/**
 * A ProForma form with everything: supports all features in ProForma.
 */
export interface ProFormaForm {
  /**
   * ID of this form in its context. A 'context' means a Jira issue or a Jira project or perhaps something else.
   * IDs are not necessarily unique across all of ProForma, only unique within their context.
   */
  id?: number;

  /**
   * The date this form was last updated. Should be formatted as an ISO 8601 date and time in the UTC timezone (Z).
   */
  updated: UtcDateTime;

  /**
   * Optional property that configures how this form is published (if it is published somewhere).
   * Used only on template forms, not available on forms.
   */
  publish?: FormPublishing;

  /**
   * The design of the form: the static parts that don't change when filled in such as questions, sections and layout.
   */
  design: FormDesign;

  /**
   * The state of the form: the dynamic parts that people change when filling in a form.
   * Optional property, it is not available on template forms.
   */
  state?: FormState;

  /**
   * A hash of the critical parts of the form design used to detect if the form design has been changed without permission.
   * Optional property, it is only populated if the form is connected to Jira fields.
   */
  hash?: string;
}

/**
 * A ProForma form that cannot be filled out.  It serves as a template for forms that can be filled out, and is typically
 * copied onto Jira issues where it can be filled out.
 */
export interface TemplateForm extends ProFormaForm {
  /**
   * The ID of this template form in its context. A 'context' means a Jira project or perhaps something else.
   * IDs are not necessarily unique across all of ProForma, only unique within their context.
   */
  id: number;

  /**
   * Template forms do not have a state because they cannot be filled out.
   */
  state: undefined;
}

/**
 * A ProForma form that can be previewed.
 */
export interface UnsavedForm extends ProFormaForm {
  /**
   * ID of this form in its context. A 'context' means a Jira issue or perhaps something else.
   * IDs are not necessarily unique across all of ProForma, only unique within their context.
   */
  id: undefined;

  /**
   * The state of the form: the dynamic parts that people change when filling in a form.
   */
  state: FormState;
}

/**
 * A ProForma form that can be filled out.
 */
export interface Form extends ProFormaForm {
  /**
   * ID of this form in its context. A 'context' means a Jira issue or perhaps something else.
   * IDs are not necessarily unique across all of ProForma, only unique within their context.
   */
  id: number;

  /**
   * The state of the form: the dynamic parts that people change when filling in a form.
   */
  state: FormState;
}

/**
 * Configures how this form is published (if it is published somewhere).
 * Used only on template forms, not available on forms.
 */
export interface FormPublishing {
  jira?: FormPublishingJira;
  portal?: FormPublishingPortal;
}

/**
 * Configures how this form is published within Jira.
 * Used only on template forms, not available on forms.
 */
export interface FormPublishingJira {
  /**
   * The IDs of request types or issue types that this form is recommended for in the Jira issue view.
   */
  issueRequestTypeIds?: number[];

  /**
   * The IDs of issue types that this form can create issues for.
   * Forms with IDs populated here will be listed in the create issue form popup.
   */
  newIssueIssueTypeIds?: number[];

  /**
   * The IDs of request types that this form can create issues for.
   * Forms with IDs populated here will be listed in the create issue form popup.
   */
  newIssueRequestTypeIds?: number[];

  /**
   * Whether forms created by the create issue form feature should be submitted immediately.
   * The default is true, which means the form will be submitted at the same time as the issue is created.
   * If set to false the form will be not be submitted, instead it will be added to the issue with an open status.
   */
  submitOnCreate: boolean;

  /**
   * Whether the form is validated before the issue form feature create.
   * The default is the `submitOnCreate` value, which means by default a form must be valid before the issue form feature create is permitted to to proceed.
   * If the `submitOnCreate` value is false then by default `validateOnCreate` is also false, but it may be changed to true.
   *
   * Note that it is invalid for `validateOnCreate` to be false when `submitOnCreate` value is true. In this case ProForma should automatically
   * override `validateOnCreate` value to be true. (This will be done on the backend, the UI should not need to do this.)
   */
  validateOnCreate: boolean;
}

/**
 * Configures how this form is published on the Jira Service Desk portal.
 * Used only on template forms, not available on forms.
 */
export interface FormPublishingPortal {
  /**
   * The IDs of request types that this form will appear on in the JSD portal.
   * Forms with IDs populated here will be listed on the JSD portal.
   */
  portalRequestTypeIds?: number[];

  /**
   * Whether forms created by the JSD portal should be submitted immediately.
   * The default is true, which means the form will be submitted immediately after the portal request is created.
   * If set to false the form will be not be submitted, instead it will be added to the request with an open status.
   */
  submitOnCreate: boolean;

  /**
   * Whether the form is validated before the portal create.
   * The default is the `submitOnCreate` value, which means by default a form must be valid before the portal create is permitted to to proceed.
   * If the `submitOnCreate` value is false then by default `validateOnCreate` is also false, but it may be changed to true.
   *
   * Note that it is invalid for `validateOnCreate` to be false when `submitOnCreate` value is true. In this case ProForma should automatically
   * override `validateOnCreate` value to be true. (This will be done on the backend, the UI should not need to do this.)
   */
  validateOnCreate: boolean;
}

export const defaultFormPublishing:
  | FormPublishingPortal
  | FormPublishingJira = {
  submitOnCreate: true,
  validateOnCreate: true,
};

/**
 * The design of the form: the static parts that don't change when filled in such as questions, sections and layout.
 */
export interface FormDesign {
  /**
   * General form settings, ie those which affect the entire form.
   * Other settings are applied at the section or question level.
   */
  settings: FormSettings;

  /**
   * Visual layout of the form, ie a document containing the structure and layout of where the sections and questions appear on the form.
   * This is an ADF (Atlassian Document Format) document.
   */
  layout: FormLayout[];

  /**
   * Conditions applied to sections, questions and choices which may change the visibility of those items.
   */
  conditions: FormConditions;

  /**
   * Sections of the form, used to apply conditions to more of the form than just a single question.
   * It is valid for a form to have zero sections; indeed it is normal when there are no conditions on the form.
   */
  sections: FormSections;

  /**
   * Questions on the form.
   */
  questions: FormQuestions;
}

/**
 * The state of the form: the dynamic parts that people change when filling in a form.
 * Optional property, it is not available on template forms.
 */
export interface FormState {
  /**
   * The visibility of a form, which may be internal or external.
   *
   * This only has meaning in the context of a form on Jira Service Desk.
   * Its meaning in other contexts is undefined. Forms should default to using Internal in other contexts because
   * Internal is more restrictive and so probably a safer choice should a form ever be moved into Jira Service Desk.
   */
  visibility: FormVisibility;

  /**
   * The status of a form: open, submitted or locked.
   */
  status: FormStatus;

  /**
   * The answers to questions on this form.
   *
   * Answers will only be populated when someone fills out a form; if the form has not been filled out then the
   * answers object may be empty. It is also possible for the answers object to be partially populated: some but
   * not all answers listed. However there should not a situation where there is an answer which does not have a
   * matching question in the form questions object.
   */
  answers: FormAnswers;
}

/**
 * General form settings, ie those which affect the entire form.
 * Other settings are applied at the section or question level.
 */
export interface FormSettings {
  /**
   * The ID of the template form that this form was created from.
   * When this form is itself a template form `templateId` should be equal to the `id` of the form.
   */
  templateId: number;

  /**
   * The name of this form, set by the form designer.
   */
  name: string;

  /**
   * Settings overriding behaviour on the JSD portal
   */
  portal?: FormSettingsPortal;

  /**
   * Settings controlling what happens on submit of this form.
   */
  submit: FormSettingsSubmit;

  /**
   * Optional language of this form. The language set here defines what language to use for the UI on the form
   * such as buttons and validation messages. It does not affect the text of the questions or answers which
   * could be written by users in any language (or even none!)
   *
   * If not provided then the language will be determined automatically based on the user's language settings.
   */
  language?: string;
}

/**
 * Settings specific to the Jira Service Desk portal. Not applicable when JSD is not installed.
 */
export interface FormSettingsPortal {
  /**
   * Whether users on the JSD portal are allowed to submit this form, if it is open and they have access to it on the portal (it is external).
   * True by default: users are allowed to submit open forms on the portal.
   */
  canSubmit: boolean;
}

/**
 * Settings controlling what happens on submit of this form.
 */
export interface FormSettingsSubmit {
  /**
   * Whether to lock the form when it is submitted.
   * The default is false, meaning the form is submitted but it can be reopened later.
   * If set to true the form is locked when submitted, meaning it cannot be reopened later (unless overridden by an administrator).
   */
  lock: boolean;

  /**
   * Whether to generate a PDF of the form when it is submitted.
   * The default is false, meaning no PDF is generated by default.
   */
  pdf: boolean;
}

/**
 * Visual layout of the form, ie a document containing the structure and layout of where the sections and questions appear on the form.
 * This is an ADF (Atlassian Document Format) document.
 */
export interface FormLayout extends FormLayoutNode {
  version: 1;
  type: 'doc';
  content: Array<FormLayoutNode>;
}

export interface FormLayoutNode {
  type: string;
  content?: Array<FormLayoutNode>;
  [key: string]: any;
}

export interface FormLayoutNodeExtension extends FormLayoutNode {
  type: 'extension';
  attrs: {
    extensionKey: string;
    extensionType: string;
    parameters?: AdfFormQuestion | AdfFormSection;
    text?: string;
    layout?: string;
  };
}

export interface AdfFormQuestion extends FormQuestion {
  id?: string | number;
}

export interface AdfFormSection {
  id: string | number;
  /**
   * The Atlassian Editor displays this as the title of the bodiedExtension, so we use it during editing but do not save it to the backend.
   */
  extensionTitle?: string;

  name?: string;

  conditions?: FormConditions;
}

/**
 * Conditions applied to sections, questions and choices which may change the visibility of those items.
 */
export interface FormConditions {
  [conditionId: string]: FormCondition;
}

/**
 * Base interface for a condition. Different types of conditions extend this to provide type-specific configuration
 * of the condition.
 */
export interface FormCondition {
  t: FormConditionType;
  i: FormConditionInput;
  o: FormConditionOutput;
}

/**
 * The input into a condition which defines whether or not the condition is triggered.
 */
export interface FormConditionInput {
  /** Groups multiple inputs with boolean 'or' logic. */
  or?: FormConditionInput[];
  /** Inverts an input with boolean 'not' logic. */
  not?: FormConditionInput;

  co?: OneChoiceInput;
}

/**
 * A form condition input which is fulfilled when the answer to a choice question includes any one of the choices nominated in `cIds`.
 */
export interface OneChoiceInput {
  cIds: {
    [questionId: string]: string[];
  };
}

/**
 * Condition output describes what items the condition affects when it is triggered: choices, questions, sections or the whole form.
 * Which items may be affected will depend on the condition type.
 */
export interface FormConditionOutput {
  /**
   * A list of section IDs that this condition applies to.
   */
  sIds?: string[];

  /**
   * A list of question IDs that this condition applies to. If the condition applies to specific choices of the question rather than
   * the question itself then the question should be specified in the `cIds` property rather than in `qIds`.
   */
  qIds?: string[];

  /**
   * A map of choice IDs that this condition applies to. Choice IDs are meaningless without a question ID for context so all choice IDs
   * are specified as the value on a map with question IDs as the key.
   */
  cIds?: {
    [questionId: string]: string[];
  };

  /**
   * A boolean indicating whether the condition applies to the entire form.
   */
  form?: boolean;
}

export function isShowCondition(c: FormCondition): c is ShowCondition {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return c.t === FormConditionType.Show;
}

/**
 * Show condition: hides and shows a section or question based on choices made in a previous question.
 */
export interface ShowCondition extends FormCondition {
  t: FormConditionType.Show;
}

/**
 * Sections of the form, used to apply conditions to more of the form than just a single question.
 */
export interface FormSections {
  [sectionId: string]: FormSection;
}

/**
 * A single section of a form.
 */
export interface FormSection {
  /**
   * The type of this section. Set to `Block` by default.
   */
  type: FormSectionType;

  /**
   * The name of this section, used for identification but not displayed to people filling in the form.
   */
  name?: string;

  /**
   * List of Condition IDs that are applied to this section, this includes cascading conditions for other sections
   */
  conditions?: string[];
}

/**
 * Questions on the form.
 */
export interface FormQuestions {
  [questionKey: string]: FormQuestion;
}

/**
 * A single question on a form.
 */
export interface FormQuestion {
  /**
   * Type of question: defines how the question appears and is used on the form, and how it can be answered.
   */
  type: FormQuestionType;

  /**
   * The label displayed to people filling out the form. Though it is required, it may be an empty string.
   */
  label: string;

  /**
   * An optional description displayed to people filling out the form. Intended for help text or other information
   * associated directly with the question.
   */
  description?: string;

  /**
   * Validation rules for the question. It is valid for this to contain no validation rules.
   * Certain types have implied validation rules which are not explicitly added to `validation`;
   * for example email questions validate that an answer is a valid email address but do not have store
   * a specific validator in the form template.
   */
  validation: FormValidation;

  /**
   * Choices defined for this question. Only applicable to choice questions.
   * If a choice question is linked to a Jira field then the choices will be populated from the Jira field
   * and should not be saved in the form itself while the form is open.
   */
  choices?: FormChoice[];

  /**
   * Whether this question is known to have more choices than are stored in `choices`.
   */
  hasMoreChoices?: boolean;

  /**
   * Conditions applicable to this question.
   */
  conditions?: string[];

  /**
   * The linked Jira field, if any. When linked to a Jira field the answer to a question is stored on the Jira field
   * for the issue rather than in the form directly — while the form is open, it is saved in the form on submit.
   */
  jiraField?: string;

  /**
   * The linked data connection id, if any. When linked to a data connection, the available answers are sourced from the
   * data connection and the answer IDs are stored in the form directly.
   */
  dcId?: string;

  /**
   * The default value for this question, if any. If populated then this answer is automatically applied when the form
   * is filled in.
   */
  defaultAnswer?: FormAnswer;

  /**
   * a unique identifier for this question on a form.
   */
  questionKey?: string;

  /**
   * An optional type of UserSearch to be used for this question
   */
  searchType?: UserSearchType;

  /**
   * Whether this question should be readOnly
   */
  readOnly?: boolean;
}

/**
 * A choice on a choice question.
 */
export interface FormChoice {
  id: string;
  label: string;
  other?: boolean;
}

/**
 * Form question validation configuration.
 */
export interface FormValidation {
  /** Required */
  rq?: boolean;
  /** Minimum characters */
  mnc?: number;
  /** Minimum words */
  mnw?: number;
  /** Minimum number */
  mnn?: number;
  /** Minimum date */
  mnd?: LocalDate;
  /** Minimum time */
  mnt?: LocalTime;
  /** Minimum number of choice selections */
  mns?: number;
  /** Maximum characters */
  mxc?: number;
  /** Maximum words */
  mxw?: number;
  /** Maximum number */
  mxn?: number;
  /** Maximum date */
  mxd?: LocalDate;
  /** Maximum time */
  mxt?: LocalTime;
  /** Maximum number of choice selections */
  mxs?: number;
  /** Whole numbers only */
  wh?: boolean;
  /** ID of required choice  */
  ch?: string;
  /** Regex format validation */
  rgx?: {
    /** Regex pattern */
    p: string | RegExp;
    /** Message to display to user if the answer doesn't match the expected format */
    m?: string;
  };
}

/**
 * The answers to questions on a form.
 *
 * Answers will only be populated when someone fills out a form; if the form has not been filled out then the
 * answers object may be empty. It is also possible for the answers object to be partially populated: some but
 * not all answers listed. However there should not a situation where there is an answer which does not have a
 * matching question in the form questions object.
 */
export interface FormAnswers {
  [questionKey: string]: FormAnswer;
}

/**
 * Answer to a single question on a form.
 * Can also be used to define the default answer to a question.
 */
export interface FormAnswer {
  /**
   * Text part of an answer.
   */
  text?: string;

  /**
   * Date part of an answer.
   */
  date?: LocalDate;

  /**
   * Time part of an answer.
   */
  time?: LocalTime;

  /**
   * IDs of choices that have been selected.
   */
  choices?: string[];

  /**
   * Users that have been selected.
   */
  users?: FormUser[];
}

/**
 * Instance of a FormAnswer object without any answer.
 */
export const FormAnswerEmpty: FormAnswer = {};

/**
 * A user selected in a user picker.
 */
export interface FormUser {
  id: string;
  name: string;
}

/** A string in ISO 8601 date and time format, in UTC timezone. */
export type UtcDateTime = string;

/** A string in ISO 8601 date format with no timezone. */
export type LocalDate = string;

/** A string in ISO 8601 time format with no timezone. */
export type LocalTime = string;

/**
 * The visibility of a form, which may be internal or external.
 */
export enum FormVisibility {
  /**
   * Internal form: in the context of Jira Service Desk this means the form only appears inside Jira and not on the Jira Service Desk portal.
   * In other contexts like template forms and Jira Software the meaning is undefined.
   */
  Internal = 'i',

  /**
   * External form: in the context of Jira Service Desk this means the form appears both in Jira and on the Jira Service Desk portal.
   * In other contexts like template forms and Jira Software the meaning is undefined.
   */
  External = 'e',
}

export enum FormStatus {
  Open = 'o',
  Submitted = 's',
  Locked = 'l',
}

export enum FormConditionType {
  Show = 'sh',
}

export enum FormSectionType {
  Block = 'b',
  Page = 'p',
}

export enum FormQuestionType {
  ChoiceDropdown = 'cd',
  ChoiceMultiple = 'cm',
  ChoiceDropdownMultiple = 'cl',
  ChoiceSingle = 'cs',
  Date = 'da',
  DateTime = 'dt',
  Number = 'no',
  TextEmail = 'te',
  TextLong = 'tl',
  TextParagraph = 'pg',
  TextShort = 'ts',
  TextUrl = 'tu',
  Time = 'ti',
  UserMultiple = 'um',
  UserSingle = 'us',
}

export const choiceQuestionTypes = [
  FormQuestionType.ChoiceDropdown,
  FormQuestionType.ChoiceMultiple,
  FormQuestionType.ChoiceSingle,
  FormQuestionType.ChoiceDropdownMultiple,
];

export const textQuestionTypes = [
  FormQuestionType.TextShort,
  FormQuestionType.TextLong,
  FormQuestionType.TextParagraph,
  FormQuestionType.TextEmail,
  FormQuestionType.TextUrl,
];
