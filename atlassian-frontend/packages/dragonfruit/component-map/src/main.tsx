import React from 'react';

import { CompassComponent } from '@atlassian/dragonfruit-graphql';

import ComponentRelationshipGraphUi from './ui';

type Props = {
  componentId: CompassComponent['id'];
};

const ComponentRelationshipGraph = ({ componentId }: Props) => {
  return <ComponentRelationshipGraphUi componentId={componentId} />;
};

export default ComponentRelationshipGraph;
