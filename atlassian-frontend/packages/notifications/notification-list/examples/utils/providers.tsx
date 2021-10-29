import React, { useRef } from 'react';

import { IntlProvider } from 'react-intl';

import {
  Client as SmartCardClient,
  Provider as SmartCardProvider,
} from '@atlaskit/smart-card';
import {
  ExperienceTracker,
  ExperienceTrackerContext,
} from '@atlassian/experience-tracker';

import { ProfileClientContextProvider } from '../../src/common/ui/profile-client-context';

type Props = {
  children: React.ReactNode;
  locale?: string;
};

const Providers = ({ children, locale = 'en' }: Props) => {
  const experienceTracker = useRef(new ExperienceTracker());

  return (
    <IntlProvider locale={locale}>
      <SmartCardProvider client={new SmartCardClient('staging')}>
        <ProfileClientContextProvider>
          <ExperienceTrackerContext.Provider value={experienceTracker.current}>
            {children}
          </ExperienceTrackerContext.Provider>
        </ProfileClientContextProvider>
      </SmartCardProvider>
    </IntlProvider>
  );
};

export default Providers;
