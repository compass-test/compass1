import {
  FormBuilderJiraFields,
  JiraFieldType,
} from '@atlassian/proforma-common-core/jira-common-models';

export const mockJiraFields: FormBuilderJiraFields = {
  common: [
    {
      key: 'assignee',
      name: 'Assignee',
      fieldType: JiraFieldType.SingleUser,
      readOnly: true,
    },
    {
      key: 'issuekey',
      name: 'Issue Key',
      fieldType: JiraFieldType.Text,
      readOnly: true,
    },
    {
      key: 'read only choices',
      name: 'read only choices',
      fieldType: JiraFieldType.MultiChoice,
      readOnly: true,
      choices: [
        {
          id: '1',
          label: 'A',
        },
        {
          id: '2',
          label: 'B',
        },
        {
          id: '3',
          label: 'C',
        },
        {
          id: '4',
          label: 'D',
        },
        {
          id: '5',
          label: 'E',
        },
      ],
    },
    {
      key: 'description',
      name: 'Description',
      fieldType: JiraFieldType.Text,
    },
    {
      key: 'duedate',
      name: 'Due date',
      fieldType: JiraFieldType.Date,
    },
    {
      key: 'environment',
      name: 'Environment',
      fieldType: JiraFieldType.Text,
    },
    {
      key: 'priority',
      name: 'Priority',
      fieldType: JiraFieldType.SingleChoice,
      choices: [
        {
          id: '1',
          label: 'Highest',
        },
        {
          id: '2',
          label: 'High',
        },
        {
          id: '3',
          label: 'Medium',
        },
        {
          id: '4',
          label: 'Low',
        },
        {
          id: '5',
          label: 'Lowest',
        },
      ],
    },
    {
      key: 'reporter',
      name: 'Reporter',
      fieldType: JiraFieldType.SingleUser,
    },
    {
      key: 'summary',
      name: 'Summary',
      fieldType: JiraFieldType.Text,
    },
  ],
  other: [
    {
      key: 'customfield_10003',
      name: 'Approvers',
      fieldType: JiraFieldType.MultiUser,
    },
    {
      key: 'customfield_10044',
      name: 'CAB',
      fieldType: JiraFieldType.MultiUser,
    },
    {
      key: 'customfield_10043',
      name: 'Change managers',
      fieldType: JiraFieldType.MultiUser,
    },
    {
      key: 'customfield_10033',
      name: 'Flagged',
      fieldType: JiraFieldType.MultiChoice,
      choices: [
        {
          id: '10019',
          label: 'Impediment',
        },
      ],
    },
    {
      key: 'customfield_10040',
      name: 'Investigation reason',
      fieldType: JiraFieldType.SingleChoice,
      choices: [
        {
          id: '10102',
          label: 'High impact incident',
        },
        {
          id: '10103',
          label: 'Recurring incident',
        },
        {
          id: '10104',
          label: 'Non-routine incident',
        },
        {
          id: '10105',
          label: 'Other',
        },
      ],
    },
    {
      key: 'customfield_10017',
      name: 'Issue color',
      fieldType: JiraFieldType.Text,
    },
    {
      key: 'customfield_10036',
      name: 'Pending reason',
      fieldType: JiraFieldType.SingleChoice,
      choices: [
        {
          id: '10024',
          label: 'More info required',
        },
        {
          id: '10025',
          label: 'Awaiting approval',
        },
        {
          id: '10026',
          label: 'Waiting on vendor',
        },
        {
          id: '10027',
          label: 'Pending on change request',
        },
      ],
    },
    {
      key: 'customfield_10023',
      name: 'Request participants',
      fieldType: JiraFieldType.MultiUser,
    },
    {
      key: 'customfield_10041',
      name: 'Root cause',
      fieldType: JiraFieldType.Text,
    },
    {
      key: 'customfield_10039',
      name: 'Source',
      fieldType: JiraFieldType.SingleChoice,
      choices: [
        {
          id: '10096',
          label: 'Email',
        },
        {
          id: '10097',
          label: 'Phone',
        },
        {
          id: '10098',
          label: 'Monitoring systems',
        },
        {
          id: '10099',
          label: 'Vendor/technical advisory',
        },
        {
          id: '10100',
          label: 'Customer',
        },
        {
          id: '10101',
          label: 'Other',
        },
      ],
    },
    {
      key: 'customfield_10015',
      name: 'Start date',
      fieldType: JiraFieldType.Date,
    },
    {
      key: 'customfield_10016',
      name: 'Story point estimate',
      fieldType: JiraFieldType.Number,
    },
    {
      key: 'customfield_10035',
      name: 'Urgency',
      fieldType: JiraFieldType.SingleChoice,
      choices: [
        {
          id: '10020',
          label: 'Critical',
        },
        {
          id: '10021',
          label: 'High',
        },
        {
          id: '10022',
          label: 'Medium',
        },
        {
          id: '10023',
          label: 'Low',
        },
      ],
    },
    {
      key: 'customfield_10042',
      name: 'Workaround',
      fieldType: JiraFieldType.Text,
    },
  ],
};
