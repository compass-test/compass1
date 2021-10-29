import React from 'react';

import { Link } from 'react-resource-router';

import Tooltip from '@atlaskit/tooltip';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';

import { ComponentTypeIcon } from '../component-type-icon';

import { ContainerStyled, LinkStyled } from './styled';

type Props = {
  component: Pick<CompassComponent, 'name' | 'type'>;
  componentDetailsUrl: string;
};

export function ComponentName(props: Props) {
  const { component, componentDetailsUrl } = props;

  return (
    <ContainerStyled>
      <div>
        <ComponentTypeIcon type={component.type} />
      </div>
      <Tooltip content={component.name} key={`${component.name}`}>
        <LinkStyled>
          <Link to={componentDetailsUrl}>{component.name}</Link>
        </LinkStyled>
      </Tooltip>
    </ContainerStyled>
  );
}
