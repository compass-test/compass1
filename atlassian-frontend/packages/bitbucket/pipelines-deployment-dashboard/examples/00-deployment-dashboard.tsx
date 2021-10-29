import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { forceReRender } from '@storybook/react';
import { IntlProvider } from 'react-intl';

import { Deployment, Environment } from '@atlassian/pipelines-models';

import DeploymentDashboard from '../src';

const deployment1 = new Deployment({
  state: {
    started_on: '2021-08-17T23:41:27+00:00',
    status: 'SUCCESSFUL',
  },
  deployable: {
    commit: {
      hash: 'a4d0a7799d88f80e15930cb2826ea3a147477c74',
      message:
        'Merged in noref-fix-failed-step-expansion (pull request #2125)\n\nNoref fix failed step expansion\n\nApproved-by: Vaishnavi Bapat',
    },
    name: '#11158',
  },
  step: {
    triggerer: {
      display_name: 'Piotr Plewa',
      links: {
        avatar: {
          href:
            'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557057:df2e56d6-313e-46b6-b524-584f659fc03d/21bb0dec-6324-4c87-b237-31a3b6718a37/128',
        },
      },
    },
    state: {
      type: 'pipeline_step_state_completed',
      name: 'COMPLETED',
    },
    run_number: 1,
    uuid: '{46339b7f-7172-4f74-8b82-7c2e60032475}',
  },
});

const deployment2 = new Deployment({
  state: {
    started_on: '2021-02-17T23:41:27+00:00',
    status: 'FAILED',
  },
  deployable: {
    commit: {
      hash: 'cb2826ea3a147477c74a4d0a7799d88f80e15930',
      message: 'This would fail',
    },
    name: '#123',
  },
  step: {
    triggerer: {
      display_name: 'Piotr Plewa',
      links: {
        avatar: {
          href:
            'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557057:df2e56d6-313e-46b6-b524-584f659fc03d/21bb0dec-6324-4c87-b237-31a3b6718a37/128',
        },
      },
    },
    state: {
      type: 'pipeline_step_state_completed',
      name: 'COMPLETED',
    },
    run_number: 1,
    uuid: '{46339b7f-7172-4f74-8b82-7c2e60032475}',
  },
});

const deployment3 = new Deployment({
  state: {
    started_on: '2020-02-17T23:41:27+00:00',
    status: 'STOPPED',
  },
  deployable: {
    commit: {
      hash: 'efafw3s',
      message: 'Stopped',
    },
    name: '#333',
  },
  step: {
    state: {
      type: 'pipeline_step_state_completed',
      name: 'COMPLETED',
    },
    run_number: 1,
    uuid: '{46339b7f-7172-4f74-8b82-7c2e60032475}',
  },
});

const deployment4 = new Deployment({
  state: {
    started_on: '2020-09-17T23:41:27+00:00',
    status: 'SUCCESSFUL',
  },
  deployable: {
    commit: {
      hash: '2fafw3s',
      message: 'Failed redeploy',
    },
    name: '#222',
  },
  step: {
    state: {
      type: 'pipeline_step_state_completed',
      name: 'COMPLETED',
    },
    trigger: {
      type: 'pipeline_step_trigger_redeploy',
    },
    run_number: 1,
    uuid: '{46339b7f-7172-4f74-8b82-7c2e60032475}',
  },
});

const deployment5 = new Deployment({
  state: {
    started_on: '2020-09-17T23:41:27+00:00',
    status: 'SUCCESSFUL',
  },
  deployable: {
    commit: {
      hash: 'f23rfaf',
      message: 'Rerun',
    },
    name: '#444',
  },
  step: {
    state: {
      type: 'pipeline_step_state_completed',
      name: 'SUCCESSFUL',
    },
    run_number: 23,
    uuid: '{46339b7f-7172-4f74-8b82-7c2e60032475}',
  },
});

const deploymentDashboard = [
  [
    new Environment({
      uuid: 'baz',
      name: 'test',
      latest_deployment: deployment1,
      latest_successful_deployment: deployment1,
      next_promotion: {
        environment: { uuid: 'foo' },
        uuid: 'bzz',
      },
    }),
  ],
  [
    new Environment({
      uuid: 'foo',
      name: 'Production',
      latest_deployment: deployment1,
      latest_successful_deployment: deployment1,
    }),
    new Environment({
      uuid: 'bar',
      name: 'prod 2',
      latest_deployment: deployment2,
      latest_successful_deployment: deployment2,
    }),
  ],
];

const environmentHistory = {
  baz: [deployment1, deployment2, deployment3, deployment4, deployment5],
  foo: [deployment1],
  bar: [deployment2],
};

let selectedEnvironmentUuid = 'baz';

export default () => {
  return (
    <div
      data-testid="pipelines-deployment-dashboard"
      style={{ margin: '74px 20px 0' }}
    >
      <IntlProvider locale="en">
        <DeploymentDashboard
          deploymentDashboard={deploymentDashboard}
          environmentHistory={environmentHistory}
          fetchingDashboard={false}
          fetchingHistory={false}
          selectedEnvironmentUuid={selectedEnvironmentUuid}
          deploymentSettingsPageUrl={''}
          userIsAdmin={true}
          isPremiumAccount={true}
          getEnvironmentHistory={(environmentUuid, currentPage) => {
            console.log('getEnvironmentHistory', environmentUuid, currentPage);
          }}
          toggleHistory={(environmentUuid) => {
            console.log('toggleHistory', environmentUuid);
            selectedEnvironmentUuid =
              selectedEnvironmentUuid === environmentUuid
                ? ''
                : environmentUuid || '';
            forceReRender();
          }}
          openDeploymentPreview={(promotion) => {
            console.log('openDeploymentPreview', promotion);
          }}
          openDeploymentSummary={(deploymentUuid, environmentUuid) => {
            console.log(
              'openDeploymentSummary',
              deploymentUuid,
              environmentUuid,
            );
          }}
          openRedeployPreview={(deployment) => {
            console.log('redeploy', deployment);
          }}
        />
      </IntlProvider>
    </div>
  );
};
