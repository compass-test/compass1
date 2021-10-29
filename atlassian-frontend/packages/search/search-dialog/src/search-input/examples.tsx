import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import SearchInput from './search-input';
import { ThemeProvider } from '../theme';
import { generateTheme } from '@atlaskit/atlassian-navigation';

const commonProps = {
  placeholder: 'Search',
  onClick: action('onClick'),
  onInput: action('onInput'),
};

const themes = [
  {
    name: 'huge',
    backgroundColor: '#FFFFFF',
    highlightColor: '#D8388A',
  },
  {
    name: 'showpo',
    backgroundColor: '#E8CBD2',
    highlightColor: '#333333',
  },
  {
    name: 'up',
    backgroundColor: '#EF816B',
    highlightColor: '#FDEE80',
  },
  {
    name: '86400',
    backgroundColor: '#000448',
    highlightColor: '#6FF2B4',
  },
  {
    name: 'netflix',
    backgroundColor: '#272727',
    highlightColor: '#E94E34',
  },
];

export const CollapsedWithNoText = () => (
  <SearchInput {...commonProps} isExpanded={false} value="" />
);

export const ExpandedWithNoText = () => (
  <SearchInput {...commonProps} isExpanded value="" />
);

export const CollapsedWithText = () => (
  <SearchInput
    {...commonProps}
    isExpanded={false}
    value="some random search query"
  />
);

export const ExpandedWithText = () => (
  <SearchInput {...commonProps} isExpanded value="some random search query" />
);

export const WithTheming = () => (
  <div>
    {[true, false].map((isExpanded) =>
      themes.map((theme) => {
        return (
          <div
            key={theme.name}
            style={{ backgroundColor: theme.backgroundColor, padding: '5px' }}
          >
            <ThemeProvider partialSearchCSS={generateTheme(theme).mode.search}>
              <SearchInput
                {...commonProps}
                isExpanded={isExpanded}
                value={isExpanded ? theme.name : ''}
              />
            </ThemeProvider>
          </div>
        );
      }),
    )}
  </div>
);

export const WithTooltip = () => (
  <div>
    <SearchInput
      {...commonProps}
      isExpanded={false}
      value=""
      tooltipContent={<p>I am a tooltip</p>}
    />

    <br />
    <br />

    <SearchInput
      {...commonProps}
      isExpanded
      value=""
      tooltipContent={<p>I am a tooltip</p>}
    />
  </div>
);

export const Interactive = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState('');
  return (
    <SearchInput {...commonProps} isExpanded value={value} onInput={setValue} />
  );
};

export default { title: 'Search Dialog/Search Input' };
