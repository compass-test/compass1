/**
 * Provides mock search results for components
 */

import faker from 'faker';
import {
  ConfItemResults,
  ConfluenceAttachment,
  ConfluenceBlogpost,
  ConfluenceObjectResult,
  ConfluencePage,
  ConfluenceSpace,
  ConfPeopleResults,
  ConfSpaceResults,
  ContentType as ConfluenceContentType,
  GenericContainerResult,
  Person,
  PersonResult,
  ResultConfluence,
  ResultPerson,
} from '../../confluence/clients/response-types';
import {
  CompassComponentType,
  CompassSearchComponentResult,
} from '@atlassian/dragonfruit-graphql';
import { TeamDetails } from '@atlassian/dragonfruit-rest';

faker.seed(777);

const ATTACHMENT_FILE_TYPES = [
  {
    iconClass: 'icon-file-image',
    extensions: ['gif', 'jpeg', 'jpg', 'png'],
  },
  {
    iconClass: 'icon-file-multimedia',
    extensions: ['wma', 'wmv', 'ram', 'mp3'],
  },
  {
    iconClass: 'icon-file-code',
    extensions: ['xml', 'html', 'js', 'css', 'java', 'jar', 'war', 'ear'],
  },
  {
    iconClass: 'icon-file-document',
    extensions: ['docx', 'dotx', 'doc', 'dot'],
  },
  {
    iconClass: 'icon-file-pdf',
    extensions: ['pdf'],
  },
  {
    iconClass: 'icon-file-presentation',
    extensions: [
      'pptx',
      'ppsx',
      'potx',
      'pot',
      'ppt',
      'pptm',
      'xlt',
      'xls',
      'xlsm',
      'xlsx',
      'xlst',
    ],
  },
  {
    iconClass: 'icon-file-video',
    extensions: ['mov', 'mpeg', 'mpg', 'mp4', 'avi'],
  },
  {
    iconClass: 'icon-file-zip',
    extensions: ['zip'],
  },
  {
    iconClass: 'dummy-unmatched-icon-class',
    extensions: ['unknown', 'test'],
  },
];

const array = (length: number) => [...Array(length)];

const generateNameAndIcon = (contentType: string) => {
  const isAttachment = contentType === ConfluenceAttachment;

  if (isAttachment) {
    const attachmentType = faker.random.arrayElement(ATTACHMENT_FILE_TYPES);
    return {
      name: `${faker.lorem.words(1)}.${faker.random.arrayElement(
        attachmentType.extensions,
      )}`,
      iconClass: attachmentType.iconClass,
    };
  } else {
    return {
      name: faker.lorem.words(5),
      iconClass: 'aui-iconfont-page-default',
    };
  }
};

/**
 * Fixes the randomness of randomly generate responses. This is useful to ensure that tests are deterministic.
 *
 * The default is just some arbitrary number.
 */
export const enableDeterministicResponses = (seed: number = 777) =>
  faker.seed(seed);

/**
 * Mocks a response for a urs people scoped search to the aggregator
 */
export const createPeopleResults = (
  numberOfResults: number = 1,
  timings: number = 0,
): ConfPeopleResults => {
  return {
    items: array(numberOfResults).map(() => {
      const id = faker.random.uuid();

      return {
        analyticsType: ResultPerson,
        avatarUrl: faker.image.people(),
        contentType: Person,
        href: `/people/${id}`,
        mentionName: `nickname-${faker.random.alphaNumeric(5)}`,
        name: faker.name.findName(),
        presenceMessage: '',
        userId: id,
        resultId: `people-${id}`,
        resultType: PersonResult,
      };
    }),
    timings,
  };
};

/**
 * Mocks a response for page blog attachment (aka 'item') search to the aggregator
 */
export const createPageBlogAttachmentResults = (
  numberOfResults: number = 1,
  contentTypes: ConfluenceContentType[] = [
    ConfluencePage,
    ConfluenceBlogpost,
    ConfluenceAttachment,
  ],
  timings: number = 0,
): ConfItemResults => {
  const baseUrl = 'http://baseUrl';

  return {
    items: array(numberOfResults).map(() => {
      const contentType = faker.random.arrayElement(contentTypes);
      const id = faker.random.uuid();

      return {
        ...generateNameAndIcon(contentType),
        analyticsType: ResultConfluence,
        containerId: 'UNAVAILABLE',
        containerName: faker.company.companyName(),
        contentType,
        friendlyLastModified: faker.random.arrayElement([
          'about 7 hours ago',
          'Dec 23, 2018',
          'Jun 17, 2018',
          'Jan 23, 2018',
        ]),
        lastModified: faker.random.arrayElement([
          '2019-10-28T23:35:34.642Z',
          '2019-07-08T02:54:38.822Z',
        ]),
        href: `${baseUrl}/spaces/${id}`,
        isRecentResult: false,
        resultId: id,
        resultType: ConfluenceObjectResult,
      };
    }),
    totalSize: 99,
    timings,
  };
};

/**
 * Mocks a response for recent pages from Confluence
 */
export const createRecentPages = (
  numberOfResults: number = 1,
  timings: number = 0,
): ConfItemResults => {
  const randomPages: ConfItemResults = createPageBlogAttachmentResults(
    numberOfResults,
    [ConfluencePage],
  );

  return {
    items: randomPages.items.map((p) => ({
      ...p,
      isRecentResult: true,
      lastModified: undefined,
      friendlyLastModified: undefined,
    })),
    totalSize: numberOfResults,
    timings,
  };
};

/**
 * Mocks a response for space search to the aggregator
 */
export const createSpaceResponse = (
  numberOfResults: number = 1,
  timings: number = 0,
): ConfSpaceResults => {
  const baseUrl = 'http://baseUrl';

  return {
    items: array(numberOfResults).map(() => {
      const key = `${faker.random.word().toUpperCase()}`;

      return {
        analyticsType: ResultConfluence,
        avatarUrl: faker.image.cats(),
        contentType: ConfluenceSpace,
        href: `${baseUrl}/spaces/${key}`,
        key,
        name: faker.company.companyName(),
        resultId: `space-${key}`,
        resultType: GenericContainerResult,
      };
    }),
    timings,
  };
};

/**
 * Compass utilities
 * */
export const createServiceResults = (
  numberOfResults: number = 1,
  type: CompassComponentType,
): CompassSearchComponentResult[] => {
  return array(numberOfResults).map(() => {
    const id = faker.random.uuid();

    return {
      component: {
        id,
        type:
          type === CompassComponentType.SERVICE
            ? CompassComponentType.SERVICE
            : faker.random.arrayElement([
                CompassComponentType.APPLICATION,
                CompassComponentType.LIBRARY,
                CompassComponentType.OTHER,
              ]),
        name: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        ownerId: faker.random.uuid(),
        changeMetadata: {},
      },
      link: `https://compass.com/${id}`,
    };
  });
};

export const createPeopleTeamsResult = (
  numberOfResults: number = 1,
): TeamDetails[] => {
  return array(numberOfResults).map(() => {
    const id = faker.random.uuid();

    return {
      id: id,
      displayName: faker.commerce.productName(),
      description: 'Great team',
      organizationId: 'orgId',
      smallAvatarImageUrl: faker.internet.domainName(),
      largeAvatarImageUrl: 'http://placehold.it/24x24',
      smallHeaderImageUrl: 'http://placehold.it/24x24',
      largeHeaderImageUrl: 'http://placehold.it/24x24',
      permission: 'permission',
      restriction: 'restriction',
      state: 'state',
    };
  });
};
