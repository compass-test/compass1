import React from 'react';

import {
  AtlassianNavigation,
  NavigationTheme,
  PrimaryButton,
  ProductHome,
} from '@atlaskit/atlassian-navigation';
import { AtlassianIcon, AtlassianLogo } from '@atlaskit/logo';

import appsSplash from './assets/Apps4x.png';
import * as styled from './styled';

const ProductHomeExample = () => (
  <ProductHome icon={AtlassianIcon} logo={AtlassianLogo} />
);

interface Props {
  peopleMenu: React.ReactNode;
  theme?: NavigationTheme;
}

export function AtlassianNavExample(props: Props) {
  const { peopleMenu, theme } = props;

  return (
    <styled.AppWrapper>
      <AtlassianNavigation
        label="people-menu-example"
        primaryItems={[
          <PrimaryButton key="issues">Issues</PrimaryButton>,
          <PrimaryButton key="project">Projects</PrimaryButton>,
          <PrimaryButton key="apps">Apps</PrimaryButton>,
          <PrimaryButton key="hello">Hello World</PrimaryButton>,
          peopleMenu,
        ]}
        renderProductHome={ProductHomeExample}
        theme={theme}
      />
      <styled.AppBackgroundImage src={appsSplash} />
    </styled.AppWrapper>
  );
}
