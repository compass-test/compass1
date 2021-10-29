import React from 'react';

import startCase from 'lodash/startCase';
import { graphql } from 'react-relay';
import { useFragment } from 'react-relay/hooks';

import {
  CompassLogo,
  ConfluenceLogo,
  JiraLogo,
  LogoProps,
  OpsgenieLogo,
} from '@atlaskit/logo';
import { B200, B400, N700 } from '@atlaskit/theme/colors';

import type { product_metric$key } from './__generated__/product_metric.graphql';
import { TeamCentral } from './logos/team-central';
import { Product } from './styled';

interface Props {
  metric: product_metric$key;
}

const productLogoProps: LogoProps = {
  size: 'small',
  textColor: N700,
  iconColor: B200,
  iconGradientStart: B400,
  iconGradientStop: B200,
};

export const ProductColumn = (props: Props) => {
  const metric = useFragment(
    graphql`
      fragment product_metric on Metric {
        product
      }
    `,
    props.metric,
  );

  return (
    <Product>
      {metric.product && metric.product === 'JIRA' ? (
        <JiraLogo {...productLogoProps} />
      ) : metric.product === 'CONFLUENCE' ? (
        <ConfluenceLogo {...productLogoProps} />
      ) : metric.product === 'OPSGENIE' ? (
        <OpsgenieLogo {...productLogoProps} />
      ) : metric.product === 'WATERMELON' ? (
        <TeamCentral />
      ) : metric.product === 'COMPASS' ? (
        <CompassLogo {...productLogoProps} />
      ) : (
        startCase(metric.product ?? '')
      )}
    </Product>
  );
};
