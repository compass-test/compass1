import React from 'react';
import { Props } from '../types';
import { SmartUserPicker } from './SmartUserPicker';
import MessagesIntlProvider from './MessagesIntlProvider';

const SmartUserPickerWithIntlProvider: React.FunctionComponent<Props> = (
  props,
) => (
  <MessagesIntlProvider>
    <SmartUserPicker {...props} />
  </MessagesIntlProvider>
);

export default SmartUserPickerWithIntlProvider;
