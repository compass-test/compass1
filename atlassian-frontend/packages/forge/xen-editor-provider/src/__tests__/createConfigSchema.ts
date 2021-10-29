import {
  createSchemaFromAux,
  threeLOPromptErrorMessage,
} from '../createConfigSchema';
import { ForgeDoc } from '@atlassian/forge-ui-types';

const forgeDocConfigFormChildren = [
  {
    children: [
      {
        children: [],
        key: 'Checkbox.0.0',
        props: {
          __auxId: 'Checkbox.0',
          defaultChecked: true,
          value: 'jira',
          label: 'Jira',
        },
        type: 'Checkbox',
      },
      {
        children: [],
        key: 'Checkbox.1.0',
        props: {
          __auxId: 'Checkbox.1',
          defaultChecked: true,
          value: 'confluence',
          label: 'Confluence',
        },
        type: 'Checkbox',
      },
    ],
    key: 'CheckboxGroup.0.0',
    props: {
      __auxId: 'CheckboxGroup.0',
      label: 'Products',
      name: 'products',
    },
    type: 'CheckboxGroup',
  },
  {
    children: [],
    key: 'DatePicker.0.0',
    props: {
      __auxId: 'DatePicker.0',
      name: 'date',
      label: 'Appointment Date',
      description: 'Appointment must be made 1 day in advance',
    },
    type: 'DatePicker',
  },
  {
    children: [
      {
        children: [],
        key: 'Radio.0.0',
        props: {
          __auxId: 'Radio.0',
          defaultChecked: true,
          label: 'Strawberry',
          value: 'strawberry',
        },
        type: 'Radio',
      },
      {
        children: [],
        key: 'Radio.1.0',
        props: {
          __auxId: 'Radio.1',
          label: 'Cinnamon',
          value: 'cinnamon',
        },
        type: 'Radio',
      },
      {
        children: [],
        key: 'Radio.2.0',
        props: {
          __auxId: 'Radio.2',
          label: 'Chocolate',
          value: 'chocolate',
        },
        type: 'Radio',
      },
    ],
    key: 'RadioGroup.0.0',
    props: {
      __auxId: 'RadioGroup.0',
      name: 'flavor',
      label: 'Pick a flavor',
      description: 'Add a flavor to your recipe',
    },
    type: 'RadioGroup',
  },
  {
    children: [
      {
        children: [],
        key: 'Option.0.0',
        props: {
          __auxId: 'Option.0',
          label: 'Milestone 1',
          value: 'one',
        },
        type: 'Option',
      },
      {
        children: [],
        key: 'Option.1.0',
        props: {
          __auxId: 'Option.1',
          label: 'Milestone 2',
          value: 'two',
        },
        type: 'Option',
      },
      {
        children: [],
        key: 'Option.2.0',
        props: {
          __auxId: 'Option.2',
          label: 'Milestone 3',
          value: 'three',
        },
        type: 'Option',
      },
    ],
    key: 'Select.0.0',
    props: {
      __auxId: 'Select.0',
      isMulti: true,
      label: 'With a defaultSelected',
      name: 'milestone',
      placeholder: 'Make a selection',
    },
    type: 'Select',
  },
  {
    children: [
      {
        children: [],
        key: 'Option.0.0',
        props: {
          __auxId: 'Option.0',
          label: 'Foo',
          value: 'foo',
        },
        type: 'Option',
      },
      {
        children: [],
        key: 'Option.1.0',
        props: {
          __auxId: 'Option.1',
          label: 'Bar',
          value: 'bar',
          defaultSelected: true,
        },
        type: 'Option',
      },
    ],
    key: 'Select.1.0',
    props: {
      __auxId: 'Select.1',
      isMulti: false,
      label: 'With a defaultSelected',
      name: 'foobar',
      placeholder: 'Make a selection',
    },
    type: 'Select',
  },
  {
    children: [],
    key: 'TextField.0.0',
    props: {
      __auxId: 'TextField.0',
      defaultValue: 'default',
      label: 'Name',
      name: 'name',
    },
    type: 'TextField',
  },
] as ForgeDoc[];

export const errorAux = {
  type: 'View',
  children: [
    {
      type: 'ErrorPanel',
      props: {
        error: {
          message: 'Something went wrong',
          errorMessage:
            'There was an error invoking the function - x is not defined',
          errorDetails:
            'ReferenceError: x is not defined\nat Object.Config [as type] (index.js:7641:3)',
        },
      },
      children: [],
    },
  ],
};

export const threeLOPromptAux = {
  type: 'View',
  children: [
    {
      type: 'ThreeLOPrompt',
      children: [],
    },
  ],
};

const createAuxForTesting = (configFormChildren?: ForgeDoc[]): ForgeDoc => {
  return {
    type: 'View',
    children: [
      {
        type: 'Text',
        children: [],
        key: 'Text.0.0',
        props: {
          format: 'adf',
          content: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Hello world!' }],
              },
            ],
          },
        },
      },
      {
        children: configFormChildren || forgeDocConfigFormChildren,
        key: 'MacroConfig.0',
        props: {},
        type: 'MacroConfig',
      },
    ],
  } as ForgeDoc;
};
const expectedSchema = [
  {
    type: 'enum',
    name: 'products',
    label: 'Products',
    description: undefined,
    isRequired: undefined,
    style: 'checkbox',
    isMultiple: true,
    items: [
      { label: 'Jira', value: 'jira' },
      { label: 'Confluence', value: 'confluence' },
    ],
    defaultValue: ['jira', 'confluence'],
  },
  {
    type: 'date',
    name: 'date',
    label: 'Appointment Date',
    description: 'Appointment must be made 1 day in advance',
    defaultValue: undefined,
    isRequired: undefined,
    placeholder: undefined,
  },
  {
    type: 'enum',
    name: 'flavor',
    label: 'Pick a flavor',
    description: 'Add a flavor to your recipe',
    isRequired: undefined,
    style: 'radio',
    isMultiple: false,
    items: [
      { label: 'Strawberry', value: 'strawberry' },
      { label: 'Cinnamon', value: 'cinnamon' },
      { label: 'Chocolate', value: 'chocolate' },
    ],
    defaultValue: 'strawberry',
  },
  {
    type: 'enum',
    name: 'milestone',
    label: 'With a defaultSelected',
    description: undefined,
    isRequired: undefined,
    style: 'select',
    isMultiple: true,
    placeholder: 'Make a selection',
    items: [
      { label: 'Milestone 1', value: 'one' },
      { label: 'Milestone 2', value: 'two' },
      { label: 'Milestone 3', value: 'three' },
    ],
    defaultValue: [],
  },
  {
    type: 'enum',
    name: 'foobar',
    label: 'With a defaultSelected',
    description: undefined,
    isRequired: undefined,
    style: 'select',
    isMultiple: false,
    placeholder: 'Make a selection',
    items: [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' },
    ],
    defaultValue: 'bar',
  },
  {
    type: 'string',
    name: 'name',
    label: 'Name',
    description: undefined,
    defaultValue: 'default',
    isRequired: undefined,
    isHidden: undefined,
    placeholder: undefined,
  },
];

describe('Config schema creation', () => {
  it('creates the correct schema from the aux', () => {
    const schema = createSchemaFromAux(createAuxForTesting());
    expect(schema).toStrictEqual(expectedSchema);
  });

  it('creates the correct error fields when invalid components exist in the ConfigForm', () => {
    const inputAux = createAuxForTesting([
      ...forgeDocConfigFormChildren,
      { type: 'Button' } as ForgeDoc,
      { type: 'Table' } as ForgeDoc,
    ]);

    expect(() => createSchemaFromAux(inputAux)).toThrowError(
      'Button and Table components are not supported in macro config',
    );
  });

  it('throws the correct error when an ErrorPanel exists in the aux', () => {
    expect(() => createSchemaFromAux(errorAux)).toThrowError(
      'There was an error invoking the function - x is not defined',
    );
  });

  it('throws the correct error when a ThreeLOPrompt exists in the aux', () => {
    expect(() => createSchemaFromAux(threeLOPromptAux)).toThrowError(
      threeLOPromptErrorMessage,
    );
  });
});
