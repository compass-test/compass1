import React from 'react';
import * as H from 'history';
import { match } from 'react-router';
import styled from 'styled-components';
import Loadable from 'react-loadable';
import { Helmet } from 'react-helmet';

import CloseIcon from '@atlaskit/icon/glyph/cross';

import Button from '@atlaskit/button';
import { gridSize } from '@atlaskit/theme';
import TextField from '@atlaskit/textfield';
import Modal, {
  ModalHeader as OgModalHeader,
  OnCloseHandler,
  ModalBody as AKModalBody,
} from '@atlaskit/modal-dialog';

import * as fs from '../../utils/fs';
import { File } from '../../types';
import Loading from '../../components/Loading';
import Changelog, { NoMatch } from '../../components/ChangeLog';
import { packages } from '../../site';
import { divvyChangelog } from '../../utils/changelog';

// ==============================
// STYLES
// ==============================

const ModalBody = styled.div`
  padding-bottom: ${gridSize() * 2}px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 20px;
  margin-right: 20px;
`;

const FieldWrapper = styled.div`
  flex-grow: 1;
  padding-right: ${gridSize() * 2}px;
`;
const LogWrapper = styled.div`
  margin-top: 2em;
`;

// ==============================
// END STYLES
// ==============================

export type HeaderProps = {
  isInvalid: boolean;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onClose: OnCloseHandler;
  showKeyline: boolean;
  value: string;
};
const Header = ({ isInvalid, onChange, onClose, value }: HeaderProps) => (
  <OgModalHeader>
    <ModalHeader>
      <FieldWrapper>
        <TextField
          key="input"
          isInvalid={isInvalid}
          label="Semver Range"
          onChange={onChange}
          placeholder={'Semver Range: e.g. "> 1.0.6 <= 3.0.2"'}
          value={value}
        />
      </FieldWrapper>
      <Button
        appearance="subtle"
        iconBefore={<CloseIcon label="Close Modal" />}
        onClick={onClose}
      />
    </ModalHeader>
  </OgModalHeader>
);

// ==============================
// END STYLES
// ==============================

// Ensure the string ends with a number:
// avoids unsatisfied semver range, which causes a flickering "no match" message
// as the user is typing
function getQualifiedRange(str: string) {
  if (/[0-9]$/.test(str)) {
    return str;
  }

  return '';
}

export type ResolvedChangelog = {
  changelog?: string;
};

export interface Props {
  match: match<{
    groupId: string;
    pkgId: string;
    semver?: string;
  }>;
  history: H.History;
}
export type State = {
  isInvalid: boolean;
  range: string;
};

export default class ExamplesModal extends React.Component<Props, State> {
  state: State = { isInvalid: false, range: '' };

  componentDidMount() {
    const { semver } = this.props.match.params;

    if (semver) {
      this.setState({
        range: decodeURI(String(this.props.match.params.semver)),
      });
    }
  }

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { groupId, pkgId } = this.props.match.params;
    const { target } = event;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const range = target.value;
    const isInvalid = /[a-z]/gi.test(range);
    const path = `/packages/${groupId}/${pkgId}/changelog/${encodeURI(range)}`;

    this.props.history.replace(path);
    this.setState({ isInvalid, range });
  };

  close: OnCloseHandler = event => {
    const { groupId, pkgId } = this.props.match.params;
    const url = `/packages/${groupId}/${pkgId}`;

    event.stopPropagation();
    this.props.history.push(url);
  };

  header = () => {
    const { isInvalid, range } = this.state;

    return (
      <Header
        isInvalid={isInvalid}
        onChange={this.handleChange}
        onClose={this.close}
        showKeyline
        value={range}
      />
    );
  };

  render() {
    const { groupId, pkgId } = this.props.match.params;
    const filePath = `packages/${groupId}/${pkgId}/CHANGELOG.md`;
    const legacyFilePath = `packages/core/${pkgId}/CHANGELOG.md`;

    const found = fs.find(packages(), (file, currPath) => {
      // REMOVE-ME: When core components are moved to `/design-system`
      if (groupId === 'design-system' && currPath !== filePath) {
        return currPath === legacyFilePath;
      }

      return currPath === filePath;
    }) as File;
    const { isInvalid, range } = this.state;

    const Content = Loadable<{}, ResolvedChangelog>({
      loading: () => <Loading />,
      loader: async () =>
        fs.isFile(found) ? { changelog: await found.contents() } : {},
      render: changelog =>
        changelog ? (
          <Changelog
            changelog={divvyChangelog({ default: changelog.changelog || '' })}
            range={getQualifiedRange(range)}
            packageName={pkgId}
          />
        ) : (
          <NoMatch>Invalid range; please try again.</NoMatch>
        ),
    });

    return (
      <Modal autoFocus height={600} onClose={this.close} width={640}>
        {this.header()}
        <AKModalBody>
          <Helmet>
            <title>{`Changelog - ${fs.titleize(pkgId)} - ${BASE_TITLE}`}</title>
          </Helmet>
          <ModalBody>
            {isInvalid ? (
              <NoMatch>Invalid range &mdash; please try again.</NoMatch>
            ) : (
              <LogWrapper>
                <Content />
              </LogWrapper>
            )}
          </ModalBody>
        </AKModalBody>
      </Modal>
    );
  }
}
