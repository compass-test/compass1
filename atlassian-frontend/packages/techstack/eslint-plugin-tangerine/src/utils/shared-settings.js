/**
 * @file getErrorMessage - Retrieve a custom error message from options and/or shared settings
 */
const get = require('lodash/get');

const guidelinesPlaceholder = '#guidelines#';

const insertGuidelinesPrefix = (message, context) => {
  const defaultPrefix =
    'https://github.com/atlassian/frontend/tree/master/guides';
  const sharedPrefix = get(context, 'settings.tangerine.guidelinesSitePrefix');

  return message.replace(guidelinesPlaceholder, sharedPrefix || defaultPrefix);
};

const getErrorMessage = context => {
  const optionMessage = get(context, 'options[0].message');
  const sharedMessage = get(context, 'settings.tangerine.message');

  return [optionMessage, sharedMessage]
    .filter(Boolean)
    .map(msg => insertGuidelinesPrefix(msg, context))
    .join('; ');
};

module.exports = {
  getErrorMessage,
  guidelinesPlaceholder,
};
