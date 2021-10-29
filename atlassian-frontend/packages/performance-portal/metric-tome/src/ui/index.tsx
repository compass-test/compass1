import React, { Suspense } from 'react';

import { Props, TomeModalLoading, TomeModal as TomeModalMain } from './main';

export const TomeModal = (props: Props) => {
  return (
    <Suspense fallback={<TomeModalLoading />}>
      <TomeModalMain {...props} />
    </Suspense>
  );
};
