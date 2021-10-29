import React, { FC } from 'react';

import {
  OFFSESSION_CONFIRMATION_FLOW,
  OFFSESSION_CONFIRMATION_NOT_AVAILABLE,
} from '../../constants/breadcrumb-names';
import { Breadcrumb } from '../../utils/analytics';

export const OffsessionConfirmationBreadcrumb: FC = ({ children }) => {
  return (
    <Breadcrumb name={OFFSESSION_CONFIRMATION_FLOW}>{children}</Breadcrumb>
  );
};

export type OffsessionConfirmationNotAvailableBreadcrumbProps = {
  error: Error;
};

export const OffsessionConfirmationNotAvailableBreadcrumb: FC<OffsessionConfirmationNotAvailableBreadcrumbProps> = ({
  children,
  error,
}) => {
  return (
    <Breadcrumb
      name={OFFSESSION_CONFIRMATION_NOT_AVAILABLE}
      attributes={{ nativeError: error }}
    >
      {children}
    </Breadcrumb>
  );
};
