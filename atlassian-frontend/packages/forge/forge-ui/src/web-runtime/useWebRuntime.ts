import { useEffect, useState, useRef } from 'react';
import {
  useCallbackOne as useCallback,
  useMemoOne as useMemo,
} from 'use-memo-one';
import ApolloClient from 'apollo-client';
import deepEqual from 'fast-deep-equal';
import {
  CoreData,
  ForgeDoc,
  DispatchEffect,
  Dispatch,
  RenderState,
  ClientEffect,
  LegacyClientEffect,
  ResultEffect,
  LegacyRenderEffect,
  CoreDataInner,
} from '@atlassian/forge-ui-types';
import { parse } from '@atlassian/cs-ari';
import { UI_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';

import { MutationData } from '../web-client/hooks/useInvokeAuxEffects';
import { FORGE_UI_ANALYTICS_CHANNEL } from '../analytics';
import { invokeAuxEffectsMutation } from '../web-client';
import {
  GQLInvokeAuxEffectsResponse,
  GQLEffect,
} from '../web-client/graphql/types';

export type TemporaryContext = { [k: string]: any };

interface WebRuntimeProps {
  apolloClient: ApolloClient<object>;
  contextIds: string[];
  extensionId: string;
  coreData: CoreData;
  temporaryContext?: TemporaryContext;
  entryPoint?: string;
}

function useMemoedTemporaryContext(
  temporaryContext: TemporaryContext,
): Record<string, any> {
  const ref = useRef(temporaryContext);
  if (!deepEqual(ref.current, temporaryContext)) {
    ref.current = temporaryContext;
  }
  return ref.current;
}

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

// DELETE FUNCTION http://go/j/FUI-1091
const downgradeInvokeAuxEffectsInput = (
  contextIds: string[],
  extensionId: string,
  effect: DispatchEffect,
  state: RenderState,
  coreData: CoreDataInner,
  temporaryContext: TemporaryContext,
  entryPoint?: string,
) => {
  let downgradedEffect = {};
  if (effect.type === 'render') {
    downgradedEffect = { type: 'initialize' };
  } else if (effect.type === 'event') {
    downgradedEffect = {
      type: 'event',
      handler: effect.handler,
      args: effect.args,
    };
  }

  const { config, ...remainingTemporaryContext } = temporaryContext;

  const downgradedInput = {
    contextIds,
    extensionId,
    entryPoint,
    payload: {
      state,
      context: {
        ...coreData,
        ...remainingTemporaryContext,
        extensionData: effect.extensionData,
      },
      effects: [downgradedEffect],
      config,
    },
  };
  return downgradedInput;
};

function useIsUnmountedRef() {
  const isUnmountedRef = useRef(false);
  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);
  return isUnmountedRef;
}

interface RuntimeState {
  forgeDoc: ForgeDoc | undefined;
  loading: boolean;
  error: string | undefined;
}

export const useWebRuntime = ({
  apolloClient,
  contextIds,
  extensionId,
  coreData,
  temporaryContext = {},
  entryPoint,
}: WebRuntimeProps) => {
  const [{ forgeDoc, error, loading }, setRuntimeState] = useState<
    RuntimeState
  >({
    forgeDoc: undefined,
    error: undefined,
    loading: false,
  });
  const appState = useRef({});
  const payloadVersion = useRef(1);
  const isUnmountedRef = useIsUnmountedRef();

  const { createAnalyticsEvent } = useAnalyticsEvents();

  useEffect(() => {
    createAnalyticsEvent({
      eventType: UI_EVENT_TYPE,
      data: {
        action: 'viewed',
        actionSubject: 'forgeUIExtension',
        actionSubjectId: 'editorMacro',
      },
    }).fire(FORGE_UI_ANALYTICS_CHANNEL);
  }, [createAnalyticsEvent]);

  /* eslint-disable */
  /* prettier-ignore */
  // Disabled to prevent eslint auto-fixing these hooks.
  // The autofix breaks usages like: useWebRuntime({ coreData: { localId, cloudId } })
  const memoedContextIds = useMemo(() => contextIds, [
    contextIds.sort().join(),
  ]);

  const ari = parse(extensionId);
  const [, , , moduleKey] = ari.resourceId!.split('/');

  const memoedCoreData: CoreDataInner = useMemo(
    () => ({ ...coreData, moduleKey }),
    [coreData.localId, coreData.cloudId, moduleKey],
  );

  const memoedTemporaryContext = useMemoedTemporaryContext(temporaryContext);

  /* eslint-enable */
  const dispatch = useCallback(
    async (effect: DispatchEffect): Promise<void> => {
      performance.mark(`forge-ui.fe.render-start-${memoedCoreData.localId}`);
      switch (effect.type) {
        case 'event': /* eslint-disable-line no-fallthrough */
        case 'render': {
          setRuntimeState(({ forgeDoc, error }) => ({
            forgeDoc,
            error,
            loading: true,
          }));
          return apolloClient
            .mutate<MutationData>({
              mutation: invokeAuxEffectsMutation,
              variables: {
                input:
                  payloadVersion.current === 1
                    ? downgradeInvokeAuxEffectsInput(
                        memoedContextIds,
                        extensionId,
                        effect,
                        appState.current,
                        memoedCoreData,
                        memoedTemporaryContext,
                        entryPoint,
                      )
                    : {
                        contextIds: memoedContextIds,
                        extensionId,
                        entryPoint,
                        payload: {
                          state: {},
                          context: {},
                          effects: [
                            {
                              ...effect,
                              coreData: memoedCoreData,
                              state: appState.current,
                            },
                          ],
                        },
                      },
              },
            })
            .then((mutationResult) => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              const response = mutationResult.data!.invokeAuxEffects || {};
              const { result, errors } = response;

              setRuntimeState(({ forgeDoc }) => ({
                forgeDoc: (() => {
                  if (!result || !result.effects[0]) {
                    return forgeDoc;
                  }
                  const resultEffect = result.effects[0];
                  appState.current = resultEffect.state;
                  if (resultEffect.type === 'result') {
                    payloadVersion.current = 2;
                    return resultEffect.forgeDoc;
                  }
                  return resultEffect.aux;
                })(),
                error: (() => {
                  if (!result) {
                    return 'Unexpected error occurred. Try refreshing your browser.';
                  } else if (
                    !isGQLInvokeAuxEffectsResponseSucceeded(response)
                  ) {
                    const error = errors?.[0];
                    const statusCode = error?.extensions.statusCode;
                    const message = error?.message as string;

                    if (statusCode === 400 || statusCode === 500) {
                      if (!result.effects) {
                        return message;
                      } else if (!isArrayOfClientEffects(result.effects)) {
                        return 'received a non-client effect';
                      }
                      return undefined;
                    }
                    return message;
                  } else if (!isArrayOfClientEffects(result.effects)) {
                    return 'received a non-client effect';
                  }
                  return undefined;
                })(),
                loading: false,
              }));

              if (!isUnmountedRef.current) {
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    performance.mark(
                      `forge-ui.fe.render-end-${memoedCoreData.localId}`,
                    );
                    performance.measure(
                      'forge-ui.fe.render',
                      `forge-ui.fe.render-start-${memoedCoreData.localId}`,
                      `forge-ui.fe.render-end-${memoedCoreData.localId}`,
                    );
                  });
                });
              }
            })
            .catch((error: Error) => {
              setRuntimeState(({ forgeDoc }) => ({
                forgeDoc,
                error: error.message,
                loading: false,
              }));
            });
        }
        default: {
          setRuntimeState(({ forgeDoc, loading }) => ({
            forgeDoc,
            error: `Internal Error: Don't know how to handle effect ${effect}.`,
            loading,
          }));
        }
      }
    },
    [
      apolloClient,
      memoedContextIds,
      extensionId,
      appState,
      memoedCoreData,
      memoedTemporaryContext,
      isUnmountedRef,
      entryPoint,
    ],
  );

  return [dispatch, { forgeDoc, loading, error }] as [
    Dispatch,
    {
      forgeDoc: ForgeDoc | undefined;
      loading: boolean;
      error: string | undefined;
    },
  ];
};
