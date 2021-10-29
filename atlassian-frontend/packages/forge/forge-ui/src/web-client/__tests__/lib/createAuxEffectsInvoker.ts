import {
  LegacyBackendRuntimePayload,
  ExtensionInstanceIds,
} from '@atlassian/forge-ui-types';
import { GQLEffect, GQLInvokeAuxEffectsResponse } from '../../graphql/types';
import {
  createAuxEffectsInvoker,
  isClientEffect,
} from '../../hooks/lib/createAuxEffectsInvoker';
import * as createInvokeAuxEffectsInputModule from '../../hooks/lib/createInvokeAuxEffectsInput';
import { MutationTuple } from '@apollo/react-hooks';
import {
  MutationVariables,
  MutationData,
} from '../../hooks/useInvokeAuxEffects';

function stubMutation(
  response: GQLInvokeAuxEffectsResponse,
): MutationTuple<MutationData, MutationVariables>[0] {
  return jest.fn().mockResolvedValue({
    data: {
      invokeAuxEffects: response,
    },
  });
}

describe('createAuxEffectsInvoker', () => {
  // @ts-ignore return an empty array onError for testing purposes
  const onErrorSpy = jest.fn<never, []>(() => []);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const extensionInstanceIds: ExtensionInstanceIds = {
    contextIds: ['ari:cloud:xen::test/1'],
    extensionId: 'definition-uuid-1',
    localId: 'local-uuid-1',
  };

  const backendRuntimePayload: LegacyBackendRuntimePayload = {
    context: {},
    effects: [],
    state: {},
  };

  it('uses createLegacyInvokeAuxEffectsInput', async () => {
    const mutation = stubMutation({
      result: {
        effects: [
          {
            type: 'render',
            aux: { some: 'aux' },
            state: {
              _data: 'state1',
            },
          },
        ],
      },
      errors: null,
      success: true,
    });

    const createLegacyInvokeAuxEffectsInputSpy = jest.spyOn(
      createInvokeAuxEffectsInputModule,
      'createLegacyInvokeAuxEffectsInput',
    );

    const invokeAuxEffects = createAuxEffectsInvoker(
      extensionInstanceIds,
      mutation,
      onErrorSpy,
    );
    await invokeAuxEffects(backendRuntimePayload);

    expect(createLegacyInvokeAuxEffectsInputSpy).toHaveBeenCalledWith(
      extensionInstanceIds,
      backendRuntimePayload,
      undefined,
    );

    // After receiving a `render` effect, we invoke old-style effects.
    await invokeAuxEffects(backendRuntimePayload);
    expect(createLegacyInvokeAuxEffectsInputSpy).toHaveBeenCalledWith(
      extensionInstanceIds,
      backendRuntimePayload,
      undefined,
    );
    expect(createLegacyInvokeAuxEffectsInputSpy).toHaveBeenCalledTimes(2);
  });

  it('uses createInvokeAuxEffectsInput for subsequent calls when receiving a result effect', async () => {
    const mutations = stubMutation({
      result: {
        effects: [
          {
            type: 'result',
            forgeDoc: { some: 'aux' },
            state: {
              _data: 'state1',
            },
          },
        ],
      },
      errors: null,
      success: true,
    });

    const createLegacyInvokeAuxEffectsInputSpy = jest.spyOn(
      createInvokeAuxEffectsInputModule,
      'createLegacyInvokeAuxEffectsInput',
    );
    const createInvokeAuxEffectsInputSpy = jest.spyOn(
      createInvokeAuxEffectsInputModule,
      'createInvokeAuxEffectsInput',
    );

    const invokeAuxEffects = createAuxEffectsInvoker(
      extensionInstanceIds,
      mutations,
      onErrorSpy,
    );

    const stubPayload = { context: {}, effects: [], state: {} };

    await invokeAuxEffects(stubPayload);

    expect(createLegacyInvokeAuxEffectsInputSpy).toHaveBeenCalledWith(
      extensionInstanceIds,
      stubPayload,
      undefined,
    );

    // After receiving a `result` effect, we invoke new-style effects.
    await invokeAuxEffects(stubPayload);

    expect(createInvokeAuxEffectsInputSpy).toHaveBeenCalledWith(
      extensionInstanceIds,
      stubPayload,
      undefined,
    );
  });

  it('calls onError with the gateway error if success is false', async () => {
    const errorMessage = 'Gateway could not invoke the mutation';
    const mutation = stubMutation({
      errors: [
        {
          message: errorMessage,
          extensions: {
            statusCode: 500,
            errorType: 'INTERNAL_ERROR',
          },
        },
      ],
      success: false,
    });
    const invokeAuxEffects = createAuxEffectsInvoker(
      extensionInstanceIds,
      mutation,
      onErrorSpy,
    );

    await invokeAuxEffects(backendRuntimePayload);
    expect(onErrorSpy).toHaveBeenCalledWith(errorMessage);
  });

  it('throws an error if any returned effect is not a client effect', async () => {
    const nonClientEffect: GQLEffect = { type: 'unknown' };
    const legacyClientEffect: GQLEffect = {
      type: 'render',
      aux: {},
      state: {},
    };
    const clientEffect: GQLEffect = { type: 'result', forgeDoc: {}, state: {} };
    expect(isClientEffect(nonClientEffect)).toBeFalsy();
    expect(isClientEffect(legacyClientEffect)).toBeTruthy();
    expect(isClientEffect(clientEffect)).toBeTruthy();

    const mutation = stubMutation({
      success: true,
      errors: null,
      result: {
        effects: [nonClientEffect, clientEffect, legacyClientEffect],
      },
    });
    const invokeAuxEffects = createAuxEffectsInvoker(
      extensionInstanceIds,
      mutation,
      onErrorSpy,
    );

    await invokeAuxEffects(backendRuntimePayload);
    expect(onErrorSpy).toHaveBeenCalledWith('received a non-client effect');
  });

  it('returns a client effect with a 3LO prompt if success is false and statusCode is 400', async () => {
    const threeLOForgeDoc = {
      type: 'View',
      children: [
        {
          type: 'ThreeLOPrompt',
        },
      ],
    };
    const threeLOClientEffect: GQLEffect = {
      type: 'render',
      aux: threeLOForgeDoc,
      state: {},
    };

    const mutation = stubMutation({
      errors: [
        {
          message: '',
          extensions: {
            statusCode: 400,
            errorType: 'DUMMY',
          },
        },
      ],
      success: false,
      result: {
        effects: [threeLOClientEffect],
      },
    });
    const invokeAuxEffects = createAuxEffectsInvoker(
      extensionInstanceIds,
      mutation,
      onErrorSpy,
    );

    const result = await invokeAuxEffects(backendRuntimePayload);
    expect(result[0].aux).toEqual(threeLOForgeDoc);
  });

  it('returns a client effect with an error panel if success is false and statusCode is 500', async () => {
    const errorPanelForgeDoc = {
      type: 'View',
      children: [
        {
          type: 'ErrorPanel',
        },
      ],
    };
    const errorPanelClientEffect: GQLEffect = {
      type: 'render',
      aux: errorPanelForgeDoc,
      state: {},
    };

    const mutation = stubMutation({
      errors: [
        {
          message: '',
          extensions: {
            statusCode: 500,
            errorType: 'DUMMY',
          },
        },
      ],
      success: false,
      result: {
        effects: [errorPanelClientEffect],
      },
    });
    const invokeAuxEffects = createAuxEffectsInvoker(
      extensionInstanceIds,
      mutation,
      onErrorSpy,
    );

    const result = await invokeAuxEffects(backendRuntimePayload);
    expect(result[0].aux).toEqual(errorPanelForgeDoc);
  });
});
