import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import MigrationChecksError from '../examples/00-migration-status-checks-error';
import MigrationChecksExecutionError from '../examples/01-migration-status-checks-execution-error';
import MigrationChecksBlockingError from '../examples/02-migration-status-checks-blocking-error';
import MigrationStatusChecksWarning from '../examples/03-migration-status-checks-warning';
import MigrationStatusChecksRunning from '../examples/04-migration-status-checks-running';
import MigrationStatusChecksWithCreationDate from '../examples/06-migration-status-checks-with-creation-date';
import MigrationStatusMigrationRunning from '../examples/07-migration-status-migration-running';
import MigrationStatusMigrationComplete from '../examples/08-migration-status-migration-complete';
import MigrationStatusMigrationIncomplete from '../examples/09-migration-status-migration-incomplete';
import MigrationStatusMigrationFailed from '../examples/10-migration-status-migration-failed';
import MigrationStatusWithCreationDate from '../examples/11-migration-status-migration-with-creation-date';
import MigrationStatusContainersPublic from '../examples/12-migration-status-containers-publicly-available';
import MigrationStatusMigrationStopping from '../examples/32-migration-status-migration-stopping';
import MigrationStatusMigrationStopped from '../examples/33-migration-status-migration-stopped';
import MigrationStatusCloudMigrationIncomplete from '../examples/35-migration-status-cloud-migration-incomplete';
import MigrationStatusMigrationValidating from '../examples/37-migration-status-migration-validating';
import MigrationStatusChecksRunningWithAutoSave from '../examples/38-migration-status-checks-running-auto-save';
import MigrationStatusMigrationFailedWithoutReports from '../examples/39-migration-status-checks-failed-without-reports';
import MigrationStatusChecksErrorWithLocale from '../examples/40-migration-status-checks-error-with-locale';

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

  Display overall status of a migration

  ## Usage
  ${code`import { MigrationStatus } from '@atlassian/mpt-migration-details';`}

  ## Examples
  ${(
    <Example
      Component={MigrationStatusChecksRunning}
      title="Migration checks running"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/04-migration-status-checks-running')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusChecksRunningWithAutoSave}
      title="Migration checks running with auto save"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/38-migration-status-checks-running-auto-save')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusChecksWarning}
      title="Migration checks completed with warnings"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/03-migration-status-checks-warning')}
    />
  )}

  ${(
    <Example
      Component={MigrationChecksError}
      title="Migration checks completed with errors"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/00-migration-status-checks-error')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusChecksErrorWithLocale}
      title="Migration checks completed with errors"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/00-migration-status-checks-error')}
    />
  )}

  ${(
    <Example
      Component={MigrationChecksExecutionError}
      title="Migration checks failed with execution errors"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/01-migration-status-checks-execution-error')}
    />
  )}

  ${(
    <Example
      Component={MigrationChecksBlockingError}
      title="Migration checks failed with blocking execution errors"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/02-migration-status-checks-blocking-error')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusContainersPublic}
      title="Migration checks successful with publicly accessible containers - Jira"
      source={require('!!raw-loader!../examples/12-migration-status-containers-publicly-available')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusMigrationValidating}
      title="Migration validating"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/37-migration-status-migration-validating')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusMigrationRunning}
      title="Migration running"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/07-migration-status-migration-running')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusMigrationComplete}
      title="Migration completed"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/08-migration-status-migration-complete')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusMigrationIncomplete}
      title="Migration incomplete"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/09-migration-status-migration-incomplete')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusMigrationFailed}
      title="Migration failed"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/10-migration-status-migration-failed')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusMigrationFailedWithoutReports}
      title="Migration failed without reports"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/39-migration-status-checks-failed-without-reports')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusMigrationStopping}
      title="Migration stopping"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/32-migration-status-migration-stopping')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusMigrationStopped}
      title="Migration stopped"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/33-migration-status-migration-stopped')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusChecksWithCreationDate}
      title="Migration status checks with creation date"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/06-migration-status-checks-with-creation-date')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusWithCreationDate}
      title="Migration status with creation date"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/11-migration-status-migration-with-creation-date')}
    />
  )}

  ${(
    <Example
      Component={MigrationStatusCloudMigrationIncomplete}
      title="Migration status Incomplete - Cloud migration"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/35-migration-status-cloud-migration-incomplete')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../extract-react-types/migration-status.tsx')}
    />
  )}

`;
