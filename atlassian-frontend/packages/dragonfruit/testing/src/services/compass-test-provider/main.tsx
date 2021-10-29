import React, { ReactNode } from 'react';

import { FlagsProvider } from '@atlaskit/flag';
import {
  ProviderProps,
  Provider as SmartLinksProvider,
} from '@atlaskit/smart-card';
import {
  FlagMap,
  MockFeatureFlagClientProvider,
} from '@atlassian/dragonfruit-feature-flags';
import { FieldDefinitionsProvider } from '@atlassian/dragonfruit-field-definitions-context';
import { MockedTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

// Storybook has trouble with error analytics unless we do this
// @ts-ignore
global.__SERVER__ = false;

export type CompassProviderProps = {
  locale?: string;
  children: ReactNode;
  smartLinksProviderClient?: ProviderProps['client'];
  flags?: FlagMap;
};

export function CompassTestProvider(props: CompassProviderProps) {
  const { children, locale, flags, smartLinksProviderClient } = props;

  return (
    <MockFeatureFlagClientProvider flags={flags}>
      <MockedTenantInfoProvider>
        <CompassIntlProvider locale={locale || 'en'}>
          <FlagsProvider>
            <SmartLinksProvider client={smartLinksProviderClient}>
              <FieldDefinitionsProvider>{children}</FieldDefinitionsProvider>
            </SmartLinksProvider>
          </FlagsProvider>
        </CompassIntlProvider>
      </MockedTenantInfoProvider>
    </MockFeatureFlagClientProvider>
  );
}
