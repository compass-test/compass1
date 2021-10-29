import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';

import CopyableText from '../index';

describe('<CopyableText />', () => {
  // TODO: Move to jest spy when available to do so
  let originalExecCommand: (
    commandId: string,
    showUI?: boolean,
    value?: string,
  ) => boolean;
  const spiedExecCommand: jest.Mock = jest.fn();

  beforeAll(() => {
    originalExecCommand = document.execCommand;
    document.execCommand = spiedExecCommand;
  });

  afterEach(() => {
    spiedExecCommand.mockReset();
  });

  afterAll(() => {
    document.execCommand = originalExecCommand;
  });

  it('should activate the copy functionality when the copy button is pushed', async () => {
    const defaultProps = {
      text: 'I copied this',
    };

    const { findByRole, getByText } = render(
      <CopyableText {...defaultProps} />,
    );

    const textContext = getByText('I copied this');
    act(() => {
      fireEvent.mouseEnter(textContext);
    });

    const copyableIcon = await findByRole('img');
    act(() => {
      fireEvent.click(copyableIcon);
    });

    const copiedTextIcon = await findByRole('img');
    expect(copiedTextIcon).toBeInTheDocument();

    expect(spiedExecCommand).toHaveBeenCalledWith('copy');
  });
});
