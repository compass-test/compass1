import React, { FC, useEffect } from 'react';

import Portal from '@atlaskit/portal';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { layers } from '@atlaskit/theme';

import * as S from '../styled';

type Props = {
  zIndex?: number;
  children: React.ReactNode;
  Container?: React.ElementType;
  containerProps?: Record<string, any>;
};

const Wrapper: FC<Props> = ({
  children,
  zIndex = layers.layer(),
  Container = 'div',
  containerProps = {},
}) => {
  useEffect(() => {
    const originalBodyOverflowY = document.body.style.overflowY;
    // disable scrolling in the body when FocusPage opened
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = originalBodyOverflowY;
    };
  }, []);

  return (
    <Portal zIndex={zIndex}>
      <Container {...containerProps}>
        <S.Screen
          role="dialog"
          aria-labelledby="focus-page-title"
          aria-describedby="focus-page-desc"
        >
          {children}
        </S.Screen>
      </Container>
    </Portal>
  );
};

export default Wrapper;
