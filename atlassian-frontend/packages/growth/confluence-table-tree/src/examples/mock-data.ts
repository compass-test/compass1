import Alvin from './assets/Alvin.png';
import Angie from './assets/Angie.png';
import Arjun from './assets/Arjun.png';
import BeepBoop from './assets/Beep-Boop.png';
import Claudia from './assets/Claudia.png';

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
  const historySubset = [
    [1, 'less than a minute ago'],
    [2, 'Nov 17, 2017'],
    [1, 'a minute ago'],
    [3, '34 minutes ago'],
    [1, 'yesterday'],
    [2, 'Jan 03, 2018'],
    [5, 'an hour ago'],
    [3, '3 hours ago'],
    [10, 'Mar 31, 2012'],
  ].map(([number, friendlyWhen]) => ({
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

function createPageListMockResponse(size: any, { idPrefix = '' } = {}) {
  const results = [];
  const titles = [
    `Page title with with very long name to demonstrate that if the page title is long enough,
    the title will be wraped by the page tree component. Adding more words to increase the size of the page title`,
    'Page title with a few special characters !@#$%^&',
    'A normal page title',
    'Page',
  ];

  for (let i = 0; i < size; i++) {
    results.push({
      id: `${idPrefix}-${i + 1}`,
      title: titles[i % titles.length],
      type: 'page',
      status: 'current',
      childTypes: {
        page: {
          value: false,
        },
      },
      container: {
        key: 'QQQ',
        name: 'qqq',
        type: 'global',
        status: 'current',
      },
      _links: {
        webui: `/spaces/QQQ/pages/${i}/Page+${i}`,
      },
    });
  }

  return {
    results,
    size,
    start: 0,
    limit: 200,
  };
}

export {
  emptyResponse,
  directoryMockData,
  setPartialHistoryData,
  setChildrenProp,
  createPageDetailsMockResponse,
  createPageListMockResponse,
};
