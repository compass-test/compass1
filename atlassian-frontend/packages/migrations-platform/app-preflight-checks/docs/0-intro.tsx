import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

const AppAssessmentIncomplete = require('../examples/00-AppAssessmentIncomplete')
  .default;
const AppsNotInstalledOnCloud = require('../examples/01-AppsNotInstalledOnCloud')
  .default;
const AppDataMigrationConsent = require('../examples/02-AppDataMigrationConsent')
  .default;
const ErrorSummary = require('../examples/03-AppPreflightCheckErrorSummary')
  .default;
const AppOutdated = require('../examples/04-AppOutdated').default;

const ErrorSummaryProps = require('!!extract-react-types-loader!../src/ui/components/ErrorSummary/index');
const AppAssessmentProps = require('!!extract-react-types-loader!../src/ui/details/AppAssessmentIncomplete/index');
const AppDataMigrationConsentProps = require('!!extract-react-types-loader!../src/ui/details/AppDataMigrationConsent/index');
const AppOutdatedProps = require('!!extract-react-types-loader!../src/ui/details/AppOutdated/index');
const AppsNotInstalledOnCloudProps = require('!!extract-react-types-loader!../src/ui/details/AppsNotInstalledOnCloud/index');

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

  ## Usage

  # App Assessment Incomplete detail

  ${code`import { AppAssessmentIncomplete } from '@atlassian/mpt-app-preflight-checks';`}

  ${(
    <Example
      packageName="@atlaskit/contextual-survey"
      Component={AppAssessmentIncomplete}
      title="Basic example"
      source={require('!!raw-loader!../examples/00-AppAssessmentIncomplete')}
    />
  )}

  ${(<Props props={AppAssessmentProps} />)}

  # Apps Needed In Cloud detail

  ${code`import { AppsNotInstalledOnCloud } from '@atlassian/mpt-app-preflight-checks';`}

  ${(
    <Example
      packageName="@atlaskit/contextual-survey"
      Component={AppsNotInstalledOnCloud}
      title="Basic example"
      source={require('!!raw-loader!../examples/01-AppsNotInstalledOnCloud')}
    />
  )}

  ${(<Props props={AppsNotInstalledOnCloudProps} />)}

  # App Outdated

  ${code`import { AppOutdated } from '@atlassian/mpt-app-preflight-checks';`}

  ${(
    <Example
      packageName="@atlaskit/contextual-survey"
      Component={AppOutdated}
      title="Basic example"
      source={require('!!raw-loader!../examples/04-AppOutdated')}
    />
  )}

  ${(<Props props={AppOutdatedProps} />)}

  # App Data Migration Consent

  ${code`import { AppDataMigrationConsent } from '@atlassian/mpt-app-preflight-checks';`}

  ${(
    <Example
      packageName="@atlaskit/contextual-survey"
      Component={AppDataMigrationConsent}
      title="Basic example"
      source={require('!!raw-loader!../examples/02-AppDataMigrationConsent')}
    />
  )}

  ${(<Props props={AppDataMigrationConsentProps} />)}

  # Error Summary

  Error summary for the footer

  ${code`import { ErrorSummary } from '@atlassian/mpt-app-preflight-checks';`}

  ${(
    <Example
      packageName="@atlaskit/contextual-survey"
      Component={ErrorSummary}
      title="Basic example"
      source={require('!!raw-loader!../examples/03-AppPreflightCheckErrorSummary')}
    />
  )}

  ${(<Props props={ErrorSummaryProps} />)}
`;
