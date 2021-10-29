import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import DeleteConfirmationDialog from './index';

describe('DeleteConfirmationDialog', () => {
  let dialog: HTMLElement;
  let cancelButton: HTMLElement;
  let removeButton: HTMLElement;

  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <DeleteConfirmationDialog
          name="Velocity"
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </CompassTestProvider>,
    );

    dialog = getByTestId(
      'page-scorecard-templates.ui.delete-confirmation-dialog',
    );

    cancelButton = getByTestId(
      'page-scorecard-templates.ui.delete-confirmation-dialog.button-close',
    );

    removeButton = getByTestId(
      'page-scorecard-templates.ui.delete-confirmation-dialog.button-remove',
    );
  });

  it('renders confirmation dialog', () => {
    expect(dialog).toBeInTheDocument();
  });

  it('clicking cancel button should trigger close action', () => {
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('clicking remove button should trigger submit action', () => {
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
