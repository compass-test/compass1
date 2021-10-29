import React from 'react';
import { action } from '@storybook/addon-actions';
import CreateSpaceLink from './index';
import { generateMetadata } from '../../../../../common/util/storybook';

const defaultEventHandlers = {
  onCreateSpace: action('onCreateSpace'),
};

export default generateMetadata(
  'ProjectPagesComponent/ConnectSpaceDialog/ConnectSpaceDialogContent/ConnectSpaceDialogContentSpaceLink',
);

export const DefaultLink = (props: any) => (
  <CreateSpaceLink {...defaultEventHandlers} {...props} />
);

export const CreateSpaceLinkWhileSubmitting = (props: any) => (
  <CreateSpaceLink {...defaultEventHandlers} isConnectingSpace {...props} />
);
