import React, { Suspense } from 'react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { render, fireEvent } from '@testing-library/react';
import { InlineDialog } from '..';
import { Form } from '../../form';
import { Select } from '../../select';

const themeColors = [
  { value: 'B500', label: 'Chore coat' },
  { value: 'P500', label: 'Prince' },
  { value: 'N80', label: 'Spooky ghost' },
];

temporarilySilenceActAndAtlaskitDeprecationWarnings();
it('renders with a form', async () => {
  const dispatch = jest.fn();
  const { getByTestId, findByText } = render(
    <Suspense fallback={'loading'}>
      <InlineDialog
        forgeDoc={{
          type: 'InlineDialog',
          key: 'InlineDialog.0',
          children: [
            {
              type: 'Form',
              key: 'Form.0',
              props: {
                submitButtonText: 'submit',
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
        render={function render(forgeDoc) {
          if (forgeDoc.type === 'Form') {
            return (
              <Form
                key={forgeDoc.key}
                forgeDoc={forgeDoc}
                dispatch={dispatch}
                render={render}
              />
            );
          } else if (forgeDoc.type === 'Select') {
            // @ts-ignore
            return <Select key={forgeDoc.key} {...forgeDoc.props} />;
          }
        }}
      />
    </Suspense>,
  );

  await findByText('submit');

  const form: HTMLElement = getByTestId('form')!;
  fireEvent.submit(form);

  expect(dispatch).toHaveBeenCalledWith({
    type: 'event',
    args: [{ color: 'N80' }],
    handler: { componentKey: 'formKey', prop: 'onSubmit' },
    extensionData: {},
  });
});

it('renders without a form', async () => {
  const dispatch = jest.fn();
  const { findByText, queryByText } = render(
    <Suspense fallback={'loading'}>
      <InlineDialog
        forgeDoc={{
          type: 'InlineDialog',
          key: 'InlineDialog.0',
          children: [
            {
              type: 'Text',
              key: 'Text.0',
              props: {
                content: 'hi there',
              },
              children: [],
            },
          ],
        }}
        dispatch={dispatch}
        render={function render(forgeDoc) {
          if (forgeDoc.type === 'Text') {
            return (
              <p key={forgeDoc.key}>
                {forgeDoc.props && forgeDoc.props.content}
              </p>
            );
          }
        }}
      />
    </Suspense>,
  );
  expect(queryByText('Submit')).toBeNull();
  expect(await findByText('hi there')).toBeTruthy();
});
