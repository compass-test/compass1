import React from 'react';
import EmptyState from './index';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';
// eslint-disable-next-line

const Wrapper = styled.div`
  width: 70vw;
`;

export const Default = () => {
  return (
    <IntlProvider locale="en">
      <Wrapper>
        <EmptyState spaceKey="FOO" contentId="BAR" />
      </Wrapper>
    </IntlProvider>
  );
};
