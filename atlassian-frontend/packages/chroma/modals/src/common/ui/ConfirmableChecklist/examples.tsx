import React from 'react';

import { radios, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { EditionChangeLifecycleProps } from '../../../types';
import { Editions, ProductKeys } from '../../constants';

const twiddlableSubscription = () => {
  let sub: EditionChangeLifecycleProps = {
    cloudId: 'DUMMY-12113',
    siteUrl: 'https://fake.jira-dev.com',
    subscriptions: [],
  };

  let style = radios(
    'Checklist Style',
    { Checkboxes: 'checkbox', Confirmation: 'confirmation' },
    'checkbox',
    'Main Opts',
  );

  // What product subscriptions, and what order, we want to show
  let products = select(
    'Products available',
    {
      'Jira Only': 'jira',
      'Connie only': 'confluence',
      'Jira, Connie': 'jira-confluence',
      'Connie, Jira': 'confluence-jira',
    },
    'confluence-jira',
    'Main Opts',
  );

  let jiraStartingEdition = select(
    'Jira - Starting Edition',
    {
      Free: Editions.FREE,
      Standard: Editions.STANDARD,
      Premium: Editions.PREMIUM,
    },
    Editions.FREE,
    'Jira Opts',
  );
  let jiraUpgradeRequired = jiraStartingEdition === Editions.FREE;

  let jiraSub = {
    product: ProductKeys.JIRA_SOFTWARE,
    edition: jiraStartingEdition,
    upgradeRequired: jiraUpgradeRequired,
    upgradeEdition: Editions.STANDARD,
    upgradeCompleted: style === 'confirmation' && jiraUpgradeRequired,
  };

  let confluenceStartingEdition = select(
    'Connie - Starting Edition',
    {
      Free: Editions.FREE,
      Standard: Editions.STANDARD,
      Premium: Editions.PREMIUM,
    },
    Editions.FREE,
    'Connie Opts',
  );
  let connieUpgradeRequired = confluenceStartingEdition === Editions.FREE;

  let connieSub = {
    product: ProductKeys.CONFLUENCE,
    edition: confluenceStartingEdition,
    upgradeRequired: connieUpgradeRequired,
    upgradeEdition: Editions.STANDARD,
    upgradeCompleted: style === 'confirmation' && connieUpgradeRequired,
  };

  switch (products) {
    case 'jira':
      sub.subscriptions.push(jiraSub);
      break;
    case 'confluence':
      sub.subscriptions.push(connieSub);
      break;
    case 'jira-confluence':
      sub.subscriptions.push(jiraSub, connieSub);
      break;
    case 'confluence-jira':
      sub.subscriptions.push(connieSub, jiraSub);
      break;
  }

  return { style, subscription: sub };
};

import { ChecklistStyle, ConfirmableChecklist } from './main';

storiesOf('Common/Components', module)
  .addDecorator(withKnobs)
  .add('Checklist Component - Checkboxes', () => {
    let { style, subscription } = twiddlableSubscription();
    return (
      <ConfirmableChecklist
        checklistStyle={
          style === 'checkbox'
            ? ChecklistStyle.CHECKBOX
            : ChecklistStyle.CONFIRMATION
        }
        onSelectionChange={() => {}}
        {...subscription}
      />
    );
  });
