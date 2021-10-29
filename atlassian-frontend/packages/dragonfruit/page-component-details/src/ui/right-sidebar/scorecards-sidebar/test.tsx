import React from 'react';

import { render } from '@testing-library/react';

import { UI_COMPONENT_CONTACT_CARD } from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponentDetailViewFragment,
  CompassComponentType,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardsSidebar } from './index';

const links = [
  {
    url: 'https://google.com',
    name: 'Google',
    id: 'fake-id',
    type: CompassLinkType.REPOSITORY,
  },
  {
    id: 'google-id',
    name: 'Google',
    url: 'https://google.com',
    type: CompassLinkType.ON_CALL,
  },
  {
    id: 'youtube-id',
    name: 'Youtube',
    url: 'https://youtube.com',
    type: CompassLinkType.REPOSITORY,
  },
  {
    id: 'facebook-id',
    name:
      'This is a link with an extremely long name for testing purposes. This is more text to pad the title.',
    url: 'https://facebook.com',
    type: CompassLinkType.REPOSITORY,
  },
  {
    id: 'confluence-id',
    name: 'Confluence',
    url: 'https://www.atlassian.com/software/confluence',
    type: CompassLinkType.CHAT_CHANNEL,
  },
  {
    id: 'github-id',
    name: 'Github',
    url: 'https://github.com',
    type: CompassLinkType.PROJECT,
  },
];

describe('ComponentDetailsScorecardsSidebar', () => {
  describe('when successful', () => {
    it('can see the desired CHAT_CHANNEL and ON_CALL links when feature flag enabled', async () => {
      const component: CompassComponentDetailViewFragment = {
        name: 'Lorem ipsum',
        id:
          'ari:cloud:compass:4958bb5d-3970-4a13-bebc-62bbca57f370:component/5ce8c075-7b72-4455-9be9-7f0a1c6e6db4/a60d9b0f-fa86-436c-b3c2-0eece8e94fdb',
        type: CompassComponentType.SERVICE,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris leo nisi, ultricies gravida orci ut, maximus auctor orci. Morbi venenatis.',
        ownerId: 'someownerarigoeshere',
        links: links,
      };

      const flags = {
        [UI_COMPONENT_CONTACT_CARD]: true,
      };

      // Render the page
      const { queryByText } = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider flags={flags} locale="en">
            <ScorecardsSidebar component={component} />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      expect(
        queryByText('https://www.atlassian.com/software/confluence'),
      ).toBeInTheDocument();
      expect(queryByText('https://google.com')).toBeInTheDocument();
      expect(queryByText('https://youtube.com')).not.toBeInTheDocument();
    });

    it('cannot see the desired CHAT_CHANNEL and ON_CALL links when feature flag disabled', async () => {
      const component: CompassComponentDetailViewFragment = {
        name: 'Lorem ipsum',
        id:
          'ari:cloud:compass:4958bb5d-3970-4a13-bebc-62bbca57f370:component/5ce8c075-7b72-4455-9be9-7f0a1c6e6db4/a60d9b0f-fa86-436c-b3c2-0eece8e94fdb',
        type: CompassComponentType.SERVICE,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris leo nisi, ultricies gravida orci ut, maximus auctor orci. Morbi venenatis.',
        ownerId: 'someownerarigoeshere',
        links: links,
      };

      // Render the page
      const { queryByText } = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider locale="en">
            <ScorecardsSidebar component={component} />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      expect(
        queryByText('https://www.atlassian.com/software/confluence'),
      ).not.toBeInTheDocument();
      expect(queryByText('https://google.com')).not.toBeInTheDocument();
    });
  });
});
