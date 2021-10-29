import React, { useMemo, useState } from 'react';

import fileDownload from 'js-file-download';
import yaml from 'js-yaml';

import Button, { ButtonGroup } from '@atlaskit/button';
import { CodeBlock } from '@atlaskit/code';
import Tooltip from '@atlaskit/tooltip';
import {
  CompassComponentDetailViewFragment,
  CompassLink,
  CompassRelationship,
  CompassRelationshipConnection,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  CONFIG_AS_CODE_DAC_LINK,
  CONFIG_AS_CODE_FILE_NAME,
} from '../../constants';

import messages from './messages';
import { CodeBlockWrapper, CodeHeader, FileName } from './styled';

interface GeneratedConfigCodeProps {
  component: CompassComponentDetailViewFragment;
}

function formatLink(link: CompassLink) {
  return {
    name: link.name,
    type: link.type,
    url: link.url,
  };
}

function parseDefinitionId(definitionId: string) {
  return definitionId.replace(/^compass:/, '');
}

function formatFields(fields: CompassComponentDetailViewFragment['fields']) {
  if (fields) {
    return fields.reduce(
      (acc: Record<string, string | number | null>, field: any) => {
        const definitionId = parseDefinitionId(field.definition.id);
        const fieldValue: string | null = field?.value?.[0];
        acc[definitionId] = fieldValue ? parseInt(fieldValue) : fieldValue;
        return acc;
      },
      {},
    );
  }
}

function formatRelationships(
  relationshipConnection: CompassRelationshipConnection,
) {
  const relationshipMap: { [key: string]: Array<string> } = {};

  // Loop over all relationship nodes and add them to a map of
  // { relationshipType : [componentIDs] }
  relationshipConnection?.nodes?.forEach(
    (relationship: CompassRelationship) => {
      const relationshipType = relationship.type.toString();
      const endNodeId = relationship.endNode?.id;

      if (!endNodeId) {
        return;
      }

      const existingRelationships = relationshipMap[relationshipType] || [];
      relationshipMap[relationshipType] = [...existingRelationships, endNodeId];
    },
  );
  return relationshipMap;
}

function generateYamlForComponent(
  component: CompassComponentDetailViewFragment,
) {
  const relationships = component.relationships as CompassRelationshipConnection;

  const contents = {
    name: component.name,
    id: component.id,
    description: component.description || null,
    ownerId: component.ownerId || null,
    fields: formatFields(component.fields) || null,
    links: component.links?.map(formatLink) || null,
    relationships: formatRelationships(relationships),
  };

  return yaml.dump(contents, { lineWidth: 150 }).trim();
}

export default function GeneratedConfigCode({
  component,
}: GeneratedConfigCodeProps) {
  const { formatMessage } = useIntl();
  const [isCopiedTooltipPresent, setIsCopiedTooltipPresent] = useState(false);
  const helpText = formatMessage(messages.helpText);
  const configFileContents = useMemo(
    () =>
      `${generateYamlForComponent(component)}

# ${helpText}
# ${CONFIG_AS_CODE_DAC_LINK}`,
    [component, helpText],
  );

  const copyFile = () => {
    navigator.clipboard.writeText(configFileContents);
    setIsCopiedTooltipPresent(true);
  };

  const downloadFile = () => {
    fileDownload(configFileContents, CONFIG_AS_CODE_FILE_NAME);
  };

  const renderCopyButton = () => {
    const button = (
      <Button
        appearance="subtle"
        onClick={copyFile}
        onMouseLeave={() => setIsCopiedTooltipPresent(false)}
        testId="dragonfruit.config-as-code-setup-modal.copy-button"
      >
        {formatMessage(messages.copy)}
      </Button>
    );

    if (isCopiedTooltipPresent) {
      return (
        <Tooltip content={formatMessage(messages.copySuccess)}>
          {button}
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <CodeBlockWrapper>
      <CodeHeader>
        <FileName>{CONFIG_AS_CODE_FILE_NAME}</FileName>
        <ButtonGroup>
          {renderCopyButton()}
          <Button
            appearance="subtle"
            onClick={downloadFile}
            testId="dragonfruit.config-as-code-setup.download-button"
          >
            {formatMessage(messages.download)}
          </Button>
        </ButtonGroup>
      </CodeHeader>
      <CodeBlock
        language="Yaml"
        text={configFileContents}
        testId="dragonfruit.config-as-code-generated-codeblock"
      />
    </CodeBlockWrapper>
  );
}
