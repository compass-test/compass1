import Header from './index';
import React from 'react';
import { generateMetadata } from '../../../../common/util/storybook';

export default generateMetadata(
  'ProjectPagesComponent/ConnectSpaceDialog/ConnectSpaceDialogHeader',
);

export const DefaultHeader = (props: any) => <Header {...props} />;
