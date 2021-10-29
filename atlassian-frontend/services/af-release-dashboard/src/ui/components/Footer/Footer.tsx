import React from 'react';
import styled from 'styled-components';
import { ENVIRONMENT, getEnvironment } from '../../../server/constants';
import Lozenge from '@atlaskit/lozenge';

const FooterDiv = styled.footer`
  height: 1.8rem;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -4px;
    height: 4px;
    background: linear-gradient(
      0deg,
      rgba(9, 30, 66, 0.13) 0,
      rgba(9, 30, 66, 0.13) 1px,
      rgba(9, 30, 66, 0.08) 1px,
      rgba(9, 30, 66, 0) 4px
    );
  }
`;

export const Footer = () => {
  const EnvironmentLabel =
    getEnvironment() !== ENVIRONMENT.PROD ? (
      <Lozenge appearance="default">env: {getEnvironment()}</Lozenge>
    ) : null;

  return (
    <FooterDiv>
      <p>
        Maintained by{' '}
        <a
          href={'https://atlassian.slack.com/archives/CFKURAWVC'}
          target="_blank"
        >
          #team-twp-editor
        </a>{' '}
      </p>
      {EnvironmentLabel}
    </FooterDiv>
  );
};
