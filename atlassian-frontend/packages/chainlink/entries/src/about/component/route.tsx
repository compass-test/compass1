import React from 'react';

import { About } from '@af/statuspage-chainlink-about';
import { useResource } from '@atlaskit/router';

import { aboutResource } from '../resources/about';

export default () => {
  const [{ loading, data, promise }] = useResource(aboutResource);

  if (loading && !data) {
    throw promise;
  }

  // @ts-ignore TODO fix types for data
  return <About loading={loading} data={data} />;
};
