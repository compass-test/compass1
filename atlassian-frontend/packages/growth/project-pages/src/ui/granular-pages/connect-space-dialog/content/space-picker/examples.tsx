import React from 'react';
import { action } from '@storybook/addon-actions';
import SpacePicker from './index';
import { generateMetadata } from '../../../../../common/util/storybook';

const defaultEventHandlers = { onSelected: action('onSelected') };

export const EmptySpacePicker = (props: any) => (
  <SpacePicker {...defaultEventHandlers} spaces={[]} {...props} />
);

export default generateMetadata(
  'ProjectPagesComponent/ConnectSpaceDialog/ConnectSpaceDialogContent/ConnectSpaceDialogContentSpacePicker',
);

export const SpacePickerWithValues = (props: any) => (
  <SpacePicker
    {...defaultEventHandlers}
    spaces={[
      {
        spaceKey: 'AAPL',
        spaceName: 'Apple',
      },
      {
        spaceKey: 'TEAM',
        spaceName: 'Atlassian',
      },
      {
        spaceKey: 'GOOG',
        spaceName: 'Google',
      },
    ]}
    {...props}
  />
);

export const SpacePickerWhileSubmitting = (props: any) => (
  <SpacePicker
    {...defaultEventHandlers}
    spaces={[]}
    isConnectingSpace
    {...props}
  />
);
