export class ResponseCode {
  static readonly OK = new ResponseCode(200, 'OK');
  static readonly CREATED = new ResponseCode(201, 'Created');
  static readonly BAD_REQUEST = new ResponseCode(400, 'Bad Request');
  static readonly UNAUTHORIZED = new ResponseCode(401, 'Unauthorized');
  static readonly FORBIDDEN = new ResponseCode(403, 'Forbidden');
  static readonly NOT_FOUND = new ResponseCode(404, 'Not Found');
  static readonly ERROR = new ResponseCode(500, 'Internal Server Error');

  private constructor(
    public readonly code: number,
    public readonly description: string,
  ) {}
}

export interface Response {
  statusCode: number;
  statusDescription: string;
  isBase64Encoded: boolean;
  headers: Headers;
  body?: string;
}

export interface Headers {
  [key: string]: string;
}

export const response = (
  responseCode: ResponseCode,
  body?: any,
  headers?: Headers,
): Response => {
  let _headers: Headers = {};
  let responseBody;

  if (typeof body === 'string') {
    _headers['Content-type'] = 'text/plain';
    responseBody = body;
  } else if (body) {
    _headers['Content-type'] = 'application/json';
    responseBody = JSON.stringify(body);
  }

  return {
    statusCode: responseCode.code,
    statusDescription: responseCode.description,
    isBase64Encoded: false,
    headers: {
      ..._headers,
      ...headers,
    },
    body: responseBody || undefined,
  };
};
