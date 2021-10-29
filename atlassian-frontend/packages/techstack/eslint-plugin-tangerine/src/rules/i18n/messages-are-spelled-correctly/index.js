/**
 * @file Ensures that i18n messages are spelled correctly
 *
 * Configuration is required. See the schema definition below.
 */

const _ = require('lodash');

const createSpellchecker = require('./spellchecker');

let spellChecker;

const capitalizeIfNecessary = word =>
  /[A-Z]/.test(word) ? word : _.capitalize(word);

const formatSuggestions = suggestions =>
  suggestions
    .map(capitalizeIfNecessary)
    .map(suggestion => `* ${suggestion}?`)
    .join('\n');

const formatSpellingError = ({ word, suggestions }) => {
  const hasSuggestions = suggestions.length > 0;
  const ifHasSuggestions = text => (hasSuggestions ? text : '');

  return `It looks like "${word}" is spelled incorrectly. ${ifHasSuggestions(
    `Did you mean:\n${formatSuggestions(suggestions)}\n`,
  )}If this is a false-positive, please add "${word}" to the list of additional words specified in the lint rule's configuration.`;
};

const reportSpellingErrors = (reportError, textNode) =>
  spellChecker
    .getSpellingErrors(textNode.value)
    .map(formatSpellingError)
    .forEach(errorMessage =>
      reportError({ node: textNode, message: errorMessage }),
    );

module.exports = {
  meta: {
    docs: {
      description: 'Ensures that i18n messages are spelled correctly.',
    },
    schema: [
      {
        type: 'object',
        required: ['language', 'messageSelectors'],
        additionalProperties: false,
        properties: {
          // Language to use for spellchecking (e.g. 'en-US').
          language: {
            type: 'string',
          },
          // ESLint selectors used to identify i18n messages in the codebase.
          messageSelectors: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          // Words that aren't in the standard dictionary, but that should still be considered valid.
          additionalWords: {
            type: 'object',
            required: ['caseSensitive', 'caseInsensitive'],
            additionalProperties: false,
            properties: {
              caseSensitive: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              caseInsensitive: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    ],
  },

  create(context) {
    const [
      {
        language,
        additionalWords = { caseSensitive: [], caseInsensitive: [] },
        messageSelectors,
      },
    ] = context.options;

    if (!spellChecker) {
      spellChecker = createSpellchecker(language, additionalWords);
    }

    const selectorsWithHandlers = messageSelectors.map(messageSelector => [
      messageSelector,
      textNode => reportSpellingErrors(context.report, textNode),
    ]);

    return _.fromPairs(selectorsWithHandlers);
  },
};
