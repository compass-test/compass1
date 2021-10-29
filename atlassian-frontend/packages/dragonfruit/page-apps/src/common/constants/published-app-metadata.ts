import { NewRelicLogo } from '@atlassian/dragonfruit-common-ui/assets';

import { PublishedAppMetadata } from './types';

// Enum of unique identifiers for each app
export enum APP_KEY {
  BITBUCKET = 'bitbucket',
  NEW_RELIC = 'newRelic',
  SWAGGER_UI = 'swaggerUI',
}

/**
 * Metadata for each app that's published
 *
 * WARNING: CHANGES TO THE DESCRIPTION FIELD WILL UPDATE A REACT-INTL FORMATTED MESSAGE
 * AND REQUIRE ADJUSTMENTS TO TRANSLATIONS
 */
export const PUBLISHED_APP_METADATA: PublishedAppMetadata[] = [
  {
    key: APP_KEY.BITBUCKET,
    name: 'Bitbucket',
    production: {
      appId: '05175914-734f-4887-b303-4ad44d6c3a34',
    },
    staging: {
      appId: '89ae44dd-e7e3-4e4e-b63e-4f83f1b317ed',
    },
    description:
      'Connect Bitbucket to Compass to manage components with config-as-code. {LearnMore}.',
    learnMoreDescription: 'Learn more about integrating with Bitbucket Cloud',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png', // TODO: (COMPASS-719) Replace this with the real asset we want to use
    vendor: 'Atlassian',
    documentationUrl: 'https://go.atlassian.com/compass-bitbucket-integration',
  },
  {
    key: APP_KEY.NEW_RELIC,
    name: 'New Relic',
    production: {
      appId: '64cf65a9-1426-4878-8a92-9aefe254ea2f',
    },
    staging: {
      appId: 'd0facadd-1e47-470e-8cc7-7e047398b35e',
    },
    description:
      'Import services from New Relic to manage them using Compass. {LearnMore}.',
    learnMoreDescription:
      'Learn more about importing components from New Relic',
    imageUrl: NewRelicLogo,
    vendor: 'Atlassian',
    documentationUrl: 'https://go.atlassian.com/compass-newrelic-integration',
  },
  {
    key: APP_KEY.SWAGGER_UI,
    name: 'Swagger UI',
    production: {
      appId: '564688a0-afba-45d3-b882-dbf6edbe6066',
    },
    staging: {
      appId: '1dfce0a6-4133-4e22-a688-c97a0421eb92',
    },
    description: 'View the Swagger API specs of your components in Compass.',
    imageUrl:
      'https://gist.githubusercontent.com/itsrifat/7fdb3d7d2326bf5fdd06ab2b78608c1d/raw/00d8229cd9f5402b5e35e2ba3032c0d872c7aa57/swagger-icon.svg',
    vendor: 'Atlassian',
    documentationUrl: '',
  },
];
