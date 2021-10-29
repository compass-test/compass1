import React from 'react';
import { action } from '@storybook/addon-actions';

import {
  DefaultContent,
  ContentWithEmptyName,
  ContentWithInvalidName,
  ContentWithValue,
  ContentWithValueWhileSubmitting,
} from './content/examples';
import {
  DefaultFooter,
  FooterWhileGeneratingKey,
  FooterWhileSubmitting,
  FooterWithCreateError,
  FooterWithKeyError,
  FooterWithSubmitEnabled,
} from './footer/examples';
import { DefaultHeader } from './header/examples';
import ConnectSpaceDialog from './index';
import { generateMetadata } from '../../common/util/storybook';

const defaultEventHandlers = {
  onCancel: action('onCancel triggered'),
  onConnect: action('onConnect triggered'),
  onCreateSpace: action('onCreateSpace triggered'),
  onSpaceSelected: action('onSpaceSelected triggered'),
};

export default generateMetadata('ProjectPagesComponent/CreateSpaceDialog');

export const DefaultCreateDialog = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={DefaultContent}
    Footer={DefaultFooter}
    isOpen
    {...props}
  />
);

export const CreateDialogWithEmptyInput = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={ContentWithEmptyName}
    Footer={DefaultFooter}
    isOpen
    {...props}
  />
);

export const CreateDialogWithInvalidInput = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={ContentWithInvalidName}
    Footer={DefaultFooter}
    isOpen
    {...props}
  />
);

export const CreateDialogWhileGeneratingKey = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={ContentWithValue}
    Footer={FooterWhileGeneratingKey}
    isOpen
    {...props}
  />
);

export const CreateDialogWithSubmitEnabled = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={ContentWithValue}
    Footer={FooterWithSubmitEnabled}
    isOpen
    {...props}
  />
);

export const CreateDialogWhileSubmitting = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={ContentWithValueWhileSubmitting}
    Footer={FooterWhileSubmitting}
    isOpen
    {...props}
  />
);

export const CreateDialogWithSpaceKeyError = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={ContentWithValue}
    Footer={FooterWithKeyError}
    isOpen
    {...props}
  />
);

export const CreateDialogWithSpaceCreationError = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={ContentWithValue}
    Footer={FooterWithCreateError}
    isOpen
    {...props}
  />
);

export const ClosedCreateDialog = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={DefaultContent}
    Footer={DefaultFooter}
    isOpen={false}
    {...props}
  />
);
