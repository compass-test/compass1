import { EnvironmentContext } from '../context';
export { useExtensionList } from '../web-client';
export type { UseExtensionListOptions } from '../web-client';

export const ForgeUIEnvironmentProvider = EnvironmentContext.Provider;

export { ProductEnvironment } from '@atlassian/forge-ui-types';

export { ForgeUIExtensionPointProvider } from './ForgeUIExtensionPointProvider';

export type { ForgeUIExtensionQueryOptions } from './ForgeUIExtensionPointProvider';
