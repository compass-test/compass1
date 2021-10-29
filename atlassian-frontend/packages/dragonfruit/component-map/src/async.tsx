import React from 'react';

import { asyncComponent } from 'react-async-component';

import Spinner from '@atlaskit/spinner';

import { SpinnerContainer } from './styled';

export default asyncComponent({
  resolve: () =>
    // eslint-disable-next-line import/dynamic-import-chunkname
    import(/* webpackChunkName: "async-service-relationship-graph" */ './main'),
  LoadingComponent: () => (
    <SpinnerContainer>
      <Spinner size="xlarge" />
    </SpinnerContainer>
  ),
});
