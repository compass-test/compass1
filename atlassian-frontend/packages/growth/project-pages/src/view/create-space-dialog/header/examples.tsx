import Header from './index';
import React from 'react';
import { generateMetadata } from '../../../common/util/storybook';

export default generateMetadata(
  'ProjectPagesComponent/CreateSpaceDialog/CreateSpaceDialogHeader',
);

export const DefaultHeader = (props: any) => <Header {...props} />;
