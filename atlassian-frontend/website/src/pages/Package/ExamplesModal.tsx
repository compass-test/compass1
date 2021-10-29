import React from 'react';
import { match } from 'react-router';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router-dom';
import LinkButton from '../../components/LinkButton';
import { Helmet } from 'react-helmet';

import CodeIcon from '@atlaskit/icon/glyph/code';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import ScreenIcon from '@atlaskit/icon/glyph/screen';
import LinkIcon from '@atlaskit/icon/glyph/link';

import { ButtonGroup } from '@atlaskit/button';
import Button from '@atlaskit/button/custom-theme-button';
import { FlagGroup } from '@atlaskit/flag';
import Tooltip from '@atlaskit/tooltip';
import Modal, {
  OnCloseHandler,
  ModalBody as Body,
  ModalHeader as OgModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { colors, elevation, gridSize } from '@atlaskit/theme';

import * as fs from '../../utils/fs';
import doesPackageUseTokens from '../../utils/doesPackageUseTokens';
import { File, Theme } from '../../types';
import packageResolver, { getLoaderUrl } from '../../utils/packageResolver';
import ExampleDisplay from '../../components/Examples/ExampleDisplay';
import { PopupSelectThemePicker } from '../../components/ThemePicker';
import { getAllPackageVersions, getConfig } from '../../site';
import CodeSandbox from './CodeSandbox';
import CodeSandboxLogo from './CodeSandboxLogo';

import { availableThemes, themeStorageKey } from '../../constants';

// ==============================
// PAGE
// ==============================

const Content = styled.div`
  flex: 1 1 auto;
`;

const CodeContainer = styled.div``;

const ErrorMessage = styled.div`
  background-color: ${colors.R400};
  color: white;
  font-size: 120%;
  padding: 1em;
`;

// ==============================
// MODAL
// ==============================
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ContentBody = styled.div`
  display: flex;
  flex: 1;

  padding-bottom: 17px;
`;
const ModalContent = styled.div`
  flex: 1 1 auto;
  min-height: 240px;
  padding: ${gridSize() * 2}px;
  ${elevation.e200};
`;
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  margin-left: ${gridSize() * 2.5}px;
  margin-right: ${gridSize() * 2.5}px;
`;
const ModalActions = styled.div`
  display: flex;
`;

// ==============================
// NAVIGATION
// ==============================

const keylineMask = css`
  background-color: ${colors.background};
  margin-top: -2px;
  padding-top: 2px;
`;
const Nav = styled.nav`
  ${keylineMask} flex-shrink: 0;
  margin-right: ${gridSize() * 2}px;
  position: relative;
  width: 240px;
`;
const NavInner = styled.div`
  max-height: 100%;
  overflow-y: auto;
  padding: 2px;
`;

interface ExampleNavigationProps {
  examples: any;
  exampleId: string;
  groupId: string;
  packageId: string;
  onPackageSelected: (selected: { value: string }) => void;
  loadingSandbox: boolean;
  onExampleSelected: (selected: string) => void;
}

function ExampleNavigation({
  examples,
  exampleId,
  onExampleSelected,
}: ExampleNavigationProps) {
  const regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files

  return (
    <Nav>
      <NavInner>
        {examples ? (
          fs.flatMap(
            examples,
            (file, filePath) =>
              file.id.match(regex) && (
                <Button
                  isSelected={file.id === exampleId}
                  key={file.id}
                  appearance="subtle"
                  spacing="compact"
                  href={fs.normalize(filePath.replace('examples/', ''))}
                  onClick={(event: React.SyntheticEvent) => {
                    event.preventDefault();
                    onExampleSelected(
                      fs.normalize(filePath.replace('examples/', '')),
                    );
                  }}
                  shouldFitContainer
                  theme={(current, props) => {
                    const { buttonStyles, ...rest } = current(props);
                    return {
                      buttonStyles: {
                        ...buttonStyles,
                        textAlign: 'left',
                        margin: '2px 0 0 0',
                      },
                      ...rest,
                    };
                  }}
                >
                  {fs.titleize(file.id)}
                </Button>
              ),
          )
        ) : (
          <div>No Examples</div>
        )}
      </NavInner>
    </Nav>
  );
}

export type State = {
  isCodeVisible: boolean;
  flags: Object;
  loadingSandbox: boolean;
  theme: Theme;
};

export interface Props {
  match: match<{
    pkgId: string;
    exampleId: string;
    groupId: string;
  }>;
}

function toUrl(
  groupId?: string,
  packageId?: string,
  exampleId?: string | null,
) {
  let url;

  if (!groupId) {
    url = `/packages`;
  } else if (!packageId) {
    url = `/packages/${groupId}`;
  } else if (!exampleId) {
    url = `/packages/${groupId}/${packageId}`;
  } else {
    url = `/packages/${groupId}/${packageId}/example/${fs.normalize(
      exampleId,
    )}`;
  }

  return url;
}

function toExampleUrl(
  groupId?: string,
  packageId?: string,
  exampleId?: string | null,
) {
  let url;

  if (!groupId) {
    url = `/examples`;
  } else if (!packageId) {
    url = `/examples/${groupId}`;
  } else if (!exampleId) {
    url = `/examples/${groupId}/${packageId}`;
  } else {
    url = `/examples/${groupId}/${packageId}/${fs.normalize(exampleId)}`;
  }

  return url;
}

interface ModalHeaderCompProps {
  afterDeployError: any;
  packageId: string;
  example?: File;
  examples: any;
  groupId: string;
  theme: Theme;
  pkgJSON: any;
  allPackageVersions: any;
  isCodeVisible: boolean;
  exampleId: string | null;
  loaderUrl: string | undefined;
  onCodeToggle: () => void;
  onThemeChange: (value: Theme) => void;
  close: OnCloseHandler;
}

const ModalHeaderComp = ({
  afterDeployError,
  packageId,
  example,
  examples,
  groupId,
  theme,
  pkgJSON,
  allPackageVersions,
  isCodeVisible,
  exampleId,
  loaderUrl,
  onCodeToggle,
  onThemeChange,
  close,
}: ModalHeaderCompProps) => (
  <OgModalHeader>
    <ModalHeader>
      <ModalTitle>{fs.titleize(packageId)} Examples</ModalTitle>
      <ModalActions>
        <ButtonGroup>
          {doesPackageUseTokens(pkgJSON) && (
            <PopupSelectThemePicker
              value={{
                value: theme,
                label: availableThemes[theme],
              }}
              onChange={onThemeChange}
            />
          )}
          <CodeSandbox
            afterDeployError={afterDeployError}
            example={example}
            examples={examples}
            groupId={groupId}
            packageId={packageId}
            pkgJSON={pkgJSON}
            allPackageVersions={allPackageVersions}
            loadingButton={() => (
              <Button type="submit" isDisabled iconBefore={<CodeSandboxLogo />}>
                Loading...
              </Button>
            )}
            deployButton={({
              isDisabled,
              error,
            }: {
              isDisabled: boolean;
              error: Error;
            }) =>
              error && error.name === 'TypeError' ? (
                <Tooltip
                  content="Relative import found in example. CodeSandbox cannot resolve relative imports unless it resides in the Design System Mirror repository."
                  position="bottom"
                >
                  <Button isDisabled iconBefore={<CodeSandboxLogo />}>
                    Cannot build sandbox
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  type="submit"
                  isDisabled={isDisabled || !!error}
                  iconBefore={<CodeSandboxLogo />}
                >
                  Sandbox
                </Button>
              )
            }
          />
          <Button
            iconBefore={<CodeIcon label="Toggle code snippet" />}
            onClick={onCodeToggle}
            isSelected={isCodeVisible}
            title={isCodeVisible ? 'Hide Source' : 'Show Source'}
          >
            Source
          </Button>
          <Tooltip content="Fullscreen" position="bottom">
            <div>
              <LinkButton
                appearance="subtle"
                iconBefore={<ScreenIcon label="Screen Icon" />}
                to={toExampleUrl(groupId, packageId, exampleId)}
              />
            </div>
          </Tooltip>
          <Tooltip content="Isolated View" position="bottom">
            <Button
              appearance="subtle"
              iconBefore={<LinkIcon label="Link Icon" />}
              href={loaderUrl}
              target={'_blank'}
            />
          </Tooltip>
          <Tooltip content="Close" position="bottom">
            <Button
              appearance="subtle"
              iconBefore={<CloseIcon label="Close Modal" />}
              onClick={close}
            />
          </Tooltip>
        </ButtonGroup>
      </ModalActions>
    </ModalHeader>
  </OgModalHeader>
);

export default class ExamplesModal extends React.Component<Props, State> {
  state: State = {
    isCodeVisible: false,
    flags: {},
    loadingSandbox: false,
    theme: 'none',
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    try {
      const localTheme = localStorage.getItem(themeStorageKey) as Theme | null;

      if (localTheme && Object.keys(availableThemes).includes(localTheme)) {
        this.setState({ theme: localTheme });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Unable to access local storage');
    }
  };

  onPackageSelected = (selected: { value: string }) => {
    const [groupId, packageId] = selected.value.split('/');
    this.updateSelected(groupId, packageId);
  };

  onExampleSelected = (selected: string) => {
    this.updateSelected(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      selected,
    );
  };

  updateSelected(groupId?: string, packageId?: string, exampleId?: string) {
    const resolved = packageResolver(groupId, packageId, exampleId);
    const url = toUrl(resolved.groupId, resolved.packageId, resolved.exampleId);
    this.context.router.history.push(url);
  }

  onCodeToggle = () =>
    this.setState(state => ({ isCodeVisible: !state.isCodeVisible }));

  onThemeChange = (value: Theme) => {
    this.setState({ theme: value }, () =>
      localStorage.setItem(themeStorageKey, value),
    );
  };

  close: OnCloseHandler = event => {
    if (event) {
      event.stopPropagation();
    }

    const { params } = this.props.match;
    const { packageId, groupId } = packageResolver(
      params.groupId,
      params.pkgId,
      params.exampleId,
    );
    const url = `/packages/${groupId}/${packageId}`;

    this.context.router.history.push(url);
  };

  render() {
    const {
      hasChanged,
      examples,
      packageId,
      groupId,
      exampleId,
    } = packageResolver(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      this.props.match.params.exampleId,
    );

    const example: File | undefined =
      exampleId && examples
        ? fs.getById<File>(fs.getFiles(examples.children), exampleId)
        : undefined;

    const pkgJSON = getConfig(groupId, packageId).config;

    const { isCodeVisible } = this.state;

    const allPackageVersions = getAllPackageVersions();
    const loaderUrl = getLoaderUrl(
      groupId,
      packageId,
      this.props.match.params.exampleId,
      this.state.theme,
    );

    if (hasChanged) {
      return <Redirect to={toUrl(groupId, packageId, exampleId)} />;
    }
    return (
      <Modal autoFocus={false} height="100%" onClose={this.close} width={1180}>
        <ModalHeaderComp
          afterDeployError={null}
          packageId={packageId}
          example={example}
          examples={examples}
          exampleId={exampleId}
          groupId={groupId}
          theme={this.state.theme}
          pkgJSON={pkgJSON}
          allPackageVersions={allPackageVersions}
          isCodeVisible={isCodeVisible}
          loaderUrl={loaderUrl}
          onThemeChange={this.onThemeChange}
          onCodeToggle={this.onCodeToggle}
          close={this.close}
        />
        <Body>
          <ModalBody>
            <Helmet>
              <title>
                {`Example - ${fs.titleize(exampleId!)} - ${fs.titleize(
                  packageId,
                )} -${' '}
                ${BASE_TITLE}`}
              </title>
            </Helmet>
            <ContentBody>
              <ExampleNavigation
                groupId={groupId}
                packageId={packageId}
                exampleId={exampleId!}
                examples={examples}
                onPackageSelected={this.onPackageSelected}
                onExampleSelected={this.onExampleSelected}
                loadingSandbox={this.state.loadingSandbox}
              />
              <ModalContent>
                {examples && exampleId && loaderUrl ? (
                  <ExampleDisplay
                    isCodeVisible={isCodeVisible}
                    example={fs.getById(
                      fs.getFiles(examples.children),
                      exampleId,
                    )}
                    name={pkgJSON.name}
                    src={loaderUrl}
                  >
                    {(ExampleCode, ExampleComponent, isCodeVisible) => {
                      if (isCodeVisible) {
                        return (
                          <Content>
                            <CodeContainer>
                              <ExampleCode />
                            </CodeContainer>
                          </Content>
                        );
                      }
                      return <ExampleComponent />;
                    }}
                  </ExampleDisplay>
                ) : (
                  <Content>
                    <ErrorMessage>
                      {fs.titleize(packageId)} does not have any examples
                    </ErrorMessage>
                  </Content>
                )}
                <FlagGroup>
                  {Object.keys(this.state.flags).map(
                    (key: string) => (this.state.flags as any)[key],
                  )}
                </FlagGroup>
              </ModalContent>
            </ContentBody>
          </ModalBody>
        </Body>
      </Modal>
    );
  }
}
