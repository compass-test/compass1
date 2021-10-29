import {
  RenderEffect,
  EventEffect,
  Handler,
  CoreData,
  ExtensionData,
  RenderState,
} from '@atlassian/forge-ui-types';

export const renderEffect = (
  state: RenderState, // state is an encrypted string on the client-side
  coreData: CoreData,
  extensionData: ExtensionData,
): RenderEffect => ({
  type: 'render',
  state,
  coreData,
  extensionData,
});

export const eventEffect = (
  state: RenderState, // state is an encrypted string on the client-side
  coreData: CoreData,
  extensionData: ExtensionData,
  handler: Handler,
  args: any[],
): EventEffect => ({
  type: 'event',
  state,
  coreData,
  extensionData,
  handler,
  args,
});
