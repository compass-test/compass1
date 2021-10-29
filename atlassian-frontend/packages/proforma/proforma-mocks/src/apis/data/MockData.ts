import {
  defaultFormPublishing,
  Form,
  FormStatus,
  FormVisibility,
  TemplateForm,
  UnsavedForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { convertTemplateFormToUnsavedForm } from '@atlassian/proforma-common-core/form-system-utils';
import {
  AvailableForm,
  AvailableForms,
  XlsxDownloadTask,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  AutomationRuleData,
  FormBuilderDataConnections,
  FormBuilderJiraFields,
  IssueFieldValue,
  IssueIndexForm,
  JiraFieldType,
  Project,
  ProjectWithEnabledState,
  ReferenceData,
  RequestType,
  TemplateFormIndex,
  TicketType,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  avatarURLIssueTypes,
  avatarURLRequestTypes,
  exampleIssueTypes,
  exampleRequestTypes,
  formDesignFactory,
  formSettingsFactory,
  projectWithEnabledStateFactory,
  templateFormIndexFactory,
  templateFormWithBasicDesignFactory,
  ticketTypeFactory,
} from './factories';
import { Issue } from './Issue';
import issueTest1FieldValues from './v3/issue-TEST-1-fieldvalues.json';
import issueTest1Form1Choices from './v3/issue-TEST-1-form-1-formchoices.json';
import issueTest1Form1 from './v3/issue-TEST-1-form-1.json';
import issueTest1Form10Choices from './v3/issue-TEST-1-form-10-formchoices.json';
import issueTest1Form10 from './v3/issue-TEST-1-form-10.json';
import issueTest1Form2Choices from './v3/issue-TEST-1-form-2-formchoices.json';
import issueTest1Form2 from './v3/issue-TEST-1-form-2.json';
import issueTest1Form20Choices from './v3/issue-TEST-1-form-20-formchoices.json';
import issueTest1Form20 from './v3/issue-TEST-1-form-20.json';
import issueTest1Form3Choices from './v3/issue-TEST-1-form-3-formchoices.json';
import issueTest1Form3 from './v3/issue-TEST-1-form-3.json';
import issueTest1Form99Choices from './v3/issue-TEST-1-form-99-formchoices.json';
import issueTest1Form99 from './v3/issue-TEST-1-form-99.json';
import issueTest1FormIndex from './v3/issue-TEST-1-formindex.json';
import issueTest1Insight from './v3/issue-TEST-1-insight.json';

export const initialJiraFieldsData: FormBuilderJiraFields = {
  common: [
    {
      key: 'summary',
      name: 'Summary',
      fieldType: JiraFieldType.Text,
    },
  ],
  other: [],
};

export interface MockV3Data {
  issue: {
    [key: string]: {
      fieldvalues: {
        [key: string]: IssueFieldValue;
      };
      formindex: IssueIndexForm[];
      form: {
        [key: string]: {
          form: Form;
          formchoices: any;
        };
      };
      insight: {
        [key: string]: any;
      };
    };
  };
}

export const initialReferenceData: ReferenceData = {
  statuses: [],
  issueTypes: [],
  requestTypes: [],
};

export class MockData {
  issueFormsEnabled = false;

  adfFormBuilderEnabled = false;

  analyticsEnabled = true;

  defaultEnabled = true;

  projects: ProjectWithEnabledState[] = [];

  requestTypes: RequestType[] = [];

  templateFormIndexes: TemplateFormIndex[] = [];

  xlsxDownloadTasksStatus: { [key: string]: XlsxDownloadTask[] } = {
    '0-1': [
      {
        id: 100,
        status: {
          complete: false,
          failed: false,
          progress: 0,
        },
      },
      {
        id: 100,
        status: {
          complete: false,
          failed: false,
          progress: 50,
        },
      },
      {
        id: 100,
        status: {
          complete: true,
          failed: false,
          progress: 100,
        },
      },
    ],
    '0-2': [
      {
        id: 200,
        status: {
          complete: false,
          failed: false,
          progress: 0,
        },
      },
      {
        id: 200,
        status: {
          complete: false,
          failed: false,
          progress: 25,
        },
      },
      {
        id: 200,
        status: {
          complete: false,
          failed: false,
          progress: 60,
        },
      },
      {
        id: 200,
        status: {
          complete: false,
          failed: true,
          progress: 75,
        },
      },
    ],
    '0-3': [
      {
        id: 300,
        status: {
          complete: true,
          failed: false,
          progress: 100,
        },
      },
    ],
    '0-4': [
      {
        id: 400,
        status: {
          complete: false,
          failed: false,
          progress: 10,
        },
      },
      {
        id: 400,
        status: {
          complete: true,
          failed: false,
          progress: 100,
        },
      },
    ],
    '0-5': [
      {
        id: 500,
        status: {
          complete: false,
          failed: false,
          progress: 99,
        },
      },
    ],
  };

  exportStatusIndex: { [key: string]: number } = {};

  templateForms: TemplateForm[] = [];

  v3: MockV3Data = {
    issue: {
      'TEST-1': {
        fieldvalues: issueTest1FieldValues,
        formindex: issueTest1FormIndex,
        form: {
          '1': {
            form: issueTest1Form1,
            formchoices: issueTest1Form1Choices,
          },
          '2': {
            form: issueTest1Form2,
            formchoices: issueTest1Form2Choices,
          },
          '3': {
            form: issueTest1Form3,
            formchoices: issueTest1Form3Choices,
          },
          '10': {
            form: issueTest1Form10,
            formchoices: issueTest1Form10Choices,
          },
          '99': {
            form: issueTest1Form99,
            formchoices: issueTest1Form99Choices,
          },
          '20': {
            form: issueTest1Form20,
            formchoices: issueTest1Form20Choices,
          },
        },
        insight: {
          '10600': issueTest1Insight,
        },
      },
    },
  };

  jiraFieldsData = initialJiraFieldsData;
  referenceData = initialReferenceData;

  dataConnectionsData: FormBuilderDataConnections = [];
  automationRules: AutomationRuleData[] = [];

  issues: Issue[] = [];

  forms: UnsavedForm[] = [];

  mapJsKey?: string;
  mapRestKey?: string;

  constructor() {
    this.buildInitialMockData();
  }

  private buildInitialMockData() {
    this.projects = this.buildMockProjects();
    this.requestTypes = this.buildMockRequestTypes();
    this.templateForms = this.buildMockTemplateForms();
    this.templateFormIndexes = this.buildMockTemplateFormIndexes();
  }

  private buildMockProjects(): ProjectWithEnabledState[] {
    projectWithEnabledStateFactory.resetSequenceNumber();
    return projectWithEnabledStateFactory.buildList(10);
  }

  private buildMockRequestTypes(): RequestType[] {
    ticketTypeFactory.resetSequenceNumber();
    const mockIssueTypes = exampleIssueTypes.map((example, index) =>
      ticketTypeFactory.build({
        id: `it-${index}`,
        name: example.name,
        iconUrl: `${avatarURLIssueTypes}&avatarId=${example.avatarId}`,
        type: TicketType.IssueType,
      }),
    );

    const mockRequestTypes = exampleRequestTypes.map((example, index) =>
      ticketTypeFactory.build({
        id: `rt-${index}`,
        name: example.name,
        iconUrl: `${avatarURLRequestTypes}&avatarId=${example.avatarId}`,
        type: TicketType.RequestType,
      }),
    );

    return [...mockIssueTypes, ...mockRequestTypes];
  }

  private buildMockTemplateForms(): TemplateForm[] {
    formSettingsFactory.resetSequenceNumber();
    formDesignFactory.resetSequenceNumber();
    templateFormWithBasicDesignFactory.resetSequenceNumber();
    return templateFormWithBasicDesignFactory.buildList(15);
  }

  private buildMockTemplateFormIndexes(): TemplateFormIndex[] {
    templateFormIndexFactory.resetSequenceNumber();
    // Add template indexes for PROJ1
    const project = this.projects[0];
    const mockTemplateFormIndexes = this.templateForms.map(
      (templateForm, index) =>
        templateFormIndexFactory.build({
          id: index,
          projectId: project.id,
          name: templateForm.design.settings.name,
          project: project.name,
        }),
    );

    // Add some request types to the first few form indexes
    const requestTypes = this.requestTypes.filter(
      requestType => requestType.type === TicketType.RequestType,
    );
    mockTemplateFormIndexes[0].requesttypes = requestTypes.slice(0, 4);
    mockTemplateFormIndexes[1].requesttypes = requestTypes.slice(-1);
    mockTemplateFormIndexes[2].requesttypes = requestTypes.slice(-3);
    mockTemplateFormIndexes[3].requesttypes = requestTypes.slice(4, 8);
    mockTemplateFormIndexes[4].requesttypes = requestTypes.slice(0, 2);
    mockTemplateFormIndexes[5].requesttypes = requestTypes.slice(-1);

    // Add some issue types to several form indexes
    const issueTypes = this.requestTypes.filter(
      requestType => requestType.type === TicketType.IssueType,
    );
    mockTemplateFormIndexes[6].requesttypes = issueTypes.slice(0, 4);
    mockTemplateFormIndexes[7].requesttypes = issueTypes.slice(-1);
    mockTemplateFormIndexes[8].requesttypes = issueTypes.slice(-3);
    mockTemplateFormIndexes[9].requesttypes = issueTypes.slice(4, 8);
    mockTemplateFormIndexes[10].requesttypes = issueTypes.slice(0, 2);
    mockTemplateFormIndexes[11].requesttypes = issueTypes.slice(-1);

    return mockTemplateFormIndexes;
  }

  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c,
    ) {
      // todo: FORM-949 remove use of random
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getIssue(issueKey: string): Issue | undefined {
    return this.issues.find(i => i.key === issueKey);
  }

  getIssueWithId(issueId: number): Issue | undefined {
    return this.issues.find(i => i.id === issueId);
  }

  getForm(issueId: number, formId: number): Form | undefined {
    const issue = this.getIssueWithId(issueId);
    if (issue) {
      return issue.forms.find((form: Form) => {
        return form.id === formId;
      });
    }
    return undefined;
  }

  addTemplateForm(templateForm: TemplateForm): number {
    this.templateForms.push(templateForm);
    return templateForm.id;
  }

  createTemplateForm(formName: string): number {
    const newId = this.templateForms.length + 1;
    const newForm = templateFormWithBasicDesignFactory.build({
      id: newId,
      design: {
        settings: {
          templateId: newId,
        },
      },
    });
    this.templateForms.push(newForm);
    return newId;
  }

  copyTemplateForm(
    fromProjectId: number,
    newProjectId: number,
    formId: number,
  ): number {
    const newId = this.templateFormIndexes.length + 1;
    const form = this.getTemplateForm(fromProjectId, formId)!;
    const newProject = this.getProject(newProjectId)!;
    const newFormIndex = templateFormIndexFactory.build({
      id: newId,
      projectId: newProjectId,
      name: form.design.settings.name,
      project: newProject.name,
    });
    this.templateFormIndexes.push(newFormIndex);
    return newId;
  }

  getTemplateForm(projectId: number, formId: number): TemplateForm | undefined {
    if (this.templateForms.length > 0) {
      return this.templateForms.find(
        templateForm => templateForm.id === formId,
      );
    }
    return undefined;
  }

  searchProjects(search?: string): Project[] {
    if (search) {
      return this.projects.filter(project => project.name.includes(search));
    }
    return this.projects;
  }

  getProject(projectId: number): ProjectWithEnabledState {
    const project = this.projects.find(project => project.id === projectId);
    if (!project) {
      throw new Error(`No project for id ${projectId}`);
    }
    return project;
  }

  getAvailableTemplateForms(): AvailableForms {
    const templateForms = this.templateForms.map((form, index) => {
      return {
        id: form.id,
        name: form.design.settings.name,
        recommended: index < 2,
      };
    });
    const recommendedForms: AvailableForm[] = [];
    const availableForms: AvailableForm[] = [];
    templateForms.forEach(form => {
      if (form.recommended) {
        recommendedForms.push({ value: form.id, label: form.name });
      } else {
        availableForms.push({ value: form.id, label: form.name });
      }
    });
    return { recommended: recommendedForms, available: availableForms };
  }

  getFormFromTemplateForm(templateFormId: number): UnsavedForm | undefined {
    const templateForm = this.templateForms.find(
      form => form.design.settings.templateId === templateFormId,
    );

    if (!templateForm) {
      return undefined;
    }

    return convertTemplateFormToUnsavedForm(templateForm);
  }

  getProjectForm(id: number): TemplateFormIndex {
    const templateFormIndex = this.templateFormIndexes.find(
      formIndex => formIndex.id === id,
    );
    if (!templateFormIndex) {
      throw new Error(`No project form for ID ${id}`);
    }
    return templateFormIndex;
  }

  setFormPublishSettings = (
    templateFormId: number,
    portalCreateRequestTypeIds?: number[],
    recommendedFormIssueRequestTypeIds?: number[],
    issueCreateRequestTypeIds?: number[],
    issueCreateIssueTypeIds?: number[],
  ): void => {
    const formIndex = this.templateForms.findIndex(
      templateForm => templateForm.id === templateFormId,
    );
    if (formIndex === -1) {
      // eslint-disable-next-line no-console
      console.log(
        `Unable to find form with ID '${templateFormId}' so publish settings not updated.`,
      );
    } else {
      this.templateForms[formIndex] = {
        ...this.templateForms[formIndex],
        publish: {
          ...(portalCreateRequestTypeIds && {
            portal: {
              ...defaultFormPublishing,
              portalRequestTypeIds: portalCreateRequestTypeIds,
            },
          }),
          ...((recommendedFormIssueRequestTypeIds ||
            issueCreateIssueTypeIds ||
            issueCreateRequestTypeIds) && {
            jira: {
              ...defaultFormPublishing,
              issueRequestTypeIds: recommendedFormIssueRequestTypeIds,
              newIssueIssueTypeIds: issueCreateIssueTypeIds,
              newIssueRequestTypeIds: issueCreateRequestTypeIds,
            },
          }),
        },
      };
    }
  };

  deleteProjectForm(id: number) {
    this.templateFormIndexes = this.templateFormIndexes.filter(
      f => f.id !== id,
    );
  }

  addIssue(key: string, id: number, name: string) {
    this.issues.push({ key, id, name, forms: [] });
  }

  addForm(issueKey: string, form: Form) {
    const issue = this.getIssue(issueKey);
    if (!issue) {
      throw new Error(`No issue for key ${issueKey}`);
    }
    issue.forms.push(form);
  }

  addFormWithId(issueId: number, form: Form) {
    const issue = this.getIssueWithId(issueId);
    if (!issue) {
      throw new Error(`No issue for key ${issueId}`);
    }
    issue.forms.push(form);
  }

  deleteForm(issueId: number, formId: number) {
    const issue = this.getIssueWithId(issueId);
    if (issue && issue.forms) {
      const foundIndex = issue.forms.findIndex(
        (form): boolean => form.id === formId,
      );
      if (foundIndex > -1) {
        issue.forms.splice(foundIndex, 1);
      }
    }
  }

  public updateFormVisibility(
    issueId: number,
    formId: number,
    isInternal: boolean,
  ): Form | undefined {
    const issue = this.getIssueWithId(issueId);
    if (issue && issue.forms) {
      const foundIndex = issue.forms.findIndex(
        (form): boolean => form.id === formId,
      );
      if (foundIndex > -1) {
        issue.forms[foundIndex].state.visibility = isInternal
          ? FormVisibility.Internal
          : FormVisibility.External;
        return issue.forms[foundIndex];
      }
    }
    return undefined;
  }

  public setFormSubmitted(issueId: number, formId: number): Form | undefined {
    const issue = this.getIssueWithId(issueId);
    if (issue && issue.forms) {
      const foundIndex = issue.forms.findIndex(
        (form): boolean => form.id === formId,
      );
      if (foundIndex > -1) {
        issue.forms[foundIndex].state.status = FormStatus.Submitted;
        if (issue.forms[foundIndex].design.settings.submit.lock) {
          issue.forms[foundIndex].state.status = FormStatus.Locked;
        }
        return issue.forms[foundIndex];
      }
    }
    return undefined;
  }

  public setFormOpen(issueId: number, formId: number): Form | undefined {
    const issue = this.getIssueWithId(issueId);
    if (issue && issue.forms) {
      const foundIndex = issue.forms.findIndex(
        (form): boolean => form.id === formId,
      );
      if (foundIndex > -1) {
        issue.forms[foundIndex].state.status = FormStatus.Open;
        return issue.forms[foundIndex];
      }
    }
    return undefined;
  }

  clear() {
    this.issueFormsEnabled = false;
    this.projects.length = 0;
    this.issues.length = 0;
    this.forms.length = 0;
    this.templateFormIndexes.length = 0;
    this.templateForms.length = 0;
    this.referenceData = initialReferenceData;
    this.automationRules.length = 0;
  }

  startXlsxDownload(
    projectId: number,
    projectFormId: number,
  ): XlsxDownloadTask {
    const key = `${projectId}-${projectFormId}`;
    window.console.log(
      `startXlsxDownload ${projectId} ${projectFormId} ${key}`,
    );
    const statuses = this.xlsxDownloadTasksStatus[key];
    if (statuses) {
      return statuses[0];
    } else {
      return {
        // todo: FORM-949 remove use of random
        id: Math.floor(Math.random() * 100),
        status: {
          complete: true,
          failed: true,
          progress: 0,
        },
      } as XlsxDownloadTask;
    }
  }

  checkXlsxDownload(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): XlsxDownloadTask {
    const key = `${projectId}-${projectFormId}`;
    window.console.log(
      `checkXlsxDownload ${projectId} ${projectFormId} ${key}`,
    );
    const index = this.exportStatusIndex[key] || 0;
    const statuses = this.xlsxDownloadTasksStatus[key];
    if (statuses) {
      const status = this.xlsxDownloadTasksStatus[key][index];
      this.exportStatusIndex[key] =
        index + 1 >= this.xlsxDownloadTasksStatus[key].length ? 0 : index + 1;
      return status;
    } else {
      return {
        id: taskId,
        status: {
          complete: true,
          failed: true,
          progress: 0,
        },
      } as XlsxDownloadTask;
    }
  }
}
