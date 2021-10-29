"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDashboardGadgetExtensionContext = exports.isContentActionExtensionContext = exports.isContextMenuExtensionContext = exports.isCustomFieldExtensionContext = exports.isCustomFieldContextConfigExtensionContext = exports.isIssuePanelExtensionContext = exports.isJiraContext = exports.isForgeElement = void 0;
exports.isForgeElement = (auxNode) => {
    return (auxNode !== null && typeof auxNode !== 'boolean' && auxNode !== undefined);
};
exports.isJiraContext = (context) => context.type === 'jira';
exports.isIssuePanelExtensionContext = (extensionContext) => extensionContext.type === 'issuePanel';
exports.isCustomFieldContextConfigExtensionContext = (extensionContext) => extensionContext.type === 'contextConfig';
exports.isCustomFieldExtensionContext = (extensionContext) => extensionContext.type === 'customField';
exports.isContextMenuExtensionContext = (extensionContext) => extensionContext.type === 'contextMenu';
exports.isContentActionExtensionContext = (extensionContext) => extensionContext.type === 'contentAction';
exports.isDashboardGadgetExtensionContext = (extensionContext) => extensionContext.type === 'dashboardGadget';
