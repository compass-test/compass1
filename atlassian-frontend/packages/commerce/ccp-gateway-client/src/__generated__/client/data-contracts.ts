/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ARNotificationDto {
  entitlementId?: string;
  eventId?: string;
  metadata?: Record<string, string>;
  type: "INVOICE_UNCOLLECTIBLE";
}

export interface AccountModificationDto {
  invoiceGroupId?: string;
}

export interface AdhocInvoice {
  id?: string;
  stripeInvoice?: string;
}

export interface AdhocInvoiceCreationInput {
  invoiceGroup: string;
}

/**
 * AdminUpdatePromotionRequest
 */
export interface AdminUpdatePromotionDetailsRequest {
  /** valid applicationReason or null */
  applicationReason?: ApplicationReasonRequestDto;
  benefits: (DiscountDto | OverRideDto)[];

  /** valid eligibilityRules or null */
  eligibilityRules?: EligibilityRuleDto;

  /** Time should be in epoch millis */
  eligiblePromotionWindow: EligiblePromotionWindowRequest;

  /** valid metadata or null */
  metadata?: Record<string, string | null>;
  status?:
    | "DRAFTED"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED"
    | "WITHDRAWN"
    | "INACTIVE";
  title: string;
  type:
    | "TRIAL_EXTENSION"
    | "LIST_PRICE"
    | "LOYALTY_DISCOUNT"
    | "LIST_PRICE_ADJUSTMENT"
    | "PROMO_CODE"
    | "DISCRETIONARY_DISCOUNT"
    | "PARTNER_DISCOUNT";

  /** @format int32 */
  version?: number;
}

export interface AllDetailsForProcessingInfoDto {
  accountModification?: AccountModificationDto;
  entitlement?: OrderEntitlementRefDto;
  saleTransitionDetails?: SaleTransitionDetailsDto;
  status?: "PROCESSING" | "SUCCESS" | "FAIL";
  transitionTime?: "IMMEDIATE" | "NEXT_CYCLE" | "SCHEDULED";
}

export interface AllDetailsOrderItemResponseDto {
  /** @format int64 */
  backdateTimestamp?: number;

  /** @format int64 */
  billingAnchorTime?: number;

  /** @format int64 */
  createdDate?: number;
  invoiceGroupId?: string;
  metadata?: Record<string, string>;
  offeringId?: string;
  optedUsageOptions?: OptedUsageOptionDto;
  orderId?: string;
  orderItemId?: string;

  /** points to orderItemId which is executed in SYSTEM_ORDER */
  originalOrderItemId?: string;
  parentEntitlementId?: string;
  processingInfo?: AllDetailsForProcessingInfoDto;
  promotionIds?: string[];
  promotions?: PromotionDto[];
  rewindToOrderItemId?: string;
  transactionAccountId?: string;
  type?:
    | "CREATION_ORDER"
    | "AMENDMENT_ORDER"
    | "CANCELLATION_ORDER"
    | "SYSTEM_CANCELLATION_ORDER"
    | "SYSTEM_AMENDMENT_ORDER"
    | "REACTIVATION_ORDER"
    | "ACCOUNT_MODIFICATION_ORDER"
    | "REWIND_ORDER";
}

export type AndRuleConditionDto = RuleConditionDto & {
  eligibleConditions?: EligibleConditionDto[],
};

export interface ApiError {
  errorDetails?: ErrorDetails;
  errorKey?:
    | "RESOURCE_NOT_MODIFIED"
    | "BAD_REQUEST"
    | "REQUEST_VALIDATION_ERROR"
    | "PAYMENT_REQUIRED"
    | "RESOURCE_ACCESS_FORBIDDEN"
    | "RESOURCE_NOT_FOUND"
    | "RESOURCE_VERSION_NOT_MATCHED"
    | "CONFLICT"
    | "INTERNAL_SERVER_ERROR"
    | "SERVICE_UNAVAILABLE"
    | "NOT_IMPLEMENTED"
    | "TOO_MANY_REQUESTS";
}

export interface ApiGatewayErrorResponse {
  error?: ErrorCode[];
  message?: string;
  path?: string;
  timestamp?: string;
}

/**
 * application Reason is null for override promotions
 */
export interface ApplicableApplicationReasonDto {
  id?: string;
}

export interface ApplicableBenefitDto {
  duration?: "FOREVER" | "ONCE" | "REPEATING";

  /**
   * iterations is required only for REPEATING Duration
   * @format int32
   */
  iterations?: number | null;

  /**
   * Value needs to be whole number
   * @format float
   */
  value?: number;
}

/**
 * valid custom value params or null
 */
export interface ApplicableCustomisedValueDto {
  /** application Reason is null for override promotions */
  applicationReason?: ApplicableApplicationReasonDto;
  benefits?: ApplicableBenefitDto[];
}

/**
 * valid filterParams or null
 */
export interface ApplicablePromotionFiltersDto {
  /** valid currency or null */
  currency?: "USD" | null;

  /** valid cycleInterval or null */
  cycleInterval?: "DAY" | "WEEK" | "MONTH" | "YEAR" | null;

  /** valid partnerTier or null */
  partnerTier?: "SILVER" | "PLATINUM" | "GOLD" | "ACCESS" | null;

  /** valid partnerType or null */
  partnerType?:
    | "SOLUTION_PARTNER"
    | "GLOBAL_ALLIANCE_PARTNER"
    | "CORPORATE_RESELLER"
    | "AGGREGATOR"
    | null;

  /** valid pricingType or null */
  pricingType?: "FREE" | "LIMITED_FREE" | "PAID" | null;

  /** valid products or null */
  products?: "STATUSPAGE"[] | null;

  /** valid saleTransitionType or null */
  saleTransitionType?: "NEW" | "UPGRADE" | "DOWNGRADE" | "RENEWAL" | null;

  /**
   * valid unit or null
   * @format int32
   */
  unit?: number | null;
}

/**
 * GetApplicablePromotion
 */
export interface ApplicablePromotionRequestV2 {
  /** valid filterParams or null */
  filterParams?: ApplicablePromotionFiltersDto;
  promotions: PromotionDefinitionDto[];
}

export interface ApplicablePromotionResponse {
  /** valid applicable promotion set or empty */
  applicablePromotions?: string[];

  /** valid not applicable promotion set or empty */
  notApplicablePromotions?: string[];

  /** valid not applicable promotion map with error or empty */
  notApplicablePromotionsWithReason?: Record<
    string,
    NotApplicablePromotionResponse
  >;

  /** valid not found promotion set or empty */
  notFoundPromotions?: string[];
}

/**
 * application context can be null as it has default value
 */
export interface ApplicationContext {
  /** application Type has default FRESH_PROMO value */
  applicationType?: "FRESH_PROMO" | "CONTINUE_PROMO" | null;
}

/**
 * application reason object for a promotion
 */
export interface ApplicationReason {
  /** application reason id for a promotion */
  id: string | null;
}

export interface ApplicationReasonDto {
  id?: string;
}

/**
 * valid applicationReason or null
 */
export interface ApplicationReasonRequestDto {
  /** Valid customisable application reason or null */
  customisable?: CustomisableApplicationReasonRequestDto;

  /** Valid id required for other promotion type except TRIAL_EXTENSION */
  id?: string | null;
}

/**
 * valid applicationReason or null
 */
export interface ApplicationReasonResponseDto {
  /** valid customisable application reason or null */
  customisable?: CustomisableApplicationReasonResponseDto;
  id?: string;
  readableName?: string;
}

export interface ApplicationReasonResponseSetLimiterDto {
  anyOf?: ApplicationReason[];
  type: "RANGE" | "SET";
}

/**
 * GetAvailablePromotion
 */
export interface AvailablePromotionRequest {
  /** valid currency or null */
  currency?: "USD" | null;

  /** valid cycleInterval or null */
  cycleInterval?: "DAY" | "WEEK" | "MONTH" | "YEAR" | null;

  /** valid partnerTier or null */
  partnerTier?: "SILVER" | "PLATINUM" | "GOLD" | "ACCESS" | null;

  /** valid partnerType or null */
  partnerType?:
    | "SOLUTION_PARTNER"
    | "GLOBAL_ALLIANCE_PARTNER"
    | "CORPORATE_RESELLER"
    | "AGGREGATOR"
    | null;

  /** valid pricingType or null */
  pricingType?: "FREE" | "LIMITED_FREE" | "PAID" | null;

  /** valid products or null */
  products?: "STATUSPAGE"[] | null;

  /** valid saleTransitionType or null */
  saleTransitionType?: "NEW" | "UPGRADE" | "DOWNGRADE" | "RENEWAL" | null;

  /** valid promotion status or null */
  status?:
    | (
        | "DRAFTED"
        | "ACTIVE"
        | "EXPIRED"
        | "CANCELLED"
        | "WITHDRAWN"
        | "INACTIVE"
      )[]
    | null;

  /**
   * valid unit or null
   * @format int32
   */
  unit?: number | null;
}

export interface AvailablePromotionResponse {
  availablePromotion?: Record<string, string[]>;
}

export type BaseResponse = object;

/**
 * benefits list for a promotion
 */
export interface Benefit {
  /** duration, the promotion to be applied */
  duration?: "FOREVER" | "ONCE" | "REPEATING" | null;

  /**
   * the number of iterations to be applied
   * @format int32
   */
  iterations?: number | null;

  /**
   * percent discount of the promotion
   * @format float
   */
  value?: number | null;
}

export interface BenefitDto {
  benefitType: "DISCOUNT" | "OVERRIDE";
}

export interface BillAdjustmentDto {
  /** @format int64 */
  amount?: number;

  /** @format double */
  percent?: number;
  promotionId?: string;
  reasonCode?: string;
  type?: string;
}

export interface BillEstimateItemResponseDto {
  adjustments?: BillAdjustmentDto[];
  chargeQuantity?: ChargeQuantityDto;
  offeringId?: string;
  period?: BillPeriodDto;
  pricingPlanId?: string;

  /** @format int64 */
  subtotal?: number;

  /** @format int64 */
  total?: number;
}

export interface BillPeriodDto {
  /** @format int64 */
  end?: number;

  /** @format int64 */
  start?: number;
}

export interface BillToParty {
  name: string;
  postalAddress: PostalAddress;

  /** If the BillTo is not a legal entity the tax ID should be empty */
  taxId?: string | null;
}

export interface BillingClockRequest {
  /** @format int64 */
  frozenTime?: number;
}

export interface BillingClockResponseDto {
  /** @format int64 */
  frozenTime?: number;
  id?: string;
  status?: string;
}

/**
 * Boolean query for and/or like conditions
 */
export interface BooleanQuery {
  filter?: SingleQuery[];

  /** @format int32 */
  minimum_should_match?: number;
  must?: SingleQuery[];
  must_not?: SingleQuery[];
  should?: SingleQuery[];
}

export interface BulkGetOrderResponseDto {
  nextId?: string;
  values?: OrderGetResponseDto[];
}

export interface BulkSubscriptionResponseDto {
  /** internal data present or null */
  _ccpInternal?: CcpInternalResponseDto;

  /**
   * valid billingAnchorTimestamp or null
   * @format int64
   */
  billingAnchorTimestamp?: number | null;

  /** cancelAtTheEndOfPeriod */
  cancelAtTheEndOfPeriod?: boolean | null;

  /** valid chargeQuantities with pricingPlanId or null */
  chargeQuantities?: ChargeQuantity[] | null;

  /**
   * valid createdTimestamp or null
   * @format int64
   */
  createdTimestamp?: number | null;

  /**
   * valid currentBillingEndTimestamp or null
   * @format int64
   */
  currentBillingEndTimestamp?: number | null;

  /**
   * valid currentBillingStartTimestamp or null
   * @format int64
   */
  currentBillingStartTimestamp?: number | null;

  /**
   * valid currentListPrice or null
   * @format int64
   */
  currentListPrice?: number | null;

  /**
   * valid endTimestamp or null
   * @format int64
   */
  endTimestamp?: number | null;
  entitlementId?: string;
  id?: string;
  invoiceGroupId?: string;

  /** valid invoiceImmediately or null */
  invoiceImmediately?: boolean | null;
  lastPaidOfferingId?: string;

  /**
   * valid nextBillingTimestamp or null
   * @format int64
   */
  nextBillingTimestamp?: number | null;
  offeringId?: string;
  orderItemId?: string;

  /**
   * valid previousListPrice or null
   * @format int64
   */
  previousListPrice?: number | null;

  /** valid pricingPlanId with chargeQuantities or null */
  pricingPlanId?: string | null;

  /** valid promotionIds or null */
  promotionIds?: (string | null)[];

  /** a list of promotions applied to the subscription */
  promotionInstances?: PromotionInstance[] | null;

  /** subscription schedule or null */
  schedule?: BulkSubscriptionScheduleResponseDto;

  /**
   * valid startTimestamp or null
   * @format int64
   */
  startTimestamp?: number | null;
  status?: "PROCESSING" | "ACTIVE" | "CANCELLED";
  transactionAccountId?: string;

  /**
   * valid trialLengthDays or null
   * @format int64
   */
  trialLengthDays?: number | null;
  versionInfo?: string;
}

/**
 * subscription schedule or null
 */
export interface BulkSubscriptionScheduleResponseDto {
  chargeQuantities?: ChargeQuantity[];
  latestInvoice?: string;
  offeringId?: string;
  pricingPlanId?: string;
  promotionIds?: string[];

  /** a list of promotions applied to the subscription */
  promotionInstances?: PromotionInstance[] | null;

  /** @format int64 */
  startDate?: number;
  systemOrderId?: string;
}

export interface CardDetails {
  brand?: string;
  country?: string;

  /** @format int64 */
  expMonth: number;

  /** @format int64 */
  expYear: number;
  funding: string;
  last4: string;
}

/**
 * internal data present or null
 */
export interface CcpInternalResponseDto {
  /** valid stripeScheduleId or null */
  stripeScheduleId?: string | null;

  /** valid stripeSubscriptionId or null */
  stripeSubscriptionId?: string | null;
}

/**
 * valid chargeQuantities with pricingPlanId or null
 */
export interface ChargeQuantity {
  chargeElement: string;

  /** @format int64 */
  lastUpdatedAt?: number;

  /** @format int64 */
  quantity: number;
}

export interface ChargeQuantityDto {
  chargeElement: string;

  /**
   * @format int32
   * @min 0
   */
  quantity?: number;
}

export interface ChargingDetailsDto {
  chargeQuantities?: ChargeQuantityDto[];

  /** Blank/Empty String will be treated as null */
  pricingPlanId?: string;
}

export interface Context {
  authMechanism?: string;
  clientAsapIssuer?: string;
  initiator?: string;
  subject?: string;
  subjectType?: string;
}

export interface CountQueryRequest {
  /** CCP primitive you want to search for */
  class: string;

  /** Search payload containing search query */
  payload: Payload;
}

/**
 * CreateCouponRequest
 */
export interface CreateCouponRequest {
  /** @pattern [a-zA-Z0-9]* */
  code: string;
}

export interface CreateEntitlementRequest {
  enableAbuseProneFeatures?: boolean;

  /** valid entitlement id or null */
  entitlementId?: string | null;

  /** feature override map (nullable field) */
  featureOverrides?: Record<string, string | null>;

  /** feature variables map (nullable field) */
  featureVariables?: Record<string, string | null>;

  /** metadata (nullable field) */
  metadata?: Record<string, string | null>;
  offeringKey: string;
  order?: Order;

  /** valid entitlement id or null */
  parentId?: string | null;

  /** valid subscription id or null */
  subscriptionId?: string | null;
  transactionAccountId?: string;
}

export interface CreateInvoiceGroupInput {
  currency: "USD";

  /** if not specified, it will use the default payment-method for the currency */
  defaultPaymentMethod?: string | null;
  memo?: string | null;

  /** An identifier that would help customers/partners segregate invoices. */
  name: string;
  purchaseOrder?: PurchaseOrderInput;

  /** List of recipient email addresses */
  recipients?: string[];

  /** Ship-to-party id. if not specified, it will be the same as the bill-to party */
  shipToParty?: string | null;
}

/**
 * CreatePromotionRequestV2
 */
export interface CreatePromotionRequestV2 {
  /** valid applicationReason or null */
  applicationReason?: ApplicationReasonRequestDto;
  benefits: (DiscountDto | OverRideDto)[];

  /** valid eligibilityRules or null */
  eligibilityRules?: EligibilityRuleDto;

  /** Time should be in epoch millis */
  eligiblePromotionWindow: EligiblePromotionWindowRequest;

  /** valid metadata or null */
  metadata?: Record<string, string | null>;

  /** valid promotionId or null */
  promotionId?: string | null;

  /** valid promotion status or null */
  status?:
    | "DRAFTED"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED"
    | "WITHDRAWN"
    | "INACTIVE"
    | null;
  title: string;
  type:
    | "TRIAL_EXTENSION"
    | "LIST_PRICE"
    | "LOYALTY_DISCOUNT"
    | "LIST_PRICE_ADJUSTMENT"
    | "PROMO_CODE"
    | "DISCRETIONARY_DISCOUNT"
    | "PARTNER_DISCOUNT";
}

export interface CreatePromotionResponseV2 {
  promotionId?: string;
  status?:
    | "DRAFTED"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED"
    | "WITHDRAWN"
    | "INACTIVE";
}

export type CreditCard = PaymentMethodDto & { card?: CardDetails };

export interface CreditNoteDto {
  /** The acquirer reference number which is used for tracking a refund */
  arn?: string | null;

  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  createdAt: number;
  id: string;
  invoice: string;

  /** Only present in full-item-refund credit note */
  items?: CreditNoteItemDto[];
  memo: string;
  metadata?: Record<string, string>;
  number: string;
  purchaseOrderNumber?: string;
  reason:
    | "refund_wrong_order_repurchase"
    | "refund_cancelled_purchase"
    | "refund_tax"
    | "refund_atlassian_error"
    | "refund_order_form_pending_signature"
    | "refund_fraud"
    | "refund_customer_service_concession"
    | "refund_product_eol_or_ma"
    | "refund_partial_adjustment"
    | "refund_write_off"
    | "covid_19"
    | "refund_cb0_30"
    | "refund_cb31_90"
    | "refund_for_rewind"
    | "duplicate"
    | "fraudulent"
    | "order_change"
    | "product_unsatisfactory"
    | "tax_only_refund";

  /** The id of the recharge invoice that will be produced on a tax-only-refund credit note */
  rechargeInvoiceId?: string | null;
  refundId?: string | null;

  /** PENDING when saved, OPEN when sent to stripe, PAID when refund sent to payment method */
  status: "PENDING" | "OPEN" | "PAID" | "FAILED";
  type: "full-item-refund" | "tax-only-refund";
}

export interface CreditNoteInput {
  invoice: string;

  /** Only included in full-item-refund credit note, must be empty for tax-only-refund */
  items?: CreditNoteItemInput[];
  memo: string;
  metadata?: Record<string, string>;
  reason:
    | "refund_wrong_order_repurchase"
    | "refund_cancelled_purchase"
    | "refund_tax"
    | "refund_atlassian_error"
    | "refund_order_form_pending_signature"
    | "refund_fraud"
    | "refund_customer_service_concession"
    | "refund_product_eol_or_ma"
    | "refund_partial_adjustment"
    | "refund_write_off"
    | "covid_19"
    | "refund_cb0_30"
    | "refund_cb31_90"
    | "refund_for_rewind"
    | "duplicate"
    | "fraudulent"
    | "order_change"
    | "product_unsatisfactory"
    | "tax_only_refund";
  type: "full-item-refund" | "tax-only-refund";
}

export interface CreditNoteItem {
  entitlementId?: string;
  id?: string;
  invoiceItems?: string[];
  subtotal?: number;
  tax?: number;
  taxPercent?: number;
  total?: number;
}

/**
 * Only present in full-item-refund credit note
 */
export interface CreditNoteItemDto {
  entitlementId?: string;
}

/**
 * Only included in full-item-refund credit note, must be empty for tax-only-refund
 */
export interface CreditNoteItemInput {
  entitlementId: string;
}

export interface CurrencyEntry {
  currency?: "USD";
  customerBalance?: number;
  defaultPaymentMethod?: string;
  stripeCustomer?: string;
}

export interface CustomPromotionValueDto {
  applicationReason?: ApplicationReasonDto;
  benefits?: PromotionBenefitDto[];
}

/**
 * Valid customisable application reason or null
 */
export interface CustomisableApplicationReasonRequestDto {
  id?: StringSetLimiterDto;
}

/**
 * valid customisable application reason or null
 */
export interface CustomisableApplicationReasonResponseDto {
  id?: ApplicationReasonResponseSetLimiterDto;
}

/**
 * valid customisedValues or null
 */
export interface CustomisedValues {
  /** application reason object for a promotion */
  applicationReason?: ApplicationReason;

  /** benefits list for a promotion */
  benefits: Benefit[];
}

export interface CycleInput {
  /** @format int32 */
  count?: number;
  interval?: "DAY" | "WEEK" | "MONTH" | "YEAR";

  /** Name of the primary cycle. Should be one of MONTHLY or ANNUAL */
  name: string;
}

export interface CycleResponse {
  /** @format int32 */
  count?: number;
  interval: "DAY" | "WEEK" | "MONTH" | "YEAR";
  name: string;
}

export interface DecimalLimiterDto {
  type: "RANGE" | "SET";
}

export type DecimalRangeLimiterDto = DecimalLimiterDto & {
  lowerBound?: number | null,
  upperBound?: number | null,
};

export type DecimalSetLimiterDto = DecimalLimiterDto & { anyOf?: number[] };

export interface DefaultPricingPlanResponse {
  currency: "USD" | "JPY";
  cycle: CycleResponse;
  key: string;
  type: string;
}

export type Deferred = PaymentMethodDto & { terms?: Terms };

export type DeferredInput = PaymentMethodInput & { terms?: Terms };

export interface DependsOnOfferingInput {
  keys: string[];
}

export type DiscountDto = BenefitDto & {
  customisable?: PromotionBenefitCustomisableDto,
  duration?: "FOREVER" | "ONCE" | "REPEATING",
  iterations?: number | null,
  subBenefitType?: "PERCENTAGE",
  value?: number,
};

export interface DunningStatus {
  attempt?: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";

  /** @format int32 */
  attemptCount?: number;
  declineCode?: string;
  errorCode?: string;
  message?: string;

  /** @format date-time */
  nextPaymentAttemptDate?: string;

  /** @format date-time */
  updatedAt?: string;
}

/**
 * valid eligibilityRules or null
 */
export interface EligibilityRuleDto {
  ruleCondition: AndRuleConditionDto | OrRuleConditionDto;
}

export interface EligibleConditionDto {
  /** valid currency set or  null */
  currency?: "USD"[] | null;

  /** valid cycleInterval set or  null */
  cycleInterval?: ("DAY" | "WEEK" | "MONTH" | "YEAR")[] | null;

  /** valid partnerTier set or  null */
  partnerTier?: ("SILVER" | "PLATINUM" | "GOLD" | "ACCESS")[] | null;

  /** valid partnerType set or  null */
  partnerType?:
    | (
        | "SOLUTION_PARTNER"
        | "GLOBAL_ALLIANCE_PARTNER"
        | "CORPORATE_RESELLER"
        | "AGGREGATOR"
      )[]
    | null;

  /** valid pricingType set or  null */
  pricingType?: ("FREE" | "LIMITED_FREE" | "PAID")[] | null;

  /** valid productKey set or  null */
  productKey?: string[] | null;

  /** valid products set or  null */
  products?: "STATUSPAGE"[] | null;
  ruleCondition?: RuleConditionDto;

  /** valid saleTransitionType set or  null */
  saleTransitionType?: ("NEW" | "UPGRADE" | "DOWNGRADE" | "RENEWAL")[] | null;

  /** valid unit or  null */
  unit?: IntegerComparatorDto;
}

/**
 * Time should be in epoch millis
 */
export interface EligiblePromotionWindowRequest {
  /**
   * valid endTime or null
   * @format int64
   */
  endTime?: number | null;

  /** @format int64 */
  startTime: number;
}

/**
 * Time is in epoch millis
 */
export interface EligiblePromotionWindowResponse {
  /** @format int64 */
  endTime?: number;

  /** @format int64 */
  startTime?: number;
}

export interface EntitlementDetails {
  changeReason?: string;

  /** list of children ids (nullable) */
  childrenIds?: (string | null)[];
  context?: Context;

  /** @format int64 */
  createdAt?: number;
  enableAbuseProneFeatures?: boolean;
  entitlementId?: string;
  entitlementTemplate?: EntitlementTemplate;

  /** feature override map (nullable field) */
  featureOverrides?: Record<string, string | null>;

  /** feature variables map (nullable field) */
  featureVariables?: Record<string, string | null>;

  /** metadata (nullable field) */
  metadata?: Record<string, string | null>;
  offeringKey?: string;
  order?: Order;
  parentEntitlementId?: string | null;
  parentId?: string | null;
  slug?: string;
  status?: "ACTIVE" | "INACTIVE";
  subscription?: SubscriptionInEntitlementDetails;
  transactionAccountId?: string;

  /** @format int64 */
  updatedAt?: number;

  /** @format int32 */
  version?: number;
}

export interface EntitlementErrorResponse {
  code?: string;
  error?: string;
  message?: string;
  path?: string;

  /** @format int32 */
  status?: number;
  timestamp?: string;
}

export interface EntitlementHistoryDto {
  /** @format int32 */
  currentOfferingLevel?: number;

  /** @format int64 */
  glpForCurrentPlan?: number;

  /** @format int64 */
  glpForLastPaidPlan?: number;

  /** @format int32 */
  lastOfferingLevel?: number;
}

export interface EntitlementResponse {
  changeReason?: string;

  /** list of children ids (nullable) */
  childrenIds?: (string | null)[];
  context?: Context;

  /** @format int64 */
  createdAt?: number;
  enableAbuseProneFeatures?: boolean;

  /** valid entitlement id or null */
  entitlementId?: string | null;
  entitlementTemplate?: EntitlementTemplate;

  /** feature override map (nullable field) */
  featureOverrides?: Record<string, string | null>;

  /** feature variables map (nullable field) */
  featureVariables?: Record<string, string | null>;

  /** metadata (nullable field) */
  metadata?: Record<string, string | null>;
  offeringKey?: string;
  order?: Order;

  /** valid parent id or null */
  parentId?: string | null;
  slug?: string;
  status?: "ACTIVE" | "INACTIVE";

  /** valid subscription id or null */
  subscriptionId?: string | null;
  transactionAccountId?: string;

  /** @format int64 */
  updatedAt?: number;

  /** @format int32 */
  version?: number;
}

export interface EntitlementTemplate {
  data?: Record<string, object>;
  key?: string;

  /** @format int32 */
  version?: number;
}

export interface EntitlementTemplateInput {
  data: Record<string, object>;
  key: string;
}

export interface EntitlementTemplateResponse {
  ari: string;
  data?: Record<string, object>;
  key: string;
  latest?: boolean;
  offeringKey: string;

  /** @format int64 */
  updatedAt?: number;

  /** @format int64 */
  version?: number;
}

export interface EntitlementTemplateUpdateInput {
  data: Record<string, object>;
}

export interface ErrorCode {
  /** @format int32 */
  code?: number;
  errorMessage?: string;
}

export type ErrorDetails = GenericErrorDetails | ValidationErrorDetails;

export interface GenerateSyntheticPlansInput {
  /** Commercial pricing plan key for which synthetic plan needs to be generated */
  originalPricingPlanKey: string;

  /** Unique UUID to identify the newly generated synthetic pricing plan */
  syntheticPricingPlanKey: string;
}

export interface GenericErrorDetails {
  reason: string;
}

export interface GetPromotionByIdResponseV2 {
  /** valid applicationReason or null */
  applicationReason?: ApplicationReasonResponseDto;
  benefits?: (DiscountDto | OverRideDto)[];

  /** valid eligibilityRules or null */
  eligibilityRules?: EligibilityRuleDto;

  /** Time is in epoch millis */
  eligiblePromotionWindow?: EligiblePromotionWindowResponse;

  /** valid metadata or null */
  metadata?: Record<string, string | null>;
  promotionId?: string;
  purpose?: PromotionPurposeResponse;
  status?:
    | "DRAFTED"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED"
    | "WITHDRAWN"
    | "INACTIVE";
  title?: string;
  type?:
    | "TRIAL_EXTENSION"
    | "LIST_PRICE"
    | "LOYALTY_DISCOUNT"
    | "LIST_PRICE_ADJUSTMENT"
    | "PROMO_CODE"
    | "DISCRETIONARY_DISCOUNT"
    | "PARTNER_DISCOUNT";

  /** @format int32 */
  version?: number;
}

export interface GlpDetails {
  /** @format int64 */
  glpForLastPaidPlan: number;
  lastPaidOffering: string;
}

export interface HighLevelQueryRequest {
  /** CCP primitive you want to search for */
  class: string;

  /** Exclude list to exclude the objects in result */
  excludes?: (string | null)[];

  /** Expand list to get the nested primitives */
  expand?: (string | null)[];

  /** Include list to include the objects in result */
  includes?: (string | null)[];

  /**
   * Page size
   * @format int32
   * @max 100
   */
  pageSize?: number | null;

  /** Search payload containing search query */
  payload: Payload;

  /** Start id for pagination, search will start from this id */
  startId?: string | null;
}

/**
 * valid unit or  null
 */
export interface IntegerComparatorDto {
  /**
   * valid value or  null
   * @format int32
   */
  equals?: number | null;

  /** valid range or  null */
  range?: RangeDto;
}

/**
 * valid iteration when duration is 'REPEATING' or null
 */
export interface IntegerLimiterDto {
  type: "RANGE" | "SET";
}

export type IntegerRangeLimiterDto = IntegerLimiterDto & {
  lowerBound?: number | null,
  upperBound?: number | null,
};

export type IntegerSetLimiterDto = IntegerLimiterDto & { anyOf?: number[] };

export interface InvoiceDto {
  /** The customer balance applied on this invoice. If negative, the invoice total was reduced by this amount. If positive, the amount due was increased by this amount. */
  appliedBalance?: number;
  billTo?: BillToParty;

  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  createdAt?: number;
  currency?: "USD";

  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  dueAt?: number;
  dunningStatus?: DunningStatus;

  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  finalizedAt?: number | null;
  id: string;
  invoiceGroup?: string;
  items?: InvoiceItem[];
  memo?: string | null;
  number?: string;

  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  paidAt?: number | null;

  /** if not specified, it will use the payment method from invoice group */
  paymentMethod?: string | null;
  purchaseOrderNumber?: string;
  shipTo?: ShipToPartyDto;
  status?:
    | "DRAFT"
    | "OPEN"
    | "PAID"
    | "DEFERRED_PAID"
    | "PAYMENT_DEFERRED"
    | "UNCOLLECTIBLE"
    | "VOID";
  subtotal?: number;
  tax?: number;
  total?: number;

  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  uncollectibleAt?: number | null;
}

export interface InvoiceGroupDto {
  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  createdAt: number;
  currency: "USD";

  /** if not specified it will use the transaction account payment method */
  defaultPaymentMethod?: string | null;
  id: string;
  memo?: string | null;

  /** An identifier that would help customers/partners segregate invoices. */
  name?: string | null;
  purchaseOrder?: PurchaseOrder;
  recipients?: string[];
  shipToParty?: ShipToPartyDto;

  /** @format int64 */
  version: number;
}

export interface InvoiceItem {
  adjustments?: InvoiceItemAdjustment[];
  currency?: "USD";
  description?: string;
  entitlementId?: string;
  entitlementNumber?: string;
  id?: string;
  invoiceRequest?: string;

  /** @format int32 */
  invoiceRequestItem?: number;
  offeringKey?: string;
  orderItemId?: string;
  period?: Period;
  planObj?: Plan;

  /** @format int64 */
  quantity?: number;
  subscriptionObj?: Subscription;
  subtotal?: number;
  tax?: number;
  taxPercent?: number;
  total?: number;
  unitAmount?: number;
}

export interface InvoiceItemAdjustment {
  amount: number;
  percent?: number;
  promotionId?: string;
  reason: string;
  reasonCode?: string;
  type: string;
}

export interface InvoiceRequest {
  additionalNotes?: string;

  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  createdAt?: number;
  currency?: "USD";
  headerTaxId?: string;
  id: string;
  invoiceGroup?: string;
  invoiceImmediately?: boolean;
  items?: InvoiceRequestItem[];
  number?: string;
  orderItemId?: string;
  reInvoice?: boolean;
  status?: "OPEN" | "INVOICED";
  stripeInvoiceItemId?: string;
  subtotal?: number;
  tax?: number;
  taxAmountLabel?: string;
  taxIdLabel?: string;
  taxed?: boolean;
  total?: number;

  /** @format int64 */
  version: number;
}

export interface InvoiceRequestInput {
  currency?: "USD";
  invoiceGroup?: string;
  invoiceImmediately?: boolean;
  items: InvoiceRequestItemInput[];
  orderItemId?: string;
  subtotal?: number;
  total?: number;
}

export interface InvoiceRequestItem {
  adjustments?: InvoiceRequestItemAdjustment[];
  currency?: "USD";
  description?: string;
  entitlementId?: string;
  entitlementNumber?: string;
  id?: string;
  offeringKey?: string;
  period?: Period;
  planObj?: Plan;

  /** @format int64 */
  quantity?: number;
  subscriptionObj?: Subscription;
  subtotal?: number;
  tax?: number;
  taxPercent?: number;
  total?: number;
  unitAmount?: number;
}

export interface InvoiceRequestItemAdjustment {
  amount?: number;
  percent?: number;
  promotionId?: string;
  reason?: string;
  reasonCode?: string;
  type?: string;
}

export interface InvoiceRequestItemAdjustmentInput {
  amount?: number;

  /** @max 100 */
  percent?: number;
  promotionId?: string;

  /** Use reasonCode */
  reason?: string;
  reasonCode?: string;
  type: string;
}

export interface InvoiceRequestItemInput {
  adjustments?: InvoiceRequestItemAdjustmentInput[];
  currency: "USD";
  description: string;
  entitlementId: string;
  offeringKey: string;
  period: Period;
  planObj: PlanInput;

  /** @format int64 */
  quantity?: number;
  subscriptionObj: SubscriptionInput;
  subtotal: number;
  total?: number;
  unitAmount: number;
}

export interface InvoiceRequestListDto {
  data?: InvoiceRequest[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;

  /**
   * Approximate timestamp value,in Epoch milliseconds, on which any pending invoice items will be added to an invoice.
   * @format int64
   */
  nextInvoiceTimeAt?: number;
}

export interface InvoiceToParty {
  name?: string;
  postalAddress?: SyncPostalAddressDto;
  priceEligibility?: Record<string, boolean>;
  taxId?: string;
}

export interface ItemValidationErrorResponseDto {
  errors?: OrderItemValidationErrorResponseDto[];
  itemId?: string;
}

export type JsonPatch = object;

export interface MemoInput {
  memo?: string;
}

export interface MigratePaymentMethodInput {
  /** Stripe account of the payment method to migrate from */
  migrationStripeAccount: "STATUS_PAGE" | "HAMS_NL" | "HAMS_US";

  /** Stripe customer id of the payment method to migrate */
  stripeCustomerId: string;

  /** Stripe payment method id to migrate */
  stripePaymentMethodId: string;
}

/**
 * valid not applicable promotion map with error or empty
 */
export interface NotApplicablePromotionResponse {
  errors?: string[];
}

export interface OfferingDefaultPricingPlansInput {
  keys: string[];
}

export interface OfferingDetailsResponse {
  ari: string;
  defaultPricingPlans?: DefaultPricingPlanResponse[];
  dependsOnOfferings?: string[];
  entitlementTemplate?: EntitlementTemplateResponse;
  hostingType: "CLOUD";
  key: string;

  /**
   * The hierarchy level of an offering for offering transitions purposes including upgrades and downgrades within a group of offerings.
   * @format int32
   */
  level?: number | null;
  name: string;
  offeringGroup?: OfferingGroupResponse;

  /** @format int32 */
  pricingPlansCount?: number;
  pricingType: "FREE" | "LIMITED_FREE" | "PAID";
  productKey: string;

  /** Stock Keeping Unit */
  sku: string;
  slugs?: string[];
  status: "DRAFT" | "ACTIVE" | "DEACTIVATED" | "DELETED";
  trial?: TrialResponse;
  type: "PARENT" | "CHILD";

  /** @format int64 */
  updatedAt?: number;

  /** @format int64 */
  version?: number;
}

export interface OfferingErrorResponse {
  code?: string;
  detail?: string;
  errors?: Result[];
  id?: string;
  path?: string;

  /** @format int32 */
  status?: number;

  /** @format date-time */
  timestamp?: string;
  title?: string;
}

export interface OfferingGroupInput {
  /** External reference id in UUID format */
  key: string;

  /**
   * Set the hierarchy level of an offering group for transitions purposes.
   * @format int32
   * @min 1
   */
  level?: number | null;
  name: string;

  /** The product this group will belong to */
  productKey: string;

  /** Human readable id used for policy creation */
  slug: string;
}

export interface OfferingGroupResponse {
  key: string;

  /**
   * The hierarchy level of an offering group for offering transitions purposes
   * @format int32
   */
  level?: number | null;
  name: string;
  productKey: string;
  slug: string;
}

export interface OfferingGroupUpdateInput {
  /**
   * Update the hierarchy level of an offering group for offering transitions purposes including upgrades and downgrades.
   * @format int32
   * @min 1
   */
  level?: number | null;

  /** Update the name of the offering group. */
  name: string;

  /** Update the human readable id used for policy creation. */
  slug: string;
}

export interface OfferingInput {
  /** Set a list of offering keys or slugs in which this offering will depend upon. A case where this can be used is for add-ons that depend on a parent offering. */
  dependsOnOfferings?: string[];

  /** A unique uuid identifier of the offering */
  key: string;

  /**
   * Set the hierarchy level of an offering for offering transitions purposes including upgrades and downgrades within a group of offerings.
   * @format int32
   * @min 1
   */
  level: number;

  /** The name of the offering. Eg Public Business, Private Trial */
  name: string;

  /** An offering group in which this offering belongs to. */
  offeringGroup?: string;

  /** Set the pricingType of offering */
  pricingType?: "FREE" | "LIMITED_FREE" | "PAID";

  /** The key of the product, for which this offering is intended */
  product: string;

  /** Stock Keeping Unit */
  sku: string;
  slugs?: string[];
  trial?: TrialInput;

  /** Set the type of offering */
  type?: "PARENT" | "CHILD";
}

export interface OfferingResponse {
  ari: string;
  hostingType: "CLOUD";
  key: string;

  /**
   * The hierarchy level of an offering for offering transitions purposes including upgrades and downgrades within a group of offerings.
   * @format int32
   */
  level?: number | null;
  name: string;
  pricingType: "FREE" | "LIMITED_FREE" | "PAID";
  productKey: string;

  /** Stock Keeping Unit */
  sku: string;
  slugs?: string[];
  status: "DRAFT" | "ACTIVE" | "DEACTIVATED" | "DELETED";
  type: "PARENT" | "CHILD";

  /** @format int64 */
  updatedAt?: number;

  /** @format int64 */
  version?: number;
}

export interface OfferingSlugsInput {
  slugs: string[];
}

export interface OfferingUpdateInput {
  /**
   * Set the hierarchy level of an offering for offering transitions purposes including upgrades and downgrades within a group of offerings.
   * @format int32
   * @min 1
   */
  level?: number | null;
  name: string;

  /** An offering group in which this offering belongs to. */
  offeringGroup?: string | null;

  /** Set the pricingType of offering */
  pricingType?: "FREE" | "LIMITED_FREE" | "PAID";

  /** Set the type of offering */
  type?: "PARENT" | "CHILD";
}

export interface OptedUsageOptionDto {
  chargingDetails?: ChargingDetailsDto;
  purchaseMetadata?: Record<string, string>;
  trial?: TrialIntentDto;
}

export type OrRuleConditionDto = RuleConditionDto;

export interface Order {
  id?: string;
  itemId?: string;
}

export type OrderAccountModificationItemDto = OrderItemRequestDto & {
  accountModification?: AccountModificationDto,
  entitlement?: OrderEntitlementRefDto,
  testParameters?: TestParametersDto,
};

export type OrderAmendmentItemDto = OrderItemRequestDto & {
  entitlement?: OrderEntitlementRefDto,
  isImmediate?: boolean | null,
  offeringId?: string,
  promotions?: PromotionDto[],
  testParameters?: TestParametersDto,
};

export interface OrderBillEstimateItemResponseDto {
  currency?: string;
  entitlementId?: string;
  itemId?: string;
  items?: BillEstimateItemResponseDto[];

  /** @format int64 */
  total?: number;
}

export interface OrderBillEstimateRequestDto {
  invoiceGroupId?: string;
  items?: OrderItemRequestDto[];
  orderIntentId?: string;
  status: "APPROVED" | "ACTIVE";
}

export interface OrderBillEstimateResponseDto {
  items?: OrderBillEstimateItemResponseDto[];
  orderIntentId?: string;
}

export type OrderCancellationItemDto = OrderItemRequestDto & {
  entitlement?: OrderEntitlementRefDto,
  isImmediate?: boolean | null,
  testParameters?: TestParametersDto,
};

export type OrderCreationItemDto = OrderItemRequestDto & {
  billingAnchorTime?: number,
  entitlementHistory?: EntitlementHistoryDto,
  offeringId?: string,
  parentEntitlementId?: string,
  promotions?: PromotionDto[],
  subscriptionStartTime?: number,
  testParameters?: TestParametersDto,
};

export interface OrderEntitlementRefDto {
  id?: string;
  version: string;
}

export interface OrderGetResponseDto {
  /** @format int64 */
  createdDate?: number;
  invoiceGroupId?: string;
  items?: OrderItemGetResponseDto[];
  metadata?: Record<string, string>;
  orderId?: string;
  slug?: string;
  transactionAccountId?: string;
}

export interface OrderItemGetResponseDto {
  /** @format int64 */
  backdateTimestamp?: number;

  /** @format int64 */
  billingAnchorTime?: number;
  isImmediate?: boolean | null;
  offeringId?: string;
  optedUsageOptions?: OptedUsageOptionDto;
  orderItemId?: string;

  /** points to orderItemId which is executed in SYSTEM_ORDER */
  originalOrderItemId?: string;
  parentEntitlementId?: string;
  processingInfo?: ProcessingInfo;
  promotionIds?: string[];
  promotions?: PromotionDto[];
  rewindToOrderItemId?: string;

  /** @format int64 */
  subscriptionStartTime?: number;
  type?:
    | "CREATION_ORDER"
    | "AMENDMENT_ORDER"
    | "CANCELLATION_ORDER"
    | "SYSTEM_CANCELLATION_ORDER"
    | "SYSTEM_AMENDMENT_ORDER"
    | "REACTIVATION_ORDER"
    | "ACCOUNT_MODIFICATION_ORDER"
    | "REWIND_ORDER";
}

export interface OrderItemRequestDto {
  itemId: string;
  optedUsageOptions?: OptedUsageOptionDto;

  /** Blank/Empty Strings will be treated as null */
  promotionIds?: string[];
  type:
    | "CREATION_ORDER"
    | "AMENDMENT_ORDER"
    | "CANCELLATION_ORDER"
    | "SYSTEM_CANCELLATION_ORDER"
    | "SYSTEM_AMENDMENT_ORDER"
    | "REACTIVATION_ORDER"
    | "ACCOUNT_MODIFICATION_ORDER"
    | "REWIND_ORDER";
}

export interface OrderItemResponseDto {
  itemId: string;
  orderItemId: string;
}

export interface OrderItemValidationErrorResponseDto {
  errorCode?: string;
  errorName?: string;
  field?: string;
  message?: string;
}

export type OrderReactivationItemDto = OrderItemRequestDto & {
  entitlement?: OrderEntitlementRefDto,
  offeringId?: string,
  promotions?: PromotionDto[],
  testParameters?: TestParametersDto,
};

export interface OrderRequestDto {
  invoiceGroupId?: string;
  items: OrderItemRequestDto[];
  metadata?: Record<string, string>;
  orderId?: string;
}

export interface OrderResponseDto {
  invoiceGroupId?: string;
  items?: OrderItemResponseDto[];
  metadata?: Record<string, string>;
  orderId?: string;
  slug?: string;
  transactionAccountId?: string;
}

export type OrderRewindItemDto = OrderItemRequestDto & {
  backdateTimestamp?: number,
  billingAnchorTime?: number,
  entitlement?: OrderEntitlementRefDto,
  offeringId?: string,
  promotions?: PromotionDto[],
  rewindToOrderItemId?: string,
  testParameters?: TestParametersDto,
};

export interface OrderServiceValidationErrorResponse {
  code?: string;
  detail?: string;
  id?: string;
  items?: ItemValidationErrorResponseDto[];
  status?: string;
  title?: string;
}

export interface Outcome {
  field?: string;
  message?: string;
}

export type OverRideDto = BenefitDto & {
  customisable?: PromotionBenefitCustomisableDto,
  duration?: "FOREVER" | "ONCE" | "REPEATING",
  iterations?: number | null,
  subBenefitType?: "TRIAL",
  value?: number,
};

export interface PageRequest {
  /**
   * @format int32
   * @min 0
   * @max 1000
   * @example 20
   */
  pageSize?: number;

  /** Use the value of lastEvaluatedKey returned in a PagedList in this parameter to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the previous PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  startId?: string;
}

export interface PagedListInvoiceDto {
  data?: InvoiceDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListInvoiceGroupDto {
  data?: InvoiceGroupDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListPaymentMethodDto {
  data?: (CreditCard | Deferred)[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListShipToPartyDto {
  data?: ShipToPartyDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListSyncCreditNoteDto {
  data?: SyncCreditNoteDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListSyncInvoiceDto {
  data?: SyncInvoiceDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListSyncInvoiceGroupDto {
  data?: SyncInvoiceGroupDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListSyncPaymentMethodDto {
  data?: SyncPaymentMethodDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListSyncShipToPartyDto {
  data?: SyncShipToPartyDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PagedListSyncTransactionAccountDto {
  data?: SyncTransactionAccountDto[];

  /** Use the lastEvaluatedKey in your next pageRequest to continue paging from where the PagedList finished. If there weren't enough records left to search in order to fill up the PagedList completely, the value of lastEvaluatedKey will be null, therefore you dont have to continue paging. */
  lastEvaluatedKey?: string;
}

export interface PaginatedOrderItemResponseDto {
  /** @format int32 */
  count?: number;
  orderItems?: AllDetailsOrderItemResponseDto[];
  startId?: string;
}

export interface PaginatedResponseEntitlementTemplateResponse {
  nextId?: string;
  values: EntitlementTemplateResponse[];
}

export interface PaginatedResponseGeneric {
  /** The next id to start the next search from */
  nextId?: object;

  /** Actual search results for the input query */
  results?: object[];
}

export interface PaginatedResponseGenericBulkSubscriptionResponseDtoString {
  nextId?: string;
  values?: BulkSubscriptionResponseDto[];
}

export interface PaginatedResponseGenericEntitlementResponseString {
  nextId?: string;
  values?: EntitlementResponse[];
}

export interface PaginatedResponseOfferingGroupResponse {
  nextId?: string;
  values: OfferingGroupResponse[];
}

export interface PaginatedResponseOfferingResponse {
  nextId?: string;
  values: OfferingResponse[];
}

export interface PaginatedResponsePolicyResponse {
  nextId?: string;
  values: PolicyResponse[];
}

export interface PaginatedResponsePricingPlanResponse {
  nextId?: string;
  values: PricingPlanResponse[];
}

export interface PaginatedResponseProductResponse {
  nextId?: string;
  values: ProductResponse[];
}

export interface PartnerStatus {
  discountTier?: string;
  programLevelGlobal?: string;
}

/**
 * Search payload containing search query
 */
export interface Payload {
  /** @format int32 */
  from?: number;

  /** Search query */
  query: Query;

  /** @format int32 */
  size?: number;
}

export interface PaymentMethodDto {
  /**
   * We currently only support USD
   * @example USD
   */
  currency: "USD";

  /** Deferred type is not allowed as default */
  default: boolean;
  id: string;

  /**
   * Payment types would be either CreditCard or Deferred
   * @example CARD
   */
  type: "CARD" | "DEFERRED";
}

/**
 * @example {"currency":"USD","terms":{"invoiceDueDays":30},"type":"DEFERRED"}
 */
export interface PaymentMethodInput {
  /** @example USD */
  currency: "USD";
  type?: "DEFERRED";
}

export interface Period {
  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  endAt: number;

  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  startAt: number;
}

export interface Plan {
  hostingType?: string;
  id?: string;
  sku?: string;
  type?: string;
}

export interface PlanInput {
  /** Hosting type. Possible values: cloud */
  hostingType: string;

  /** Plan ID */
  id: string;

  /** Standard keeping unit */
  sku: string;

  /** Plan type. All possible values of price eligibility: commercial, academic, opensource, etc. */
  type: string;
}

export interface PolicyInput {
  /**
   * A string containing Spring SpEL notation to be evaluated by the policy engine
   * @example #from.offering.level > 100 && #to.group.slug == 'private'
   */
  condition: string;

  /** A description about this policy */
  description?: string;
  key: string;

  /** Policy to be applied when the condition evaluates to true */
  policyType: "ALLOWED" | "NOT_ALLOWED";
  productKey: string;
}

export interface PolicyResponse {
  /**
   * A string containing Spring SpEL notation to be evaluated by the policy engine
   * @example #from.offering.level > 100 && #to.group.slug == 'private'
   */
  condition: string;

  /** A description about this policy */
  description?: string;
  key: string;

  /** Policy to be applied when the condition evaluates to true */
  policyType: "ALLOWED" | "NOT_ALLOWED";
  productKey: string;
}

export interface PostalAddress {
  city?: string;

  /** This field should follow ISO 3166-1 Alpha 2 */
  country: string;
  line1?: string;
  line2?: string;
  phone?: string;
  postcode?: string;
  state?: string;
}

export interface PricingPlanInput {
  currency: "USD" | "JPY";

  /** Synthetic pricing plan keys */
  derivedPricingPlanKeys: Record<string, string>;

  /** Description of the pricing plan */
  description?: string;
  items: PricingPlanItemInput[];

  /** Unique UUID to identify this pricing plan */
  key: string;

  /** The uuid of offering for which this pricing plan is intended */
  offering: string;
  primaryCycle: CycleInput;

  /** Stock Keeping Unit */
  sku?: string | null;
}

export interface PricingPlanItemInput {
  chargeElement: string;
  chargeType: "METERED" | "LICENSED" | "AUTO_SCALING";
  cycle: CycleInput;
  prorateOnUsageChange?: "CREATE_PRORATIONS" | "NONE" | "ALWAYS_INVOICE";
  tiers: PricingPlanTierInput[];
  tiersMode: "GRADUATED" | "VOLUME";
  usageUpdateCadence?: UsageUpdateCadenceInput;
}

export interface PricingPlanItemResponse {
  chargeElement: string;
  chargeType: "METERED" | "LICENSED" | "AUTO_SCALING";
  cycle: CycleResponse;
  prorateOnUsageChange?: "CREATE_PRORATIONS" | "NONE" | "ALWAYS_INVOICE";
  tiers: PricingPlanTierResponse[];
  tiersMode: "GRADUATED" | "VOLUME";
  usageUpdateCadence?: UsageUpdateCadenceResponse;
}

export interface PricingPlanRelationshipResponse {
  fromPricingPlanKey?: string;
  metadata?: Record<string, object>;
  toPricingPlanKey?: string;
  type?:
    | "ADVANTAGE_PRICING"
    | "NEXT_PRICING"
    | "SYNTHETIC_GENERATED"
    | "CURRENCY_GENERATED";
}

export interface PricingPlanResponse {
  activatedWithReason?: "DEFAULT_PRICING" | "ADVANTAGE_PRICING";
  ari: string;
  currency: "USD" | "JPY";
  description: string;
  items: PricingPlanItemResponse[];
  key: string;

  /** @format int64 */
  maxNewQuoteDate?: number;
  offeringKey: string;
  offeringName: string;

  /** Original pricing plan key */
  originalPricingPlanKey?: string;
  primaryCycle: CycleResponse;
  relationships?: PricingPlanRelationshipResponse[];

  /** Stock Keeping Unit */
  sku: string;
  status: "DRAFT" | "ACTIVE" | "AT_NOTICE" | "EXPIRED";
  type: string;

  /** @format int64 */
  updatedAt?: number;

  /** @format int64 */
  version?: number;
}

export interface PricingPlanTierInput {
  /** @format int64 */
  ceiling?: number;

  /** @format int64 */
  flatAmount?: number;

  /** @format int64 */
  floor: number;

  /** @format int64 */
  unitAmount?: number;
}

export interface PricingPlanTierResponse {
  /** @format int64 */
  amount: number;

  /** @format int64 */
  ceiling?: number;

  /**
   * Flat amount represents the charge for the block
   * @format int64
   */
  flatAmount?: number | null;

  /** @format int64 */
  floor: number;
  policy: "BLOCK" | "PER_UNIT";

  /**
   * Unit amount represents the charge per unit
   * @format int64
   */
  unitAmount?: number | null;
}

export interface ProcessingInfo {
  accountModification?: AccountModificationDto;
  entitlement?: OrderEntitlementRefDto;
  saleTransitionDetails?: SaleTransitionDetailsDto;
  saleTransitionType?: "NEW" | "NA" | "DOWNGRADE" | "UPGRADE" | "RENEW";
  status?: "PROCESSING" | "SUCCESS" | "FAIL";
  transitionTime?: "IMMEDIATE" | "NEXT_CYCLE" | "SCHEDULED";
}

export interface ProductInput {
  /** List of elements on which the product would be charged. Eg unit, user, minutes */
  chargeElements?: string[];

  /** A unique uuid as identifier of the product */
  key: string;

  /** Name of the product. Eg statupage */
  name: string;

  /** Determines the dunning action for paid offerings of the product */
  uncollectibleAction?: UncollectibleActionInput;
}

export interface ProductResponse {
  ari: string;
  chargeElements?: string[];
  key: string;
  name: string;
  offerings?: OfferingResponse[];
  uncollectibleAction?: UncollectibleActionResponse;

  /** @format int64 */
  updatedAt?: number;

  /** @format int64 */
  version?: number;
}

export interface ProductUpdateInput {
  chargeElements?: string[];
  name: string;

  /** Determines the dunning action for paid offerings of the product */
  uncollectibleAction?: UncollectibleActionInput;
}

/**
 * valid promotions or null
 */
export interface Promotion {
  /** valid customisedValues or null */
  customisedValues?: CustomisedValues;

  /** valid promotionId or null */
  promotionId?: string | null;

  /** valid promotionInstanceId or null */
  promotionInstanceId?: string | null;
}

/**
 * valid customisable promotion benefit or null
 */
export interface PromotionBenefitCustomisableDto {
  duration: ("FOREVER" | "ONCE" | "REPEATING")[];

  /** valid iteration when duration is 'REPEATING' or null */
  iterations?: IntegerLimiterDto;
  value: DecimalLimiterDto;
}

export interface PromotionBenefitDto {
  duration?: "FOREVER" | "ONCE" | "REPEATING";

  /** @format int32 */
  iterations?: number;

  /** @format float */
  value?: number;
}

/**
 * the actual details of the promotion
 */
export interface PromotionDefinition {
  /** valid customisedValues or null */
  customisedValues?: CustomisedValues;

  /** the id of applied promotion */
  promotionId?: string | null;
}

export interface PromotionDefinitionDto {
  customisedValues?: CustomPromotionValueDto;
  promotionId?: string;
}

export interface PromotionDto {
  promotionDefinition?: PromotionDefinitionDto;
  promotionInstanceId?: string;
}

export interface PromotionErrorResponse {
  code?: string;
  detail?: string;
  id?: string;
  status?: string;
  title?: string;
}

/**
 * valid promotionInstances or null
 */
export interface PromotionInstance {
  /** the actual details of the promotion */
  promotionDefinition?: PromotionDefinition;

  /** the instanceId for an applied promotion */
  promotionInstanceId?: string | null;
}

export interface PromotionPurposeResponse {
  invoiceNote?: string;
  name?: string;
  reasonCode?: string;
}

export interface PurchaseOrder {
  number?: string;
  oneTimeUse?: boolean;
}

export interface PurchaseOrderInput {
  number: string;

  /** Whether this PO number should be deleted once it's applied to an invoice */
  oneTimeUse?: boolean;
}

/**
 * Search query
 */
export interface Query {
  /** Boolean query for and/or like conditions */
  bool?: BooleanQuery;

  /** Exists query */
  exists?: Record<string, string | null>;

  /** Match query */
  match?: Record<string, string | null>;

  /** Range based query */
  range?: Record<string, RangeQuery>;

  /** Term query for exact search operations */
  term?: Record<string, string | null>;

  /** Wildcard query */
  wildcard?: Record<string, string | null>;
}

/**
 * valid range or  null
 */
export interface RangeDto {
  /**
   * valid lowerBound or  null
   * @format int32
   */
  lowerBound?: number | null;

  /**
   * valid upperBound or  null
   * @format int32
   */
  upperBound?: number | null;
}

/**
 * Range based query
 */
export interface RangeQuery {
  /** @format float */
  boost?: number;
  format?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
}

export interface RecipientsDto {
  recipients: string[];
}

export interface RecipientsInput {
  recipients?: string[];
}

export interface ReleaseEntitlementLockDto {
  lockKey: string;
  lockOwners?: string[];
}

export interface ReleaseEntitlementLockResponseDto {
  deleteLockStatus?: boolean;
  failureReleaseLockForOrderItems?: string[];
  successReleaseLockForOrderItems?: string[];
}

export interface Result {
  arguments?: object[];
  code?: string;
  message?: string;
}

export interface RewindOrderRequestDto {
  invoiceGroupId?: string;
  item?: OrderRewindItemDto;
  transactionAccountId?: string;
}

export interface RewindToDetailsResponseDto {
  rewindOrderRequest?: RewindOrderRequestDto;
}

export interface RoleAssignment {
  /** @example ari:cloud:commerce::transaction-account/txa-id-123 */
  resourceAri?: string;

  /** @example transaction-account/billing-admin */
  role?: "transaction-account/billing-admin";

  /** @example billing-admin-id-123 */
  userId?: string;
}

export interface RoleAssignments {
  assignments?: RoleAssignment[];
}

export interface RuleConditionDto {
  operatorType: "OR" | "AND";
}

export interface SaleTransitionDetailsDto {
  /** @format int32 */
  currentOfferingLevel?: number;

  /** @format int64 */
  glpForCurrentPlan?: number;

  /** @format int64 */
  glpForLastPaidPlan?: number;

  /** @format int64 */
  glpForNextPlan?: number;

  /** @format int32 */
  lastPaidOfferingLevel?: number;

  /** @format int32 */
  nextOfferingLevel?: number;
  saleTransitionType?: "NEW" | "NA" | "DOWNGRADE" | "UPGRADE" | "RENEW";
}

export interface SetupConfirmPayment {
  /** @example f6a73fd4-28ab-472a-a744-be7b7507b21e */
  ccpInvoiceId?: string;

  /** @example 2531af32-f9bb-4103-b970-25f57d90b14f */
  ccpPaymentMethodId?: string;

  /** @example pi_1HeDQ8HxhvApkIk7jjgE1G0P_secret_wNH5bFK1Ixk3fMNkMdcD8jJef */
  paymentIntentClientSecret?: string;

  /** @example pi_1HeDQ8HxhvApkIk7jjgE1G0P */
  paymentIntentId?: string;

  /** @example pk_test_Kc26rjR9aHz38KDp5z4KB3Iavndat1IA9a0ePtc02 */
  publicKey?: string;
}

export interface SetupIntent {
  clientSecret?: string;
  paymentMethodId?: string;
  publicKey?: string;
}

export interface SetupIntentInput {
  defaultForInvoiceGroup?: string;
}

export interface ShipToPartyDto {
  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  createdAt?: number;
  id: string;
  name: string;
  postalAddress: PostalAddress;
  taxId?: string;

  /** @format int64 */
  version: number;
}

export interface ShipToPartyInput {
  name: string;
  postalAddress: PostalAddress;
  taxId?: string | null;
}

export interface SignUpInput {
  /** The transaction will be calculated using either pricing-plan + chargeElements or offering. offeringIdentifier will be ignored if pricingPlanKey is provided. */
  to: TransitionResourceInput;
}

export interface SingleQuery {
  exists?: Record<string, string>;
  match?: Record<string, string>;
  range?: Record<string, RangeQuery>;
  term?: Record<string, string>;
  wildcard?: Record<string, string>;
}

export interface StringLimiterDto {
  type: "RANGE" | "SET";
}

export type StringSetLimiterDto = StringLimiterDto & { anyOf?: string[] };

export interface Subscription {
  chargeType?: string;
  id?: string;
  itemId?: string;
}

export interface SubscriptionAccountDetailsDto {
  invoiceGroupId?: string;
  transactionAccountId?: string;
}

export interface SubscriptionCancelRequestDto {
  /** valid metadata or null */
  metadata?: Record<string, string | null>;

  /** valid orderItemId or null */
  orderItemId?: string | null;
}

export interface SubscriptionChargeDetailsDto {
  chargeQuantities?: SubscriptionChargeQuantityDto[];
  offeringId?: string;
  pricingPlanId?: string;
  promotionInstances?: SubscriptionPromotionInstanceDto[];
}

export interface SubscriptionChargeQuantityDto {
  chargeElement: string;

  /** @format int64 */
  lastUpdateAt?: number;

  /** @format int32 */
  quantity: number;
}

export interface SubscriptionCreateRequestDto {
  /** @format int64 */
  billingAnchorTimestamp?: number | null;

  /** valid chargeQuantities with pricingPlanId or null */
  chargeQuantities?: ChargeQuantity[] | null;

  /**
   * valid endTimestamp or null
   * @format int64
   */
  endTimestamp?: number | null;
  entitlementId: string;
  id?: string;
  invoiceGroupId: string;

  /** valid invoiceImmediately or null */
  invoiceImmediately?: boolean | null;

  /** valid metadata or null */
  metadata?: Record<string, string | null>;
  offeringId: string;
  orderItemId: string;

  /** valid pricingPlanId with chargeQuantities or null */
  pricingPlanId?: string | null;

  /** valid promotionIds or null */
  promotionIds?: (string | null)[];

  /** valid promotions or null */
  promotions?: Promotion[] | null;

  /** valid skipTrial or null */
  skipTrial?: boolean | null;

  /**
   * valid startTimestamp or null
   * @format int64
   */
  startTimestamp?: number | null;

  /** testing features */
  test?: TestFeatures;
  transactionAccountId: string;
}

export interface SubscriptionErrorResponse {
  code?: string;
  detail?: string;
  id?: string;
  status?: string;
  title?: string;
}

export interface SubscriptionGLPDetailsDto {
  currentOffering?: string;

  /** @format int64 */
  glpForCurrentPlan?: number;

  /** @format int64 */
  glpForLastPaidPlan?: number;

  /** @format int64 */
  glpForNextPlan?: number;
  lastPaidOffering?: string;
}

export interface SubscriptionInEntitlementDetails {
  /** @format int64 */
  billingAnchorTimestamp?: number;
  chargeQuantities: ChargeQuantity[];

  /** @format int64 */
  endTimestamp?: number;
  id?: string;
  invoiceGroupId: string;
  metadata?: Record<string, string>;

  /** @format int64 */
  nextBillingTimestamp?: number;
  pricingPlanId?: string;
  promotionIds: string[];
  promotionInstances?: PromotionInstance[];
  scheduledChanges?: SubscriptionSchedule;

  /** @format int64 */
  startTimestamp?: number;
  status?:
    | "PROCESSING"
    | "GENERATED"
    | "PAID"
    | "UNPAID"
    | "ACTIVE"
    | "CANCELLED";
}

export interface SubscriptionInput {
  /** Charge type. Possible values: METERED, LICENSED */
  chargeType: string;

  /** Subscription ID (SEN in HAMS). */
  id: string;
  itemId: string;
}

export interface SubscriptionListPriceRequestDto {
  /** valid chargeQuantities or null */
  chargeQuantities?: ChargeQuantity[] | null;
  key?: string;
  offeringId: string;

  /** valid pricingPlanId or null */
  pricingPlanId?: string | null;

  /** valid subscriptionId or null */
  subscriptionId?: string | null;
}

export interface SubscriptionListPriceResponseDto {
  /** valid currentOffering or null */
  currentOffering?: string | null;

  /**
   * valid glpForCurrentPlan or null
   * @format int64
   */
  glpForCurrentPlan?: number | null;

  /**
   * valid glpForLastPaidPlan or null
   * @format int64
   */
  glpForLastPaidPlan?: number | null;

  /**
   * valid glpForNextPlan or null
   * @format int64
   */
  glpForNextPlan?: number | null;

  /** valid lastPaidOffering or null */
  lastPaidOffering?: string | null;
}

export interface SubscriptionNotificationDto {
  accountDetails?: SubscriptionAccountDetailsDto;
  chargeDetails?: SubscriptionChargeDetailsDto;
  entitlementId?: string;
  eventId?: string;
  glpDetails?: SubscriptionGLPDetailsDto;
  metadata?: Record<string, string>;
  orderItemId: string;
  originalOrderItemId?: string;
  subscriptionId?: string;
  type:
    | "SUBSCRIPTION_END_EVENT"
    | "SUBSCRIPTION_UPDATE_EVENT"
    | "SUBSCRIPTION_TRIAL_TO_PAID_EVENT"
    | "SUBSCRIPTION_SCHEDULE_ACTIVATION_EVENT";

  /** @format int32 */
  version?: number;
}

export interface SubscriptionPatchRequestDto {
  /**
   * valid billingAnchorTimestamp or null
   * @format int64
   */
  billingAnchorTimestamp?: number | null;

  /** valid chargeQuantities with pricingPlanId or null */
  chargeQuantities?: ChargeQuantity[] | null;

  /**
   * valid endTimestamp or null
   * @format int64
   */
  endTimestamp?: number | null;

  /** valid entitlementId or null */
  entitlementId?: string | null;

  /** valid invoiceGroupId or null */
  invoiceGroupId?: string | null;

  /** valid metadata or null */
  metadata?: Record<string, string | null>;

  /** valid offeringId or null */
  offeringId?: string | null;
  orderItemId: string;

  /** valid pricingPlanId with chargeQuantities or null */
  pricingPlanId?: string | null;

  /** valid promotionIds or null */
  promotionIds?: (string | null)[];

  /** valid promotions or null */
  promotions?: Promotion[] | null;

  /** valid skipTrial or null */
  skipTrial?: boolean | null;

  /** valid transactionAccountId or null */
  transactionAccountId?: string | null;

  /**
   * valid version or null
   * @format int64
   */
  version?: number | null;
}

export interface SubscriptionPromotionInstanceDto {
  promotionDefinition?: PromotionDefinitionDto;
  promotionInstanceId?: string;
}

export interface SubscriptionReactivateRequestDto {
  /**
   * valid billingAnchorTimestamp or null
   * @format int64
   */
  billingAnchorTimestamp?: number | null;

  /** valid chargeQuantities with pricingPlanId or null */
  chargeQuantities?: ChargeQuantity[] | null;

  /**
   * valid endTimestamp or null
   * @format int64
   */
  endTimestamp?: number | null;
  invoiceGroupId: string;

  /** valid invoiceImmediately or null */
  invoiceImmediately?: boolean | null;

  /** valid metadata or null */
  metadata?: Record<string, string | null>;
  offeringId: string;
  orderItemId: string;

  /** valid pricingPlanId with chargeQuantities or null */
  pricingPlanId?: string | null;

  /** valid promotionIds or null */
  promotionIds?: (string | null)[];

  /** valid promotions or null */
  promotions?: Promotion[] | null;

  /** valid skipTrial or null */
  skipTrial?: boolean | null;
  transactionAccountId: string;

  /**
   * valid version or null
   * @format int64
   */
  version?: number | null;
}

export interface SubscriptionRemoveScheduleRequestDto {
  /** valid orderItemId or null */
  orderItemId?: string | null;
}

export interface SubscriptionResetRequestDto {
  /**
   * valid billFromTimestamp or null
   * @format int64
   */
  billFromTimestamp?: number | null;

  /**
   * valid billingAnchorTimestamp or null
   * @format int64
   */
  billingAnchorTimestamp?: number | null;
  chargeQuantities: ChargeQuantity[];
  glpDetails: GlpDetails;
  offeringId: string;
  orderItemId: string;
  pricingPlanId: string;

  /** valid promotionIds or null */
  promotionIds?: (string | null)[];

  /** valid promotions or null */
  promotions?: Promotion[] | null;

  /**
   * valid version or null
   * @format int64
   */
  version?: number | null;
}

export interface SubscriptionResponseDto {
  /**
   * valid billingAnchorTimestamp or null
   * @format int64
   */
  billingAnchorTimestamp?: number | null;

  /** valid chargeQuantities with pricingPlanId or null */
  chargeQuantities?: ChargeQuantity[] | null;

  /**
   * valid currentBillingStartTimestamp or null
   * @format int64
   */
  currentBillingStartTimestamp?: number | null;

  /**
   * valid endTimestamp or null
   * @format int64
   */
  endTimestamp?: number | null;
  entitlementId: string;
  id?: string;
  invoiceGroupId: string;

  /** valid isEditable or null */
  isEditable?: boolean | null;

  /** valid metadata or null */
  metadata?: Record<string, string | null>;

  /**
   * valid nextBillingTimestamp or null
   * @format int64
   */
  nextBillingTimestamp?: number | null;
  offeringId?: string;
  orderItemId: string;

  /** valid pricingPlanId with chargeQuantities or null */
  pricingPlanId?: string | null;

  /** valid promotionIds or null */
  promotionIds?: (string | null)[];

  /** valid list of promotions applied to the subscription or null */
  promotionInstances?: PromotionInstance[] | null;

  /** valid schedule or null */
  scheduledChanges?: SubscriptionScheduleResponseDto;

  /**
   * valid startTimestamp or null
   * @format int64
   */
  startTimestamp?: number | null;
  status?: "PROCESSING" | "ACTIVE" | "CANCELLED";
  transactionAccountId: string;

  /** trial information for the subscription */
  trial?: Trial;

  /**
   * valid version or null
   * @format int64
   */
  version?: number | null;
}

export interface SubscriptionSchedule {
  chargeQuantities: ChargeQuantity[];

  /** @format int64 */
  nextChangeTimestamp?: number;
  offeringId?: string;
  pricingPlanId?: string;
  promotionIds: string[];
  promotionInstances?: PromotionInstance[];
  subscriptionScheduleAction?: "UPDATE" | "CANCEL";
}

export interface SubscriptionSchedulePatchDto {
  /** valid chargeQuantities with pricingPlanId or null */
  chargeQuantities?: ChargeQuantity[] | null;

  /** valid orderItemId or null */
  offeringId?: string | null;
  orderItemId: string;

  /** valid pricingPlanId with chargeQuantities or null */
  pricingPlanId?: string | null;

  /** valid promotionIds or null */
  promotionIds?: (string | null)[];

  /** valid promotions or null */
  promotions?: Promotion[] | null;

  /** valid skipTrial or null */
  skipTrial?: boolean | null;
}

/**
 * valid schedule or null
 */
export interface SubscriptionScheduleResponseDto {
  /** valid chargeQuantities or null */
  chargeQuantities?: ChargeQuantity[] | null;

  /**
   * valid nextChangeTimestamp or null
   * @format int64
   */
  nextChangeTimestamp?: number | null;

  /** valid offeringId or null */
  offeringId?: string | null;
  orderItemId: string;

  /** valid pricingPlanId or null */
  pricingPlanId?: string | null;

  /** valid promotionIds or null */
  promotionIds?: (string | null)[];

  /** valid promotionInstances or null */
  promotionInstances?: PromotionInstance[] | null;
  subscriptionScheduleAction?: "UPDATE" | "CANCEL";
}

export interface SyncCreditNoteDto {
  additionalNotes?: string;
  arn?: string;
  chargeId?: string;

  /** @format date-time */
  createdAt?: string;
  creditNoteItems?: CreditNoteItem[];
  currency?: "USD";

  /** @format date-time */
  deletedAt?: string;
  id: string;
  invoice?: string;
  memo?: string;
  metadata?: Record<string, string>;
  number?: string;
  purchaseOrderNumber?: string;
  reason?:
    | "refund_wrong_order_repurchase"
    | "refund_cancelled_purchase"
    | "refund_tax"
    | "refund_atlassian_error"
    | "refund_order_form_pending_signature"
    | "refund_fraud"
    | "refund_customer_service_concession"
    | "refund_product_eol_or_ma"
    | "refund_partial_adjustment"
    | "refund_write_off"
    | "covid_19"
    | "refund_cb0_30"
    | "refund_cb31_90"
    | "refund_for_rewind"
    | "duplicate"
    | "fraudulent"
    | "order_change"
    | "product_unsatisfactory"
    | "tax_only_refund";
  rechargeInvoiceId?: string;
  refundId?: string;
  status?: "PENDING" | "OPEN" | "PAID" | "FAILED";
  stripeCreditNoteId?: string;
  transactionAccountId?: string;
  type?: "full-item-refund" | "tax-only-refund";

  /** @format date-time */
  updatedAt?: string;

  /** @format int64 */
  version: number;
}

export interface SyncInvoiceDto {
  additionalNotes?: string;
  billToParty?: InvoiceToParty;
  chargeId?: string;

  /** @format date-time */
  createdAt?: string;
  currency?: "USD";

  /** @format date-time */
  deletedAt?: string;
  description?: string;

  /** @format date-time */
  dueDate?: string;
  dunningHistory?: DunningStatus[];

  /** @format date-time */
  finalizedDate?: string;
  headerTaxId?: string;
  id: string;
  invoiceGroup?: string;
  items?: InvoiceItem[];
  memo?: string;
  number?: string;

  /** @format date-time */
  paidDate?: string;
  paymentMethod?: string;
  purchaseOrderNumber?: string;
  reInvoiced?: boolean;
  shipToParty?: InvoiceToParty;
  status?:
    | "DRAFT"
    | "OPEN"
    | "PAID"
    | "DEFERRED_PAID"
    | "PAYMENT_DEFERRED"
    | "UNCOLLECTIBLE"
    | "VOID";
  stripeInvoiceId?: string;
  subtotal?: number;
  tax?: number;
  taxIdLabel?: string;
  taxPercent?: number;
  total?: number;
  transactionAccountId?: string;

  /** @format date-time */
  uncollectibleDate?: string;

  /** @format date-time */
  updatedAt?: string;

  /** @format int64 */
  version: number;
}

export interface SyncInvoiceGroupDto {
  /** @format date-time */
  createdAt?: string;
  currency?: "USD";
  defaultPaymentMethod?: string;

  /** @format date-time */
  deletedAt?: string;
  id: string;
  memo?: string;
  name?: string;
  purchaseOrder?: PurchaseOrder;
  recipients?: string[];
  shipToParty?: string;
  stripeSubscription?: string;
  transactionAccountId?: string;

  /** @format date-time */
  updatedAt?: string;

  /** @format int64 */
  version: number;
}

export interface SyncPaymentMethodDto {
  /** @format date-time */
  createdAt?: string;
  currency?: "USD";

  /** @format date-time */
  deletedAt?: string;
  id: string;
  sourceType?: "STRIPE_CARD" | "DEFERRED";
  stripeCard?: SyncStripeCard;
  terms?: Terms;
  transactionAccountId?: string;

  /** @format date-time */
  updatedAt?: string;

  /** @format int64 */
  version: number;
}

export interface SyncPostalAddressDto {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  phone?: string;
  postcode?: string;
  state?: string;
}

export interface SyncShipToPartyDto {
  /** @format date-time */
  createdAt?: string;

  /** @format date-time */
  deletedAt?: string;
  id: string;
  name?: string;
  postalAddress?: SyncPostalAddressDto;
  priceEligibility?: Record<string, boolean>;
  taxId?: string;
  transactionAccountId?: string;

  /** @format date-time */
  updatedAt?: string;

  /** @format int64 */
  version: number;
}

export interface SyncStripeCard {
  brand?: string;
  cardHolderName?: string;
  country?: string;

  /** @format int64 */
  expMonth?: number;

  /** @format int64 */
  expYear?: number;
  funding?: string;
  last4?: string;
  stripePaymentMethodId?: string;
}

export interface SyncTransactionAccountDto {
  billToParty?: BillToParty;

  /** @format date-time */
  createdAt?: string;
  currencyEntries?: CurrencyEntry[];
  id: string;
  invoiceGroups?: SyncInvoiceGroupDto[];
  number?: string;
  partnerStatus?: PartnerStatus;
  paymentMethods?: SyncPaymentMethodDto[];
  shipToParties?: SyncShipToPartyDto[];

  /** @format date-time */
  updatedAt?: string;

  /** @format int64 */
  version: number;
}

export interface SyntheticPlanTemplateInput {
  /**
   * The percentage of the discount
   * @format double
   */
  discountPercentage: number;
  type: "COMMUNITY" | "OPEN_SOURCE" | "CLASSROOM" | "ACADEMIC";
}

export interface SyntheticPlanTemplateResponse {
  /** @format double */
  discountPercentage: number;
  status: "ACTIVE" | "INACTIVE" | "REPLACED";
  type: "COMMUNITY" | "OPEN_SOURCE" | "CLASSROOM" | "ACADEMIC";
}

export interface SyntheticPlanTemplateUpdatableFieldsInput {
  /**
   * The percentage of the discount
   * @format double
   */
  discountPercentage: number;
}

export type SystemOrderAmendmentItemDto = OrderItemRequestDto & {
  entitlement?: OrderEntitlementRefDto,
  offeringId?: string,
  promotions?: PromotionDto[],
};

export type SystemOrderCancellationItemDto = OrderItemRequestDto & {
  entitlement?: OrderEntitlementRefDto,
};

export interface Terms {
  /** @format int32 */
  invoiceDueDays?: number;
}

/**
 * testing features
 */
export interface TestFeatures {
  /** valid billing clock id */
  billingClockId?: string | null;
}

export interface TestParametersDto {
  billingClockId?: string;
}

export interface TransactionAccountDto {
  /**
   * Timestamp in Epoch milliseconds
   * @format int64
   */
  createdAt: number;

  /** Map of Currency to Customer Balance being stored on the Transaction Account, if any. If negative, the customer has credit to apply to their next invoice. If positive, the customer has an amount owed that will be added to their next invoice. */
  customerBalances?: Record<string, number>;
  id: string;
  number: string;
  partnerStatus: PartnerStatus;

  /** @format int64 */
  version: number;
}

export interface TransactionAccountInput {
  billingAdmin?: string;
}

export interface TransactionAccountStatus {
  active: boolean;
  invoiceable: Validity;
  number: string;
}

export interface TransactionAccountsListDto {
  data?: TransactionAccountDto[];
}

export interface TransitionInput {
  /** The transaction will be calculated using either pricing-plan + chargeElements or offering. offeringIdentifier will be ignored if pricingPlanKey is provided. */
  from: TransitionResourceInput;

  /** The transaction will be calculated using either pricing-plan + chargeElements or offering. offeringIdentifier will be ignored if pricingPlanKey is provided. */
  to: TransitionResourceInput;
}

/**
 * The transaction will be calculated using either pricing-plan + chargeElements or offering. offeringIdentifier will be ignored if pricingPlanKey is provided.
 */
export interface TransitionResourceInput {
  /** The charge element name and it's current value, e.g. units=4. This field is required if pricingPlanKey is provided. */
  chargeElements?: Record<string, number | null>;

  /** Offering key or offering slug. */
  offeringIdentifier?: string | null;
  pricingPlanKey?: string | null;
}

export interface TransitionResponse {
  policy: "ALLOWED" | "NOT_ALLOWED";
  reason?: string;
}

/**
 * trial information for the subscription
 */
export interface Trial {
  /** @format int64 */
  endTimestamp?: number;

  /** @format int64 */
  startTimestamp?: number;
}

export interface TrialInput {
  /**
   * @format int32
   * @min 1
   */
  lengthDays: number;
}

export interface TrialIntentDto {
  skipTrial?: boolean;
}

export interface TrialResponse {
  /** @format int32 */
  lengthDays: number;
}

/**
 * Provides details for destination offering in case of DOWNGRADE action type
 */
export interface UncollectibleActionDestinationInput {
  /** Offering key to which the downgrade should be executed */
  offeringKey: string;

  /** Set of usage limits */
  usageLimits?: UsageLimitInput[];
}

export interface UncollectibleActionDestinationResponse {
  offeringKey: string;
  usageLimits?: UsageLimitResponse[];
}

/**
 * Determines the dunning action for paid offerings of the product
 */
export interface UncollectibleActionInput {
  /** Provides details for destination offering in case of DOWNGRADE action type */
  destination?: UncollectibleActionDestinationInput;

  /** Type of UncollectibleAction. Eg CANCEL or DOWNGRADE */
  type: "DOWNGRADE" | "CANCEL";
}

export interface UncollectibleActionResponse {
  destination?: UncollectibleActionDestinationResponse;
  type: "DOWNGRADE" | "CANCEL";
}

export interface UpdateInvoiceGroupInput {
  defaultPaymentMethod?: string;
  memo?: string;
  name?: string;
  purchaseOrder?: PurchaseOrderInput;
  shipToParty?: string;
}

/**
 * UpdatePromotionRequest
 */
export interface UpdatePromotionDetailsRequestV2 {
  /** valid applicationReason or null */
  applicationReason?: ApplicationReasonRequestDto;
  benefits: (DiscountDto | OverRideDto)[];

  /** valid eligibilityRules or null */
  eligibilityRules?: EligibilityRuleDto;

  /** Time should be in epoch millis */
  eligiblePromotionWindow: EligiblePromotionWindowRequest;

  /** valid metadata or null */
  metadata?: Record<string, string | null>;

  /** valid promotion status or null */
  status?:
    | "DRAFTED"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED"
    | "WITHDRAWN"
    | "INACTIVE"
    | null;
  title: string;
  type:
    | "TRIAL_EXTENSION"
    | "LIST_PRICE"
    | "LOYALTY_DISCOUNT"
    | "LIST_PRICE_ADJUSTMENT"
    | "PROMO_CODE"
    | "DISCRETIONARY_DISCOUNT"
    | "PARTNER_DISCOUNT";

  /** @format int32 */
  version?: number;
}

/**
 * UpdatePromotionEventStatusRequest
 */
export interface UpdatePromotionEventStatusRequest {
  event: "ACTIVATE" | "EXPIRE" | "CANCEL" | "WITHDRAW";

  /** @format int32 */
  version: number;
}

export type UpdatePromotionResponse = object;

/**
 * Set of usage limits
 */
export interface UsageLimitInput {
  /** Charge element for which usageLimit is defined */
  chargeElement: string;

  /**
   * Value of usage limit
   * @format int64
   */
  value: number;
}

export interface UsageLimitResponse {
  chargeElement: string;

  /** @format int64 */
  value: number;
}

export interface UsageUpdateCadenceInput {
  /** Name of the usage update cadence */
  name: string;
}

export interface UsageUpdateCadenceResponse {
  /** @format int32 */
  cadenceIntervalMinutes: number;
  name: string;
}

export interface User {
  id: string;
}

export interface UsersListDto {
  data?: User[];
}

export interface ValidationErrorDetails {
  validationErrors?: ValidationErrorMessage[];
}

export interface ValidationErrorMessage {
  code?: string;
  fieldName?: string;
  validationMessage?: string;
}

export interface Validity {
  errors?: Outcome[];
  valid?: boolean;
  warnings?: Outcome[];
}

export interface V1OrdersCreateParams {
  errorResponseVersion?: string;
}

export type UpdatePriceEligibility1Payload = Record<string, boolean>;

export interface V1EntitlementTemplatesListParams {
  /**
   * Pagination size
   * @format int32
   * @min 1
   * @max 50
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;
}

export interface V1EntitlementTemplatesDetailParams {
  /** @format int64 */
  version?: number;
  key: string;
}

export interface V1EntitlementTemplatesHistoryDetailParams {
  /**
   * Pagination size
   * @format int32
   * @min 1
   * @max 50
   */
  pageSize?: number;

  /** Pagination offset cursor using entitlement template version */
  startId?: string;
  key: string;
}

export interface V1EntitlementsChildrenDetailParams {
  /** Child entitlement status */
  status?: string;

  /** Pagination offset cursor */
  startId?: string;

  /**
   * Page size
   * @format int32
   * @min 1
   * @max 100
   */
  pageSize?: number;

  /** Entitlement ID */
  entitlementId: string;
}

export interface GetInvoiceGroups1Params {
  pageRequest: PageRequest;
}

export interface GetPendingInvoiceRequestsParams {
  pageRequest: PageRequest;
  id: string;
}

export interface GetInvoices1Params {
  invoiceGroup?: string;

  /** PAID Includes invoices with status PAID or DEFERRED_PAID, UNPAID Includes invoices with status OPEN or UNCOLLECTIBLE. */
  statusFilter?: "PAID" | "UNPAID";
  paging: PageRequest;
}

export interface V1OfferingsListParams {
  /**
   * Pagination size
   * @format int32
   * @min 1
   * @max 50
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;
}

export type V1OfferingsFetchBatchCreatePayload = string[];

export interface V1OfferingsChildrenDetailParams {
  /**
   * Pagination size
   * @format int32
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;
  keyOrSlug: string;
}

export interface V1OfferingsPricingPlanTransitionsDetailParams {
  /** currency ISO-4217 code */
  currency?: "USD" | "JPY";

  /** cycle name (MONTHLY, ANNUAL) */
  cycle?: "MONTHLY" | "ANNUAL";

  /** type COMMERCIAL or as defined per synthetic templates */
  type?: string;
  keyOrSlug: string;
}

export interface V1OfferingsPricingPlansDetailParams {
  /** currency ISO-4217 code */
  currency?: "USD" | "JPY";

  /** cycle name (MONTHLY, ANNUAL) */
  cycle?: "MONTHLY" | "ANNUAL";

  /** type COMMERCIAL or as defined per synthetic templates */
  type?: string;

  /**
   * Pagination size
   * @format int32
   * @min 1
   * @max 50
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;
  keyOrSlug: string;
}

export type V1OfferingsSyntheticsGenerateCreatePayload =
  GenerateSyntheticPlansInput[];

export interface V1OrderItemsListParams {
  /** EntitlementId */
  entitlementId: string;

  /**
   * Pagination size
   * @format int32
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;

  /** OrderItemId */
  orderItemId?: string;
}

export interface V1OrdersCreateParams5 {
  errorResponseVersion?: string;
}

export interface GetPaymentMethods1Params {
  pageRequest: PageRequest;
}

export interface V1PricingPlansListParams {
  /**
   * Pagination size
   * @format int32
   * @min 1
   * @max 50
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;
}

export interface V1PricingPlansTransitionsDetailParams {
  /** currency ISO-4217 code */
  currency?: "USD" | "JPY";

  /** cycle name (MONTHLY, ANNUAL) */
  cycle?: "MONTHLY" | "ANNUAL";

  /** type COMMERCIAL or as defined per synthetic templates */
  type?: string;
  key: string;
}

export interface V1ProductsListParams {
  /**
   * Pagination size
   * @format int32
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;
}

export interface V1ProductsOfferingGroupsDetailParams {
  /**
   * Pagination size
   * @format int32
   * @min 1
   * @max 50
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;
  productKey: string;
}

export interface V1ProductsOfferingsDetailParams {
  /**
   * Pagination size
   * @format int32
   * @min 1
   * @max 50
   */
  pageSize?: number;

  /** Pagination offset cursor */
  startId?: string;
  productKey: string;
}

export interface GetAllParams {
  pageRequest: PageRequest;
}

export type UpdatePriceEligibilityPayload = Record<string, boolean>;
