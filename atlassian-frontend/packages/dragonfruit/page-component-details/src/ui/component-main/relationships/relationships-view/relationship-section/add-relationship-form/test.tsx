import React from 'react';

import { fireEvent, render, wait } from '@testing-library/react';

import { CompassRelationshipType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_COMPONENT,
  MOCKED_NODES,
  MOCKED_SEARCH_RESULTS,
} from '../../../../../../common/mocks';

import { AddRelationshipForm } from './index';

const DOWN_ARROW = { keyCode: 40 };

describe('AddRelationshipForm', () => {
  it('should not be able to submit without a component selected', async () => {
    const { getByText } = render(
      <CompassTestProvider locale="en">
        <ApolloAutoMockProvider>
          <AddRelationshipForm
            currentComponent={MOCKED_COMPONENT}
            relationshipType={CompassRelationshipType.DEPENDS_ON}
            existingRelationships={[]}
            onSuccess={() => null}
            onCancel={() => null}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // check that the add button is disabled
    const addButton = getByText(/Add/i).parentElement as HTMLButtonElement;
    expect(addButton.disabled).toBeTruthy();
  });

  it('should call onCancel when the cancel button is clicked', async () => {
    const onCancelFn = jest.fn();

    const { getByText } = render(
      <CompassTestProvider locale="en">
        <ApolloAutoMockProvider>
          <AddRelationshipForm
            currentComponent={MOCKED_COMPONENT}
            relationshipType={CompassRelationshipType.DEPENDS_ON}
            existingRelationships={[]}
            onSuccess={() => null}
            onCancel={onCancelFn}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // find the cancel button and click it
    const cancelButton = getByText(/Cancel/i)
      .parentElement as HTMLButtonElement;
    fireEvent.click(cancelButton);

    // expect onCancel to have been called
    await wait(() => expect(onCancelFn).toHaveBeenCalledTimes(1));
  });

  it('should call onSuccess and createRelationship mutation on submit', async () => {
    const onSuccessFn = jest.fn();
    const mutationFn = jest.fn().mockReturnValue({ success: true });

    const resolvers = () => ({
      Mutation: {
        compass: () => ({
          createRelationship: mutationFn,
        }),
      },
    });

    const { getByText } = render(
      <CompassTestProvider locale="en">
        <ApolloAutoMockProvider
          mocks={MOCKED_SEARCH_RESULTS}
          resolvers={resolvers}
        >
          <AddRelationshipForm
            currentComponent={MOCKED_COMPONENT}
            relationshipType={CompassRelationshipType.DEPENDS_ON}
            existingRelationships={[]}
            onSuccess={onSuccessFn}
            onCancel={() => null}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // find the control and keydown to open the dropdown
    const control = getByText(/Select a component/i) as HTMLElement;
    fireEvent.keyDown(control, DOWN_ARROW);

    // Wait for our option to load and then click it
    const optionName = new RegExp(MOCKED_NODES[1].component.name, 'i');
    await wait(() => getByText(optionName));

    // find the option and click
    const optionElement = getByText(optionName);
    fireEvent.click(optionElement);

    // find and click the add button, it should not be disabled
    const addButton = getByText(/Add/i).parentElement as HTMLButtonElement;
    expect(addButton.disabled).not.toBeTruthy();
    fireEvent.click(addButton);

    // expect onSuccess to have been called
    await wait(() => expect(onSuccessFn).toHaveBeenCalledTimes(1));

    // expect the muatation to have been called
    await wait(() => expect(mutationFn).toHaveBeenCalledTimes(1));

    // check that the mutation was called with the expected variables
    // by getting the first argument of the first call
    const variables = mutationFn.mock.calls[0][0];
    expect(variables.input).toEqual({
      type: CompassRelationshipType.DEPENDS_ON,
      startNodeId: MOCKED_COMPONENT['id'],
      endNodeId: MOCKED_NODES[1].component.id,
    });
  });
});
