import React from 'react';

import { act, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TeamCheckinEditForm } from './main';

describe('TeamCheckinEditForm', () => {
  const TEST_ID = 'checkin-form';
  const SUBMIT_TEST_ID = 'checkin-form.submit';
  const CANCEL_TEST_ID = 'checkin-form.cancel';
  const MOCK_DATA = {
    id: '6',
    mood: '3',
    response1: 'Most things, but not everything.',
    response2: 'Always room for improvement!',
    response3: 'Everywhere and nowhere.',
  };

  it('should render successfully', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <TeamCheckinEditForm teamCheckin={MOCK_DATA} testId={TEST_ID} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const form = getByTestId(TEST_ID);

    expect(form).not.toBeNull();
    expect(form).toBeInTheDocument();
  });

  it('should invoke `onSuccess` when form submission is successful', async () => {
    const successSpy = jest.fn();

    const { getByTestId, queryByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <TeamCheckinEditForm
            teamCheckin={MOCK_DATA}
            onSuccess={successSpy}
            testId={TEST_ID}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    act(() => {
      userEvent.click(
        getByTestId('checkin-form.mood-selector.great.click-area'),
      );
    });

    const submit = getByTestId(SUBMIT_TEST_ID);

    act(() => {
      userEvent.click(submit);
    });

    await wait(() => expect(successSpy).toHaveBeenCalledTimes(1));

    const flag = queryByText('Successfully updated team check-in');

    expect(flag).not.toBe(null);
    expect(flag).toBeInTheDocument();
  });

  it('should invoke `onError` when form submission fails due to an exception', async () => {
    const errorSpy = jest.fn();

    const { getByTestId, queryByText } = render(
      <CompassTestProvider>
        <ApolloNetworkErrorProvider>
          <TeamCheckinEditForm
            teamCheckin={MOCK_DATA}
            onError={errorSpy}
            testId={TEST_ID}
          />
        </ApolloNetworkErrorProvider>
      </CompassTestProvider>,
    );

    act(() => {
      userEvent.click(getByTestId('checkin-form.mood-selector.ok.click-area'));
    });

    const submit = getByTestId(SUBMIT_TEST_ID);

    act(() => {
      userEvent.click(submit);
    });

    await wait(() => expect(errorSpy).toHaveBeenCalledTimes(1));

    const flag = queryByText('Error updating team check-in');

    expect(flag).not.toBe(null);
    expect(flag).toBeInTheDocument();
  });

  it('should invoke `onFailure` when form submission fails due to a non-exception', async () => {
    const failureSpy = jest.fn();
    const mutationSpy = jest.fn();

    const resolvers = () => ({
      Mutation: {
        compass: () => ({
          updateTeamCheckin: () => {
            mutationSpy();

            return {
              success: false,
            };
          },
        }),
      },
    });

    const { getByTestId, queryByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider resolvers={resolvers}>
          <TeamCheckinEditForm
            teamCheckin={MOCK_DATA}
            onFailure={failureSpy}
            testId={TEST_ID}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    act(() => {
      userEvent.click(
        getByTestId('checkin-form.mood-selector.great.click-area'),
      );
    });

    const submit = getByTestId(SUBMIT_TEST_ID);

    act(() => {
      userEvent.click(submit);
    });

    await wait(() => expect(failureSpy).toHaveBeenCalledTimes(1));
    await wait(() => expect(mutationSpy).toHaveBeenCalledTimes(1));

    const flag = queryByText('Error updating team check-in');

    expect(flag).not.toBe(null);
    expect(flag).toBeInTheDocument();
  });

  it('should invoke `onCancel` when the cancel button is clicked', () => {
    const cancelSpy = jest.fn();

    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <TeamCheckinEditForm
            teamCheckin={MOCK_DATA}
            onCancel={cancelSpy}
            testId={TEST_ID}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    act(() => {
      userEvent.click(getByTestId(CANCEL_TEST_ID));
    });

    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });
});
