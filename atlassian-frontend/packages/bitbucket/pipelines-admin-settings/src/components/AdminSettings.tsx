import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import Toggle from '@atlaskit/toggle';
import Tooltip from '@atlaskit/tooltip';

import { YML_FILE_NAME } from '../const';
import { Account, BuildConfiguration, Capabilities } from '../types';

import {
  ButtonWrapper,
  Highlight,
  Loading,
  ToggleWrapper,
  Wrapper,
} from './styled';

type Props = {
  account: Account;
  buildConfiguration: BuildConfiguration;
  capabilities: Capabilities;
  editConfigurationURL: string;
  gettingStartedPageURL: string;
  onBuildsToggle: () => any;
  is2FaRequired: boolean;
};

const AdminSettings: React.FC<Props> = ({
  account,
  buildConfiguration,
  capabilities,
  editConfigurationURL,
  gettingStartedPageURL,
  onBuildsToggle,
  is2FaRequired,
}) => {
  const [isTogglingBuilds, setIsTogglingBuilds] = useState<boolean>(false);

  useEffect(() => {
    setIsTogglingBuilds(false);
  }, [capabilities.pipelinesEnabled]);

  const onChange = useCallback(() => {
    setIsTogglingBuilds(true);
    onBuildsToggle();
  }, [onBuildsToggle]);

  const isLoading = useMemo(
    () =>
      !capabilities.hasFetchedCapabilities ||
      !buildConfiguration.hasFetchedRawYmlFile ||
      !account.hasFetchedUser,
    [capabilities, buildConfiguration, account],
  );

  const isDisabled = useMemo(
    () => isTogglingBuilds || (!account.userHas2FaEnabled && is2FaRequired),
    [isTogglingBuilds, is2FaRequired, account],
  );

  const isChecked = useMemo(
    () =>
      isTogglingBuilds
        ? !capabilities.pipelinesEnabled
        : capabilities.pipelinesEnabled,
    [isTogglingBuilds, capabilities],
  );

  return (
    <Wrapper data-testid="pipelines-admin-settings">
      <p>
        Pipelines will build your repository on every push once you enable
        Pipelines and commit a valid <br />
        {YML_FILE_NAME} file in your repository.
      </p>
      {isLoading ? (
        <Loading>
          <Spinner size="large" />
        </Loading>
      ) : (
        <div>
          <ToggleWrapper>
            <section>
              <span onClick={onBuildsToggle}>Enable Pipelines</span>
              <Tooltip
                content={
                  !account.userHas2FaEnabled && is2FaRequired
                    ? 'Two-step verification is required to enable Pipelines'
                    : ''
                }
              >
                <Toggle
                  label="Enable Pipelines"
                  size="large"
                  isChecked={isChecked}
                  isDisabled={isDisabled}
                  onChange={onChange}
                />
              </Tooltip>
            </section>
          </ToggleWrapper>
          {buildConfiguration.hasYmlFile && (
            <ButtonWrapper>
              <Button href={editConfigurationURL} target="_top">
                View {YML_FILE_NAME}
              </Button>
            </ButtonWrapper>
          )}
          {!buildConfiguration.hasYmlFile && capabilities.pipelinesEnabled && (
            <Highlight>
              Next, configure and commit a <strong>{YML_FILE_NAME}</strong> file
              into your repository. You can configure your own or choose from
              the example configuration we provide in our getting started guide.
            </Highlight>
          )}
          {!buildConfiguration.hasYmlFile && (
            <Button
              href={gettingStartedPageURL}
              target="_top"
              appearance="primary"
              isDisabled={!capabilities.pipelinesEnabled}
            >
              Configure {YML_FILE_NAME}
            </Button>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(AdminSettings);
