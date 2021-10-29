import React, { FC, useState } from 'react';

import Button from '@atlaskit/button';
import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import AppAssessmentPageAllStatus from '../examples/04-app-assessment-page-all-status';
import AppAssessmentPageAllStatusBanner from '../examples/05-app-assessment-page-all-status-banner';
import AppAssessmentPageAllStatusWithUsage from '../examples/06-app-assessment-page-all-status-with-usage';

const withToggle = (Comp: FC<{ onClose: () => void }>): FC => {
  return () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        {open && <Comp onClose={() => setOpen(false)} />}
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Show Page
        </Button>
      </>
    );
  };
};

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

  # AppAssessmentPage
  ## Examples

  ${code`import { AppAssessmentPage } from '@atlassian/mpt-app-migration';`}

  ${(
    <Example
      title="AppAssessmentPageAllStatus example"
      packageName="@atlassian/mpt-app-migration"
      Component={withToggle(AppAssessmentPageAllStatus)}
      source={require('!!raw-loader!../examples/04-app-assessment-page-all-status')}
    />
  )}

  ${(
    <Example
      title="AppAssessmentPageAllStatusBanner example"
      packageName="@atlassian/mpt-app-migration"
      Component={withToggle(AppAssessmentPageAllStatusBanner)}
      source={require('!!raw-loader!../examples/05-app-assessment-page-all-status-banner')}
    />
  )}

  ${(
    <Example
      title="AppAssessmentPageAllStatusWithUsage example"
      packageName="@atlassian/mpt-app-migration"
      Component={withToggle(AppAssessmentPageAllStatusWithUsage)}
      source={require('!!raw-loader!../examples/06-app-assessment-page-all-status-with-usage')}
    />
  )}

  ${(
    <Props
      heading="AppAssessmentPage Props"
      props={require('!!extract-react-types-loader!../extract-react-types/app-assessment-page.tsx')}
    />
  )}
`;
