import React from 'react';

import { injectIntl } from 'react-intl';

import Spinner from '@atlaskit/spinner';

import useGetComponentRelationships from '../services/get-service-relationships';

import ServiceRelationshipRenderer from './service-relationship-renderer';
import { SpinnerContainer } from './styled';

type Props = {
  componentId: string;
};

const ComponentRelationshipGraph = ({ componentId }: Props) => {
  const { data, loading, error } = useGetComponentRelationships(componentId);

  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner size="xlarge" />
      </SpinnerContainer>
    );
  }

  if (error || !data) {
    return <div>error</div>;
  }

  return <ServiceRelationshipRenderer component={data.compass.component} />;
};

export default injectIntl(ComponentRelationshipGraph);
