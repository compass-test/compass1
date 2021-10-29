import React, { useEffect } from 'react';
import CreatePageError from './index';
import { generateMetadata } from '../../../common/util/storybook';
import {
  EmbeddedPageProvider,
  useEmbeddedPage,
} from '../../../controllers/embedded-page';
import { action } from '@storybook/addon-actions';

export default generateMetadata(
  'ProjectPagesComponent/EmbeddedConfluenceDialog/CreatePageError',
);

const DummyError = () => {
  const { setEmbeddedPage } = useEmbeddedPage();
  useEffect(() => {
    setEmbeddedPage({
      pageCreate: {
        error: new Error('storybook test'),
        parentContentId: 'parent-id',
        isRoot: false,
        blueprint: undefined,
      },
    });
  }, [setEmbeddedPage]);
  return null;
};

export const Default = () => (
  <EmbeddedPageProvider>
    <DummyError />
    <CreatePageError spaceKey="FOO" onCloseModal={action('close-modal')} />
  </EmbeddedPageProvider>
);
