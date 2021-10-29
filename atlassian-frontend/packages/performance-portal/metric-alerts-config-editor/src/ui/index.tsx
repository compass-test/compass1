import React, { Suspense } from 'react';

import {
  EditAlertConfigModalLoading,
  EditAlertConfigModal as EditAlertConfigModalMain,
  Props,
} from './main';

export const EditAlertConfigModal = (props: Props) => {
  return (
    <Suspense fallback={<EditAlertConfigModalLoading />}>
      <EditAlertConfigModalMain {...props} />
    </Suspense>
  );
};
