import React, { ReactElement } from 'react';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import { UI_COMPONENT_CONTACT_CARD_HIDE_ONCALL_NONSERVICE } from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponentType,
  CompassLink,
  CompassLinkType,
  MAX_COMPASS_LINKS_PER_SECTION,
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

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <ApolloAutoMockProvider>
        <CompassTestProvider flags={feature_flags} locale="en">
          <div style={{ width: '264px' }}>{storyFn()}</div>
        </CompassTestProvider>
      </ApolloAutoMockProvider>
    ),
  ],
};

export const SimpleExample = () => {
  const commsLinks: CompassLink[] = getFakeLinks(
    CompassLinkType.CHAT_CHANNEL,
    2,
  );
  const onCallLinks: CompassLink[] = getFakeLinks(CompassLinkType.ON_CALL, 2);
  const links = commsLinks.concat(onCallLinks);
  return (
    <ComponentContactCard
      componentId="fake-component-id"
      componentName="Example Name"
      componentType={CompassComponentType.SERVICE}
      links={links}
    />
  );
};

export const NonServiceComponentExample = () => {
  const commsLinks: CompassLink[] = getFakeLinks(
    CompassLinkType.CHAT_CHANNEL,
    2,
  );
  const onCallLinks: CompassLink[] = getFakeLinks(CompassLinkType.ON_CALL, 2);
  const links = commsLinks.concat(onCallLinks);
  return (
    <ComponentContactCard
      componentId="fake-component-id"
      componentName="Example Name"
      componentType={CompassComponentType.LIBRARY}
      links={links}
    />
  );
};

export const EmptyCardExample = () => (
  <ComponentContactCard
    componentId="fake-component-id"
    componentName="Example Name"
    componentType={CompassComponentType.SERVICE}
    links={[]}
  />
);

export const CommsOnlyExample = () => {
  const commsLinks: CompassLink[] = getFakeLinks(
    CompassLinkType.CHAT_CHANNEL,
    2,
  );
  return (
    <ComponentContactCard
      componentId="fake-component-id"
      componentName="Example Name"
      componentType={CompassComponentType.SERVICE}
      links={commsLinks}
    />
  );
};

export const CommsReachLimitExample = () => {
  const commsLinks: CompassLink[] = getFakeLinks(
    CompassLinkType.CHAT_CHANNEL,
    MAX_COMPASS_LINKS_PER_SECTION,
  );
  const onCallLinks: CompassLink[] = getFakeLinks(CompassLinkType.ON_CALL, 2);
  const links = commsLinks.concat(onCallLinks);
  return (
    <ComponentContactCard
      componentId="fake-component-id"
      componentName="Example Name"
      componentType={CompassComponentType.SERVICE}
      links={links}
    />
  );
};

export const DisabledExample = () => {
  const commsLinks: CompassLink[] = getFakeLinks(
    CompassLinkType.CHAT_CHANNEL,
    2,
  );
  const onCallLinks: CompassLink[] = getFakeLinks(CompassLinkType.ON_CALL, 2);
  const links = commsLinks.concat(onCallLinks);
  return (
    <ComponentContactCard
      componentId="fake-component-id"
      componentName="Example Name"
      componentType={CompassComponentType.SERVICE}
      links={links}
      dataManager={mockDataManager}
    />
  );
};
