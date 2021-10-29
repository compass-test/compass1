import React, { ReactElement } from 'react';

import { number, select, text } from '@storybook/addon-knobs';
import styled from 'styled-components';

import {
  CompassComponentType,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ScorecardItem, { ScorecardLoadingItem } from './main';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const ScorecardItemExample = () => {
  const label = text('Label', 'Accountability');
  const componentType = select(
    'Component type',
    CompassComponentType,
    CompassComponentType.SERVICE,
  );

  const importance = select(
    'Importance',
    CompassScorecardImportance,
    CompassScorecardImportance.REQUIRED,
  );

  const description = text(
    'description',
    'This scorecard is for preparing your services to be tracked in a production environment',
  );

  const width = number('Max width', 500);

  const Container = styled.div`
    width: ${width}px;
  `;

  const option = {
    componentType,
    label,
    importance,
    description,
    value: '',
  };

  return (
    <Container>
      <ScorecardItem option={option} />
    </Container>
  );
};

export const ScorecardLoadingItemExample = () => {
  const width = number('Max width', 500);

  const Container = styled.div`
    width: ${width}px;
  `;

  return (
    <Container>
      <ScorecardLoadingItem />
    </Container>
  );
};
