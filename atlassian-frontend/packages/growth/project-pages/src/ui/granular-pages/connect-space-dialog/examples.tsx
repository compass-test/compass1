import React from 'react';
import { action } from '@storybook/addon-actions';

import { DefaultContent, ContentWhileSubmitting } from './content/examples';
import {
  DefaultFooter,
  FooterWhileSubmitting,
  FooterWithConnectError,
  FooterWithFetchError,
  FooterWithSubmitEnabled,
} from './footer/examples';
import { DefaultHeader } from './header/examples';
import ConnectSpaceDialog from './index';
import { generateMetadata } from '../../../common/util/storybook';

const defaultEventHandlers = {
  onCancel: action('onCancel triggered'),
  onConnect: action('onConnect triggered'),
};

export default generateMetadata('ProjectPagesComponent/ConnectSpaceDialog');

export const DefaultConnectDialog = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={DefaultContent}
    Footer={DefaultFooter}
    isOpen
    {...props}
  />
);

export const ConnectDialogWithSubmitEnabled = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={DefaultContent}
    Footer={FooterWithSubmitEnabled}
    isOpen
    {...props}
  />
);

export const ConnectDialogWhileSubmitting = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={ContentWhileSubmitting}
    Footer={FooterWhileSubmitting}
    isOpen
    {...props}
  />
);

export const ConnectDialogWithConnectError = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={DefaultContent}
    Footer={FooterWithConnectError}
    isOpen
    {...props}
  />
);

export const ConnectDialogWithFetchError = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={DefaultContent}
    Footer={FooterWithFetchError}
    isOpen
    {...props}
  />
);
export const ClosedConnectDialog = (props: any) => (
  <ConnectSpaceDialog
    {...defaultEventHandlers}
    Header={DefaultHeader}
    Content={DefaultContent}
    Footer={DefaultFooter}
    isOpen={false}
    {...props}
  />
);
