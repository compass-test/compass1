import React from 'react';
import { action } from '@storybook/addon-actions';
import { ButtonProps } from '@atlassian/forge-ui-types';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';
import { Button as DefaultButton } from './Button';
import { ButtonSet } from './ButtonSet';

const Button = createExampleComponent<ButtonProps>(DefaultButton);

export default createDefaultExport();

export const basic = () => <Button onClick={action('onClick')} text="Submit" />;

export function Appearance() {
  return (
    <ButtonSet>
      <Button onClick={action('onClick')} appearance="default" text="Default" />
      <Button onClick={action('onClick')} appearance="danger" text="Danger" />
      <Button onClick={action('onClick')} appearance="primary" text="Primary" />
      <Button onClick={action('onClick')} appearance="subtle" text="Subtle" />
      <Button
        onClick={action('onClick')}
        appearance="subtle-link"
        text="Subtle Link"
      />
      <Button onClick={action('onClick')} appearance="warning" text="Warning" />
    </ButtonSet>
  );
}

export const disabled = () => (
  <Button onClick={action('onClick')} disabled text="Submit" />
);

export const buttonSet = () => (
  <ButtonSet>
    <Button text="Allow" onClick={action('onClick')} />
    <Button text="Deny" onClick={action('onClick')} />
    <Button text="Default" onClick={action('onClick')} />
    <Button text="Disabled" onClick={action('onClick')} disabled />
    <Button text="Some more text" onClick={action('onClick')} />
    <Button text="This container will wrap" onClick={action('onClick')} />
    <Button text="if the buttons cannot fit on" onClick={action('onClick')} />
    <Button text="one line" onClick={action('onClick')} />
    <Button appearance="danger" text="Stop" onClick={action('onClick')} />
  </ButtonSet>
);

export function WithIcon() {
  return (
    <Button
      appearance="danger"
      text="Stop"
      onClick={action('onClick')}
      icon="editor-warning"
    />
  );
}

export function WithIconAfter() {
  return (
    <Button
      appearance="danger"
      text="Stop"
      onClick={action('onClick')}
      icon="editor-warning"
      iconPosition="after"
    />
  );
}
