import React from 'react';
import { action } from '@storybook/addon-actions';

import { DefaultLink } from './create-space-link/examples';
import {
  SpacePickerWhileSubmitting,
  SpacePickerWithValues,
} from './space-picker/examples';
import Content from './index';
import { generateMetadata } from '../../../common/util/storybook';

const defaultEventHandlers = {
  onCreateSpace: action('onCreateSpace'),
  onSpaceSelected: action('onSpaceSelected'),
};

export default generateMetadata(
  'ProjectPagesComponent/ConnectSpaceDialog/ConnectSpaceDialogContent',
);

export const DefaultContent = (props: any) => (
  <Content
    {...defaultEventHandlers}
    SpacePicker={SpacePickerWithValues}
    CreateSpaceLink={DefaultLink}
    {...props}
  />
);

export const ContentWhileSubmitting = (props: any) => (
  <Content
    {...defaultEventHandlers}
    SpacePicker={SpacePickerWhileSubmitting}
    CreateSpaceLink={DefaultLink}
    {...props}
  />
);
