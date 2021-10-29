import React, { useMemo, useState } from 'react';

import AnimateHeight from 'react-animate-height';

import Button from '@atlaskit/button/custom-theme-button';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import Select from '@atlaskit/select';

import CopyableCodeBlock from './CopyableCode';
import CopyButton from './CopyButton';
import {
  AccordionButton,
  ButtonContentWrapper,
  CopyButtonCol,
  DescriptionCol,
  Hr,
  NameCol,
  Row,
  SelectWrapper,
  Subsection,
} from './styled';
import { DeploymentEnvironment } from './types';

const buttonTheme = (currentTheme: any, themeProps: any) => {
  const { buttonStyles, ...rest } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      margin: '10px 0px -10px 0px',
    },
    ...rest,
  };
};

type Props = {
  accountUuid: string;
  accountName: string;
  repositoryUuid: string;
  connectEnvironment: string;
  deploymentEnvironments: DeploymentEnvironment[];
};

const OpenIDConnectConfiguration: React.FC<Props> = ({
  accountUuid,
  accountName,
  repositoryUuid,
  connectEnvironment,
  deploymentEnvironments,
}) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState({
    label: 'No environment',
    value: 'no environment',
    uuid: '',
  });
  const [isClaimExpanded, setIsClaimExpanded] = useState(false);

  const audience = `ari:cloud:bitbucket::workspace/${accountUuid.slice(1, -1)}`;

  const getIdentityProviderUrl = useMemo(() => {
    switch (connectEnvironment) {
      case 'DDEV':
        return `https://api.bitbucket.org/internal/pipelines/ddev/workspaces/${accountName}/pipelines-config/identity/oidc`;
      case 'STAGING':
        return `https://api.bitbucket.org/internal/pipelines/stg-west/workspaces/${accountName}/pipelines-config/identity/oidc`;
      case 'PRODUCTION':
      default:
        return `https://api.bitbucket.org/2.0/workspaces/${accountName}/pipelines-config/identity/oidc`;
    }
  }, [accountName, connectEnvironment]);

  const getClaim = useMemo(() => {
    return selectedEnvironment.uuid === ''
      ? `{
	"sub": "${repositoryUuid}:{stepUuid}",
	"aud": "${audience}",
	"stepUuid": "{xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx}",
	"iss": "${getIdentityProviderUrl}",
	"repositoryUuid": "${repositoryUuid}",
	"branchName": "xxxxxxxxx",
	"exp": "xxxxxxxxxx",
	"iat": "xxxxxxxxxx",
	"pipelineUuid": "{xxxxx-xxxxx-xxxx-xxxx-xxxxxxxxxxx}",
	"workspaceUuid": "${accountUuid}"
}`
      : `{
	"sub": "${repositoryUuid}:${selectedEnvironment.uuid}:{stepUuid}",
	"aud": "${audience}",
	"stepUuid": "{xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx}",
	"deploymentEnvironmentUuid": "${selectedEnvironment.uuid}",
	"iss": "${getIdentityProviderUrl}",
	"repositoryUuid": "${repositoryUuid}",
	"branchName": "xxxxxxxxx",
	"exp": "xxxxxxxxxx",
	"iat": "xxxxxxxxxx",
	"pipelineUuid": "{xxxxx-xxxxx-xxxx-xxxx-xxxxxxxxxxx}",
	"workspaceUuid": "${accountUuid}"
}`;
  }, [
    accountUuid,
    audience,
    getIdentityProviderUrl,
    repositoryUuid,
    selectedEnvironment.uuid,
  ]);

  const onSelectEnvironment = (item: any) => {
    setSelectedEnvironment(item);
  };

  return (
    <>
      <h3>Identity provider</h3>
      <Subsection>
        <h5>Identity provider URL</h5>
        <CopyableCodeBlock
          content={getIdentityProviderUrl}
          showLineNumbers={true}
          language={'html'}
          name={'identityProviderURL'}
        />
      </Subsection>
      <Subsection>
        <h5>Audience</h5>
        <CopyableCodeBlock
          content={audience}
          showLineNumbers={true}
          language={'html'}
          name={'audience'}
        />
      </Subsection>
      <h3>Unique identifiers</h3>
      <Button
        name="claim"
        appearance="subtle"
        onClick={() => setIsClaimExpanded(!isClaimExpanded)}
        theme={buttonTheme}
      >
        <ButtonContentWrapper>
          <AccordionButton isExpanded={isClaimExpanded}>
            <ChevronRightIcon label="Expand" size="large" />
          </AccordionButton>
          <h5>Example payload</h5>
        </ButtonContentWrapper>
      </Button>
      <AnimateHeight
        duration={200}
        easing="linear"
        height={!isClaimExpanded ? 0 : 'auto'}
      >
        {' '}
        <Subsection>
          <CopyableCodeBlock
            content={getClaim}
            showLineNumbers={true}
            language={'json'}
            name={'claim'}
          />
        </Subsection>
      </AnimateHeight>
      <Subsection>
        <h5>UUIDs</h5>
        <Hr />
        <Row>
          <NameCol>Workspace UUID</NameCol>
          <DescriptionCol>{accountUuid}</DescriptionCol>
          <CopyButtonCol>
            <CopyButton name={'accountUuid'} content={accountUuid} />
          </CopyButtonCol>
        </Row>
        <Row>
          <NameCol>Repository UUID</NameCol>
          <DescriptionCol>{repositoryUuid}</DescriptionCol>
          <CopyButtonCol>
            <CopyButton name={'repoUuid'} content={repositoryUuid} />
          </CopyButtonCol>
        </Row>
      </Subsection>
      {deploymentEnvironments.length > 0 && (
        <Subsection>
          <h5>Deployment environments</h5>
          <Hr />
          <SelectWrapper>
            <Select
              instanceId="select_environment"
              id="select_environment"
              options={deploymentEnvironments}
              name="deploymentEnvironmentType"
              placeholder="Select Environment"
              isClearable={false}
              isSearchable={true}
              onChange={onSelectEnvironment}
            />
          </SelectWrapper>
          {selectedEnvironment.uuid !== '' && (
            <Row>
              <NameCol>{selectedEnvironment.label}</NameCol>
              <DescriptionCol>{selectedEnvironment.uuid}</DescriptionCol>
              <CopyButtonCol>
                <CopyButton
                  name={'deploymentEnvironmentUuid'}
                  content={selectedEnvironment.uuid}
                />
              </CopyButtonCol>
            </Row>
          )}
        </Subsection>
      )}
    </>
  );
};

export default React.memo(OpenIDConnectConfiguration);
