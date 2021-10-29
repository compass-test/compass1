import React, { FC } from 'react';

import { TextfieldDisabledWrapper } from '../common/questionWrappers';

type ViewLongTextProps = {
  id: string;
  value?: string;
};

export const ViewLongText: FC<ViewLongTextProps> = ({ value }) => {
  return (
    <TextfieldDisabledWrapper>
      <div>{value}</div>
    </TextfieldDisabledWrapper>
  );
};
