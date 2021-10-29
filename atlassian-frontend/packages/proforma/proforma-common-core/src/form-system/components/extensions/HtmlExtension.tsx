import React from 'react';

import { defaultSchema } from '@atlaskit/adf-schema';
import { JIRATransformer } from '@atlaskit/editor-jira-transformer';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { ReactRenderer } from '@atlaskit/renderer';

export interface HtmlExtensionProps {
  extensionId: number;
  htmlContent: string;
}

export const HtmlExtension: React.FC<HtmlExtensionProps> = ({
  extensionId,
  htmlContent,
}) => {
  try {
    const jiraTransformer = new JIRATransformer(defaultSchema);
    const adfTransformer = new JSONTransformer();
    const pmNode = jiraTransformer.parse(htmlContent);
    const adf = adfTransformer.encode(pmNode);

    return (
      <ReactRenderer key={extensionId} document={adf} appearance="full-width" />
    );
  } catch (err) {
    return <></>;
  }
};
