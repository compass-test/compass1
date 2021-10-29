import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';

import { AddLinkEmptyEnabledStateTemplate } from './examples';

describe('AddLinkEmptyEnabledState', () => {
  describe.each`
    componentLinkType               | expectedLabel
    ${CompassLinkType.CHAT_CHANNEL} | ${'Add chat links'}
    ${CompassLinkType.DASHBOARD}    | ${'Add the dashboards that have information about this component'}
    ${CompassLinkType.DOCUMENT}     | ${'Add documentation like runbooks, internal process docs, or specifications'}
    ${CompassLinkType.ON_CALL}      | ${'Add on-call schedules'}
    ${CompassLinkType.OTHER_LINK}   | ${'Add any other relevant links'}
    ${CompassLinkType.PROJECT}      | ${'Add a project to link this component with a Jira project'}
    ${CompassLinkType.REPOSITORY}   | ${'Add the repository where the code is stored for this component'}
  `(
    'component link type: "$componentLinkType"',
    ({ componentLinkType, expectedLabel }) => {
      it('should show "$expectedLabel" as the label and fire `onClick` when clicked on', async () => {
        const onClick = jest.fn();

        render(
          <AddLinkEmptyEnabledStateTemplate
            type={componentLinkType}
            onClick={onClick}
          />,
        );

        // Check that empty state has the correct label and fires the `onClick` function when clicked on
        const emptyState = await screen.findByText(expectedLabel);
        emptyState.click();
        expect(onClick).toBeCalledTimes(1);
      });
    },
  );
});
