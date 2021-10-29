import React from 'react';
import { action } from '@storybook/addon-actions';

import { CONFLUENCE_ACTIVE } from '../state/context/types';
import {
  CONFTREE_CONFLUENCE_ACTIVATING,
  CONFTREE_CONNECT_SPACE,
  CONFTREE_CROSS_SELL,
  CONFTREE_DISPLAY_PAGETREE,
  CONFTREE_ERROR,
  CONFTREE_PLACEHOLDER,
  CONFTREE_NO_ACCESS_TEASER,
} from '../state/ui/types';

import { DefaultConfluenceTree } from './confluence-tree/examples';
import {
  DefaultConnectDialog,
  ClosedConnectDialog,
} from './connect-space-dialog/examples';
import {
  DefaultCreateDialog,
  ClosedCreateDialog,
} from './create-space-dialog/examples';
import { DefaultActivating } from './empty-state/confluence-activating/examples';
import { DefaultConnectSpace } from './empty-state/connect-space/examples';
import {
  ServerError,
  RequestAccess,
} from './empty-state/server-error/examples';
import { DefaultFlag, ErrorFlag, SuccessFlag } from './flags/examples';
import { MoreMenuSpaceConnected, NoSpaceConnected } from './more-menu/examples';
import { DefaultPagesHeading } from './pages-heading/examples';
import View from './index';
import { generateMetadata } from '../common/util/storybook';

const defaultEventHandlers = {
  triggerProductsLicenceCheck: action('triggerProductsLicenceCheck triggered'),
  triggerXflowDialog: action('triggerXflowDialog triggered'),
  triggerShowConnectSpaceDialog: action(
    'triggerShowConnectSpaceDialog triggered',
  ),
  triggerHideConnectSpaceDialog: action(
    'triggerHideConnectSpaceDialog triggered',
  ),
  triggerShowCreateSpaceDialog: action(
    'triggerShowCreateSpaceDialog triggered',
  ),
};

export default generateMetadata('ProjectPagesComponent/View');

export const DumbWithDefaultValues = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const CrossSellView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_CROSS_SELL}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={false}
    {...props}
  />
);

export const CrossSellWithErrorView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={ErrorFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_CROSS_SELL}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={false}
    {...props}
  />
);

export const ConfluenceActivatingView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_CONFLUENCE_ACTIVATING}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={false}
    {...props}
  />
);

export const ActivatedButNotConnectedView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_CONNECT_SPACE}
    confluenceState={CONFLUENCE_ACTIVE}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const ActivatedConnectSpaceDialogView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={DefaultConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_CONNECT_SPACE}
    confluenceState={CONFLUENCE_ACTIVE}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const ActivatedCreateSpaceDialogView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={DefaultCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_CONNECT_SPACE}
    confluenceState={CONFLUENCE_ACTIVE}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const ConnectedWithConfluencePageTreeViewAndSuccessFlag = (
  props: any,
) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={SuccessFlag}
    MoreMenu={MoreMenuSpaceConnected}
    projectPagesContent={CONFTREE_DISPLAY_PAGETREE}
    confluenceState={CONFLUENCE_ACTIVE}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const ConnectedWithConfluencePageTreeView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={MoreMenuSpaceConnected}
    projectPagesContent={CONFTREE_DISPLAY_PAGETREE}
    confluenceState={CONFLUENCE_ACTIVE}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const LoadingView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedConnectDialog}
    CreateSpaceDialog={ClosedCreateDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_PLACEHOLDER}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const ServerErrorView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedCreateDialog}
    CreateSpaceDialog={ClosedConnectDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={ServerError}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_ERROR}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const AccessErrorRequestAccessView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedCreateDialog}
    CreateSpaceDialog={ClosedConnectDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={RequestAccess}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_NO_ACCESS_TEASER}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);

export const PreExpandImprovedPagesView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedCreateDialog}
    CreateSpaceDialog={ClosedConnectDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={RequestAccess}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_CROSS_SELL}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={false}
    {...props}
  />
);

export const PostExpandImprovedPagesView = (props: any) => (
  <View
    {...defaultEventHandlers}
    PagesHeading={DefaultPagesHeading}
    ConnectSpaceDialog={ClosedCreateDialog}
    CreateSpaceDialog={ClosedConnectDialog}
    ConfluenceTree={DefaultConfluenceTree}
    ConnectSpace={DefaultConnectSpace}
    ServerError={RequestAccess}
    ConfluenceActivating={DefaultActivating}
    Flags={DefaultFlag}
    MoreMenu={NoSpaceConnected}
    projectPagesContent={CONFTREE_DISPLAY_PAGETREE}
    confluenceState={CONFLUENCE_ACTIVE}
    breadcrumbs={<div>Breadcrumbs</div>}
    hasConfluence={true}
    {...props}
  />
);
