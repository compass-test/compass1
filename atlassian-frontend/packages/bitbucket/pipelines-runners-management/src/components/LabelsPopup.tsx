import React, { useState } from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import Popup from '@atlaskit/popup';

import LabelsPopupContent from './LabelsPopupContent';

type Props = {
  labels: string[];
  index: number;
};

export const buttonTheme = (currentTheme: any, themeProps: any) => {
  const { buttonStyles, ...rest } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      padding: '4px',
      height: '20px',
      alignItems: 'center',
      marginTop: '4px',
      marginLeft: '4px',
    },
    ...rest,
  };
};

const LabelsPopup: React.FC<Props> = ({ labels, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
        content={() => <LabelsPopupContent labels={labels} index={index} />}
        trigger={(triggerProps) => (
          <Button
            name={`labels-popup-${index}`}
            {...triggerProps}
            isSelected={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            spacing="compact"
            theme={buttonTheme}
          >
            ...
          </Button>
        )}
      />
    </>
  );
};

export default React.memo(LabelsPopup);
