import React from 'react';

import { fireEvent, render, wait } from '@testing-library/react';

import { CompassRelationshipType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import {
  CompassTestProvider,
  selectOption,
} from '@atlassian/dragonfruit-testing';

import {
  MOCKED_COMPONENT,
  MOCKED_NODES,
  MOCKED_SEARCH_RESULTS,
} from '../../../../../../common/mocks';

import { AddRelationshipFormProps, EmptyStateForm } from './main';

const FormWithProviders = (props?: Partial<AddRelationshipFormProps>) => {
  return (
    <CompassTestProvider>
      <EmptyStateForm
        currentComponent={MOCKED_COMPONENT}
        onSuccess={() => {}}
        {...props}
      />
    </CompassTestProvider>
  );
};

const findSubmitButton = (baseElement: HTMLElement) => {
  // In pollinator test we look for the button on the section
  return baseElement.querySelector('button[type=submit]');
};

describe('Add Relationship Empty State Form', () => {
  it('submit is disabled by default', async () => {
    const { baseElement } = render(
      <ApolloAutoMockProvider>
        <FormWithProviders />
      </ApolloAutoMockProvider>,
    );

    const button = await findSubmitButton(baseElement);

    expect(button).toBeDisabled();
  });

  it('submits with valid data', async () => {
    const onSuccessFn = jest.fn();
    const mutationFn = jest.fn((variables) => ({
      success: true,
    }));

    const resolvers = () => ({
      Mutation: {
        compass: () => ({
          createRelationship: mutationFn,
        }),
      },
    });

    const { baseElement, getAllByLabelText } = render(
      <ApolloAutoMockProvider
        mocks={MOCKED_SEARCH_RESULTS}
        resolvers={resolvers}
      >
        <FormWithProviders onSuccess={onSuccessFn} />
      </ApolloAutoMockProvider>,
    );

    const optionName = new RegExp(MOCKED_NODES[1].component.name, 'i');

    await selectOption(getAllByLabelText(/Depends on/i)[0], optionName);

    const button = findSubmitButton(baseElement);

    if (!button) {
      throw Error();
    }

    expect(button).toBeEnabled();
    fireEvent.click(button);

    await wait(() => expect(mutationFn).toHaveBeenCalled());

    // get the first argument of the first call
    const input = mutationFn.mock.calls[0][0].input;

    expect(input).toEqual({
      endNodeId: MOCKED_NODES[1].component.id, // End node should be the selected component
      startNodeId: MOCKED_COMPONENT['id'],
      type: CompassRelationshipType.DEPENDS_ON,
    });

    await wait(() => expect(onSuccessFn).toHaveBeenCalled());
    expect(onSuccessFn).toHaveBeenCalledTimes(1);
  });
});
