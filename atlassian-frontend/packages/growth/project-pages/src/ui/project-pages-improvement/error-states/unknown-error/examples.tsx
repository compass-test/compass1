import React from 'react';
import UnknownError from './index';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 70vw;
`;

export const Default = () => {
  return (
    <IntlProvider locale="en">
      <Wrapper>
        <UnknownError />
      </Wrapper>
    </IntlProvider>
  );
};
