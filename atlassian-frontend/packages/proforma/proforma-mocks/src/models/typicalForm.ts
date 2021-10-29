import {
  FormConditionType,
  FormLayout,
  FormQuestionType,
  FormSectionType,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { UserSearchType } from '@atlassian/proforma-common-core/jira-common-models';

const typicalLayout: FormLayout[] = [
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'mediaSingle',
        attrs: {
          layout: 'center',
        },
        content: [
          {
            type: 'media',
            attrs: {
              type: 'external',
              url:
                'https://images.squarespace-cdn.com/content/v1/5cd769e9755be23a326723d3/1557791636712-DS4HECZMAL9N5HYFYPX4/ke17ZwdGBToddI8pDm48kMXz3nKOd_gl5CbgXODoS7BZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx-YHcQ-HLRCKa1ZR7js4Vtncg5dt2NXnp4GGRrHy_cGWnKwo2qBdHg7EZWmvvxaZM/ThinkTilt+Logo',
            },
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Hello, ',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://www.atlassian.com',
                },
              },
            ],
          },
          {
            type: 'text',
            text: 'World!',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://www.atlassian.com',
                },
              },
              {
                type: 'strong',
              },
            ],
          },
          {
            type: 'text',
            text: ' Look I can do ',
          },
          {
            type: 'text',
            text: 'italic ',
            marks: [
              {
                type: 'em',
              },
            ],
          },
          {
            type: 'text',
            text: ', strong ',
            marks: [
              {
                type: 'em',
              },
              {
                type: 'strong',
              },
            ],
          },
          {
            type: 'text',
            text: 'and underlined text!',
            marks: [
              {
                type: 'em',
              },
              {
                type: 'strong',
              },
              {
                type: 'underline',
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'My favourite emoji are ',
          },
          {
            type: 'emoji',
            attrs: {
              shortName: ':grin:',
              id: '1f601',
              text: '😁',
            },
          },
          {
            type: 'text',
            text: ' ',
          },
          {
            type: 'emoji',
            attrs: {
              shortName: ':evilburns:',
              id: 'atlassian-evilburns',
              text: ':evilburns:',
            },
          },
          {
            type: 'text',
            text: ' ',
          },
          {
            type: 'emoji',
            attrs: {
              shortName: ':not-an-emoji:',
              id: '',
              text: '',
            },
          },
          {
            type: 'text',
            text: '. What are yours?',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Hi, my name is... My name is... My name is... My name is ',
          },
          {
            type: 'mention',
            attrs: {
              id: '1',
              text: '@Oscar Wallhult',
              accessLevel: '',
            },
          },
          {
            type: 'text',
            text: ' :D',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'italic',
            marks: [
              {
                type: 'em',
              },
            ],
          },
          {
            type: 'text',
            text: 'link',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://www.atlassian.com',
                },
              },
            ],
          },
          {
            type: 'text',
            text: 'strike-through',
            marks: [
              {
                type: 'strike',
              },
            ],
          },
          {
            type: 'text',
            text: 'strong',
            marks: [
              {
                type: 'strong',
              },
            ],
          },
          {
            type: 'text',
            text: 'sub',
            marks: [
              {
                type: 'subsup',
                attrs: {
                  type: 'sub',
                },
              },
            ],
          },
          {
            type: 'text',
            text: 'sup',
            marks: [
              {
                type: 'subsup',
                attrs: {
                  type: 'sup',
                },
              },
            ],
          },
          {
            type: 'text',
            text: 'underline',
            marks: [
              {
                type: 'underline',
              },
            ],
          },
          {
            type: 'text',
            text: ' red text',
            marks: [
              {
                type: 'textColor',
                attrs: {
                  color: '#ff0000',
                },
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'some inline code: ',
          },
          {
            type: 'text',
            text: 'const foo = bar();',
            marks: [
              {
                type: 'code',
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'This is a line with ',
          },
          {
            type: 'hardBreak',
          },
          {
            type: 'text',
            text: 'a hardbreak in it.',
          },
        ],
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'html',
          parameters: {
            id: 29,
            htmlContent:
              '<table></table><ul><li></li></ul><p>Paragraph 1</p><p>Paragraph2</p><span>Span</span>',
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 29,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 30,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 16,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 17,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 18,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 19,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 20,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 21,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 22,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 23,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 24,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 25,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 26,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 27,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 28,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 13,
          },
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 14,
          },
          layout: 'default',
        },
      },
      {
        type: 'heading',
        attrs: {
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: 'Contact details',
          },
        ],
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 8,
          },
          text: '',
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 11,
          },
          text: '',
          layout: 'default',
        },
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 12,
          },
          text: '',
          layout: 'default',
        },
      },
      {
        type: 'heading',
        attrs: {
          level: 1,
        },
        content: [
          {
            type: 'text',
            text: 'Heading 1',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: 'Heading 2',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'www.atlassian.com',
                },
              },
            ],
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 3,
        },
        content: [
          {
            type: 'text',
            text: 'Heading 3',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 4,
        },
        content: [
          {
            type: 'text',
            text: 'Heading 4',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 5,
        },
        content: [
          {
            type: 'text',
            text: 'Heading 5',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 6,
        },
        content: [
          {
            type: 'text',
            text: 'Heading 6',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'This is a paragraph with a text node',
          },
          {
            type: 'text',
            text: '\n',
          },
          {
            type: 'text',
            text: 'that contains a new line',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Click me! ',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'javascript:alert("hello world")',
                },
              },
            ],
          },
          {
            type: 'text',
            text: 'www.atlassian.com',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'www.atlassian.com',
                },
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'First',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Second list item',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Third list item',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'orderedList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'First list item',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Second list item',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Third list item',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  'All that is gold does not glitter, not all those who wander are lost; The old that is strong does not wither, deep roots are not reached by the frost.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  'From the ashes a fire shall be woken, a light from the shadows shall spring; Renewed shall be blade that was broken, the crownless again shall be king.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'J.R.R. Tolkien, The Fellowship of the Ring.',
                marks: [
                  {
                    type: 'em',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'panel',
        attrs: {
          panelType: 'info',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is an info panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'panel',
        attrs: {
          panelType: 'note',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a note panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'panel',
        attrs: {
          panelType: 'tip',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a tip panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'panel',
        attrs: {
          panelType: 'success',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a success panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'panel',
        attrs: {
          panelType: 'warning',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a warning panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'panel',
        attrs: {
          panelType: 'error',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a error panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'rule',
      },
      {
        type: 'layoutSection',
        content: [
          {
            type: 'layoutColumn',
            attrs: {
              width: 50,
            },
            content: [
              {
                type: 'paragraph',
                content: [],
              },
            ],
          },
          {
            type: 'layoutColumn',
            attrs: {
              width: 50,
            },
            content: [
              {
                type: 'paragraph',
                content: [],
              },
            ],
          },
        ],
      },
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 15,
          },
          layout: 'default',
        },
      },
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'panel',
        attrs: {
          panelType: 'info',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is an info panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'panel',
        attrs: {
          panelType: 'note',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a note panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'panel',
        attrs: {
          panelType: 'tip',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a tip panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'panel',
        attrs: {
          panelType: 'success',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a success panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'panel',
        attrs: {
          panelType: 'warning',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a warning panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'panel',
        attrs: {
          panelType: 'error',
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a error panel with ',
              },
              {
                type: 'text',
                text: 'bold text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 36,
          },
          layout: 'default',
        },
      },
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Nothing to see here',
          },
        ],
      },
      {
        type: 'mediaSingle',
        attrs: {
          layout: 'center',
        },
        content: [
          {
            type: 'media',
            attrs: {
              type: 'external',
              url:
                'https://upload.wikimedia.org/wikipedia/en/6/66/Hand_with_Reflecting_Sphere.jpg',
            },
          },
        ],
      },
    ],
  },
];

export const typicalForm: TemplateForm = {
  id: 1,
  updated: '2019-11-07T01:23:45Z',
  design: {
    settings: {
      name: 'Sample form',
      submit: {
        lock: false,
        pdf: false,
      },
      templateId: 1,
    },
    questions: {
      '8': {
        type: FormQuestionType.TextShort,
        label: 'Short text',
        description:
          'A simple and short text question with a description, required',
        defaultAnswer: {
          text: '...with a default answer',
        },
        validation: {
          rq: true,
          mnc: 10,
          mxc: 25,
        },
      },
      '11': {
        type: FormQuestionType.ChoiceDropdown,
        label: 'Dropdown choice question',
        validation: {},
        choices: [
          {
            id: '100',
            label: 'Alpha',
          },
          {
            id: '101',
            label: 'Beta',
          },
          {
            id: '102',
            label: 'Gamma',
          },
          {
            id: '103',
            label: 'Zeta',
          },
        ],
      },
      '12': {
        type: FormQuestionType.ChoiceSingle,
        label: 'Priority',
        validation: {},
        jiraField: 'priority',
      },
      '13': {
        type: FormQuestionType.ChoiceSingle,
        label: 'Data connection question',
        validation: {},
        description: 'Question with a linked data connection',
        dcId: 'af1424c8-3eb2-4392-a84b-90f0715cbcc3',
      },
      '14': {
        type: FormQuestionType.ChoiceDropdown,
        label: 'Jira field question',
        validation: {},
        description: 'Question with a linked jira field',
        jiraField: 'customfield_10040',
      },
      '15': {
        type: FormQuestionType.ChoiceMultiple,
        label: 'Panel',
        validation: {
          rq: false,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: 'info',
            other: false,
          },
          {
            id: '2',
            label: 'note',
            other: false,
          },
          {
            id: '3',
            label: 'tip',
            other: false,
          },
          {
            id: '4',
            label: 'success',
            other: false,
          },
          {
            id: '5',
            label: 'warning',
            other: false,
          },
          {
            id: '6',
            label: 'error',
            other: false,
          },
        ],
        questionKey: '',
        defaultAnswer: {},
      },
      '16': {
        type: FormQuestionType.TextShort,
        label: 'Short Text Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '17': {
        type: FormQuestionType.TextLong,
        label: 'Long Text Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '18': {
        type: FormQuestionType.TextParagraph,
        label: 'Paragraph Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '19': {
        type: FormQuestionType.TextEmail,
        label: 'Email Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '20': {
        type: FormQuestionType.TextUrl,
        label: 'URL Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '21': {
        type: FormQuestionType.ChoiceSingle,
        label: 'Radio buttons Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: '1',
            other: false,
          },
          {
            id: '2',
            label: '2',
            other: false,
          },
          {
            id: '3',
            label: '3',
            other: false,
          },
          {
            id: '4',
            label: '4',
            other: false,
          },
        ],
        questionKey: '',
        defaultAnswer: {},
      },
      '22': {
        type: FormQuestionType.ChoiceMultiple,
        label: 'Checkboxes Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: '5',
            other: false,
          },
          {
            id: '2',
            label: '6',
            other: false,
          },
          {
            id: '3',
            label: '7',
            other: false,
          },
          {
            id: '4',
            label: '8',
            other: false,
          },
        ],
        questionKey: '',
        defaultAnswer: {},
      },
      '23': {
        type: FormQuestionType.ChoiceDropdown,
        label: 'Dropdown Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: 'yes',
            other: false,
          },
          {
            id: '2',
            label: 'no',
            other: false,
          },
          {
            id: '3',
            label: 'maybe',
            other: false,
          },
          {
            id: '4',
            label: "i don't know",
            other: false,
          },
        ],
        questionKey: '',
        defaultAnswer: {},
      },
      '24': {
        type: FormQuestionType.Date,
        label: 'Date Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '25': {
        type: FormQuestionType.DateTime,
        label: 'Date & Time Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '26': {
        type: FormQuestionType.Time,
        label: 'Time Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '27': {
        type: FormQuestionType.Number,
        label: 'Number Question',
        validation: {
          rq: false,
          wh: false,
        },
        description: '',
        choices: [],
        questionKey: '',
        defaultAnswer: {},
      },
      '28': {
        type: FormQuestionType.TextShort,
        label: 'Short text question with validation',
        validation: {
          rq: false,
          rgx: {
            p: '^[0-9a-zA-Z]+$',
            m: 'alphanumerics [0-9a-zA-Z] only',
          },
        },
        description: '',
        choices: [],
      },
      '36': {
        type: FormQuestionType.ChoiceSingle,
        label: 'Do you feel the need, the need for speed?',
        validation: {
          rq: false,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: 'yes',
            other: false,
          },
          {
            id: '2',
            label: 'no',
            other: false,
          },
          {
            id: '3',
            label: 'other',
            other: true,
          },
        ],
        questionKey: '',
        defaultAnswer: {},
      },
      '29': {
        type: FormQuestionType.UserSingle,
        label: 'User question',
        validation: {
          rq: false,
        },
        description: 'Single User question',
      },
      '30': {
        type: FormQuestionType.UserSingle,
        label: 'User question',
        validation: {
          rq: false,
        },
        description: 'Single User question with known search type',
        searchType: UserSearchType.usersWithBrowseProjectPermission,
      },
    },
    layout: typicalLayout,
    conditions: {
      '1': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '15': ['1'],
            },
          },
        },
        o: {
          sIds: ['1'],
        },
      },
      '2': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '15': ['2'],
            },
          },
        },
        o: {
          sIds: ['2'],
        },
      },
      '3': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '15': ['3'],
            },
          },
        },
        o: {
          sIds: ['3'],
        },
      },
      '4': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '15': ['4'],
            },
          },
        },
        o: {
          sIds: ['4'],
        },
      },
      '5': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '15': ['5'],
            },
          },
        },
        o: {
          sIds: ['5'],
        },
      },
      '6': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '15': ['6'],
            },
          },
        },
        o: {
          sIds: ['6'],
        },
      },
      '17': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '16': ['1'],
            },
          },
        },
        o: {
          sIds: ['8'],
        },
      },
    },
    sections: {
      '1': {
        type: FormSectionType.Block,
        name: 'info panel',
        conditions: ['1'],
      },
      '2': {
        type: FormSectionType.Block,
        name: 'note panel',
        conditions: ['2'],
      },
      '3': {
        type: FormSectionType.Block,
        name: 'tip panel',
        conditions: ['3'],
      },
      '4': {
        type: FormSectionType.Block,
        name: 'success panel',
        conditions: ['4'],
      },
      '5': {
        type: FormSectionType.Block,
        name: 'warning panel',
        conditions: ['5'],
      },
      '6': {
        type: FormSectionType.Block,
        name: 'error panel',
        conditions: ['6'],
      },
      '7': {
        type: FormSectionType.Block,
        name: '',
        conditions: [],
      },
      '8': {
        type: FormSectionType.Block,
        name: 'Section 8',
        conditions: ['17'],
      },
    },
  },
  state: undefined,
};
