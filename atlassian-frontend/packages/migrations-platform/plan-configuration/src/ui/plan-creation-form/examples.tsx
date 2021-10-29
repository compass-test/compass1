import React, { useState } from 'react';

import { IntlProvider } from 'react-intl';

import { cloudSites } from './cloud-site-field-select/mocks';
import { CloudSite } from './cloud-site-field-select/types';

import { PlanCreationForm } from './index';

export const PlanCreationFormBasic = () => {
  const [site, setSite] = useState<CloudSite>();
  return (
    <IntlProvider locale="en">
      <PlanCreationForm
        productMeta={{ productName: 'Jira', cloudDestination: 'cloud site' }}
        planName="My plan"
        planNameValidation="None"
        plansUrl="https://confluence.atlassian.com/adminjiracloud/jira-cloud-plans-972338880.html"
        cloudSiteOptions={cloudSites}
        cloudSite={site}
        isCloudSiteLoading={false}
        onCloudSiteChange={setSite}
        onPlanNameChange={() => {}}
        getMigrationGatewayUrl={() => Promise.resolve('')}
        getCloudTrialUrl={() => Promise.resolve('getCloudTrialUrl')}
      />
    </IntlProvider>
  );
};
