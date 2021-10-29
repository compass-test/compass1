import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import { UI_COMPONENT_CONTACT_CARD_HIDE_ONCALL_NONSERVICE } from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponentType,
  CompassLink,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  getFakeLinks,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentContactCard from './main';

const feature_flags = {
  [UI_COMPONENT_CONTACT_CARD_HIDE_ONCALL_NONSERVICE]: true,
};

describe('ComponentContactCard', () => {
  let document: RenderResult;
  const testId = 'component-contact-card';
  const commsLinks: CompassLink[] = getFakeLinks(
    CompassLinkType.CHAT_CHANNEL,
    2,
  );
  const onCallLinks: CompassLink[] = getFakeLinks(CompassLinkType.ON_CALL, 2);
  const repositoryLinks: CompassLink[] = getFakeLinks(
    CompassLinkType.REPOSITORY,
    2,
  );
  const links = commsLinks.concat(onCallLinks, repositoryLinks);
  describe('render with both chat links and on-call links for service type component', () => {
    beforeEach(() => {
      document = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider flags={feature_flags} locale="en">
            <ComponentContactCard
              componentId="fake-component-id"
              componentName="Example Name"
              componentType={CompassComponentType.SERVICE}
              links={links}
              testId={testId}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );
    });

    test('Should be found by data-testid', () => {
      expect(document.getByTestId(testId)).toBeTruthy();
    });

    test("Should have only 'ON_CALL' and 'CHAT_CHANNEL' compass link types", () => {
      expect(document.getByText(commsLinks[0].url)).toBeInTheDocument();
      expect(document.getByText(commsLinks[1].url)).toBeInTheDocument();
      expect(document.getByText(onCallLinks[0].url)).toBeInTheDocument();
      expect(document.getByText(onCallLinks[1].url)).toBeInTheDocument();
      expect(document.queryByText(repositoryLinks[0].url)).toBeNull();
    });

    test('should render correct header', () => {
      expect(document.queryByText('Component contacts')).toBeInTheDocument();
    });
  });

  describe('hide on-call links for non-service type component', () => {
    test("Should have only 'CHAT_CHANNEL' compass link for Library type component", () => {
      document = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider flags={feature_flags} locale="en">
            <ComponentContactCard
              componentId="fake-component-id"
              componentName="Example Name"
              componentType={CompassComponentType.LIBRARY}
              links={links}
              testId={testId}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );
      expect(document.getByText(commsLinks[0].url)).toBeInTheDocument();
      expect(document.getByText(commsLinks[1].url)).toBeInTheDocument();
      expect(document.queryByText(onCallLinks[0].url)).toBeNull();
      expect(document.queryByText(onCallLinks[1].url)).toBeNull();
    });
  });

  describe('render with no links', () => {
    test('Should display description for each link type', () => {
      const { queryByText } = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider flags={feature_flags} locale="en">
            <ComponentContactCard
              componentId="fake-component-id"
              componentName="Example Name"
              componentType={CompassComponentType.SERVICE}
              links={[]}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      expect(
        queryByText(
          'Chat channels are where people can get help with this component.',
        ),
      ).toBeInTheDocument();
      expect(
        queryByText(
          `On-call schedules show who's handling incidents for this team.`,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('render with only chat links', () => {
    test('Should display chat links and description for on-call links', () => {
      const { queryByText } = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider flags={feature_flags} locale="en">
            <ComponentContactCard
              componentId="fake-component-id"
              componentName="Example Name"
              componentType={CompassComponentType.SERVICE}
              links={commsLinks}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      expect(document.getByText(commsLinks[0].url)).toBeInTheDocument();
      expect(document.getByText(commsLinks[1].url)).toBeInTheDocument();
      expect(
        queryByText(
          `On-call schedules show who's handling incidents for this team.`,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('when managed by bitbucket connect app', () => {
    beforeEach(() => {
      document = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider flags={feature_flags} locale="en">
            <ComponentContactCard
              componentId="fake-component-id"
              componentName="Example Name"
              componentType={CompassComponentType.SERVICE}
              links={links}
              testId={testId}
              dataManager={mockDataManager}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );
    });

    test('Should be found by data-testid', () => {
      expect(document.getByTestId(testId)).toBeTruthy();
    });

    test('should not have add links', () => {
      expect(document.queryByText('Add chat links')).not.toBeInTheDocument();
      expect(
        document.queryByText('Add on-call schedules'),
      ).not.toBeInTheDocument();
    });
  });
});
