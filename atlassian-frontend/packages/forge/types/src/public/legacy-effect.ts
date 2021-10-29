// DELETE FILE http://go/j/FUI-1091
import {
  RenderState,
  Handler,
  ForgeDoc,
  ExtensionConfiguration,
} from './forge';

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

export type LegacyBackendEffect =
  | LegacyInitializeEffect
  | LegacyActionEffect
  | LegacyEventEffect;

export type LegacyClientEffect = LegacyRenderEffect;
export type LegacyEffect = LegacyBackendEffect | LegacyClientEffect;

export const isLegacyInitializeEffect = (
  effect: LegacyEffect,
): effect is LegacyInitializeEffect => {
  return effect.type === 'initialize';
};

export const isLegacyActionEffect = (
  effect: LegacyEffect,
): effect is LegacyActionEffect => {
  return effect.type === 'action';
};

export const isLegacyEventEffect = (
  effect: LegacyEffect,
): effect is LegacyEventEffect => {
  return effect.type === 'event';
};

export const isLegacyRenderEffect = (
  effect: LegacyEffect,
): effect is LegacyRenderEffect => {
  return effect.type === 'render';
};

export function isLegacyBackendEffect(
  effect: LegacyEffect,
): effect is LegacyBackendEffect {
  return (
    isLegacyInitializeEffect(effect) ||
    isLegacyActionEffect(effect) ||
    isLegacyEventEffect(effect)
  );
}
