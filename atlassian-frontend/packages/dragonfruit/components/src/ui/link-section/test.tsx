import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassLink, CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { getFakeLink } from '@atlassian/dragonfruit-graphql/mocks';

import { LinkSectionTemplate } from './examples';

const MOCK_LINKS: CompassLink[] = [];
Object.values(CompassLinkType).forEach((linkType) =>
  MOCK_LINKS.push(getFakeLink(linkType)),
);

describe('LinkSection', () => {
  it.each`
    componentLinkType               | expectedHeading        | expectedLinkName
    ${CompassLinkType.CHAT_CHANNEL} | ${'Chat channels'}     | ${'#Compass'}
    ${CompassLinkType.DASHBOARD}    | ${'Dashboards'}        | ${'Splunk'}
    ${CompassLinkType.DOCUMENT}     | ${'Documentation'}     | ${'Confluence'}
    ${CompassLinkType.ON_CALL}      | ${'On-call schedules'} | ${'Opsgenie'}
    ${CompassLinkType.OTHER_LINK}   | ${'Other links'}       | ${'Atlassian'}
    ${CompassLinkType.PROJECT}      | ${'Projects'}          | ${'Jira Project'}
    ${CompassLinkType.REPOSITORY}   | ${'Repositories'}      | ${'Bitbucket'}
  `(
    'should show only links of type $componentLinkType with "$expectedHeading" as the section heading',
    async ({ componentLinkType, expectedHeading, expectedLinkName }) => {
      render(
        <LinkSectionTemplate linkType={componentLinkType} links={MOCK_LINKS} />,
      );

      // Check section heading
      const section = await screen.findByRole('region', {
        name: expectedHeading,
      });
      expect(section).toBeInTheDocument();

      // Check that the links are correctly filtered by type
      const links = screen.getAllByRole('listitem');
      expect(links.length).toBe(1);
      expect(links[0]).toHaveAttribute(
        'data-smart-link-name',
        expectedLinkName,
      );
    },
  );
});
