import React, { useState } from 'react';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginResolver } from '../src/portable/resolver';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import ExampleHostSandbox, {
  Field,
  LabelText,
  Wrapper,
} from './_support/ExampleHostSandbox';
import { allCohorts } from './_support/cohorts';

type Props = {
  isSiteAdmin: boolean;
};

const flagKey = 'product.enhanced-feature-gates';

export const ChangeEditionGateway: React.FC<Props> = (props) => {
  const enhancedFeatureGatesExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    // this plugin will listen to props changes
    usePluginResolver((pipeline) =>
      // overwrite the cohort is user is not site admin
      props.isSiteAdmin
        ? {
            cohort: pipeline.cohort,
            ineligibilityReasons: pipeline.ineligibilityReasons,
          }
        : {
            cohort: 'not-enrolled',
            ineligibilityReasons: [
              ...pipeline.ineligibilityReasons,
              'notSiteAdmin',
            ],
          },
    ),
    usePluginAutoExposureEvent(),
  );

  return (
    <Wrapper propsPreview={props}>
      {enhancedFeatureGatesExperiment.cohort === 'experiment' ? (
        <h3 style={{ background: 'red', color: '#fff' }}>
          This is experiment component (only for enrolled site-admin)
        </h3>
      ) : (
        <h3>
          Original component (for non site-admin and not-enrolled site-admin)
        </h3>
      )}
    </Wrapper>
  );
};

export default () => {
  const [isSiteAdmin, setIsSiteAdmin] = useState(false);

  return (
    <ExampleHostSandbox
      flagKey={flagKey}
      additionalControls={
        <Field>
          <LabelText>
            isSiteAdmin: <code>{isSiteAdmin.toString()}</code>
          </LabelText>
          <Button
            onClick={() => {
              setIsSiteAdmin(!isSiteAdmin);
            }}
          >
            Toggle isSiteAdmin
          </Button>
        </Field>
      }
    >
      {() => <ChangeEditionGateway isSiteAdmin={isSiteAdmin} />}
    </ExampleHostSandbox>
  );
};
