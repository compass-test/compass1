import React, { FC } from 'react';

import { useRouter } from '@atlaskit/router';

export const Content: FC<{}> = () => {
  const [routerState] = useRouter();
  const Component = routerState.route.component;

  return <Component {...routerState} />;
};
