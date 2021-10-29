import { appConfiguration } from './app-configuration';
import { appManagement } from './app-management';
import { componentDetails, componentDetailsApp } from './component-details';
import { componentsList } from './components-list';
import { csvImport } from './csv-import';
import { home } from './home';
import { people } from './people';
import { rootRedirect } from './root-redirect';
import { scorecardDetails } from './scorecard-details';
import { scorecards } from './scorecards';
import { settings } from './settings';
import { teamDetails } from './team-details';
import { teams } from './teams';

export default [
  appConfiguration,
  appManagement,
  componentsList,
  csvImport,
  home,
  teams,
  people,
  componentDetails,
  componentDetailsApp,
  scorecards,
  settings,
  teamDetails,
  rootRedirect,
  scorecardDetails,
];
