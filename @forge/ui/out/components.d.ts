/// <reference types="react" />
import { ForgeChildren, ForgeElement, ButtonProps, ButtonSetProps, CheckboxProps, CheckboxGroupProps, CodeProps, CustomFieldValue, DatePickerProps, ErrorPanelProps, FormConditionProps, FormData, FormProps, ImageProps, InlineDialogProps, ModalDialogProps, ModalDialogWidth, RadioProps, RadioGroupProps, OptionProps, SelectProps, TextAreaProps, TextFieldProps, ThreeLOPromptProps, ToggleProps, TooltipProps, UserPickerProps, CellProps, HeadProps, RowProps, TableProps, TagProps, TagGroupProps, UserProps, UserGroupProps, StatusLozengeProps, DateLozengeProps, SectionMessageProps, MarkupProps, LinkProps, BadgeProps, RangeProps, ForgeNode, TabProps, TabsProps, HeadingProps } from './types';
export declare const User: (props: UserProps) => ForgeElement;
export declare const UserGroup: (props: UserGroupProps) => ForgeElement;
export declare const Badge: (props: BadgeProps) => ForgeElement;
export declare const Button: (props: ButtonProps) => ForgeElement;
export declare const ButtonSet: (props: ButtonSetProps) => ForgeElement;
export declare const Code: (props: CodeProps) => ForgeElement;
export declare const ContentAction: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const ContentBylineItem: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const ContextMenu: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const Tag: (props: TagProps) => ForgeElement;
export declare const TagGroup: (props: TagGroupProps) => ForgeElement;
interface TextProps {
    children: ForgeChildren<ForgeNode | string | number>;
}
export declare const Text: (props: TextProps) => ForgeElement;
export declare const Strong: (props: MarkupProps) => ForgeElement;
export declare const Em: (props: MarkupProps) => ForgeElement;
export declare const Strike: (props: MarkupProps) => ForgeElement;
export declare const Link: (props: LinkProps) => ForgeElement;
export declare const Image: (props: ImageProps) => ForgeElement;
export declare const InlineDialog: (props: InlineDialogProps) => ForgeElement;
export declare const Checkbox: (props: CheckboxProps) => ForgeElement;
export declare const CheckboxGroup: (props: CheckboxGroupProps) => ForgeElement;
export declare const DateLozenge: (props: DateLozengeProps) => ForgeElement;
export declare const DatePicker: (props: DatePickerProps) => ForgeElement;
export declare const ErrorPanel: (props: ErrorPanelProps) => ForgeElement;
export declare const Fragment: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const Tab: (props: TabProps) => ForgeElement;
export declare const Tabs: (props: TabsProps) => ForgeElement;
export declare const Heading: (props: HeadingProps) => ForgeElement;
export declare const Cell: (props: CellProps) => ForgeElement;
export declare const Head: (props: HeadProps) => ForgeElement;
export declare const Row: (props: RowProps) => ForgeElement;
export declare const Table: (props: TableProps) => ForgeElement;
export declare const Form: <T extends Record<string, any>>(props: FormProps<T>) => ForgeElement;
export declare const FormCondition: (props: FormConditionProps) => ForgeElement;
export declare const GlobalSettings: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const HomepageFeed: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const ModalDialog: (props: ModalDialogProps) => ForgeElement;
export declare const Range: (props: RangeProps) => ForgeElement;
export declare const SectionMessage: (props: SectionMessageProps) => ForgeElement;
export declare const SpacePage: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const SpaceSettings: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const StatusLozenge: (props: StatusLozengeProps) => ForgeElement;
export declare const TextArea: (props: TextAreaProps) => ForgeElement;
export declare const Toggle: (props: ToggleProps) => ForgeElement;
export declare const Tooltip: (props: TooltipProps) => ForgeElement;
export declare const TextField: (props: TextFieldProps) => ForgeElement;
export declare const Option: (props: OptionProps) => ForgeElement;
export declare const UserPicker: (props: UserPickerProps) => ForgeElement;
export declare const Select: (props: SelectProps) => ForgeElement;
export declare const ThreeLOPrompt: (props: ThreeLOPromptProps) => ForgeElement;
export declare const Radio: (props: RadioProps) => ForgeElement;
export declare const RadioGroup: (props: RadioGroupProps) => ForgeElement;
export declare const Macro: (props: {
    app: ForgeElement;
}) => ForgeElement;
export declare const MacroConfig: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const IssueAction: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const IssueGlance: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const IssuePanelAction: (props: {
    text: string;
    onClick: () => Promise<void> | void;
}) => ForgeElement;
export declare const IssuePanel: ({ actions, children }: {
    actions?: ForgeElement<Record<string, any>>[] | undefined;
    children: ForgeChildren;
}) => JSX.Element;
export declare const IssueActivity: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const CustomField: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const CustomFieldEdit: ({ children, onSubmit, width, header }: {
    children: ForgeChildren;
    onSubmit: (formData: FormData) => Promise<CustomFieldValue> | CustomFieldValue;
    width?: "small" | "medium" | "large" | "x-large" | undefined;
    header?: string | undefined;
}) => ForgeElement;
export declare const CustomFieldContextConfig: ({ children, onSubmit }: {
    children: ForgeChildren;
    onSubmit: (formData: FormData) => Promise<any> | any;
}) => ForgeElement;
export declare const AdminPage: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export declare const ProjectPage: (props: {
    children: ForgeChildren;
}) => ForgeElement;
export {};
//# sourceMappingURL=components.d.ts.map