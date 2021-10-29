import { defineMessages } from 'react-intl';

export default defineMessages({
  requestAccessTitle: {
    id: 'project-pages.cross-join.request-access.title',
    defaultMessage: 'Project pages require access to Confluence',
    description: 'Title for the request access view',
  },
  requestAccessNotConnectedDescription: {
    id: 'project-pages.cross-join.request-access.not-connected.description',
    defaultMessage:
      "Use project pages to capture your team's knowledge and keep content in a single place. Request access to Confluence to get started.",
    description:
      'Description for request access view when there is no Confluence space connected',
  },
  requestAccessConnectedDescription: {
    id: 'project-pages.cross-join.request-access.connected.description',
    defaultMessage:
      'Your team are already using Confluence to collaborate on project pages. Request access to join them.',
    description:
      'Description for request access view when there is a Confluence space connected',
  },
  requestAccessButton: {
    id: 'project-pages.cross-join.request-access.button',
    defaultMessage: 'Request access',
    description: 'Button label for request access CTA',
  },
  requestAccessTemplatesTooltip: {
    id: 'project-pages.cross-join.request-access.templates.tooltip',
    defaultMessage: 'Requests access to Confluence',
    description:
      'Tooltip when hovering over templates that will trigger request access flow',
  },
  requestAccessTemplatesSubtitle: {
    id: 'project-pages.cross-join.request-access.templates.subtitle',
    defaultMessage: 'REQUESTS ACCESS TO CONFLUENCE',
    description:
      'Subtitle of the templates sidebar when user needs to request access',
  },
  requestAccessPendingRequestTitle: {
    id: 'project-pages.cross-join.pending-request.templates.title',
    defaultMessage: "You've requested access to Confluence",
    description:
      'Title shown when user has requested access to Confluence but the request is pending',
  },
  requestAccessPendingRequestSubtitle: {
    id: 'project-pages.cross-join.pending-request.templates.subtitle',
    defaultMessage:
      "The site admin has received your request to join Confluence. If you're approved to join, project pages will start working and we'll send you a confirmation email.",
    description:
      'Long description shown when user has requested access to Confluence but the request is pending',
  },
  requestDeniedAccessRequestTitle: {
    id: 'project-pages.cross-join.denied-request.templates.title',
    defaultMessage: 'Your admin has denied you access',
    description:
      'Title shown when user has requested access to Confluence but the request is denied',
  },
  requestDeniedAccessRequestSubtitle: {
    id: 'project-pages.cross-join.denied-request.templates.subtitle',
    defaultMessage:
      "You can't use project pages because the site admin denied your request to join Confluence.",
    description:
      'Subtitle shown when user has requested access to Confluence but the request is denied',
  },
  requestAccessRevokedTitle: {
    id: 'project-pages.cross-join.access-revoked.templates.title',
    defaultMessage: "You don't have permissions to use project pages",
    description:
      'Title shown when user has requested access to Confluence but the request has since been revoked',
  },
  requestAccessRevokedSubtitle: {
    id: 'project-pages.cross-join.access-revoked.templates.subtitle',
    defaultMessage:
      'You cannot use project pages because the admin has denied you access to Confluence. Contact your site admin to request access.',
    description:
      'Subtitle shown when user has requested access to Confluence but the request has since been revoked',
  },
  joinProductNotConnectedTitle: {
    id: 'project-pages.cross-join.join-product.not-connected.title',
    defaultMessage: 'Join Confluence to start using project pages',
    description:
      'Title encouraging users to join Confluence when there is no connected Confluence space',
  },
  joinProductConnectedTitle: {
    id: 'project-pages.cross-join.join-product.connected.title',
    defaultMessage: "Join Confluence to access your team's project pages",
    description:
      'Title encouraging users to join Confluence when there is a connected Confluence space',
  },
  joinProductNotConnectedDescription: {
    id: 'project-pages.cross-join.join-product.not-connected.description',
    defaultMessage:
      "Project pages help capture your team's knowledge and keep content in a single place. Your site admin has already approved access for you.",
    description:
      'Value prop for joining Confluence when there is no connected Confluence space',
  },
  joinProductConnectedDescription: {
    id: 'project-pages.cross-join.join-product.connected.description',
    defaultMessage:
      'Your team are already using Confluence to collaborate on project pages. Your site admin has already approved access for you to join them.',
    description:
      'Value prop for joining Confluence when there is a connected Confluence space',
  },
  joinProductButton: {
    id: 'project-pages.cross-join.join-product.button',
    defaultMessage: 'Join Confluence',
    description: 'Button label for joining Confluence CTA',
  },
  joinProductTemplatesTooltip: {
    id: 'project-pages.cross-join.join-product.templates.tooltip',
    defaultMessage: 'Create this page in Confluence',
    description:
      'Tooltip when hovering over templates that will join the user to Confluence and create a page',
  },
  joinProductTemplatesSubtitle: {
    id: 'project-pages.cross-join.join-product.templates.subtitle',
    defaultMessage: 'GIVES YOU ACCESS TO CONFLUENCE',
    description:
      'Subtitle of the templates sidebar when user can auto-join to Confluence',
  },
  viewProfile: {
    id: 'project-pages.cross-join.avatar.view-profile',
    defaultMessage: 'View profile',
  },
});
