import { ForgeElement, ForgeNode } from './types';
declare function createElement<P>(type: string | ((props: P) => ForgeElement), props: P, ...children: ForgeNode[]): ForgeElement<P>;
export { render } from './backend-runtime';
export { useAction } from './hooks/useAction';
export { useState } from './hooks/useState';
export { useProductContext } from './hooks/useProductContext';
export { useConfig } from './hooks/useConfig';
export { useEffect } from './hooks/useEffect';
export { isJiraContext, isIssuePanelExtensionContext, JiraContext, IssuePanelExtensionContext, isContextMenuExtensionContext, isContentActionExtensionContext, isCustomFieldExtensionContext, CustomFieldExtensionContext, ContentActionExtensionContext, ContextMenuExtensionContext } from './types';
export * from './components';
declare const _default: {
    createElement: typeof createElement;
};
export default _default;
//# sourceMappingURL=index.d.ts.map