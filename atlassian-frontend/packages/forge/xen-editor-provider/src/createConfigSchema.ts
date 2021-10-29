import { FieldDefinition, Option } from '@atlaskit/editor-common/extensions';
import { ForgeDoc, ForgeProps } from '@atlassian/forge-ui-types';

type FieldConstructor = (
  props: ForgeProps,
  children: ForgeDoc[],
) => FieldDefinition;

type FieldMap = {
  [key: string]: FieldConstructor;
};

export const CONFIG_USER_PICKER_PROVIDER = 'configUserPicker';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export const threeLOPromptErrorMessage = `For this app to display, you need to press the Allow Access button in the
macro to allow the app to access Atlassian products on your behalf.`;

function findDefaultValue(options: ForgeDoc[], isMulti: true): string[];
function findDefaultValue(
  options: ForgeDoc[],
  isMulti: false,
): string | undefined;
function findDefaultValue(
  options: ForgeDoc[],
  isMulti: boolean,
): string | string[] | undefined {
  const defaultValues = options.reduce((acc, { props }) => {
    if (props) {
      for (const prop of ['defaultChecked', 'defaultSelected']) {
        if (prop in props) {
          return [...acc, props.value];
        }
      }
    }
    return acc;
  }, [] as string[]);

  return isMulti ? defaultValues : defaultValues[0];
}

const findItems = (options: ForgeDoc[]): Option[] =>
  options.map(({ props, type }) => {
    if (!props) {
      throw new Error(`Props are undefined on ${type}`);
    }
    return {
      label: props.label,
      value: props.value,
    };
  });

const fieldMap: FieldMap = {
  TextField: (props) => ({
    type: 'string',
    name: props.name,
    label: props.label,
    description: props.description,
    defaultValue: props.defaultValue,
    isRequired: props.isRequired,
    isHidden: props.isHidden,
    placeholder: props.placeholder,
  }),
  DatePicker: (props) => ({
    type: 'date',
    name: props.name,
    label: props.label,
    description: props.description,
    defaultValue: props.defaultValue,
    isRequired: props.isRequired,
    placeholder: props.placeholder,
  }),
  Select: (props, children) => ({
    type: 'enum',
    name: props.name,
    label: props.label,
    description: props.description,
    isRequired: props.isRequired,
    style: 'select',
    isMultiple: props.isMulti,
    placeholder: props.placeholder,
    items: findItems(children),
    defaultValue: findDefaultValue(children, props.isMulti),
  }),
  CheckboxGroup: (props, children) => ({
    type: 'enum',
    name: props.name,
    label: props.label,
    description: props.description,
    isRequired: props.isRequired,
    style: 'checkbox',
    isMultiple: true,
    items: findItems(children),
    defaultValue: findDefaultValue(children, true),
  }),
  RadioGroup: (props, children) => ({
    type: 'enum',
    name: props.name,
    label: props.label,
    description: props.description,
    isRequired: props.isRequired,
    style: 'radio',
    isMultiple: false,
    items: findItems(children),
    defaultValue: findDefaultValue(children, false),
  }),
  UserPicker: (props) => ({
    type: 'user',
    name: props.name,
    label: props.label,
    isMultiple: props.isMulti,
    isRequired: props.isRequired,
    options: {
      provider: { type: CONFIG_USER_PICKER_PROVIDER },
    },
    placeholder: props.placeholder,
    description: props.description,
    defaultValue: props.defaultValue,
  }),
  TextArea: (props) => ({
    type: 'string',
    name: props.name,
    style: 'multiline',
    label: props.label,
    placeholder: props.placeholder,
    description: props.description,
    isRequired: props.isRequired,
    defaultValue: props.defaultValue,
  }),
};

const createValidationError = (invalidComponentTypes: string[]): string => {
  // Filter out duplicate types. e.g. if there were multiple Images we only need to mention it once.
  // Error shouldn't look like: "Image and Image components are not supported in macro config"
  const types = [...new Set(invalidComponentTypes)];
  return `${
    types.length === 1 ? '' : `${types.slice(0, -1).join(', ')} and`
  } ${types.slice(-1)} components are not supported in macro config`;
};

export const createSchemaFromConfig = (
  children: ForgeDoc[],
): FieldDefinition[] => {
  const schema = children.map(({ children, props, type }) => {
    if (!fieldMap[type]) {
      return type;
    }
    return fieldMap[type](props || {}, children);
  });
  // Check if any validation errors occured
  const invalidComponentTypes = schema.filter(
    (field) => typeof field === 'string',
  ) as string[];

  if (invalidComponentTypes.length > 0) {
    throw new ValidationError(createValidationError(invalidComponentTypes));
  }
  return schema as FieldDefinition[];
};

export function createSchemaFromAux(aux: ForgeDoc) {
  for (const { type, props, children } of aux.children) {
    if (type === 'ErrorPanel' && props) {
      const {
        error: { errorMessage, errorDetails },
      } = props;
      throw new Error(`${errorMessage || errorDetails || ''}`);
    }
    if (type === 'ThreeLOPrompt') {
      throw new Error(threeLOPromptErrorMessage);
    }
    if (type === 'MacroConfig') {
      return createSchemaFromConfig(children);
    }
  }
  throw new Error('<MacroConfig> must be used at the root');
}
