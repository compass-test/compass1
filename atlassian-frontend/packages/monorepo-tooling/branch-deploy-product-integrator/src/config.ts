import { UserFlags } from '@atlaskit/codemod-cli';

const { FAIL_CODEMODS_ON_ERROR, FILTER_CODEMODS_PATH } = process.env;

const failOnError = FAIL_CODEMODS_ON_ERROR === 'true';
const filterPaths = FILTER_CODEMODS_PATH === 'true';

/**
 * Product specific configuration
 *
 * A lot of configuration is embedded in our branch-deploy-integrator bamboo templates, however, that isn't ideal because
 *  - it only allows primitive data types due to the configuration having to be serialised to the commandline
 *  - uses the groovy programming language which isn't a familiar skillset
 *  - it isn't coupled with the version of the integrator due to each branch always using the master template
 */

type Commands = {
  /** Run a particular command. */
  runCommand: boolean;
  /** name of the command to run. */
  name: string;
};

type CodemodConfig = {
  branchFilter?: RegExp[];
  disabled?: boolean;
  filePaths: string[];
  flags: UserFlags | UserFlags[];
};

export type ProductConfig = {
  /** Name of the product. */
  product: string;
  /** Https URL of the product repo. Used in CI. */
  repoUrl: string;
  /** SSH URL of the product repo. Used locally. */
  sshRepoUrl: string;
  /** Product specific commands to run in the integrator */
  commands?: Commands[];
  /** Product specific configuration for running codemods */
  codemod?: CodemodConfig;
  /** Packages to install in specific products */
  packages?: string[];
  /** Dedupe flag in case you want to shortcut the groovy template config */
  dedupe?: boolean;
};

export type IntegratorConfig = {
  /** The key should match the productName field defined in the integrator bamboo templates */
  [productName: string]: ProductConfig;
};

export const config: IntegratorConfig = {
  confluence: {
    product: 'confluence',
    repoUrl:
      'https://stash.atlassian.com/scm/confcloud/confluence-frontend.git',
    sshRepoUrl:
      'ssh://git@stash.atlassian.com:7997/confcloud/confluence-frontend.git',
    commands: [
      {
        runCommand: false,
        name: 'next:fix-side-effects-declarations',
      },
    ],
    codemod: {
      filePaths: ['next/packages', 'packages'],
      flags: [
        {
          extensions: 'ts',
          parser: 'ts',
          failOnError,
          filterPaths,
        },
        {
          extensions: 'tsx',
          parser: 'tsx',
          failOnError,
          filterPaths,
        },
        {
          extensions: 'js',
          // In Confluence, they don't have flow files and babel parser throw errors on few files due to some plugins issues.
          // It is preferred to run those files using tsx parser for now.
          parser: 'tsx',
          failOnError,
          filterPaths,
        },
      ],
    },
    dedupe: true,
  },
  jira: {
    product: 'jira',
    repoUrl: 'https://stash.atlassian.com/scm/jiracloud/jira-frontend.git',
    sshRepoUrl:
      'ssh://git@stash.atlassian.com:7997/jiracloud/jira-frontend.git',
    packages: [
      '@atlaskit/activity-provider',
      '@atlaskit/adf-schema',
      '@atlaskit/adf-utils',
      '@atlaskit/analytics-listeners',
      '@atlaskit/analytics-namespaced-context',
      '@atlaskit/atlassian-navigation',
      '@atlaskit/atlassian-notifications',
      '@atlaskit/atlassian-switcher',
      '@atlaskit/avatar',
      '@atlaskit/avatar-group',
      '@atlaskit/badge',
      '@atlaskit/banner',
      '@atlaskit/blanket',
      '@atlaskit/breadcrumbs',
      '@atlaskit/calendar',
      '@atlaskit/checkbox',
      '@atlaskit/color-picker',
      '@atlaskit/comment',
      '@atlaskit/css-reset',
      '@atlaskit/datetime-picker',
      '@atlaskit/drawer',
      '@atlaskit/dropdown-menu',
      '@atlaskit/droplist',
      '@atlaskit/dynamic-table',
      '@atlaskit/editor-bitbucket-transformer',
      '@atlaskit/editor-common',
      '@atlaskit/editor-core',
      '@atlaskit/editor-extension-dropbox',
      '@atlaskit/editor-json-transformer',
      '@atlaskit/editor-markdown-transformer',
      '@atlaskit/editor-wikimarkup-transformer',
      '@atlaskit/email-renderer',
      '@atlaskit/emoji',
      '@atlaskit/empty-state',
      '@atlaskit/feature-flag-client',
      '@atlaskit/field-base',
      '@atlaskit/field-text',
      '@atlaskit/field-text-area',
      '@atlaskit/flag',
      '@atlaskit/form',
      '@atlaskit/help',
      '@atlaskit/help-layout',
      '@atlaskit/icon-file-type',
      '@atlaskit/icon-object',
      '@atlaskit/icon-priority',
      '@atlaskit/inline-dialog',
      '@atlaskit/inline-message',
      '@atlaskit/input',
      '@atlaskit/item',
      '@atlaskit/logo',
      '@atlaskit/lozenge',
      '@atlaskit/media-avatar-picker',
      '@atlaskit/media-card',
      '@atlaskit/media-client',
      '@atlaskit/media-core',
      '@atlaskit/media-filmstrip',
      '@atlaskit/media-image',
      '@atlaskit/media-picker',
      '@atlaskit/media-table',
      '@atlaskit/media-test-helpers',
      '@atlaskit/media-ui',
      '@atlaskit/mention',
      '@atlaskit/menu',
      '@atlaskit/modal-dialog',
      '@atlaskit/motion',
      '@atlaskit/notification-indicator',
      '@atlaskit/notification-log-client',
      '@atlaskit/onboarding',
      '@atlaskit/outbound-auth-flow-client',
      '@atlaskit/page',
      '@atlaskit/page-header',
      '@atlaskit/page-layout',
      '@atlaskit/pagination',
      '@atlaskit/popper',
      '@atlaskit/popup',
      '@atlaskit/portal',
      '@atlaskit/profilecard',
      '@atlaskit/progress-bar',
      '@atlaskit/progress-indicator',
      '@atlaskit/progress-tracker',
      '@atlaskit/pubsub',
      '@atlaskit/radio',
      '@atlaskit/range',
      '@atlaskit/react-experiment-framework',
      '@atlaskit/reactions',
      '@atlaskit/renderer',
      '@atlaskit/renovate-config',
      '@atlaskit/right-side-panel',
      '@atlaskit/section-message',
      '@atlaskit/select',
      '@atlaskit/share',
      '@atlaskit/side-navigation',
      '@atlaskit/smart-card',
      '@atlaskit/spinner',
      '@atlaskit/tabs',
      '@atlaskit/tag',
      '@atlaskit/tag-group',
      '@atlaskit/textarea',
      '@atlaskit/textfield',
      '@atlaskit/theme',
      '@atlaskit/toggle',
      '@atlaskit/tooltip',
      '@atlaskit/user-picker',
      '@atlaskit/util-data-test',
      '@atlaskit/util-service-support',
      '@atlaskit/width-detector',
      '@atlassian/amkt-addon-discovery',
      '@atlassian/amkt-upm-spi-impl',
      '@atlassian/browser-metrics',
      '@atlassian/calendar',
      '@atlassian/connect-module-core',
      '@atlassian/embedded-confluence',
      '@atlassian/experience-tracker',
      '@atlassian/exposure-events-compressor',
      '@atlassian/forge-conditions',
      '@atlassian/forge-ui',
      '@atlassian/forge-ui-text-renderer',
      '@atlassian/fullcalendar-common',
      '@atlassian/fullcalendar-daygrid',
      '@atlassian/fullcalendar-interaction',
      '@atlassian/fullcalendar-react',
      '@atlassian/heartbeat',
      '@atlassian/integrations-survey',
      '@atlassian/invite-people-drawer',
      '@atlassian/jira-portfolio-plan-wizard',
      '@atlassian/jira-workflow-diagram-library',
      '@atlassian/jql-transform-basic',
      '@atlassian/jsm-getting-started-panel',
      '@atlassian/mpt-cards',
      '@atlassian/mpt-collapsible',
      '@atlassian/mpt-focus-page',
      '@atlassian/mpt-how-it-works',
      '@atlassian/mpt-migration-details',
      '@atlassian/mpt-plan-configuration',
      '@atlassian/mpt-timeago',
      '@atlassian/people-menu',
      '@atlassian/product-search-dialog',
      '@atlassian/ptc-embeddable-directory',
      '@atlassian/react-transitive-number',
      '@atlassian/search-dialog',
      '@atlassian/search-provider',
      '@atlassian/servicedesk-frontend-apdex',
      '@atlassian/servicedesk-frontend-routing',
      '@atlassian/share-to-slack',
      '@atlassian/techstack-runtime',
      '@atlassiansox/analytics-web-client',
      '@atlassiansox/checklist',
      '@atlassiansox/cross-flow-plugins',
      '@atlassiansox/cross-flow-support',
      '@atlassiansox/engagekit',
      '@atlassiansox/iframe-plugin',
      '@atlassiansox/jql-ast',
      '@atlassiansox/jql-editor',
      '@atlassiansox/jql-editor-autocomplete-rest',
      '@atlassiansox/metal-client',
      '@atlassiansox/nudge-tooltip',
      '@atlassiansox/origin-tracing',
      '@atlassiansox/project-pages',
      '@atlassiansox/schedule-timeline',
    ],
    codemod: {
      filePaths: ['src'],
      flags: [
        {
          extensions: 'js',
          parser: 'babylon',
          failOnError,
          filterPaths,
        },
      ],
    },
    // Dedupe was originally disabled because we only integrated few packages at this time.
    // However, we now don't have to dedupe as Jira does it as part of the `yarn` `post-install` step.
    dedupe: false,
  },
};

export function getConfig(): ProductConfig | undefined {
  let product = process.env.PRODUCT;
  product = product && product.includes('jira') ? 'jira' : product;
  if (!product) {
    throw new Error('Missing "PRODUCT" env variable');
  }
  return config[product];
}
