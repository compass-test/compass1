import React, { ReactElement } from 'react';

import { boolean, number, radios } from '@storybook/addon-knobs';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import {
  CompassLinkType,
  MAX_COMPASS_LINKS_PER_SECTION,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  getFakeLinks,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { compassLinkTypes, LinkListPosition } from '../../common/test-utils';

import { LinkSection, Props } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => {
      return <div>{storyFn()}</div>;
    },
  ],
  excludeStories: 'LinkSectionTemplate',
};

const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';
const MOCK_COMPONENT_NAME = 'Mock Component';
const MOCK_LINKS = getFakeLinks(CompassLinkType.DOCUMENT, 2);

export const LinkSectionTemplate = ({
  componentId = MOCK_COMPONENT_ID,
  componentName = MOCK_COMPONENT_NAME,
  links = MOCK_LINKS,
  linkType = CompassLinkType.DOCUMENT,
  dataManager,
  position = 'main',
}: Partial<Props>) => (
  <CompassTestProvider>
    <ApolloAutoMockProvider>
      <LinkSection
        componentId={componentId}
        componentName={componentName}
        links={links}
        linkType={linkType}
        dataManager={dataManager}
        position={position}
      />
    </ApolloAutoMockProvider>
  </CompassTestProvider>
);

const containerWidthLabel = 'Container Width';
const containerWidthOptions = { width_600px: '600px', width_264px: '264px' };
const containerWidthDefaultValue = '600px';
const containerWidthGroupId = 'ContainerWidth';

export const Example = () => {
  const label = 'Link type';
  const defaultValue = CompassLinkType.REPOSITORY;
  const compassLinkType: CompassLinkType = radios(
    label,
    compassLinkTypes,
    defaultValue,
  );
  const numberOfLinks = number('Number of links', 2, {
    range: true,
    min: 0,
    max: MAX_COMPASS_LINKS_PER_SECTION,
  });
  const containerWidth: string = radios(
    containerWidthLabel,
    containerWidthOptions,
    containerWidthDefaultValue,
    containerWidthGroupId,
  );
  const isExternallyManaged = boolean('Externally managed', false);
  const position = radios(
    'Position',
    LinkListPosition,
    LinkListPosition.Main,
  ) as Props['position'];

  const links = getFakeLinks(compassLinkType, numberOfLinks);
  const dataManager = isExternallyManaged ? mockDataManager : undefined;

  return (
    <div style={{ width: containerWidth }}>
      <LinkSectionTemplate
        linkType={compassLinkType}
        links={links}
        dataManager={dataManager}
        position={position}
      />
    </div>
  );
};
