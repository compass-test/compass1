import React, { Suspense } from 'react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { render, fireEvent } from '@testing-library/react';
import { ModalDialog } from '..';
import { Select } from '../../select';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const themeColors = [
  { value: 'B500', label: 'Chore coat' },
  { value: 'P500', label: 'Prince' },
  { value: 'N80', label: 'Spooky ghost' },
];

it('renders with a form', async () => {
  const dispatch = jest.fn();
  const { findByText } = render(
    <Suspense fallback={'loading'}>
      <ModalDialog
        forgeDoc={{
          type: 'ModalDialog',
          props: {
            header: 'My header',
            onClose: { componentKey: 'modalKey', prop: 'onClose' },
          },
          children: [
            {
              type: 'Form',
              props: {
                submitButtonText: 'Submit',
                onSubmit: { componentKey: 'formKey', prop: 'onSubmit' },
              },
              children: [
                {
                  type: 'Select',
                  key: 'Select.0',
                  props: {
                    name: 'color',
                    label: 'Pick a color',
                    options: themeColors,
                    defaultValue: { value: 'N80', label: 'Spooky ghost' },
                  },
                  children: [],
                },
              ],
            },
          ],
        }}
        dispatch={dispatch}
        render={(forgeDoc) => {
          if (forgeDoc.type === 'Select') {
            // @ts-ignore
            return <Select {...forgeDoc.props} key={forgeDoc.key} />;
          }
        }}
      />
    </Suspense>,
  );
  await findByText('My header');

  const button = await findByText('Submit');
  fireEvent.click(button);

  expect(dispatch).toHaveBeenCalledWith({
    type: 'event',
    args: [{ color: 'N80' }],
    handler: { componentKey: 'formKey', prop: 'onSubmit' },
    extensionData: {},
  });
});

it('renders without a form', async () => {
  const dispatch = jest.fn();
  const { findByText, getByText, queryByTestId } = render(
    <Suspense fallback={'loading'}>
      <ModalDialog
        forgeDoc={{
          type: 'ModalDialog',
          props: {
            header: 'My standard modal',
            onClose: { componentKey: 'modalKey', prop: 'onClose' },
            closeButtonText: 'Reverse open',
          },
          children: [
            {
              type: 'Image',
              key: 'Image.0',
              props: { src: 'hello-world' },
              children: [],
            },
          ],
        }}
        dispatch={dispatch}
        render={(forgeDoc) => {
          if (forgeDoc.type === 'Image') {
            return <img {...forgeDoc.props} key={forgeDoc.key} />;
          }
        }}
      />
    </Suspense>,
  );
  await findByText('My standard modal');

  fireEvent.click(getByText('Reverse open'));

  expect(queryByTestId('form')).toBeFalsy();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'event',
    args: [],
    handler: { componentKey: 'modalKey', prop: 'onClose' },
    extensionData: {},
  });
});
