import React from 'react';

import { createBreadcrumbAPI } from '../src';

const {
  breadcrumbMountedEventChannel: { Listener },
  Breadcrumb,
} = createBreadcrumbAPI();

const Example = () => (
  <Listener
    onEvent={(e) =>
      console.log(
        'This callback will get triggered as soon as the breadcrumb mounts',
        e,
      )
    }
  >
    <Breadcrumb name="my-breadcrumb">Breadcrumb has been mounted!</Breadcrumb>
  </Listener>
);

export default Example;
