import React, { FC } from 'react';

import Markdown from 'react-markdown';

import { UseCase } from '../../../types';

import { Caption } from './styled';

export const UseCaseDetail: FC<{ useCase: UseCase }> = ({ useCase }) => {
  const description: string = useCase.description ? useCase.description : '';
  return (
    <>
      <Caption>{`${useCase.caption['i-want-to']}`}</Caption>
      <Markdown source={description.replace(/\s+/g, ' ')} />
    </>
  );
};
