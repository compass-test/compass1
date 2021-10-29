import React, { Suspense } from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import {
  temporarilySilenceActAndAtlaskitDeprecationWarnings,
  createMockHandler,
} from '@atlassian/aux-test-utils';
import { Handler } from '@atlassian/forge-ui-types';
import { Form } from '../';
import TextField from '../../textfield';
import { Button } from '../../button/';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

test('submitting a form add form data to the event handler arguments', async () => {
  const mockHandler = createMockHandler('onSubmit');
  const mockDispatch = jest.fn();

  const { findByText, getByLabelText } = render(
    <Suspense fallback="loading">
      <Form
        forgeDoc={{
          type: 'Form',
          props: { submitButtonText: 'submit', onSubmit: mockHandler },
          children: [
            {
              type: 'TextField',
              key: 'TextField.0',
              props: { name: 'username', label: 'username' },
              children: [],
            },
          ],
        }}
        dispatch={mockDispatch}
        render={(forgeDoc) => {
          if (forgeDoc.type === 'TextField') {
            // @ts-ignore
            return <TextField {...(forgeDoc.props || {})} key={forgeDoc.key} />;
          }
        }}
      />
    </Suspense>,
  );
  // await for suspense to resolve
  const submitButton = await findByText('submit');

  const field = getByLabelText(/username/i);
  fireEvent.change(field, { target: { value: 'a' } });
  fireEvent.click(submitButton);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledWith({
    args: [{ username: 'a' }],
    handler: mockHandler,
    type: 'event',
    extensionData: {},
  });
});

test('should render action buttons', async () => {
  const mockDispatch = jest.fn();
  const onSubmit: Handler = {
    componentKey: 'Form.4',
    prop: 'onSubmit',
  };

  const { findByText } = render(
    <Suspense fallback="loading">
      <Form
        forgeDoc={{
          type: 'Form',
          props: { submitButtonText: 'submit', onSubmit },
          children: [
            {
              type: 'TextField',
              key: 'TextField.0',
              props: { name: 'username', label: 'username' },
              children: [],
            },
            {
              type: 'Button',
              key: 'actionButton.1',
              props: {
                onClick: { componentKey: 'actionButton.1', prop: 'onClick' },
                text: 'Go back',
              },
              children: [],
            },
            {
              type: 'Button',
              key: 'actionButton.2',
              props: {
                onClick: { componentKey: 'actionButton.2', prop: 'onClick' },
                text: 'Cancel',
              },
              children: [],
            },
          ],
        }}
        dispatch={mockDispatch}
        render={function render(forgeDoc) {
          if (forgeDoc.type === 'TextField') {
            // @ts-ignore
            return <TextField {...(forgeDoc.props || {})} key={forgeDoc.key} />;
          } else if (forgeDoc.type === 'Button') {
            return (
              <Button
                key={forgeDoc.key}
                forgeDoc={forgeDoc}
                dispatch={mockDispatch}
                render={render}
              />
            );
          }
        }}
      />
    </Suspense>,
  );

  expect(await findByText('Go back')).toBeTruthy();

  const cancelButton = await findByText('Cancel');
  fireEvent.click(cancelButton);
  expect(mockDispatch).toHaveBeenCalledWith({
    args: [],
    handler: { componentKey: 'actionButton.2', prop: 'onClick' },
    type: 'event',
    extensionData: {},
  });
});

test('field resets after submission', async () => {
  const mockHandler = createMockHandler('onSubmit');
  const mockDispatch = jest.fn();

  const { findByText, getByLabelText, container } = render(
    <Suspense fallback="loading">
      <Form
        forgeDoc={{
          type: 'Form',
          props: { submitButtonText: 'submit', onSubmit: mockHandler },
          children: [
            {
              type: 'TextField',
              key: 'TextField.0',
              props: {
                name: 'username',
                label: 'username',
                defaultValue: 'default value',
              },
              children: [],
            },
          ],
        }}
        dispatch={mockDispatch}
        render={(forgeDoc) => {
          if (forgeDoc.type === 'TextField') {
            // @ts-ignore
            return <TextField {...(forgeDoc.props || {})} key={forgeDoc.key} />;
          }
        }}
      />
    </Suspense>,
  );
  // await for suspense to resolve
  const submitButton = await findByText('submit');

  const field = getByLabelText(/username/i) as HTMLInputElement;
  fireEvent.change(field, {
    target: { value: 'habeas corpus' },
  });
  expect(field.value).toBe('habeas corpus');
  fireEvent.click(submitButton);
  await waitForElement(() => field, { container });
  let updatedField = getByLabelText(/username/i) as HTMLInputElement;
  expect(updatedField.value).toBe('default value');
});
