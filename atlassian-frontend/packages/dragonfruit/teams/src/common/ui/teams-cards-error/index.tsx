import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { Card, CardBody } from '@atlassian/dragonfruit-common-ui';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { Description, ErrorStateWrapper, Header } from './styled';

type Props = {
  description: string;
};

type ImageProps = {
  height?: number;
  maxHeight: number;
  maxWidth: number;
};
const Image = styled.img<ImageProps>`
  display: block;
  height: ${(props) => props.height || 'auto'};
  margin: 0 auto ${gridSize() * 3}px;
  max-height: ${(props) => props.maxHeight}px;
  max-width: ${(props) => props.maxWidth}px;
  width: ${(props) => props.width || 'auto'};
`;

export const TeamsCardError: React.FC<Props> = ({ description }) => {
  const { formatMessage } = useIntl();
  return (
    <ErrorStateWrapper data-testid="dragonfruit.teams-cards.error-state">
      <Card>
        <CardBody>
          <Header>{formatMessage(messages.errorStateTitle)}</Header>
          <Image
            alt=""
            src={ErrorIcon}
            maxWidth={gridSize() * 20}
            maxHeight={gridSize() * 20}
            width={55}
            height={73}
          />
          <Description>{description}</Description>
        </CardBody>
      </Card>
    </ErrorStateWrapper>
  );
};
