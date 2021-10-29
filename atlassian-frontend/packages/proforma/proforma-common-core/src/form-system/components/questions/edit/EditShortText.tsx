import React, { FC } from 'react';

import Textfield from '@atlaskit/textfield';

import { ShortTextFieldWrapper } from '../common/questionWrappers';

type EditShortTextProps = {
  id: string;
  value?: string;
  isInvalid: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditShortText: FC<EditShortTextProps> = ({
  id,
  value,
  isInvalid,
  onChange,
}) => {
  return (
    <ShortTextFieldWrapper isDisabled={false}>
      <Textfield
        id={id}
        value={value}
        isInvalid={isInvalid}
        onChange={onChange}
        width="medium"
      />
    </ShortTextFieldWrapper>
  );
};
