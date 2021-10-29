import { ConsoleMock, mockConsole } from '../__tests__/_console-mock';

import transformer from './skip-spec-style-test-transformer';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

const options = {
  parser: 'ts',
  testName: 'some test',
  comment: 'some codemod comment',
};

const optionsWithAncestorLabels = {
  ...options,
  ancestorLabels: 'some test suite',
};

const optionsWithMultiAncestorLabels = {
  ...options,
  ancestorLabels: 'some test suite › Theme: dark',
};

const optionsPrintF = { ...options, testName: `should add (%i, %i)` };
const optionsInterpolated = { ...options, testName: 'some passed value test' };

describe('skip spec-style tests', () => {
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
    it('some test', () => {
      expect(true).toBe(true);
    });
    `,
    `
    // some codemod comment
    it.skip('some test', () => {
      expect(true).toBe(true);
    });
    `,
    'should replace "it()" with "it.skip()" and add codemod comment',
  );
  defineInlineTest(
    transformer,
    optionsWithAncestorLabels,
    `
    describe('some test suite', () => {
      it('some test', () => {
        expect(true).toBe(true);
      });
    })
    `,
    `
    describe('some test suite', () => {
      // some codemod comment
      it.skip('some test', () => {
        expect(true).toBe(true);
      });
    })
    `,
    'should replace "it()" with "it.skip()" inside nested "describe" blocks and add codemod comment',
  );
  defineInlineTest(
    transformer,
    options,
    `
      test('some test', () => {
        expect(true).toBe(true);
      });
    `,
    `
      // some codemod comment
      test.skip('some test', () => {
        expect(true).toBe(true);
      });
    `,
    'should replace "test()" with "test.skip()" and add codemod comment',
  );
  defineInlineTest(
    transformer,
    optionsWithAncestorLabels,
    `
    describe('some test suite', () => {
      test('some test', () => {
        expect(true).toBe(true);
      });
    })
    `,
    `
    describe('some test suite', () => {
      // some codemod comment
      test.skip('some test', () => {
        expect(true).toBe(true);
      });
    })
    `,
    'should replace "test()" with "test.skip()" inside nested "describe" blocks and add codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    describe('some test', () => {
      it('test case', () => {
        expect(true).toBe(true);
      })
    });
    `,
    `
    // some codemod comment
    describe.skip('some test', () => {
      it('test case', () => {
        expect(true).toBe(true);
      })
    });
    `,
    'should replace "describe()" with "describe.skip()" and add codemod comment',
  );

  defineInlineTest(
    transformer,
    optionsWithMultiAncestorLabels,
    `
    describe('some test suite', () => {
      describe.each(['light','dark'])(\`Theme: $\{e} \`, (theme) => {
        test('some test', () => {
          expect(true).toBe(true);
        });
      })
    })
    `,
    `
    describe('some test suite', () => {
      describe.each(['light','dark'])(\`Theme: $\{e} \`, (theme) => {
        // some codemod comment
        test.skip('some test', () => {
          expect(true).toBe(true);
        });
      })
    })
    `,
    'should replace "test()" with "test.skip()" inside nested "describe" blocks with wildcard characters and add codemod comment',
  );

  defineInlineTest(
    transformer,
    options,
    `
    it(\`some \${example} test\`, () => {
      expect(true).toBe(true);
    });
    `,
    `
    // some codemod comment
    it.skip(\`some \${example} test\`, () => {
      expect(true).toBe(true);
    });
    `,
    'should replace "it()" with "it.skip()" when test name is a template literal and fuzzy matches testName and add codemod comment',
  );
  defineInlineTest(
    transformer,
    options,
    `
    it('some other test', () => {
      expect(true).toBe(true);
    });
    `,
    `
    it('some other test', () => {
      expect(true).toBe(true);
    });
    `,
    'should not replace "it()" with "it.skip()" if it doesnt match testName',
  );
  defineInlineTest(
    transformer,
    options,
    `
    it("some test", () => {
      cy.get("@testContent").then((content) => {
        cy.visit(content.url);
      });
    });
    `,
    `
    // some codemod comment
    it.skip("some test", () => {
      cy.get("@testContent").then((content) => {
        cy.visit(content.url);
      });
    });
    `,
    'should replace "it()" with "it.skip()" in cypress testing context and add codemod comment',
  );
  defineInlineTest(
    transformer,
    optionsPrintF,
    `
    test.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])(\`should add (%i, %i)\`, (a, b, expected) => {
      test(\`returns $\{expected}\`, () => {
        expect(a + b).toBe(expected); // will not be ran
      });
    });
    `,
    `
    // some codemod comment
    test.skip.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])(\`should add (%i, %i)\`, (a, b, expected) => {
      test(\`returns $\{expected}\`, () => {
        expect(a + b).toBe(expected); // will not be ran
      });
    });
    `,
    'should replace "test.each()" with "test.skip.each()" and add codemod comment',
  );
  defineInlineTest(
    transformer,
    optionsPrintF,
    `
    it.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])('should add (%i, %i)', (a, b, expected) => {
      test(\`returns $\{expected}\`, () => {
        expect(a + b).toBe(expected); // will not be ran
      });
    });
    `,
    `
    // some codemod comment
    it.skip.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])('should add (%i, %i)', (a, b, expected) => {
      test(\`returns $\{expected}\`, () => {
        expect(a + b).toBe(expected); // will not be ran
      });
    });
    `,
    'should replace "it.each()" with "it.skip.each()" and add codemod comment',
  );
  defineInlineTest(
    transformer,
    { ...options, testName: `should remove (%i, %i)` },
    `
    test.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])('should add (%i, %i)', (a, b, expected) => {
      test(\`returns $\{expected}\`, () => {
        expect(a + b).toBe(expected); // will not be ran
      });
    });
    `,
    `
    test.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])('should add (%i, %i)', (a, b, expected) => {
      test(\`returns $\{expected}\`, () => {
        expect(a + b).toBe(expected); // will not be ran
      });
    });
    `,
    'should not replace "test.each()" with "test.skip.each()" if it doesnt match testName',
  );
  defineInlineTest(
    transformer,
    optionsPrintF,
    `
    notJest.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])('should add (%i, %i)', (a, b, expected) => {
      test(\`returns $\{expected}\`, () => {
        expect(a + b).toBe(expected); // will not be ran
      });
    });
    `,
    `
    notJest.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])('should add (%i, %i)', (a, b, expected) => {
      test(\`returns $\{expected}\`, () => {
        expect(a + b).toBe(expected); // will not be ran
      });
    });
    `,
    'should not modify non-test ".each()" calls',
  );
  defineInlineTest(
    transformer,
    optionsInterpolated,
    `
    it('some passed %s', () => {
      cy.get("@testContent").then((content) => {
        cy.visit(content.url);
      });
    });
    `,
    `
    // some codemod comment
    it.skip('some passed %s', () => {
      cy.get("@testContent").then((content) => {
        cy.visit(content.url);
      });
    });
    `,
    `should replace "it()" with "it.skip()" and add codemod comment
    for a string with parameterised test - format specifier`,
  );

  describe('Template Literals', () => {
    defineInlineTest(
      transformer,
      optionsInterpolated,
      `
      it(\`some $\{somevalue} test\`, () => {
        cy.get("@testContent").then((content) => {
          cy.visit(content.url);
        });
      });
      `,
      `
      // some codemod comment
      it.skip(\`some $\{somevalue} test\`, () => {
        cy.get("@testContent").then((content) => {
          cy.visit(content.url);
        });
      });
      `,
      `should replace "it()" with "it.skip()" and add codemod comment
      for a string with template literal`,
    );
  });
});
