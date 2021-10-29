import React from 'react';
import View from './view';
import { IntlProvider } from 'react-intl';
import { select, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { preExpandTemplates as templates } from '../constants';
import styled from 'styled-components';
import { TemplateProvider } from '../../../controllers/template';

const Wrapper = styled.div`
  width: 70vw;
`;

export const DefaultTemplatePreview = () => {
  const tmplKey = select(
    'template',
    templates.map((t) => t.key),
    templates[0].key,
  );
  const template = templates.find((t) => t.key === tmplKey);
  return (
    <IntlProvider locale="en">
      <TemplateProvider value={template || templates[0]}>
        <Wrapper>
          <View
            onTryClick={action('onTryClick')}
            onLearnMoreClick={action('onLearnMoreClick')}
          />
        </Wrapper>
      </TemplateProvider>
    </IntlProvider>
  );
};

export default {
  decorators: [withKnobs],
};
