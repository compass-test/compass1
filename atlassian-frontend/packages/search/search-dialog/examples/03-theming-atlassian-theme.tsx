import React from 'react';
import { ThemeProvider, useTheme } from '../src';
import { generateTheme } from '@atlaskit/atlassian-navigation';

const ThemedP = ({ text }: { text: string }) => {
  const theme = useTheme();
  return <p style={{ color: theme.default.color }}>{text}</p>;
};

const AtlassianThemes = () => {
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
  return themes.map((theme) => {
    return (
      <div
        key={theme.name}
        style={{ backgroundColor: theme.backgroundColor, padding: '5px' }}
      >
        <ThemeProvider partialSearchCSS={generateTheme(theme).mode.search}>
          <ThemedP text={`Paragraph Text - Theme: ${theme.name}`} />
        </ThemeProvider>
      </div>
    );
  });
};

export default AtlassianThemes;
