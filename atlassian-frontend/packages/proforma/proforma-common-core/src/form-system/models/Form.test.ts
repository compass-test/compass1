import {
  Form,
  FormQuestionType,
  FormSectionType,
  FormStatus,
  FormVisibility,
} from './Form';

describe('Form schema', () => {
  it('should accept a valid form', () => {
    const form: Form = {
      id: 1,
      updated: '2019-01-01T23:45:67.890Z',
      design: {
        settings: {
          templateId: 22,
          name: 'UI test form',
          portal: {
            canSubmit: true,
          },
          submit: {
            lock: false,
            pdf: true,
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
                    text: 'Test form',
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Welcome to the test form:',
                  },
                ],
              },
              {
                type: 'extension',
                attrs: {
                  extensionType: 'com.thinktilt.proforma',
                  extensionKey: 'question',
                  parameters: {
                    id: '2',
                  },
                  text: '',
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
        sections: {
          '1': {
            type: FormSectionType.Block,
          },
        },
        questions: {
          '2': {
            type: FormQuestionType.TextShort,
            label: 'Your name:',
            description: 'Personal or company name is OK',
            validation: {
              rq: true,
            },
          },
        },
      },
      state: {
        visibility: FormVisibility.Internal,
        status: FormStatus.Open,
        answers: {
          '2': {
            text: 'ThinkTilt',
          },
        },
      },
      hash: 'ABCDEF0123457890',
    };

    // Simple check that the form was parsed. If the form doesn't match the type definition of Form then this test will have failed by now.
    expect(form).toEqual(form);
  });
});
