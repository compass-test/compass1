import React from 'react';

import GraphNode from './main';

export const GraphNodeBasic = () => (
  <GraphNode
    componentId="ari:cloud:graph::service/d6e1bee2-332c-11ea-8e11-0ec70051ff9e/2c87fd20-25fe-11ea-977e-0ec70051ff9a"
    componentName="Amazing service!!"
  />
);

export const GraphNodeCurrent = () => (
  <GraphNode
    componentId="ari:cloud:graph::service/d6e1bee2-332c-11ea-8e11-0ec70051ff9e/2c87fd20-25fe-11ea-977e-0ec70051ff9a"
    componentName="Amazing service!!"
    isCurrent
  />
);

GraphNodeCurrent.displayName = 'Graph node representing current service';
