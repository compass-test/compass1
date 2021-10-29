import React from 'react';
import PagesHeading from './index';
import { generateMetadata } from '../../common/util/storybook';

export default generateMetadata('ProjectPagesComponent/PagesHeading');

export const DefaultPagesHeading = (props: any) => <PagesHeading {...props} />;

export const PagesHeadingPermissionError = (props: any) => (
  <PagesHeading templatesUIError {...props} />
);
