import React, { ReactElement } from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { IntlProvider } from 'react-intl';

import { FlagsProvider } from '@atlaskit/flag';
import { MockedTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';

import ServiceRelationshipGraph from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => <FlagsProvider>{storyFn()}</FlagsProvider>,
    (storyFn: () => ReactElement) => (
      <IntlProvider locale="en">{storyFn()}</IntlProvider>
    ),
    (storyFn: () => ReactElement) => (
      <MockedTenantInfoProvider>{storyFn()}</MockedTenantInfoProvider>
    ),
  ],
};

export const ServiceRelationshipGraphSuccess = () => (
  <MockedTenantInfoProvider>
    <MockedProvider addTypename={false}>
      <ServiceRelationshipGraph componentId={'id'} />
    </MockedProvider>
  </MockedTenantInfoProvider>
);

ServiceRelationshipGraphSuccess.displayName =
  'Service Relationship Graph Success';
