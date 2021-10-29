export interface ComponentState {
    [hookIndex: number]: any;
}
export interface RenderState {
    [componentKey: string]: ComponentState;
}
export interface Handler {
    componentKey: string;
    prop: string;
}
export declare type ForgeProps = {
    [key: string]: any;
};
export interface ForgeDoc {
    children: ForgeDoc[];
    key?: string;
    props?: ForgeProps;
    type: string;
}
export declare type ForgeElement<P = Record<string, any>> = PrimitiveElement<P> | FunctionElement<P>;
export interface PrimitiveElement<P = Record<string, any>> {
    type: string;
    key: number | string | null;
    props: P & {
        children: ForgeNode[];
    };
}
export interface FunctionElement<P = Record<string, any>> {
    type: (props: P) => ForgeElement;
    key: number | string | null;
    props: P & {
        children: ForgeNode[];
    };
}
export declare const isForgeElement: (auxNode: ForgeNode) => auxNode is ForgeElement<Record<string, any>>;
export declare type ForgeNode = ForgeElement | null | boolean | undefined;
export declare type ForgeChildren<T = ForgeNode> = T | (T | T[])[];
export interface PlatformContext {
    type: string;
}
export interface ExtensionContext {
    type: string;
}
export interface LicenseState {
    isActive?: boolean;
}
export interface ProductContext {
    accountId?: string;
    cloudId?: string;
    contentId?: string;
    localId?: string;
    spaceKey?: string;
    installContext?: string;
    platformContext?: PlatformContext;
    isConfig?: boolean;
    extensionContext?: ExtensionContext;
    license?: LicenseState;
    moduleKey?: string;
}
export interface ExtensionConfiguration {
    [key: string]: any;
}
export interface User {
    accountId: string;
}
export declare type CustomFieldValue = string | number | User | null;
export interface JiraContext extends PlatformContext {
    type: 'jira';
    issueId?: number;
    issueKey?: string;
    issueType?: string;
    projectKey?: string;
    projectId?: string;
    projectType?: string;
}
export declare const isJiraContext: (context: PlatformContext) => context is JiraContext;
export interface IssuePanelExtensionContext extends ExtensionContext {
    type: 'issuePanel';
    isNewToIssue: boolean;
}
export declare const isIssuePanelExtensionContext: (extensionContext: ExtensionContext) => extensionContext is IssuePanelExtensionContext;
export interface CustomFieldContextConfigExtensionContext extends ExtensionContext {
    type: 'contextConfig';
    fieldId: string;
    fieldType: string;
    contextId: number;
    configuration?: any;
    schema?: {
        [key: string]: any;
    };
}
export declare const isCustomFieldContextConfigExtensionContext: (extensionContext: ExtensionContext) => extensionContext is CustomFieldContextConfigExtensionContext;
export interface CustomFieldExtensionContext extends ExtensionContext {
    type: 'customField';
    fieldValue: CustomFieldValue;
    fieldId: string;
    fieldType: string;
}
export declare const isCustomFieldExtensionContext: (extensionContext: ExtensionContext) => extensionContext is CustomFieldExtensionContext;
export interface ContextMenuExtensionContext extends ExtensionContext {
    type: 'contextMenu';
    selectedText: string;
}
export interface ContentActionExtensionContext extends ExtensionContext {
    type: 'contentAction';
}
export declare const isContextMenuExtensionContext: (extensionContext: ExtensionContext) => extensionContext is ContextMenuExtensionContext;
export declare const isContentActionExtensionContext: (extensionContext: ExtensionContext) => extensionContext is ContentActionExtensionContext;
export interface DashboardGadgetExtensionContext extends ExtensionContext {
    type: 'dashboardGadget';
    gadgetConfiguration: Record<string, any>;
}
export declare const isDashboardGadgetExtensionContext: (extensionContext: ExtensionContext) => extensionContext is DashboardGadgetExtensionContext;
//# sourceMappingURL=forge.d.ts.map