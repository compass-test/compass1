import { configure } from 'mobx';

export type { JiraFormBuilderSettings } from './components';

export { JiraFormBuilderApp } from './components';

// Configure MobX to isolate itself from other copies of MobX, such as the MobX loaded by proforma-ui or a third-party Jira app.
configure({ isolateGlobalState: true });
