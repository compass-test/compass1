import React, { FC } from 'react';

import { ShortTextFieldWrapper } from '../common/questionWrappers';

type ViewShortTextProps = {
  id: string;
  value?: string;
};

export const ViewShortText: FC<ViewShortTextProps> = ({ value }) => {
  return (
    <ShortTextFieldWrapper isDisabled>
      <div>{value}</div>
    </ShortTextFieldWrapper>
  );
};
