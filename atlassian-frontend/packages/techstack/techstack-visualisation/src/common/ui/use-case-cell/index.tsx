import React, { FC, useState } from 'react';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import InfoIcon from '@atlaskit/icon/glyph/info';
import InlineDialog from '@atlaskit/inline-dialog';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import { UseCase, UsedStack } from '../../types';

import { Caption, InfoIconWrapper, Wrapper } from './styled';
import { UseCaseDetail } from './use-case-detail';

export const UseCaseCell: FC<{
  useCase: UseCase;
  usedStack: UsedStack | string;
  highlightIsUsed?: boolean;
}> = ({ useCase, usedStack, highlightIsUsed = true }) => {
  const [showUseCaseDescription, setShowUseCaseDescription] = useState(false);
  let isUseCaseUsed = false;
  if (typeof usedStack === 'string' && usedStack === 'all') {
    isUseCaseUsed = true;
  } else {
    const usedStackObj = usedStack as UsedStack;
    isUseCaseUsed = Boolean(usedStackObj[useCase.id]);
  }

  const onInfoIconClick = () => setShowUseCaseDescription(true);
  const onInfoIconClose = () => setShowUseCaseDescription(false);
  return (
    <Wrapper isUseCaseUsed={isUseCaseUsed}>
      {isUseCaseUsed ? (
        <CheckCircleIcon
          size={'small'}
          primaryColor={colors.G400}
          label={'Use case used'}
        />
      ) : highlightIsUsed ? (
        <CrossCircleIcon
          size={'small'}
          primaryColor={colors.R400}
          label={'Use case not used'}
        />
      ) : null}
      <Caption>{useCase.caption['i-want-to']}</Caption>
      {useCase.description && (
        <InlineDialog
          content={<UseCaseDetail useCase={useCase} />}
          isOpen={showUseCaseDescription}
          onClose={onInfoIconClose}
        >
          <InfoIconWrapper onClick={onInfoIconClick}>
            <InfoIcon
              size={'small'}
              primaryColor={colors.B400}
              label={'More Info'}
            />
          </InfoIconWrapper>
        </InlineDialog>
      )}
    </Wrapper>
  );
};
