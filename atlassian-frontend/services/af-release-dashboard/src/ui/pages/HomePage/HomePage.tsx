import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { N10, N30 } from '@atlaskit/theme/colors';
import { Releases } from './Releases';
import { ReleaseMetrics } from '../../components/ReleaseMetrics';
import { useFetchReleases } from '../../hooks';
import { ProductFabricStatus } from '../../components/ProductFabricStatus';
import { FeatureFlags, featureFlags } from '../../../ui/feature-flags';

const Box = styled.div`
  padding: 0.5rem;
  margin: 0.5rem;
  margin-top: 0.8em;
  border-radius: 1em;
  background: ${N10};
  border: 1px solid ${N30};
`;
const MetricsBox = styled.div`
  grid-area: metrics;
`;

const ProductFabricBox = styled.div`
  grid-area: product-fabric;
`;

const CurrentReleases = styled.div`
  grid-area: current-releases;
  margin-top: 1.5em;

  h2 {
    text-align: center;
  }
`;

const reflowDependingOnFeatureToggles = (flags: FeatureFlags) => {
  if (flags.releaseAverageMetrics && !flags.productFabricStatus) {
    return 'metrics metrics metrics metrics';
  }
  if (!flags.releaseAverageMetrics && flags.productFabricStatus) {
    return 'product-fabric product-fabric product-fabric product-fabric';
  }
  return 'metrics metrics product-fabric product-fabric';
};

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 0px 0px;
  grid-template-areas:
    '${reflowDependingOnFeatureToggles(featureFlags())}'
    'current-releases current-releases current-releases current-releases';
  margin-top: 0.1rem;
  @media only screen and (max-width: 800px) {
    grid-template-areas:
      'product-fabric product-fabric product-fabric product-fabric'
      'metrics metrics metrics metrics'
      'current-releases current-releases current-releases current-releases';
  }
`;

export const HomePage: FunctionComponent = () => {
  const releases = useFetchReleases({
    limit: 3,
    withPullRequests: true,
  });
  const { productFabricStatus, releaseAverageMetrics } = featureFlags();
  return (
    <GridContainer>
      {releaseAverageMetrics ? (
        <MetricsBox>
          <Box>
            <ReleaseMetrics />
          </Box>
        </MetricsBox>
      ) : null}
      {productFabricStatus ? (
        <ProductFabricBox>
          <Box>
            <ProductFabricStatus releases={releases} />
          </Box>
        </ProductFabricBox>
      ) : null}
      <CurrentReleases>
        <h2>Recent Releases</h2>
        <Releases releases={releases} />
      </CurrentReleases>
    </GridContainer>
  );
};
