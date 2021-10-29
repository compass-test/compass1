import React from 'react';
import { match } from 'react-router';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Media from 'react-media';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import LinkIcon from '@atlaskit/icon/glyph/link';
import Button from '@atlaskit/button';
import CodeIcon from '@atlaskit/icon/glyph/code';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Select, { ValueType, OptionType } from '@atlaskit/select';
import Tooltip from '@atlaskit/tooltip';
import { colors } from '@atlaskit/theme';

import ExampleDisplay from '../../components/Examples/ExampleDisplay';
import { SelectThemePicker } from '../../components/ThemePicker';
import doesPackageUseTokens from '../../utils/doesPackageUseTokens';
import * as fs from '../../utils/fs';
import { getConfig, getAllPackageVersions } from '../../site';
import packageResolver, { getLoaderUrl } from '../../utils/packageResolver';
import { packageUrl } from '../../utils/url';
import { externalPackages } from '../../site';
import CodeSandbox from '../Package/CodeSandbox';
import CodeSandboxLogo from '../Package/CodeSandboxLogo';
import { TABLET_BREAKPOINT_MIN } from '../../constants';
import { Theme } from '../../types';
import { availableThemes, themeStorageKey } from '../../constants';

import {
  CodeContainer,
  Container,
  Content,
  Control,
  ErrorMessage,
  ExampleComponentWrapper,
  Nav,
  NavButton,
  NavLink,
  NavSection,
  RightNavButtonContainer,
} from './styled';

export const SANDBOX_DEPLOY_ENDPOINT =
  'https://atlaskit-deploy-sandbox.glitch.me/deploy';

function PackageSelector(props: any) {
  let selectedPackageItem;

  const packagesSelectOptions = externalPackages().children.map(
    ({ id, children }) => ({
      label: fs.titleize(id),
      options: fs.getDirectories(children).map(pkg => {
        const item = {
          label: fs.titleize(pkg.id),
          value: `${id}/${pkg.id}`,
        };

        if (props.groupId === id && props.packageId === pkg.id) {
          selectedPackageItem = item;
        }

        return item;
      }),
    }),
  );

  return (
    <Control>
      <Select
        styles={{
          container: (styles: object) => ({
            ...styles,
            flex: '1 1 0px',
            minWidth: '300px',
          }),
          control: (styles: object) => ({
            ...styles,
            backgroundColor: '#fff',
          }),
        }}
        options={packagesSelectOptions}
        placeholder="Select Package"
        onChange={(
          option: ValueType<OptionType>,
          { action }: { action: string },
        ) => action === 'select-option' && props.onSelected(option)}
        value={selectedPackageItem}
      />
    </Control>
  );
}

function ExampleSelector(props: any) {
  let selectedExampleItem;

  const examplesSelectItems = [
    {
      label: 'Examples',
      options: props.examples
        ? fs.flatMap(props.examples, (file, filePath) => {
            const item = {
              label: fs.titleize(file.id),
              value: fs.normalize(filePath.replace('examples/', '')),
            };

            if (file.id === props.exampleId) {
              selectedExampleItem = item;
            }

            return item;
          })
        : [],
    },
  ];

  return (
    <Control>
      <Select
        styles={{
          container: (styles: any) => ({
            ...styles,
            flex: '1 1 0px',
            minWidth: '300px',
          }),
          control: (styles: any) => ({
            ...styles,
            backgroundColor: '#fff',
          }),
        }}
        options={examplesSelectItems}
        placeholder="Select Example"
        onChange={(
          option: ValueType<OptionType>,
          { action }: { action: string },
        ) => action === 'select-option' && props.onSelected(option)}
        value={selectedExampleItem}
      />
    </Control>
  );
}

// TODO: Type correct once codesandbox is typed
export type ExampleNavigationProps = {
  onExampleSelected?: (selected: { value: string }) => void;
  examples?: any;
  onPackageSelected?: (selected: { value: string }) => void;
  exampleId?: string;
  groupId: string;
  loaderUrl?: string;
  packageId: string;
  pkgJSON?: any;
  allPackageVersions: any;
  isCodeVisible: boolean;
  theme: Theme;
  onCodeToggle?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  onThemeChange: (value: Theme) => void;
  deploySandbox?: any;
  loadingSandbox?: any;
};
class ExampleNavigation extends React.Component<ExampleNavigationProps> {
  state: Error = { name: '', message: '' };
  render() {
    const {
      onExampleSelected,
      examples,
      onPackageSelected,
      exampleId,
      groupId,
      loaderUrl,
      packageId,
      pkgJSON,
      allPackageVersions,
      isCodeVisible,
      onCodeToggle,
      onThemeChange,
    } = this.props;
    const error: Error = this.state;
    const example =
      examples && examples.children.find((e: any) => e.id === exampleId);

    return (
      <Media query={`(min-width: ${TABLET_BREAKPOINT_MIN}px)`}>
        {(isDesktopOrTablet: boolean) => (
          <Nav>
            {isDesktopOrTablet && (
              <NavSection style={{ marginLeft: 8 }}>
                <Tooltip content="Back to docs" position="right">
                  <NavLink to={packageUrl(groupId, packageId)}>
                    <ArrowLeftIcon label="Back to docs" />
                  </NavLink>
                </Tooltip>
              </NavSection>
            )}
            <NavSection>
              <PackageSelector
                groupId={groupId}
                packageId={packageId}
                onSelected={onPackageSelected}
              />
              <ExampleSelector
                examples={examples}
                exampleId={exampleId}
                onSelected={onExampleSelected}
              />
            </NavSection>
            {isDesktopOrTablet && (
              <NavSection
                style={{ marginRight: 8, justifyContent: 'flex-end' }}
              >
                {doesPackageUseTokens(pkgJSON) && (
                  <SelectThemePicker
                    value={{
                      value: this.props.theme,
                      label: availableThemes[this.props.theme],
                    }}
                    onChange={onThemeChange}
                  />
                )}
                <RightNavButtonContainer>
                  <CodeSandbox
                    examples={examples}
                    example={example}
                    groupId={groupId}
                    packageId={packageId}
                    pkgJSON={pkgJSON}
                    allPackageVersions={allPackageVersions}
                    afterDeployError={(error: Error) =>
                      this.setState({ error })
                    }
                    loadingButton={() => (
                      <NavButton
                        style={{ marginRight: 8 }}
                        type="submit"
                        disabled
                      >
                        <CodeSandboxLogo />
                      </NavButton>
                    )}
                    deployButton={({ isDisabled }: { isDisabled: boolean }) => (
                      <Tooltip
                        content={
                          error && error.name
                            ? error.name
                            : 'Deploy to CodeSandbox'
                        }
                        position="left"
                      >
                        <NavButton type="submit" disabled={isDisabled}>
                          <CodeSandboxLogo />
                        </NavButton>
                      </Tooltip>
                    )}
                  />
                </RightNavButtonContainer>
                <RightNavButtonContainer>
                  <Tooltip
                    content={`${isCodeVisible ? 'Hide' : 'Show'} source`}
                    position="left"
                  >
                    <NavButton
                      isSelected={isCodeVisible}
                      onClick={onCodeToggle}
                    >
                      <CodeIcon label="Show source" />
                    </NavButton>
                  </Tooltip>
                </RightNavButtonContainer>
                <Tooltip content="Isolated View" position="bottom">
                  <Button
                    appearance="subtle"
                    iconBefore={<LinkIcon label="Link Icon" />}
                    href={loaderUrl}
                    target="_blank"
                  />
                </Tooltip>
              </NavSection>
            )}
          </Nav>
        )}
      </Media>
    );
  }
}

export type State = {
  isCodeVisible: boolean;
  flags: object;
  loadingSandbox: boolean;
  theme: Theme;
};

export type Props = {
  match: match<{
    groupId?: string;
    pkgId?: string;
    exampleId: string;
    theme: Theme;
  }>;
};

export default class Examples extends React.Component<Props, State> {
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

  onExampleSelected = (selected: { value: string }) => {
    this.updateSelected(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      selected.value,
    );
  };

  updateSelected(groupId?: string, packageId?: string, exampleId?: string) {
    const resolved = packageResolver(groupId, packageId, exampleId);
    const url = this.toUrl(
      resolved.groupId,
      resolved.packageId,
      resolved.exampleId,
    );

    this.context.router.history.push(url);
  }

  toUrl(groupId?: string, packageId?: string, exampleId?: string | null) {
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

  onCodeToggle = () =>
    this.setState(state => ({ isCodeVisible: !state.isCodeVisible }));

  onThemeChange = (value: Theme) => {
    this.setState({ theme: value }, () =>
      localStorage.setItem(themeStorageKey, value),
    );
  };

  addFlag = (flagProps: {
    appearance: 'error' | 'info' | 'normal' | 'success' | 'warning';
    description: string;
    title: string;
  }) => {
    const id = Date.now().toString();
    const icon = (() =>
      flagProps.appearance === 'error' ? (
        <ErrorIcon label="Error" secondaryColor={colors.R400} />
      ) : null)();
    this.setState({
      flags: {
        [id]: (
          <Flag
            icon={icon}
            id={id}
            key={id}
            actions={[{ content: 'OK', onClick: () => this.removeFlag(id) }]}
            {...flagProps}
          />
        ),
        ...this.state.flags,
      },
    });
  };

  removeFlag = (removedKey: string) => {
    const flags = Object.keys(this.state.flags)
      .filter(key => key !== removedKey.toString())
      .reduce(
        (newFlags, key) => ({
          ...newFlags,
          [key]: (this.state.flags as any)[key],
        }),
        {},
      );

    this.setState({ flags });
  };

  deploySandbox = async () => {
    const props = packageResolver(
      this.props.match.params.groupId,
      this.props.match.params.pkgId,
      this.props.match.params.exampleId,
    );

    if (!props.example) {
      return;
    }

    const component = props.packageId;
    const example = props.example.id.split('.').slice(0, -1).join('.');
    this.setState({ loadingSandbox: true });
    const response = await fetch(
      `${SANDBOX_DEPLOY_ENDPOINT}/${component}/${example}`,
    );
    if (response.ok) {
      const url = await response.text();
      window.open(url);
    } else {
      const message = await response.text();
      this.addFlag({
        appearance: 'error',
        description: message,
        title: 'Error deploying to CodeSandbox',
      });
    }
    this.setState({ loadingSandbox: false });
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

    const loaderUrl = getLoaderUrl(
      groupId,
      packageId,
      this.props.match.params.exampleId,
      this.state.theme,
    );

    if (hasChanged) {
      return <Redirect to={this.toUrl(groupId, packageId, exampleId)} />;
    }
    const pkgJSON = getConfig(groupId, packageId).config;
    const allPackageVersions = getAllPackageVersions();

    return (
      <Container>
        <ExampleNavigation
          groupId={groupId}
          packageId={packageId}
          exampleId={exampleId!}
          examples={examples}
          loaderUrl={loaderUrl}
          isCodeVisible={this.state.isCodeVisible}
          theme={this.state.theme}
          onPackageSelected={this.onPackageSelected}
          onExampleSelected={this.onExampleSelected}
          onCodeToggle={this.onCodeToggle}
          onThemeChange={this.onThemeChange}
          deploySandbox={this.deploySandbox}
          loadingSandbox={this.state.loadingSandbox}
          pkgJSON={pkgJSON}
          allPackageVersions={allPackageVersions}
        />
        <Helmet>
          <title>
            {`Example - ${fs.titleize(exampleId!)} - ${fs.titleize(
              packageId,
            )} -${' '}
            ${BASE_TITLE}`}
          </title>
        </Helmet>
        {examples && exampleId ? (
          <ExampleDisplay
            isCodeVisible={this.state.isCodeVisible}
            example={fs.getById(fs.getFiles(examples.children), exampleId)}
            name={pkgJSON.name}
            src={loaderUrl}
          >
            {(ExampleCode, ExampleComponent, isCodeVisible) => {
              return (
                <Content>
                  <ExampleComponentWrapper isCodeVisible={isCodeVisible}>
                    <ExampleComponent />
                  </ExampleComponentWrapper>
                  <CodeContainer show={isCodeVisible}>
                    <ExampleCode />
                  </CodeContainer>
                </Content>
              );
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
            key => (this.state.flags as any)[key],
          )}
        </FlagGroup>
      </Container>
    );
  }
}
