import React, { PropsWithChildren, useMemo } from 'react';

import { AnalyticsContext } from '@atlaskit/analytics-next';

import type { AnySourceScreen, MigrationContext } from '../../common/types';

import ScreenViewEvent from './screen-view-event';

type Props<S extends AnySourceScreen> = { name: S };

const AnalyticsScreenContext = <S extends AnySourceScreen = AnySourceScreen>({
  children,
  name,
}: PropsWithChildren<Props<S>>) => {
  // Memoised the context
  const data = useMemo<MigrationContext<S>>(() => {
    return { source: name };
  }, [name]);

  return (
    <AnalyticsContext data={data}>
      {children}
      <ScreenViewEvent />
    </AnalyticsContext>
  );
};

export default AnalyticsScreenContext;
