import { OutdatedAppDetails } from '../src/ui/details/AppOutdated/types';

export const action = (action: string) => () => {
  // eslint-disable-next-line no-console
  console.log({ action });
};

export const appList = [
  {
    key: '1asdf',
    name: 'Appertop',
    url: 'https://www.google.com',
  },
  {
    key: '2asdf',
    name: 'Comtech app',
    url: 'https://www.google.com',
  },
];

export const outdatedApps: OutdatedAppDetails[] = [
  {
    name: 'ApperTop',
    version: '1.1.0',
    url: 'https://google.com/1',
    key: '1',
    versionWithMigration: '2.9.0',
  },
  {
    name: 'Comtech app',
    version: '1.2.0',
    url: 'https://google.com/2',
    key: '2',
    versionWithMigration: '3.0.0',
  },
];
