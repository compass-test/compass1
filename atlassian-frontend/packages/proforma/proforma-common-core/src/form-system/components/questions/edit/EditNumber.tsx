import React, { FC } from 'react';

import Textfield from '@atlaskit/textfield';

type EditNumberProps = {
  id: string;
  value?: string;
  isInvalid: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditNumber: FC<EditNumberProps> = ({
  id,
  value,
  isInvalid,
  onChange,
}) => {
  return (
    <Textfield
      id={id}
      value={value}
      isInvalid={isInvalid}
      onChange={onChange}
      width="small"
    />
  );
};
