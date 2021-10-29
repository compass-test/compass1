import React from 'react';

import Loadable from 'react-loadable';
import { useMemoOne } from 'use-memo-one';

import Loading from './Loading';
import type { ShareToSlackProps } from './ShareToSlack';

export default function LazyBulkShareToSlack(props: ShareToSlackProps) {
  const WrappedLoadable = useMemoOne(
    () =>
      Loadable<ShareToSlackProps, {}>({
        loader: () =>
          import(
            /* webpackChunkName: "@atlaskit-internal_share-to-slack" */
            './ShareToSlack'
          ),
        loading: () => <Loading className={props.className} />,
      }),
    [props.className],
  );

  return <WrappedLoadable {...props} />;
}
