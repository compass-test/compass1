import { timed } from '../timing';

describe('timed', () => {
  beforeEach(() => {});

  it('times a promise', async () => {
    const dateMock = jest.fn();
    dateMock.mockImplementationOnce(() => 1).mockImplementationOnce(() => 2);
    global.Date.now = dateMock;
    const value = 'foo';
    const promise = Promise.resolve(value);

    const { durationMs, result } = await timed(promise);

    expect(durationMs).toEqual(1);
    expect(result).toEqual(value);
    expect(dateMock).toHaveBeenCalledTimes(2);
  });
});
