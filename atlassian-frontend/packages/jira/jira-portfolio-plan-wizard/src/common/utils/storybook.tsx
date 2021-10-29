/* eslint-disable import/no-extraneous-dependencies */

import React, { ReactElement } from 'react';

import { action as actionAddons } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import { IntlHookProvider } from './intl';
import { isVrTesting } from './vr';

type StoryFn = () => ReactElement;

export const withIntl = (storyFn: StoryFn) => (
  <IntlProvider locale="en">
    <IntlHookProvider>{storyFn()}</IntlHookProvider>
  </IntlProvider>
);

export const withMaxWidth = (maxWidthInPx: number = 508) => (
  storeFn: StoryFn,
) => <div style={{ maxWidth: maxWidthInPx }}>{storeFn()}</div>;

export const action: typeof actionAddons = (name, options) => {
  return isVrTesting() ? () => {} : actionAddons(name, options);
};
