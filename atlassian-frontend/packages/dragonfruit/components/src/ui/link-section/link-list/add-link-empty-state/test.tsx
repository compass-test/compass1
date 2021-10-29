import React from 'react';

import { screen } from '@testing-library/dom';
import { fireEvent, render, wait } from '@testing-library/react';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import { CompassLinkType } from '@atlassian/dragonfruit-graphql';

import { default as disabledMessages } from './disabled-ui/messages';
import { AddLinkEmptyStateTemplate } from './examples';

describe('AddLinkEmptyState', () => {
  it('is a button and can be clicked', async () => {
    const callback = jest.fn();

    render(
      <AddLinkEmptyStateTemplate
        type={CompassLinkType.REPOSITORY}
        onClick={callback}
      />,
    );

    // Verify that we have an aria-label component
    const addLinkButton = await screen.findByLabelText('Add a link');
    expect(addLinkButton).toBeInTheDocument();
    addLinkButton.click();

    expect(callback).toBeCalledTimes(1);
  });

  it('does not display add link text when disabled', async () => {
    const onClickFn = jest.fn();
    render(
      <AddLinkEmptyStateTemplate
        onClick={onClickFn}
        type={CompassLinkType.CHAT_CHANNEL}
        dataManager={mockDataManager}
      />,
    );

    // Make sure the add Link aria label does not appear
    const addLinkButton = await screen.queryByLabelText('Add a link');
    expect(addLinkButton).not.toBeInTheDocument();
  });

  it('should call not onClick when disabled', async () => {
    const onClickFn = jest.fn();
    const { getByText } = render(
      <AddLinkEmptyStateTemplate
        onClick={onClickFn}
        type={CompassLinkType.REPOSITORY}
        dataManager={mockDataManager}
      />,
    );

    const disabledLabelText =
      disabledMessages.firstRepositoryDisabled.defaultMessage;
    const disabledLabel = getByText(disabledLabelText) as HTMLElement;
    fireEvent.click(disabledLabel);

    // Make sure the label does exist
    expect(disabledLabel).not.toBeNull();

    // Make sure the onClick is ignored when disabled
    await wait(() => expect(onClickFn).toHaveBeenCalledTimes(0));
  });
});
