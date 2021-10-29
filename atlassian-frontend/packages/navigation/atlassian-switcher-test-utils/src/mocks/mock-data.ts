import atlassianMarkGradientBlueAtlassian from './assets/logos/atlassian/mark-gradient-blue-atlassian.svg';
import atlassianMarkGradientNeutralAtlassian from './assets/logos/atlassian/mark-gradient-neutral-atlassian.svg';
import atlassianMarkGradientWhiteAtlassian from './assets/logos/atlassian/mark-gradient-white-atlassian.svg';
import bitbucketMarkGradientBlueBitbucket from './assets/logos/bitbucket/mark-gradient-blue-bitbucket.svg';
import bitbucketMarkGradientNeutralBitbucket from './assets/logos/bitbucket/mark-gradient-neutral-bitbucket.svg';
import bitbucketMarkGradientWhiteBitbucket from './assets/logos/bitbucket/mark-gradient-white-bitbucket.svg';
import compassCompassMarkGradientBlue from './assets/logos/compass/compass-mark-gradient-blue.svg';
import compassCompassMarkGradientNeutral from './assets/logos/compass/compass-mark-gradient-neutral.svg';
import compassCompassMarkGradientWhite from './assets/logos/compass/compass-mark-gradient-white.svg';
import confluenceMarkGradientBlueConfluence from './assets/logos/confluence/mark-gradient-blue-confluence.svg';
import confluenceMarkGradientNeutralConfluence from './assets/logos/confluence/mark-gradient-neutral-confluence.svg';
import confluenceMarkGradientWhiteConfluence from './assets/logos/confluence/mark-gradient-white-confluence.svg';
import jiraWorkManagementMarkGradientBlueJiraWorkManagement from './assets/logos/jira-work-management/mark-gradient-blue-jira-work-management.svg';
import jiraWorkManagementMarkGradientNeutralJiraWorkManagement from './assets/logos/jira-work-management/mark-gradient-neutral-jira-work-management.svg';
import jiraWorkManagementMarkGradientWhiteJiraWorkManagement from './assets/logos/jira-work-management/mark-gradient-white-jira-work-management.svg';
import jiraServiceManagementJiraServiceManagementMarkGradientBlue from './assets/logos/jira-service-management/jira-service-management-mark-gradient-blue.svg';
import jiraServiceManagementJiraServiceManagementMarkGradientNeutral from './assets/logos/jira-service-management/jira-service-management-mark-gradient-neutral.svg';
import jiraServiceManagementJiraServiceManagementMarkGradientWhite from './assets/logos/jira-service-management/jira-service-management-mark-gradient-white.svg';
import jiraSoftwareMarkGradientBlueJiraSoftware from './assets/logos/jira-software/mark-gradient-blue-jira-software.svg';
import jiraSoftwareMarkGradientNeutralJiraSoftware from './assets/logos/jira-software/mark-gradient-neutral-jira-software.svg';
import jiraSoftwareMarkGradientWhiteJiraSoftware from './assets/logos/jira-software/mark-gradient-white-jira-software.svg';
import statuspageMarkGradientBlueStatuspage from './assets/logos/statuspage/mark-gradient-blue-statuspage.svg';
import statuspageMarkGradientNeutralStatuspage from './assets/logos/statuspage/mark-gradient-neutral-statuspage.svg';
import statuspageMarkGradientWhiteStatuspage from './assets/logos/statuspage/mark-gradient-white-statuspage.svg';
import opsgenieMarkGradientBlueOpsgenie from './assets/logos/opsgenie/mark-gradient-blue-opsgenie.svg';
import opsgenieMarkGradientNeutralOpsgenie from './assets/logos/opsgenie/mark-gradient-neutral-opsgenie.svg';
import opsgenieMarkGradientWhiteOpsgenie from './assets/logos/opsgenie/mark-gradient-white-opsgenie.svg';
import trelloMarkGradientBlue from './assets/logos/trello/icon-gradient-blue-trello.svg';
import trelloMarkGradientNeutral from './assets/logos/trello/icon-gradient-neutral-trello.svg';
import trelloMarkGradientWhite from './assets/logos/trello/icon-gradient-white-trello.svg';
import avatarRings from './assets/avatars/rings.png';
import avatarRocket from './assets/avatars/rocket.png';
import avatarSite from './assets/avatars/site.png';
import avatarLightbulb from './assets/avatars/lightbulb.png';
import avatarCharlieWhite from './assets/avatars/icon-charlie-white.svg';
import iconSmrt from './assets/icons/SMRT.png';
import iconGawadhwal from './assets/icons/gawadhwal_128.png';
import iconDartboard from './assets/icons/dartboard.png';
import iconShamid from './assets/icons/shamid_128.png';
import iconAlien from './assets/icons/project_avatar_alien.svg';
import iconPower from './assets/icons/project_avatar_power.png';
import iconProject from './assets/icons/projectavatar.png';
export interface MockData {
  AVAILABLE_PRODUCTS_DATA: {
    sites: object[];
    isPartial?: boolean;
    links?: object[];
  };
  AVAILABLE_PRODUCTS_DATA_ERROR?: object | number;
  CUSTOM_LINKS_DATA: object;
  CUSTOM_LINKS_DATA_ERROR?: object | number;
  USER_PERMISSION_DATA: {
    manage: any;
  };
  XFLOW_SETTINGS: object;
  PRODUCT_RECOMMENDATIONS_DATA: object;
  PRODUCT_RECOMMENDATIONS_DATA_ERROR?: object | number;
  COLLABORATION_GRAPH_CONTAINERS: object;
  PRODUCT_CONFIGURATIONS_DATA: {
    products: Record<string, object>;
    links: Record<string, object>;
  };
  PRODUCT_CONFIGURATIONS_DATA_ERROR?: object | number;
}
// Mock data can be overriden in the story so be careful when testing.
const ORIGINAL_MOCK_DATA: MockData = {
  AVAILABLE_PRODUCTS_DATA: {
    isPartial: false,
    sites: [
      {
        adminAccess: false,
        availableProducts: [
          {
            productType: 'CONFLUENCE',
            url: null,
          },
          {
            productType: 'JIRA_SOFTWARE',
            url: null,
          },
        ],
        cloudId: '0706eddc-00d7-4e1c-9268-ee3c1d2408cc',
        displayName: 'sre-ehlo',
        url: 'https://sre-ehlo.jira-dev.com',
        avatar: avatarRings,
      },
      {
        adminAccess: false,
        availableProducts: [
          {
            productType: 'CONFLUENCE',
            url: null,
          },
          {
            productType: 'JIRA_BUSINESS',
            url: null,
          },
        ],
        cloudId: '536e586b-06fe-4550-b084-4e5b12ede8c5',
        displayName: 'atl-vertigo-product-fabric-testing',
        url: 'https://atl-vertigo-product-fabric-testing.jira-dev.com',
        avatar: avatarSite,
      },
      {
        adminAccess: false,
        availableProducts: [
          {
            productType: 'CONFLUENCE',
            url: null,
          },
          {
            productType: 'JIRA_BUSINESS',
            url: null,
          },
          {
            productType: 'JIRA_SERVICE_DESK',
            url: null,
          },
          {
            productType: 'JIRA_SOFTWARE',
            url: null,
          },
        ],
        cloudId: 'DUMMY-43cb9cad-e4b1-407a-a727-1c40e9314f04',
        displayName: 'growth',
        url: 'https://growth.jira-dev.com',
        avatar: avatarRocket,
      },
      {
        adminAccess: false,
        availableProducts: [
          {
            productType: 'CONFLUENCE',
            url: null,
          },
          {
            productType: 'JIRA_SERVICE_DESK',
            url: null,
          },
          {
            productType: 'JIRA_SOFTWARE',
            url: null,
          },
        ],
        cloudId: 'DUMMY-7c8a2b74-595a-41c7-960c-fd32f8572cea',
        displayName: 'sdog',
        url: 'https://sdog.jira-dev.com',
        avatar: avatarRocket,
      },
      {
        adminAccess: false,
        availableProducts: [
          {
            productType: 'CONFLUENCE',
            url: null,
          },
        ],
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        displayName: 'Atlassian Pug',
        url: 'https://pug.jira-dev.com',
        avatar: null,
      },
      {
        adminAccess: true,
        availableProducts: [
          {
            productType: 'CONFLUENCE',
            url: null,
          },
          {
            productType: 'JIRA_SOFTWARE',
            url: null,
          },
          {
            productType: 'OPSGENIE',
            url: 'https://start.atlassian-app.opsgeni.us',
          },
        ],
        cloudId: 'some-cloud-id',
        displayName: 'some-random-instance-some-random-instance',
        url: 'https://some-random-instance.atlassian.net',
        avatar: null,
      },
      {
        adminAccess: false,
        availableProducts: [
          {
            productType: 'JIRA_BUSINESS',
            url: null,
          },
          {
            productType: 'JIRA_SERVICE_DESK',
            url: null,
          },
          {
            productType: 'JIRA_SOFTWARE',
            url: null,
          },
        ],
        cloudId: '49d8b9d6-ee7d-4931-a0ca-7fcae7d1c3b5',
        displayName: 'jdog',
        url: 'https://jdog.jira-dev.com',
        avatar: avatarCharlieWhite,
      },
      {
        adminAccess: false,
        availableProducts: [
          {
            productType: 'BITBUCKET',
            url: 'https://bitbucket.org/dashboard/overview',
          },
        ],
        cloudId: 'bitbucket',
        displayName: 'Bitbucket',
        url: 'https://bitbucket.org',
        avatar: null,
      },
      {
        adminAccess: false,
        availableProducts: [
          {
            productType: 'STATUSPAGE',
            url: 'https://atlassianinternal.statuspage.io',
          },
        ],
        cloudId: '497ea592-beb4-43c3-9137-a6e5fa301000',
        displayName: 'Statuspage instance',
        url: 'https://statuspage.io',
        avatar: null,
      },
    ],
    links: [
      {
        linkType: 'ADMINISTRATION',
        url: 'https://admin.stg.atlassian.com/',
      },
    ],
  },
  CUSTOM_LINKS_DATA: [
    {
      key: 'home',
      link: 'https://some-random-instance.atlassian.net/secure/MyJiraHome.jspa',
      label: 'Jira',
      local: true,
      self: false,
      applicationType: 'jira',
    },
    {
      key: 'home',
      link: 'https://some-random-instance.atlassian.net/wiki/',
      label: 'Confluence',
      local: true,
      self: false,
      applicationType: 'jira',
    },
    {
      key: 'home',
      link: 'https://bitbucket.org/my-team',
      label: 'Bitbucket - My Team',
      local: false,
      self: false,
      applicationType: 'jira',
    },
  ],
  USER_PERMISSION_DATA: {
    manage: {
      permitted: true,
    },
  },
  XFLOW_SETTINGS: {},
  PRODUCT_RECOMMENDATIONS_DATA: {
    capability: {
      DIRECT_ACCESS: [
        {
          resourceId: 'ari:cloud:jira-software::site/example-cloud-id',
          userAccessLevel: 'EXTERNAL',
          roleAri: 'ari:cloud:jira-software::role/product/member',
          url:
            'https://example0.jira-dev.com/secure/BrowseProjects.jspa?selectedProjectType=software',
          displayName: 'example0',
          avatarUrl: avatarLightbulb,
        },
        {
          resourceId: 'ari:cloud:confluence::site/example-cloud-id',
          userAccessLevel: 'EXTERNAL',
          roleAri: 'ari:cloud:confluence::role/product/member',
          url: 'https://example0.jira-dev.com/wiki',
          displayName: 'example0',
          avatarUrl: avatarLightbulb,
        },
      ],
    },
  },
  COLLABORATION_GRAPH_CONTAINERS: {
    collaborationGraphEntities: [
      {
        entityType: 'CONTAINER',
        containerType: 'confluenceSpace',
        id: '403016412',
        containerDetails: {
          id: '403016412',
          key: 'SMRT',
          name: 'Search & Smarts',
          url: 'https://hello.atlassian.net/wiki/spaces/SMRT',
          iconUrl: iconSmrt,
        },
        score: 268500.0,
      },
      {
        entityType: 'CONTAINER',
        containerType: 'jiraProject',
        id: '20740',
        containerDetails: {
          id: '20740',
          key: 'PC',
          name: 'Project Central',
          url: 'https://hello.atlassian.net/browse/PC',
          iconUrl: iconPower,
        },
        score: 109250.0,
      },
      {
        entityType: 'CONTAINER',
        containerType: 'confluenceSpace',
        id: '169932209',
        containerDetails: {
          id: '169932209',
          key: '~gawadhwal',
          name: 'Gaurav Awadhwal',
          url: 'https://hello.atlassian.net/wiki/spaces/~gawadhwal',
          iconUrl: iconGawadhwal,
        },
        score: 90750.0,
      },
      {
        entityType: 'CONTAINER',
        containerType: 'jiraProject',
        id: '19643',
        containerDetails: {
          id: '19643',
          key: 'OKR',
          name: 'Objectives and Key Results (OKR)',
          url: 'https://hello.atlassian.net/browse/OKR',
          iconUrl: iconDartboard,
        },
        score: 40500.0,
      },
      {
        entityType: 'CONTAINER',
        containerType: 'confluenceSpace',
        id: '188186690',
        containerDetails: {
          id: '188186690',
          key: '~shamid',
          name: 'Shihab Hamid',
          url: 'https://hello.atlassian.net/wiki/spaces/~shamid',
          iconUrl: iconShamid,
        },
        score: 20250.0,
      },
      {
        entityType: 'CONTAINER',
        containerType: 'jiraProject',
        id: '23340',
        containerDetails: {
          id: '23340',
          key: 'DE',
          name: 'Data Engineering',
          url: 'https://hello.atlassian.net/browse/DE',
          iconUrl: iconAlien,
        },
        score: 20000.0,
      },
      {
        entityType: 'CONTAINER',
        containerType: 'confluenceSpace',
        id: '598578434',
        containerDetails: {
          id: '598578434',
          key: '~706746381',
          name: 'David Nguyen',
          url: 'https://hello.atlassian.net/wiki/spaces/~706746381',
          iconUrl: iconProject,
        },
        score: 10000.0,
      },
      {
        entityType: 'CONTAINER',
        containerType: 'jiraProject',
        id: '10080',
        containerDetails: {
          id: '10080',
          key: 'ADM',
          name: 'Workplace Technology',
          url: 'https://hello.atlassian.net/browse/ADM',
          iconUrl: iconProject,
        },
        score: 10000.0,
      },
    ],
  },
  PRODUCT_CONFIGURATIONS_DATA: {
    products: {
      AVOCADO: {
        label: 'Avocado',
        key: 'avocado',
        icons: {
          blue: atlassianMarkGradientBlueAtlassian,
          neutral: atlassianMarkGradientNeutralAtlassian,
          white: atlassianMarkGradientWhiteAtlassian,
        },
        href: '',
        ordinal: 10,
        description: null,
      },
      BITBUCKET: {
        label: 'Bitbucket',
        key: 'bitbucket',
        icons: {
          blue: bitbucketMarkGradientBlueBitbucket,
          neutral: bitbucketMarkGradientNeutralBitbucket,
          white: bitbucketMarkGradientWhiteBitbucket,
        },
        href: '/dashboard/overview',
        ordinal: 6,
        description: null,
      },
      COMPASS: {
        label: 'Compass',
        key: 'compass',
        icons: {
          blue: compassCompassMarkGradientBlue,
          neutral: compassCompassMarkGradientNeutral,
          white: compassCompassMarkGradientWhite,
        },
        href: '/compass',
        ordinal: 4,
        description: {
          id: 'fabric.atlassianSwitcher.product.description.compass',
          defaultMessage: 'Component manager',
          description:
            'Text displayed under the Compass product recommendation.',
        },
      },
      CONFLUENCE: {
        label: 'Confluence',
        key: 'confluence.ondemand',
        icons: {
          blue: confluenceMarkGradientBlueConfluence,
          neutral: confluenceMarkGradientNeutralConfluence,
          white: confluenceMarkGradientWhiteConfluence,
        },
        href: '/wiki',
        ordinal: 3,
        description: {
          id: 'fabric.atlassianSwitcher.product.description.confluence',
          defaultMessage: 'Document collaboration',
          description:
            'Text displayed under the Confluence product recommendation.',
        },
      },
      JIRA_BUSINESS: {
        label: 'Jira Core',
        key: 'jira-core.ondemand',
        icons: {
          blue: jiraWorkManagementMarkGradientBlueJiraWorkManagement,
          neutral: jiraWorkManagementMarkGradientNeutralJiraWorkManagement,
          white: jiraWorkManagementMarkGradientWhiteJiraWorkManagement,
        },
        href: '/secure/BrowseProjects.jspa?selectedProjectType=business',
        ordinal: 2,
        description: null,
      },
      JIRA_SERVICE_DESK: {
        label: 'Jira Service Management',
        key: 'jira-servicedesk.ondemand',
        icons: {
          blue: jiraServiceManagementJiraServiceManagementMarkGradientBlue,
          neutral: jiraServiceManagementJiraServiceManagementMarkGradientNeutral,
          white: jiraServiceManagementJiraServiceManagementMarkGradientWhite,
        },
        href: '/secure/BrowseProjects.jspa?selectedProjectType=service_desk',
        ordinal: 1,
        description: {
          id: 'fabric.atlassianSwitcher.product.description.jsm',
          defaultMessage: 'Collaborative IT service management',
          description:
            'Text displayed under the Jira Service Management product recommendation.',
        },
      },
      JIRA_SOFTWARE: {
        label: 'Jira Software',
        key: 'jira-software.ondemand',
        icons: {
          blue: jiraSoftwareMarkGradientBlueJiraSoftware,
          neutral: jiraSoftwareMarkGradientNeutralJiraSoftware,
          white: jiraSoftwareMarkGradientWhiteJiraSoftware,
        },
        href: '/secure/BrowseProjects.jspa?selectedProjectType=software',
        ordinal: 0,
        description: {
          id: 'fabric.atlassianSwitcher.product.description.jsw',
          defaultMessage: 'Project and issue tracking',
          description:
            'Text displayed under the Jira Software product recommendation.',
        },
      },
      JIRA_WORK_MANAGEMENT: {
        label: 'Jira Work Management',
        key: 'jira-core.ondemand',
        icons: {
          blue: jiraWorkManagementMarkGradientBlueJiraWorkManagement,
          neutral: jiraWorkManagementMarkGradientNeutralJiraWorkManagement,
          white: jiraWorkManagementMarkGradientWhiteJiraWorkManagement,
        },
        href: '/secure/BrowseProjects.jspa?selectedProjectType=business',
        ordinal: 2,
        description: null,
      },
      OPSGENIE: {
        label: 'Opsgenie',
        key: 'opsgenie',
        icons: {
          blue: opsgenieMarkGradientBlueOpsgenie,
          neutral: opsgenieMarkGradientNeutralOpsgenie,
          white: opsgenieMarkGradientWhiteOpsgenie,
        },
        href: 'https://app.opsgenie.com',
        ordinal: 5,
        description: {
          id: 'fabric.atlassianSwitcher.product.description.opsgenie',
          defaultMessage: 'Modern incident management',
          description:
            'Text displayed under the Opsgenie product recommendation.',
        },
      },
      STATUSPAGE: {
        label: 'Statuspage',
        key: 'statuspage',
        icons: {
          blue: statuspageMarkGradientBlueStatuspage,
          neutral: statuspageMarkGradientNeutralStatuspage,
          white: statuspageMarkGradientWhiteStatuspage,
        },
        href: 'https://statuspage.io',
        ordinal: 7,
        description: null,
      },
      TEAM_CENTRAL: {
        label: 'Team Central (Beta)',
        key: 'townsquare',
        icons: {
          blue: atlassianMarkGradientBlueAtlassian,
          neutral: atlassianMarkGradientNeutralAtlassian,
          white: atlassianMarkGradientWhiteAtlassian,
        },
        href: 'https://team.atlassian.com',
        ordinal: 9,
        description: null,
      },
      TRELLO: {
        label: 'Trello',
        key: 'trello',
        icons: {
          blue: trelloMarkGradientBlue,
          neutral: trelloMarkGradientNeutral,
          white: trelloMarkGradientWhite,
        },
        href: 'https://trello.com',
        ordinal: 8,
        description: null,
      },
    },
    links: {
      ADMINISTRATION: {
        label: {
          id: 'fabric.atlassianSwitcher.administration',
          defaultMessage: 'Administration',
          description:
            'The text of a link redirecting the user to the site administration',
        },
        key: 'administration',
        iconUrl:
          'https://home-static.us-east-1.staging.public.atl-paas.net/icons/settings.svg',
        href: '/admin-remote',
        ordinal: 1000,
        description: null,
      },
    },
  },
};

export default ORIGINAL_MOCK_DATA;
