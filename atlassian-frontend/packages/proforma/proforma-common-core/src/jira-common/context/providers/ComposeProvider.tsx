import React, { ComponentType, FC, Fragment, ReactNode } from 'react';

type Components = ComponentType | [ComponentType, { [key: string]: any }];

interface Props {
  components: Components[];
  children: ReactNode;
}

export const ComposeProvider: FC<Props> = ({ components, children }) => (
  <Fragment>
    {components.reverse().reduce((acc, curr) => {
      const [Provider, props] = Array.isArray(curr)
        ? [curr[0], curr[1]]
        : [curr, {}];
      return <Provider {...props}>{acc}</Provider>;
    }, children)}
  </Fragment>
);
