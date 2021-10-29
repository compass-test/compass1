import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentOptionLabel } from './main';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const ComponentOptionLabelExample = () => {
  const label = text('Label', 'The Best Component');
  const type = select(
    'Component type',
    CompassComponentType,
    CompassComponentType.SERVICE,
  );

  const isManaged = boolean('Managed externally', false);
  const teamName = text('Team name', 'Cool Team of Cool Kids');
  const teamAvatarUrl = text(
    'Team avatar',
    'https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg',
  );

  const width = number('Max width', 500);

  const Container = styled.div`
    width: ${width}px;
    max-width: ${width}px;
  `;

  const option = {
    label,
    type,
    isManaged,
    teamName,
    teamAvatarUrl,
  };
  return (
    <Container>
      <ComponentOptionLabel option={option} isOwnerTeamLoaded={true} />
    </Container>
  );
};

export const ComponentOptionLabelExampleLoading = () => {
  const label = text('Label', 'The Best Component');
  const type = select(
    'Component type',
    CompassComponentType,
    CompassComponentType.SERVICE,
  );

  const isManaged = boolean('Managed externally', false);
  const teamName = null;
  const width = number('Max width', 500);

  const Container = styled.div`
    width: ${width}px;
    max-width: ${width}px;
  `;

  const option = {
    label,
    type,
    isManaged,
    teamName,
  };

  return (
    <Container>
      <ComponentOptionLabel option={option} isOwnerTeamLoaded={false} />
    </Container>
  );
};
