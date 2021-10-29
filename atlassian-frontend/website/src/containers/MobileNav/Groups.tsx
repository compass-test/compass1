/* global PUBLIC_PATH */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, matchPath } from 'react-router-dom';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import LockIcon from '@atlaskit/icon/glyph/lock';
import { BitbucketIcon } from '@atlaskit/logo/bitbucket-icon';
import packagesNav from './navigations/Packages';
import ComponentIcon from '@atlaskit/icon/glyph/component';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import Button from '@atlaskit/button';
import {
  AkContainerNavigationNested as NestedNav,
  AkNavigationItem,
} from '@atlaskit/navigation';

import { Directory } from '../../types';

const publicPath =
  PUBLIC_PATH !== '/' ? `${PUBLIC_PATH}index.html#/` : PUBLIC_PATH;

export type GroupsProps = {
  docs: Directory;
  packages: Directory;
  onClick?: (e: Event) => void | undefined;
};

export type GroupsState = {
  parentRoute?: Object | null;
  stack: Array<React.ReactNode>;
};

export type GroupsContext = {
  router: { route: Route };
};

export default class Groups extends React.Component<
  GroupsProps & { onClick: () => void },
  GroupsState
> {
  static contextTypes = {
    router: PropTypes.object,
  };

  state: GroupsState = {
    parentRoute: null,
    stack: [
      [
        <AkNavigationItem
          text="Get started"
          icon={<OverviewIcon label="Get started" />}
          href={`${publicPath}get-started`}
          key={'Get started'}
        />,
        <AkNavigationItem
          text="Atlassian Frontend docs (Atlassians-only)"
          icon={<LockIcon label="Atlassian Frontend docs (Atlassians-only)" />}
          href="https://developer.atlassian.com/cloud/framework/atlassian-frontend"
          key={'Atlassian Frontend docs (Atlassians-only)'}
        />,
        <AkNavigationItem
          text="Packages"
          icon={<ComponentIcon label="Packages" />}
          action={
            <Button
              appearance="subtle"
              iconBefore={<ChevronRightIcon label="Packages" size="medium" />}
              spacing="none"
            />
          }
          onClick={() => this.createPackagesStack()}
          key={'Packages'}
        />,
        <AkNavigationItem
          text="Repository (Atlassians-only)"
          icon={
            <BitbucketIcon label="Repository (Atlassians-only)" size="small" />
          }
          action={<Button appearance="subtle" spacing="none" />}
          href="https://bitbucket.org/atlassian/atlassian-frontend"
          key={'Repository (Atlassians-only'}
        />,
        <AkNavigationItem
          text="Repository (Public)"
          icon={<BitbucketIcon label="Repository (Public)" size="small" />}
          action={<Button appearance="subtle" spacing="none" />}
          href="https://bitbucket.org/atlassian/design-system-mirror"
          key={'Repository (Public)'}
        />,
      ],
    ],
  };

  UNSAFE_componentWillMount() {
    //buildNavForPath(this.context.router.route.location.pathname);
    this.resolveRoutes(this.context.router.route.location.pathname);
  }

  UNSAFE_componentWillReceiveProps(
    nextProps: GroupsProps,
    nextContext: GroupsContext,
  ) {
    this.resolveRoutes((nextContext.router.route as any).location.pathname);
  }

  popStack = () => {
    this.setState({
      stack: [...this.state.stack.slice(0, -1)],
    });
  };

  createPackagesStack = () => {
    this.setState({
      stack: [
        ...this.state.stack,
        [
          <AkNavigationItem
            text="Back"
            icon={<ArrowLeftIcon label="Add-ons icon" />}
            onClick={() => this.popStack()}
            key="back"
          />,
          ...packagesNav({
            pathname: this.context.router.route.location.pathname,
            packages: this.props.packages,
            onClick: () => this.props.onClick(),
          }),
        ],
      ],
    });
  };

  resolveRoutes = (pathname: string) => {
    if (matchPath(pathname, '/packages')) {
      this.createPackagesStack();
    }
  };

  addItemsToStack = (items: Array<React.ReactNode>) => {
    this.setState({
      stack: [...this.state.stack, [...items]],
    });
  };

  render() {
    const { stack } = this.state;
    return <NestedNav stack={stack} />;
  }
}
