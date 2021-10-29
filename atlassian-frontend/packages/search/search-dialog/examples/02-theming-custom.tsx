import React from 'react';
import { ThemeProvider, useTheme } from '../src';

const ThemedP = ({ text }: { text: string }) => {
  const theme = useTheme();
  return <p style={{ color: theme.default.color }}>{text}</p>;
};

const CustomTheme = () => {
  return (
    <ThemeProvider
      partialSearchCSS={{
        default: {
          color: 'purple',
        },
      }}
    >
      <div>
        <ThemedP text={'Expect purple text'} />
      </div>
    </ThemeProvider>
  );
};

export default CustomTheme;
