import React, { FC } from 'react';

import TextArea from '@atlaskit/textarea';

type EditParagraphProps = {
  id: string;
  value?: string;
  isInvalid: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const EditParagraph: FC<EditParagraphProps> = ({
  value,
  isInvalid,
  onChange,
}) => {
  return (
    <TextArea
      appearance="standard"
      isCompact={false}
      isDisabled={false}
      isReadOnly={false}
      isInvalid={isInvalid}
      minimumRows={5}
      maxHeight="none"
      isMonospaced={false}
      value={value}
      defaultValue={undefined}
      resize="smart"
      spellCheck={false}
      theme={undefined}
      onBlur={undefined}
      onChange={onChange}
      onFocus={undefined}
    />
  );
};
