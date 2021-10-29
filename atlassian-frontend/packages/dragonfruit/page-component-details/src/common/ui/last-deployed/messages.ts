import { defineMessages } from 'react-intl';

export default defineMessages({
  deployment: {
    id: 'dragonfruit-page-component-details.last-deployed.deployment',
    defaultMessage: 'Deployment',
    description: 'The process of releasing completed software to the client',
  },
  environment: {
    id: 'dragonfruit-page-component-details.last-deployed.environment',
    defaultMessage: 'Environment',
    description: 'The environment that code for a component was deployed to',
  },
  lastDeployed: {
    id: 'dragonfruit-page-component-details.last-deployed',
    defaultMessage: 'Last deployed',
    description:
      'Last time the code for a component was deployed, will be followed by a time relative to the current time e.g. five hours ago',
  },
});
