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

import AppConsentPageAllStatus from '../examples/00-app-consent-page-all-status';
import AppConsentPageAllCompleted from '../examples/01-app-consent-page-all-completed';
import AppConsentPageLoading from '../examples/02-app-consent-page-loading';

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

  # AppConsentPage
  ## Examples

  ${code`import { AppConsentPage } from '@atlassian/mpt-app-migration';`}

  ${(
    <Example
      title="AppConsentPageAllStatus example"
      packageName="@atlassian/mpt-app-migration"
      Component={withToggle(AppConsentPageAllStatus)}
      source={require('!!raw-loader!../examples/00-app-consent-page-all-status')}
    />
  )}

  ${(
    <Example
      title="AppConsentPageAllCompleted example"
      packageName="@atlassian/mpt-app-migration"
      Component={withToggle(AppConsentPageAllCompleted)}
      source={require('!!raw-loader!../examples/01-app-consent-page-all-completed')}
    />
  )}

  ${(
    <Example
      title="AppConsentPageLoading example"
      packageName="@atlassian/mpt-app-migration"
      Component={withToggle(AppConsentPageLoading)}
      source={require('!!raw-loader!../examples/02-app-consent-page-loading')}
    />
  )}

  ${(
    <Props
      heading="AppConsentPage Props"
      props={require('!!extract-react-types-loader!../extract-react-types/app-consent-page.tsx')}
    />
  )}
`;
