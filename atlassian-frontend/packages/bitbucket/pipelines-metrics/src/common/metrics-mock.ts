import { Metric } from '../types';

export const memoryMetrics: Metric[] = [
  {
    timestamp: '2020-06-03T00:55:57Z',
    values: {
      build: 800,
      docker: 2000,
      mysql: 500,
    },
  },
  {
    timestamp: '2020-06-03T00:56:57Z',
    values: {
      build: 1024,
      docker: 4096,
      mysql: 2000,
    },
  },
  {
    timestamp: '2020-06-03T00:57:57Z',
    values: {
      build: 110,
      docker: 0,
      mysql: 10,
    },
  },
  {
    timestamp: '2020-06-03T00:58:57Z',
    values: {
      build: 0,
      docker: 0,
      mysql: 500,
    },
  },
  {
    timestamp: '2020-06-03T00:59:57Z',
    values: {
      build: 0,
      docker: 0,
      mysql: 0,
    },
  },
];

export const cpuMetrics: Metric[] = [
  {
    timestamp: '2020-06-03T00:45:57Z',
    values: {
      build: 1000,
      docker: 500,
      mysql: 1000,
      nginx: 100,
    },
  },
  {
    timestamp: '2020-06-03T00:56:25Z',
    values: {
      build: 100,
      docker: 500,
      mysql: 1000,
      nginx: 100,
    },
  },
  {
    timestamp: '2020-06-03T00:57:17Z',
    values: {
      build: 500,
      docker: 500,
      mysql: 400,
      nginx: 200,
    },
  },
  {
    timestamp: '2020-06-03T00:58:37Z',
    values: {
      build: 200,
      docker: 200,
      mysql: 200,
      nginx: 500,
    },
  },
  {
    timestamp: '2020-06-03T00:59:15Z',
    values: {
      build: 400,
      docker: 200,
      mysql: 1000,
      nginx: 100,
    },
  },
];
