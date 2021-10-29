import React from 'react';

import { act, fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TeamCheckinCreateForm } from './main';

describe('TeamCheckinCreateForm', () => {
  const TEST_ID = 'checkin-form';
  const SUBMIT_TEST_ID = 'checkin-form.submit';
  const CANCEL_TEST_ID = 'checkin-form.cancel';
  const MOCK_DATA = {
    mood: '3',
    response1: 'Most things, but not everything.',
    response2: 'Always room for improvement!',
    response3: 'Everywhere and nowhere.',
  };

  it('should render successfully', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <TeamCheckinCreateForm teamId="foo" testId={TEST_ID} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const form = getByTestId(TEST_ID);

    expect(form).not.toBeNull();
    expect(form).toBeInTheDocument();
  });

  it('should invoke `onSuccess` when form submission is successful', async () => {
    const successSpy = jest.fn();

    const { getByLabelText, getByTestId, queryByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <TeamCheckinCreateForm
            teamId="foo"
            onSuccess={successSpy}
            testId={TEST_ID}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    act(() => {
      userEvent.click(getByTestId('checkin-form.mood-selector.ok.click-area'));
    });

    act(() => {
      fireEvent.change(getByLabelText('What went well?'), {
        target: { value: MOCK_DATA.response1 },
      });
    });

    act(() => {
      fireEvent.change(getByLabelText('Where can we get better?'), {
        target: { value: MOCK_DATA.response2 },
      });
    });

    act(() => {
      fireEvent.change(getByLabelText('Where did we get lucky?'), {
        target: { value: MOCK_DATA.response3 },
      });
    });

    const submit = getByTestId(SUBMIT_TEST_ID);

    act(() => {
      userEvent.click(submit);
    });

    await wait(() => expect(successSpy).toHaveBeenCalledTimes(1));

    const flag = queryByText('Successfully created team check-in');

    expect(flag).not.toBe(null);
    expect(flag).toBeInTheDocument();
  });

  it('should invoke `onError` when form submission fails due to an exception', async () => {
    const errorSpy = jest.fn();

    const { getByTestId, queryByText } = render(
      <CompassTestProvider>
        <ApolloNetworkErrorProvider>
          <TeamCheckinCreateForm
            teamId="foo"
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

    const flag = queryByText('Error creating team check-in');

    expect(flag).not.toBe(null);
    expect(flag).toBeInTheDocument();
  });

  it('should invoke `onFailure` when form submission fails due to a non-exception', async () => {
    const failureSpy = jest.fn();
    const mutationSpy = jest.fn();

    const resolvers = () => ({
      Mutation: {
        compass: () => ({
          createTeamCheckin: () => {
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
          <TeamCheckinCreateForm
            teamId="foo"
            onFailure={failureSpy}
            testId={TEST_ID}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    act(() => {
      userEvent.click(getByTestId('checkin-form.mood-selector.ok.click-area'));
    });

    const submit = getByTestId(SUBMIT_TEST_ID);

    act(() => {
      userEvent.click(submit);
    });

    await wait(() => expect(failureSpy).toHaveBeenCalledTimes(1));
    await wait(() => expect(mutationSpy).toHaveBeenCalledTimes(1));

    const flag = queryByText('Error creating team check-in');

    expect(flag).not.toBe(null);
    expect(flag).toBeInTheDocument();
  });

  it('should invoke `onCancel` when the cancel button is clicked', () => {
    const onCancel = jest.fn();

    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <TeamCheckinCreateForm
            teamId="foo"
            onCancel={onCancel}
            testId={TEST_ID}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    act(() => {
      userEvent.click(getByTestId(CANCEL_TEST_ID));
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
