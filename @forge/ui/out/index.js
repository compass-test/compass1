"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function createElement(type, props, ...children) {
    const element = {
        key: null,
        props: {
            ...props,
            children: children.reduce((flattened, child) => {
                if (child || typeof child === 'number') {
                    return flattened.concat(child);
                }
                return flattened;
            }, [])
        }
    };
    if (typeof type === 'string') {
        return {
            type,
            ...element
        };
    }
    return {
        type,
        ...element
    };
}
var backend_runtime_1 = require("./backend-runtime");
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return backend_runtime_1.render; } });
var useAction_1 = require("./hooks/useAction");
Object.defineProperty(exports, "useAction", { enumerable: true, get: function () { return useAction_1.useAction; } });
var useState_1 = require("./hooks/useState");
Object.defineProperty(exports, "useState", { enumerable: true, get: function () { return useState_1.useState; } });
var useProductContext_1 = require("./hooks/useProductContext");
Object.defineProperty(exports, "useProductContext", { enumerable: true, get: function () { return useProductContext_1.useProductContext; } });
var useConfig_1 = require("./hooks/useConfig");
Object.defineProperty(exports, "useConfig", { enumerable: true, get: function () { return useConfig_1.useConfig; } });
var useEffect_1 = require("./hooks/useEffect");
Object.defineProperty(exports, "useEffect", { enumerable: true, get: function () { return useEffect_1.useEffect; } });
var types_1 = require("./types");
Object.defineProperty(exports, "isJiraContext", { enumerable: true, get: function () { return types_1.isJiraContext; } });
Object.defineProperty(exports, "isIssuePanelExtensionContext", { enumerable: true, get: function () { return types_1.isIssuePanelExtensionContext; } });
Object.defineProperty(exports, "isContextMenuExtensionContext", { enumerable: true, get: function () { return types_1.isContextMenuExtensionContext; } });
Object.defineProperty(exports, "isContentActionExtensionContext", { enumerable: true, get: function () { return types_1.isContentActionExtensionContext; } });
Object.defineProperty(exports, "isCustomFieldExtensionContext", { enumerable: true, get: function () { return types_1.isCustomFieldExtensionContext; } });
tslib_1.__exportStar(require("./components"), exports);
exports.default = { createElement };
