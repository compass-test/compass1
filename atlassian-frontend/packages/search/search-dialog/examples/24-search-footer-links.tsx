import React from 'react';
import {
  SearchFooter,
  SearchFooterLinks,
  SearchDialog,
  LinkComponent,
} from '../src';

const links = [
  {
    key: 'keyA',
    content: 'some link',
    href: '#',
  },
  {
    key: 'keyB',
    content: 'some other link',
    href: '#',
  },
  {
    key: 'keyLong',
    content: Array(64).fill('a').join(''),
    href: '#',
  },
  {
    key: 'keyC',
    content: 'a third link',
    href: '#',
  },
  {
    key: 'keyE',
    content: 'some dropdown link',
    href: '#',
  },
  {
    key: 'keyF',
    content: 'some other dropdown link',
    href: '#',
  },
  {
    key: 'keyAlsoLong',
    content: Array(64).fill('a').join(''),
    href: '#',
  },
  {
    key: 'wac',
    content: 'atlassian.com',
    href: 'https://www.atlassian.com',
  },
];

const mockLinkComponent: LinkComponent = (props) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a onClick={() => console.log('link component click')} {...props} />;
};

export const ContextualExample = () => (
  <SearchDialog>
    <div style={{ padding: '1em' }}>
      <p>Search results with footer links below...</p>
    </div>
    <SearchFooter>
      <SearchFooterLinks
        onClick={(e) => {
          console.log('Link Clicked', e);
        }}
        linkComponent={mockLinkComponent}
        label="Search For:"
        dropdownTriggerLabel="More"
        links={links}
      />
    </SearchFooter>
  </SearchDialog>
);

export default ContextualExample;
