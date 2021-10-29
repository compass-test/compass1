import { ConsoleMock, mockConsole } from '../__tests__/_console-mock';

import transformer from './skip-mobiledriver-test-transformer';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

const options: { [key: string]: string } = {
  parser: 'ts',
  testName: 'some test',
  comment: 'some codemod comment',
};
const optionsWithoutComment = [options]
  .map(({ comment, ...rest }) => rest)
  .pop();

describe('skip MobileTestCase integration tests', () => {
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

  afterAll(() => {
    consoleMock.restoreMocks();
  });

  defineInlineTest(
    transformer,
    options,
    `
    MobileTestCase(
      'some test',
      {},
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    MobileTestCase(
      'some test',
      {
        skipPlatform: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should add skipPlatform property with wildcard and add codemod comment',
  );

  defineInlineTest(
    transformer,
    optionsWithoutComment,
    `
    MobileTestCase(
      'some test',
      {},
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    MobileTestCase(
      'some test',
      {
        skipPlatform: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should add skipPlatform property with wildcard without adding a codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    MobileTestCase(
      'some test',
      {
        skipPlatform: [],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    MobileTestCase(
      'some test',
      {
        skipPlatform: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should insert wildcard into skipPlatform array and add codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    MobileTestCase(
      'some test',
      {
        skipPlatform: ['android', 'ios'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    MobileTestCase(
      'some test',
      {
        // skipPlatform: ['android', 'ios'],
        skipPlatform: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should comment out the existing skipPlatform property, then replace skipPlatform property with wildcard and add codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    MobileTestCase(
      'some test',
      {
        versions: ['android 10'],
        skipPlatform: ['android', 'ios'],
        keyboard: ['gboard'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    MobileTestCase(
      'some test',
      {
        versions: ['android 10'],
        // skipPlatform: ['android', 'ios'],
        skipPlatform: ['*'],
        keyboard: ['gboard'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should retain all other properties declared within the mobile options',
  );

  defineInlineTest(
    transformer,
    options,
    `
    const skipArray = ['android', 'ios'];

    MobileTestCase(
      'some test',
      {
        skipPlatform: skipArray,
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    const skipArray = ['android', 'ios'];

    // some codemod comment
    MobileTestCase(
      'some test',
      {
        // skipPlatform: skipArray,
        skipPlatform: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should comment out the existing skipPlatform property with externally referenced array, then replace skipPlatform property with wildcard and add codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    const options = { skipPlatform: ['android', 'ios'] }
    MobileTestCase(
      'some test',
      options,
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    const options = { skipPlatform: ['android', 'ios'] }
    MobileTestCase(
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
    MobileTestCase(
      'some test',
      {
        // skipPlatform: ['android', 'ios'],
        skipPlatform: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    `
    // some codemod comment
    MobileTestCase(
      'some test',
      {
        // skipPlatform: ['android', 'ios'],
        skipPlatform: ['*'],
      },
      () => {
        expect(true).toBe(true);
      },
    );
    `,
    'should not apply changes if a test is already skipped',
  );
});
