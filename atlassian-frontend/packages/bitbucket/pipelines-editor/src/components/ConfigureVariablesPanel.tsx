import React, { ReactNode, useCallback, useState } from 'react';

import InfoIcon from '@atlaskit/icon/glyph/info';
import InlineDialog from '@atlaskit/inline-dialog';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import PipelinesVariables from '@atlassian/pipelines-variables';

import { VariablesProps } from '../types';

import CollapsiblePanel from './CollapsiblePanel';
import { editorTabCollapsedConfig } from './EditorTabs';
import {
  EnvironmentName,
  SectionTitleHeader,
  SectionTitleMessage,
  SectionTitleWrapper,
  VariablesHeader,
} from './styled';

export interface SectionTitleProps {
  title: string;
  children: ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  return (
    <SectionTitleWrapper>
      <SectionTitleHeader>{title}</SectionTitleHeader>
      <SectionTitleMessage>
        <InlineDialog isOpen={isOpen} content={children} onClose={toggleDialog}>
          <span onMouseEnter={toggleDialog} onMouseLeave={toggleDialog}>
            <InfoIcon label="Info" primaryColor={colors.N500} size="small" />
          </span>
        </InlineDialog>
      </SectionTitleMessage>
    </SectionTitleWrapper>
  );
};

type Props = VariablesProps & {
  isExpanded: boolean;
  handleToggle: (panelToExpand: string, expandStatus: boolean) => void;
};

const ConfigureStepsPanel: React.FC<Props> = ({
  createVariable,
  deleteVariable,
  updateVariable,
  isFetchingVariables,
  isReadOnly,
  variables,
  environments,
  environmentVariables,
  isExpanded,
  handleToggle,
}) => {
  return (
    <CollapsiblePanel
      {...editorTabCollapsedConfig.addVariables}
      panelIsExpanded={isExpanded}
      handleToggle={handleToggle}
    >
      <VariablesHeader>
        <p>Define variables that can be used in your YAML file or scripts.</p>
        <p>
          If you want the variable to be stored unencrypted and shown in plain
          text in the logs, unsecure it by unchecking the checkbox.
        </p>
      </VariablesHeader>
      <SectionTitle title="Repository">
        <p>
          Variables that can be used by anyone with repository push permissions.
        </p>
      </SectionTitle>
      <PipelinesVariables
        createVariable={createVariable}
        deleteVariable={deleteVariable}
        updateVariable={updateVariable}
        isFetchingVariables={isFetchingVariables}
        isReadOnly={isReadOnly}
        variables={variables}
      />
      <SectionTitle title="Deployments">
        <p>
          Variables that can only be used in deployments to a specific
          environment.
        </p>
      </SectionTitle>
      {environments && environmentVariables
        ? Object.keys(environments).map((environmentUuid) => (
            <>
              <EnvironmentName>{environments[environmentUuid]}</EnvironmentName>
              <PipelinesVariables
                createVariable={(variable) =>
                  createVariable(variable, environmentUuid)
                }
                deleteVariable={(variable) =>
                  deleteVariable(variable, environmentUuid)
                }
                updateVariable={(previousVariable, variable) =>
                  updateVariable(previousVariable, variable, environmentUuid)
                }
                isFetchingVariables={isFetchingVariables}
                isReadOnly={isReadOnly}
                variables={environmentVariables[environmentUuid]}
              />
            </>
          ))
        : null}
    </CollapsiblePanel>
  );
};

export default React.memo(ConfigureStepsPanel);
