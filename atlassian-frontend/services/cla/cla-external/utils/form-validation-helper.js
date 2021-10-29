import React from 'react';
import { ErrorMessage } from '@atlaskit/form';
import { characterLimit, githubUsernameRegex } from './constants';

export const validateLength = value =>
  value && value.length > characterLimit ? 'TOO_LONG' : null;

// Validates Github usernames
export const validateLengthAndCharacters = value => {
  if (value) {
    if (value.indexOf(' ') > 0) return 'HAS_SPACES';
    if (value.length > characterLimit) return 'TOO_LONG';
    if (!value.match(githubUsernameRegex)) return 'ILLEGAL_CHARACTERS';
  }
  return null;
};

export const displayErrorMessages = error => {
  switch (error) {
    case 'HAS_SPACES':
      return <ErrorMessage>Input may not contain spaces</ErrorMessage>;
    case 'TOO_LONG':
      return (
        <ErrorMessage>
          Input may not contain more than 255 characters
        </ErrorMessage>
      );
    case 'ILLEGAL_CHARACTERS':
      return (
        <ErrorMessage>
          Input may only contain alphanumeric characters or single hyphens, and
          cannot begin or end with a hyphen
        </ErrorMessage>
      );
    default:
      return null;
  }
};
