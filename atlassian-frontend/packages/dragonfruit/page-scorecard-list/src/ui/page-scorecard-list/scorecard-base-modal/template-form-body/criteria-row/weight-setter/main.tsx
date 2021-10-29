import React from 'react';

import { InlineEditableTextfield } from '@atlaskit/inline-edit';

import { EditorWrapper } from './styled';

interface Props {
  testId?: string;
  onEdit: (value: string) => void;
  value: string | null | undefined;
}

const WeightSetter: React.FC<Props> = ({ testId, onEdit, value }) => {
  const editorTestId = testId ? `${testId}.editor` : testId;

  const handleOnConfirm = (value: string) => {
    onEdit(value);
  };

  return (
    <>
      <EditorWrapper>
        <InlineEditableTextfield
          testId={editorTestId}
          defaultValue={value}
          onConfirm={handleOnConfirm}
          placeholder="0"
          hideActionButtons
        />
        %
      </EditorWrapper>
    </>
  );
};

export default WeightSetter;
