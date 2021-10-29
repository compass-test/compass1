/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Suspense } from 'react';
import { action } from '@storybook/addon-actions';
import { gridSize } from '@atlaskit/theme/constants';
import {
  FormProps,
  InlineDialogProps,
  ButtonProps,
} from '@atlassian/forge-ui-types';
import {
  createExampleComponent,
  createDefaultExport,
} from '@atlassian/aux-test-utils';
import { InlineDialog as DefaultInlineDialog } from './';
import { Form as DefaultForm } from '../form';
import { Button as DefaultButton } from '../button';
import TextField from '../textfield';
import { TextPlain } from '../text';

const InlineDialog = createExampleComponent<InlineDialogProps>(
  DefaultInlineDialog,
);
const Form = createExampleComponent<FormProps<any>>(DefaultForm);
const Button = createExampleComponent<ButtonProps>(DefaultButton);

createDefaultExport();

export const basic = () => {
  return (
    <InlineDialog>
      <TextPlain content="Hello world" />
    </InlineDialog>
  );
};

export const withForm = () => {
  return (
    <Suspense fallback="Loading...">
      <div
        css={css`
          width: ${gridSize() * 40}px;
        `}
      >
        <InlineDialog>
          <Form onSubmit={action('onSubmit')}>
            <TextField name="name" label="Name" />
            <Button
              key="actionButton.0"
              text="Cancel"
              onClick={action('onClick')}
            />
          </Form>
        </InlineDialog>
      </div>
    </Suspense>
  );
};
