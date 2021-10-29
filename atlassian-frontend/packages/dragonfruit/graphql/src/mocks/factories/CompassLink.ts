import faker from 'faker';

import { CompassLink, CompassLinkType } from '../../__generated__/graphql';

export type CompassLinkOverrides = Partial<
  Pick<CompassLink, 'id' | 'name' | 'url'>
>;

export const BaseCompassLink = () => {
  return {
    id: faker.random.uuid(),
    url: faker.internet.url(),
  };
};

export const FakeCompassRepositoryLink = (
  overrides?: CompassLinkOverrides,
): CompassLink => {
  return {
    ...BaseCompassLink(),
    name: 'Bitbucket',
    type: CompassLinkType.REPOSITORY,
    ...overrides,
  };
};

export const FakeCompassDocumentLink = (
  overrides?: CompassLinkOverrides,
): CompassLink => {
  return {
    ...BaseCompassLink(),
    name: 'Confluence',
    type: CompassLinkType.DOCUMENT,
    ...overrides,
  };
};

export const FakeCompassProjectLink = (
  overrides?: CompassLinkOverrides,
): CompassLink => {
  return {
    ...BaseCompassLink(),
    name: 'Jira Project',
    type: CompassLinkType.PROJECT,
    ...overrides,
  };
};

export const FakeCompassDashboardLink = (
  overrides?: CompassLinkOverrides,
): CompassLink => {
  return {
    ...BaseCompassLink(),
    name: 'Splunk',
    type: CompassLinkType.DASHBOARD,
    ...overrides,
  };
};

export const FakeCompassOtherLink = (
  overrides?: CompassLinkOverrides,
): CompassLink => {
  return {
    ...BaseCompassLink(),
    name: 'Atlassian',
    type: CompassLinkType.OTHER_LINK,
    ...overrides,
  };
};

export const FakeCompassCommsChannelLink = (
  overrides?: CompassLinkOverrides,
): CompassLink => {
  return {
    ...BaseCompassLink(),
    name: '#Compass',
    type: CompassLinkType.CHAT_CHANNEL,
    ...overrides,
  };
};

export const FakeCompassOnCallLink = (
  overrides?: CompassLinkOverrides,
): CompassLink => {
  return {
    ...BaseCompassLink(),
    name: 'Opsgenie',
    type: CompassLinkType.ON_CALL,
    ...overrides,
  };
};

export const getFakeLink = (linkType: CompassLinkType): CompassLink => {
  switch (linkType) {
    case CompassLinkType.REPOSITORY:
      return FakeCompassRepositoryLink();
    case CompassLinkType.DOCUMENT:
      return FakeCompassDocumentLink();
    case CompassLinkType.PROJECT:
      return FakeCompassProjectLink();
    case CompassLinkType.DASHBOARD:
      return FakeCompassDashboardLink();
    case CompassLinkType.OTHER_LINK:
      return FakeCompassOtherLink();
    case CompassLinkType.CHAT_CHANNEL:
      return FakeCompassCommsChannelLink();
    case CompassLinkType.ON_CALL:
      return FakeCompassOnCallLink();
    default:
      throw new Error('Unsupported link type');
  }
};

export const getFakeLinks = (
  linkType: CompassLinkType,
  count: number,
): CompassLink[] => {
  const links: CompassLink[] = [];
  for (let i = 0; i < count; i++) {
    const link = getFakeLink(linkType);
    links.push({
      ...link,
      name: `${link.name} ${i}`,
    });
  }
  return links;
};
