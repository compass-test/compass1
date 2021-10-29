import React from 'react';

import { IntegrationDetails } from '../src/ui/integration-picker/integration-details';

export default function () {
  const id = 'com.atlassian.jira.slack';
  return <IntegrationDetails id={id}></IntegrationDetails>;
}
