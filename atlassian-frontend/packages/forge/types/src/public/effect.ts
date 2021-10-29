import { RenderState, Handler, ForgeDoc } from './forge';

export interface BackendRuntimePayload {
  // v: 2; @TODO revisit whether we need this version. Will likely need GQL gateway upgrade.
  effects: BackendEffect[];
}

export type ExtensionData = { [k: string]: any };

export interface CoreData {
  cloudId: string;
  // localId uniquely identifies the instance of the extension
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
  state: RenderState; // this gets encrypted and is a string on the client
}

export type BackendEffect = RenderEffect | ActionEffect | EventEffect;
export type ClientEffect = ResultEffect;
export type Effect = BackendEffect | ClientEffect;

export const isEventEffect = (effect: Effect): effect is EventEffect => {
  return effect.type === 'event';
};

export const isActionEffect = (effect: Effect): effect is ActionEffect => {
  return effect.type === 'action';
};

export const isRenderEffect = (effect: Effect): effect is RenderEffect => {
  return effect.type === 'render';
};

export const isResultEffect = (effect: Effect): effect is ResultEffect => {
  return effect.type === 'result';
};

export function isBackendEffect(effect: Effect): effect is BackendEffect {
  return (
    isActionEffect(effect) || isEventEffect(effect) || isRenderEffect(effect)
  );
}
