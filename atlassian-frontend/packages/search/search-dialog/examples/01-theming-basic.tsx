import React from 'react';
import { ThemeProvider, useTheme } from '../src';

const ThemedP = ({ text }: { text: string }) => {
  const theme = useTheme();
  return <p style={{ color: theme.default.color }}>{text}</p>;
};

const Example = () => {
  return (
    <ThemeProvider>
      <ThemedP text="Custom themed paragraph text inside Search Dialog" />
    </ThemeProvider>
  );
};

export default Example;
