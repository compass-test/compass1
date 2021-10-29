import { MockOptions, MockResponse, MockResponseFunction } from 'fetch-mock';

type Request = {
  url: string;
};

export type RestResponse = MockResponse | MockResponseFunction;

export interface RestMock<R = RestResponse> extends MockOptions {
  request: Request;
  result: R;
}
