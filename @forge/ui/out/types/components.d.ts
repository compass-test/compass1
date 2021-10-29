import { ForgeChildren, ForgeNode, ForgeElement, CustomFieldValue } from './forge';
import { Icon } from './icons';
export interface AuxPipelineUserVisibleError extends Error {
    errorMessage?: string;
    errorDetails?: string;
}
export interface BadgeProps {
    appearance?: 'added' | 'default' | 'important' | 'primary' | 'removed';
    text: string;
}
export declare type ButtonAppearance = 'default' | 'danger' | 'link' | 'primary' | 'subtle' | 'subtle-link' | 'warning';
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
export declare type FormData = Record<string, any>;
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
export declare type ModalDialogWidth = 'small' | 'medium' | 'large' | 'x-large';
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
export declare type ImageSizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
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
export declare type ContainerProps = {};
declare type LayoutTemplate = 'grid-2' | 'grid-3' | 'sidebar-left' | 'sidebar-right';
export declare type LayoutProps = {
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
export declare type CodeLanguages = 'abap' | 'actionscript' | 'ada' | 'arduino' | 'autoit' | 'c' | 'c++' | 'coffeescript' | 'csharp' | 'css' | 'cuda' | 'd' | 'dart' | 'delphi' | 'elixir' | 'erlang' | 'fortran' | 'foxpro' | 'go' | 'graphql' | 'groovy' | 'haskell' | 'haxe' | 'html' | 'java' | 'javascript' | 'json' | 'julia' | 'kotlin' | 'latex' | 'livescript' | 'lua' | 'mathematica' | 'matlab' | 'objective-c' | 'objective-j' | 'objectpascal' | 'ocaml' | 'octave' | 'perl' | 'php' | 'powershell' | 'prolog' | 'puppet' | 'python' | 'qml' | 'r' | 'racket' | 'restructuredtext' | 'ruby' | 'rust' | 'sass' | 'scala' | 'scheme' | 'shell' | 'smalltalk' | 'sql' | 'standardml' | 'swift' | 'tcl' | 'tex' | 'text' | 'typescript' | 'vala' | 'vbnet' | 'verilog' | 'vhdl' | 'xml' | 'xquery';
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
export declare type StatusLozengeAppearance = 'default' | 'inprogress' | 'moved' | 'new' | 'removed' | 'success';
export interface StatusLozengeProps {
    appearance?: StatusLozengeAppearance;
    text: string;
}
export interface MentionProps {
    accountId: string;
}
export declare type TextFieldType = 'email' | 'number' | 'tel' | 'text';
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
export declare type HeadingProps = {
    size?: 'small' | 'medium' | 'large';
    children: ForgeChildren<string>;
};
export declare type MarkupProps = {
    children: ForgeChildren<ForgeNode | string | number>;
};
export declare type LinkProps = {
    href: string;
    openNewTab?: boolean;
    appearance?: 'primary-button' | 'button' | 'link';
} & MarkupProps;
export declare type StringProps = {
    text: string;
};
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
export declare type TagColor = 'default' | 'green' | 'blue' | 'red' | 'purple' | 'grey' | 'teal' | 'yellow' | 'green-light' | 'blue-light' | 'red-light' | 'purple-light' | 'grey-light' | 'teal-light' | 'yellow-light';
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
interface TextProps {
    format?: 'plaintext' | 'markup';
    align?: 'start' | 'center' | 'end';
}
interface TextPropsWithContent extends TextProps {
    content: string;
}
interface TextPropsWithChildren extends TextProps {
    children: ForgeChildren<ForgeNode | string | number>;
}
export declare type JsxTextProps = TextPropsWithContent | TextPropsWithChildren;
export declare type TextAlign = 'start' | 'center' | 'end';
export declare type RenderedTextProps = {
    content?: undefined;
    align: TextAlign;
    format: 'markup';
} | {
    content: string;
    format?: 'plaintext';
} | {
    content: object;
    format: 'adf';
};
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
export declare type UserProps = {
    accountId: string;
};
export declare type UserGroupProps = {
    children: ForgeChildren;
};
export interface IssuePanelActionProps {
    text: string;
    onClick: () => Promise<void> | void;
}
export {};
//# sourceMappingURL=components.d.ts.map