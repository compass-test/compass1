import { withMetrics } from '../../../src/custom-ui/metrics';
import { catalog } from '@atlassiansox/metal-client';

const flushPromises = () => new Promise(setImmediate);

describe('withMetrics', () => {
  const page = 'foo';

  it('sends success and duration metrics', async () => {
    const bridgeMethod = jest.fn().mockResolvedValue({});
    const submitMetric = jest.fn();
    const wrapped = withMetrics({ invoke: bridgeMethod }, submitMetric, page);

    await wrapped.invoke('payload');
    await flushPromises();

    expect(bridgeMethod).toHaveBeenCalledTimes(1);
    expect(bridgeMethod).toHaveBeenLastCalledWith('payload');
    expect(submitMetric).toHaveBeenCalledTimes(2);
    expect(submitMetric).toHaveBeenCalledWith({
      task: 'bridge',
      taskId: 'invoke',
      page,
      name: catalog.userInteraction.TASK_SUCCESS,
    });
    expect(submitMetric).toHaveBeenCalledWith({
      task: 'bridge',
      taskId: 'invoke',
      page,
      name: catalog.userInteraction.TASK_DURATION,
      value: expect.any(Number),
    });
  });
  it('sends failure metrics', async () => {
    const err = new Error('foo');
    const bridgeMethod = jest.fn().mockRejectedValue(err);
    const submitMetric = jest.fn();
    const wrapped = withMetrics({ invoke: bridgeMethod }, submitMetric, page);

    await expect(wrapped.invoke('payload')).rejects.toEqual(err);
    await flushPromises();

    expect(bridgeMethod).toHaveBeenCalledTimes(1);
    expect(bridgeMethod).toHaveBeenLastCalledWith('payload');
    expect(submitMetric).toHaveBeenCalledTimes(1);
    expect(submitMetric).toHaveBeenCalledWith({
      task: 'bridge',
      taskId: 'invoke',
      page,
      name: catalog.userInteraction.TASK_FAILURE,
    });
  });
});
