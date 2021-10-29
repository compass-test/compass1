import React, { useCallback } from 'react';

import InlineEdit, { InlineEditProps } from '@atlaskit/inline-edit';
import Spinner from '@atlaskit/spinner';
import TextArea from '@atlaskit/textarea';

import { ReadViewContent, SpinnerWrapper, Wrapper } from './styled';

export type InlineTextAreaProps = Omit<
  InlineEditProps<string>,
  'editView' | 'readView'
> & {
  testId?: string;
  placeholder: string;
  readValue?: string; // Set if you want a different value shown in the read view
  loading?: boolean;
  alignText?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
};

export default function InlineTextArea(props: InlineTextAreaProps) {
  const {
    testId,
    placeholder,
    readValue,
    loading,
    alignText,
    isDisabled = false,
    maxLength = undefined,
    ...rest
  } = props;

  const editView = useCallback(
    (fieldProps, ref) => {
      return <TextArea maxLength={maxLength} {...fieldProps} ref={ref} />;
    },
    [maxLength],
  );

  const readView = useCallback(() => {
    return (
      <ReadViewContent faded={!props.defaultValue || loading}>
        {readValue || props.defaultValue || placeholder}
      </ReadViewContent>
    );
  }, [readValue, props.defaultValue, placeholder, loading]);

  const isEditing = isDisabled ? false : undefined;

  return (
    <Wrapper data-testid={testId} alignText={alignText}>
      <SpinnerWrapper active={loading}>
        <Spinner />
      </SpinnerWrapper>
      <InlineEdit
        {...rest}
        isEditing={isEditing}
        editView={editView}
        readView={readView}
      />
    </Wrapper>
  );
}
