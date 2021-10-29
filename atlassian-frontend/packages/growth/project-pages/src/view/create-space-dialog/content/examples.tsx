import React from 'react';
import { action } from '@storybook/addon-actions';
import Content from './index';
import { generateMetadata } from '../../../common/util/storybook';

const defaultEventHandlers = {
  onSpaceNameChanged: action('onSpaceNameChanged'),
};

export default generateMetadata(
  'ProjectPagesComponent/CreateSpaceDialog/CreateSpaceDialogContent',
);

export const DefaultContent = (props: any) => (
  <Content {...defaultEventHandlers} {...props} />
);

export const ContentWithEmptyName = (props: any) => (
  <Content
    {...defaultEventHandlers}
    userEnteredSpaceName={''}
    spaceNameInvalid
    {...props}
  />
);

export const ContentWithInvalidName = (props: any) => (
  <Content
    {...defaultEventHandlers}
    userEnteredSpaceName={'T'}
    spaceNameInvalid
    {...props}
  />
);

export const ContentWithValue = (props: any) => (
  <Content {...defaultEventHandlers} userEnteredSpaceName={'TEAM'} {...props} />
);

export const ContentWithValueWhileSubmitting = (props: any) => (
  <Content
    {...defaultEventHandlers}
    userEnteredSpaceName={'TEAM'}
    isCreatingSpace
    {...props}
  />
);
