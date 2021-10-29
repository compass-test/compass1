import React from 'react';

import styled from 'styled-components';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { mockCriterias } from './mocks';

import Criterias from './index';

const WithOutWeightsWrapper = styled.div`
  width: 300px;
  border-radius: 3px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
`;

const WithWeightsWrapper = styled.div`
  width: 600px;
  border-radius: 3px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
`;

export const WithOutWeights = () => {
  return (
    <CompassTestProvider>
      <WithOutWeightsWrapper>
        <Criterias
          criterias={mockCriterias}
          showWeight={false}
          headingCase={'sentenceCase'}
        />
      </WithOutWeightsWrapper>
    </CompassTestProvider>
  );
};

export const WithWeights = () => {
  return (
    <CompassTestProvider>
      <WithWeightsWrapper>
        <Criterias
          criterias={mockCriterias}
          showWeight={true}
          headingCase={'upperCase'}
        />
      </WithWeightsWrapper>
    </CompassTestProvider>
  );
};
