import React from 'react';

import { graphql, useFragment } from 'react-relay';

import type { headerFragment$key } from './__generated__/headerFragment.graphql';
import { Actions } from './actions';
import { MetricInfo } from './metric-info';
import { Top } from './styled';

type Props = {
  data: headerFragment$key;
};

export const Header = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment headerFragment on Metric {
        ...metricInfoFragment
        ...actionsMetricPageHeaderFragment
      }
    `,
    props.data,
  );

  return (
    <Top>
      <MetricInfo data={data} />
      <Actions data={data} />
    </Top>
  );
};
