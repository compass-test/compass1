import React, { ReactElement } from 'react';

import { boolean, number, radios } from '@storybook/addon-knobs';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import {
  CompassLink,
  CompassLinkType,
  MAX_COMPASS_LINKS_PER_SECTION,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  FakeCompassDashboardLink,
  FakeCompassProjectLink,
  getFakeLinks,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { compassLinkTypes, LinkListPosition } from '../../../common/test-utils';

import { LinkList, Props } from './index';

export default {
  decorators: [(storyFn: () => ReactElement) => <div>{storyFn()}</div>],
  excludeStories: 'LinkListTemplate',
};

const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';
const MOCK_COMPONENT_NAME = 'Mock Component';
const MOCK_LINKS: CompassLink[] = [
  ...getFakeLinks(CompassLinkType.REPOSITORY, 3),
  FakeCompassDashboardLink(),
  FakeCompassProjectLink(),
];

export const LinkListTemplate = ({
  componentId = MOCK_COMPONENT_ID,
  componentName = MOCK_COMPONENT_NAME,
  links = MOCK_LINKS,
  type = CompassLinkType.DOCUMENT,
  dataManager,
  position = 'main',
  maxLinks = MAX_COMPASS_LINKS_PER_SECTION,
}: Partial<Props>) => (
  <CompassTestProvider>
    <ApolloAutoMockProvider>
      <LinkList
        componentId={componentId}
        componentName={componentName}
        links={links}
        type={type}
        dataManager={dataManager}
        position={position}
        maxLinks={maxLinks}
      />
    </ApolloAutoMockProvider>
  </CompassTestProvider>
);

export const Example = () => {
  const hasLinks = boolean('Has links', true);

  const label = 'Link type';
  const defaultValue = CompassLinkType.REPOSITORY;
  const compassLinkType: CompassLinkType = radios(
    label,
    compassLinkTypes,
    defaultValue,
  );

  const isExternallyManaged = boolean('Externally managed', false);
  const position = radios(
    'Position',
    LinkListPosition,
    LinkListPosition.Main,
  ) as Props['position'];
  const maxLinks = number('Link limit', MAX_COMPASS_LINKS_PER_SECTION);

  const links = hasLinks ? MOCK_LINKS : [];
  const dataManager = isExternallyManaged ? mockDataManager : undefined;

  return (
    <LinkListTemplate
      links={links}
      type={compassLinkType}
      dataManager={dataManager}
      position={position}
      maxLinks={maxLinks}
    />
  );
};
