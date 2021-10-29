import React from 'react';

import { action } from '@storybook/addon-actions';

import Form, { Field } from '@atlaskit/form';
import Select, { OptionType, ValueType } from '@atlaskit/select';
import {
  BackButton,
  AnalyticsButton as Button,
  ContinueButton,
} from '@atlassian/mpt-elements';

import FocusPage from '../src';

export default function FocusPageExample() {
  return (
    <Form onSubmit={action('FocusPage.onSubmit')}>
      {({ formProps }) => {
        return (
          <FocusPage
            title="My focus page"
            onClose={action('FocusPage.onClose')}
            headerButtons={[
              <Button>Button #1</Button>,
              <Button>Button #2</Button>,
            ]}
            footerButtons={[
              <BackButton onClick={action('FocusPage.onBack')} />,
              <ContinueButton type="submit">Next</ContinueButton>,
            ]}
            Container="form"
            containerProps={formProps}
          >
            <Field<ValueType<OptionType>>
              name="select-field"
              defaultValue={{ label: 'Option 2', value: 2 }}
            >
              {({ fieldProps }) => {
                return (
                  <Select
                    {...fieldProps}
                    options={[
                      {
                        label: 'Option 1',
                        value: 1,
                      },
                      {
                        label: 'Option 2',
                        value: 2,
                      },
                    ]}
                  />
                );
              }}
            </Field>
          </FocusPage>
        );
      }}
    </Form>
  );
}
