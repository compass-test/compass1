import React, { ComponentProps, FC, memo, ReactNode } from 'react';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { G300, N90, R300, Y300 } from '@atlaskit/theme/colors';
import { AnalyticsButton, ExternalLink } from '@atlassian/mpt-elements';

import { Wrapper } from './styled';

type Appearance =
  | 'success'
  | 'subtleSuccess'
  | 'error'
  | 'subtleError'
  | 'unknown'
  | 'warning';

type LinkProps = Omit<
  ComponentProps<typeof AnalyticsButton>,
  'appearance' | 'children'
>;
type Props = {
  appearance: Appearance;
  linkProps?: LinkProps;
  linkText?: string;
  secondarylinkProps?: LinkProps;
  secondarylinkText?: string | ReactNode;
};

const ICONS: Record<Appearance, JSX.Element> = {
  success: <CheckCircleIcon primaryColor={G300} label="Yes" />,
  subtleSuccess: <CheckCircleIcon primaryColor={N90} label="Yes" />,
  error: <CrossCircleIcon primaryColor={R300} label="No" />,
  subtleError: <CrossCircleIcon primaryColor={N90} label="No" />,
  unknown: <QuestionCircleIcon primaryColor={N90} label="Unknown" />,
  warning: <WarningIcon primaryColor={Y300} label="Upgrade" />,
};

const StatusWithLinkValue: FC<Props> = ({
  appearance,
  linkProps = {},
  linkText = '',
  secondarylinkProps = {},
  secondarylinkText = '',
}) => {
  const hasLinkProps = Object.keys(linkProps).length > 0;
  const hasSecondaryLinkProps = Object.keys(secondarylinkProps).length > 0;

  // Secondary link
  const secondaryLink =
    secondarylinkText && hasSecondaryLinkProps ? (
      <ExternalLink {...secondarylinkProps} appearance="subtle-link">
        {secondarylinkText}
      </ExternalLink>
    ) : null;

  if (linkText && hasLinkProps) {
    return (
      <Wrapper>
        <ExternalLink {...linkProps}>
          {ICONS[appearance]}
          <br />
          {linkText}
        </ExternalLink>
        {secondaryLink}
      </Wrapper>
    );
  }

  if (linkText && !hasLinkProps) {
    return (
      <Wrapper>
        {ICONS[appearance]}
        <br />
        {linkText}
        {secondaryLink}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {ICONS[appearance]}
      {secondaryLink}
    </Wrapper>
  );
};

export default memo(StatusWithLinkValue);
