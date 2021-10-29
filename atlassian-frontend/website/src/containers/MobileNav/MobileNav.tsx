/* global PUBLIC_PATH */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Tooltip from '@atlaskit/tooltip';
import MobileHeader from '@atlaskit/mobile-header';
import Navigation, { AkContainerTitle } from '@atlaskit/navigation';

import Groups from './Groups';
import { AtlaskitIcon } from '../../components/AtlaskitIcon';
import { externalPackages, docs } from '../../site';

const publicPath =
  PUBLIC_PATH !== '/' ? `${PUBLIC_PATH}index.html#/` : PUBLIC_PATH;

export function Nav({
  closeNav,
}: RouteComponentProps & { closeNav: () => void }) {
  const groups = (
    <Groups onClick={closeNav} docs={docs()} packages={externalPackages()} />
  );

  return (
    <Navigation
      isResizeable={false}
      globalPrimaryItemHref={publicPath}
      globalPrimaryIcon={
        <Tooltip content="Home" position="right">
          <AtlaskitIcon />
        </Tooltip>
      }
      containerHeaderComponent={() => (
        <AkContainerTitle
          icon={<AtlaskitIcon monochrome />}
          text={'Atlaskit'}
          href={publicPath}
        />
      )}
    >
      {groups}
    </Navigation>
  );
}

export default function MobileNav({ props }: { props: RouteComponentProps }) {
  const [drawerState, setDrawerState] = React.useState<string>('none');

  return (
    <MobileHeader
      navigation={(isOpen: boolean) =>
        isOpen && <Nav closeNav={() => setDrawerState('none')} {...props} />
      }
      menuIconLabel="Open navigation"
      drawerState={drawerState}
      onNavigationOpen={() => setDrawerState('navigation')}
      onDrawerClose={() => setDrawerState('none')}
    />
  );
}
