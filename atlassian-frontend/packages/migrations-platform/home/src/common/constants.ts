import type { ProductKey } from '@atlassian/mpt-cards';

const CONFLUENCE_LINK: string = 'https://confluence.atlassian.com';

export const homePageConstants: Record<
  ProductKey,
  {
    prepareMigrationUrl: string;
    planYourMigrationUrl: string;
    migrationAssistantUrl: string;
  }
> = {
  'jira-server': {
    prepareMigrationUrl: `${CONFLUENCE_LINK}/x/w5T0OQ`,
    planYourMigrationUrl: `${CONFLUENCE_LINK}/x/luH0OQ`,
    migrationAssistantUrl: `${CONFLUENCE_LINK}/x/Xxg_Ow`,
  },
  'confluence-server': {
    prepareMigrationUrl: `${CONFLUENCE_LINK}/x/wpT0OQ`,
    planYourMigrationUrl: `${CONFLUENCE_LINK}/x/luH0OQ`,
    migrationAssistantUrl: `${CONFLUENCE_LINK}/x/6zkGOg`,
  },
  // TODO: create documentation for following links
  'bitbucket-server': {
    prepareMigrationUrl: `${CONFLUENCE_LINK}`,
    planYourMigrationUrl: `${CONFLUENCE_LINK}`,
    migrationAssistantUrl: `${CONFLUENCE_LINK}`,
  },
};
