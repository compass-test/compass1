import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../../messages';
import CustomThemeButton from '@atlaskit/button/custom-theme-button';

export interface FeedbackButtonProps {
  onClick: (e: React.MouseEvent) => any;
}

export const FeedbackButton: FunctionComponent<{
  onClick: (e: React.KeyboardEvent | React.MouseEvent) => any;
}> = ({ onClick }) => {
  return (
    <CustomThemeButton
      onClick={onClick}
      appearance="subtle"
      theme={(theme: any, props: any) => {
        const currentStyles = theme({ ...props });
        return {
          ...currentStyles,
          buttonStyles: {
            ...currentStyles.buttonStyles,
            margin: '0 auto',
            display: 'block',
          },
        };
      }}
    >
      <FormattedMessage {...messages.common_give_feedback} />
    </CustomThemeButton>
  );
};
