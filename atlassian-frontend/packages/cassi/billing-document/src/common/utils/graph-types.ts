export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type AdditionalNotes = {
  __typename?: 'AdditionalNotes';
  id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

/**
 * Add-ons are child entitlements to parent entitlements.
 *
 * Examples: Team Members for Statuspage
 */
export type AddOn = {
  __typename?: 'AddOn';
  offeringId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  units?: Maybe<Scalars['Int']>;
  dateAdded?: Maybe<Scalars['String']>;
  dateRemoved?: Maybe<Scalars['String']>;
  dateLastBilled?: Maybe<Scalars['String']>;
  nextBillDate?: Maybe<Scalars['String']>;
  billingStatus?: Maybe<BillingStatus>;
  entitlementNumber?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type AddOnConnection = Connection & {
  __typename?: 'AddOnConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<AddOnEdge>>>;
  nodes?: Maybe<Array<Maybe<AddOn>>>;
};

export type AddOnEdge = Edge & {
  __typename?: 'AddOnEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<AddOn>;
};

export type AggregatedProduct = {
  __typename?: 'AggregatedProduct';
  productName?: Maybe<Scalars['String']>;
  userCount?: Maybe<Scalars['Int']>;
  billedProductCount?: Maybe<Scalars['Int']>;
  freeProductCount?: Maybe<Scalars['Int']>;
  unlimitedUserProductCount?: Maybe<Scalars['Int']>;
  evaluationProductCount?: Maybe<Scalars['Int']>;
};

export type Announcement = {
  __typename?: 'Announcement';
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  previewThumbnail?: Maybe<PreviewThumbnail>;
  expiryDate?: Maybe<Scalars['String']>;
  meta?: Maybe<AnnouncementMeta>;
  isUnseen?: Maybe<Scalars['Boolean']>;
};

export type AnnouncementConnection = Connection & {
  __typename?: 'AnnouncementConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<AnnouncementEdge>>>;
  nodes?: Maybe<Array<Maybe<Announcement>>>;
};

export type AnnouncementEdge = Edge & {
  __typename?: 'AnnouncementEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Announcement>;
};

export type AnnouncementMeta = {
  __typename?: 'AnnouncementMeta';
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

/** Properties that drive the CASSI application experience (non-entity related) */
export type Application = {
  __typename?: 'Application';
  /** Application slug that will identify the application */
  id?: Maybe<Scalars['String']>;
  /** Custom icon url that will be displayed in the header */
  iconUrl?: Maybe<Scalars['String']>;
  /** Application name that will be displayed in navigation */
  name?: Maybe<Scalars['String']>;
  /** Populates the help menu in the navigation */
  helpNavigation?: Maybe<Array<Maybe<NavigationItem>>>;
  /** Populates the app switcher menu in the navigation */
  appSwitcherNavigation?: Maybe<Array<Maybe<NavigationItem>>>;
  banner?: Maybe<Banner>;
  portalApp?: Maybe<PortalApp>;
  announcements?: Maybe<AnnouncementConnection>;
  featureFlag?: Maybe<FeatureFlag>;
};

/** Properties that drive the CASSI application experience (non-entity related) */
export type ApplicationPortalAppArgs = {
  id: Scalars['String'];
};

/** Properties that drive the CASSI application experience (non-entity related) */
export type ApplicationFeatureFlagArgs = {
  flagKey: Scalars['String'];
  targetingProperties?: Maybe<Scalars['JSON']>;
};

export type AtlassianAccess = {
  __typename?: 'AtlassianAccess';
  cloudSiteId?: Maybe<Scalars['String']>;
  cloudSiteUrl?: Maybe<Scalars['String']>;
  billingStatus?: Maybe<BillingStatus>;
};

export type AuditEdge = {
  __typename?: 'AuditEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AuditNote>;
};

/**
 * A record of a single update made to an entity, such as updating a payment
 * method or changing a site name.
 */
export type AuditNote = {
  __typename?: 'AuditNote';
  /** User or system who triggered the update */
  author?: Maybe<Scalars['String']>;
  /** Description of the update */
  body?: Maybe<Scalars['String']>;
  /** Date the update happened */
  created?: Maybe<Scalars['String']>;
};

export type AuditNoteConnection = Connection & {
  __typename?: 'AuditNoteConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  nodes: Array<Maybe<AuditNote>>;
  edges: Array<Maybe<AuditEdge>>;
};

/** Application banner to share information such as an announcement, warning, or outage with users */
export type Banner = {
  __typename?: 'Banner';
  title: Scalars['String'];
  enabled: Scalars['Boolean'];
  bannerAppearance: Scalars['String'];
  message?: Maybe<Scalars['JSON']>;
  incidentTicketUrl?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  dismissalExpiration?: Maybe<Scalars['Int']>;
};

export type Benefit = {
  __typename?: 'Benefit';
  benefitType?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  scale?: Maybe<Scalars['String']>;
  iterations?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type Billing = {
  __typename?: 'Billing';
  billingInformation: BillTo;
  defaultPaymentMethod?: Maybe<PaymentMethod>;
  billingContacts: BillingContacts;
};

export type BillingAdmin = {
  __typename?: 'BillingAdmin';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  relationshipType?: Maybe<Scalars['String']>;
  transactionAccountId?: Maybe<Scalars['String']>;
  atlassianAccountId?: Maybe<Scalars['String']>;
};

export type BillingAdminConnection = Connection & {
  __typename?: 'BillingAdminConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<BillingAdminEdge>>>;
  nodes?: Maybe<Array<Maybe<BillingAdmin>>>;
};

export type BillingAdminEdge = Edge & {
  __typename?: 'BillingAdminEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: BillingAdmin;
};

export type BillingContact = {
  __typename?: 'BillingContact';
  email: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  atlassianAccountId?: Maybe<Scalars['String']>;
};

export type BillingContacts = {
  __typename?: 'BillingContacts';
  totalHits: Scalars['Int'];
  contacts: Array<Maybe<BillingContact>>;
};

/** The countries that can be billed for form validation */
export type BillingCountry = {
  __typename?: 'BillingCountry';
  isoCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type BillingCountryConnection = Connection & {
  __typename?: 'BillingCountryConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  nodes: Array<Maybe<BillingCountry>>;
  edges: Array<Maybe<BillingCountryEdge>>;
};

export type BillingCountryEdge = Edge & {
  __typename?: 'BillingCountryEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: BillingCountry;
};

/** The states or regions that can be billed for form validation */
export type BillingCountryState = {
  __typename?: 'BillingCountryState';
  isoCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type BillingCountryStateConnection = Connection & {
  __typename?: 'BillingCountryStateConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  nodes: Array<Maybe<BillingCountryState>>;
  edges: Array<Maybe<BillingCountryStateEdge>>;
};

export type BillingCountryStateEdge = Edge & {
  __typename?: 'BillingCountryStateEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: BillingCountryState;
};

export enum BillingFrequency {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
  OTHER = 'OTHER',
}

/** Status of the entitlement, includes CCP and HAMS statuses */
export enum BillingStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

export type BillTo = {
  __typename?: 'BillTo';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryIsoCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  stateKey?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
};

export type ChargeQuantity = {
  __typename?: 'ChargeQuantity';
  chargeElement?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
};

export type CloudProduct = {
  __typename?: 'CloudProduct';
  id?: Maybe<Scalars['ID']>;
  cloudSiteUrl?: Maybe<Scalars['String']>;
  cloudSiteId?: Maybe<Scalars['ID']>;
  billingStatus?: Maybe<BillingStatus>;
  isCloud?: Maybe<Scalars['Boolean']>;
  platform?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
};

export type CloudProductConnection = Connection & {
  __typename?: 'CloudProductConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<CloudProductEdge>>>;
  nodes?: Maybe<Array<Maybe<CloudProduct>>>;
};

export type CloudProductEdge = Edge & {
  __typename?: 'CloudProductEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<CloudProduct>;
};

export type CloudSite = {
  __typename?: 'CloudSite';
  baseProduct?: Maybe<Scalars['String']>;
  billingFrequency?: Maybe<Scalars['String']>;
  billingGroupId?: Maybe<Scalars['String']>;
  billingStatus?: Maybe<Scalars['String']>;
  bitbucketUserProfileType?: Maybe<Scalars['String']>;
  cloudSiteHostname?: Maybe<Scalars['String']>;
  cloudSiteId?: Maybe<Scalars['String']>;
  cloudSiteSen?: Maybe<Scalars['String']>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  createdDate?: Maybe<Scalars['String']>;
  customerAccountId?: Maybe<Scalars['String']>;
  customerDomain?: Maybe<Scalars['String']>;
  dataSource?: Maybe<EntitlementDataSource>;
  edition?: Maybe<Scalars['String']>;
  entitlementGroupId?: Maybe<Scalars['String']>;
  entitlementPeriods?: Maybe<Array<Maybe<EntitlementPeriod>>>;
  featureVariables?: Maybe<Scalars['JSON']>;
  firstPeriodEndDate?: Maybe<Scalars['String']>;
  firstPeriodStartDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  latestPeriodEndDate?: Maybe<Scalars['String']>;
  latestPeriodStartDate?: Maybe<Scalars['String']>;
  licenseLevel?: Maybe<Scalars['String']>;
  licensedTo?: Maybe<Scalars['String']>;
  migrationEvaluationId?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['String']>;
  parentSen?: Maybe<Scalars['String']>;
  partnerAccountId?: Maybe<Scalars['String']>;
  partnerName?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  pricingPlanId?: Maybe<Scalars['String']>;
  prioritySupport?: Maybe<Scalars['String']>;
  productCatalogId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  provisioningOverrideId?: Maybe<Scalars['Float']>;
  rangeEndDate?: Maybe<Scalars['JSON']>;
  renewalAction?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  sourceSequence?: Maybe<Scalars['Float']>;
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  transactionAccountId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unitCount?: Maybe<Scalars['String']>;
  unitLabel?: Maybe<Scalars['String']>;
  updatedDate?: Maybe<Scalars['String']>;
  vendorId?: Maybe<Scalars['String']>;
};

export type CloudSiteConnection = Connection & {
  __typename?: 'CloudSiteConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  nodes?: Maybe<Array<Maybe<CloudSite>>>;
  edges?: Maybe<Array<Maybe<CloudSiteEdge>>>;
};

export type CloudSiteEdge = Edge & {
  __typename?: 'CloudSiteEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<CloudSite>;
};

/** Address details used for billing information. */
export type CommerceAddress = {
  __typename?: 'CommerceAddress';
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type CommerceAddressConnection = Connection & {
  __typename?: 'CommerceAddressConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<CommerceAddressEdge>>>;
  nodes?: Maybe<Array<Maybe<CommerceAddress>>>;
};

export type CommerceAddressEdge = Edge & {
  __typename?: 'CommerceAddressEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: CommerceAddress;
};

/**
 * The connection model provides a standard mechanism for slicing and paginating the result set.
 *
 * See [Relay docs](https://relay.dev/graphql/connections.htm)
 */
export type Connection = {
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
};

/**
 * Common parameters when searching for a connection and paginating (either by
 * cursor or offset). Uses Hydra terminology by default.
 */
export type ConnectionSearchOptions = {
  cursor?: Maybe<Scalars['ID']>;
  sort?: Maybe<SortType>;
  offset?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type Contact = {
  __typename?: 'Contact';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  address3?: Maybe<Scalars['String']>;
  atlassianAccountId?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  countCustomerDomain?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  customerDomain?: Maybe<Scalars['String']>;
  dataSources?: Maybe<Array<Maybe<DataSource>>>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  idType?: Maybe<IdType>;
  isoCountryCode?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  partnerType?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  sourceSequence?: Maybe<Scalars['Float']>;
  sourceSystem: Scalars['String'];
  sourceSystemId: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  status?: Maybe<ContactStatus>;
  taxId?: Maybe<Scalars['String']>;
};

export type ContactConnection = Connection & {
  __typename?: 'ContactConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ContactEdge>>>;
  nodes?: Maybe<Array<Maybe<Contact>>>;
};

export type ContactEdge = Edge & {
  __typename?: 'ContactEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Contact>;
};

export enum ContactStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type ContentMeta = {
  __typename?: 'ContentMeta';
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CreditCard = PaymentMethod & {
  __typename?: 'CreditCard';
  id?: Maybe<Scalars['String']>;
  type: PaymentMethodType;
  default?: Maybe<Scalars['Boolean']>;
  card?: Maybe<CreditCardDetails>;
};

export type CreditCardDetails = {
  __typename?: 'CreditCardDetails';
  expirationMonth?: Maybe<Scalars['String']>;
  expirationYear?: Maybe<Scalars['String']>;
  last4Numbers?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
};

export enum Currency {
  USD = 'USD',
  AUD = 'AUD',
  JPY = 'JPY',
  EUR = 'EUR',
  GBP = 'GBP',
}

export type DataSource = {
  __typename?: 'DataSource';
  sourceId?: Maybe<Scalars['String']>;
  sourceName?: Maybe<Scalars['String']>;
};

/** Health of the graph by basic dependency checks */
export type DependencyHealth = {
  __typename?: 'DependencyHealth';
  key: Scalars['String'];
  label: Scalars['String'];
  successful: Scalars['Boolean'];
};

export type DirectMatch = {
  __typename?: 'DirectMatch';
  entity?: Maybe<GraphEntity>;
  identifier?: Maybe<Scalars['String']>;
  /** for child entities, also return parent type (think Entitlement <-> Add-on relationship) */
  parentEntity?: Maybe<GraphEntity>;
  /** for child entities, also return identifier type (think Entitlement <-> Add-on relationship) */
  parentIdentifier?: Maybe<Scalars['String']>;
};

export type Domain = {
  __typename?: 'Domain';
  /**
   * The account team that services and supports a  customer. Useful for support
   * teams to know who to talk to when problems arise.
   *
   * Examples: Customer Success Manager, Loyalty Advocate, Enterprise Advocate
   */
  salesforceAccountTeam?: Maybe<Array<Maybe<SalesforceAccountMember>>>;
  serverLicenses?: Maybe<ServerLicenseConnection>;
  cloudSites?: Maybe<CloudSiteConnection>;
  serviceLicenses?: Maybe<ServiceLicenseConnection>;
};

export type DomainServerLicensesArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type DomainCloudSitesArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type DomainServiceLicensesArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

/**
 * A type that is returned in list form by a connection type’s edges field is
 * considered by this spec to be an Edge Type. Edge types must be an “Object” as
 * defined in the “Type System” section of the GraphQL Specification.
 *
 * See [Relay docs](https://relay.dev/graphql/connections.htm#sec-Edges)
 */
export type Edge = {
  cursor?: Maybe<Scalars['ID']>;
};

/** Transactional billing emails sent to customers. */
export type Email = {
  __typename?: 'Email';
  subject?: Maybe<Scalars['String']>;
  to?: Maybe<Array<Maybe<EmailAddress>>>;
  from?: Maybe<Array<Maybe<EmailAddress>>>;
  date?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  html?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type EmailAddress = {
  __typename?: 'EmailAddress';
  address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type EmailConnection = Connection & {
  __typename?: 'EmailConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<EmailEdge>>>;
};

export type EmailEdge = Edge & {
  __typename?: 'EmailEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: Email;
};

export type EmailSearchParams = {
  __typename?: 'EmailSearchParams';
  term?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/**
 * Base type from which all product entitlements extend. This contains the
 * minimal amount fields that should be expected on all entitlements.
 * Any queries that return this Entitlement interface will also return any
 * types extended from Entitlement.
 */
export type Entitlement = {
  id: Scalars['ID'];
  offering?: Maybe<Offering>;
  pricingPlan?: Maybe<PricingPlan>;
  /** AKA Invoice Group Id: foreign key to invoice group used to pay for the entitlement's subscriptions. */
  billingGroupId?: Maybe<Scalars['String']>;
};

export type EntitlementDataSource = {
  __typename?: 'EntitlementDataSource';
  bitbucketAuthUser?: Maybe<Scalars['String']>;
  hamsAccount?: Maybe<Scalars['String']>;
  hamsLicense?: Maybe<Scalars['String']>;
  hipchatSubscriptions?: Maybe<Scalars['String']>;
  pakoLicense?: Maybe<Scalars['String']>;
  shopSubscriber?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  sourceTable?: Maybe<Scalars['String']>;
  sourceType?: Maybe<Scalars['String']>;
  trello?: Maybe<Scalars['String']>;
};

export type EntitlementPeriod = {
  __typename?: 'EntitlementPeriod';
  baseProduct?: Maybe<Scalars['String']>;
  billTo?: Maybe<BillTo>;
  billingFrequency?: Maybe<BillingFrequency>;
  bitbucketUserProfileType?: Maybe<Scalars['String']>;
  cloudSiteHostname?: Maybe<Scalars['String']>;
  cloudSiteId?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  customerAccountId?: Maybe<Scalars['String']>;
  customerDomain?: Maybe<Scalars['String']>;
  dataSources?: Maybe<Array<Maybe<DataSource>>>;
  edition?: Maybe<Scalars['String']>;
  entitlementId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  licenseLevel?: Maybe<Scalars['String']>;
  parentSen?: Maybe<Scalars['String']>;
  partnerAccountId?: Maybe<Scalars['String']>;
  partnerName?: Maybe<Scalars['String']>;
  periodEndDate?: Maybe<Scalars['String']>;
  periodStartDate?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  previousEntitlementPeriodId?: Maybe<Scalars['String']>;
  pricingPlanId?: Maybe<Scalars['String']>;
  productKey?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  shipTo?: Maybe<BillTo>;
  sourceId?: Maybe<Scalars['String']>;
  sourceSequence?: Maybe<Scalars['Float']>;
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
  unitCount?: Maybe<Scalars['String']>;
  unitLabel?: Maybe<Scalars['String']>;
  updatedDate?: Maybe<Scalars['String']>;
};

export type Example = {
  __typename?: 'Example';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ExampleConnection = {
  __typename?: 'ExampleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ExampleEdge>>>;
};

export type ExampleEdge = {
  __typename?: 'ExampleEdge';
  cursor: Scalars['ID'];
  node?: Maybe<Example>;
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  flagKey: Scalars['String'];
  isEnabled: Scalars['Boolean'];
};

/** Graph entity is an enumeration of the different objects that's information is then aggregated within the graph */
export enum GraphEntity {
  PERSON = 'PERSON',
  ORGANIZATION = 'ORGANIZATION',
  PARTNER_ACCOUNT = 'PARTNER_ACCOUNT',
  SUPPORT_ISSUE = 'SUPPORT_ISSUE',
  EMAIL = 'EMAIL',
  DOMAIN = 'DOMAIN',
  INVOICE = 'INVOICE',
  QUOTE = 'QUOTE',
  REFUND = 'REFUND',
  TRANSACTION_ACCOUNT = 'TRANSACTION_ACCOUNT',
  ATLASSIAN_ACCESS = 'ATLASSIAN_ACCESS',
  BITBUCKET = 'BITBUCKET',
  CLOUD_SITE = 'CLOUD_SITE',
  ENTITLEMENT = 'ENTITLEMENT',
  OPSGENIE = 'OPSGENIE',
  SERVER_LICENSE = 'SERVER_LICENSE',
  SERVICE_LICENSE = 'SERVICE_LICENSE',
  STATUSPAGE = 'STATUSPAGE',
  TRELLO = 'TRELLO',
  /** this can be an add-on, marketplace app, or right now Jira / Confluence */
  CHILD_PRODUCT = 'CHILD_PRODUCT',
}

export enum IdType {
  Email = 'Email',
  AAID = 'AAID',
}

export type Invoice = {
  __typename?: 'Invoice';
  billTo?: Maybe<InvoiceBillAndShipTo>;
  billingContactName?: Maybe<Scalars['String']>;
  billingFrequency?: Maybe<Scalars['String']>;
  billingFrequencyInterval?: Maybe<Scalars['Int']>;
  billingGroupId?: Maybe<Scalars['String']>;
  cloudSiteHostname?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  creditCardExpiryMonth?: Maybe<Scalars['String']>;
  creditCardExpiryYear?: Maybe<Scalars['String']>;
  creditCardHolderName?: Maybe<Scalars['String']>;
  creditCardMaskedNumber?: Maybe<Scalars['String']>;
  customerAccountId?: Maybe<Scalars['String']>;
  customerDomain?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
  entitlementId?: Maybe<Scalars['String']>;
  grandTotal?: Maybe<Scalars['Float']>;
  grandTotalPaymentCurrency?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  invoiceContactEmails?: Maybe<Array<Maybe<InvoiceContactEmails>>>;
  invoiceLineItems?: Maybe<Array<Maybe<InvoiceLineItems>>>;
  invoiceNumber?: Maybe<Scalars['String']>;
  itemsCount?: Maybe<Scalars['Int']>;
  itemsSubtotal?: Maybe<Scalars['Float']>;
  itemsTotal?: Maybe<Scalars['Float']>;
  itemsTotalPaymentCurrency?: Maybe<Scalars['Float']>;
  notes?: Maybe<Array<Maybe<AdditionalNotes>>>;
  orderId?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<InvoiceOrderStatus>;
  partnerAccountId?: Maybe<Scalars['String']>;
  partnerName?: Maybe<Scalars['String']>;
  paymentCurrency?: Maybe<Scalars['String']>;
  paymentMadeByEmail?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<InvoicePaymentMethod>;
  paymentTerms?: Maybe<InvoicePaymentTerms>;
  paypalAccountEmail?: Maybe<Scalars['String']>;
  previousInvoiceId?: Maybe<Scalars['String']>;
  pricingCurrency?: Maybe<Scalars['String']>;
  promotionCode?: Maybe<Scalars['String']>;
  purchaseOrderNumber?: Maybe<Scalars['String']>;
  purchaserEmail?: Maybe<Scalars['String']>;
  refunds?: Maybe<RefundConnection>;
  revisionNumber?: Maybe<Scalars['String']>;
  serviceCreditAmount?: Maybe<Scalars['Float']>;
  shipTo?: Maybe<InvoiceBillAndShipTo>;
  slaCreditApplications?: Maybe<Array<Maybe<SlaCreditApplications>>>;
  sourceId?: Maybe<Scalars['String']>;
  sourceSequence?: Maybe<Scalars['Float']>;
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
  status?: Maybe<InvoiceStatus>;
  statusReason?: Maybe<Scalars['String']>;
  taxIdentifier?: Maybe<Scalars['String']>;
  taxIdentifierType?: Maybe<Scalars['String']>;
  taxRate?: Maybe<InvoiceTaxRate>;
  taxes?: Maybe<Scalars['String']>;
  taxesPaymentCurrency?: Maybe<Scalars['Float']>;
  transactionAccountId?: Maybe<Scalars['String']>;
  updatedDate?: Maybe<Scalars['String']>;
};

export type InvoiceRefundsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortType>;
};

export type InvoiceBillAndShipTo = {
  __typename?: 'InvoiceBillAndShipTo';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryIsoCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  stateKey?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
};

export type InvoiceConnection = Connection & {
  __typename?: 'InvoiceConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  nodes?: Maybe<Array<Maybe<Invoice>>>;
  edges?: Maybe<Array<Maybe<InvoiceEdge>>>;
};

export type InvoiceContactEmails = {
  __typename?: 'InvoiceContactEmails';
  items?: Maybe<Scalars['String']>;
};

export type InvoiceDiscounts = {
  __typename?: 'InvoiceDiscounts';
  discountAmount?: Maybe<Scalars['Float']>;
  discountAmountLocal?: Maybe<Scalars['Float']>;
  discountReason?: Maybe<Scalars['String']>;
  discountType?: Maybe<Scalars['String']>;
};

export type InvoiceEdge = Edge & {
  __typename?: 'InvoiceEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Invoice>;
};

/**
 * a logical grouping of subscriptions for the purpose of creating an invoice.
 * contains the properties needed to construct an invoice.  (ship-to, subscriptions, invoice date…)
 * See more: [CCP Glossary](https://hello.atlassian.net/wiki/spaces/tintin/pages/553197746/Tintin%3A+CCP+Glossary)
 */
export type InvoiceGroup = {
  __typename?: 'InvoiceGroup';
  id?: Maybe<Scalars['ID']>;
  version?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  shipToParty?: Maybe<CommerceAddress>;
  defaultPaymentMethod?: Maybe<PaymentMethod>;
  products?: Maybe<InvoiceGroupProductConnection>;
};

/**
 * a logical grouping of subscriptions for the purpose of creating an invoice.
 * contains the properties needed to construct an invoice.  (ship-to, subscriptions, invoice date…)
 * See more: [CCP Glossary](https://hello.atlassian.net/wiki/spaces/tintin/pages/553197746/Tintin%3A+CCP+Glossary)
 */
export type InvoiceGroupProductsArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type InvoiceGroupConnection = Connection & {
  __typename?: 'InvoiceGroupConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<InvoiceGroupEdge>>;
  nodes: Array<Maybe<InvoiceGroup>>;
};

export type InvoiceGroupEdge = Edge & {
  __typename?: 'InvoiceGroupEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: InvoiceGroup;
};

export type InvoiceGroupProduct = {
  __typename?: 'InvoiceGroupProduct';
  billingFrequency?: Maybe<Scalars['String']>;
  entitlementNumber?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latestPeriodEndDate?: Maybe<Scalars['String']>;
  latestPeriodStartDate?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  baseProduct?: Maybe<Scalars['String']>;
};

export type InvoiceGroupProductConnection = Connection & {
  __typename?: 'InvoiceGroupProductConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<InvoiceGroupProductEdge>>>;
  nodes?: Maybe<Array<Maybe<InvoiceGroupProduct>>>;
};

export type InvoiceGroupProductEdge = Edge & {
  __typename?: 'InvoiceGroupProductEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: InvoiceGroupProduct;
};

export type InvoiceLineItems = {
  __typename?: 'InvoiceLineItems';
  accountName?: Maybe<Scalars['String']>;
  additionalNotes?: Maybe<Array<Maybe<AdditionalNotes>>>;
  amount?: Maybe<Scalars['String']>;
  amountPaymentCurrency?: Maybe<Scalars['Float']>;
  baseProduct?: Maybe<Scalars['String']>;
  billingType?: Maybe<Scalars['String']>;
  cloudSiteHostname?: Maybe<Scalars['String']>;
  contractModified?: Maybe<Scalars['String']>;
  dataSources?: Maybe<Array<Maybe<DataSource>>>;
  description?: Maybe<Scalars['String']>;
  discounts?: Maybe<Array<Maybe<InvoiceDiscounts>>>;
  edition?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  entitlement?: Maybe<Array<Maybe<Entitlement>>>;
  entitlementGroupId?: Maybe<Scalars['String']>;
  entitlementId?: Maybe<Scalars['String']>;
  entitlementKey?: Maybe<Scalars['String']>;
  entitlementNumber?: Maybe<Scalars['String']>;
  entitlementPeriodId?: Maybe<Scalars['String']>;
  externalNotes?: Maybe<Scalars['String']>;
  invoiceLineItemId?: Maybe<Scalars['String']>;
  listPrice?: Maybe<Scalars['Float']>;
  listPricePaymentCurrency?: Maybe<Scalars['Float']>;
  parentBaseProduct?: Maybe<Scalars['String']>;
  parentEntitlementKey?: Maybe<Scalars['String']>;
  parentProductKey?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  previousInvoiceItemId?: Maybe<Scalars['String']>;
  pricingPlanId?: Maybe<Scalars['String']>;
  productCatalogId?: Maybe<Scalars['String']>;
  productKey?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
  proratedPrice?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Int']>;
  renewalListPrice?: Maybe<Scalars['Float']>;
  saleAction?: Maybe<Scalars['String']>;
  saleType?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Float']>;
  taxAmountPaymentCurrency?: Maybe<Scalars['Float']>;
  taxExemptAmountPaymentCurrency?: Maybe<Scalars['Float']>;
  taxRate?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPaymentCurrency?: Maybe<Scalars['Float']>;
  unitCount?: Maybe<Scalars['Float']>;
  unitLabel?: Maybe<Scalars['String']>;
  upgradeCredit?: Maybe<Scalars['Float']>;
  vendorAmount?: Maybe<Scalars['Float']>;
  vendorPaymentCurrency?: Maybe<Scalars['Float']>;
  vendorId?: Maybe<Scalars['String']>;
};

export type InvoiceOrderStatus = {
  __typename?: 'InvoiceOrderStatus';
  completed?: Maybe<Scalars['Boolean']>;
  successful?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  orderReference?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
};

export enum InvoicePaymentMethod {
  NOPAYMENT = 'NOPAYMENT',
  NULL = 'NULL',
  PAID = 'PAID',
  PAIDCC = 'PAIDCC',
  PAIDONACCOUNT = 'PAIDONACCOUNT',
  PAIDPAYPAL = 'PAIDPAYPAL',
  PAID_BANK = 'PAID_BANK',
  PAID_ON_TERMS = 'PAID_ON_TERMS',
  STRIPE_CARD = 'STRIPE_CARD',
  DEFERRED = 'DEFERRED',
}

export enum InvoicePaymentTerms {
  PAY_ON_ACCOUNT = 'PAY_ON_ACCOUNT',
  PAY_CC = 'PAY_CC',
}

export enum InvoiceStatus {
  INVOICED = 'INVOICED',
  PAID = 'PAID',
  CREATED = 'CREATED',
  DECLINED = 'DECLINED',
  DELETED = 'DELETED',
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  REFUNDED = 'REFUNDED',
  RESERVED = 'RESERVED',
  UNCOLLECTIBLE = 'UNCOLLECTIBLE',
  VOID = 'VOID',
}

export type InvoiceTaxRate = {
  __typename?: 'InvoiceTaxRate';
  displayName?: Maybe<Scalars['String']>;
  isoCountryCode?: Maybe<Scalars['String']>;
  taxIdLabel?: Maybe<Scalars['String']>;
  taxType?: Maybe<Scalars['String']>;
};

export type LineItem = {
  __typename?: 'LineItem';
  accountName?: Maybe<Scalars['String']>;
  additionalNotes?: Maybe<Array<Maybe<Note>>>;
  cloudSiteHostname?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discounts?: Maybe<Array<Maybe<LineItemDiscount>>>;
  endDate?: Maybe<Scalars['String']>;
  entitlementId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  monthsValid?: Maybe<Scalars['Float']>;
  platform?: Maybe<Scalars['String']>;
  pricingPlanId?: Maybe<Scalars['String']>;
  productKey?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
  proratedPrice?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['String']>;
  saleAction?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Float']>;
  taxAmount?: Maybe<Scalars['Float']>;
  taxExemptAmount?: Maybe<Scalars['Float']>;
  taxRate?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  unitCount?: Maybe<Scalars['Float']>;
  unitLabel?: Maybe<Scalars['String']>;
  upgradeCredit?: Maybe<Scalars['Float']>;
  notes?: Maybe<Array<Maybe<Note>>>;
  dataSources?: Maybe<Array<Maybe<DataSource>>>;
  billTo?: Maybe<BillTo>;
  shipTo?: Maybe<BillTo>;
  sourceSequence?: Maybe<Scalars['String']>;
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
};

export type LineItemDiscount = {
  __typename?: 'LineItemDiscount';
  discountAmount?: Maybe<Scalars['Float']>;
  discountReason?: Maybe<Scalars['String']>;
  discountType?: Maybe<Scalars['String']>;
};

export enum Method {
  CREDIT_CARD = 'CREDIT_CARD',
  BANK = 'BANK',
  ACCOUNT = 'ACCOUNT',
  PAYPAL = 'PAYPAL',
}

export type NavigationGroup = {
  __typename?: 'NavigationGroup';
  name?: Maybe<Scalars['String']>;
  links?: Maybe<Array<Maybe<NavigationLink>>>;
};

export type NavigationItem = NavigationGroup | NavigationLink;

export type NavigationLink = {
  __typename?: 'NavigationLink';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  iconUrl?: Maybe<Scalars['String']>;
};

export type Note = {
  __typename?: 'Note';
  id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

/**
 * A combination of a product and the edition/plan.
 *
 * Examples: Confluence Free, Trello Business Class
 * See more: https://hello.atlassian.net/wiki/spaces/tintin/pages/553197746/Tintin%3A+CCP+Glossary  Offering Section
 */
export type Offering = {
  __typename?: 'Offering';
  id: Scalars['String'];
  name: Scalars['String'];
  slugs?: Maybe<Array<Maybe<Scalars['String']>>>;
  productKey?: Maybe<Scalars['String']>;
  /** Add ons eligible to be added to this offering */
  availableAddOns?: Maybe<Array<Maybe<AddOn>>>;
  /** Synthetic pricing plans eligible to be applied to this offering */
  availableSyntheticPricingPlans?: Maybe<Array<Maybe<SyntheticPricingPlan>>>;
};

export type Opportunity = {
  __typename?: 'Opportunity';
  id: Scalars['ID'];
  accountName?: Maybe<Scalars['String']>;
  sourceSequence: Scalars['String'];
  sourceSystem: Scalars['String'];
  sourceSystemId: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  opportunityId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  ownerName?: Maybe<Scalars['String']>;
  recordtypeName?: Maybe<Scalars['String']>;
  stageName?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  partnerAccountId?: Maybe<Scalars['String']>;
  reasonForPurchase?: Maybe<Scalars['String']>;
  closeDate?: Maybe<Scalars['String']>;
  saleType?: Maybe<Scalars['String']>;
  customerTechnicalContact?: Maybe<Scalars['String']>;
  customerTechnicalContactUuid?: Maybe<Scalars['String']>;
  shipTo?: Maybe<CommerceAddress>;
  billTo?: Maybe<CommerceAddress>;
  subscriptionTerm?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  partnerDiscount?: Maybe<Scalars['String']>;
  netOrderAmount?: Maybe<Scalars['String']>;
  entitlementId?: Maybe<Scalars['String']>;
  ectlSen?: Maybe<Scalars['String']>;
  cloudHostSen?: Maybe<Scalars['String']>;
  renewalInvoice?: Maybe<Scalars['String']>;
  quote?: Maybe<Scalars['String']>;
  expiryDate?: Maybe<Scalars['String']>;
  dpe?: Maybe<Scalars['String']>;
  renewed?: Maybe<Scalars['String']>;
  currencyIsoCode?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  lastmodifiedDate?: Maybe<Scalars['String']>;
  opportunityLineItems?: Maybe<Array<Maybe<OpportunityLineItem>>>;
};

export type OpportunityConnection = Connection & {
  __typename?: 'OpportunityConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<OpportunityEdge>>>;
  nodes?: Maybe<Array<Maybe<Opportunity>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type OpportunityEdge = Edge & {
  __typename?: 'OpportunityEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Opportunity>;
};

export type OpportunityLineItem = {
  __typename?: 'OpportunityLineItem';
  opportunityLineId?: Maybe<Scalars['String']>;
  inventoryProductId?: Maybe<Scalars['String']>;
  inventoryProductName?: Maybe<Scalars['String']>;
  offeringId?: Maybe<Scalars['String']>;
  pricingPlanId?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['String']>;
  listPrice?: Maybe<Scalars['String']>;
  salesPrice?: Maybe<Scalars['String']>;
  totalPrice?: Maybe<Scalars['String']>;
  priceAdjustment?: Maybe<Scalars['String']>;
  upgradeCredit?: Maybe<Scalars['String']>;
  partnerDiscount?: Maybe<Scalars['String']>;
  otherDiscount?: Maybe<Scalars['String']>;
  netOrderAmount?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['String']>;
};

export type Opsgenie = {
  __typename?: 'Opsgenie';
  id: Scalars['ID'];
  baseProduct: Scalars['String'];
  plan?: Maybe<Scalars['String']>;
  firstPeriodEndDate?: Maybe<Scalars['String']>;
  renewalAction?: Maybe<Scalars['String']>;
  billingFrequency?: Maybe<Scalars['String']>;
  latestPeriodEndDate?: Maybe<Scalars['String']>;
  latestPeriodStartDate?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  billingStatus?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
};

/**
 * An action that results in a subscription change. This can be an amendment, creation, deletion.
 *
 * Transaction Account A. amended their subscription to include a new add-on.
 */
export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  /** Human readable identifier */
  orderNumber?: Maybe<Scalars['String']>;
  /** Date the order was created, represents the sourceSequence in Hydra (date in epoch) */
  created?: Maybe<Scalars['String']>;
  orderLineItems?: Maybe<OrderLineItemConnection>;
  /** // TODO: Convert to subject to direct link to contact or system */
  contextSubject?: Maybe<Scalars['String']>;
  orderContext?: Maybe<OrderContext>;
};

export type OrderConnection = Connection & {
  __typename?: 'OrderConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  nodes: Array<Maybe<Order>>;
  edges: Array<Maybe<OrderEdge>>;
};

/** The person or system that is responsible for the action taking place */
export type OrderContext = Contact;

export type OrderEdge = Edge & {
  __typename?: 'OrderEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Order>;
};

export enum OrderItemRequestType {
  CREATION_ORDER = 'CREATION_ORDER',
  AMENDMENT_ORDER = 'AMENDMENT_ORDER',
  CANCELLATION_ORDER = 'CANCELLATION_ORDER',
  SYSTEM_CANCELLATION_ORDER = 'SYSTEM_CANCELLATION_ORDER',
  SYSTEM_AMENDMENT_ORDER = 'SYSTEM_AMENDMENT_ORDER',
  REACTIVATION_ORDER = 'REACTIVATION_ORDER',
}

/** An action that results in a subscription change. This can be an amendment, creation, deletion. */
export type OrderLineItem = {
  __typename?: 'OrderLineItem';
  lineItemId: Scalars['ID'];
  entitlementId: Scalars['ID'];
  parentEntitlementId?: Maybe<Scalars['ID']>;
  entitlementNumber?: Maybe<Scalars['String']>;
  pricingPlanId?: Maybe<Scalars['ID']>;
  status?: Maybe<OrderStatus>;
  type?: Maybe<OrderItemRequestType>;
  quantity?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  promotionCodes?: Maybe<Array<Maybe<Scalars['String']>>>;
  pricingPlan?: Maybe<PricingPlan>;
  offering?: Maybe<Offering>;
};

export type OrderLineItemConnection = Connection & {
  __typename?: 'OrderLineItemConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  nodes: Array<Maybe<OrderLineItem>>;
  edges: Array<Maybe<OrderLineItemEdge>>;
};

export type OrderLineItemEdge = Edge & {
  __typename?: 'OrderLineItemEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<OrderLineItem>;
};

export enum OrderStatus {
  FAIL = 'FAIL',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
}

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID'];
  name: Scalars['String'];
  atlassianAccess?: Maybe<AtlassianAccess>;
  products: CloudProductConnection;
  aggregatedProducts?: Maybe<Array<Maybe<AggregatedProduct>>>;
};

export type OrganizationProductsArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

/**
 * Information about pagination in a connection
 *
 * See [Relay docs](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo)
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']>;
  hasNextPage: Scalars['Boolean'];
};

/** Derive specific payment method information based on the type (Credit Card, Payment on Terms, etc). */
export type PaymentMethod = {
  id?: Maybe<Scalars['String']>;
  type: PaymentMethodType;
  default?: Maybe<Scalars['Boolean']>;
};

export type PaymentMethodConnection = Connection & {
  __typename?: 'PaymentMethodConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<PaymentMethodEdge>>>;
  nodes?: Maybe<Array<Maybe<PaymentMethod>>>;
};

export type PaymentMethodEdge = Edge & {
  __typename?: 'PaymentMethodEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: PaymentMethod;
};

export enum PaymentMethodType {
  CARD = 'CARD',
  DEFERRED = 'DEFERRED',
}

export type PaymentOnTerms = PaymentMethod & {
  __typename?: 'PaymentOnTerms';
  id?: Maybe<Scalars['String']>;
  type: PaymentMethodType;
  default?: Maybe<Scalars['Boolean']>;
  terms?: Maybe<PaymentOnTermsDetails>;
};

export type PaymentOnTermsDetails = {
  __typename?: 'PaymentOnTermsDetails';
  invoiceDueDays?: Maybe<Scalars['Int']>;
};

export enum PaymentTerms {
  PAY_CC = 'PAY_CC',
  PAY_ON_ACCOUNT = 'PAY_ON_ACCOUNT',
}

export enum Permission {
  BITBUCKET_ADMIN = 'BITBUCKET_ADMIN',
  BITBUCKET_CHANGE_PLAN = 'BITBUCKET_CHANGE_PLAN',
  CASSI_ADMIN = 'CASSI_ADMIN',
  CASSI_DISTURBED = 'CASSI_DISTURBED',
  CHANGE_RENEWAL_ACTION = 'CHANGE_RENEWAL_ACTION',
  CLOSE_ACCOUNT = 'CLOSE_ACCOUNT',
  CLOUD_SITE_DEACTIVATION = 'CLOUD_SITE_DEACTIVATION',
  CLOUD_SITE_DELETION = 'CLOUD_SITE_DELETION',
  CLOUD_SITE_PRODUCTS_DEACTIVATION = 'CLOUD_SITE_PRODUCTS_DEACTIVATION',
  CLOUD_SITE_REACTIVATION = 'CLOUD_SITE_REACTIVATION',
  CONTACT_READ = 'CONTACT_READ',
  COUPONS_READ = 'COUPONS_READ',
  COUPONS_WRITE = 'COUPONS_WRITE',
  CREDIT_READ = 'CREDIT_READ',
  CREDIT_WRITE = 'CREDIT_WRITE',
  DEAL_DESK = 'DEAL_DESK',
  EMAIL_READ = 'EMAIL_READ',
  ENTITLEMENT_READ = 'ENTITLEMENT_READ',
  EXPORT_CONTROLS_WRITE = 'EXPORT_CONTROLS_WRITE',
  EXTEND_CLOUD_TRIAL = 'EXTEND_CLOUD_TRIAL',
  FINANCE_USER = 'FINANCE_USER',
  GENERATE_LICENSE_REPORT = 'GENERATE_LICENSE_REPORT',
  IMPERSONATE_SITE_ADMIN = 'IMPERSONATE_SITE_ADMIN',
  INVOICE_READ = 'INVOICE_READ',
  MANAGE_BILLING = 'MANAGE_BILLING',
  MANAGE_EXTENDED_CLOUD_TRIAL = 'MANAGE_EXTENDED_CLOUD_TRIAL',
  OBFUSCATE_ACCOUNT = 'OBFUSCATE_ACCOUNT',
  PARTNER_ACCOUNT_READ = 'PARTNER_ACCOUNT_READ',
  PROCESS_REFUND = 'PROCESS_REFUND',
  QUOTE_READ = 'QUOTE_READ',
  REFUND_READ = 'REFUND_READ',
  RENAME_CLOUD_SITE = 'RENAME_CLOUD_SITE',
  RESEND_IDENTITY_LINKS = 'RESEND_IDENTITY_LINKS',
  STAFFID_LOGIN = 'STAFFID_LOGIN',
  TICKET_READ = 'TICKET_READ',
  UPDATE_ADD_ON_SUBSCRIPTIONS = 'UPDATE_ADD_ON_SUBSCRIPTIONS',
  USER_READ = 'USER_READ',
}

/** A container that groups together transaction-related entities for a contact/person. */
export type Person = {
  __typename?: 'Person';
  emailAddress?: Maybe<Scalars['String']>;
  transactionAccounts: TransactionAccountConnection;
  opportunities: OpportunityConnection;
};

/** A container that groups together transaction-related entities for a contact/person. */
export type PersonTransactionAccountsArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

/** A container that groups together transaction-related entities for a contact/person. */
export type PersonOpportunitiesArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

/** Applications (micro-frontends) hosted elsewhere consumed by CASSI */
export type PortalApp = {
  __typename?: 'PortalApp';
  name: Scalars['String'];
  appId: Scalars['String'];
  url: Scalars['String'];
  enabled: Scalars['Boolean'];
};

export type PreviewThumbnail = {
  __typename?: 'PreviewThumbnail';
  link?: Maybe<Scalars['String']>;
};

export type PricingPlan = {
  __typename?: 'PricingPlan';
  id: Scalars['ID'];
  type: Scalars['String'];
  billingFrequency?: Maybe<BillingFrequency>;
};

export type Promotion = {
  __typename?: 'Promotion';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  benefits?: Maybe<Array<Maybe<Benefit>>>;
  maxRedemptionsCustomer?: Maybe<Scalars['Int']>;
  maxRedemptionsPromotion?: Maybe<Scalars['Int']>;
  promotionWindow?: Maybe<PromotionWindow>;
  status?: Maybe<Scalars['String']>;
  rule?: Maybe<Scalars['String']>;
};

export type PromotionWindow = {
  __typename?: 'PromotionWindow';
  endTime?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
};

/** Basic typing for querying the Atlassian Business Graph */
export type Query = {
  __typename?: 'Query';
  /** Determines if the graph is currently running */
  up: Scalars['Boolean'];
  /** Provides insight to if a dependency is currently accessible */
  deepcheck: Array<Maybe<DependencyHealth>>;
  example: Example;
  examples?: Maybe<ExampleConnection>;
  /** get all available country information */
  availableCountries: BillingCountryConnection;
  /** get all available states for a given country's iso code */
  availableStatesForCountry: BillingCountryStateConnection;
  application?: Maybe<Application>;
  searchForDirectMatch?: Maybe<DirectMatch>;
  /** The user profile of the currently logged-in user */
  me?: Maybe<UserProfile>;
  invoice: Invoice;
  invoiceGroup: InvoiceGroup;
  quote: Quote;
  refund: Refund;
  transactionAccount: TransactionAccount;
  domain?: Maybe<Domain>;
  entitlement: Entitlement;
  cloudSite: CloudSite;
  opsgenie?: Maybe<Opsgenie>;
  statuspage: Statuspage;
  trello: Trello;
  organization?: Maybe<Organization>;
  organizationByDomain?: Maybe<Organization>;
  personByEmailAddress?: Maybe<Person>;
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryExampleArgs = {
  id?: Maybe<Scalars['ID']>;
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryAvailableStatesForCountryArgs = {
  isoCode?: Maybe<Scalars['String']>;
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryApplicationArgs = {
  id?: Maybe<Scalars['String']>;
};

/** Basic typing for querying the Atlassian Business Graph */
export type QuerySearchForDirectMatchArgs = {
  query?: Maybe<Scalars['String']>;
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryInvoiceArgs = {
  id: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryInvoiceGroupArgs = {
  id: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryQuoteArgs = {
  id: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryRefundArgs = {
  id: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryTransactionAccountArgs = {
  id: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryDomainArgs = {
  url: Scalars['String'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryEntitlementArgs = {
  id?: Maybe<Scalars['String']>;
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryCloudSiteArgs = {
  cloudSiteId: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryOpsgenieArgs = {
  id: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryStatuspageArgs = {
  id?: Maybe<Scalars['String']>;
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryTrelloArgs = {
  id: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryOrganizationByDomainArgs = {
  domain: Scalars['String'];
};

/** Basic typing for querying the Atlassian Business Graph */
export type QueryPersonByEmailAddressArgs = {
  email?: Maybe<Scalars['String']>;
};

export type Quote = {
  __typename?: 'Quote';
  billingGroupId?: Maybe<Scalars['String']>;
  billTo?: Maybe<BillTo>;
  cartUuid?: Maybe<Scalars['String']>;
  createdDate: Scalars['String'];
  dataSources?: Maybe<Array<Maybe<DataSource>>>;
  eligibleForPayOnTerms?: Maybe<Scalars['Boolean']>;
  expiryDate?: Maybe<Scalars['String']>;
  externalNotes?: Maybe<Scalars['String']>;
  grandTotal?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  itemsCount: Scalars['Float'];
  itemsSubtotal: Scalars['Float'];
  itemsTotal: Scalars['Float'];
  lineItems?: Maybe<Array<Maybe<LineItem>>>;
  notes?: Maybe<Array<Maybe<Note>>>;
  orderId?: Maybe<Scalars['String']>;
  partnerName?: Maybe<Scalars['String']>;
  paymentCurrency?: Maybe<Currency>;
  paymentTerms?: Maybe<PaymentTerms>;
  promotionCode?: Maybe<Scalars['String']>;
  purchaseOrderNumber?: Maybe<Scalars['String']>;
  revisionNumber?: Maybe<Scalars['Float']>;
  slaCreditApplications?: Maybe<Array<Maybe<QuoteSlaCreditApplication>>>;
  shipTo?: Maybe<BillTo>;
  sourceId: Scalars['String'];
  sourceSequence?: Maybe<Scalars['Float']>;
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
  status?: Maybe<QuoteStatus>;
  statusReason?: Maybe<Scalars['String']>;
  statusSetBy?: Maybe<Scalars['String']>;
  taxes: Scalars['Float'];
  taxIdentifier?: Maybe<Scalars['String']>;
  taxIdentifierType?: Maybe<Scalars['String']>;
  taxRate?: Maybe<TaxRate>;
  updatedDate?: Maybe<Scalars['String']>;
};

export type QuoteSlaCreditApplication = {
  __typename?: 'QuoteSlaCreditApplication';
  amountExTax: Scalars['Float'];
  amountIncTax: Scalars['Float'];
  creditExternalId: Scalars['String'];
  createdAt: Scalars['String'];
  currency?: Maybe<Currency>;
  currencyExchangeRate?: Maybe<Scalars['Float']>;
  entitlementId?: Maybe<Scalars['String']>;
  modifiedAt: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  taxAmount: Scalars['Float'];
  taxRate: Scalars['Float'];
};

export enum QuoteStatus {
  DELETED = 'DELETED',
  PROCESSED = 'PROCESSED',
  QUOTED = 'QUOTED',
  REVIEW_REQUIRED = 'REVIEW_REQUIRED',
  SUPERSEDED = 'SUPERSEDED',
}

export enum Reason {
  THIRTY_DAY_REFUND = 'THIRTY_DAY_REFUND',
  OUTSIDE_THIRTY_DAY_REFUND = 'OUTSIDE_THIRTY_DAY_REFUND',
  ATLASSIAN_ERROR = 'ATLASSIAN_ERROR',
  ZERO_DOLLAR_REFUND = 'ZERO_DOLLAR_REFUND',
}

export enum ReasonCode {
  REFUND_EXCHANGE_SAME_PRODUCT = 'REFUND_EXCHANGE_SAME_PRODUCT',
  REFUND_EXCHANGE_DIFFERENT_PLATFORM = 'REFUND_EXCHANGE_DIFFERENT_PLATFORM',
  REFUND_EXCHANGE_DIFFERENT_PRODUCT_SAME_PLATFORM = 'REFUND_EXCHANGE_DIFFERENT_PRODUCT_SAME_PLATFORM',
  REFUND_CLOUD_AUTO_UPGRADE_NOT_WANTED = 'REFUND_CLOUD_AUTO_UPGRADE_NOT_WANTED',
  REFUND_TAX = 'REFUND_TAX',
  REFUND_PRODUCT_DOES_NOT_WORK = 'REFUND_PRODUCT_DOES_NOT_WORK',
  REFUND_AUTO_RENEWAL_NOT_WANTED = 'REFUND_AUTO_RENEWAL_NOT_WANTED',
  REFUND_CUSTOMER_NO_LONGER_WANTS_THE_PRODUCT = 'REFUND_CUSTOMER_NO_LONGER_WANTS_THE_PRODUCT',
  REFUND_DUPLICATE_PURCHASE = 'REFUND_DUPLICATE_PURCHASE',
  REFUND_ATLASSIAN_ERROR = 'REFUND_ATLASSIAN_ERROR',
  REFUND_CHANGE_TO_MONTHLY = 'REFUND_CHANGE_TO_MONTHLY',
  REFUND_UPGRADE_NOT_WANTED = 'REFUND_UPGRADE_NOT_WANTED',
  REFUND_WRITE_OFF = 'REFUND_WRITE_OFF',
  REFUND_ORDER_FORM_PENDING_SIGNATURE = 'REFUND_ORDER_FORM_PENDING_SIGNATURE',
  REFUND_FRAUD = 'REFUND_FRAUD',
  REFUND_CUSTOMER_SERVICE_CONCESSION = 'REFUND_CUSTOMER_SERVICE_CONCESSION',
  REFUND_SERVER_TO_CLOUD = 'REFUND_SERVER_TO_CLOUD',
  OTHER = 'OTHER',
}

export type Refund = {
  __typename?: 'Refund';
  billTo?: Maybe<BillTo>;
  ccTransactionAcquirerBatch?: Maybe<Scalars['String']>;
  ccTransactionAcquirerReceipt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  creationNotes?: Maybe<Scalars['String']>;
  currency?: Maybe<Currency>;
  dataSources?: Maybe<Array<Maybe<DataSource>>>;
  financeNotes?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  invoice?: Maybe<Invoice>;
  refundItems?: Maybe<Array<Maybe<RefundItem>>>;
  method?: Maybe<Method>;
  orderDate?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  reason?: Maybe<Reason>;
  reasonCode?: Maybe<ReasonCode>;
  refundedDate?: Maybe<Scalars['String']>;
  reviewNotes?: Maybe<Scalars['String']>;
  reviewedBy?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  sourceSequence: Scalars['Float'];
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
  status?: Maybe<RefundStatus>;
  total?: Maybe<Scalars['Float']>;
  totalExTax?: Maybe<Scalars['Float']>;
  totalTax?: Maybe<Scalars['Float']>;
};

export type RefundConnection = Connection & {
  __typename?: 'RefundConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  nodes?: Maybe<Array<Maybe<Refund>>>;
  edges?: Maybe<Array<Maybe<RefundEdge>>>;
};

export type RefundEdge = Edge & {
  __typename?: 'RefundEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Refund>;
};

export type RefundItem = {
  __typename?: 'RefundItem';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  invoiceLineItemId?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
  taxableAmount: Scalars['Float'];
  taxExemptAmount: Scalars['Float'];
  taxRate: Scalars['Float'];
  total: Scalars['Float'];
  totalExTax: Scalars['Float'];
  totalTax: Scalars['Float'];
};

export enum RefundStatus {
  APPROVED = 'APPROVED',
  REQUIRES_APPROVAL = 'REQUIRES_APPROVAL',
  REQUIRES_FINANCE_ACTION = 'REQUIRES_FINANCE_ACTION',
  CC_DECLINED = 'CC_DECLINED',
  CC_FAILED = 'CC_FAILED',
  FINANCE_NOTIFIED = 'FINANCE_NOTIFIED',
  DENIED = 'DENIED',
  REFUNDED = 'REFUNDED',
  DELETED = 'DELETED',
  PROCESSING = 'PROCESSING',
}

export enum Role {
  CASSI_DEVELOPER = 'CASSI_DEVELOPER',
  COMMERCE_DEV = 'COMMERCE_DEV',
  CST_DEVELOPER = 'CST_DEVELOPER',
  CUSTOMER_ADVOCATE = 'CUSTOMER_ADVOCATE',
  ENTERPRISE_ADVOCATE = 'ENTERPRISE_ADVOCATE',
  GOVERNATOR_ADMIN = 'GOVERNATOR_ADMIN',
  LOYALTY_ADVOCATE = 'LOYALTY_ADVOCATE',
  PRODUCT_ADVOCATE = 'PRODUCT_ADVOCATE',
  SALES_OPERATIONS = 'SALES_OPERATIONS',
}

/** The Atlassian employee who provides additional support to a customer account. */
export type SalesforceAccountMember = {
  __typename?: 'SalesforceAccountMember';
  accountId?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  customerDomain?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  idType?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  slackInfo?: Maybe<SlackInfo>;
  sourceId?: Maybe<Scalars['String']>;
  sourceSequence?: Maybe<Scalars['Int']>;
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** A change to an entitlement scheduled to happen at a later time, often at the end of a billing cycle. */
export type ScheduledChanges = {
  __typename?: 'ScheduledChanges';
  /** Unix epoch time in milliseconds */
  nextChangeTimestamp?: Maybe<Scalars['Float']>;
  subscriptionScheduleAction?: Maybe<SubscriptionScheduleAction>;
  /** Updated offering */
  offering?: Maybe<Offering>;
  /** Updated pricing plan */
  pricingPlan?: Maybe<PricingPlan>;
  chargeQuantities?: Maybe<Array<Maybe<ChargeQuantity>>>;
  promotionIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ServerLicense = {
  __typename?: 'ServerLicense';
  baseProduct?: Maybe<Scalars['String']>;
  billingContactEmail?: Maybe<Scalars['String']>;
  billingFrequency?: Maybe<Scalars['String']>;
  billingStatus?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  dataSource?: Maybe<EntitlementDataSource>;
  entitlementGroupId?: Maybe<Scalars['String']>;
  firstPeriodEndDate?: Maybe<Scalars['String']>;
  firstPeriodStartDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isAddon?: Maybe<Scalars['Boolean']>;
  isCloud?: Maybe<Scalars['Boolean']>;
  latestPeriodEndDate?: Maybe<Scalars['String']>;
  latestPeriodStartDate?: Maybe<Scalars['String']>;
  licenseLevel?: Maybe<Scalars['String']>;
  maintenancePeriod?: Maybe<Scalars['Int']>;
  planType?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  pricingPlanId?: Maybe<Scalars['String']>;
  prioritySupport?: Maybe<Scalars['String']>;
  productCatalogId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  renewalAction?: Maybe<Scalars['String']>;
  sen?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  sources?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceSequence?: Maybe<Scalars['Float']>;
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unitCount?: Maybe<Scalars['String']>;
  unitLabel?: Maybe<Scalars['String']>;
  updatedDate?: Maybe<Scalars['String']>;
};

export type ServerLicenseConnection = Connection & {
  __typename?: 'ServerLicenseConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ServerLicenseEdge>>>;
  nodes?: Maybe<Array<Maybe<ServerLicense>>>;
};

export type ServerLicenseEdge = Edge & {
  __typename?: 'ServerLicenseEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<ServerLicense>;
};

export type ServiceLicense = {
  __typename?: 'ServiceLicense';
  accountOwnerEmail?: Maybe<Scalars['String']>;
  baseProduct?: Maybe<Scalars['String']>;
  billingContactEmail?: Maybe<Scalars['String']>;
  billingFrequency?: Maybe<Scalars['String']>;
  billingGroupId?: Maybe<Scalars['String']>;
  billingStatus?: Maybe<Scalars['String']>;
  bitbucketUserprofileType?: Maybe<Scalars['String']>;
  cloudSiteCustomHostname?: Maybe<Scalars['String']>;
  cloudSiteHostname?: Maybe<Scalars['String']>;
  cloudSiteId?: Maybe<Scalars['String']>;
  cloudSiteSen?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  customerAccountId?: Maybe<Scalars['String']>;
  customerDomain?: Maybe<Scalars['String']>;
  dataSource?: Maybe<EntitlementDataSource>;
  edition?: Maybe<Scalars['String']>;
  entitlementGroupId?: Maybe<Scalars['String']>;
  entitlementNumber?: Maybe<Scalars['String']>;
  firstPeriodEndDate?: Maybe<Scalars['String']>;
  firstPeriodStartDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latestPeriodEndDate?: Maybe<Scalars['String']>;
  latestPeriodStartDate?: Maybe<Scalars['String']>;
  licenseLevel?: Maybe<Scalars['String']>;
  licensedTo?: Maybe<Scalars['String']>;
  migrationEvaluationId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['String']>;
  parentSen?: Maybe<Scalars['String']>;
  partnerAccountId?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  pricingPlanId?: Maybe<Scalars['String']>;
  prioritySupport?: Maybe<Scalars['String']>;
  productCatalogId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  provisioningOverrideId?: Maybe<Scalars['String']>;
  renewalAction?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  sourceSequence?: Maybe<Scalars['Float']>;
  sourceSystem?: Maybe<Scalars['String']>;
  sourceSystemId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unitCount?: Maybe<Scalars['String']>;
  unitLabel?: Maybe<Scalars['String']>;
  updatedDate?: Maybe<Scalars['String']>;
  vendorId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type ServiceLicenseConnection = Connection & {
  __typename?: 'ServiceLicenseConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ServiceLicenseEdge>>>;
  nodes?: Maybe<Array<Maybe<ServiceLicense>>>;
};

export type ServiceLicenseEdge = Edge & {
  __typename?: 'ServiceLicenseEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<ServiceLicense>;
};

export type SiteAdmin = {
  __typename?: 'SiteAdmin';
  id: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  primaryEmail?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  lastActive?: Maybe<Scalars['String']>;
};

export type SiteAdminConnection = Connection & {
  __typename?: 'SiteAdminConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<SiteAdminEdge>>>;
  nodes?: Maybe<Array<Maybe<SiteAdmin>>>;
};

export type SiteAdminEdge = Edge & {
  __typename?: 'SiteAdminEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<SiteAdmin>;
};

/** Associated Slack account information for an Atlassian. Useful for opening a direct message or sending information to. */
export type SlackInfo = {
  __typename?: 'SlackInfo';
  slackTeamId?: Maybe<Scalars['String']>;
  slackUserId?: Maybe<Scalars['String']>;
};

export type SlaCreditApplications = {
  __typename?: 'SlaCreditApplications';
  amountExTax?: Maybe<Scalars['Float']>;
  amountIncTax?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['String']>;
  creditExternalId?: Maybe<Scalars['String']>;
  currency?: Maybe<Currency>;
  currencyExchangeRate?: Maybe<Scalars['String']>;
  modifiedAt?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  taxAmount?: Maybe<Scalars['Float']>;
  taxRate?: Maybe<Scalars['Float']>;
};

/** Direction to sort returned connection */
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

/** ElasticSearch Script for finely tuned sorts (used with Hydra) */
export type SortScript = {
  script?: Maybe<Scalars['String']>;
  returnType?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
};

/** Available sort options; defaults to Hydra terminology */
export type SortType = {
  /** Fields to sort, must be equal length to sortFieldsDirections */
  sortFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Direction to sort, must be equal length to sortFields */
  sortFieldsDirections?: Maybe<Array<Maybe<SortDirection>>>;
  sortScript?: Maybe<Array<Maybe<SortScript>>>;
};

export type Statuspage = Entitlement & {
  __typename?: 'Statuspage';
  addOns?: Maybe<AddOnConnection>;
  availableOfferings?: Maybe<Array<Maybe<Offering>>>;
  auditNotes?: Maybe<AuditNoteConnection>;
  baseProduct?: Maybe<Scalars['String']>;
  billing?: Maybe<Billing>;
  billingCycle?: Maybe<Scalars['String']>;
  billingGroupId?: Maybe<Scalars['String']>;
  billingStatus?: Maybe<Scalars['String']>;
  cloudSiteId?: Maybe<Scalars['String']>;
  cloudSiteCustomHostname?: Maybe<Scalars['String']>;
  cloudSiteHostname?: Maybe<Scalars['String']>;
  edition?: Maybe<Scalars['String']>;
  emails?: Maybe<EmailConnection>;
  entitlementNumber?: Maybe<Scalars['String']>;
  hasPendingInvoices?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  invoices: InvoiceConnection;
  latestPeriodEndDate?: Maybe<Scalars['String']>;
  latestPeriodStartDate?: Maybe<Scalars['String']>;
  licenseLevel?: Maybe<Scalars['String']>;
  offeringId?: Maybe<Scalars['String']>;
  offering?: Maybe<Offering>;
  orders?: Maybe<OrderConnection>;
  siteAdmins?: Maybe<SiteAdminConnection>;
  plan?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  pricingPlan?: Maybe<PricingPlan>;
  productId?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  renewalAction?: Maybe<Scalars['String']>;
  sourceSystem?: Maybe<Scalars['String']>;
  scheduledChanges?: Maybe<ScheduledChanges>;
  subscriptionId?: Maybe<Scalars['String']>;
  transactionAccount?: Maybe<TransactionAccount>;
  transactionAccountId?: Maybe<Scalars['String']>;
  updatePaymentMethodLink?: Maybe<Scalars['String']>;
  users?: Maybe<UserConnection>;
  version?: Maybe<Scalars['String']>;
  promotions?: Maybe<Array<Maybe<Promotion>>>;
  availablePromotions?: Maybe<Array<Maybe<Promotion>>>;
  trailPromotionDetails?: Maybe<TrailPromotionDetails>;
};

export type StatuspageAddOnsArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type StatuspageAuditNotesArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type StatuspageEmailsArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type StatuspageInvoicesArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type StatuspageOrdersArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type StatuspageUsersArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export enum SubscriptionScheduleAction {
  UPDATE = 'UPDATE',
  CANCEL = 'CANCEL',
}

/** Synthetic pricing plans may exist on offerings to provide discounts based on the customer (academic, open source, etc) */
export type SyntheticPricingPlan = {
  __typename?: 'SyntheticPricingPlan';
  type: Scalars['String'];
  status: Scalars['String'];
  priceExpression: Scalars['String'];
};

export type TaxRate = {
  __typename?: 'TaxRate';
  displayName?: Maybe<Scalars['String']>;
  isoCountryCode?: Maybe<Scalars['String']>;
  taxIdLabel?: Maybe<Scalars['String']>;
  taxType?: Maybe<Scalars['String']>;
};

export type TrailPromotionDetails = {
  __typename?: 'TrailPromotionDetails';
  totalTrialCount?: Maybe<Scalars['Int']>;
  totalTrailDays?: Maybe<Scalars['Int']>;
};

/**
 * A container that groups together transaction-related entities. It is aimed at
 * helping a purchasing person (a Billing Admin) organize their transactions with
 * Atlassian. See more: [CCP Glossary](https://hello.atlassian.net/wiki/spaces/tintin/pages/553197746/Tintin%3A+CCP+Glossary)
 */
export type TransactionAccount = {
  __typename?: 'TransactionAccount';
  id: Scalars['ID'];
  billToParty?: Maybe<CommerceAddress>;
  displayName?: Maybe<Scalars['String']>;
  partnerLevel?: Maybe<Scalars['String']>;
  defaultPaymentMethod?: Maybe<PaymentMethod>;
  billingAdmins?: Maybe<BillingAdminConnection>;
  transactionAccountNumber?: Maybe<Scalars['String']>;
  availableInvoiceGroups?: Maybe<InvoiceGroupConnection>;
  availableShipToParties?: Maybe<CommerceAddressConnection>;
  availablePaymentMethods?: Maybe<PaymentMethodConnection>;
  isPartner?: Maybe<Scalars['Boolean']>;
};

/**
 * A container that groups together transaction-related entities. It is aimed at
 * helping a purchasing person (a Billing Admin) organize their transactions with
 * Atlassian. See more: [CCP Glossary](https://hello.atlassian.net/wiki/spaces/tintin/pages/553197746/Tintin%3A+CCP+Glossary)
 */
export type TransactionAccountBillingAdminsArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type TransactionAccountConnection = Connection & {
  __typename?: 'TransactionAccountConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<TransactionAccountEdge>>>;
  nodes?: Maybe<Array<Maybe<TransactionAccount>>>;
};

export type TransactionAccountEdge = Edge & {
  __typename?: 'TransactionAccountEdge';
  cursor?: Maybe<Scalars['ID']>;
  node: TransactionAccount;
};

export type Trello = Entitlement & {
  __typename?: 'Trello';
  trFindLink: Scalars['String'];
  id: Scalars['ID'];
  baseProduct: Scalars['String'];
  plan?: Maybe<Scalars['String']>;
  firstPeriodEndDate?: Maybe<Scalars['String']>;
  renewalAction?: Maybe<Scalars['String']>;
  billingFrequency?: Maybe<Scalars['String']>;
  latestPeriodEndDate?: Maybe<Scalars['String']>;
  latestPeriodStartDate?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  offering?: Maybe<Offering>;
  pricingPlan?: Maybe<PricingPlan>;
  billingStatus?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  emails: EmailConnection;
  contacts: ContactConnection;
  billingGroupId?: Maybe<Scalars['String']>;
};

export type TrelloEmailsArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type TrelloContactsArgs = {
  searchOptions?: Maybe<ConnectionSearchOptions>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  primaryEmail?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  lastActive?: Maybe<Scalars['String']>;
};

export type UserConnection = Connection & {
  __typename?: 'UserConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  nodes?: Maybe<Array<Maybe<User>>>;
};

export type UserEdge = Edge & {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<User>;
};

/** security profile of the logged in user */
export type UserProfile = {
  __typename?: 'UserProfile';
  userId: Scalars['String'];
  atlassianAccountId: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  hasValidBitbucketLink: Scalars['Boolean'];
  roles: Array<Maybe<Role>>;
  permissions: Array<Maybe<Permission>>;
  featureFlags: Scalars['JSON'];
  xsrfToken?: Maybe<Scalars['String']>;
};

export enum UserRole {
  USER = 'USER',
  SITE_ADMIN = 'SITE_ADMIN',
}

export type FetchInvoiceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FetchInvoiceQuery = { __typename?: 'Query' } & {
  invoice: { __typename?: 'Invoice' } & Pick<
    Invoice,
    | 'id'
    | 'invoiceNumber'
    | 'dueDate'
    | 'creditCardExpiryYear'
    | 'creditCardExpiryMonth'
    | 'creditCardHolderName'
    | 'creditCardMaskedNumber'
    | 'billingContactName'
    | 'grandTotal'
    | 'itemsTotal'
    | 'itemsSubtotal'
    | 'taxes'
    | 'transactionAccountId'
    | 'status'
    | 'createdDate'
    | 'partnerAccountId'
    | 'partnerName'
    | 'paymentMethod'
    | 'paymentCurrency'
    | 'paypalAccountEmail'
    | 'sourceSystem'
  > & {
      billTo?: Maybe<
        { __typename?: 'InvoiceBillAndShipTo' } & Pick<
          InvoiceBillAndShipTo,
          | 'firstName'
          | 'lastName'
          | 'address1'
          | 'address2'
          | 'email'
          | 'phone'
          | 'postalCode'
          | 'companyName'
          | 'state'
          | 'country'
          | 'city'
        >
      >;
      shipTo?: Maybe<
        { __typename?: 'InvoiceBillAndShipTo' } & Pick<
          InvoiceBillAndShipTo,
          | 'firstName'
          | 'lastName'
          | 'address1'
          | 'address2'
          | 'email'
          | 'phone'
          | 'postalCode'
          | 'companyName'
          | 'state'
          | 'country'
          | 'city'
        >
      >;
    };
};

export type FetchDirectMatchForInvoiceQueryVariables = Exact<{
  query?: Maybe<Scalars['String']>;
}>;

export type FetchDirectMatchForInvoiceQuery = { __typename?: 'Query' } & {
  searchForDirectMatch?: Maybe<
    { __typename?: 'DirectMatch' } & Pick<DirectMatch, 'entity'>
  >;
};
