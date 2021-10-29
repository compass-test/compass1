import React from 'react';

import { act, fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { FormData, TeamCheckinForm } from './index';

describe('TeamCheckinForm', () => {
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
      <CompassTestProvider locale="en">
        <TeamCheckinForm
          onCancel={() => {}}
          onSubmit={() => Promise.resolve()}
          testId={TEST_ID}
        />
      </CompassTestProvider>,
    );

    const form = getByTestId(TEST_ID);

    expect(form).not.toBeNull();
    expect(form).toBeInTheDocument();
  });

  it('should have create form copy with a `mode` of `"create"`', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <TeamCheckinForm
          onCancel={() => {}}
          onSubmit={() => Promise.resolve()}
          testId={TEST_ID}
        />
      </CompassTestProvider>,
    );

    expect(getByTestId(SUBMIT_TEST_ID).textContent).toBe('Create');
  });

  it('should have edit form copy with a `mode` of `"edit"`', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <TeamCheckinForm
          onCancel={() => {}}
          onSubmit={() => Promise.resolve()}
          mode="edit"
          testId={TEST_ID}
        />
      </CompassTestProvider>,
    );

    expect(getByTestId(SUBMIT_TEST_ID).textContent).toBe('Save');
  });

  it('should initialize with form data', () => {
    const { getByLabelText, getByTestId } = render(
      <CompassTestProvider locale="en">
        <TeamCheckinForm
          onCancel={() => {}}
          onSubmit={() => Promise.resolve()}
          teamCheckin={MOCK_DATA}
          testId={TEST_ID}
        />
      </CompassTestProvider>,
    );

    expect(
      getByTestId('checkin-form.mood-selector.ok.input').getAttribute(
        'checked',
      ),
    ).not.toBe(null);

    expect((getByLabelText('What went well?') as HTMLInputElement).value).toBe(
      MOCK_DATA.response1,
    );

    expect(
      (getByLabelText('Where can we get better?') as HTMLInputElement).value,
    ).toBe(MOCK_DATA.response2);

    expect(
      (getByLabelText('Where did we get lucky?') as HTMLInputElement).value,
    ).toBe(MOCK_DATA.response3);
  });

  it('should submit form data when the submit button is clicked', async () => {
    const formSpy = jest.fn();

    const onSubmit = (data: FormData) => {
      formSpy(data);

      return Promise.resolve();
    };

    const { getByLabelText, getByTestId } = render(
      <CompassTestProvider locale="en">
        <TeamCheckinForm
          onCancel={() => {}}
          onSubmit={onSubmit}
          testId={TEST_ID}
        />
      </CompassTestProvider>,
    );

    act(() => {
      userEvent.click(getByTestId('checkin-form.mood-selector.ok.click-area'));
    });

    fireEvent.change(getByLabelText('What went well?'), {
      target: { value: MOCK_DATA.response1 },
    });

    fireEvent.change(getByLabelText('Where can we get better?'), {
      target: { value: MOCK_DATA.response2 },
    });

    fireEvent.change(getByLabelText('Where did we get lucky?'), {
      target: { value: MOCK_DATA.response3 },
    });

    const submit = getByTestId(SUBMIT_TEST_ID);

    act(() => {
      userEvent.click(submit);
    });

    await wait(() => expect(formSpy).toHaveBeenCalledTimes(1));

    expect(formSpy).toHaveBeenLastCalledWith(MOCK_DATA);
  });

  it('should invoke `onCancel` when the cancel button is clicked', () => {
    const onCancel = jest.fn();

    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <TeamCheckinForm
          onCancel={onCancel}
          onSubmit={() => Promise.resolve()}
          testId={TEST_ID}
        />
      </CompassTestProvider>,
    );

    const submit = getByTestId(CANCEL_TEST_ID);

    act(() => {
      userEvent.click(submit);
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
