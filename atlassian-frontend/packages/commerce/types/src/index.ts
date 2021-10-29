export type Opaque<V> = V & { readonly __opq__: unique symbol };

// Cloud Commerce Platform specif types
export type TransactionAccountId = Opaque<string>;
export type HumanReadableTransactionAccountId = Opaque<string>;
export type InvoiceGroupId = Opaque<string>;

// Commerce bossiness types
export type Currency = Opaque<string>;

// Generic types that could be perhaps be shared more widely
export type CountryIsoCode = Opaque<string>;
export type StateIsoCode = Opaque<string>;

export type Language = Opaque<string>;

export type RenewalFrequency = 'monthly' | 'annual';

/**
 * The Epoch milliseconds, timezone is UTC.
 */
export type EpochDateTime = Opaque<number>;
