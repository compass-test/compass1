import {
  ForgeChildren,
  ForgeNode,
  ForgeElement,
  CustomFieldValue,
} from './forge';
import { Icon } from './icons';

export interface AuxPipelineUserVisibleError extends Error {
  errorMessage?: string;
  errorDetails?: string;
}

export interface BadgeProps {
  appearance?: 'added' | 'default' | 'important' | 'primary' | 'removed';
  text: string;
}

export type ButtonAppearance =
  | 'default'
  | 'danger'
  | 'link'
  | 'primary'
  | 'subtle'
  | 'subtle-link'
  | 'warning';

export interface ButtonProps {
  appearance?: ButtonAppearance;
  text: string;
  disabled?: boolean;
  onClick: () => Promise<void> | void;
  icon?: Icon;
  iconPosition?: 'before' | 'after';
}

export interface ButtonSetProps {
  children: ForgeChildren;
}

export interface ColumnsProps {
  children: ForgeChildren;
}

export interface ColumnProps {
  width?: number;
  children: ForgeChildren;
}

export interface ErrorPanelProps {
  error: AuxPipelineUserVisibleError;
}

export type FormData = Record<string, any>;

export interface FormProps<T extends FormData> {
  children: ForgeChildren;
  onSubmit: (data: T) => Promise<void> | void;
  submitButtonText?: string;
  submitButtonAppearance?: 'default' | 'primary';
  actionButtons?: ForgeElement<ButtonProps>[];
}

export interface FormConditionProps {
  when: string;
  is: boolean | string | Array<string>;
  areChildrenPersisted?: boolean;
  children: ForgeChildren;
}

export interface ConfigFormProps {
  children: ForgeChildren;
}

export interface CustomFieldPrimitiveProps {
  children: ForgeChildren;
}

export type ModalDialogWidth = 'small' | 'medium' | 'large' | 'x-large';

export interface CustomFieldEditPrimitiveProps {
  children: ForgeChildren;
  fieldValue: {
    value: CustomFieldValue;
    updated: boolean;
  };
  isModalOpen: boolean;
}

export interface CustomFieldContextConfigPrimitiveProps {
  children: ForgeChildren;
  data?: Record<string, any>;
}

export interface DashboardGadgetPrimitiveProps {
  children: ForgeChildren;
}

export interface DashboardGadgetEditPrimitiveProps {
  children: ForgeChildren;
  formData: FormData;
}

export type ImageSizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export interface ImageProps {
  src: string;
  alt: string;
  size?: ImageSizes;
}

export interface InlineDialogProps {
  children: ForgeChildren;
}

export interface ModalDialogProps {
  appearance?: 'danger' | 'warning';
  children: ForgeChildren;
  closeButtonText?: string;
  header: string;
  onClose: () => Promise<void> | void;
  width?: ModalDialogWidth;
}

export type ContainerProps = {};

type LayoutTemplate = 'grid-2' | 'grid-3' | 'sidebar-left' | 'sidebar-right';

export type LayoutProps = {
  template: LayoutTemplate;
  children: ForgeChildren;
};

export interface OptionProps {
  defaultSelected?: boolean;
  label: string;
  value: any;
}

export interface SelectProps {
  children?: ForgeChildren;
  isMulti?: boolean;
  label: string;
  name: string;
  description?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export interface TabsProps {
  children: ForgeChildren;
}

export interface TabProps {
  label: string;
  children: ForgeChildren;
}
export interface CheckboxProps {
  label: string;
  value: string;
  defaultChecked?: boolean;
  isRequired?: boolean;
}

export interface CheckboxGroupProps {
  label: string;
  name: string;
  description?: string;
  children: ForgeChildren;
}

export type CodeLanguages =
  | 'abap' // → sql
  | 'actionscript'
  | 'ada'
  | 'arduino'
  | 'autoit'
  | 'c' // → cpp
  | 'c++' // → cpp
  | 'coffeescript'
  | 'csharp' // → cs
  | 'css'
  | 'cuda' // → cpp
  | 'd'
  | 'dart'
  | 'delphi'
  | 'elixir'
  | 'erlang'
  | 'fortran'
  | 'foxpro' // → purebasic
  | 'go'
  | 'graphql'
  | 'groovy'
  | 'haskell'
  | 'haxe'
  | 'html' // → xml
  | 'java'
  | 'javascript'
  | 'json'
  | 'julia'
  | 'kotlin'
  | 'latex' // → tex
  | 'livescript'
  | 'lua'
  | 'mathematica'
  | 'matlab'
  | 'objective-c' // → objectivec
  | 'objective-j' // → objectivec
  | 'objectpascal' // → delphi
  | 'ocaml'
  | 'octave' // → matlab
  | 'perl'
  | 'php'
  | 'powershell'
  | 'prolog'
  | 'puppet'
  | 'python'
  | 'qml'
  | 'r'
  | 'racket' // → lisp
  | 'restructuredtext' // → rest
  | 'ruby'
  | 'rust'
  | 'sass' // → less
  | 'scala'
  | 'scheme'
  | 'shell'
  | 'smalltalk'
  | 'sql'
  | 'standardml' // → sml
  | 'swift'
  | 'tcl'
  | 'tex'
  | 'text'
  | 'typescript'
  | 'vala'
  | 'vbnet'
  | 'verilog'
  | 'vhdl'
  | 'xml'
  | 'xquery';

export interface CodeProps {
  text: string;
  language?: CodeLanguages;
  showLineNumbers?: boolean;
}

export interface DateLozengeProps {
  value: number;
}

export interface DatePickerProps {
  name: string;
  label: string;
  defaultValue?: string;
  description?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export type StatusLozengeAppearance =
  | 'default'
  | 'inprogress'
  | 'moved'
  | 'new'
  | 'removed'
  | 'success';

export interface StatusLozengeProps {
  appearance?: StatusLozengeAppearance;
  text: string;
}

export interface MentionProps {
  accountId: string;
}

export type TextFieldType = 'email' | 'number' | 'tel' | 'text';

export interface TextFieldProps {
  type?: TextFieldType;
  name: string;
  label: string;
  isRequired?: boolean;
  defaultValue?: string;
  description?: string;
  placeholder?: string;
  autoComplete?: 'off';
}

export type HeadingProps = {
  size?: 'small' | 'medium' | 'large';
  children: ForgeChildren<string>;
};

export type MarkupProps = {
  children: ForgeChildren<ForgeNode | string | number>;
};

export type LinkProps = {
  href: string;
  openNewTab?: boolean;
  appearance?: 'primary-button' | 'button' | 'link';
} & MarkupProps;
export type StringProps = { text: string };

export interface ThreeLOPromptProps {
  message?: string;
  promptText?: string;
  authUrl: string;
}

export interface RadioProps {
  defaultChecked?: boolean;
  label: string;
  value: string;
}

export interface RadioGroupProps {
  children?: ForgeChildren;
  isRequired?: boolean;
  label: string;
  description?: string;
  name: string;
}

export interface RangeProps {
  label: string;
  name: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface SectionMessageProps {
  title?: string;
  appearance?: 'info' | 'warning' | 'error' | 'confirmation' | 'change';
  children: ForgeChildren;
}

export type TagColor =
  | 'default'
  | 'green'
  | 'blue'
  | 'red'
  | 'purple'
  | 'grey'
  | 'teal'
  | 'yellow'
  | 'green-light'
  | 'blue-light'
  | 'red-light'
  | 'purple-light'
  | 'grey-light'
  | 'teal-light'
  | 'yellow-light';

export interface TagProps {
  color?: TagColor;
  text: string;
}

export interface TagGroupProps {
  children: ForgeChildren;
}

export interface TextAreaProps {
  name: string;
  label: string;
  defaultValue?: string;
  isMonospaced?: boolean;
  isRequired?: boolean;
  description?: string;
  placeholder?: string;
  spellCheck?: boolean;
}

export interface ToggleProps {
  name: string;
  label: string;
  defaultChecked?: boolean;
}

export interface TooltipProps {
  text: string;
  children: ForgeNode;
}

export interface UserPickerProps {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  isRequired?: boolean;
  isMulti?: boolean;
  defaultValue?: string | string[];
}

// text component
interface TextProps {
  format?: 'plaintext' | 'markup';
  align?: 'start' | 'center' | 'end';
}

// Current API that will be deprecated for children API below
interface TextPropsWithContent extends TextProps {
  content: string;
}

// New children API
interface TextPropsWithChildren extends TextProps {
  children: ForgeChildren<ForgeNode | string | number>;
}

export type JsxTextProps = TextPropsWithContent | TextPropsWithChildren;

export type TextAlign = 'start' | 'center' | 'end';

export type RenderedTextProps =
  | {
      content?: undefined;
      align: TextAlign;
      format: 'markup';
    }
  | {
      content: string;
      format?: 'plaintext';
    };

// table component
export interface TableProps {
  rowsPerPage?: number;
  children: ForgeChildren;
}
export interface HeadProps {
  children: ForgeChildren;
}
export interface RowProps {
  children: ForgeChildren;
}
export interface CellProps {
  children?: ForgeChildren;
}

// Avatars/Users + stacks
export type UserProps = {
  accountId: string;
};

export type UserGroupProps = {
  children: ForgeChildren;
};

export interface IssuePanelActionProps {
  text: string;
  onClick: () => Promise<void> | void;
}
