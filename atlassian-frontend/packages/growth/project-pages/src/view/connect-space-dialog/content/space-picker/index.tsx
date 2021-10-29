import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import AKSelect from '@atlaskit/select';
import { layers, gridSize } from '@atlaskit/theme/constants';

import { ComponentWithAnalytics } from '../../../../common/analytics/util';

import { Props } from './types';
import messages from './messages';

const Container = styled.div`
  margin: ${gridSize()}px 0 0;
  display: flex;
  flex-direction: column;
`;

const Instructions = styled.p`
  margin: 0 0 ${gridSize() * 2}px;
`;

const SpacePicker = ({
  intl: { formatMessage },
  spaces,
  onSelected,
  isConnectingSpace,
  isDisconnectedTemplatesClick,
}: Props) => (
  <Container>
    <Instructions>
      {isDisconnectedTemplatesClick
        ? formatMessage(messages['disconnected-templates-description'])
        : formatMessage(messages.description)}
    </Instructions>
    <AKSelect
      options={spaces.map(({ spaceName: label, spaceKey: value }) => ({
        label,
        value,
      }))}
      placeholder={formatMessage(messages.placeholder)}
      isSearchable
      onChange={(option, { action }) => {
        if (option && action === 'select-option') {
          const { value: spaceKey, label: spaceName } = option;
          onSelected({ spaceKey, spaceName });
        }
      }}
      isDisabled={isConnectingSpace}
      menuPortalTarget={document.body}
      styles={{
        // without properly set zIndex value dropdown with options is cut inside modal dialogs
        menuPortal: (base) => ({ ...base, zIndex: layers.modal() }),
      }}
    />
  </Container>
);

export default ComponentWithAnalytics('spacePicker', {
  onSelected: 'selected',
})(injectIntl(SpacePicker));
