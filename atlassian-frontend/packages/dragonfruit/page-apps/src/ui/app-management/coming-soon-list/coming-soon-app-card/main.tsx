import React from 'react';

import { Card, CardBody } from '@atlassian/dragonfruit-common-ui';

import {
  AppLogo,
  AppName,
  BodyWrapper,
  CardGroup,
} from '../../../../common/ui/app-card/styled';

import { ComingSoonNameAndLogoWrapper } from './styled';

interface Props {
  name: string;
  imageUrl: string;
}

export default function ComingSoonAppCard({ name, imageUrl }: Props) {
  return (
    <Card>
      <CardBody>
        <BodyWrapper>
          <CardGroup>
            <ComingSoonNameAndLogoWrapper>
              <AppLogo src={imageUrl} alt={''} />
              <AppName>{name}</AppName>
            </ComingSoonNameAndLogoWrapper>
          </CardGroup>
        </BodyWrapper>
      </CardBody>
    </Card>
  );
}
