import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  /**
   * Product-agostic messages
   */
  common_recently_viewed_section_heading: {
    id: 'product_search_dialog.recently_viewed_section_heading',
    defaultMessage: 'Recently viewed',
    description: '',
  },

  common_recently_spaces_section_heading: {
    id: 'product_search_dialog.recent_spaces_section_heading',
    defaultMessage: 'Recent spaces',
    description: '',
  },

  common_recently_worked_with_section_heading: {
    id: 'product_search_dialog.recently_worked_with_section_heading',
    defaultMessage: 'Recently worked with',
    description: '',
  },

  common_error_state_failed_search_heading: {
    id: 'product_search_dialog.error.failed_search_heading',
    defaultMessage: "We're having trouble searching",
    description: '',
  },

  common_error_state_failed_search_body: {
    id: 'product_search_dialog.error.failed_search_body',
    defaultMessage:
      'It might just be a hiccup. The best thing to do is to <a>try again.</a>',
    description: '',
  },

  common_empty_state_heading: {
    id: 'product_search_dialog.empty.no_results_heading',
    defaultMessage: "We couldn't find anything matching your search.",
    description: '',
  },

  common_empty_state_prequery_heading: {
    id: 'product_search_dialog.empty_prequery.no_results_heading',
    defaultMessage: 'Search for what you need',
    description: '',
  },

  common_show_more_results_link: {
    id: 'product_search_dialog.show_more_results_link',
    defaultMessage: 'Show more',
    description: '',
  },

  common_show_all_results_link: {
    id: 'product_search_dialog.show_all_results_link',
    defaultMessage: 'View all results',
    description: '',
  },

  common_search_people_link: {
    id: 'product_search_dialog.search_people_link',
    defaultMessage: 'Search people',
    description: '',
  },

  common_search_input_collapsed_placeholder: {
    id: 'product_search_dialog.search_input_collapsed_placeholder',
    defaultMessage: 'Search',
    description: '',
  },

  common_empty_state_body: {
    id: 'compass_search_dialog.empty.no_results_body',
    defaultMessage: 'Try again with a different term.',
    description: 'Placeholder text shown when no results are returned.',
  },

  common_empty_state_body_no_advanced_search: {
    id: 'product_search_dialog.empty.no_results_body_no_advanced_search',
    defaultMessage: 'Try again with a different term',
    description: '',
  },

  common_give_feedback: {
    id: 'product_search_dialog.give_feedback',
    defaultMessage: 'Give feedback',
    description:
      'Button that looks like a link that the user clicks to open a dialog to give feedback about search',
  },

  common_inline_onboarding_title: {
    id: 'product_search_dialog.inline_onboarding_title',
    defaultMessage: 'Search across Jira and Confluence',
    description:
      'Heading of the inline section message which educates first time users about cross product search tabs',
  },

  common_inline_onboarding_body: {
    id: 'product_search_dialog.inline_onboarding_body',
    defaultMessage:
      'Use the Jira and Confluence tabs to search and see recent items in either location.',
    description:
      'Description of the inline section message which educates first time users about cross product search tabs',
  },

  common_inline_onboarding_action: {
    id: 'product_search_dialog.inline_onboarding_action',
    defaultMessage: 'Ok',
    description:
      'A button that looks like a link which suspends the section message.',
  },

  multi_site_advanced_search_label: {
    id: 'product_search_dialog.multi_site_advanced_search_label',
    defaultMessage: 'Search on:',
    description: 'Label for a list of site links in advanced search',
  },

  multi_site_advanced_search_more_dropdown: {
    id: 'product_search_dialog.multi_site_advanced_search_more_dropdown',
    defaultMessage: '{count} more',
    description:
      'A dropdown which opens a list of links to sites to advanced search in',
  },

  /**
   * Compass-specific messages
   */
  compass_search_input_expanded_placeholder: {
    id: 'compass_search_dialog.compass.search_input_expanded_placeholder',
    defaultMessage: 'Services, libraries, apps, teams, people, labels...',
    description: 'Placeholder text shown in the search input.',
  },

  compass_services_section_heading: {
    id: 'compass_search_dialog.compass.services_section_heading',
    defaultMessage: 'Services',
    description: 'Section heading for the search flyout Services section.',
  },

  compass_libraries_applications_more_section_heading: {
    id:
      'compass_search_dialog.compass.libraries_applications_more_section_heading',
    defaultMessage: 'Libraries, Applications & More',
    description:
      'Section heading text for the search flyout Libraries, Applications & More section.',
  },

  /**
   * Confluence-specific messages
   */
  confluence_search_input_expanded_placeholder: {
    id: 'product_search_dialog.confluence.search_input_expanded_placeholder',
    defaultMessage: 'Search Confluence',
    description: '',
  },

  confluence_pages_blogs_attachments_section_heading: {
    id:
      'product_search_dialog.confluence.pages_blogs_attachments_section_heading',
    defaultMessage: 'Pages, blogs and attachments',
    description: '',
  },

  confluence_spaces_section_heading: {
    id: 'product_search_dialog.confluence.spaces_section_heading',
    defaultMessage: 'Spaces',
    description: '',
  },

  confluence_people_section_heading: {
    id: 'product_search_dialog.confluence.people_section_heading',
    defaultMessage: 'People',
    description: '',
  },

  confluence_advanced_search: {
    id: 'product_search_dialog.recently_viewed_heading',
    defaultMessage: 'Advanced search',
    description:
      'advanced search link text when there is only Confluence search available',
  },

  confluence_advanced_search_with_product_prefix: {
    id: 'product_search_dialog.confluence.advanced_search_with_product_prefix',
    defaultMessage: 'Confluence advanced search',
    description:
      'Confluence advanced search link text when there are multiple products available',
  },

  // Jira specific messages
  jira_advanced_search_label: {
    id: 'global_search.jira.advanced_search_label',
    defaultMessage: 'Go to all:',
    description: '',
  },
  jira_advanced_issue_search_label: {
    id: 'global_search.jira.advanced_issue_search_label',
    defaultMessage: 'Advanced issue search',
    description: '',
  },
  jira_advanced_issue_search_label_with_product_prefix: {
    id: 'product_search_dialog.jira.advanced_search_with_product_prefix',
    defaultMessage: 'Jira advanced issue search',
    description:
      'Jira advanced search link text when there are multiple products available',
  },
  jira_search_placeholder: {
    id: 'global_search.jira.search_placeholder',
    defaultMessage: 'Search Jira',
    description: '',
  },
  jira_advanced_search_issues: {
    id: 'global_search.jira.advanced_search_issues',
    defaultMessage: 'Issues',
    description: 'Plural of issue',
  },
  jira_advanced_search_projects: {
    id: 'global_search.jira.advanced_search_projects',
    defaultMessage: 'Projects',
    description: 'Plural of project',
  },
  jira_advanced_search_boards: {
    id: 'global_search.jira.advanced_search_boards',
    defaultMessage: 'Boards',
    description: 'Plural of board',
  },
  jira_advanced_search_filters: {
    id: 'global_search.jira.advanced_search_filters',
    defaultMessage: 'Filters',
    description: 'Plural of filter',
  },
  jira_advanced_search_plans: {
    id: 'global_search.jira.advanced_search_plans',
    defaultMessage: 'Plans',
    description: 'Plural of plan',
  },
  jira_advanced_search_people: {
    id: 'global_search.jira.advanced_search_people',
    defaultMessage: 'People',
    description: '',
  },

  jira_recently_viewed_issues_section_heading: {
    id: 'product_search_dialog.jira.recently_viewed_issues_section_heading',
    defaultMessage: 'Recently viewed issues',
    description: '',
  },

  jira_recent_boards_projects_filters_section_heading: {
    id:
      'product_search_dialog.jira.recent_boards_projects_filters_section_heading',
    defaultMessage: 'Recent Boards, Projects and Filters',
    description: '',
  },

  jira_recent_projects_filters_section_heading: {
    id:
      'product_search_dialog.jira.recent_boards_projects_filters_section_heading',
    defaultMessage: 'Recent Projects and Filters',
    description: '',
  },

  jira_recent_boards_projects_filters_plans_section_heading: {
    id:
      'product_search_dialog.jira.recent_boards_projects_filters_plans_section_heading',
    defaultMessage: 'Recent Boards, Projects, Filters and Plans',
    description:
      'Title for recently accessed Jira entities (Boards, Projects, Filters, and Plans)',
  },

  jira_issues_section_heading: {
    id: 'product_search_dialog.jira.issues_section_heading',
    defaultMessage: 'Issues',
    description: '',
  },

  jira_boards_projects_filters_section_heading: {
    id: 'product_search_dialog.jira.boards_projects_filters_section_heading',
    defaultMessage: 'Boards, Projects and Filters',
    description: '',
  },

  jira_projects_filters_section_heading: {
    id: 'product_search_dialog.jira.projects_filters_section_heading',
    defaultMessage: 'Projects and Filters',
    description: '',
  },

  jira_boards_projects_filters_plans_section_heading: {
    id:
      'product_search_dialog.jira.boards_projects_filters_plans_section_heading',
    defaultMessage: 'Boards, Projects, Filters and Plans',
    description:
      'Title for search results of Jira entities (Boards, Projects, Filters, and Plans)',
  },

  jira_boards_icon_accessibility_text: {
    id: 'product_search_dialog.jira.boards_icon_accessibility_text',
    defaultMessage: 'Board icon',
    description:
      'The alternative accessibility text for a Jira Software board icon.',
  },

  jira_view_all_issues: {
    id: 'product_search_dialog.jira.view_all_issues',
    defaultMessage: 'Advanced issue search',
    description: 'Text for link that takes users to advanced search for issues',
  },

  /**
   * Filters
   */
  site_filters_title: {
    id: 'product_search_dialog.common.site_filters',
    defaultMessage: 'Filter by site',
    description: 'Section title for site filters',
  },

  space_filters_title: {
    id: 'product_search_dialog.confluence.space_filters',
    defaultMessage: 'Filter by space',
    description: 'Section title for space filters in Confluence',
  },

  project_filters_title: {
    id: 'product_search_dialog.jira.project_filters',
    defaultMessage: 'Filter by project',
    description: 'Section title for project filters in Jira',
  },

  contributor_filters_title: {
    id: 'product_search_dialog.confluence.contributor_filters',
    defaultMessage: 'Filter by contributor',
    description: 'Section title for contributor filters in Confluence',
  },

  assignee_filters_title: {
    id: 'product_search_dialog.jira.assignee_filters',
    defaultMessage: 'Filter by assignee',
    description: 'Section title for assignee filters in Jira',
  },

  binary_status_category_filters_title: {
    id: 'product_search_dialog.jira.issue_filters',
    defaultMessage: 'Filter by status',
    description: 'Section title for issue filters in Jira',
  },

  binary_status_category_filter_option_done: {
    id: 'product_search_dialog.jira.issue_filter_done',
    defaultMessage: 'Done',
    description: 'Filter option title for done issues',
  },

  binary_status_category_filter_option_open: {
    id: 'product_search_dialog.jira.issue_filter_open',
    defaultMessage: 'Open',
    description: 'Filter option title for open issues',
  },

  space_filters_find_more: {
    id: 'product_search_dialog.confluence.space_filters_find_more',
    defaultMessage: 'Find a space',
    description:
      'Placeholder text for select menu when finding a space to filter results by',
  },

  project_filters_find_more: {
    id: 'product_search_dialog.jira.project_filters_find_more',
    defaultMessage: 'Find a project',
    description:
      'Placeholder text for select menu when finding a project to filter results by',
  },

  site_filters_find_more: {
    id: 'product_search_dialog.jira.site_filters_find_more',
    defaultMessage: 'Find a site',
    description:
      'Placeholder text for select menu when finding a site to filter results by',
  },

  contributor_filters_find_more: {
    id: 'product_search_dialog.confluence.contributor_filters_find_more',
    defaultMessage: 'Find a contributor',
    description:
      'Placeholder text for select menu when finding a contributor to filter results by',
  },

  assignee_filters_find_more: {
    id: 'product_search_dialog.confluence.assignee_filters_find_more',
    defaultMessage: 'Find an assignee',
    description:
      'Placeholder text for select menu when finding a assignee to filter results by',
  },

  filters_applied: {
    id: 'product_search_dialog.confluence.filters_applied',
    defaultMessage: 'Looks like you have some filters applied',
    description:
      'Message to show when there are no search results due to filters being applied',
  },

  clear_filters: {
    id: 'product_search_dialog.confluence.clear_filters',
    defaultMessage: 'Clear filters',
    description:
      'Message to be displayed on button to clear the filters applied',
  },

  show_more_filters: {
    id: 'search_dialog.filters.group.show-more',
    defaultMessage: 'Show more',
    description: 'Text display on button to select more items to filter by',
  },

  more_filters: {
    id: 'product_search_dialog.more_filters',
    defaultMessage: 'View all filters',
    description:
      'Clicking on this link takes a user to a page with more filters and options.',
  },

  /**
   * Cross product
   */
  jira_tab_label: {
    id: 'cross_product_search_dialog.jira.tab_label',
    defaultMessage: 'Jira',
    description: '',
  },

  confluence_tab_label: {
    id: 'cross_product_search_dialog.confluence.tab_label',
    defaultMessage: 'Confluence',
    description: '',
  },

  compass_tab_label: {
    id: 'compass_search_dialog.compass.tab_label',
    defaultMessage: 'Compass',
    description:
      'The tab label used to denote Compass, only visible for multiple products.',
  },

  compass_teams_and_people_section_heading: {
    id: 'compass_search_dialog.compass.teams_and_people_heading',
    defaultMessage: 'Teams & People',
    description:
      'Section heading text for search flyout Teams & People section.',
  },
});
