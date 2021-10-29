// See https://tools.ietf.org/html/rfc6749#section-4.1.2.1
// 'auth_window_closed' is returned in addition to types from this RFC,
// representing when the authentication window is closed by the user
export type AuthErrorType =
  | 'auth_window_closed'
  | 'invalid_request'
  | 'unauthorized_client'
  | 'access_denied'
  | 'unsupported_response_type'
  | 'invalid_scope'
  | 'server_error'
  | 'temporarily_unavailable';

export const isOfTypeAuthError = (
  inputString: string,
): inputString is AuthErrorType => {
  return [
    'auth_window_closed',
    'invalid_request',
    'unauthorized_client',
    'access_denied',
    'unsupported_response_type',
    'invalid_scope',
    'server_error',
    'temporarily_unavailable',
  ].includes(inputString);
};
