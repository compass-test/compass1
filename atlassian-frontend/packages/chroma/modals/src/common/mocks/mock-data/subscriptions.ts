import { EditionChangeLifecycleProps } from '../../../types';
import { Editions, ProductKeys } from '../../constants';

/**
 * One Free, One Standard subscription before upgrade
 */
export const preUpgradeSubscriptions: EditionChangeLifecycleProps = {
  cloudId: 'DUMMY-12113',
  siteUrl: 'https://fake.jira-dev.com',
  subscriptions: [
    {
      product: ProductKeys.CONFLUENCE,
      edition: Editions.FREE,
      upgradeRequired: true,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: false,
    },
    {
      product: ProductKeys.JIRA_SOFTWARE,
      edition: Editions.STANDARD,
      upgradeRequired: false,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: false,
    },
  ],
};

/**
 * Both Standard subscriptions before upgrade
 */
export const preUpgradeSubscriptionsStandard: EditionChangeLifecycleProps = {
  cloudId: 'DUMMY-12113',
  siteUrl: 'https://fake.jira-dev.com',
  subscriptions: [
    {
      product: ProductKeys.CONFLUENCE,
      edition: Editions.STANDARD,
      upgradeRequired: false,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: false,
    },
    {
      product: ProductKeys.JIRA_SOFTWARE,
      edition: Editions.STANDARD,
      upgradeRequired: false,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: false,
    },
  ],
};

/**
 * Post-upgrade, where one of the subscriptions was upgraded
 */
export const postUpgradeSubscriptions: EditionChangeLifecycleProps = {
  cloudId: 'DUMMY-12113',
  siteUrl: 'https://fake.jira-dev.com',
  subscriptions: [
    {
      product: ProductKeys.CONFLUENCE,
      edition: Editions.FREE,
      upgradeRequired: true,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: true,
    },
    {
      product: ProductKeys.JIRA_SOFTWARE,
      edition: Editions.STANDARD,
      upgradeRequired: false,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: false,
    },
  ],
};

/**
 * Post-upgrade, where one of the products did the access grant
 */
export const postUpgradeOneProductAccessGranted: EditionChangeLifecycleProps = {
  cloudId: 'DUMMY-12113',
  siteUrl: 'https://fake.jira-dev.com',
  subscriptions: [
    {
      product: ProductKeys.CONFLUENCE,
      edition: Editions.FREE,
      upgradeRequired: true,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: true,
    },
    {
      product: ProductKeys.JIRA_SOFTWARE,
      edition: Editions.STANDARD,
      upgradeRequired: false,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: false,
    },
  ],
};

export const preUpgradeSubscriptionsOnlyOneProduct: EditionChangeLifecycleProps = {
  cloudId: 'DUMMY-12113',
  siteUrl: 'https://fake.jira-dev.com',
  subscriptions: [
    {
      product: ProductKeys.CONFLUENCE,
      edition: Editions.STANDARD,
      upgradeRequired: false,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: false,
    },
  ],
};

export const postUpgradeSubscriptionsOnlyOneProduct: EditionChangeLifecycleProps = {
  cloudId: 'DUMMY-12113',
  siteUrl: 'https://fake.jira-dev.com',
  subscriptions: [
    {
      product: ProductKeys.CONFLUENCE,
      edition: Editions.FREE,
      upgradeRequired: true,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: true,
    },
  ],
};
