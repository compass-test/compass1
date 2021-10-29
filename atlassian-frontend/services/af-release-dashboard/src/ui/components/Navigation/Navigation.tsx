import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AtlassianIcon } from '@atlaskit/logo';
import Tooltip from '@atlaskit/tooltip';
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';
import { B200, B400, N50, N800 } from '@atlaskit/theme/colors';
import { ReleaseSelector } from './ReleaseSelector';
import { ENVIRONMENT, getEnvironment } from '../../../server/constants';

const HeaderServiceTitle = styled.h1`
  color: ${N800};
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.7rem;
`;

const HeaderContainer = styled.div`
  flex: 0 0 290px;
  border-right: 1px solid ${N50};
  a:hover {
    text-decoration: none;
  }
`;

const EnvironmentContainer = styled.span`
  align-self: center;
  text-transform: capitalize;
  text-align: center;

  pre {
    text-transform: uppercase;
  }
`;

const AtlassianHome = () => (
  <HeaderContainer>
    <Link to="/">
      <HeaderServiceTitle>
        <AtlassianIcon
          iconColor={B200}
          iconGradientStart={B400}
          iconGradientStop={B200}
        />
        Scheduled Releases
      </HeaderServiceTitle>
    </Link>
  </HeaderContainer>
);

const EnvironmentBadge = () => {
  const env = getEnvironment();
  return env !== ENVIRONMENT.PROD ? (
    <EnvironmentContainer>
      <Tooltip
        content="The data presented on this page may not be accurate due to non-production data sources"
        position="bottom"
        tag="span"
      >
        <pre>{`${env} Environment`}</pre>
      </Tooltip>
      <a href="http://go/af-release" target="_self">
        Switch to Production
      </a>
    </EnvironmentContainer>
  ) : null;
};

export class Navigation extends Component {
  render() {
    return (
      <AtlassianNavigation
        primaryItems={[<ReleaseSelector />, <EnvironmentBadge />]}
        renderProductHome={AtlassianHome}
      />
    );
  }
}
