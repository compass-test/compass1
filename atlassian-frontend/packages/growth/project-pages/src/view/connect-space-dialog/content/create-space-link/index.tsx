import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Button, {
  CustomThemeButtonProps,
} from '@atlaskit/button/custom-theme-button';
import { gridSize } from '@atlaskit/theme/constants';

import messages from './messages';
import { StateProps, OwnProps, Props } from './types';

const Container = styled.div`
  margin: ${gridSize}px 0 0;
`;

// This is a workaround because React.memo does not play well with styled-components
function StyledComponentsButton(props: CustomThemeButtonProps) {
  return <Button {...props} />;
}

const CreateNewSpaceLink = styled(StyledComponentsButton)`
  /* increase specificity to override default Button styles */
  && {
    padding-left: 0;
  }
`;

export const CreateSpaceLink = ({
  intl: { formatMessage },
  onCreateSpace,
  isConnectingSpace,
}: Props) => (
  <Container>
    <CreateNewSpaceLink
      appearance="link"
      onClick={(_, analyticsEvent) => onCreateSpace(analyticsEvent)}
      isDisabled={isConnectingSpace}
    >
      {formatMessage(messages.linkText)}
    </CreateNewSpaceLink>
  </Container>
);

export default injectIntl<StateProps & OwnProps>(CreateSpaceLink);
