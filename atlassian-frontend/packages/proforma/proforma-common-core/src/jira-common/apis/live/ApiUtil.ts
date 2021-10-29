import { NoticeType } from '../../components/Notice/noticeTypes';
import { ApiError, constructApiError } from '../../models/ApiError';
import { BackendSettingUrls } from '../../models/BackendSettings';
import { AuthUtil } from '../../utils/auth/AuthUtil';
import { ErrorUtils } from '../../utils/ErrorUtils';

export type ResponseType = 'json' | 'blob' | 'text' | 'none';

export enum AcceptedResponseType {
  Json = 'json',
  Blob = 'blob',
}

export class ApiUtil {
  private readonly authUtil: AuthUtil;
  private readonly errorUtils: ErrorUtils;
  private readonly urls: BackendSettingUrls;

  public constructor(
    urls: BackendSettingUrls,
    authUtil: AuthUtil,
    errorUtils: ErrorUtils,
  ) {
    this.authUtil = authUtil;
    this.errorUtils = errorUtils;
    this.urls = urls;
  }

  public get(
    path: string,
    responseType: AcceptedResponseType = AcceptedResponseType.Json,
  ): Promise<any> {
    return this.fetchApi(true, 'GET', path, responseType);
  }

  public jiraGet(
    path: string,
    responseType: AcceptedResponseType = AcceptedResponseType.Json,
  ): Promise<any> {
    return this.fetchApi(false, 'GET', path, responseType);
  }

  public put(
    path: string,
    body: any,
    responseType: AcceptedResponseType | 'none' = AcceptedResponseType.Json,
  ): Promise<any> {
    return this.fetchApi(true, 'PUT', path, responseType, body);
  }

  public post(
    path: string,
    body: any,
    responseType: AcceptedResponseType = AcceptedResponseType.Json,
  ): Promise<any> {
    return this.fetchApi(true, 'POST', path, responseType, body);
  }

  public jiraPost(
    path: string,
    body: any,
    responseType: AcceptedResponseType = AcceptedResponseType.Json,
  ): Promise<any> {
    return this.fetchApi(false, 'POST', path, responseType, body);
  }

  public delete(
    path: string,
    body?: any,
    responseType: ResponseType = 'none',
  ): Promise<any> {
    return this.fetchApi(true, 'DELETE', path, responseType, body);
  }

  /** Converts the `relativePath` into an absolute ProForma API URI. */
  public createApiUrl(relativePath: string): string {
    return (
      this.urls.api + (relativePath.charAt(0) === '/' ? '' : '/') + relativePath
    );
  }

  /** Converts the `relativePath` into an absolute Jira URI. */
  public createJiraUrl(relativePath: string): string {
    return (
      this.urls.jira +
      (relativePath.charAt(0) === '/' ? '' : '/') +
      relativePath
    );
  }

  protected fetchApi(
    proForma: boolean,
    method: string,
    path: string,
    responseType: ResponseType,
    body?: any,
  ): Promise<any> {
    const { authToken } = this.authUtil;
    return fetch(
      proForma ? this.createApiUrl(path) : this.createJiraUrl(path),
      {
        method,
        credentials: 'same-origin',
        headers: {
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
          'Content-Type': 'application/json',
        },
        ...(body && { body: JSON.stringify(body) }),
      },
    ).then(response => {
      if (!response.ok) {
        this.errorUtils.reportError(new Error(response.statusText));
        try {
          // Try to parse response error details
          const responseJsonApiError =
            responseType !== 'json'
              ? undefined
              : response
                  .json()
                  .then((responseJson: any) =>
                    toApiError(response.status, responseJson),
                  );
          if (response.status === 401) {
            this.errorUtils.notifyUser(NoticeType.ErrorApiUnauthorised);
          }
          if (response.status === 403) {
            this.errorUtils.notifyUser(NoticeType.ErrorApiMissingPermissions);
          }
          if (responseJsonApiError !== undefined) {
            return responseJsonApiError.then(apiError =>
              Promise.reject(apiError),
            );
          }
          // Create error object with error response body
          return Promise.reject(
            toApiError(response.status, { error: response.body || '' }),
          );
        } catch (error) {
          const message = `Unexpected response from API: ${
            response.body || ''
          }`;
          return Promise.reject(
            toApiError(response.status, { error: message }),
          );
        }
      }
      if (response.status === 204) {
        return '';
      }
      switch (responseType) {
        case 'json':
          return response.json();
        case 'blob':
          return response.blob();
        case 'text':
          return response.text();
        case 'none':
          return '';
        default:
          return response;
      }
    });
  }
}

function toApiError(status: number, responseJson: any): ApiError {
  if (Object.keys(responseJson).length === 0) {
    return constructApiError(`Unexpected API reply (HTTP/${status})`, status);
  }
  const error =
    responseJson['error'] || `Unexpected API reply (HTTP/${status})`;
  const context = responseJson['context'];
  const contextId = responseJson['contextId'];
  const details = responseJson['details'];
  return constructApiError(error, status, context, contextId, details);
}
