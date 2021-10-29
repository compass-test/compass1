/*
 * This Banner component is taken from Atlaskit and adjusted to allow it to expand and wrap text when the message is longer than one line.
 * The default component will not wrap text for errors and warnings.
 *
 * Copyright 2019 Atlassian Pty Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React from 'react';

import styled from 'styled-components';

import { DN40, N0, N500, N700, R300, R400, Y300 } from '@atlaskit/theme/colors';
import { themed } from '@atlaskit/theme/components';
import { gridSize } from '@atlaskit/theme/constants';
interface Props {
  /** Visual style to be used for the banner */
  appearance?: 'warning' | 'error' | 'announcement';
  /** Content to be shown next to the icon. Typically text content but can contain links. */
  children?: React.ReactNode;
  /** Icon to be shown left of the main content. Typically an Atlaskit [@atlaskit/icon](packages/core/icon) */
  icon?: React.ReactChild;
  /** Defines whether the banner is shown. An animation is used when the value is changed. */
  isOpen?: boolean;
  /** Returns the inner ref of the component. This is exposed so the height can be used in page. */
  innerRef?: (element: HTMLElement) => void;
  /** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests */
  testId?: string;
}

// eslint-disable-next-line @repo/internal/react/no-class-components
class WrappingBanner extends React.Component<Props, { height: number }> {
  state = {
    height: 0,
  };

  static defaultProps = {
    appearance: 'warning',
    isOpen: false,
  };

  containerRef?: HTMLElement;

  getHeight = () => {
    if (this.containerRef) {
      this.setState({ height: this.containerRef.clientHeight });
    }
  };

  innerRef = (ref: HTMLElement) => {
    this.containerRef = ref;
    if (this.props.innerRef) {
      this.props.innerRef(ref);
    }
    this.getHeight();
  };

  render() {
    const { appearance, children, icon, isOpen, testId } = this.props;

    return (
      <Visibility bannerHeight={this.state.height} isOpen={isOpen}>
        <Container
          innerRef={this.innerRef}
          appearance={appearance}
          aria-hidden={!isOpen}
          role="alert"
          data-testid={testId}
        >
          <Content appearance={appearance}>
            <Icon>{icon}</Icon>
            <Text>{children}</Text>
          </Content>
        </Container>
      </Visibility>
    );
  }
}

const TRANSITION_DURATION = '0.25s ease-in-out';

type Appearance = 'warning' | 'error' | 'announcement' | undefined;

interface VisibilityProps {
  bannerHeight: number;
  isOpen?: boolean;
}

interface AppearanceProp {
  appearance: Appearance;
}

/* Container */
export const backgroundColor = themed('appearance', {
  error: { light: R400, dark: R300 },
  warning: { light: Y300, dark: Y300 },
  announcement: { light: N500, dark: N500 },
});

export const Container = styled.div<AppearanceProp>`
  max-height: '88px';
  overflow: ${({ appearance }) =>
    appearance === 'announcement' ? 'scroll' : 'visible'};
  background-color: ${backgroundColor};
`;

export const textColor = themed('appearance', {
  error: { light: N0, dark: DN40 },
  warning: { light: N700, dark: DN40 },
  announcement: { light: N0, dark: N0 },
});

export const Content = styled.div<AppearanceProp>`
  align-items: center;
  background-color: ${backgroundColor};
  color: ${textColor};
  display: flex;
  fill: ${backgroundColor};
  font-weight: 500;
  justify-content: center;
  padding: ${gridSize() * 1.5}px;
  text-align: center;
  margin: auto;
  max-width: 876px;
  transition: color ${TRANSITION_DURATION};

  a,
  a:visited,
  a:hover,
  a:active,
  a:focus {
    color: ${textColor};
    text-decoration: underline;
  }
`;

export const Icon = styled.span`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
`;

export const Visibility = styled.div`
  max-height: ${(props: VisibilityProps) =>
    props.isOpen ? props.bannerHeight : 0}px;
  overflow: hidden;
  transition: max-height ${TRANSITION_DURATION};
`;

export const Text = styled.span`
  flex: 0 1 auto;
  padding: ${gridSize() / 2}px;
  overflow: hidden;
`;

export default WrappingBanner;
