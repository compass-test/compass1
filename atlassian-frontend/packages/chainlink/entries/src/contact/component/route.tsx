import React from 'react';

import { About } from '@af/statuspage-chainlink-about';
import { useResource } from '@atlaskit/router';

import { contactResource } from '../resources/contact';

export default () => {
  const [{ loading, data, promise }] = useResource(contactResource);

  if (loading && !data) {
    throw promise;
  }

  // @ts-ignore TODO fix types for data
  return <About loading={loading} data={data} />;
};
