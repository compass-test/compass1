import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';

import { AddLinkEmptyDisabledStateTemplate } from './examples';

describe('AddLinkEmptyDisabledState', () => {
  describe.each`
    componentLinkType               | expectedLabel
    ${CompassLinkType.CHAT_CHANNEL} | ${'Add in compass.yml'}
    ${CompassLinkType.DASHBOARD}    | ${'Add dashboards in compass.yml'}
    ${CompassLinkType.DOCUMENT}     | ${'Add documentation in compass.yml'}
    ${CompassLinkType.ON_CALL}      | ${'Add in compass.yml'}
    ${CompassLinkType.OTHER_LINK}   | ${'Add other links in compass.yml'}
    ${CompassLinkType.PROJECT}      | ${'Add projects in compass.yml'}
    ${CompassLinkType.REPOSITORY}   | ${'Add repositories in compass.yml'}
  `(
    'component link type: "$componentLinkType"',
    ({ componentLinkType, expectedLabel }) => {
      describe('when href is provided', () => {
        it('should show "$expectedLabel" as the label and open link in a new tab when clicked on', async () => {
          render(
            <AddLinkEmptyDisabledStateTemplate
              type={componentLinkType}
              href="https://atlaskit.atlassian.com/"
            />,
          );

          // Mock and track calls to `window.open`
          const windowOpenSpy = jest.spyOn(window, 'open');

          // Check that empty state has the correct label and opens a new tab when clicked on
          const emptyState = await screen.findByText(expectedLabel);
          emptyState.click();
          expect(windowOpenSpy).toBeCalledTimes(1);

          // Restore `window.open` so that its invocation count does not accumulate across tests
          windowOpenSpy.mockRestore();
        });
      });

      describe('when href is not provided', () => {
        it('should show "$expectedLabel" as the label and not behave like a link when clicked on', async () => {
          render(
            <AddLinkEmptyDisabledStateTemplate
              type={componentLinkType}
              href=""
            />,
          );

          // Mock and track calls to `window.open`
          const windowOpenSpy = jest.spyOn(window, 'open');

          // Check that empty state has the correct label and does not open a new tab when clicked on
          const emptyState = await screen.findByText(expectedLabel);
          emptyState.click();
          expect(windowOpenSpy).toBeCalledTimes(0);

          // Restore `window.open`
          windowOpenSpy.mockRestore();
        });
      });
    },
  );
});
