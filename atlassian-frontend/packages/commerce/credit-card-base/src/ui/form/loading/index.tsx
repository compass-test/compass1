import React from 'react';

import { withBreadcrumb } from '@atlassian/commerce-telemetry/dispatch-hooks';

import { CC_LOADER } from '../../../common/constants/breadcrumb-names';
import * as FieldNames from '../../../common/constants/field-names';

import { FieldSkeleton, LabelSkeleton, LoadingForm } from './styled';

const NBSP = '\u00A0';

const InputSkeleton: React.FC<{ as: FieldNames.FieldName }> = ({
  as: gridArea,
}) => (
  <div style={{ gridArea }}>
    <LabelSkeleton children={NBSP} />
    <FieldSkeleton children={NBSP} />
  </div>
);

const LoadingCreditCardWithoutBreadcrumb: React.FC<{ visible: boolean }> = ({
  visible,
}) => (
  <LoadingForm visible={visible}>
    <InputSkeleton as={FieldNames.NUMBER} />
    <InputSkeleton as={FieldNames.NAME} />
    <InputSkeleton as={FieldNames.EXPIRY} />
    <InputSkeleton as={FieldNames.CVC} />
  </LoadingForm>
);

export const LoadingCreditCard = withBreadcrumb(
  LoadingCreditCardWithoutBreadcrumb,
  CC_LOADER,
  {
    isForDevsOnly: true,
  },
);
