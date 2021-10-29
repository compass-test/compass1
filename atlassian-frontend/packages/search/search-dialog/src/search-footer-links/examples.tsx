// eslint-disable-next-line
import { action } from '@storybook/addon-actions';
import faker from 'faker';
import React from 'react';
import { SearchDialog, SearchFooter } from '../';
import { SearchFooterLinks } from './search-footer-links';

const generateSite = (numWords: number = 1) => ({
  content: faker.random.words(numWords),
  key: faker.random.uuid(),
  href: '#',
});

export const Simple = () => (
  <SearchFooterLinks
    label="Simple"
    links={Array(3)
      .fill(0)
      .map(() => generateSite())}
  />
);

export const LinkComponentAndOnClick = () => (
  <SearchFooterLinks
    label="Both onClicks Work"
    dropdownTriggerLabel="More"
    links={Array(10)
      .fill(0)
      .map(() => generateSite(3))}
    onClick={(_, e) => {
      e.preventDefault();
      return action('OnClick called')(e);
    }}
    linkComponent={(props: any) => (
      /* eslint-disable-next-line */
      <a
        {...props}
        onClick={(e) => {
          e.preventDefault();
          return action('Link Component onClick Called')(e);
        }}
      />
    )}
  />
);

export default {
  title: 'Search Footer Links',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchDialog>
        <SearchFooter>{story()}</SearchFooter>
      </SearchDialog>
    ),
  ],
};
