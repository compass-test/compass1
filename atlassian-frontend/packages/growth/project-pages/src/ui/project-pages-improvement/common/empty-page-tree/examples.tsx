import React from 'react';
import EmptyPageTree from './index';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 70vw;
`;

export const Default = () => {
  return (
    <IntlProvider locale="en">
      <Wrapper>
        {/* TODO EMBED-110 remove EmptyPageTree */}
        <EmptyPageTree />
      </Wrapper>
    </IntlProvider>
  );
};
