import { defineMessages } from 'react-intl';

import { PlanMessages } from './types';

export default defineMessages({
  mostPopular: {
    id: 'plans-table.plans-header-row.most-popular.nonfinal',
    defaultMessage: 'MOST POPULAR',
    description:
      'Label for the most popular plan. Should stay in all capital letters where applicable.',
  },
  recommended: {
    id: 'plans-table.plans-header-row.recommended.nonfinal',
    defaultMessage: 'RECOMMENDED',
    description:
      'Label for the recommended plan. Should stay in all capital letters where applicable.',
  },
  selected: {
    id: 'plans-table.plans-header-row.selected.nonfinal',
    defaultMessage: 'SELECTED',
    description:
      'Label for the selected plan. Should stay in all capital letters where applicable.',
  },
  currentPlan: {
    id: 'plans-table.plans-header-row.current-plan.nonfinal',
    defaultMessage: 'Current Plan',
    description: 'Label for the current plan.',
  },
  tryFreeButton: {
    id: 'plans-table.plans-header-row.try-free-button.nonfinal',
    defaultMessage: 'Try it free',
    description: 'Button that allows the user to start a trial.',
  },
  tryFreeButton14: {
    id: 'plans-table.plans-header-row.try-free-14-button.nonfinal',
    defaultMessage: 'Try it free for 14 days',
    description: 'Button that allows the user to start a trial.',
  },
  tryFreeButton30: {
    id: 'plans-table.plans-header-row.try-free-30-button.nonfinal',
    defaultMessage: 'Try it free for 30 days',
    description: 'Button that allows the user to start a trial.',
  },
  downgradeButton: {
    id: 'plans-table.plans-header-row.downgrade-button.nonfinal',
    defaultMessage: 'Downgrade to {plan}',
    description: 'Button that allows the user to downgrade to a lower plan.',
  },
});

export const planMessages: PlanMessages = defineMessages({
  free: {
    id: 'plans-table.plans-header-row.plan-free.nonfinal',
    defaultMessage: 'Free',
    description: 'The name of the "Free" plan.',
  },
  standard: {
    id: 'plans-table.plans-header-row.plan-standard.nonfinal',
    defaultMessage: 'Standard',
    description: 'The name of the "Standard" plan.',
  },
  premium: {
    id: 'plans-table.plans-header-row.plan-premium.nonfinal',
    defaultMessage: 'Premium',
    description: 'The name of the "Premium" plan.',
  },
});
