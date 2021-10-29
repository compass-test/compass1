import React, { useState } from 'react';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import ExampleHostSandbox, {
  Field,
  LabelText,
  Wrapper,
} from './_support/ExampleHostSandbox';
import { allCohorts } from './_support/cohorts';
import { usePluginUnmetRequirements } from '../src/portable/enrollmentRequirements';
import { usePluginEnglishOnly } from '../src/portable/englishOnly';
import { usePluginLanguage } from './_support/mock-product/language';

type Props = {
  isSiteAdmin: boolean;
};

const flagKey = 'product.enhanced-feature-gates';

export const ChangeEditionGateway: React.FC<Props> = (props) => {
  const enhancedFeatureGatesExperiment = useExperiment(
    usePluginLanguage(),
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    // if user is not site admin or not using english, ignore experiment,
    // which also mean should not fire feature exposed event
    usePluginUnmetRequirements(() => props.isSiteAdmin),
    usePluginUnmetRequirements(usePluginEnglishOnly()),
    usePluginAutoExposureEvent(),
  );

  return (
    <Wrapper propsPreview={props}>
      {enhancedFeatureGatesExperiment.cohort === 'experiment' ? (
        <h3 style={{ background: 'red', color: '#fff' }}>
          This is experiment component
        </h3>
      ) : (
        <h3>
          Original component without feature exposed (treated as if not part of
          the experiment)
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
