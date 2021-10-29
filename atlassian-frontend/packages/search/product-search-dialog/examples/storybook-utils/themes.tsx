import { generateTheme, NavigationTheme } from '@atlaskit/atlassian-navigation';

export const themeExamples: Record<string, NavigationTheme> = {
  huge: generateTheme({
    backgroundColor: '#FFFFFF',
    highlightColor: '#D8388A',
  }),

  showpo: generateTheme({
    backgroundColor: '#E8CBD2',
    highlightColor: '#333333',
  }),

  up: generateTheme({
    backgroundColor: '#EF816B',
    highlightColor: '#FDEE80',
  }),

  '86400': generateTheme({
    backgroundColor: '#000448',
    highlightColor: '#6FF2B4',
  }),

  netflix: generateTheme({
    backgroundColor: '#272727',
    highlightColor: '#E94E34',
  }),
};
