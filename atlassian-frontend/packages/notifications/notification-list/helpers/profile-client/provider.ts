/**
 * The idea is to allow products to perform this import:
 * import { ProfileClientContextProvider } from '@atlassian/notification-list/helpers/profile-client/provider';
 *
 * This will keep the main bundle from growing in size from unnecessary imports (that could be Lazily loaded).
 */
export { ProfileClientContextProvider } from '../../src/common/ui/profile-client-context';
