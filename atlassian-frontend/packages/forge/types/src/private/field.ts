export interface FieldChildrenProps {
  fieldProps: {
    id: string;
    isRequired: boolean;
    isDisabled: boolean;
    isInvalid: boolean;
    onChange: (event: any) => any;
    onBlur: () => any;
    onFocus: () => any;
    value: any;
    'aria-invalid': 'true' | 'false';
    'aria-labelledby': string;
  };
}
