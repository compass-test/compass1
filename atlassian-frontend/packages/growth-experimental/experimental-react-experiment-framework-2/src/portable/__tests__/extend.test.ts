import { useExperiment } from '../../core';
import { usePluginExtend } from '../extend';

const mockExistingPipeline = {
  foo: 'bar',
  answer: 42,
};
const mockExtraAttributes = {
  list: [
    123,
    {
      key: 'value',
    },
  ],
  nested: {
    a: 456,
    b: 'string',
  },
};

describe('usePluginExtend', () => {
  test('should extend pipeline with object literal', () => {
    const pipeline = useExperiment(
      () => mockExistingPipeline,
      usePluginExtend(mockExtraAttributes),
    );

    expect(pipeline).toMatchObject({
      ...mockExistingPipeline,
      ...mockExtraAttributes,
    });
  });

  test('should extend pipeline with result of passed function', () => {
    const pipeline = useExperiment(
      () => mockExistingPipeline,
      usePluginExtend(() => mockExtraAttributes),
    );

    expect(pipeline).toMatchObject({
      ...mockExistingPipeline,
      ...mockExtraAttributes,
    });
  });
});
