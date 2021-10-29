import React from 'react';

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import commonMessages from '../../messages';

import {
  TaskCardBasicWithSelections,
  TaskCardCannotSkip,
  TaskCardCustomSkipText,
  TaskCardDisabled,
  TaskCardDisabledWithCustomDescription,
  TaskCardDisabledWithSelections,
  TaskCardError,
  TaskCardErrorIsDisabled,
  TaskCardIsLoading,
  TaskCardWithNoSelections,
  TaskCardWithNoSelectionsAndFunctions,
  TaskCardWithSelectionsAndFunctions,
} from './examples';
import messages from './messages';

describe('<TaskCard />', () => {
  it('should show correct icon label when selections exist', () => {
    const { getByLabelText } = render(<TaskCardBasicWithSelections />);

    expect(
      getByLabelText(messages.statusIndicatorSelectedIconLabel.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show correct icon label when nothing is selected', () => {
    const { getByLabelText } = render(<TaskCardWithNoSelections />);

    expect(
      getByLabelText(
        messages.statusIndicatorNotSelectedIconLabel.defaultMessage!,
      ),
    ).toBeInTheDocument();
  });

  it('should show correct description when nothing is selected', () => {
    const { getByText } = render(<TaskCardWithNoSelections />);

    expect(getByText("You haven't selected any projects")).toBeInTheDocument();
  });

  it('should show correct description when selected', () => {
    const { getByText, queryByText } = render(<TaskCardBasicWithSelections />);

    expect(getByText('title1')).toBeInTheDocument();
    expect(getByText('description1')).toBeInTheDocument();
    expect(getByText('title2')).toBeInTheDocument();
    expect(getByText('description2')).toBeInTheDocument();
    expect(
      queryByText("You haven't selected any projects"),
    ).not.toBeInTheDocument();
  });

  it('should show and call Select and Skip button when nothing is selected', () => {
    const onSelect = jest.fn();
    const onSkip = jest.fn();

    const { getByTestId } = render(
      <TaskCardWithNoSelectionsAndFunctions
        onSelect={onSelect}
        onSkip={onSkip}
      />,
    );

    expect(getByTestId('buttonSelect')).toBeInTheDocument();
    expect(getByTestId('buttonSkip')).toBeInTheDocument();

    const buttonSelect = getByTestId('buttonSelect');
    userEvent.click(buttonSelect);
    expect(onSelect).toHaveBeenCalledTimes(1);

    const buttonSkip = getByTestId('buttonSkip');
    userEvent.click(buttonSkip);
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('should show and call Edit button when selected', () => {
    const onSelect = jest.fn();
    const onSkip = jest.fn();
    const { getByTestId } = render(
      <TaskCardWithSelectionsAndFunctions
        onSelect={onSelect}
        onSkip={onSkip}
      />,
    );
    expect(getByTestId('buttonEdit')).toBeInTheDocument();

    const buttonEdit = getByTestId('buttonEdit');
    userEvent.click(buttonEdit);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should show disabled buttons and hide skip when disabled and nothing selected', () => {
    const { getByTestId, queryByTestId } = render(<TaskCardDisabled />);
    expect(getByTestId('buttonSelect')).toBeDisabled();
    expect(queryByTestId('buttonSkip')).not.toBeInTheDocument();
  });

  it('should show correct custom description when disabled', () => {
    const { getByText } = render(<TaskCardDisabledWithCustomDescription />);
    expect(
      getByText('This is disabled because of reasons'),
    ).toBeInTheDocument();
  });

  it('should not show skip button when should not allow skip', () => {
    const { getByTestId, queryByTestId } = render(<TaskCardCannotSkip />);
    expect(getByTestId('buttonSelect')).toBeInTheDocument();
    expect(queryByTestId('buttonSkip')).not.toBeInTheDocument();
  });

  it('should not show anything when taskcard is loading', () => {
    const { queryByTestId } = render(<TaskCardIsLoading />);
    expect(queryByTestId('buttonSkip')).not.toBeInTheDocument();
    expect(queryByTestId('buttonSelect')).not.toBeInTheDocument();
    expect(queryByTestId('buttonEdit')).not.toBeInTheDocument();
  });

  it('should display custom skip button text if specified', () => {
    const { getByTestId } = render(<TaskCardCustomSkipText />);
    expect(getByTestId('buttonSkip'));

    const skipButton = getByTestId('buttonSkip');
    expect(
      within(skipButton!).getByText('Custom skip button text'),
    ).toBeInTheDocument();
  });

  it('should show error icon label when error exists', () => {
    const { getByLabelText } = render(<TaskCardError />);

    expect(
      getByLabelText(
        commonMessages.statusIndicatorErrorIconLabel.defaultMessage!,
      ),
    ).toBeInTheDocument();
  });

  it('should show and call fix button when selected', () => {
    const onFixError = jest.fn();
    const { getByTestId } = render(<TaskCardError onFixError={onFixError} />);

    const buttonFixError = getByTestId('buttonFixError');
    userEvent.click(buttonFixError);
    expect(onFixError).toHaveBeenCalledTimes(1);
  });

  it('should still allow error to be fixed when disabled and is error', () => {
    const { getByText, getByTestId } = render(<TaskCardErrorIsDisabled />);
    expect(getByText('title1')).toBeInTheDocument();
    expect(getByText('description1')).toBeInTheDocument();
    expect(getByTestId('buttonEdit')).toBeInTheDocument();
    expect(getByTestId('buttonEdit')).toBeEnabled();
    expect(getByTestId('buttonFixError')).toBeInTheDocument();
    expect(getByTestId('buttonFixError')).toBeEnabled();
  });

  it('should show disabled and unselected state when disabled even if there are selections', () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <TaskCardDisabledWithSelections />,
    );

    expect(
      getByLabelText(
        messages.statusIndicatorNotSelectedIconLabel.defaultMessage!,
      ),
    ).toBeInTheDocument();

    expect(
      getByText('Some reason for this to be disabled'),
    ).toBeInTheDocument();
    expect(getByTestId('buttonSelect')).toBeInTheDocument();
    expect(getByTestId('buttonSelect')).toBeDisabled();
  });
});
