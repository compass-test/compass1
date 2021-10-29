import {
  ExtensionInstanceIds,
  LegacyBackendRuntimePayload,
} from '@atlassian/forge-ui-types';
import { renderEffect, eventEffect } from '../../../effect/creators';
import { GQLInvokeAuxEffectsInput } from '../../graphql/types';

// DELETE FUNCTION http://go/j/FUI-1091
export function createLegacyInvokeAuxEffectsInput(
  extensionInstanceIds: ExtensionInstanceIds,
  graphqlPayload: LegacyBackendRuntimePayload,
  extensionData?: Record<string, any>,
): GQLInvokeAuxEffectsInput {
  const { contextIds, extensionId, localId, functionId } = extensionInstanceIds;
  const { context, ...payload } = graphqlPayload;
  return {
    contextIds,
    extensionId,
    ...(functionId ? { entryPoint: functionId } : {}),
    payload: {
      ...payload,
      context: {
        ...context,
        extensionData,
        localId,
      },
    },
  };
}

export function createInvokeAuxEffectsInput(
  extensionInstanceIds: ExtensionInstanceIds,
  graphqlPayload: LegacyBackendRuntimePayload,
  extensionData?: Record<string, any>,
): GQLInvokeAuxEffectsInput {
  const { contextIds, extensionId } = extensionInstanceIds;
  const { context, ...payload } = graphqlPayload;
  return {
    contextIds,
    extensionId,
    payload: {
      effects: payload.effects.map((effect) => {
        switch (effect.type) {
          case 'event': {
            const { cloudId, localId, ...rest } = context;
            return eventEffect(
              payload.state,
              {
                cloudId,
                localId,
              },
              extensionData || rest,
              effect.handler,
              effect.args,
            );
          }
          case 'initialize': {
            const { cloudId, localId, ...rest } = context;
            return renderEffect(
              payload.state,
              {
                cloudId,
                localId,
              },
              extensionData || rest,
            );
          }
          default: {
            return effect;
          }
        }
      }),
      state: {},
      context: {},
    },
  };
}
