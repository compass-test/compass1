import { defineMessages } from 'react-intl';

/*----------------------------------------------------------------------------------
 * This is a collection of strings that can be used in different parts of the app.
 *
 * HOW TO USE IT:
 *  - Please keep the keys in alphabetical order
 *  - The keys should be equal to the content (in camelCase)
 *  - Add a suffix in the following cases:
 *    - FullStop: When the sentence ends with "."
 *    - WithEllipsis: When the sentence ends with "..."
 *    - With<Variable>Param: When the sentence needs a parameter
 *  - Try to include only terms that may be shared among components or are global to compass (e.g. Components)
 *  - Never update the defaultMessage, create another entry, remember these are shared in different parts of the ui
/----------------------------------------------------------------------------------*/

export default defineMessages({
  accessRestricted: {
    id: 'dragonfruit.common-messages.access-restricted',
    defaultMessage: 'Access restricted',
    description: 'When the user dont have permissions to see the details',
  },
  actions: {
    id: 'dragonfruit.common-messages.actions',
    defaultMessage: 'Actions',
    description: 'Column header text for contextual dropdown actions',
  },
  add: {
    id: 'dragonfruit.common-messages.add',
    defaultMessage: 'Add',
    description: 'Telling the user to add an item to a collection',
  },
  announcements: {
    id: 'dragonfruit.common-messages.announcements.nonfinal',
    defaultMessage: 'Announcements',
    description: 'News for the user',
  },
  APIs: {
    id: 'dragonfruit.common-messages.apis.nonfinal',
    defaultMessage: 'APIs',
    description: 'Represents multiple application programming interfaces',
  },
  application: {
    id: 'dragonfruit.common-messages.application.nonfinal',
    defaultMessage: 'Application',
    description:
      'A standalone piece of software that is directly consumable by an end-user.',
  },
  applications: {
    id: 'dragonfruit.common-messages.applications.nonfinal',
    defaultMessage: 'Applications',
    description:
      'Standalone pieces of software that are directly consumable by an end-user.',
  },
  apply: {
    id: 'dragonfruit.common-messages.apply',
    defaultMessage: 'Apply',
    description: 'Telling the user to apply an item to another item',
  },
  apps: {
    id: 'dragonfruit.common-messages.apps.nonfinal',
    defaultMessage: 'Apps',
    description:
      'Short for applications. Commonly refers to the App Management page.',
  },
  available: {
    id: 'dragonfruit.common-messages.available',
    defaultMessage: 'Available',
    description: 'Message to show when the something is available for use',
  },
  cancel: {
    id: 'dragonfruit.common-messages.cancel',
    defaultMessage: 'Cancel',
    description: 'The cancel an operation',
  },
  checkYourConnectionAndTryAgainFullStop: {
    id:
      'dragonfruit.common-messages.check-your-connection-and-try-again-full-stop',
    defaultMessage: 'Check your connection and try again.',
    description: 'Generic error when something failed to load.',
  },
  checkYourInternetConnectionFullStop: {
    id: 'dragonfruit.common-messages.check-your-internet-connection-full-stop',
    defaultMessage: 'Check your internet connection.',
    description:
      'Telling the user to check his internet connection, used on error flags',
  },
  close: {
    id: 'dragonfruit.common-messages.close',
    defaultMessage: 'Close',
    description: 'This refers to the action of closing (e.g. closing a dialog)',
  },
  comingSoon: {
    id: 'dragonfruit.common-messages.coming-soon',
    defaultMessage: 'Coming soon',
    description: 'Message to show when the component is unavailable for use',
  },
  chatChannels: {
    id: 'dragonfruit.common-messages.chat-channel.nonfinal',
    defaultMessage: 'Chat channels',
    description: 'The chat channel for the component, example: Slack channel',
  },
  component: {
    id: 'dragonfruit.common-messages.component',
    defaultMessage: 'Component',
    description: 'This refers to a single software component',
  },
  components: {
    id: 'dragonfruit.common-messages.components',
    defaultMessage: 'Components',
    description: 'This refers to software components.',
  },
  contacts: {
    id: 'dragonfruit.common-messages.contacts',
    defaultMessage: 'Contacts',
    description: 'The heading for the contacts',
  },
  create: {
    id: 'dragonfruit.common-messages.create',
    defaultMessage: 'Create',
    description: 'Action to create an item',
  },
  dashboard: {
    id: 'dragonfruit.common-messages.dashboard',
    defaultMessage: 'Dashboard',
    description: 'A dashboard for the component',
  },
  dashboards: {
    id: 'dragonfruit.common-messages.dashboards',
    defaultMessage: 'Dashboards',
    description: 'A collection of dashboard',
  },
  description: {
    id: 'dragonfruit.common-messages.description',
    defaultMessage: 'Description',
    description: 'The description of an item',
  },
  document: {
    id: 'dragonfruit.common-messages.document',
    defaultMessage: 'Document',
    description: 'Represents a document (e.g. runbook, API documentation)',
  },
  documentation: {
    id: 'dragonfruit.common-messages.documentation',
    defaultMessage: 'Documentation',
    description: 'Represents a document (e.g. runbook, API documentation)',
  },
  documents: {
    id: 'dragonfruit.common-messages.documents',
    defaultMessage: 'documents',
    description:
      'Represents multiple documents (e.g. runbooks, API documentation)',
  },
  delete: {
    id: 'dragonfruit.common-messages.delete',
    defaultMessage: 'Delete',
    description: 'Action to delete an item',
  },
  edit: {
    id: 'dragonfruit.common-messages.edit',
    defaultMessage: 'Edit',
    description: 'Label to indicate an edit action can be taken',
  },
  enterAValidURLFullStop: {
    id: 'dragonfruit.common-messages.enter-a-valid-URL',
    defaultMessage: 'Enter a valid URL.',
    description: 'Label to indicate the user that the url is not valid',
  },
  error: {
    id: 'dragonfruit.common-messages.error',
    defaultMessage: 'Error',
    description: 'Label to show when there is an error',
  },
  externalServices: {
    id: 'dragonfruit.common-messages.external-services.nonfinal',
    defaultMessage: 'External services',
    description: 'Represents multiple software services provided by a vendor',
  },
  help: {
    id: 'dragonfruit.common-messages.help',
    defaultMessage: 'Help',
    description: 'Label to show to guide users',
  },
  hide: {
    id: 'dragonfruit.common-messages.hide',
    defaultMessage: 'Hide',
    description: 'Label to indicate a hide action can be taken',
  },
  recommended: {
    id: 'dragonfruit.common-messages.importanceTypeRecommended',
    defaultMessage: 'Recommended',
    description: 'Text for Recommended Scorecard Importance.',
  },
  required: {
    id: 'dragonfruit.common-messages.importanceTypeRequired',
    defaultMessage: 'Required',
    description: 'Text for Required Scorecard Importance.',
  },
  userDefined: {
    id: 'dragonfruit.common-messages.importanceTypeUserDefined',
    defaultMessage: 'User Defined',
    description: 'Text for User Defined Scorecard Importance.',
  },
  incidentResponder: {
    id: 'dragonfruit.common-messages.incident-responder',
    defaultMessage: 'Incident responder',
    description: 'The team or person responsible for responding to incidents',
  },
  information: {
    id: 'dragonfruit.common-messages.information',
    defaultMessage: 'Information',
    description: 'Information',
  },
  invalidURL: {
    id: 'dragonfruit.common-messages.invalid-url',
    defaultMessage: 'Invalid URL',
    description: 'Error message when we have an invalid URL.',
  },
  learnMore: {
    id: 'dragonfruit.common-messages.learn-more.nonfinal',
    defaultMessage: 'Learn more',
    description: 'Text for links to documentation',
  },
  libraries: {
    id: 'dragonfruit.common-messages.libraries.nonfinal',
    defaultMessage: 'Libraries',
    description: 'Represents multiple reusable software packages',
  },
  library: {
    id: 'dragonfruit.common-messages.library',
    defaultMessage: 'Library',
    description: 'A software package that can be reused by other people',
  },
  limitReached: {
    id: 'dragonfruit.common-messages.limit-reached',
    defaultMessage: 'Limit reached',
    description: 'When getting to the limit of items allowed',
  },
  link: {
    id: 'dragonfruit.common-messages.link',
    defaultMessage: 'Link',
    description: 'The label for the link (url) to a site',
  },
  loadingWithEllipsis: {
    id: 'dragonfruit.common-messages.loading-with-ellipsis',
    defaultMessage: 'Loading...',
    description: 'When a component is loading the data from the server',
  },
  loadMore: {
    id: 'dragonfruit.common-messages.load-more',
    defaultMessage: 'Load more',
    description: 'Text to show a action of loading more items',
  },
  microservice: {
    id: 'dragonfruit.common-messages.microservice',
    defaultMessage: 'Microservice',
    description: 'A small autonomous software component',
  },
  microservices: {
    id: 'dragonfruit.common-messages.microservices.nonfinal',
    defaultMessage: 'Microservices',
    description: 'Represents multiple small autonomous software components',
  },
  monolithModules: {
    id: 'dragonfruit.common-messages.monolith-modules.nonfinal',
    defaultMessage: 'Monolith modules',
    description:
      'Represents multiple pieces of software that make up a larger application',
  },
  name: {
    id: 'dragonfruit.common-messages.name',
    defaultMessage: 'Name',
    description: 'Represents the name of an item',
  },
  noMatchesFound: {
    id: 'dragonfruit.common-messages.no-matches-found',
    defaultMessage: 'No matches found',
    description: 'When nothing matches the search',
  },
  'on-callSchedules': {
    id: 'dragonfruit.common-messages.on-call.nonfinal',
    defaultMessage: 'On-call schedules',
    description: 'The team or individual on-call',
  },
  other: {
    id: 'dragonfruit.common-messages.other',
    defaultMessage: 'Other',
    description: 'Label representing an option that is not explicitly listed',
  },
  otherLinks: {
    id: 'dragonfruit.common-messages.other-links.nonfinal',
    defaultMessage: 'Other links',
    description: 'Label for any other links relevant to a component',
  },
  owner: {
    id: 'dragonfruit.common-messages.owner',
    defaultMessage: 'Owner',
    description: 'The owner of an item',
  },
  owners: {
    id: 'dragonfruit.common-messages.owners',
    defaultMessage: 'Owners',
    description: 'The owners of a item',
  },
  ownerTeam: {
    id: 'dragonfruit.common-messages.owner-team',
    defaultMessage: 'Owner team',
    description: 'The owning team of an item',
  },
  pendingWithEllipsis: {
    id: 'dragonfruit.common-messages.pending-with-ellipsis.nonfinal',
    defaultMessage: 'Pending...',
    description:
      'The label for components that are not available on the site yet',
  },
  project: {
    id: 'dragonfruit.common-messages.project',
    defaultMessage: 'Project',
    description: 'The label for the Project for your component.',
  },
  projects: {
    id: 'dragonfruit.common-messages.projects',
    defaultMessage: 'Projects',
    description: 'The label for the Projects for your component.',
  },
  refresh: {
    id: 'dragonfruit.common-messages.refresh',
    defaultMessage: 'Refresh',
    description: 'This refers to the button used to refresh the page.',
  },
  relationship: {
    id: 'dragonfruit.common-messages.relationship',
    defaultMessage: 'Relationship',
    description: 'This refers to a relationship between two components',
  },
  reload: {
    id: 'dragonfruit.common-messages.reload',
    defaultMessage: 'Reload',
    description: 'This refers to the button used to reload the page.',
  },
  remove: {
    id: 'dragonfruit.common-messages.remove',
    defaultMessage: 'Remove',
    description: 'Action to remove something',
  },
  repositories: {
    id: 'dragonfruit.common-messages.repositories',
    defaultMessage: 'Repositories',
    description: 'The label for the repositories for your code.',
  },
  repository: {
    id: 'dragonfruit.common-messages.repository',
    defaultMessage: 'Repository',
    description: 'The label for the repository for your code.',
  },
  retry: {
    id: 'dragonfruit.common-messages.retry',
    defaultMessage: 'Retry',
    description: 'Action to retry something',
  },
  save: {
    id: 'dragonfruit.common-messages.save',
    defaultMessage: 'Save',
    description: 'To tell the user they can save the information',
  },
  scorecard: {
    id: 'dragonfruit.common-messages.scorecard',
    defaultMessage: 'Scorecard',
    description: 'The label for the Scorecard resource.',
  },
  scorecards: {
    id: 'dragonfruit.common-messages.scorecards',
    defaultMessage: 'Scorecards',
    description: 'This refers to scorecards.',
  },
  search: {
    id: 'dragonfruit.common-messages.search',
    defaultMessage: 'Search',
    description: 'Placeholder to tell users that they can search for items',
  },
  searchingWithEllipsis: {
    id: 'dragonfruit.common-messages.searching-with-ellipsis',
    defaultMessage: 'Searching...',
    description: 'When a component is making a search',
  },
  service: {
    id: 'dragonfruit.common-messages.service',
    defaultMessage: 'Service',
    description: 'The label for a software service',
  },
  services: {
    id: 'dragonfruit.common-messages.services',
    defaultMessage: 'Services',
    description: 'The label for a software services',
  },
  show: {
    id: 'dragonfruit.common-messages.show',
    defaultMessage: 'Show',
    description: 'The label to indicate a show action can be taken',
  },
  somethingWentWrongFullStop: {
    id: 'dragonfruit.common-messages.something-went-wrong-full-stop',
    defaultMessage: 'Something went wrong.',
    description: 'A generic error message',
  },
  somethingWentWrongPleaseTryAgainFullStop: {
    id:
      'dragonfruit.common-messages.something-went-wrong-please-try-again-full-stop',
    defaultMessage: 'Something went wrong. Please try again.',
    description: 'Description for generic error message',
  },
  starred: {
    id: 'dragonfruit.common-messages.starred.nonfinal',
    defaultMessage: 'Starred',
    description: 'The label for a starred component',
  },
  success: {
    id: 'dragonfruit.common-messages.success',
    defaultMessage: 'Success',
    description: 'When it was executed correctly',
  },
  team: {
    id: 'dragonfruit.common-messages.team',
    defaultMessage: 'Team',
    description: 'Group of people: Atlassian team',
  },
  teams: {
    id: 'dragonfruit.common-messages.teams',
    defaultMessage: 'Teams',
    description: 'Group of people: Atlassian teams',
  },
  tier: {
    id: 'dragonfruit.common-messages.tier',
    defaultMessage: 'Tier',
    description:
      'The tier of a component, the lower number the more important the component is',
  },
  tierWithLevelParam: {
    id: 'dragonfruit.common-messages.tier-with-level-param',
    defaultMessage: 'Tier {level}',
    description:
      'The tier of the service, the lower the number the most important it is',
  },
  tryAgain: {
    id: 'dragonfruit.common-messages.try-again',
    defaultMessage: 'Try again',
    description: 'Message prompting the user to try again',
  },
  type: {
    id: 'dragonfruit.common-messages.type',
    defaultMessage: 'Type',
    description: 'Representing the type of an item',
  },
  unknown: {
    id: 'dragonfruit.common-messages.type',
    defaultMessage: 'Type',
    description: 'Representing the type of an item',
  },
  value: {
    id: 'dragonfruit.common-messages.value',
    defaultMessage: 'Value',
    description: 'Value on a key value pair',
  },
  view: {
    id: 'dragonfruit.common-messages.view',
    defaultMessage: 'View',
    description: 'Text to view something',
  },
  warning: {
    id: 'dragonfruit.common-messages.warning',
    defaultMessage: 'Warning',
    description: 'Warning sign',
  },
  webLink: {
    id: 'dragonfruit.common-messages.web-link.nonfinal',
    defaultMessage: 'Web link',
    description: 'The web link associated with the component',
  },
});
