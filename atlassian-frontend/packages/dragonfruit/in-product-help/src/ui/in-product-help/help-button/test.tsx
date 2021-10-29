import React from 'react';

import { render } from '@testing-library/react';

import { HelpProvider } from '../../../controllers/help-context-controller';

import { HelpButton } from './index';

describe('<HelpButton />', () => {
  describe('should render HelpButton', () => {
    it('should find HelpButton by testId', () => {
      const helpIconTestId = 'dragonfruit.help.help-icon';
      const { getByTestId } = render(
        <HelpProvider>
          <HelpButton
            articleId="7JbAjDn8PGS7Utw4uR7jtC"
            testId={helpIconTestId}
          />
        </HelpProvider>,
      );

      const helpButton = getByTestId(helpIconTestId);

      expect(helpButton).toBeInTheDocument();
    });
  });
});
