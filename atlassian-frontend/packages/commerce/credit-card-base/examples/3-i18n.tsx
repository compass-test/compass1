import React from 'react';

import { LanguagePreferencesProvider } from '../src';

import UIExamples from './2-ui-examples';

const Example = () => (
  <LanguagePreferencesProvider languages={['ja']}>
    <UIExamples />
  </LanguagePreferencesProvider>
);

export default Example;
