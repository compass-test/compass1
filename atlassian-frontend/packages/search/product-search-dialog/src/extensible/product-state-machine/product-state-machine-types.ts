export enum APIStates {
  Loading = 'loading',
  Error = 'error',
  NoResult = 'noresult',
  Success = 'success',
}

export enum ProductStates {
  PreQueryLoading = 'PreQueryLoading',
  PostQueryLoading = 'PostQueryLoading',

  PreQuerySuccess = 'PreQuerySuccess',
  PostQuerySuccess = 'PostQuerySuccess',

  PreQueryError = 'PreQueryError',
  PostQueryError = 'PostQueryError',

  PreQueryNoResult = 'PreQueryNoResult',
  PostQueryNoResult = 'PostQueryNoResult',
}
