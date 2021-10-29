/** @jsx jsx */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useResource, RouteContext } from 'react-resource-router';
import { jsx } from '@emotion/core';
import Spinner from '@atlaskit/spinner';

import { serviceInformationResource } from '../../resources/service-information';
import { ServiceInformation } from '../../components/ServiceInformation';
import { DeploymentsInformation } from '../../components/DeploymentsInformation';
import { NotFound } from '../../components/NotFound';
import {
  flexJustifyCenter,
  serviceInformationContainer,
  deploymentsContainer,
} from './styles';

// eslint-disable-next-line import/no-unresolved
import ship from 'images/ship.svg';

export const Service: React.FC<RouteContext> = ({ match }) => {
  const { service } = match.params;

  const { loading, error, data } = useResource(serviceInformationResource);

  if (loading) {
    return (
      <div css={flexJustifyCenter}>
        <Spinner size="large" />
      </div>
    );
  }

  if (error || !data) {
    console.error(error);

    return (
      <NotFound
        header="Service Not Found"
        description={error?.message || 'Service does not exist.'}
        imageUrl={ship}
      />
    );
  }

  return (
    <React.Fragment>
      <Helmet title={`AF Service Dashboard | ${service}`} />
      <div css={serviceInformationContainer}>
        <ServiceInformation {...data} />
      </div>
      <div css={deploymentsContainer}>
        <DeploymentsInformation envs={data.envs} />
      </div>
    </React.Fragment>
  );
};
