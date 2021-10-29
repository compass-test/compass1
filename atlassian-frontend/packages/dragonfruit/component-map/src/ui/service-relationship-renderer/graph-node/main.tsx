import React from 'react';

import { routes } from '@atlassian/dragonfruit-routes';

import { Card, Dimensions, Link, ServiceName } from './styled';
import { GraphNodeProps } from './types';

const GraphNode = ({
  componentId,
  componentName,
  isCurrent = false,
}: GraphNodeProps) => {
  return (
    <Dimensions>
      <Link href={routes.COMPONENT_DETAILS(componentId)} target="_blank">
        <Card isCurrent={isCurrent}>
          <ServiceName>{componentName}</ServiceName>
        </Card>
      </Link>
    </Dimensions>
  );
};

export default GraphNode;
