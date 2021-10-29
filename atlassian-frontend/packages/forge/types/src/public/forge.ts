// From forge.ts
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

export type ForgeProps = { [key: string]: any };

export interface ForgeDoc {
  children: ForgeDoc[];
  key?: string;
  props?: ForgeProps;
  type: string;
}

export type ForgeElement<P = Record<string, any>> =
  | PrimitiveElement<P>
  | FunctionElement<P>;

export interface PrimitiveElement<P = Record<string, any>> {
  type: string;
  key: number | string | null;
  props: P & { children: ForgeNode[] };
}

export interface FunctionElement<P = Record<string, any>> {
  type: (props: P) => ForgeElement;
  key: number | string | null;
  props: P & { children: ForgeNode[] };
}

export const isForgeElement = (auxNode: ForgeNode): auxNode is ForgeElement => {
  return (
    auxNode !== null && typeof auxNode !== 'boolean' && auxNode !== undefined
  );
};

export type ForgeNode = ForgeElement | null | boolean | undefined;

export type ForgeChildren<T = ForgeNode> = T | (T | T[])[];

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

export type CustomFieldValue = string | number | User | null;

export interface JiraContext extends PlatformContext {
  type: 'jira';
  issueId?: number;
  issueKey?: string;
  issueType?: string;
  projectKey?: string;
  projectId?: string;
  projectType?: string;
}

export const isJiraContext = (
  context: PlatformContext,
): context is JiraContext => context.type === 'jira';

export interface IssuePanelExtensionContext extends ExtensionContext {
  type: 'issuePanel';
  isNewToIssue: boolean;
}

export const isIssuePanelExtensionContext = (
  extensionContext: ExtensionContext,
): extensionContext is IssuePanelExtensionContext =>
  extensionContext.type === 'issuePanel';

export interface CustomFieldContextConfigExtensionContext
  extends ExtensionContext {
  type: 'contextConfig';
  fieldId: string;
  fieldType: string;
  contextId: number;
  configuration?: any;
  schema?: { [key: string]: any };
}

export const isCustomFieldContextConfigExtensionContext = (
  extensionContext: ExtensionContext,
): extensionContext is CustomFieldContextConfigExtensionContext =>
  extensionContext.type === 'contextConfig';

export interface CustomFieldExtensionContext extends ExtensionContext {
  type: 'customField';
  fieldValue: CustomFieldValue;
  fieldId: string;
  fieldType: string;
}

export const isCustomFieldExtensionContext = (
  extensionContext: ExtensionContext,
): extensionContext is CustomFieldExtensionContext =>
  extensionContext.type === 'customField';

export interface ContextMenuExtensionContext extends ExtensionContext {
  type: 'contextMenu';
  selectedText: string;
}

export interface ContentActionExtensionContext extends ExtensionContext {
  type: 'contentAction';
}

export const isContextMenuExtensionContext = (
  extensionContext: ExtensionContext,
): extensionContext is ContextMenuExtensionContext =>
  extensionContext.type === 'contextMenu';

export const isContentActionExtensionContext = (
  extensionContext: ExtensionContext,
): extensionContext is ContentActionExtensionContext =>
  extensionContext.type === 'contentAction';

export interface DashboardGadgetExtensionContext extends ExtensionContext {
  type: 'dashboardGadget';
  gadgetConfiguration: Record<string, any>;
}

export const isDashboardGadgetExtensionContext = (
  extensionContext: ExtensionContext,
): extensionContext is DashboardGadgetExtensionContext =>
  extensionContext.type === 'dashboardGadget';

export enum CompassContextTypes {
  AdminPage = 'compass:adminPage',
  ComponentPage = 'compass:componentPage',
}

export interface CompassComponentPageExtensionContext extends ExtensionContext {
  type: CompassContextTypes.ComponentPage;
  componentId: string;
}

export interface CompassAdminPageExtensionContext extends ExtensionContext {
  type: CompassContextTypes.AdminPage;
  url: string;
}
