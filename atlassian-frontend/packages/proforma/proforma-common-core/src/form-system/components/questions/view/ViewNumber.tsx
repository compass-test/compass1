import React, { FC } from 'react';

import Textfield from '@atlaskit/textfield';

import { FieldDisabledWrapper } from '../common/questionWrappers';

type ViewNumberProps = {
  id: string;
  value?: string;
};

export const ViewNumber: FC<ViewNumberProps> = ({ id, value }) => {
  return (
    <FieldDisabledWrapper>
      <Textfield id={id} value={value} isDisabled width="small" />
    </FieldDisabledWrapper>
  );
};
