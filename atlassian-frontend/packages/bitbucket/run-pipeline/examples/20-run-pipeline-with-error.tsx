import React from 'react';

import RunPipelineModal from '../src';

export default () => (
  <div style={{ height: '650px' }} data-testid="run-pipeline">
    <RunPipelineModal
      isPipelinesDisabled={false}
      isRepoReadOnly={false}
      isOverAllowance={true}
      isSecuredVariablesEnabled
      refName="master"
      revision="foofoo"
      fetchCreatePipeline={Promise.resolve({}) as any}
      fetchPipelineDefinitions={Promise.resolve({}) as any}
      openPipelinePage={() => {}}
      onCloseDialog={() => {}}
      getConfigurationUrl={(revision) => revision}
    />
  </div>
);
