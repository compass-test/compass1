import {
  ChildPagesResponse,
  PageData,
  PageDataWithAncestors,
} from '../../types';

import Alvin from '../../examples/assets/Alvin.png';
import Angie from '../../examples/assets/Angie.png';
import Arjun from '../../examples/assets/Arjun.png';
import BeepBoop from '../../examples/assets/Beep-Boop.png';
import Claudia from '../../examples/assets/Claudia.png';

export const getMockResponseForGetChildren = ({
  number = 1,
} = {}): PageData[] => [
  {
    id: 'long-1',
    title: 'Page title 1',
    status: 'current',
    metadata: {
      frontend: {
        collabService: 'synchrony' as 'synchrony' | 'ncs',
      },
    },
    childTypes: {
      page: {
        value: true,
      },
    },
    extensions: {
      position: 1,
    },
    history: {
      lastUpdated: {
        friendlyWhen: 'less than a minute ago',
        number,
      },
      contributors: {
        publishers: {
          users: [
            {
              displayName: 'My little admin',
              accountId: '0',
              profilePicture: {
                path: '/static/media/Arjun.121fcf07.png',
              },
            },
          ],
        },
      },
    },
    _links: {
      base: 'https://hostname.com/path',
      self: '/foo',
      editui: '/edit',
      webui: '/web',
      tinyui: '/tiny',
    },
  },
];

const emptyResponse = {
  results: [] as any[],
  start: 0,
  limit: 200,
  size: 0,
};

const directoryMockData = {
  data: {
    User: {
      id: '111',
      isCurrentUser: true,
      isCensored: 'visible',
      isActive: true,
      isBot: false,
      isNotMentionable: false,
      fullName: 'User',
      nickname: null,
      email: 'xyz@example.com',
      meta: 'Contributor',
      location: 'Sydney, Australia',
      companyName: 'Atlassian',
      avatarUrl: '',
      remoteWeekdayIndex: '3',
      remoteWeekdayString: 'Wed',
      remoteTimeString: '5:53pm',
    },
  },
};

function setChildrenProp(page: any, prop: any) {
  /* eslint-disable no-param-reassign */
  page.childTypes.page.value = prop;
}

function setPartialHistoryData(data: any) {
  /* eslint-disable no-param-reassign */
  delete data.results[0].history.contributors;
  delete data.results[1].history.lastUpdated;
  delete data.results[2].history;
}

function getPageDetailMockData(
  idPrefix: string,
  id: number,
  noOfUsers: number,
) {
  const historySubset = ([
    [1, 'less than a minute ago'],
    [2, 'Nov 17, 2017'],
    [1, 'a minute ago'],
    [3, '34 minutes ago'],
    [1, 'yesterday'],
    [2, 'Jan 03, 2018'],
    [5, 'an hour ago'],
    [3, '3 hours ago'],
    [10, 'Mar 31, 2012'],
  ] as [number, string][]).map(([number, friendlyWhen]) => ({
    number, // the number of times the page was edited
    friendlyWhen,
  }));
  const pageDetailsMock = {
    id: `${idPrefix}-${id + 1}`,
    type: 'page',
    history: {
      lastUpdated: {
        by: {
          type: 'known',
          username: 'admin',
          profilePicture: {
            path: '/wiki/aa-avatar',
          },
          displayName: 'User',
        },
        ...historySubset[id % historySubset.length],
      },
      contributors: {
        publishers: {
          users: [] as any[],
        },
      },
    },
  };
  const userCountBasedContributors = [
    null,
    [Alvin],
    [Arjun, Angie],
    [Claudia, Arjun, BeepBoop],
    [BeepBoop, Angie, Alvin, Claudia],
  ];

  for (let i = 0; i < noOfUsers; i++) {
    pageDetailsMock.history.contributors.publishers.users.push({
      type: 'known',
      username: 'admin',
      accountId: i.toString(),
      profilePicture: {
        path: (userCountBasedContributors[noOfUsers] as any)[i],
      },
      displayName: `User ${i + 1}`,
    });
  }

  return pageDetailsMock;
}

function createPageDetailsMockResponse(size: any, { idPrefix = '' } = {}) {
  const results = [];
  const usersCount = [2, 1, 3, 1, 4, 2];

  for (let i = 0; i < size; i++) {
    const noOfUsers = usersCount[i % usersCount.length];
    results.push(getPageDetailMockData(idPrefix, i, noOfUsers));
  }

  return {
    results,
    size,
    start: 0,
    limit: 200,
  };
}

const createPageListMockResponse = (
  size: any,
  { idPrefix = '' } = {},
): ChildPagesResponse => {
  const results = [];
  const titles = [
    `Page title with with very long name to demonstrate that if the page title is long enough,
    the title will be wraped by the page tree component. Adding more words to increase the size of the page title`,
    'Page title with a few special characters !@#$%^&',
    'A normal page title',
    'Page',
  ];

  // combine the list and details in a single mock response
  const detailsMock = createPageDetailsMockResponse(size, { idPrefix });
  for (let i = 0; i < size; i++) {
    const id = `${idPrefix}-${i + 1}`;
    const details = detailsMock.results.find((d) => d.id === id);
    results.push({
      ...details,
      id: `${idPrefix}-${i + 1}`,
      title: titles[i % titles.length],
      status: 'current',
      childTypes: {
        page: {
          value: false,
        },
      },
      metadata: {
        frontend: {
          collabService: i % 2 === 0 ? 'synchrony' : 'ncs',
        },
      },
      _links: {
        self: `/self/${i}`,
        editui: `/edit/${i}`,
        tinyui: `/tiny/${i}`,
        webui: `/spaces/QQQ/pages/${i}/Page+${i}`,
      },
    } as PageData);
  }

  return {
    results,
    size,
    start: 0,
    limit: 200,
    _links: {
      base: 'http://base.url/path',
      context: '/wiki',
    },
  };
};

const mockDraft: PageDataWithAncestors = {
  ...getMockResponseForGetChildren()[0],
  version: {
    collaborators: {
      users: [],
    },
    friendlyWhen: 'an hour ago',
    number: 1,
  },
  status: 'draft',
  ancestors: [],
  metadata: {
    frontend: {
      collabService: 'ncs' as 'ncs' | 'synchrony',
    },
    currentuser: {
      lastmodified: {
        friendlyLastModified: 'less than a minute ago',
        version: {
          number: 1,
          by: {
            displayName: 'My little admin',
            accountId: '0',
            profilePicture: {
              path: '/static/media/Arjun.121fcf07.png',
            },
          },
        },
      },
    },
  },
};

export {
  emptyResponse,
  directoryMockData,
  setPartialHistoryData,
  setChildrenProp,
  createPageListMockResponse,
  mockDraft,
};
