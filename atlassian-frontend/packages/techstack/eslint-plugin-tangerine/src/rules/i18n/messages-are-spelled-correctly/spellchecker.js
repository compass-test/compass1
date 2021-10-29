const _ = require('lodash');
const SpellChecker = require('simple-spellchecker');

const normalize = text => {
  const normalizeApostrophes = s => s.replace(/’/g, "'");
  const removeUrls = s => s.replace(/https?:\/\/[^ ]+/g, '');
  const removeVariableSubstitution = s => s.replace(/{.+?}/g, '');
  const removeNumbersAndSymbols = s => s.replace(/[^a-zA-Z']/g, ' ');
  const removeSymbolsAtWordBoundaries = s =>
    s
      .replace(/^['-]/, '')
      .replace(/['-]$/, '')
      .replace(/ ['-]/g, ' ')
      .replace(/['-] /g, ' ');

  return _.chain(text)
    .thru(normalizeApostrophes)
    .thru(removeUrls)
    .thru(removeVariableSubstitution)
    .thru(removeNumbersAndSymbols)
    .thru(removeSymbolsAtWordBoundaries)
    .value();
};

const extractWords = text =>
  normalize(text)
    .split(' ')
    .filter(word => word.length > 0);

const createStandardDictionary = language =>
  SpellChecker.getDictionarySync(language);

const createAdditionalWordsDictionary = ({
  caseSensitive,
  caseInsensitive,
}) => {
  const caseSensitiveSet = new Set(caseSensitive);
  const caseInsensitiveSet = new Set(
    caseInsensitive.map(word => word.toLowerCase()),
  );

  const spellCheck = word =>
    caseSensitiveSet.has(word) || caseInsensitiveSet.has(word.toLowerCase());

  return { spellCheck };
};

const createSpellchecker = (language, additionalWords) => {
  const standardDictionary = createStandardDictionary(language);
  const additionalWordsDictionary = createAdditionalWordsDictionary(
    additionalWords,
  );

  const isSpelledCorrectly = word =>
    additionalWordsDictionary.spellCheck(word) ||
    standardDictionary.spellCheck(word);

  const getSuggestions = word => standardDictionary.getSuggestions(word, 3);

  const getSpellingErrors = text =>
    extractWords(text)
      .filter(word => !isSpelledCorrectly(word))
      .map(word => ({ word, suggestions: getSuggestions(word) }));

  return { getSpellingErrors };
};

module.exports = createSpellchecker;
