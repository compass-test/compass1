import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import { HomeButton } from '../src';
export default function HomeButtonExample() {
  return (
    <IntlProvider locale="en">
      <HomeButton onClick={action('fake function call')} />
    </IntlProvider>
  );
}
