import React from 'react';

import { render } from '@testing-library/react';
import { layers } from '@atlaskit/theme/constants';

import { PortalProvider } from '../portal';

test('Portal zIndex is above modal', () => {
  const { getByTestId } = render(<PortalProvider />);
  const portalElement = getByTestId('forge-ui-portal');
  expect(portalElement.parentElement!.style.zIndex).toEqual(
    String(layers.modal() + 1),
  );
});
