export enum LinkType {
  MAIN_ACTION = 'mainAction',
  ENTITY = 'entity',
  PATH = 'path',
  CHANGEBOARD_LEARN_MORE = 'changeboardLearnMore',
}

export enum SloFailureReason {
  FETCH_FAILED = 'fetch-failed',
  ADF_RENDER_FAILED = 'adf-render-failed',
  ROOT_ERROR_BOUNDARY = 'root-error-boundary',
  ABORT_TIMEOUT = 'abort-timeout',
  UNKNOWN = 'unknown',
}

/* A type for whether a click is cross-product/cross-site. 
We don't know if something is cross-site/cross-product if the
original site and product are not provided, so this is encoded
in the unknown data type. */
export enum CrossType {
  TRUE = 'true',
  FALSE = 'false',
  UNKNOWN = 'unknown',
}
