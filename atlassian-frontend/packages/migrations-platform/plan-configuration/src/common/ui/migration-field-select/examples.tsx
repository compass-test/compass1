import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';

import Form from '@atlaskit/form';

import MigrationFieldSelect, { Props } from './main';

const FormWrapper: FC = ({ children }) => {
  return (
    <IntlProvider locale="en">
      <Form onSubmit={() => {}}>
        {(formProps) => {
          return <form {...formProps}>{children}</form>;
        }}
      </Form>
    </IntlProvider>
  );
};

type ContainerStyle = NonNullable<Props<number>['styles']>['container'];

const containerStyle: ContainerStyle = (styles) => {
  return { ...styles, width: 340, marginBottom: 20 };
};

// Assuming the data is a number
const baseProps: Props<number> = {
  name: 'Migration Field Select',
  label: 'Migration Field Select Label',
  styles: { container: containerStyle },
  onChange: () => {},
  defaultOption: { data: 3, value: 'Value 3', label: 'Label 3' },
  options: [
    { data: 1, value: 'Value 1', label: 'Label 1' },
    { data: 2, value: 'Value 2', label: 'Label 2' },
    { data: 3, value: 'Value 3', label: 'Label 3' },
  ],
};

export const MigrationFieldSelectBasic = (props: Partial<Props<number>>) => {
  return (
    <FormWrapper>
      <MigrationFieldSelect {...baseProps} {...props} />
    </FormWrapper>
  );
};

export const MigrationFieldSelectLoading = (props: Partial<Props<number>>) => {
  return (
    <FormWrapper>
      <MigrationFieldSelect {...baseProps} {...props} isLoading />
    </FormWrapper>
  );
};
