import React, { FC } from 'react';

import Markdown from 'react-markdown';

import { Solution, UseCase } from '../../../common/types';
import { StatusLozenge } from '../../../common/ui/status-lozenge';
import { YoutubePlayer } from '../../../common/ui/youtube-player';

import {
  Caption,
  CheckWrapper,
  Description,
  Heading,
  SubCaption,
  VideoWrapper,
  Wrapper,
} from './styled';

const youtubeLinks: { [key: string]: string } = {
  'sweet-state': 'ej3XuXBkyk4',
  'tangerine-next': 'HJfBDeWZO_I',
};

export const SolutionPanel: FC<{ useCase: UseCase; solution: Solution }> = ({
  useCase,
  solution,
}) => {
  return (
    <Wrapper>
      <Heading>{`As a ${useCase.caption['as-a']} I want to ${useCase.caption['i-want-to']}`}</Heading>
      {useCase.description && (
        <Description>
          <Markdown source={useCase.description.replace(/\s+/g, ' ')} />
        </Description>
      )}
      <Heading>
        {`Solution : ${solution.caption}`}
        {solution.status && <StatusLozenge status={solution.status} />}
      </Heading>
      {(solution.checks || solution.antiChecks) && <Caption>Rules</Caption>}
      {solution.checks && <SubCaption>Checks</SubCaption>}
      {solution.checks &&
        solution.checks.map((check, index) => (
          <CheckWrapper key={index}>
            <div>{check.rule}</div>
            <div>({check.type})</div>
          </CheckWrapper>
        ))}
      {solution.antiChecks &&
        solution.antiChecks.map((check, index) => (
          <CheckWrapper key={index}>
            <div>{check.rule}</div>
            <div>({check.type})</div>
          </CheckWrapper>
        ))}
      {youtubeLinks[solution.id] && (
        <>
          <h5>Learn more</h5>
          <VideoWrapper>
            <YoutubePlayer youtubeId={youtubeLinks[solution.id]} />
          </VideoWrapper>
        </>
      )}
    </Wrapper>
  );
};
