import React from 'react';

import { Card } from '@atlaskit/smart-card';
import { openInNewTab, withErrorBoundary } from '@atlassian/dragonfruit-utils';

export type Props = {
  text: string;
  url: string;
  isSelected?: boolean;
};

// Copied the WorldIcon from atlaskit icons, and convert into a data url using: https://npm.runkit.com/mini-svg-data-uri
const worldIcon = `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' role='presentation'%3e%3cpath d='M12 21a9 9 0 100-18 9 9 0 000 18zm-.9-1.863A7.19 7.19 0 014.8 12c0-.558.072-1.089.189-1.611L9.3 14.7v.9c0 .99.81 1.8 1.8 1.8v1.737zm6.21-2.286A1.786 1.786 0 0015.6 15.6h-.9v-2.7c0-.495-.405-.9-.9-.9H8.4v-1.8h1.8c.495 0 .9-.405.9-.9V7.5h1.8c.99 0 1.8-.81 1.8-1.8v-.369c2.637 1.071 4.5 3.654 4.5 6.669 0 1.872-.72 3.573-1.89 4.851z' fill='currentColor' fill-rule='evenodd'/%3e%3c/svg%3e`;

const SmartLinkWithData = ({ text, url, isSelected = false }: Props) => {
  // Function to prevent default and open in new tab
  const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
    openInNewTab(url);
  };

  const data = {
    name: text,
    url,
    generator: {
      '@id': 'Compass',
      name: 'CompassLink',
      text: 'Link',
      icon: worldIcon,
    },
  };
  return (
    <Card
      onClick={handleClick}
      platform="web"
      isSelected={isSelected}
      appearance="inline"
      data={data}
    />
  );
};

const SmartLinkWrapper = ({ url, isSelected = false }: Props) => {
  // Function to prevent default and open in new tab
  const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
    openInNewTab(url);
  };

  return (
    <Card
      onClick={handleClick}
      platform="web"
      isSelected={isSelected}
      appearance="inline"
      url={url}
    />
  );
};

export default withErrorBoundary(SmartLinkWrapper, {
  Fallback: SmartLinkWithData,
  reportErrors: false,
});
