import { CompassLinkType } from '@atlassian/dragonfruit-graphql';

export const compassLinkTypes = {
  //On details
  Repository: CompassLinkType.REPOSITORY,
  Document: CompassLinkType.DOCUMENT,
  Project: CompassLinkType.PROJECT,
  Dashboard: CompassLinkType.DASHBOARD,
  Other: CompassLinkType.OTHER_LINK,
  // ON Sidebar
  CommsChannel: CompassLinkType.CHAT_CHANNEL,
  OnCall: CompassLinkType.ON_CALL,
};

export enum LinkListPosition {
  Main = 'main',
  Sidebar = 'sidebar',
}
