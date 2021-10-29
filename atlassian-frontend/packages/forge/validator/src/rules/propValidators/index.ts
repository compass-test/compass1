import * as t from 'io-ts';
import {
  BadgeProps,
  ButtonProps,
  CheckboxGroupProps,
  CheckboxProps,
  ContainerProps,
  DateLozengeProps,
  DatePickerProps,
  ErrorPanelProps,
  FormProps,
  FormConditionProps,
  HeadingProps,
  ImageProps,
  IssuePanelActionProps,
  LayoutProps,
  LinkProps,
  MarkupProps,
  MentionProps,
  OptionProps,
  RadioGroupProps,
  RadioProps,
  RangeProps,
  SelectProps,
  TableProps,
  TabProps,
  TagProps,
  TagGroupProps,
  TextAreaProps,
  TextFieldProps,
  ThreeLOPromptProps,
  RenderedTextProps,
  StatusLozengeProps,
  UserProps,
  UserGroupProps,
  UserPickerProps,
} from '@atlassian/forge-ui-types';

type RequiredPropNames<P> = {
  [K in keyof P]-?: {} extends Pick<P, K> ? never : K;
}[keyof P];
type RequiredProps<P> = Pick<P, RequiredPropNames<P>>;
type OptionalPropNames<P> = Exclude<keyof P, RequiredPropNames<P>>;
type OptionalProps<P> = Required<Pick<P, OptionalPropNames<P>>>;

const defined = new t.Type<object, object, any>(
  'defined',
  (input: any): input is object => typeof input !== 'undefined',
  (input, context) =>
    typeof input !== 'undefined' ? t.success(input) : t.failure(input, context),
  t.identity,
);

type Runtime<P> = {
  [K in keyof P]: P[K] extends string
    ? t.StringC
    : P[K] extends number
    ? t.NumberC
    : P[K] extends boolean
    ? t.BooleanC
    : P[K] extends object
    ? t.Type<object, object, any>
    : t.UnknownC;
};

function intersection<T>(
  required: Runtime<Omit<RequiredProps<T>, 'children'>>,
  optional: Runtime<Omit<OptionalProps<T>, 'children'>>,
) {
  return t.intersection([t.type(required), t.partial(optional)]);
}

export const Badge = intersection<BadgeProps>(
  {
    text: t.string,
  },
  {
    appearance: t.string,
  },
);

export const Button = intersection<ButtonProps>(
  {
    text: t.string,
    onClick: defined,
  },
  {
    appearance: t.string,
    disabled: t.boolean,
    icon: t.string,
    iconPosition: t.string,
  },
);

export const Checkbox = intersection<CheckboxProps>(
  {
    label: t.string,
    value: t.string,
  },
  {
    defaultChecked: t.boolean,
    isRequired: t.boolean,
  },
);

export const CheckboxGroup = intersection<CheckboxGroupProps>(
  {
    label: t.string,
    name: t.string,
  },
  {
    description: t.string,
  },
);

export const Container = intersection<ContainerProps>({}, {});

export const DateLozenge = intersection<DateLozengeProps>(
  {
    value: t.number,
  },
  {},
);

export const DatePicker = intersection<DatePickerProps>(
  {
    name: t.string,
    label: t.string,
  },
  {
    defaultValue: t.string,
    isRequired: t.boolean,
    placeholder: t.string,
    description: t.string,
  },
);

export const ErrorPanel = intersection<ErrorPanelProps>(
  {
    error: defined,
  },
  {},
);

export const Form = intersection<Omit<FormProps<any>, 'actionButtons'>>(
  {
    onSubmit: defined,
  },
  {
    submitButtonText: t.string,
    submitButtonAppearance: t.string,
  },
);

export const FormCondition = intersection<Omit<FormConditionProps, 'is'>>(
  {
    when: t.string,
  },
  {
    areChildrenPersisted: t.boolean,
  },
);

export const Heading = intersection<HeadingProps>(
  {},
  {
    size: t.string,
  },
);

export const Image = intersection<ImageProps>(
  {
    src: t.string,
    alt: t.string,
  },
  {
    size: t.string,
  },
);

export const IssuePanelAction = intersection<IssuePanelActionProps>(
  {
    text: t.string,
    onClick: defined,
  },
  {},
);

export const Layout = intersection<LayoutProps>(
  {
    template: t.string,
  },
  {},
);

export const Link = intersection<LinkProps>(
  {
    href: t.string,
  },
  {
    appearance: t.string,
    openNewTab: t.boolean,
  },
);

export const Markup = intersection<MarkupProps>({}, {});

export const Mention = intersection<MentionProps>(
  {
    accountId: t.string,
  },
  {},
);

export const Option = intersection<OptionProps>(
  {
    label: t.string,
    value: t.unknown,
  },
  {
    defaultSelected: t.boolean,
  },
);

export const Radio = intersection<RadioProps>(
  {
    label: t.string,
    value: t.string,
  },
  {
    defaultChecked: t.boolean,
  },
);

export const RadioGroup = intersection<RadioGroupProps>(
  {
    label: t.string,
    name: t.string,
  },
  {
    isRequired: t.boolean,
    description: t.string,
  },
);

export const Range = intersection<RangeProps>(
  {
    name: t.string,
    label: t.string,
  },
  {
    min: t.number,
    max: t.number,
    step: t.number,
    defaultValue: t.number,
  },
);

export const Select = intersection<SelectProps>(
  {
    label: t.string,
    name: t.string,
  },
  {
    isMulti: t.boolean,
    description: t.string,
    isRequired: t.boolean,
    placeholder: t.string,
  },
);

export const Table = intersection<TableProps>(
  {},
  {
    rowsPerPage: t.number,
  },
);

export const Tab = intersection<TabProps>(
  {
    label: t.string,
  },
  {},
);

export const Tag = intersection<TagProps>(
  {
    text: t.string,
  },
  {
    color: t.string,
  },
);
export const TagGroup = intersection<TagGroupProps>({}, {});

export const Text = intersection<RenderedTextProps>(
  {},
  {
    content: t.string,
    format: t.string,
  },
);

export const TextArea = intersection<TextAreaProps>(
  {
    label: t.string,
    name: t.string,
  },
  {
    defaultValue: t.string,
    isMonospaced: t.boolean,
    isRequired: t.boolean,
    description: t.string,
    placeholder: t.string,
    spellCheck: t.boolean,
  },
);

export const TextField = intersection<TextFieldProps>(
  {
    label: t.string,
    name: t.string,
  },
  {
    type: t.string, // TODO: oneOf SupportedInputTypes
    isRequired: t.boolean,
    defaultValue: t.string,
    description: t.string,
    placeholder: t.string,
    autoComplete: t.string,
  },
);

export const ThreeLOPrompt = intersection<ThreeLOPromptProps>(
  {
    authUrl: t.string,
  },
  {
    message: t.string,
    promptText: t.string,
  },
);

export const StatusLozenge = intersection<StatusLozengeProps>(
  {
    text: t.string,
  },
  {
    appearance: t.string,
  },
);

export const User = intersection<UserProps>(
  {
    accountId: t.string,
  },
  {},
);

export const UserGroup = intersection<UserGroupProps>({}, {});

// TODO: defaultValue is a union of string and string[]
export const UserPicker = intersection<Omit<UserPickerProps, 'defaultValue'>>(
  {
    name: t.string,
    label: t.string,
  },
  {
    description: t.string,
    placeholder: t.string,
    isRequired: t.boolean,
    isMulti: t.boolean,
  },
);
