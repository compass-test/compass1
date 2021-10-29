import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import Editor from '../Editor';

describe('TextAvatarEditor', () => {
  const testId = 'text-avatar-editor';
  const defaultProps = {
    testId,
    handleClickUpload: jest.fn(),
    handleClickCancel: jest.fn(),
  };

  afterEach(() => {
    jest.restoreAllMocks();
    defaultProps.handleClickUpload.mockRestore();
    defaultProps.handleClickCancel.mockRestore();
  });

  describe('Initials textfield', () => {
    test('Should have a placeholder', () => {
      const { getByText, getByPlaceholderText } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      expect(getByText('Initials')).toBeInTheDocument();
      expect(
        getByPlaceholderText('Enter up to 4 initials'),
      ).toBeInTheDocument();
    });
  });

  describe('handleClickUpload prop', () => {
    test('Should call "handleClickUpload" when update button is pressed', async () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      const input = getByTestId('input-text') as HTMLInputElement;

      act(() => {
        userEvent.clear(input);
        userEvent.type(input, 'Hello');
      });

      const updateButton = getByTestId('update-button');

      act(() => {
        userEvent.click(updateButton);
      });

      expect(input.value).toBe('HELL');
      expect(defaultProps.handleClickUpload).toHaveBeenCalledTimes(1);
      expect(defaultProps.handleClickUpload).toHaveBeenCalledWith(
        expect.any(String),
        'HELL', // max text len is 4
        'B400',
        false,
      );
    });

    test('Should pass correct paramters to "handleClickUpload" when different color is chosen', async () => {
      const { getByTestId, getByLabelText } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      const input = getByTestId('input-text');
      const greenColor = getByLabelText('Green');

      act(() => {
        userEvent.click(greenColor);
        userEvent.clear(input);
        userEvent.type(input, 'Hello');
      });

      const updateButton = getByTestId('update-button');

      act(() => {
        userEvent.click(updateButton);
      });

      expect(defaultProps.handleClickUpload).toHaveBeenCalledTimes(1);
      expect(defaultProps.handleClickUpload).toHaveBeenCalledWith(
        expect.any(String),
        'HELL',
        'G400',
        false,
      );
    });

    test('Should not call "handleClickUpload" when text is empty and show error', async () => {
      const { getByTestId, getByLabelText } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      const input = getByTestId('input-text');
      const greenColor = getByLabelText('Green');

      act(() => {
        userEvent.click(greenColor);
        userEvent.clear(input);
      });

      const updateButton = getByTestId('update-button');

      act(() => {
        userEvent.click(updateButton);
      });

      expect(defaultProps.handleClickUpload).toHaveBeenCalledTimes(0);
    });
  });

  describe('handleClickCancel prop', () => {
    test('Should call "handleClickCancel" when cancel button is pressed', async () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      const cancelButton = getByTestId('cancel-button');

      act(() => {
        userEvent.click(cancelButton);
      });

      expect(defaultProps.handleClickCancel).toHaveBeenCalledTimes(1);
    });

    test('Should call "handleClickCancel" when clicked outside of modal', async () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      const blanket = getByTestId('modal--blanket');

      act(() => {
        userEvent.click(blanket);
      });

      expect(defaultProps.handleClickCancel).toHaveBeenCalledTimes(1);
    });

    test('Should call "handleClickCancel" when escape is pressed', async () => {
      render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      // The regular escape event
      const escapeKeyDownEvent: KeyboardEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
      });

      document.dispatchEvent(escapeKeyDownEvent);
      expect(defaultProps.handleClickCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('maxInitialLength prop', () => {
    it('Should default to 4 maximum characters', () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      const input = getByTestId('input-text') as HTMLInputElement;

      act(() => {
        userEvent.clear(input);
        userEvent.type(input, 'More than four characters');
      });

      expect(input.value).toBe('MORE');
    });

    it('Should allow to enter more than 4 (default value) if provided', () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} maxInitialLength={8} />
        </IntlProvider>,
      );

      const input = getByTestId('input-text') as HTMLInputElement;

      act(() => {
        userEvent.clear(input);
        userEvent.type(input, 'Hello World');
      });

      expect(input.value).toBe('HELLO WO');
    });

    it('Should show correct placeholder text with "maxInitialLength"', () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} maxInitialLength={8} />
        </IntlProvider>,
      );

      const input = getByTestId('input-text') as HTMLInputElement;

      act(() => {
        userEvent.clear(input);
      });

      expect(input.placeholder).toBe('Enter up to 8 initials');
    });
  });

  describe('fullName prop', () => {
    test('Should render empty string in the input', async () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} fullName="Super Clark Kent Man" />
        </IntlProvider>,
      );
      const input = getByTestId('input-text') as HTMLInputElement;
      expect(input.value).toEqual('');
    });
  });

  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });

  describe('manageProfileLink property', () => {
    test('Should show link when prop is not null', async () => {
      const { findByText } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} manageProfileLink={'#'} />
        </IntlProvider>,
      );
      const manageProfile = await findByText('Manage your profile visibility');
      expect(manageProfile).toBeTruthy();
    });

    test('Should hide link when prop is null', async () => {
      const { queryByText } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );
      expect(queryByText('Manage your profile visibility')).toBeNull();
    });
  });

  describe('errors', () => {
    test('Should show and remove error', async () => {
      const { getByTestId, getByText, queryByText } = render(
        <IntlProvider locale="en">
          <Editor {...defaultProps} />
        </IntlProvider>,
      );

      const input = getByTestId('input-text');

      act(() => {
        userEvent.clear(input);
      });

      const updateButton = getByTestId('update-button');

      act(() => {
        userEvent.click(updateButton);
      });

      const error = getByText('Please enter at least 1 initial');
      expect(error).toBeTruthy();

      act(() => {
        userEvent.clear(input);
        userEvent.type(input, 'Hello');
      });

      expect(queryByText('Manage your profile visibility')).toBeNull();
    });
  });
});
