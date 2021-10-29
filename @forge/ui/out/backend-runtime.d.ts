import { ForgeElement, LegacyBackendRuntimePayload, BackendRuntimeContext, LegacyClientEffect, LegacyBackendEffect } from './types';
export interface ChangeEffect {
    type: 'changeEffect';
    onChange: () => void | Promise<void>;
}
export declare type Effect = LegacyBackendEffect | ChangeEffect;
export declare const render: (elem: ForgeElement) => (payload: LegacyBackendRuntimePayload, runtimeContext?: BackendRuntimeContext | undefined) => Promise<LegacyClientEffect[]>;
//# sourceMappingURL=backend-runtime.d.ts.map