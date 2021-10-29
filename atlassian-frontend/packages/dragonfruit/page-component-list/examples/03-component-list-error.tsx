import React from 'react';

import { MockedProvider } from '@apollo/client/testing';

import { FlagsProvider } from '@atlaskit/flag';
import { MockedTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import {
  CompassIntlProvider,
  ComponentListTypeUrlParam,
} from '@atlassian/dragonfruit-utils';

import { ComponentListPage } from '../src/ui';

export default () => (
  <CompassIntlProvider locale="en">
    <FlagsProvider>
      <MockedTenantInfoProvider>
        <MockedProvider addTypename={false}>
          <ComponentListPage
            componentType={ComponentListTypeUrlParam.SERVICES}
          />
        </MockedProvider>
      </MockedTenantInfoProvider>
    </FlagsProvider>
  </CompassIntlProvider>
);
