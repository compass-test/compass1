import React from 'react';

import { graphql, useFragment } from 'react-relay';

import type { opsgeniePriorityFragment$key } from './__generated__/opsgeniePriorityFragment.graphql';
import { Container } from './styled';

export interface Props {
  data: opsgeniePriorityFragment$key;
}

export const OpsgeniePriority = (props: Props) => {
  const alert = useFragment<opsgeniePriorityFragment$key>(
    graphql`
      fragment opsgeniePriorityFragment on Alert {
        priority
      }
    `,
    props.data,
  );
  return <Container priority={alert.priority}>{alert.priority}</Container>;
};
