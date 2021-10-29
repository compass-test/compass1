import { ExtensionType } from '@atlaskit/editor-core';

export const inlineExtensionData = [
  {
    type: 'inlineExtension' as ExtensionType,
    attrs: {
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'status',
      parameters: {
        macroParams: {
          color: { value: 'Green' },
          title: { value: 'OK' },
          subtle: { value: true },
        },
        macroMetadata: {
          macroId: { value: new Date().valueOf() },
          schemaVersion: { value: '1' },
          placeholder: [
            {
              data: {
                width: 274,
                height: 30,
                url:
                  '//pug.jira-dev.com/wiki/plugins/servlet/confluence/placeholder/macro?definition=e3N0YXR1czpzdWJ0bGU9dHJ1ZXxjb2xvdXI9R3JlZW58dGl0bGU9T0t9&locale=en_GB&version=2',
              },
              type: 'image',
            },
          ],
        },
      },
      localId: 'testId',
    },
  },
  {
    type: 'inlineExtension' as ExtensionType,
    attrs: {
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'status',
      parameters: {
        macroParams: {
          color: { value: 'Red' },
          title: { value: 'Fail' },
          subtle: { value: true },
        },
        macroMetadata: {
          macroId: { value: new Date().valueOf() },
          schemaVersion: { value: '1' },
          placeholder: [
            {
              data: { url: '' },
              type: 'icon',
            },
          ],
        },
      },
      localId: 'testId',
    },
  },
  {
    type: 'inlineExtension' as ExtensionType,
    attrs: {
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'status',
      parameters: {
        macroParams: {
          color: { value: 'Gray' },
          title: { value: 'Medium' },
          subtle: { value: true },
        },
        macroMetadata: {
          macroId: { value: new Date().valueOf() },
          placeholder: [
            {
              data: {
                url:
                  '//pug.jira-dev.com/wiki/download/resources/com.atlassian.confluence.plugins.status-macro/images/status-icon.png',
              },
              type: 'icon',
            },
          ],
        },
      },
      localId: 'testId',
    },
  },
];

export const extensionData = [
  {
    type: 'extension' as ExtensionType,
    attrs: {
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'gallery',
      parameters: {
        macroParams: {
          color: { value: 'Red' },
        },
        macroMetadata: {
          macroId: { value: new Date().valueOf() },
          schemaVersion: { value: '1' },
          placeholder: [
            {
              data: {
                url:
                  '//pug.jira-dev.com/wiki/plugins/servlet/confluence/placeholder/macro?definition=e2dhbGxlcnl9&locale=en_GB&version=2',
              },
              type: 'image',
            },
          ],
        },
      },
      localId: 'testId',
    },
  },
  {
    type: 'extension' as ExtensionType,
    attrs: {
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'gallery',
      parameters: {
        macroParams: {
          color: { value: 'Yellow' },
        },
        macroMetadata: {
          macroId: { value: new Date().valueOf() },
          schemaVersion: { value: '1' },
          placeholder: [
            {
              data: { url: '' },
              type: 'icon',
            },
          ],
        },
      },
      localId: 'testId',
    },
  },
  {
    type: 'extension',
    attrs: {
      layout: 'default',
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'toc',
      text: '',
      parameters: {
        macroParams: {},
        macroMetadata: {
          macroId: {
            value: 'aa8fd971-eb4f-4d99-b9e2-c63a88e3868e',
          },
          schemaVersion: {
            value: '1',
          },
          title: 'Table of Contents',
        },
      },
      localId: 'testId',
    },
  },
  {
    type: 'extension',
    attrs: {
      extensionType: 'com.atlassian.extensions.update',
      extensionKey: 'test-key-123',
      parameters: {
        extensionTitle: 'Forged in Fire',
      },
      layout: 'default',
      localId: 'testId',
    },
  },
];

export const bodiedExtensionData = [
  {
    type: 'bodiedExtension' as ExtensionType,
    attrs: {
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'expand',
      layout: 'default',
      parameters: {
        macroMetadata: {
          macroId: { value: new Date().valueOf() },
          schemaVersion: { value: '2' },
          placeholder: [
            {
              data: {
                url:
                  '//pug.jira-dev.com/wiki/plugins/servlet/confluence/placeholder/macro?definition=e2V4cGFuZH0&locale=en_GB&version=2',
              },
              type: 'image',
            },
          ],
        },
      },
      localId: 'testId',
    },
    content: [
      {
        type: 'heading',
        content: [
          {
            type: 'text',
            text: 'Heading',
          },
        ],
        attrs: {
          level: 5,
        },
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Foo',
            marks: [
              {
                type: 'underline',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'bodiedExtension' as ExtensionType,
    attrs: {
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'expand',
      layout: 'default',
      parameters: {
        macroMetadata: {
          macroId: { value: new Date().valueOf() },
          schemaVersion: { value: '1' },
          placeholder: [
            {
              data: { url: '' },
              type: 'icon',
            },
          ],
        },
      },
      localId: 'testId',
    },
    content: [
      {
        type: 'heading',
        content: [
          {
            type: 'text',
            text: 'Heading',
          },
        ],
        attrs: {
          level: 5,
        },
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Foo',
            marks: [
              {
                type: 'underline',
              },
            ],
          },
          {
            type: 'text',
            text: ' ',
          },
          {
            type: 'inlineExtension' as ExtensionType,
            attrs: {
              extensionType: 'com.atlassian.confluence.macro.core',
              extensionKey: 'status',
              parameters: {
                macroParams: {
                  color: { value: 'Green' },
                  title: { value: 'OK' },
                  subtle: { value: true },
                },
                macroMetadata: {
                  macroId: { value: new Date().valueOf() },
                  schemaVersion: { value: '1' },
                  placeholder: [
                    {
                      data: {
                        url:
                          '//pug.jira-dev.com/wiki/plugins/servlet/confluence/placeholder/macro?definition=e3N0YXR1czpzdWJ0bGU9dHJ1ZXxjb2xvdXI9R3JlZW58dGl0bGU9T0t9&locale=en_GB&version=2',
                      },
                      type: 'image',
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    ],
  },
];
