import React from 'react';

import { DefaultStatWrapper, HeaderWrapper, StatWrapper } from './styled';

type StatFunc = () => number | string | JSX.Element;

type TeamStatisticProps = {
  header: string;
  stat: number | string | JSX.Element | StatFunc;
};

export const TeamStatistic = (props: TeamStatisticProps) => {
  const { header, stat } = props;
  const statDisplay =
    typeof stat === 'number' || typeof stat === 'string' ? (
      <DefaultStatWrapper>{stat}</DefaultStatWrapper>
    ) : typeof stat === 'function' ? (
      stat()
    ) : (
      stat
    );

  return (
    <StatWrapper>
      <HeaderWrapper>{header}</HeaderWrapper>
      {statDisplay}
    </StatWrapper>
  );
};
