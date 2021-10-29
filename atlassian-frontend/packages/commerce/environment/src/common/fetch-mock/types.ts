export type RequestPredicate = (req: Request) => boolean;

export type SingleResponse = Response | Promise<Response>;
export type ResponseMock = SingleResponse | SingleResponse[];

export type HttpCallMock = {
  request: RequestPredicate;
  response: ResponseMock | ((req: Request) => ResponseMock);
};
