import React from 'react';

import { RunPipelineMessage } from '../src';

export default () => (
  <div style={{ width: '650px' }}>
    <h3>Pipelines disabled</h3>
    <br />
    <RunPipelineMessage
      isPipelinesDisabled
      plansPageUrl=""
      settingsPageUrl=""
    />
    <h3>No write permissions</h3>
    <br />
    <RunPipelineMessage isRepoReadOnly plansPageUrl="" settingsPageUrl="" />
    <h3>Over allowance</h3>
    <br />
    <RunPipelineMessage isOverAllowance plansPageUrl="" settingsPageUrl="" />
    <h3>No Pipeline definition</h3>
    <br />
    <RunPipelineMessage
      isMissingPipelineDefinition
      plansPageUrl=""
      settingsPageUrl=""
    />
    <h3>Unknown</h3>
    <br />
    <RunPipelineMessage plansPageUrl="" settingsPageUrl="" />
    <h3>Error</h3>
    <br />
    <RunPipelineMessage
      plansPageUrl=""
      settingsPageUrl=""
      error={{
        key: 'plan-service.parse.missing-section',
        arguments: { element: 'foo', parent_element: 'bar' },
      }}
    />
  </div>
);
