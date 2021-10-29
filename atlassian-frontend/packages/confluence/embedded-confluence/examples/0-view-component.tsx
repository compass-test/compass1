import React from 'react';
import { IntlProvider } from 'react-intl';

import { ViewPage } from '../src';
import { useExampleMock } from './hooks/useExampleMock';
import { StyledContainer } from './StyledContainer';

const ViewComponentExample = () => {
  const { controls, spaceKey, contentId, hostname } = useExampleMock({
    showHostname: true,
    showSpaceKey: true,
    showContentId: true,
  });

  return (
    <IntlProvider locale={'en'}>
      <StyledContainer>
        {controls}
        <ViewPage
          hostname={hostname}
          spaceKey={spaceKey}
          contentId={contentId}
          parentProductContentContainerId=""
          navigationPolicy={{
            navigate(url, modifiers, defaultNavigate) {
              return defaultNavigate(url, modifiers);
            },
          }}
          parentProduct={'atlaskit'}
        />
      </StyledContainer>
    </IntlProvider>
  );
};

export default ViewComponentExample;
