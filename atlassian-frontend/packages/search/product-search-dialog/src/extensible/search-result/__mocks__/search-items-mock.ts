import { SearchItems } from '../../product-router/product/result-types';

const searchItemsMock: SearchItems = {
  size: 2,
  sections: [
    {
      id: 'bitbucket-repository',
      title: 'section title',
      viewAllLinkGenerator: (query = '') => `https://site/search?q=${query}`,
      searchResults: [
        {
          title: 'repo-name',
          id: 'repo-id',
          meta: 'Description',
          url: '/url',
          iconUrl: '/',
        },
        {
          title: 'repo-name-2',
          id: 'repo-id-2',
          meta: 'Description-2',
          url: '/url-2',
          iconUrl: '/2',
        },
      ],
    },
  ],
};

export default searchItemsMock;
