import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { N0 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';

import { Button, ButtonWrapper } from './styled';

export interface Props {
  value: string;
  label: JSX.Element;
  isSelected?: boolean;
  onChange: (colorHexValue: string) => void;
  checkMarkColor?: string;
}

const Color = (props: Props & InjectedIntlProps) => {
  const { value, label, isSelected, checkMarkColor = N0 } = props;
  const handleOnClick = (e: React.MouseEvent<{}>) => {
    const { onChange, value } = props;
    e.preventDefault();
    onChange(value);
  };

  const handleOnMouseDown = (e: React.MouseEvent<{}>) => {
    e.preventDefault();
  };
  return (
    <Tooltip content={label}>
      <ButtonWrapper>
        <Button
          aria-label={label.props.defaultMessage}
          onClick={handleOnClick}
          onMouseDown={handleOnMouseDown}
          className={`${isSelected ? 'selected' : ''}`}
          style={{
            backgroundColor: value || 'transparent',
          }}
        >
          {isSelected && (
            <EditorDoneIcon primaryColor={checkMarkColor} label="" />
          )}
        </Button>
      </ButtonWrapper>
    </Tooltip>
  );
};
export default injectIntl(Color);
