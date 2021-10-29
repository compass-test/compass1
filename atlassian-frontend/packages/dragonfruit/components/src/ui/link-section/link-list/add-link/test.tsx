import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { AddLinkTemplate } from './examples';

describe('AddLink', () => {
  it('is a button and can be clicked', async () => {
    const callback = jest.fn();

    render(
      <CompassTestProvider>
        <AddLinkTemplate type={CompassLinkType.REPOSITORY} onClick={callback} />
      </CompassTestProvider>,
    );

    // Verify that we have an aria-label component
    const addLinkButton = await screen.findByLabelText('Add a link');
    expect(addLinkButton).toBeInTheDocument();

    // In pollinator test we look for the button on the section
    const button = await screen.findByRole('button');
    button.click();

    expect(callback).toBeCalledTimes(1);
  });

  describe.each`
    componentLinkType               | expectedLabel
    ${CompassLinkType.CHAT_CHANNEL} | ${'Add chat links'}
    ${CompassLinkType.DASHBOARD}    | ${'Add dashboard'}
    ${CompassLinkType.DOCUMENT}     | ${'Add document'}
    ${CompassLinkType.ON_CALL}      | ${'Add on-call schedules'}
    ${CompassLinkType.OTHER_LINK}   | ${'Add other link'}
    ${CompassLinkType.PROJECT}      | ${'Add project'}
    ${CompassLinkType.REPOSITORY}   | ${'Add repository'}
  `(
    'component link type: "$componentLinkType"',
    ({ componentLinkType, expectedLabel }) => {
      it('should show "$expectedLabel" as the label and fire `onClick` when clicked on', async () => {
        const onClick = jest.fn();

        render(<AddLinkTemplate type={componentLinkType} onClick={onClick} />);

        const emptyState = await screen.findByText(expectedLabel);
        emptyState.click();
        expect(onClick).toBeCalledTimes(1);
      });
    },
  );
});
