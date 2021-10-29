export interface ResponseStatus {
  code: number;
}

// -- start HTTP error codes --
export class ResponseStatusOk implements ResponseStatus {
  code: number = 200;
}

export interface ResponseStatusNoContent extends ResponseStatus {
  code: 204;
}

export interface ResponseStatusMovedPermanently extends ResponseStatus {
  code: 301;
}

export interface ResponseStatusTemporaryRedirect extends ResponseStatus {
  code: 307;
}

export interface ResponseStatusPermanentRedirect extends ResponseStatus {
  code: 308;
}

export interface ResponseStatusBadRequest extends ResponseStatus {
  code: 400;
}

export interface ResponseStatusUnauthorised extends ResponseStatus {
  code: 401;
}

export interface ResponseStatusForbidden extends ResponseStatus {
  code: 403;
}

export interface ResponseStatusNotFound extends ResponseStatus {
  code: 404;
}

export interface ResponseStatusInternalServerError extends ResponseStatus {
  code: 500;
}

export interface ResponseStatusServiceUnavailable extends ResponseStatus {
  code: 503;
}

export interface ResponseStatusTimeout extends ResponseStatus {
  code: 504;
}
// -- end HTTP error codes --

// -- start custom error codes --
export interface ResponseStatusProFormaBlacklistError extends ResponseStatus {
  code: 496;
}

export interface ResponseStatusWhitelistError extends ResponseStatus {
  code: 497;
}

export interface ResponseStatusInvalidJsonDocument extends ResponseStatus {
  code: 498;
}

export interface ResponseStatusMaxBodyLengthExceeded extends ResponseStatus {
  code: 499;
}
// -- end custom error codes --

export interface ResponseStatusUnhandled extends ResponseStatus {
  code: number;
}
