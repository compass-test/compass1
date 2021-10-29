import { RenderState, Handler, ForgeDoc, ExtensionConfiguration } from './forge';
export interface LegacyBackendRuntimePayload {
    context: Record<string, any>;
    effects: LegacyBackendEffect[];
    state: RenderState;
    config?: ExtensionConfiguration;
}
interface LegacyBaseEffect {
    type: string;
}
export interface LegacyInitializeEffect extends LegacyBaseEffect {
    type: 'initialize';
}
export interface LegacyEventEffect extends LegacyBaseEffect {
    type: 'event';
    handler: Handler;
    args: any[];
}
export interface LegacyActionEffect extends LegacyBaseEffect {
    type: 'action';
    hookIndex: number;
    componentKey: string;
    payload?: any;
}
export interface LegacyRenderEffect extends LegacyBaseEffect {
    type: 'render';
    aux: ForgeDoc;
    state: RenderState;
}
export declare type LegacyBackendEffect = LegacyInitializeEffect | LegacyActionEffect | LegacyEventEffect;
export declare type LegacyClientEffect = LegacyRenderEffect;
export declare type LegacyEffect = LegacyBackendEffect | LegacyClientEffect;
export declare const isLegacyInitializeEffect: (effect: LegacyEffect) => effect is LegacyInitializeEffect;
export declare const isLegacyActionEffect: (effect: LegacyEffect) => effect is LegacyActionEffect;
export declare const isLegacyEventEffect: (effect: LegacyEffect) => effect is LegacyEventEffect;
export declare const isLegacyRenderEffect: (effect: LegacyEffect) => effect is LegacyRenderEffect;
export declare function isLegacyBackendEffect(effect: LegacyEffect): effect is LegacyBackendEffect;
export {};
//# sourceMappingURL=legacy-effect.d.ts.map