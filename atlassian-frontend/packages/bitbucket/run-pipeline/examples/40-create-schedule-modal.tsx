import React from 'react';

import { CreateScheduleModal } from '../src';
import { FetchBranches, FetchPipelineDefinitions } from '../src/types';

const fetchBranches: FetchBranches = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        values: [
          { name: 'master', target: { hash: 'foo' } },
          { name: 'staging', target: { hash: 'bar' } },
        ],
        size: 2,
      });
    }, 1000),
  );

const fetchPipelineDefinitions: FetchPipelineDefinitions = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        values: [
          { type: 'custom', pattern: 'foo' },
          {
            type: 'custom',
            pattern: 'with-variables',
            variables: [{ name: 'foo' }, { name: 'SECURED_bar' }],
          },
          {
            type: 'custom',
            pattern: 'with-error',
            error: {
              type: 'pipeline_error',
              key: 'plan-service.parse.detailed-parse-error',
              message:
                'There is an error in your bitbucket-pipelines.yml at [pipelines > branches > custom]. To be precise: This section should be a list (it is currently defined as a map).',
              arguments: {
                element: 'custom',
                parent_element: 'branches',
              },
            },
          },
          { type: 'default' },
        ],
        size: 4,
      });
    }, 1000),
  );

export default () => (
  <div style={{ height: '650px' }} data-testid="create-schedule">
    <CreateScheduleModal
      fetchBranches={fetchBranches}
      fetchPipelineDefinitions={fetchPipelineDefinitions}
      onCloseDialog={(props) => {
        // eslint-disable-next-line no-console
        console.log(props);
      }}
      getConfigurationUrl={(revision) => revision}
    />
  </div>
);
