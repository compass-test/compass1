/** @jsx ForgeUI.createElement */
import ForgeUI, {
  Button,
  ButtonSet,
  Cell,
  Checkbox,
  CheckboxGroup,
  Macro,
  Form,
  Head,
  Option,
  render,
  Radio,
  Row,
  Table,
  Text,
  TextArea,
  TextField,
  Image,
  UserPicker,
  CustomField,
  StatusLozenge,
  Fragment,
} from '@forge/ui';
import {
  ForgeChildren,
  ForgeDoc,
  ForgeElement,
  LegacyBackendRuntimePayload,
} from '@atlassian/forge-ui-types';
import validate from '../index';

// TODO: delete when we no longer support legacy macro config http://go/j/DEVO-466
const ConfigForm = ('ConfigForm' as unknown) as (props: {
  children: ForgeChildren;
}) => ForgeElement;

const getInitializeAux = async (
  element: ForgeElement,
  context: LegacyBackendRuntimePayload['context'] = {},
) => {
  const fn = render(element);
  const response = await fn(
    {
      context,
      state: {},
      effects: [{ type: 'initialize' }],
    },
    {},
  );
  return response[0].aux;
};

const getConfigAux = async (element: ForgeElement) =>
  getInitializeAux(element, { isConfig: true });

it('should validate a CheckboxGroup', async () => {
  const App = () => (
    <Form onSubmit={() => {}}>
      <CheckboxGroup label="label" name="checkboxgroup">
        <Checkbox label="label" value="nested checkbox" />
        <Checkbox label="label" value="nested checkbox" />
      </CheckboxGroup>
    </Form>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toHaveLength(0);
});

it('should allow a deeply nested Form field component within a Form', async () => {
  const App = () => (
    <Form onSubmit={() => {}}>
      <Table>
        <Row>
          <Cell>
            <TextField label="label" name="name" />
          </Cell>
        </Row>
      </Table>
    </Form>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toHaveLength(0);
});

it('should fail if ButtonSet contains multiple components that are not Buttons', async () => {
  const App = () => (
    <ButtonSet>
      <Button text="Hello World" onClick={() => {}} />
      <Text content="Not a button" />
      <Checkbox label="label" value="value" />
    </ButtonSet>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual([
    'Expected direct child of ButtonSet to be Button. Received Text component.',
    'Expected direct child of ButtonSet to be Button. Received Checkbox component.',
    'Checkbox must be a direct child of a CheckboxGroup component.',
  ]);
});

it('should fail if Table has a child that is not Head or Row', async () => {
  const App = () => (
    <Table>
      <Button text="Hello World" onClick={() => {}} />
      <Row>
        <Cell>
          <Text content="row1" />
        </Cell>
        <Cell>
          <Text content="row1" />
        </Cell>
      </Row>
    </Table>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual([
    'Expected direct child of Table to be one of [Head, Row]. Received Button component.',
  ]);
});

it('should fail if Table is an indirect child of Table', async () => {
  const App = () => (
    <Table>
      <Row>
        <Cell>
          <Table>
            <Row>
              <Cell>
                <Text content="row1" />
              </Cell>
            </Row>
          </Table>
        </Cell>
      </Row>
    </Table>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual([
    'Table cannot be used within a Table component.',
  ]);
});

it('should fail if Table has two Head components', async () => {
  const App = () => (
    <Table>
      <Head>
        <Cell>
          <Text content="row" />
        </Cell>
      </Head>
      <Head>
        <Cell>
          <Text content="row" />
        </Cell>
      </Head>
    </Table>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual(['Table can only contain one Head component.']);
});

it('should fail if Option is not used within a Select component', async () => {
  const App = () => <Option label="label" value="value" />;

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual([
    'Option must be a direct child of a Select component.',
  ]);
});

it('should fail if Radio is not a direct child of a RadioGroup component', async () => {
  const App = () => <Radio label="label" value="value" />;

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual([
    'Radio must be a direct child of a RadioGroup component.',
  ]);
});

it('should fail if a Cell is not used as a child of a Head or Row component', async () => {
  const App = () => (
    <Cell>
      <Text content="invalid cell" />
    </Cell>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual([
    'Cell must be a direct child of one of [Head, Row].',
  ]);
});

const blockLevelElements: [string, ForgeElement][] = [
  [
    'Image',
    // @ts-ignore - suppress warning that children is not a prop of Image
    <Image src="http://test.com" alt="test">
      <Text content="invalid child" />
    </Image>,
  ],
  [
    'TextArea',
    // @ts-ignore - suppress warning that children is not a prop of TextArea
    <TextArea name="name" label="label">
      <Text content="invalid child" />
    </TextArea>,
  ],
  [
    'UserPicker',
    // @ts-ignore - suppress warning that children is not a prop of UserPicker
    <UserPicker name="reviewerAccountId" label="Reviewer">
      <Text content="invalid child" />
    </UserPicker>,
  ],
];
it.each(blockLevelElements)(
  'should fail if block-level component %s has children',
  async (componentName, app) => {
    const aux = await getInitializeAux(app);
    const result = validate(aux, 'xen:macro');

    expect(result.errors).toContain(`${componentName} cannot have children.`);
  },
);

it('should allow Field components in a ConfigForm', async () => {
  const Config = () => (
    <ConfigForm>
      <Text content="This greeting will be used to welcome the user" />
      <TextField name="greeting" label="Greeting" />
      <UserPicker name="reviewerAccountId" label="Reviewer" />
    </ConfigForm>
  );

  const aux = await getConfigAux(
    // @ts-ignore - delete when we no longer support legacy config http://go/j/DEVO-466
    <Macro app={<Text content="app" />} config={<Config />} />,
  );
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toHaveLength(0);
});

const formFieldComponents: [string, ForgeElement][] = [
  ['TextField', <TextField name="not in a form" label="not in a form" />],
  ['UserPicker', <UserPicker name="reviewerAccountId" label="Reviewer" />],
];
it.each(formFieldComponents)(
  'should not allow field component %s outside a form component',
  async (componentName, app) => {
    const aux = await getInitializeAux(app);
    const result = validate(aux, 'xen:macro');

    expect(result.errors).toEqual([
      `${componentName} must be used within one of [Form, ConfigForm, MacroConfig, CustomFieldEdit, CustomFieldContextConfig, DashboardGadgetEdit].`,
    ]);
  },
);

it('validates required UserPicker props', async () => {
  // @ts-ignore Ignore required props type check since we want to test for it
  const aux = await getInitializeAux(<UserPicker />);
  const result = validate(aux, 'xen:macro');

  expect(result.warnings).toContain('Missing required prop: name.');
  expect(result.warnings).toContain('Missing required prop: label.');
});

// TODO: Replace raw aux with App code once @forge/ui is released with inline components
it('disallows inline components being used outside of a Text component', async () => {
  const aux = {
    type: 'View',
    children: [
      {
        type: 'Text',
        children: [],
        key: 'Text.0',
        props: { format: 'adf', content: [] },
      },
      {
        children: [],
        key: 'StatusLozenge.0',
        props: { appearance: 'inprogress', text: 'It works!' },
        type: 'StatusLozenge',
      },
      {
        children: [],
        key: 'DateLozenge.0',
        props: { value: 12234656 },
        type: 'DateLozenge',
      },
      {
        children: [],
        key: 'Mention.0',
        props: { accountId: '5e15b0d49af3650e9e409674' },
        type: 'Mention',
      },
    ],
  };
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual([
    'StatusLozenge must be a direct child of a Text component.',
    'DateLozenge must be a direct child of a Text component.',
    'Mention must be a direct child of a Text component.',
  ]);
});

test.each([
  ['ContentAction', 'confluence:contentAction'],
  ['IssueAction', 'jira:issueAction'],
])('%s forbids non-ModalDialog as child', async (componentType, moduleType) => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: componentType,
        children: [
          {
            type: 'text',
            props: {
              content: 'not allowed - should be a ModalDialog or nothing',
            },
            children: [],
          },
        ],
      },
    ],
  };
  const result = validate(aux, moduleType);
  expect(result).toEqual({
    errors: [
      `Expected direct child of ${componentType} to be ModalDialog. Received text component.`,
    ],
    warnings: [],
  });
});

test.each([
  ['ContextMenu', 'confluence:contextMenu'],
  ['ContentBylineItem', 'confluence:contentBylineItem'],
])(
  `%s forbids non-InlineDialog/ModalDialog as child`,
  async (componentType, moduleType) => {
    const aux: ForgeDoc = {
      type: 'View',
      children: [
        {
          type: componentType,
          children: [
            {
              type: 'text',
              props: {
                content:
                  'not allowed - should be a ModalDialog/InlineDialog or nothing',
              },
              children: [],
            },
          ],
        },
      ],
    };
    const result = validate(aux, moduleType);
    expect(result).toEqual({
      errors: [
        `Expected direct child of ${componentType} to be one of [ModalDialog, InlineDialog]. Received text component.`,
      ],
      warnings: [],
    });
  },
);

test(`ContextMenu permits InlineDialog as a child`, async () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'ContextMenu',
        children: [
          {
            type: 'InlineDialog',
            children: [
              {
                type: 'Text',
                props: {
                  content: 'this is valid',
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
  const result = validate(aux, 'confluence:contextMenu');
  expect(result).toEqual({
    errors: [],
    warnings: [],
  });
});

test.each([
  ['ContentAction', 'confluence:contentAction'],
  ['ContentBylineItem', 'confluence:contentBylineItem'],
  ['ContextMenu', 'confluence:contextMenu'],
  ['IssueAction', 'jira:issueAction'],
])('%s permits ModalDialog as child', (componentType, moduleType) => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: componentType,
        children: [
          {
            type: 'ModalDialog',
            props: {
              header: 'Modal Header',
              onClose: {
                componentKey: 'modalKey',
                prop: 'onClose',
              },
            },
            children: [
              {
                type: 'Text',
                props: {
                  content: 'hello world',
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
  const result = validate(aux, moduleType);
  expect(result).toEqual({
    errors: [],
    warnings: [],
  });
});

test.each([
  ['ContentAction', 'confluence:contentAction'],
  ['ContentBylineItem', 'confluence:contentBylineItem'],
  ['ContextMenu', 'confluence:contextMenu'],
  ['GlobalSettings', 'confluence:globalSettings'],
  ['HomepageFeed', 'confluence:homepageFeed'],
  ['SpacePage', 'confluence:spacePage'],
  ['SpaceSettings', 'confluence:spaceSettings'],
  ['IssueAction', 'jira:issueAction'],
])('%s permits empty children', (componentType, moduleType) => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: componentType,
        children: [],
      },
    ],
  };
  const result = validate(aux, moduleType);
  expect(result).toEqual({
    errors: [],
    warnings: [],
  });
});

test.each([
  ['confluence:contentAction', 'ContentAction'],
  ['confluence:contentBylineItem', 'ContentBylineItem'],
  ['confluence:contextMenu', 'ContextMenu'],
  ['confluence:globalSettings', 'GlobalSettings'],
  ['confluence:homepageFeed', 'HomepageFeed'],
  ['confluence:spacePage', 'SpacePage'],
  ['confluence:spaceSettings', 'SpaceSettings'],
  ['jira:issueAction', 'IssueAction'],
  ['jira:issueActivity', 'IssueActivity'],
  ['jira:issueGlance', 'IssueGlance'],
  ['jira:issuePanel', 'IssuePanel'],
  ['jira:customField', 'CustomField'],
  ['jira:adminPage', 'AdminPage'],
  ['jira:projectPage', 'ProjectPage'],
  ['jira:dashboardGadget', 'DashboardGadget'],
])('%s must have a <%s> at the root', (extensionPoint, componentName) => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'Text',
        props: {
          content: 'must have a top-level component',
        },
        children: [],
      },
    ],
  };
  const result = validate(aux, extensionPoint);
  expect(result).toEqual({
    errors: [`You must have a <${componentName}> at the root.`],
    warnings: [],
  });
});

test.each([
  ['CustomFieldEdit', 'jira:customField, jira:customFieldType', 'edit'],
  ['CustomFieldContextConfig', 'jira:customFieldType', 'contextConfig'],
])(
  '%s cannot be used outside <%s> module',
  (componentName, extensionPoints, entryPoint) => {
    const aux: ForgeDoc = {
      type: 'View',
      children: [
        {
          type: componentName,
          children: [],
        },
      ],
    };
    const result = validate(aux, '');
    expect(result).toEqual({
      errors: [
        `${componentName} must be used in one of [${extensionPoints}].`,
        `${componentName} must be used in the ${entryPoint} entry point.`,
      ],
      warnings: [],
    });
  },
);

test('CustomFieldEdit cannot have Form child element', () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'CustomFieldEdit',
        children: [
          {
            type: 'Form',
            props: {
              onSubmit: {
                componentKey: 'submitButton',
                prop: 'onSubmit',
              },
              children: [],
            },
            children: [],
          },
        ],
      },
    ],
  };
  const result = validate(aux, 'jira:customField', 'edit');
  expect(result).toEqual({
    errors: [`Form cannot be used as child of CustomFieldEdit`],
    warnings: [],
  });
});

test.each([
  ['CustomFieldEdit', 'edit', 'jira:customField'],
  ['CustomFieldContextConfig', 'contextConfig', 'jira:customFieldType'],
  ['DashboardGadgetEdit', 'edit', 'jira:dashboardGadget'],
])(
  '%s have to be used at root of %s entry point',
  (componentName, entryPoint, extensionPoint) => {
    const aux: ForgeDoc = {
      type: 'View',
      children: [
        {
          type: 'Text',
          props: {
            content: 'wrong rool component',
          },
          children: [],
        },
      ],
    };
    const result = validate(aux, extensionPoint, entryPoint);
    expect(result).toEqual({
      errors: [
        `You must have a <${componentName}> at the root of the ${entryPoint} function.`,
      ],
      warnings: [],
    });
  },
);

test('CustomFieldEdit cannot be used without "edit" entry point', () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'CustomFieldEdit',
        children: [],
      },
    ],
  };
  const result = validate(aux, 'jira:customField');
  expect(result).toEqual({
    errors: [
      'You must have a <CustomField> at the root.',
      'CustomFieldEdit must be used in the edit entry point.',
    ],
    warnings: [],
  });
});

test('CustomField do not permits child element not whitelisted', () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'CustomField',
        children: [
          {
            type: 'Button',
            props: {
              text: 'Button label',
              value: 'buttonValue',
              onClick: {
                componentKey: 'buttonKey',
                prop: 'onClick',
              },
            },
            children: [],
          },
        ],
      },
    ],
  };
  const result = validate(aux, 'jira:customField');
  expect(result).toEqual({
    errors: [
      'Expected direct child of CustomField to be one of [Avatar, AvatarStack, Code, Image, Text, Tooltip, Tag, TagGroup]. Received Button component.',
    ],
    warnings: [],
  });
});

it('CustomField permits text and inline components', async () => {
  const App = () => (
    <CustomField>
      <Text>
        This field has text and a{' '}
        <StatusLozenge text="lozenge" appearance="success" />
      </Text>
    </CustomField>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'jira:customField');

  expect(result.errors).toHaveLength(0);
});

test('CustomFieldEdit validates when fulfills all conditions', () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'CustomFieldEdit',
        children: [],
      },
    ],
  };
  const result = validate(aux, 'jira:customField', 'edit');
  expect(result).toEqual({
    errors: [],
    warnings: [],
  });
});

test('CustomField do not permits not whitelisted child element deep in component tree', async () => {
  const App = () => (
    <CustomField>
      <Fragment>
        <Button text="Button label" onClick={() => {}} />
        <Button text="Button label two" onClick={() => {}} />
      </Fragment>
    </CustomField>
  );
  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'jira:customField');
  expect(result).toEqual({
    errors: [
      'Expected direct child of CustomField to be one of [Avatar, AvatarStack, Code, Image, Text, Tooltip, Tag, TagGroup]. Received Button component.',
      'Expected direct child of CustomField to be one of [Avatar, AvatarStack, Code, Image, Text, Tooltip, Tag, TagGroup]. Received Button component.',
    ],
    warnings: [],
  });
});

test('CustomField permits whitelisted child element', () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'CustomField',
        children: [
          {
            type: 'Text',
            props: {},
            children: [
              {
                type: 'StatusLozenge',
                props: {
                  text: 'hello world',
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
  const result = validate(aux, 'jira:customField');
  expect(result).toEqual({
    errors: [],
    warnings: [],
  });
});

test('IssuePanelAction validates when fulfills all conditions', () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'IssuePanel',
        children: [
          {
            children: [],
            key: 'IssuePanelAction.0.0',
            props: {
              __auxId: 'IssuePanelAction.0',
              text: 'Action 1',
              onClick: {
                componentKey: 'IssuePanelAction.0.0',
                prop: 'onClick',
              },
            },
            type: 'IssuePanelAction',
          },
          {
            children: [],
            key: 'IssuePanelAction.1.0',
            props: {
              __auxId: 'IssuePanelAction.1',
              text: 'Action 2',
              onClick: {
                componentKey: 'IssuePanelAction.1.0',
                prop: 'onClick',
              },
            },
            type: 'IssuePanelAction',
          },
        ],
      },
    ],
  };
  const result = validate(aux, 'jira:issuePanel');
  expect(result).toEqual({
    errors: [],
    warnings: [],
  });
});

test.each([
  ['confluence:contentAction'],
  ['confluence:contentBylineItem'],
  ['confluence:contextMenu'],
  ['confluence:globalSettings'],
  ['confluence:homepageFeed'],
  ['confluence:spacePage'],
  ['confluence:spaceSettings'],
  ['jira:issueAction'],
  ['jira:issueActivity'],
  ['jira:issueGlance'],
  ['jira:issuePanel'],
  ['jira:adminPage'],
  ['jira:projectPage'],
  ['jira:customField'],
  ['jira:dashboardGadget'],
])(
  '%s permits an ErrorPanel instead of a top-level component',
  (extensionPoint) => {
    const aux: ForgeDoc = {
      type: 'View',
      children: [
        {
          type: 'ErrorPanel',
          props: {
            error: {
              message:
                'ErrorPanel is always allowed without a top-level component',
            },
          },
          children: [],
        },
      ],
    };
    const result = validate(aux, extensionPoint);
    expect(result).toEqual({
      errors: [],
      warnings: [],
    });
  },
);

test('ModalDialog requires header, onClose', () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'ModalDialog',
        props: {},
        children: [
          {
            type: 'Text',
            props: {
              content: 'hello world',
            },
            children: [],
          },
        ],
      },
    ],
  };
  const result = validate(aux, 'xen:macro');
  expect(result).toEqual({
    errors: [
      'ModalDialog must have a header',
      'ModalDialog must have a onClose',
    ],
    warnings: [],
  });
});

test('ModalDialog passes validation with header, onClose', () => {
  const aux: ForgeDoc = {
    type: 'View',
    children: [
      {
        type: 'ModalDialog',
        props: {
          header: 'Modal Header',
          onClose: {
            componentKey: 'modalKey',
            prop: 'onClose',
          },
        },
        children: [
          {
            type: 'Text',
            props: {
              content: 'hello world',
            },
            children: [],
          },
        ],
      },
    ],
  };
  const result = validate(aux, 'xen:macro');
  expect(result).toEqual({
    errors: [],
    warnings: [],
  });
});

test('name prop on form fields cannot be a numeric string', async () => {
  const App = () => (
    <Form onSubmit={() => {}}>
      <TextField name="1" label="label" />
      <TextArea name="2" label="label" />
      <UserPicker name="" label="label" />
      <CheckboxGroup name="45 non-numeric string 7" label="label">
        <Checkbox label="label" value="checkbox" />
      </CheckboxGroup>
    </Form>
  );

  const aux = await getInitializeAux(<App />);
  const result = validate(aux, 'xen:macro');

  expect(result.errors).toEqual([
    '"name" prop on TextField must be a non-numeric string.',
    '"name" prop on TextArea must be a non-numeric string.',
    '"name" prop on UserPicker must be a non-empty string.',
  ]);
});

test.each([
  ['ContentAction', 'confluence:contentAction'],
  ['ContentBylineItem', 'confluence:contentBylineItem'],
  ['ContextMenu', 'confluence:contextMenu'],
  ['GlobalSettings', 'confluence:globalSettings'],
  ['HomepageFeed', 'confluence:homepageFeed'],
  ['SpacePage', 'confluence:spacePage'],
  ['SpaceSettings', 'confluence:spaceSettings'],
  ['IssueAction', 'jira:issueAction'],
  ['IssueActivity', 'jira:issueActivity'],
  ['IssueGlance', 'jira:issueGlance'],
  ['IssuePanel', 'jira:issuePanel'],
  ['IssuePanelAction', 'jira:issuePanel'],
  ['AdminPage', 'jira:adminPage'],
  ['ProjectPage', 'jira:projectPage'],
  ['DashboardGadget', 'jira:dashboardGadget'],
])(
  'should fail if %s is used outside of %s module',
  (componentType, moduleType) => {
    const aux: ForgeDoc = {
      type: 'View',
      children: [
        {
          type: componentType,
          props: {},
          children: [],
        },
      ],
    };
    const result = validate(aux, 'not-the-right-module');
    expect(result.errors).toContain(
      `${componentType} must be used in the ${moduleType} module.`,
    );
  },
);

test.each([
  ['CustomField', 'jira:customField, jira:customFieldType'],
  ['CustomFieldEdit', 'jira:customField, jira:customFieldType'],
])(
  'should fail if %s is used outside one of %s modules',
  (componentType, moduleTypes) => {
    const aux: ForgeDoc = {
      type: 'View',
      children: [
        {
          type: componentType,
          props: {},
          children: [],
        },
      ],
    };
    const result = validate(aux, 'not-the-right-module');
    expect(result.errors).toContain(
      `${componentType} must be used in one of [${moduleTypes}].`,
    );
  },
);

test.each([
  ['ContentAction', 'confluence:contentAction'],
  ['ContentBylineItem', 'confluence:contentBylineItem'],
  ['ContextMenu', 'confluence:contextMenu'],
  ['GlobalSettings', 'confluence:globalSettings'],
  ['HomepageFeed', 'confluence:homepageFeed'],
  ['SpacePage', 'confluence:spacePage'],
  ['SpaceSettings', 'confluence:spaceSettings'],
  ['IssueAction', 'jira:issueAction'],
  ['IssueActivity', 'jira:issueActivity'],
  ['IssueGlance', 'jira:issueGlance'],
  ['IssuePanel', 'jira:issuePanel'],
  ['AdminPage', 'jira:adminPage'],
  ['ProjectPage', 'jira:projectPage'],
  ['CustomField', 'jira:customField'],
  ['CustomFieldEdit', 'jira:customField'],
  ['DashboardGadget', 'jira:dashboardGadget'],
  ['DashboardGadgetEdit', 'jira:dashboardGadget'],
])(
  'should fail if %s is not used as a top level component',
  (componentType, moduleType) => {
    const aux: ForgeDoc = {
      type: 'View',
      children: [
        {
          type: 'Form',
          props: {},
          children: [
            {
              type: componentType,
              props: {},
              children: [],
            },
          ],
        },
      ],
    };
    const result = validate(aux, moduleType);
    expect(result.errors).toContain(
      `${componentType} was used within a Form but it must be used at the root.`,
    );
  },
);
