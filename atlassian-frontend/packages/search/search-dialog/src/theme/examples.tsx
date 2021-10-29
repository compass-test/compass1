import React from 'react';
import { ThemeProvider, useTheme, ThemeContext, createSearchTheme } from '..';
import { generateTheme } from '@atlaskit/atlassian-navigation';

const StyledP = ({ text }: { text: string }) => {
  const theme = useTheme();
  return <p style={{ color: theme.default.color }}>{text}</p>;
};

export const Basic = () => {
  return (
    <ThemeProvider>
      <div>
        <StyledP text={'Expect default coloured text'} />
      </div>
    </ThemeProvider>
  );
};

export const CustomTheme = () => {
  return (
    <ThemeProvider
      partialSearchCSS={{
        default: {
          color: 'purple',
        },
      }}
    >
      <div>
        <StyledP text={'Expect purple text'} />
      </div>
    </ThemeProvider>
  );
};

export const WithGeneratedThemes = () => {
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
          <StyledP text={`Paragraph Text - Theme: ${theme.name}`} />
        </ThemeProvider>
      </div>
    );
  });
};

// todo - deprecate (requires product update)
export const DeprecatedSetupThatShouldStillWork = () => {
  const theme = {
    default: {
      backgroundColor: '#E8CBD2',
      color: 'lime',
      borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    focus: { borderColor: 'rgba(51, 51, 51, 0.8)' },
    hover: { backgroundColor: 'rgba(138, 135, 136, 0.3)', color: '#000000' },
  };
  return (
    <ThemeContext.Provider value={createSearchTheme(theme)}>
      <StyledP text={'Expect lime text'} />
    </ThemeContext.Provider>
  );
};

export default { title: 'Search Dialog / Theming' };
