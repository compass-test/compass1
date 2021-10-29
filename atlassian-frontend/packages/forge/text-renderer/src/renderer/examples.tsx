import React, { Fragment } from 'react';

import { ReactRenderer } from '..';

import { exampleDoc } from './__tests__/unit/_test-data';

export const FullExample = () => {
  return (
    <Fragment>
      <p>
        This example exercises the parts of the AK React Renderer that we use in
        @forge/ui.
      </p>
      <ReactRenderer document={exampleDoc} />
    </Fragment>
  );
};
