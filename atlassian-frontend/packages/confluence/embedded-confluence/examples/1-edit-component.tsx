import React from 'react';

import { EditPage } from '../src';
import { useExampleMock } from './hooks/useExampleMock';
import { StyledContainer } from './StyledContainer';

const EditComponentExample = () => {
  const { controls, spaceKey, contentId, hostname } = useExampleMock({
    showHostname: true,
    showSpaceKey: true,
    showContentId: true,
  });

  return (
    <StyledContainer>
      {controls}
      <EditPage
        spaceKey={spaceKey}
        contentId={contentId}
        parentProductContentContainerId=""
        hostname={hostname}
        navigationPolicy={{
          navigate(url, modifiers, defaultNavigate) {
            return defaultNavigate(url, modifiers);
          },
        }}
        parentProduct={'atlaskit'}
      />
    </StyledContainer>
  );
};

export default EditComponentExample;
