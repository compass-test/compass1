import React, { useState } from 'react';
import {
  TemplateProvider,
  usePreloadPreviews,
} from '../../../controllers/template';
import { MainContainer, MainContent } from '../styled';
import TemplatesSidebar from '../templates-sidebar';
import { Template, TemplateType } from '../../../controllers/template/types';
import { preExpandTemplates } from '../constants';
import messages from '../messages';

interface Props {
  children: React.ReactNode;
}

const PreExpand = ({ children }: Props) => {
  const [template, setTemplate] = useState<Template>(preExpandTemplates[0]);

  usePreloadPreviews(preExpandTemplates, false);

  const handleTemplateClick = (template: Template) => {
    if (template.type === TemplateType.Link) {
      window.open(template.url, '_blank');
    } else {
      setTemplate(template);
    }
  };

  return (
    <>
      <MainContainer data-test-id="confluence-project-pages.pre-expand.template-container">
        <MainContent>
          <TemplateProvider value={template}>{children}</TemplateProvider>
        </MainContent>
      </MainContainer>
      <TemplatesSidebar
        templates={preExpandTemplates}
        activeTemplate={template}
        onTemplateClick={handleTemplateClick}
        isDisabled={false}
        title={messages.templatesPreExpandTitle}
        subtitle={messages.templatesPreExpandSubtitle}
      />
    </>
  );
};

export default PreExpand;
