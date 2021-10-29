import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  googleWorkspaceErrorModalHeading: {
    id: 'do-not-translate.upflow.common.modal.error.heading',
    description: 'Heading for modal error screen',
    defaultMessage: 'We had trouble displaying this content',
  },
  googleWorkspaceErrorModalContactSupport: {
    id: 'do-not-translate.upflow.common.modal.error.contact.support',
    description: 'contact support',
    defaultMessage: 'contact support',
  },
  googleWorkspaceErrorModalSubheading: {
    id: 'do-not-translate.upflow.common.modal.error.subheading',
    description: 'Subheading for modal error screen',
    defaultMessage:
      "Please close this message and try again. If the problem continues, {contactSupport} and we'll be happy to help.",
  },
  googleWorkspaceErrorTrialModalHeading: {
    id: 'do-not-translate.upflow.common.modal.error.trial.heading',
    description: 'Heading for modal trial error screen',
    defaultMessage: 'We had trouble starting your trial',
  },
  googleWorkspaceErrorTrialModalSubheading: {
    id: 'do-not-translate.upflow.common.modal.error.trial.subheading',
    description: 'Subheading for modal trial error screen',
    defaultMessage:
      "Please close this message and try again. If the problem continues, {contactSupport} and we'll be happy to help.",
  },
  googleWorkspaceErrorAccessModalHeading: {
    id: 'do-not-translate.upflow.google.workspace.modal.error.access.heading',
    description: 'Heading for modal access error screen',
    defaultMessage: 'We were unable to give your users product access',
  },
  googleWorkspaceErrorAccessModalSubheading: {
    id:
      'do-not-translate.upflow.google.workspace.modal.error.access.subheading',
    description: 'Subheading for modal access error screen',
    defaultMessage:
      'You can go to the product access page to add the Google group to your products.',
  },
  googleWorkspaceUpgradeProgressTitle: {
    id: 'do-not-translate.upflow.google.workspace.upgrade.progess.title',
    description: 'Title for modal upgrade in progress screen',
    defaultMessage: 'Syncing your users from Google',
  },
  googleWorkspaceUpgradeProgressDescription: {
    id: 'do-not-translate.upflow.google.workspace.upgrade.progess.description',
    description: 'Description for modal upgrade in progress screen',
    defaultMessage:
      'We’re setting things up for your team’s free trial. \nPlease don’t close or refresh this window.',
  },
  googleWorkspaceConfirmationModalMessage: {
    id: 'do-not-translate.upflow.google.workspace.confirmation.modal.message',
    description: 'Body Message for Confirmation Modal',
    defaultMessage: `Your Google users will be automatically synced and given product access every 4 hours. You can manage your Google Workspace settings and trial in Atlassian Admin.`,
  },
  googleWorkspaceConfirmationModalTitle: {
    id: 'do-not-translate.upflow.google.workspace.confirmation.modal.title',
    description: 'Title for modal Confirmation Modal',
    defaultMessage:
      'Success! Your Google users now have access to your products',
  },
  googleWorkspaceAccessModalFreePlanMessage: {
    id: 'do-not-translate.upflow.google.workspace.access.modal.message.free',
    description: 'Body Message for Access Modal Free',
    defaultMessage: `Automatically syncing new and existing Google users with a free
    product will start a 30-day trial of the {StandardPlan}. If you don't
    want to start a trial, you can manually give access.`,
  },
  googleWorkspaceAccessModalStandardPlan: {
    id:
      'do-not-translate.upflow.google.workspace.access.modal.message.standard.plan',
    description: 'Body Message for Access Modal Standard Plan',
    defaultMessage: `Standard plan`,
  },
  googleWorkspaceAccessModalStandardPlanMessage: {
    id:
      'do-not-translate.upflow.google.workspace.access.modal.message.standard',
    description: 'Body Message for Access Modal Standard',
    defaultMessage: `Automatically add new and existing Google users to your products. Adding more users may influence your {PlanPrice}`,
  },
  googleWorkspaceAccessModalPlanPricing: {
    id:
      'do-not-translate.upflow.google.workspace.access.modal.message.plan.pricing',
    description: 'Body Message for Access Modal plan pricing',
    defaultMessage: `plan's pricing.`,
  },
  googleWorkspaceAccessModalTitle: {
    id: 'do-not-translate.upflow.google.workspace.access.modal.title',
    description: 'Title for Access Modal',
    defaultMessage:
      'Would you like to automatically give your Google users access to these products?',
  },
  googleWorkspaceManuallyGiveAccessButtonText: {
    id: 'do-not-translate.upflow.google.workspace.button.manual',
    description: 'Manually Give Access Button',
    defaultMessage: 'Manually give access',
  },
  googleWorkspaceAutomaticallyGiveAccessButtonText: {
    id: 'do-not-translate.upflow.google.workspace.button.automatic',
    description: 'Automatically Give Access Button',
    defaultMessage: 'Automatically give access',
  },
  googleWorkspaceProductAccessPageButtonText: {
    id: 'do-not-translate.upflow.google.workspace.button.product.access',
    description: 'Go to product access page Button',
    defaultMessage: 'Go to product access page',
  },
  googleWorkspaceManageUsersButtonText: {
    id: 'do-not-translate.upflow.google.workspace.button.manage.users',
    description: 'Manage Users Button',
    defaultMessage: 'Manage users',
  },
  googleWorkspaceDoneButtonText: {
    id: 'do-not-translate.upflow.google.workspace.button.done',
    description: 'Manage Users Button',
    defaultMessage: 'Done',
  },
  googleWorkspaceCloseButtonText: {
    id: 'do-not-translate.upflow.google.workspace.button.close',
    description: 'Manage Users Button',
    defaultMessage: 'Close',
  },
  googleWorkspaceNoCostText: {
    id: 'do-not-translate.upflow.google.workspace.no.cost',
    description: 'no cost text above button',
    defaultMessage: 'Will start a no cost trial of Standard plan',
  },
  googleWorkspaceConfluenceStandardText: {
    id: 'do-not-translate.upflow.google.workspace.confluence.standard',
    description: 'Confluence Standard',
    defaultMessage: 'Confluence Standard',
  },
  googleWorkspaceJSWStandardText: {
    id: 'do-not-translate.upflow.google.workspace.jsw.standard',
    description: 'Jira Software Standard',
    defaultMessage: 'Jira Software Standard',
  },
  googleWorkspaceStandardText: {
    id: 'do-not-translate.upflow.google.workspace.standard',
    description: 'Standard',
    defaultMessage: 'Standard',
  },
  googleWorkspacePremiumText: {
    id: 'do-not-translate.upflow.google.workspace.standard',
    description: 'Premium Subscription',
    defaultMessage: 'Premium',
  },
  googleWorkspaceFreeText: {
    id: 'do-not-translate.upflow.google.workspace.free',
    description: 'Free',
    defaultMessage: 'Free',
  },
  googleWorkspaceConfluenceText: {
    id: 'do-not-translate.upflow.google.workspace.confluence',
    description: 'Confluence',
    defaultMessage: 'Confluence',
  },
  googleWorkspaceJSWText: {
    id: 'do-not-translate.upflow.google.workspace.jsw',
    description: 'Jira Software',
    defaultMessage: 'Jira Software',
  },
  googleWorkspaceStandardTrialStartedText: {
    id: 'do-not-translate.upflow.google.workspace.standard.trial.started',
    description: 'Standard Trial Started',
    defaultMessage: 'Standard Trial Started',
  },
  googleWorkspaceRequireStandardTrialText: {
    id: 'do-not-translate.upflow.google.workspace.require.standard.trial',
    description: 'Requires Standard Trial',
    defaultMessage: 'Requires Standard Trial',
  },
  upgradeBetterTogetherCloseButton: {
    id: 'do-not-translate.upflow.upgrade.better-together.button.close',
    description:
      'Button label on upgrade modal that will close (dismiss) the modal',
    defaultMessage: 'Close',
  },
  upgradeBetterTogetherAddonProductLink: {
    id: 'do-not-translate.upflow.upgrade.better-together.addon-product.link',
    description:
      'Text shown to link to information about a specific add-on product',
    defaultMessage: 'View {product} {suggestedEdition}',
  },
  upgradeBetterTogetherHeading: {
    id: 'do-not-translate.upflow.upgrade.better-together.heading',
    description:
      'Heading of the modal recommending two products be upgraded together',
    defaultMessage: 'Better together',
  },
  upgradeBetterWithConfluence: {
    id: 'do-not-translate.upflow.upgrade.better-together.subheading.confluence',
    description:
      'Subheading recommending upgrading Confluence as well as the product being upgraded',
    defaultMessage:
      'Use {baseProduct} and {addOnProduct} {suggestedEdition} together to simplify project collaboration and work faster.',
  },
  upgradeBetterWithJsm: {
    id: 'do-not-translate.upflow.upgrade.better-together.subheading.jsm',
    description:
      'Subheading recommending upgrading Jira service management as well as the product being upgraded',
    defaultMessage:
      "Accelerate your team's service delivery by using {baseProduct} and {addOnProduct} together.",
  },
  emptyMessage: {
    id: 'do-not-translate.upflow.upgrade.better-together.empty',
    description: 'Placeholder for an empty message',
    defaultMessage: '',
  },
  benefitListJsmCombinedWorkflow: {
    id:
      'do-not-translate.upflow.upgrade.better-together.benefit-list-jsm.combined-workflow',
    description: 'Combined Workflow benefit',
    defaultMessage:
      "Combine {baseProduct}'s workflows with convenient self-service portals.",
  },
  benefitListJsmSeamlessExperience: {
    id:
      'do-not-translate.upflow.upgrade.better-together.benefit-list-jsm.seamless-experience',
    description: 'Seamless experience benefit',
    defaultMessage:
      'Provide a seamless experience across employees, agents, and developers.',
  },
  benefitListJsmUnitedTeams: {
    id:
      'do-not-translate.upflow.upgrade.better-together.benefit-list-jsm.united-teams',
    description: 'United teams benefit',
    defaultMessage:
      'Unite your service and development teams to resolve issues quickly.',
  },
  benefitListJsmRequestPrioritization: {
    id:
      'do-not-translate.upflow.upgrade.better-together.benefit-list-jsm.request-prioritization',
    description: 'Request prioritization benefit',
    defaultMessage:
      'Link tickets to issues so you can prioritize requests for development work.',
  },
  benefitListConfluenceSyncKB: {
    id:
      'do-not-translate.upflow.upgrade.better-together.benefit-list-confluence.sync-kb',
    description: 'Sync knowledge base benefit',
    defaultMessage: 'Sync your project and knowledge bases.',
  },
  benefitListConfluenceSingleSource: {
    id:
      'do-not-translate.upflow.upgrade.better-together.benefit-list-confluence.single-sourch',
    description: 'Single source benefit',
    defaultMessage:
      'Create a single source of truth to keep your team aligned on scope and progress.',
  },
  benefitListConfluenceUnlockedLimits: {
    id:
      'do-not-translate.upflow.upgrade.better-together.benefit-list-confluence.unlocked-limits',
    description: 'Unlocked Limits benefit',
    defaultMessage:
      'Get unlocked user limits, external access, and enhanced storage.',
  },
  benefitListConfluenceCoordinatePerms: {
    id:
      'do-not-translate.upflow.upgrade.better-together.benefit-list-confluence.coordinate-perms',
    description: 'Coordinated permissions benefit',
    defaultMessage:
      'Coordinate permissions and access across all your products.',
  },
  addOnProductEdition: {
    id:
      'do-not-translate.upflow-upgrade.better-together.product-info.product-and-edition',
    description: 'Product and Edition of suggested add-on product',
    defaultMessage: '{product} {suggestedEdition}',
  },
  addOnProductName: {
    id:
      'do-not-translate.upflow-upgrade-better-together.product-info.product-name',
    description: 'Product name of suggested add-on product',
    defaultMessage: '{product}',
  },
  upgradeTogetherInfoJsm: {
    id:
      'do-not-translate.upflow.upgrade.better-together.product-info.subheading.jsm',
    description: 'Sub-heading for Jira Service Management Product Info screen',
    defaultMessage: 'World-class ITSM for teams small and big.',
  },
  upgradeTogetherInfoConfluence: {
    id:
      'do-not-translate.upflow.upgrade.better-together.product-info.subheading.confluence',
    description: 'Sub-heading for Confluence product info screen',
    defaultMessage:
      "Unlock {product}'s advanced feature set to help your team unite knowledge and collaboration.",
  },
  unlockUserLimitFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.unlock.user.limit.heading',
    description: 'Unlock user limit feature heading',
    defaultMessage: 'Unlock user limits',
  },
  unlockUserLimitFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.unlock.user.limit.content',
    description: 'Unlock user limit feature body',
    defaultMessage: 'Get flexibility to grow beyond 10 users.',
  },
  pageInsightsFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.page.insights.heading',
    description: 'Page insights heading',
    defaultMessage: 'Page insights',
  },
  pageInsightsFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.page.insights.content',
    description: 'Page insights content',
    defaultMessage: 'Give your team analytics on engagement insights.',
  },
  permissionsFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.permissions.heading',
    description: 'Page & user permissions heading',
    defaultMessage: 'Page & user permissions',
  },
  permissionsFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.permissions.content',
    description: 'Page & user permissions content',
    defaultMessage: 'Control space and page access.',
  },
  supportFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.support.heading',
    description: 'Enhanced support heading',
    defaultMessage: 'Enhanced support',
  },
  confluenceSupportFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.confluence.support.content',
    description: 'Enhanced support confluence content',
    defaultMessage: "Get 9-5 support from Atlassian's team of experts.",
  },
  externalAccessFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.external.access.heading',
    description: 'External access heading',
    defaultMessage: 'External access',
  },
  externalAccessFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.external.access.content',
    description: 'External access content',
    defaultMessage: 'Give secure access to people outside your team.',
  },
  shareFilesAccessFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.share.files.heading',
    description: 'Share files & attachments heading',
    defaultMessage: 'Share files & attachments',
  },
  confluenceShareFilesFeatureContent: {
    id:
      'upflow.persistent.upgrade.modal.feature.share.files.confluence.content',
    description: 'Share files & attachments confluence content',
    defaultMessage:
      'Get 250 GB of storage to make Confluence your single source of truth.',
  },
  unlockAgentLimitFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.unlock.agent.limit.heading',
    description: 'Unlock agent limit feature heading',
    defaultMessage: 'Unlock agent limits',
  },
  unlockAgentLimitFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.unlock.agent.limit.content',
    description: 'Unlock agent limit feature body',
    defaultMessage: 'Get flexibility to grow beyond 3 agents.',
  },
  incidentManagementFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.incident.management.heading',
    description: 'Incident management feature heading',
    defaultMessage: 'Incident management',
  },
  incidentManagementFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.incident.management.content',
    description: 'Incident management feature body',
    defaultMessage: 'Manage up to 100 incidents per month.',
  },
  reviewChangesFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.review.changes.heading',
    description: 'Review changes feature heading',
    defaultMessage: 'Review changes',
  },
  reviewChangesFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.review.changes.content',
    description: 'Review changes feature body',
    defaultMessage: "Record every change that's made to your site.",
  },
  projectAutomationFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.project.automation.heading',
    description: 'Project automation feature heading',
    defaultMessage: 'Project automation',
  },
  projectAutomationFeatureContent: {
    id: 'upflow.persistent.upgrade.modal.feature.project.automation.content',
    description: 'Project automation feature body',
    defaultMessage: 'Set up rules globally and across projects.',
  },
  anonymousAccessFeatureHeading: {
    id: 'upflow.persistent.upgrade.modal.feature.anonymous.access.heading',
    description: 'Anonymous access heading',
    defaultMessage: 'Anonymous access',
  },
  modalCloseButton: {
    id:
      'do-not-translate.upflow-upgrade.better-together.product-info.close-button',
    description: 'Text of the button that closes the modal',
    defaultMessage: 'Close',
  },
  addPaymentModalHeading: {
    id: 'do-not-translate.upflow-upgrade.add-payment.modal.heading',
    description: 'add payment modal heading',
    defaultMessage: 'Would you like to add payment details?',
  },
  addPaymentModalSubheading: {
    id: 'do-not-translate.upflow-upgrade.add-payment.modal.subheading',
    description: 'add payment modal subheading',
    defaultMessage:
      'Allow your team to continue using advanced features after your trial ends.',
  },
  addPaymentModalSubheadingPlural: {
    id: 'do-not-translate.upflow-upgrade.add-payment.modal.subheading',
    description: 'add payment modal subheading',
    defaultMessage:
      'Allow your team to continue using advanced features after your trials end.',
  },
  addPaymentCancelAnyTimeHeading: {
    id: 'do-not-translate.upflow-upgrade.add-payment.cancel-any-time.heading',
    description: 'Cancel any time heading',
    defaultMessage: 'Cancel at any time',
  },
  addPaymentCancelAnyTimeDescription: {
    id:
      'do-not-translate.upflow-upgrade.add-payment.cancel-any-time.description',
    description: 'Cancel any time description',
    defaultMessage:
      'You won’t be billed until your {trialCount, plural, one {trial ends} other {trials end}}. If there’s no payment on file when your {trialCount, plural, one {trial ends} other {trials end}}, we’ll revert you to the Free plan if you’re within plan limits.',
  },
  continueUsingHeading: {
    id: 'do-not-translate.upflow-upgrade.continue-using.heading',
    description: 'Continue using features heading',
    defaultMessage: 'Continue using advanced features',
  },
  continueUsingDescription: {
    id: 'do-not-translate.upflow-upgrade.continue-using.description',
    description: 'Continue using features description',
    defaultMessage:
      'Make sure your entire team keeps their upgraded user and storage limits, advanced permissions, and advanced features after your {trialCount, plural, one {trial ends} other {trials end}}.',
  },
  addPaymentButton: {
    id: 'do-not-translate.upflow-upgrade.continue-using.description',
    description: 'Continue using features description',
    defaultMessage: 'Add payment details',
  },
  notNowButton: {
    id: 'do-not-translate.upflow-upgrade.continue-using.description',
    description: 'Continue using features description',
    defaultMessage: 'Not now',
  },
  infoTooltipConfluence: {
    id: 'do-not-translate.upflow-upgrade.info-tooltip.confluence',
    description: 'MPU Confluence Tooltip',
    defaultMessage:
      'If your team exceeds 10 users on Jira or Confluence, we’ll start billing you when your trials end.',
  },
  infoTooltipJSM: {
    id: 'do-not-translate.upflow-upgrade.info-tooltip.jsm',
    description: 'MPU JSM Tooltip',
    defaultMessage:
      'If your team exceeds 10 users on Jira Software or 3 agents on Jira Service Management, we’ll start billing you when your trials end.',
  },
});
