const outdent = require('outdent');

const { ruleTester } = require('@atlassian/eslint-utils');

const rule = require('./index');

const config = {
  language: 'en-US',
  messageSelectors: ['Literal'],
  additionalWords: {
    caseSensitive: ['Jira'],
    caseInsensitive: ['kanban'],
  },
};

const testValidCase = textToSpellcheck => {
  return {
    code: outdent`
          export const message = "${textToSpellcheck}";
        `,
    options: [config],
  };
};

const testInvalidCase = (textToSpellcheck, errors) => {
  return {
    code: outdent`
          export const message = "${textToSpellcheck}";
        `,
    options: [config],
    errors,
  };
};
ruleTester.run('i18n/messages-are-spelled-correctly', rule, {
  valid: [
    testValidCase(
      'These are some regular boring words that are spelled correctly.',
    ),
    testValidCase('Symbols are not spelling errors: !@#$%^&*()'),
    testValidCase('Numbers are fine: 1234567890'),
    testValidCase(
      'Here are some: http://google.com and https://example.com/foo?a=b&c=d',
    ),
    testValidCase("Fancy apostrophes are fine. For example: can’t vs can't."),
    testValidCase('Here are some variables: {fooBarBaz} {foo_bar_baz}'),
    testValidCase(
      "The standard dictionary doesn't know what kanban or Kanban means!",
    ),
    testValidCase("The standard dictionary doesn't know about Jira either :O"),
  ],
  invalid: [
    testInvalidCase('Uh oh, speling is triky!', [
      outdent`
          It looks like "speling" is spelled incorrectly. Did you mean:
          * Spelling?
          * Spewing?
          * Spieling?
          If this is a false-positive, please add "speling" to the list of additional words specified in the lint rule's configuration.
        `,
      outdent`
          It looks like "triky" is spelled incorrectly. Did you mean:
          * Trike?
          * Tricky?
          * Trixy?
          If this is a false-positive, please add "triky" to the list of additional words specified in the lint rule's configuration.
        `,
    ]),
    testInvalidCase('Uh oh, spexfkkdling is really trcdsmliky!', [
      'It looks like "spexfkkdling" is spelled incorrectly. If this is a false-positive, please add "spexfkkdling" to the list of additional words specified in the lint rule\'s configuration.',
      'It looks like "trcdsmliky" is spelled incorrectly. If this is a false-positive, please add "trcdsmliky" to the list of additional words specified in the lint rule\'s configuration.',
    ]),
    testInvalidCase("Uh oh, JIRA isn't capitalized correctly.", [
      outdent`
          It looks like "JIRA" is spelled incorrectly. Did you mean:
          * Jinx?
          * Jinn?
          * Jive?
          If this is a false-positive, please add "JIRA" to the list of additional words specified in the lint rule's configuration.
        `,
    ]),
    testInvalidCase('HTTPP', [
      outdent`
          It looks like "HTTPP" is spelled incorrectly. Did you mean:
          * HTTP?
          If this is a false-positive, please add "HTTPP" to the list of additional words specified in the lint rule's configuration.
        `,
    ]),
    testInvalidCase(
      "Gosh darn, I just realised we can't use Aussie spelling. What is this organisation coming to? So demoralising! I'm going to go and drown my sorrows in yoghurt.",
      [
        outdent`
          It looks like "realised" is spelled incorrectly. Did you mean:
          * Realized?
          * Realism?
          * Realisms?
          If this is a false-positive, please add "realised" to the list of additional words specified in the lint rule's configuration.
        `,
        outdent`
          It looks like "organisation" is spelled incorrectly. Did you mean:
          * Organization?
          * Organizations?
          If this is a false-positive, please add "organisation" to the list of additional words specified in the lint rule's configuration.
        `,
        outdent`
          It looks like "demoralising" is spelled incorrectly. Did you mean:
          * Demoralizing?
          If this is a false-positive, please add "demoralising" to the list of additional words specified in the lint rule's configuration.
        `,
        outdent`
          It looks like "yoghurt" is spelled incorrectly. Did you mean:
          * Yogurt?
          * Yoghurt's?
          * Yogurts?
          If this is a false-positive, please add "yoghurt" to the list of additional words specified in the lint rule's configuration.
        `,
      ],
    ),
  ],
});
