import React from 'react';

import Spinner from '@atlaskit/spinner';

import * as S from './styled';

export type Props = {
  labelKey?: string;
  labelValue?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  description?: React.ReactNode;
};

const RadioLabel = ({
  labelKey,
  labelValue,
  disabled,
  isLoading = false,
  description,
}: Props) => {
  return (
    <>
      <S.Title isDisabled={disabled}>
        {labelKey && (
          <strong>
            {labelKey}
            {isLoading || labelValue ? ': ' : ' '}
          </strong>
        )}
        {isLoading ? <Spinner size="small" /> : labelValue}
      </S.Title>
      <S.Description>{description}</S.Description>
    </>
  );
};

export default RadioLabel;
