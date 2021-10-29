import { ConsoleMock, mockConsole } from '../__tests__/_console-mock';

import transformer from './skip-webdriver-test-transfomer';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

const options: { [key: string]: string } = {
  parser: 'ts',
  testName: 'some test',
  comment: 'some codemod comment',
};
const optionsWithoutComment = [options]
  .map(({ comment, ...rest }) => rest)
  .pop();

describe('skip BrowserTestCase integration tests', () => {
  let consoleMock: ConsoleMock;

  beforeAll(() => {
    // Silence logs
    consoleMock = mockConsole();
  });

  beforeEach(() => {
    consoleMock.clearMocks();
  });

  afterEach(() => {
    // Ensure the transformer doesn't use `console.warn` or `console.error` as these would cause an error.
    consoleMock.assertSafeConsole();
  });

  defineInlineTest(
    transformer,
    options,
    `
    BrowserTestCase(
      'some test',
      {},
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    BrowserTestCase(
      'some test',
      {
        skip: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should add skip property with wildcard and add codemod comment',
  );

  defineInlineTest(
    transformer,
    optionsWithoutComment,
    `
    BrowserTestCase(
      'some test',
      {},
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    BrowserTestCase(
      'some test',
      {
        skip: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should add skip property with wildcard without adding a codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    BrowserTestCase(
      'some test',
      {
        skip: [],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    BrowserTestCase(
      'some test',
      {
        skip: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should insert wildcard into skip array and add codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    BrowserTestCase(
      'some test',
      {
        skip: ['chrome', 'firefox'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    BrowserTestCase(
      'some test',
      {
        // skip: ['chrome', 'firefox'],
        skip: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should comment out the existing skip property, then replace skip property with wildcard and add codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    const skipArray = ['chrome', 'firefox'];

    BrowserTestCase(
      'some test',
      {
        skip: skipArray,
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    const skipArray = ['chrome', 'firefox'];

    // some codemod comment
    BrowserTestCase(
      'some test',
      {
        // skip: skipArray,
        skip: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should comment out the existing skip property with externally referenced array, then replace skip property with wildcard and add codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    const options = { skip: ['chrome', 'firefox'] }
    BrowserTestCase(
      'some test',
      options,
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    const options = { skip: ['chrome', 'firefox'] }
    BrowserTestCase(
      'some test',
      options,
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should abort if the options are externally referenced',
  );

  defineInlineTest(
    transformer,
    options,
    `
    // some codemod comment
    BrowserTestCase(
      'some test',
      {
        // skip: ['chrome', 'firefox'],
        skip: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    BrowserTestCase(
      'some test',
      {
        // skip: ['chrome', 'firefox'],
        skip: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should not apply changes if a test is already skipped',
  );

  // BrowserTestCaseOptions currently only has a single `skip` property, but this test ensures it will work if it's ever extended in the future.
  defineInlineTest(
    transformer,
    options,
    `
    BrowserTestCase(
      'some test',
      {
        foo: true,
        skip: ['chrome', 'firefox'],
        bar: 'hello world',
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    BrowserTestCase(
      'some test',
      {
        foo: true,
        // skip: ['chrome', 'firefox'],
        skip: ['*'],
        bar: 'hello world',
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should retain all other properties declared within the browser options',
  );
});
