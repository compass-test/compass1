import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import JiraMigrationConfiguration from '../examples/13-jira-migration-configuration';
import JiraMigrationConfigurationWithEdit from '../examples/34-jira-migration-configuration-with-edit';

export default md`
  ${(
    <>
      <div style={{ marginBottom: '0.5rem' }}>
        <AtlassianInternalWarning />
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <DevPreviewWarning />
      </div>
    </>
  )}

  ## Overview

  Display selected configuration options for a Jira migration

  ## Usage
  ${code`import { JiraMigrationConfiguration } from '@atlassian/mpt-migration-details';`}

  ## Examples
  ${(
    <Example
      Component={JiraMigrationConfiguration}
      title="Basic example"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/13-jira-migration-configuration')}
    />
  )}

  ${(
    <Example
      Component={JiraMigrationConfigurationWithEdit}
      title="Edit configuration example"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/34-jira-migration-configuration-with-edit')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../extract-react-types/jira-migration-configuration.tsx')}
    />
  )}
`;
