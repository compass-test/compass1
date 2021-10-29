import { defineMessages } from 'react-intl';

export default defineMessages({
  footerText: {
    id: 'plans-table.plans-footer.footer-text.nonfinal',
    defaultMessage: 'Learn more about {planPricing} and our {enterprisePlan}',
    description: 'Plans table footer message',
  },
  planPricing: {
    id: 'plans-table.plans-footer.plan-pricing.nonfinal',
    defaultMessage: 'plan pricing',
    description: '"Plan pricing" text to go inside a link in the footer',
  },
  enterprisePlan: {
    id: 'plans-table.plans-footer.enterprise-plan.nonfinal',
    defaultMessage: 'Enterprise plan',
    description: '"Enterprise plan" text to go inside a link in the footer',
  },
});
