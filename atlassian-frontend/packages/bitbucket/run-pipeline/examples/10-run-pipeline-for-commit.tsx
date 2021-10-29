import React from 'react';

import RunPipelineModal from '../src';
import { FetchCreatePipeline, FetchPipelineDefinitions } from '../src/types';

const fetchCreatePipeline: FetchCreatePipeline = (props) =>
  new Promise((resolve) =>
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('create', props);
      resolve({ build_number: 5, uuid: 'foo' });
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
  <div style={{ height: '650px' }} data-testid="run-pipeline">
    <RunPipelineModal
      isPipelinesDisabled={false}
      isRepoReadOnly={false}
      isOverAllowance={false}
      isSecuredVariablesEnabled
      revision="foofoo"
      fetchCreatePipeline={fetchCreatePipeline}
      fetchPipelineDefinitions={fetchPipelineDefinitions}
      openPipelinePage={(props) => {
        // eslint-disable-next-line no-console
        console.log('open', props);
      }}
      onCloseDialog={() => {
        // eslint-disable-next-line no-console
        console.log('close');
      }}
      getConfigurationUrl={(revision) => revision}
    />
  </div>
);
