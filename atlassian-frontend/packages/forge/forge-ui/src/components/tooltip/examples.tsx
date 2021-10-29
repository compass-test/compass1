import React from 'react';
import { action } from '@storybook/addon-actions';
import { ButtonProps } from '@atlassian/forge-ui-types';
import Tooltip from './';
import { Button as DefaultButton } from '../button';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';

const Button = createExampleComponent<ButtonProps>(DefaultButton);

export default createDefaultExport();

export const basic = () => (
  <Tooltip text="Hello World">
    <Button text="Hover Over Me" onClick={action('onClick')} />
  </Tooltip>
);
