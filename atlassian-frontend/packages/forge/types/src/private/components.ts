import { EffectsDispatcher } from './effect';
import { Handler, ExtensionData } from '../public';

type AllFunctionPropertyNames<T> = {
  [K in keyof T]: Required<T>[K] extends Function ? K : never;
}[keyof T];

export type Rendered<ComponentProps extends object> = {
  [K in keyof ComponentProps]: K extends AllFunctionPropertyNames<
    ComponentProps
  >
    ? Handler
    : K extends 'children'
    ? React.ReactNode
    : ComponentProps[K];
};

export type DispatchEffect =
  | {
      type: 'event';
      handler: Handler;
      args: any[];
      extensionData: ExtensionData;
    }
  | { type: 'render'; extensionData: ExtensionData };

export type Dispatch = (effect: DispatchEffect) => Promise<void>;

export type WithDispatch<ComponentProps extends object> = Omit<
  ComponentProps,
  'dispatch'
> & { dispatch: EffectsDispatcher };

export interface AKOption {
  label: string;
  value: any;
}

export interface CheckboxOption extends AKOption {
  key?: string;
  defaultChecked?: boolean;
  isRequired?: boolean;
}

export interface RadioOption extends AKOption {
  name: string;
  value: string;
}

export const MarkupRecursiveList = [
  'Em',
  'Link',
  'Strike',
  'String',
  'Strong',
  'User',
] as const;

export const MarkupList = [
  ...MarkupRecursiveList,
  'Badge',
  'Code',
  'DateLozenge',
  'StatusLozenge',
  'Tag',
  'UserGroup',
] as const;
