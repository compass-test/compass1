import React from 'react';
import { IntlProvider } from 'react-intl';
import { ViewPage } from '@atlassian/embedded-confluence';

export const SmartLinksConfluenceEmbedApp = () => {
  const url = new URL(location.href);
  const hostname = url.searchParams.get('hostname') || '';
  const spaceKey = url.searchParams.get('spaceKey') || '';
  const contentId = url.searchParams.get('contentId') || '';
  const parentProduct = url.searchParams.get('parentProduct') || '';

  return (
    <IntlProvider locale={'en'}>
      <ViewPage
        hostname={hostname}
        spaceKey={spaceKey}
        contentId={contentId}
        hasComments={false}
        hasLikes={false}
        parentProduct={parentProduct}
      />
    </IntlProvider>
  );
};
