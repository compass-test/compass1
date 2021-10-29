import { RenderState, Handler, ForgeDoc } from './forge';
export interface BackendRuntimePayload {
    effects: BackendEffect[];
}
export declare type ExtensionData = {
    [k: string]: any;
};
export interface CoreData {
    cloudId: string;
    localId: string;
}
export interface CoreDataInner extends CoreData {
    moduleKey: string;
}
export interface EventEffect {
    type: 'event';
    state: RenderState;
    coreData: CoreData;
    extensionData: ExtensionData;
    handler: Handler;
    args: any[];
}
export interface ActionEffect {
    type: 'action';
    state: RenderState;
    coreData: CoreData;
    extensionData: ExtensionData;
    hookIndex: number;
    componentKey: string;
    payload?: any;
}
export interface RenderEffect {
    type: 'render';
    state: RenderState;
    coreData: CoreData;
    extensionData: ExtensionData;
}
export interface ResultEffect {
    type: 'result';
    forgeDoc: ForgeDoc;
    state: RenderState;
}
export declare type BackendEffect = RenderEffect | ActionEffect | EventEffect;
export declare type ClientEffect = ResultEffect;
export declare type Effect = BackendEffect | ClientEffect;
export declare const isEventEffect: (effect: Effect) => effect is EventEffect;
export declare const isActionEffect: (effect: Effect) => effect is ActionEffect;
export declare const isRenderEffect: (effect: Effect) => effect is RenderEffect;
export declare const isResultEffect: (effect: Effect) => effect is ResultEffect;
export declare function isBackendEffect(effect: Effect): effect is BackendEffect;
//# sourceMappingURL=effect.d.ts.map