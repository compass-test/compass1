import React from 'react';

import { Field } from '@atlaskit/form';

import { FieldWrapper } from './styled';

type FieldProps = React.ComponentProps<typeof Field>;

type FormFieldWrapperProps = {
  // Expect a single React component that looks like a Field
  children: React.ReactElement<FieldProps, typeof Field>;
};

/**
 * Wraps the default Field component and adds extra margin to the top.
 * To be used consistently across forms.
 */
export function FormFieldWrapper(props: FormFieldWrapperProps) {
  return <FieldWrapper>{props.children}</FieldWrapper>;
}
