import { handler } from './handler';
import { ALBEvent } from './types';
import { integratorStatus, webhooksHandler } from './routes';

jest.mock('./lib/auth');
jest.mock('./lib/Logger');
jest.mock('./routes', () => ({
  integratorStatus: jest.fn(() => 'integrator-status-ok'),
  webhooksHandler: jest.fn(() => 'webhooks-ok'),
}));
jest.unmock('./handler');

describe('Handler', () => {
  const defaultEvent: Readonly<ALBEvent> = {
    httpMethod: 'get',
    path: '/foo',
    body: '{}',
    isBase64Encoded: false,
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delegate to integrator-status route for POST:/integrator-status requests', async () => {
    expect(integratorStatus).not.toHaveBeenCalled();
    const event = {
      ...defaultEvent,
      httpMethod: 'post',
      path: '/integrator-status',
    };
    const response = await handler(event);
    expect(integratorStatus).toHaveBeenCalledWith(event);
    expect(response).toBe('integrator-status-ok');
  });

  it('should delegate to webhooks route for POST:/webhooks requests', async () => {
    expect(webhooksHandler).not.toHaveBeenCalled();
    const event = {
      ...defaultEvent,
      httpMethod: 'post',
      path: '/webhooks',
    };
    const response = await handler(event);
    expect(webhooksHandler).toHaveBeenCalledWith(event);
    expect(response).toBe('webhooks-ok');
  });

  it('should return 404 for all other requests', async () => {
    expect(webhooksHandler).not.toHaveBeenCalled();
    const event = {
      ...defaultEvent,
      httpMethod: 'post',
      path: '/does-not-exist',
    };
    const response = await handler(event);
    expect(integratorStatus).not.toHaveBeenCalled();
    expect(webhooksHandler).not.toHaveBeenCalled();
    expect(response).toMatchObject({ statusCode: 404 });
  });
});
