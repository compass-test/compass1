import { ApiErrorType } from './ApiErrorType';
import { ErrorContext, ErrorContextOf } from './ErrorContext';

export interface ApiError {
  error: ApiErrorType;
}

export interface ClientApiError extends ApiError {
  error: ApiErrorType.client;
}

export interface ClientWithDetailsApiError extends ApiError {
  error: ApiErrorType.clientWithDetails;
  context: ErrorContext;
  details: string;
}

export interface InvalidJsonApiError extends ApiError {
  error: ApiErrorType.json;
  details: string;
}

export interface JwtApiError extends ApiError {
  error: ApiErrorType.jwt;
  details: string;
}

export interface UnknownApiError extends ApiError {
  error: ApiErrorType.unknown;
  message: string;
  status: number;
}

export function constructApiError(
  error: string,
  status: number,
  context?: string,
  contextId?: string,
  details?: string,
): ApiError {
  switch (error) {
    case ApiErrorType.client:
      return {
        error: ApiErrorType.client,
      } as ClientApiError;
    case ApiErrorType.clientWithDetails:
      return {
        error: ApiErrorType.clientWithDetails,
        context: ErrorContextOf(context),
        details: details || '',
      } as ClientWithDetailsApiError;
    case ApiErrorType.json:
      return {
        error: ApiErrorType.json,
        details: details || '',
      } as InvalidJsonApiError;
    case ApiErrorType.jwt:
      return {
        error: ApiErrorType.jwt,
        details: details || '',
      } as JwtApiError;
    default:
      return {
        error: ApiErrorType.unknown,
        message: error,
        status: status,
      } as UnknownApiError;
  }
}
