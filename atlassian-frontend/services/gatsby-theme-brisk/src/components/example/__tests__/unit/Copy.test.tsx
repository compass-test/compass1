import React from 'react';

import { fireEvent, render, wait } from '@testing-library/react';

import Copy, { TOOLTIP_MESSAGE } from '../../actions/Copy';

const TEST_SOURCE = `
import React from 'react';

import Button from '@atlaskit/button';

export default () => <Button>Default button</Button>;
`;

const TEST_COMPONENT = <Copy source={TEST_SOURCE} />;

describe('Copy action', () => {
  const writeText = jest.fn();

  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });
  });

  afterEach(() => {
    writeText.mockRestore();
  });

  it('should have a prompt message by default', () => {
    const { container } = render(TEST_COMPONENT);

    const actionButton = container.querySelector('button');
    expect(actionButton).toHaveAttribute('aria-label', TOOLTIP_MESSAGE.PROMPT);
  });

  it('should call writeText with source content when clicked', () => {
    const { container } = render(TEST_COMPONENT);

    writeText.mockReturnValue(Promise.resolve());

    const actionButton = container.querySelector('button');

    expect(writeText).not.toHaveBeenCalled();
    fireEvent.click(actionButton);
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(TEST_SOURCE);
  });

  it('should have a copied message when successful', async () => {
    const { container } = render(TEST_COMPONENT);

    writeText.mockReturnValue(Promise.resolve());

    const actionButton = container.querySelector('button');

    fireEvent.click(actionButton);
    await wait(() =>
      expect(actionButton).toHaveAttribute(
        'aria-label',
        TOOLTIP_MESSAGE.SUCCESS,
      ),
    );
  });

  it('should have an error message when it fails', async () => {
    const { container } = render(TEST_COMPONENT);

    writeText.mockReturnValue(Promise.reject());

    const actionButton = container.querySelector('button');

    fireEvent.click(actionButton);
    await wait(() =>
      expect(actionButton).toHaveAttribute(
        'aria-label',
        TOOLTIP_MESSAGE.FAILURE,
      ),
    );
  });

  it('should reset message on hover', async () => {
    const { container } = render(TEST_COMPONENT);

    writeText.mockReturnValue(Promise.resolve());

    const actionButton = container.querySelector('button');

    fireEvent.click(actionButton);
    await wait(() =>
      expect(actionButton).toHaveAttribute(
        'aria-label',
        TOOLTIP_MESSAGE.SUCCESS,
      ),
    );

    fireEvent.mouseOver(actionButton);
    await wait(() =>
      expect(actionButton).toHaveAttribute(
        'aria-label',
        TOOLTIP_MESSAGE.PROMPT,
      ),
    );
  });

  it('should reset message on focus', async () => {
    const { container } = render(TEST_COMPONENT);

    writeText.mockReturnValue(Promise.resolve());

    const actionButton = container.querySelector('button');

    fireEvent.click(actionButton);
    await wait(() =>
      expect(actionButton).toHaveAttribute(
        'aria-label',
        TOOLTIP_MESSAGE.SUCCESS,
      ),
    );

    fireEvent.focus(actionButton);
    await wait(() =>
      expect(actionButton).toHaveAttribute(
        'aria-label',
        TOOLTIP_MESSAGE.PROMPT,
      ),
    );
  });
});
