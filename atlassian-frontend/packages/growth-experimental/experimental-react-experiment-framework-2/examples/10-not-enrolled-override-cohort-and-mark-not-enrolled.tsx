import React, { useState } from 'react';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginResolver } from '../src/portable/resolver';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginNotEnrolledCohort } from '../src/portable/notEnrolled';
import { markNotEnrolled } from '../src/helpers/markNotEnrolled';
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
    usePluginNotEnrolledCohort('non-site-admin'), // define the not enrolled cohort name for the pipeline
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    usePluginResolver((pipeline) => {
      if (!props.isSiteAdmin) {
        return markNotEnrolled('not-site-admin', pipeline);
      }

      return pipeline;
    }),
  );

  return (
    <Wrapper
      propsPreview={{
        ...props,
        '[[const]] experiment': enhancedFeatureGatesExperiment,
      }}
    >
      {enhancedFeatureGatesExperiment.cohort === 'experiment' && (
        <h3 style={{ background: 'red', color: '#fff' }}>
          This is experiment component
        </h3>
      )}
      {enhancedFeatureGatesExperiment.cohort === 'not-enrolled' && (
        <h3>This is not enrolled component</h3>
      )}
      {enhancedFeatureGatesExperiment.cohort === 'control' && (
        <h3 style={{ background: 'mediumseagreen', color: '#fff' }}>
          This is control component
        </h3>
      )}
      {enhancedFeatureGatesExperiment.cohort === 'non-site-admin' && (
        <div>
          <h3 style={{ background: 'deepskyblue', color: '#fff' }}>
            This is non-site-admin cohort
          </h3>
          <em>
            This component is rendered because when `isSiteAdmin === false` it
            is marked not enrolled by `markNotEnrolled` Thus the `cohort` value
            will fallback into value from `usePluginNotEnrolledCohort` (check
            props passed value)
          </em>
        </div>
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
