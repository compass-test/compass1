import { InviteApiClientImpl } from './InviteApiClient';
import { PermsApiClient } from './PermsApiClient';
import { ThirdPartyInvitesClient } from './ThirdPartyInvitesClient';
import { ExusThirdPartyInvitesClient } from './ExusThirdPartyInvitesClient';
import { AccountInfoClient } from './AccountInfoClient';
import { OpenInviteClient } from './OpenInviteClient';
import {
  HaveISeenItClient,
  createHISIDomainFlagKey,
  createHISIOpenInviteFlagKey,
} from './HaveISeenItClient';
export const defaultInviteApiClient = new InviteApiClientImpl();
export const defaultPermsApiClient = new PermsApiClient();
export const defaultThirdPartyInvitesClient = new ThirdPartyInvitesClient();
export const exusThirdPartyInvitesClient = new ExusThirdPartyInvitesClient();
export const defaultAccountInfoClient = new AccountInfoClient();
export const defaultOpenInviteClient = new OpenInviteClient();
export const defaultHaveISeenItClient = new HaveISeenItClient();
export { createHISIDomainFlagKey, createHISIOpenInviteFlagKey };
