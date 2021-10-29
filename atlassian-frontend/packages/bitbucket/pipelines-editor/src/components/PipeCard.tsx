import React from 'react';

import { Pipe } from '../types';

import CopyYml from './CopyYml';
import PipeTag from './PipeTag';
import {
  PipeCardCopyButton,
  PipeCardDescription,
  PipeCardHeader,
  PipeCardIcon,
  PipeCardTagItem,
  PipeCardTags,
  PipeCardTitle,
  PipeCardVersion,
  PipeCardWrapper,
} from './styled';

type Props = {
  pipe: Pipe;
  setPipe: (pipe: Pipe) => void;
  onSearch: (search: string) => void;
};

const PipeCard: React.FC<Props> = ({ pipe, setPipe, onSearch }) => {
  return (
    <PipeCardWrapper onClick={() => setPipe(pipe)}>
      <PipeCardHeader>
        <PipeCardIcon>
          <img src={pipe.logo} alt={pipe.name} />
        </PipeCardIcon>
        <PipeCardTitle>
          <h5>{pipe.name}</h5>
          {pipe.version && (
            <PipeCardVersion>{`v${pipe.version}`}</PipeCardVersion>
          )}
        </PipeCardTitle>
        <PipeCardCopyButton>
          <CopyYml yml={pipe.yml} oneClickCopy={false} />
        </PipeCardCopyButton>
      </PipeCardHeader>
      <PipeCardDescription>{pipe.description}</PipeCardDescription>
      <PipeCardTags>
        {pipe.tags
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
          .map((tag, i) => (
            <PipeCardTagItem key={`${tag}_${i}`}>
              <PipeTag tag={tag.toLowerCase()} onSearch={onSearch} />
            </PipeCardTagItem>
          ))}
      </PipeCardTags>
    </PipeCardWrapper>
  );
};

export default React.memo(PipeCard);
