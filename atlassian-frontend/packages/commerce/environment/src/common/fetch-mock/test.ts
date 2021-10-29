import { fetchMock } from './index';

const jsonBody = (json: object | string | number | boolean) =>
  new Blob([JSON.stringify(json)], {
    type: 'application/json',
  });

describe('fetchMock', () => {
  const url = '/test';

  it('returns response on matching request', async () => {
    const fetch = fetchMock([
      {
        request: (req) => req.url === url && req.method === 'POST',
        response: new Response(),
      },
    ]);

    await expect(fetch(url, { method: 'POST' })).resolves.toEqual(
      new Response(),
    );
  });

  it('throws if there is no requests', async () => {
    const fetch = fetchMock([
      { request: () => false, response: new Response() },
    ]);

    expect(() => fetch(url)).toThrow();
  });

  it('throws on multiple matching requests', async () => {
    const fetch = fetchMock([
      { request: () => true, response: new Response() },
      { request: () => true, response: new Response() },
    ]);

    expect(() => fetch(url)).toThrow();
  });

  it('allows to read response body stream multiple times', async () => {
    const fetch = fetchMock([
      {
        request: () => true,
        response: new Response(jsonBody({ message: 'test' })),
      },
    ]);

    const result1 = fetch(url).then((res) => res.json());
    await expect(result1).resolves.toEqual({ message: 'test' });

    const result2 = fetch(url).then((res) => res.json());
    await expect(result2).resolves.toEqual({ message: 'test' });
  });

  it('handles response promise on matching request', async () => {
    const fetch = fetchMock([
      { request: () => true, response: Promise.resolve(new Response()) },
    ]);

    const result = fetch(url);

    await expect(result).resolves.toEqual(new Response());
  });

  it('handles response generating function on matching request', async () => {
    const responseGenerator = async (req: Request) => {
      return new Response(
        jsonBody({ requestUrl: req.url, requestBody: await req.text() }),
      );
    };
    const fetch = fetchMock([
      { request: () => true, response: responseGenerator },
    ]);

    const result = fetch(url, {
      method: 'POST',
      body: 'test message',
    }).then((res) => res.json());

    await expect(result).resolves.toEqual({
      requestUrl: url,
      requestBody: 'test message',
    });
  });

  it('handles returning different responses on matching requests', async () => {
    const response1 = new Response(jsonBody('first'));
    const response2 = new Response(jsonBody('second'));
    const fetch = fetchMock([
      { request: () => true, response: [response1, response2] },
    ]);

    const result1 = fetch(url).then((res) => res.json());
    await expect(result1).resolves.toBe('first');

    const result2 = fetch(url).then((res) => res.json());
    await expect(result2).resolves.toBe('second');
  });

  it('throws when requested more time than provided responses', async () => {
    const response1 = new Response(jsonBody('first'));
    const response2 = new Response(jsonBody('second'));
    const fetch = fetchMock([
      { request: () => true, response: [response1, response2] },
    ]);

    await fetch(url);
    await fetch(url);
    expect(() => fetch(url)).toThrow();
  });
});
