import { CompressionRule } from '@atlassiansox/analytics-web-client';

import { buildCompressionFunction, canCompress } from '../../src';
import invalidEvents from '../fixtures/invalid-feature-exposed-events.json';
import validEvents from '../fixtures/valid-feature-exposed-events.json';

const getCompressorForBatchSize = (batchSize: number) =>
  new CompressionRule(canCompress, buildCompressionFunction(batchSize));

describe('compressor', () => {
  describe('events argument', () => {
    test('should compress all normal events', () => {
      expect(
        getCompressorForBatchSize(50).compress(validEvents),
      ).toMatchSnapshot();
    });
    test('should default to uncompressed events for invalid events and skip those with no attributes', () => {
      expect(
        getCompressorForBatchSize(50).compress(invalidEvents),
      ).toMatchSnapshot();
    });

    test('should return empty list if events list is empty', () => {
      expect(getCompressorForBatchSize(50).compress([])).toMatchSnapshot([]);
    });
  });

  describe('batchSize argument', () => {
    test('should compress all normal events into batches of 2 events', () => {
      expect(
        getCompressorForBatchSize(2).compress(validEvents),
      ).toMatchSnapshot();
    });

    test('should throw if batchSize is invalid', () => {
      expect(() => getCompressorForBatchSize(-1).compress(validEvents)).toThrow(
        'Batch size must be greater than 0',
      );
      expect(() => getCompressorForBatchSize(0).compress(validEvents)).toThrow(
        'Batch size must be greater than 0',
      );
    });

    test('should compress to one batch if batchSize is larger than events list length', () => {
      expect(
        getCompressorForBatchSize(10).compress(validEvents),
      ).toMatchSnapshot();
    });

    test('should compress to correct number of batches when events list length is not a multiple of batchSize', () => {
      expect(
        getCompressorForBatchSize(4).compress(validEvents),
      ).toMatchSnapshot();
    });
  });
});
