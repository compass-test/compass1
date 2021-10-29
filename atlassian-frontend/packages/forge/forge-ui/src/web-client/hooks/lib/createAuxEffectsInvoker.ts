import {
  ForgeEffectsInvoker,
  LegacyClientEffect,
  ExtensionInstanceIds,
  LegacyRenderEffect,
  ResultEffect,
  ClientEffect,
} from '@atlassian/forge-ui-types';
import {
  GQLEffect,
  GQLInvokeAuxEffectsResponse,
  GQLAuxEffectsResult,
} from '../../graphql/types';
import {
  createInvokeAuxEffectsInput,
  createLegacyInvokeAuxEffectsInput,
} from './createInvokeAuxEffectsInput';
import { MutationData, MutationVariables } from '../useInvokeAuxEffects';
import { MutationTuple } from '@apollo/react-hooks';

function isRenderEffect(effect: GQLEffect): effect is LegacyRenderEffect {
  return effect.type === 'render' && !!effect.aux && !!effect.state;
}

function isResultEffect(effect: GQLEffect): effect is ResultEffect {
  return effect.type === 'result' && !!effect.forgeDoc && !!effect.state;
}

export function isClientEffect(
  effect: GQLEffect,
): effect is LegacyClientEffect | ClientEffect {
  return isRenderEffect(effect) || isResultEffect(effect);
}

export function isArrayOfClientEffects(
  effects: GQLEffect[],
): effects is (LegacyClientEffect | ClientEffect)[] {
  return effects.every(isClientEffect);
}

interface GQLInvokeAuxEffectsResponseSucceeded
  extends GQLInvokeAuxEffectsResponse {
  result: NonNullable<GQLInvokeAuxEffectsResponse['result']>;
  success: true;
}

function isGQLInvokeAuxEffectsResponseSucceeded(
  response: GQLInvokeAuxEffectsResponse,
): response is GQLInvokeAuxEffectsResponseSucceeded {
  return response.success;
}

export function handleInvokeAuxEffectsResponse(
  mutationResult: { data?: MutationData },
  onAPIError: (message: string) => never,
) {
  /**
   * If we pass onError to useMutation, with the default error policy
   * the promise will always resolve but could be undefined
   * See https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
   */
  if (!mutationResult) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const response = mutationResult.data!.invokeAuxEffects || {};
  const { result = {} as GQLAuxEffectsResult } = response;

  if (!isGQLInvokeAuxEffectsResponseSucceeded(response)) {
    const error = response.errors?.[0];
    const statusCode = error?.extensions?.statusCode;
    // 3LO prompt or user code error
    if (statusCode === 400 || statusCode === 500) {
      if (!result.effects) {
        return onAPIError(error?.message as string);
      }
    } else {
      return onAPIError(error?.message as string);
    }
  }

  if (!isArrayOfClientEffects(result.effects)) {
    return onAPIError('received a non-client effect');
  }
  return result.effects;
}

export function createAuxEffectsInvoker(
  extensionInstanceIds: ExtensionInstanceIds,
  mutationFn: MutationTuple<MutationData, MutationVariables>[0],
  onAPIError: (message: string) => never,
  extensionData?: Record<string, any>,
): ForgeEffectsInvoker {
  let payloadVersion = 1;

  // We only need the mutFn, not the data as we get that later
  return async (backendRuntimePayload) => {
    const mutationResult = await mutationFn({
      variables: {
        input:
          payloadVersion === 1
            ? createLegacyInvokeAuxEffectsInput(
                extensionInstanceIds,
                backendRuntimePayload,
                extensionData,
              )
            : createInvokeAuxEffectsInput(
                extensionInstanceIds,
                backendRuntimePayload,
                extensionData,
              ),
      },
    });
    const effects = handleInvokeAuxEffectsResponse(mutationResult, onAPIError);

    return effects.map((e) => {
      // if we receive 'result' effect this means the app is using a version of @forge/ui with the updated effect shape
      // the ideal way to do this would be to version the payload and response
      if (e.type === 'result') {
        payloadVersion = 2;
        return { type: 'render', aux: e.forgeDoc, state: e.state };
      }
      return e;
    });
  };
}
