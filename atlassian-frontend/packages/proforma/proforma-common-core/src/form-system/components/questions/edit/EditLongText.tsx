import React, { FC } from 'react';

import Textfield from '@atlaskit/textfield';

type EditLongTextProps = {
  id: string;
  value?: string;
  isInvalid: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditLongText: FC<EditLongTextProps> = ({
  id,
  value,
  isInvalid,
  onChange,
}) => {
  return (
    <div>
      <Textfield
        id={id}
        value={value}
        isInvalid={isInvalid}
        onChange={onChange}
      />
    </div>
  );
};
