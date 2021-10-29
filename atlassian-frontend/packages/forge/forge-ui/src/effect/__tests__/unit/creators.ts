import { renderEffect, eventEffect } from '../../creators';

const encryptedRenderState = {
  _data: 'blahblahblah',
};

const coreData = {
  cloudId: 'cloud-id',
  localId: 'local-id',
};

test('renderEffect', () => {
  expect(
    renderEffect(encryptedRenderState, coreData, {
      what: 'ever',
      you: 'want',
    }),
  ).toEqual({
    type: 'render',
    coreData,
    extensionData: {
      what: 'ever',
      you: 'want',
    },
    state: encryptedRenderState,
  });
});
test('eventEffect', () => {
  expect(
    eventEffect(
      encryptedRenderState,
      coreData,
      {
        what: 'ever',
        you: 'want',
      },
      { componentKey: 'Button.0', prop: 'onClick' },
      ['what', 'ever'],
    ),
  ).toEqual({
    type: 'event',
    args: ['what', 'ever'],
    coreData,
    extensionData: {
      what: 'ever',
      you: 'want',
    },
    handler: {
      componentKey: 'Button.0',
      prop: 'onClick',
    },
    state: encryptedRenderState,
  });
});
