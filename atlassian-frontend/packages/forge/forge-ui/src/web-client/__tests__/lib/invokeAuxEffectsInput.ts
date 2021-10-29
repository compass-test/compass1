import {
  ExtensionInstanceIds,
  LegacyBackendRuntimePayload,
} from '@atlassian/forge-ui-types';
import {
  createInvokeAuxEffectsInput,
  createLegacyInvokeAuxEffectsInput,
} from '../../hooks/lib/createInvokeAuxEffectsInput';

const localId = 'local-uuid-1';
const extensionInstanceIds: ExtensionInstanceIds = {
  contextIds: ['ari:cloud:xen::test/1'],
  extensionId: 'definition-uuid-1',
  localId,
};

describe('createLegacyInvokeAuxEffectsInput', () => {
  it('passes the localId in graphql payload context', () => {
    const graphqlPayload = {
      context: {},
      effects: [],
      state: {},
    };
    const { payload } = createLegacyInvokeAuxEffectsInput(
      extensionInstanceIds,
      graphqlPayload,
    );
    expect(payload.context).toMatchObject({ localId });
  });

  it('overrides any localId passed in the graphql payload context', () => {
    const graphqlPayload = {
      context: {
        localId: `not-${localId}`,
      },
      effects: [],
      state: {},
    };
    const { payload } = createLegacyInvokeAuxEffectsInput(
      extensionInstanceIds,
      graphqlPayload,
    );
    expect(payload.context).toMatchObject({ localId });
  });
});

describe('createInvokeAuxEffectsInput', () => {
  it('moves the state, and context/cloudId|localId into the effect', () => {
    const graphqlPayload: LegacyBackendRuntimePayload = {
      context: {
        cloudId: 'cloud-id',
        localId: 'local-id',
      },
      effects: [
        {
          type: 'event',
          handler: {
            componentKey: 'Button.0',
            prop: 'onClick',
          },
          args: ['some', 'stuff'],
        },
      ],
      state: {
        _data: 'the state',
      },
    };
    const input = createInvokeAuxEffectsInput(
      extensionInstanceIds,
      graphqlPayload,
    );

    expect(input).toEqual({
      contextIds: extensionInstanceIds.contextIds,
      extensionId: extensionInstanceIds.extensionId,
      payload: {
        context: {},
        effects: [
          {
            args: ['some', 'stuff'],
            coreData: {
              cloudId: 'cloud-id',
              localId: 'local-id',
            },
            extensionData: {},
            handler: {
              componentKey: 'Button.0',
              prop: 'onClick',
            },
            state: {
              _data: 'the state',
            },
            type: 'event',
          },
        ],
        state: {},
      },
    });
  });
});
