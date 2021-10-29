/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import '@atlaskit/css-reset';
import ShareButton from './index';
import {
  TranslationsProvider,
  DEFAULT_LOCALE,
} from '../../../translations-provider';

export const Default = () => {
  return (
    <TranslationsProvider locale={DEFAULT_LOCALE}>
      <ShareButton
        page={{
          id: 'id',
          url: 'https://copy-me.link/foo',
          editUrl: 'https://foo.bar/editurl',
          hasEmbeddedEdit: true,
          isDraft: false,
        }}
      />
    </TranslationsProvider>
  );
};
