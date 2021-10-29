import {
  Form,
  FormQuestionType,
  FormStatus,
  FormVisibility,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { convertTemplateFormToUnsavedForm } from '@atlassian/proforma-common-core/form-system-utils';
import {
  AutomationRuleData,
  ProjectWithEnabledState,
  RequestType,
  TemplateFormIndex,
  TicketType,
} from '@atlassian/proforma-common-core/jira-common-models';

import { typicalForm } from '../../../models/typicalForm';
import { MockData } from '../MockData';
import mockAllQuestionForm from '../v3/issue-TEST-1-form-3.json';

import { allQuestionTypesForm } from './allQuestionTypesForm';
import { mockBlankForm } from './mockBlankForm';
import { mockConditionalsForm } from './mockConditionalsForm';
import { mockDataConnections } from './mockDataConnections';
import { mockJiraFields } from './mockJiraFields';
import { mockMinimalForm } from './mockMinimalForm';
import { mockNoQuestionForm } from './mockNoQuestionForm';

export const loadTypicalMockData = (mockData: MockData): MockData => {
  // eslint-disable-next-line no-console
  console.log(`Loading typical mock data...`);
  createProjects(mockData);
  createIssues(mockData);
  createForms(mockData);
  createTemplateFormIndexes(mockData);
  createTemplateForms(mockData);
  createDataConnectionsData(mockData);
  createJiraFieldsData(mockData);
  createReferenceData(mockData);
  return mockData;
};

//-----------------------------------------------------------------------------
// Projects

const createProjects = (mockData: MockData): void => {
  for (let i = 0; i < 100; i++) {
    const project: ProjectWithEnabledState = {
      id: i + 1,
      name: 'Test Project ' + (i + 1),
      projectTypeKey: i % 2 === 0 ? 'software' : 'servicedesk',
      projectTypeName: i % 2 === 0 ? 'Software' : 'Service Desk',
      smallAvatarUrl:
        'https://proformajax.atlassian.net/secure/projectavatar?size=small&avatarId=10324',
      enabled: i % 2 === 0,
    };
    mockData.projects.push(project);
  }
};

//-----------------------------------------------------------------------------
// TemplateForms

let nextTemplateFormId = 0;

const createTemplateFormIndexes = (mockData: MockData): void => {
  mockData.projects.forEach(project => {
    for (let i = 0; i < 20; i++) {
      mockData.templateFormIndexes.push({
        id: nextTemplateFormId++,
        name: `Project Form ${i + 1} in Proj ${project.id}`,
        project: project.name,
        updated: {
          iso8601: '2019-03-15',
          friendly: '15 Mar 2019',
        },
        requesttypes: createRequestTypes(i),
        editUrl: `url-to-edit-proj-form-FRM_${i + 1}`,
      } as TemplateFormIndex);
    }
  });
};

const createRequestTypes = (index: number): RequestType[] => {
  const types = [];
  for (let i = 0; i < index % 5; i++) {
    types.push({
      id: 'rt' + index + '.' + i,
      name: getTypeName(index),
      portal: index % 2 === 0,
      hidden: index % 4 === 0,
      newIssue: index % 3 === 0,
      type: TicketType.RequestType,
    } as RequestType);
  }
  return types;
};

const getTypeName = (index: number): string => {
  const names = ['Story', 'Bug', 'Epic', 'Task'];
  return names[index % names.length];
};

const createTemplateForms = (mockData: MockData): void => {
  mockData.templateForms = [
    typicalForm,
    allQuestionTypesForm(),
    mockConditionalsForm,
    mockAllQuestionForm as TemplateForm,
    mockMinimalForm,
  ];
};

//-----------------------------------------------------------------------------
// Settings

const createDataConnectionsData = (mockData: MockData): void => {
  mockData.dataConnectionsData = mockDataConnections;
};

const createJiraFieldsData = (mockData: MockData): void => {
  mockData.jiraFieldsData = mockJiraFields;
};

const createReferenceData = (mockData: MockData): void => {
  mockData.referenceData = {
    statuses: [
      {
        name: 'Work in progress',
        id: '10013',
      },
      {
        name: 'Waiting for support',
        id: '10002',
      },
      {
        name: 'Planning',
        id: '10009',
      },
      {
        name: 'Reopened',
        id: '4',
      },
      {
        name: 'Waiting for approval',
        id: '10007',
      },
    ],
    issueTypes: [
      {
        id: '10001',
        name: 'Task',
        iconUrl:
          'https://robertc.atlassian.net/secure/viewavatar?size=xsmall&amp;avatarId=10517&amp;avatarType=issuetype',
        statuses: ['10009', '10013', '10007', '4'],
        subtask: false,
      },
      {
        id: '10002',
        name: 'Service Request',
        iconUrl:
          'https://robertc.atlassian.net/secure/viewavatar?size=xsmall&amp;avatarId=10513&amp;avatarType=issuetype',
        statuses: ['10009', '10013'],
        subtask: false,
      },
      {
        id: '10007',
        name: 'Sub-task',
        iconUrl:
          'https://robertc.atlassian.net/secure/viewavatar?size=xsmall&amp;avatarId=10518&amp;avatarType=issuetype',
        statuses: ['10009', '10013'],
        subtask: true,
      },
      {
        id: '10003',
        name: 'Service Request with Approvals',
        iconUrl:
          'https://robertc.atlassian.net/secure/viewavatar?size=xsmall&amp;avatarId=10514&amp;avatarType=issuetype',
        statuses: [],
        subtask: false,
      },
    ],
    requestTypes: [
      {
        id: '29',
        name: 'Request new hardware',
        issueTypeId: '10002',
        iconUrl:
          'https://robertc.atlassian.net/secure/viewavatar?avatarType=SD_REQTYPE&amp;avatarId=10475&amp;size=large',
      },
      {
        id: '876',
        name: 'Request new software',
        issueTypeId: '10002',
        iconUrl:
          'https://robertc.atlassian.net/secure/viewavatar?avatarType=SD_REQTYPE&amp;avatarId=10479&amp;size=large',
      },
      {
        id: '27',
        name: 'Set up a phone line redirect',
        issueTypeId: '10002',
        iconUrl:
          'https://robertc.atlassian.net/secure/viewavatar?avatarType=SD_REQTYPE&amp;avatarId=10477&amp;size=large',
      },
      {
        id: '34',
        name: 'Upgrade or change a server',
        issueTypeId: '10001',
        iconUrl:
          'https://robertc.atlassian.net/secure/viewavatar?avatarType=SD_REQTYPE&amp;avatarId=10510&amp;size=large',
      },
    ],
  };
};

export const createAutomationRulesData = (mockData: MockData): void => {
  const mockRules: AutomationRuleData[] = [
    {
      id: 'i10001-2',
      name: 'Automation Rule 1',
      trigger: {
        type: 'submit',
      },
      conditions: {
        formId: 4,
        status: '10009',
        issueTypeId: '10001',
        otherFormsSubmitted: true,
      },
      action: {
        id: 1,
        to: '4',
      },
    },
    {
      id: 'r876-2',
      name: 'Automation Rule 2',
      trigger: {
        type: 'submit',
      },
      conditions: {
        status: '10002',
        requestTypeId: '876',
      },
      action: {
        id: 1,
        to: '10013',
      },
    },
    {
      id: 'p-5',
      name: 'Automation Rule 3',
      trigger: {
        type: 'transition',
      },
      conditions: {
        formId: 4,
        status: '10013',
        status2: '10007',
      },
      action: {
        id: 2,
        doNotDuplicate: true,
        author: '',
        formId: 4,
      },
    },
    {
      id: 'p-8',
      name: 'Automation Rule 4',
      trigger: {
        type: 'workflowValidator',
      },
      conditions: {},
      action: {
        id: 3,
        formId: 4,
        toStatus: '10013',
        fromStatus: '10007',
        isNotSubmitted: true,
      },
    },
  ];

  mockData.automationRules = [...mockData.automationRules, ...mockRules];
};

// Issues & Forms

const createIssues = (mockData: MockData): void => {
  mockData.addIssue('TEST-1', 1, 'ADF Forms');
};

//-----------------------------------------------------------------------------
// Forms

const createForms = (mockData: MockData): void => {
  mockData.addForm('TEST-1', {
    id: 1,
    updated: '2019-05-02T01:23:48.747Z',
    design: {
      settings: {
        templateId: 1,
        name: 'mockADFForm',
        submit: {
          lock: false,
          pdf: false,
        },
      },
      layout: [
        {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: 'text',
                  text: 'An example form',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'You should see five questions appear below:',
                },
              ],
            },
            {
              type: 'extension',
              attrs: {
                extensionType: 'com.thinktilt.proforma',
                extensionKey: 'question',
                parameters: {
                  type: 'ts',
                  id: 409,
                  label: 'Short text',
                  description:
                    'A simple and short text question with a description, required',
                  defaultValue: '',
                  validation: {
                    req: true,
                    minchar: 10,
                    maxchar: 25,
                  },
                },
                text: 'Question test',
                layout: 'default',
              },
            },
            {
              type: 'extension',
              attrs: {
                extensionType: 'com.thinktilt.proforma',
                extensionKey: 'question',
                parameters: {
                  type: 'no',
                  id: 498,
                  label: 'Number question',
                  description: '',
                  defaultValue: '',
                  validation: {
                    required: true,
                  },
                },
                text: 'Question test',
                layout: 'default',
              },
            },
            {
              type: 'extension',
              attrs: {
                extensionType: 'com.thinktilt.proforma',
                extensionKey: 'question',
                parameters: {
                  type: 'tl',
                  id: 469,
                  label: 'Long text',
                  description: 'A full-width text question with a description',
                  defaultValue: '*and* this has a default value as well',
                  validation: {
                    required: false,
                  },
                },
                text: 'Question test',
                layout: 'default',
              },
            },
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
      ],
      conditions: {},
      sections: {},
      questions: {
        '409': {
          type: FormQuestionType.TextShort,
          label: 'Short text',
          description:
            'A simple and short text question with a description, required',
          validation: {
            rq: true,
            mnc: 10,
            mxc: 25,
          },
        },
        '469': {
          type: FormQuestionType.TextLong,
          label: 'Long text',
          description: 'A full-width text question with a description',
          validation: {},
          // @ts-ignore
          default: {
            text: '*and* this has a default value as well',
          },
        },
      },
    },
    state: {
      visibility: FormVisibility.Internal,
      status: FormStatus.Open,
      answers: {},
    },
  });
  mockData.addForm(
    'TEST-1',
    convertTemplateFormToForm(mockConditionalsForm, 1),
  );
  mockData.addForm('TEST-1', convertTemplateFormToForm(mockBlankForm, 2));
  mockData.addForm('TEST-1', convertTemplateFormToForm(mockNoQuestionForm, 3));
  mockData.addForm(
    'TEST-1',
    convertTemplateFormToForm(mockAllQuestionForm as TemplateForm, 4),
  );
  mockData.forms = [convertTemplateFormToUnsavedForm(allQuestionTypesForm())];
};

const convertTemplateFormToForm = (
  templateForm: TemplateForm,
  id: number,
): Form => {
  return {
    ...convertTemplateFormToUnsavedForm(templateForm),
    id,
  };
};
