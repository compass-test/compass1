import {
  LegacyBackendRuntimePayload,
  LegacyClientEffect,
  LegacyEffect,
} from '../public';

export type ForgeEffectsInvoker = (
  backendRuntimePayload: LegacyBackendRuntimePayload,
) => Promise<LegacyClientEffect[]>;

export interface EffectsDispatcherStats {
  effectsInvokerTotalDurationMs: number;
}

export type EffectsDispatcher = (
  effects: LegacyEffect | LegacyEffect[],
) => Promise<void>;
