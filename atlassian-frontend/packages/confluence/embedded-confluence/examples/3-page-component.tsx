import React from 'react';
import { IntlProvider } from 'react-intl';

import { Page } from '../src/page/Page';
import { useExampleMock } from './hooks/useExampleMock';

const PageExample = () => {
  const { controls, url } = useExampleMock({
    showUrl: true,
  });

  return (
    <IntlProvider locale={'en'}>
      <>
        {controls}
        <Page url={url} />
      </>
    </IntlProvider>
  );
};

export default PageExample;
