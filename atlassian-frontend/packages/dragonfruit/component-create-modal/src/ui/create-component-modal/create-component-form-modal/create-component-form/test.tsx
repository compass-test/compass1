import React from 'react';

import { fireEvent, render, wait } from '@testing-library/react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import {
  mockGetTeamsSuccess,
  TeamsSearchResponse,
} from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  fetchMockGet,
  selectOption,
} from '@atlassian/dragonfruit-testing';

import { CreateComponentModalProvider } from '../../../../controllers/create-component-modal-controller';

import { CreateComponentForm, CreateComponentFormProps } from './index';

type MockedFormProps = {
  apolloProps?: Omit<
    React.ComponentProps<typeof ApolloAutoMockProvider>,
    'children'
  >;
  formProps?: CreateComponentFormProps;
};

const MockedForm = (props: MockedFormProps) => {
  fetchMockGet<TeamsSearchResponse>(mockGetTeamsSuccess());

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider {...props.apolloProps}>
        <CreateComponentModalProvider>
          <CreateComponentForm {...props.formProps} />
        </CreateComponentModalProvider>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

describe('CreateComponentForm', () => {
  // This is how we select the fields in our pollinator tests.
  // If any of these fail then we need to check pollinator.
  describe('Selectors', () => {
    test('the type select can be found', async () => {
      const { getAllByLabelText } = render(<MockedForm />);

      // Selectors have 2 elements, the dropdown and the text input
      const elements = getAllByLabelText(/Type/i);
      expect(elements).toHaveLength(2);

      const input = elements[elements.length - 1];
      expect(input).toBeInTheDocument();
    });

    test('the name text field can be found', async () => {
      const { getByLabelText } = render(<MockedForm />);

      expect(getByLabelText(/Name/i)).toBeInTheDocument();
    });

    test('the name owner field can be found', async () => {
      const { getAllByLabelText } = render(<MockedForm />);

      // Selectors have 2 elements, the dropdown and the text input
      const elements = getAllByLabelText(/Owner/i);
      expect(elements).toHaveLength(2);

      const input = elements[elements.length - 1];
      expect(input).toBeInTheDocument();
    });

    test('the submit button can be found', async () => {
      const { getByTestId } = render(<MockedForm />);

      expect(
        getByTestId('dragonfruit-create-component-modal.ui.submit-button'),
      ).toBeInTheDocument();
    });
  });

  describe('Form submission', () => {
    test('the success handler is called', async () => {
      const successFn = jest.fn();

      const { getByLabelText, getByTestId } = render(
        <MockedForm formProps={{ onSuccess: successFn }} />,
      );

      // Minimal set of fields required to submit
      fireEvent.change(getByLabelText(/Name/i), {
        target: { value: 'Component Name' },
      });

      fireEvent.click(
        getByTestId('dragonfruit-create-component-modal.ui.submit-button'),
      );

      await wait(() => expect(successFn).toHaveBeenCalledTimes(1));

      expect(successFn).toHaveBeenCalledTimes(1);
    });

    test('it can submit the form with a name successfully', async () => {
      const mutationFn = jest.fn();

      // By supplying a mock function as a resolver, we've effectively stopped
      // execution at this step. As a result, we can't expect onSuccess to be
      // called unless we provided a proper implementation within mutationFn.
      const resolvers = () => ({
        Mutation: {
          compass: () => ({ createComponent: mutationFn }),
        },
      });

      const { getByLabelText, getByTestId } = render(
        <MockedForm apolloProps={{ resolvers }} />,
      );

      // Enter name
      fireEvent.change(getByLabelText(/Name/i), {
        target: { value: 'Component Name' },
      });

      // Submit form
      fireEvent.click(
        getByTestId('dragonfruit-create-component-modal.ui.submit-button'),
      );
      await wait(() => expect(mutationFn).toHaveBeenCalledTimes(1));

      const variables = mutationFn.mock.calls[0][0];

      expect(variables.input).toEqual({
        name: 'Component Name',
        type: CompassComponentType.SERVICE,
      });
    });

    test('it can submit the form with a name and type successfully', async () => {
      const mutationFn = jest.fn();

      // By supplying a mock function as a resolver, we've effectively stopped
      // execution at this step. As a result, we can't expect onSuccess to be
      // called unless we provided a proper implementation within mutationFn.
      const resolvers = () => ({
        Mutation: {
          compass: () => ({ createComponent: mutationFn }),
        },
      });

      const { getByLabelText, getAllByLabelText, getByTestId } = render(
        <MockedForm apolloProps={{ resolvers }} />,
      );

      // Enter name
      fireEvent.change(getByLabelText(/Name/i), {
        target: { value: 'Component Name' },
      });

      // Select type
      await selectOption(getAllByLabelText(/Type/i)[0], /Application/i);

      // Submit form
      fireEvent.click(
        getByTestId('dragonfruit-create-component-modal.ui.submit-button'),
      );
      await wait(() => expect(mutationFn).toHaveBeenCalledTimes(1));

      const variables = mutationFn.mock.calls[0][0];

      expect(variables.input).toEqual({
        name: 'Component Name',
        type: CompassComponentType.APPLICATION,
      });
    });

    test('it can submit the form with an owner successfully', async () => {
      const mutationFn = jest.fn();

      // By supplying a mock function as a resolver, we've effectively stopped
      // execution at this step. As a result, we can't expect onSuccess to be
      // called unless we provided a proper implementation within mutationFn.
      const resolvers = () => ({
        Mutation: { compass: () => ({ createComponent: mutationFn }) },
      });

      const { getByLabelText, getAllByLabelText, getByTestId } = render(
        <MockedForm apolloProps={{ resolvers }} />,
      );

      // Enter name
      fireEvent.change(getByLabelText(/Name/i), {
        target: { value: 'Component Name' },
      });

      // Select owner
      await selectOption(getAllByLabelText(/Owner/i)[0], /Compass Crux/i);

      // Submit the form
      fireEvent.click(
        getByTestId('dragonfruit-create-component-modal.ui.submit-button'),
      );
      await wait(() => expect(mutationFn).toHaveBeenCalledTimes(1));

      const variables = mutationFn.mock.calls[0][0];

      expect(variables.input).toEqual({
        name: 'Component Name',
        type: CompassComponentType.SERVICE,
        ownerId: mockGetTeamsSuccess().result[0].id,
      });
    });

    test('it cannot submit the form until a name has been entered', async () => {
      const successFn = jest.fn();

      const { getByTestId } = render(
        <MockedForm formProps={{ onSuccess: successFn }} />,
      );

      const submitButton = getByTestId(
        'dragonfruit-create-component-modal.ui.submit-button',
      ) as HTMLButtonElement;

      expect(submitButton.disabled).toBeTruthy();
    });
  });
});
