import React, { useState } from 'react';

import { screen } from '@testing-library/dom';
import { fireEvent, render, wait } from '@testing-library/react';

import Button from '@atlaskit/button';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import messages from './messages';

import FeedbackCollector from './index';

const MockedFeedbackCollector = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CompassTestProvider>
      <Button
        testId="dragonfruit-navigation.feedback-dialog.openDialog"
        onClick={() => setIsOpen(true)}
      >
        Give Feedback
      </Button>
      {isOpen && <FeedbackCollector onClose={() => setIsOpen(false)} />}
    </CompassTestProvider>
  );
};

describe('FeedbackCollector', () => {
  test('button for feedback is found', () => {
    const { getByTestId } = render(<MockedFeedbackCollector />);

    expect(
      getByTestId('dragonfruit-navigation.feedback-dialog.openDialog'),
    ).toBeInTheDocument();
  });

  test('user can not submit feedback until they enter text', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <MockedFeedbackCollector />,
    );

    fireEvent.click(
      getByTestId('dragonfruit-navigation.feedback-dialog.openDialog'),
    );

    await wait(() =>
      expect(
        getByPlaceholderText(messages.summaryPlaceholder.defaultMessage),
      ).toBeInTheDocument(),
    );

    const sendFeedbackSpan = getByText(/Send feedback/i);
    const sendFeedbackButton = sendFeedbackSpan.parentNode as HTMLButtonElement;

    // Submit button should be disabled before user enters text.
    expect(sendFeedbackButton.disabled).toBeTruthy();

    fireEvent.change(
      getByPlaceholderText(messages.summaryPlaceholder.defaultMessage),
      {
        target: { value: 'My feedback is...' },
      },
    );

    // Submit button should be enabled after user enters text.
    expect(sendFeedbackButton.disabled).toBeFalsy();
  });

  test('can be contacted is pre-checked', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <MockedFeedbackCollector />,
    );

    fireEvent.click(
      getByTestId('dragonfruit-navigation.feedback-dialog.openDialog'),
    );

    await wait(() =>
      expect(
        getByPlaceholderText(messages.summaryPlaceholder.defaultMessage),
      ).toBeInTheDocument(),
    );

    const canBeContactedInput = screen.getByRole('checkbox', {
      name: `${messages.canContactLabel.defaultMessage} ${messages.canContactLink.defaultMessage}`,
    });

    await wait(() =>
      expect(
        (canBeContactedInput as HTMLInputElement | null)?.checked,
      ).toBeTruthy(),
    );
  });

  test('flag shows up after submitting feedback', async () => {
    const {
      getByPlaceholderText,
      queryByPlaceholderText,
      getByTestId,
      getByText,
    } = render(<MockedFeedbackCollector />);

    fireEvent.click(
      getByTestId('dragonfruit-navigation.feedback-dialog.openDialog'),
    );

    await wait(() =>
      expect(
        getByPlaceholderText(messages.summaryPlaceholder.defaultMessage),
      ).toBeInTheDocument(),
    );

    const sendFeedbackSpan = getByText(/Send feedback/i);
    const sendFeedbackButton = sendFeedbackSpan.parentNode as HTMLButtonElement;

    fireEvent.change(
      getByPlaceholderText(messages.summaryPlaceholder.defaultMessage),
      {
        target: { value: '(Test) My feedback is...' },
      },
    );

    fireEvent.click(sendFeedbackButton);
    await wait(() =>
      expect(
        getByTestId('dragonfruit-navigation.feedback-dialog.success-flag'),
      ).toBeInTheDocument(),
    );

    // Check to make sure the modal closed
    expect(
      queryByPlaceholderText(messages.summaryPlaceholder.defaultMessage),
    ).not.toBeInTheDocument();
  });
});
