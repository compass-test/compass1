import React, { CSSProperties } from 'react';

import { v4 as uuidv4 } from 'uuid';

import CompleteIcon from '@atlaskit/icon/glyph/check-circle';
import CopyIcon from '@atlaskit/icon/glyph/copy';
import { ExitingPersistence, SlideIn } from '@atlaskit/motion';
import Tooltip from '@atlaskit/tooltip';

import {
  CopiedTextIconContainer,
  CopyableTextIconContainer,
  IconsContainer,
} from './styled';

interface Props {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  /**
   * Text to display and then be copied
   */
  text?: string;
  /**
   * Styles for the container
   */
  style?: CSSProperties;
}

const CopyableText = ({ text, testId, style }: Props) => {
  const [isCopyButtonVisible, setIsCopyButtonVisible] = React.useState<boolean>(
    false,
  );

  const [hasCopiedText, setHasCopiedText] = React.useState<boolean>(false);

  const fieldId = `text-content-${uuidv4()}`;

  const copyText = () => {
    const range = document.createRange();
    const element = document.getElementById(fieldId);
    if (element) {
      // TODO : Remove when AFP upgrades JEST infrastructure
      if (range.selectNode) {
        range?.selectNode(element);
        window?.getSelection()?.removeAllRanges();
        window?.getSelection()?.addRange(range);
      }

      document.execCommand('copy');
      setHasCopiedText(true);

      window.getSelection()?.removeAllRanges();
    }
  };

  const setupCopyableContext = () => {
    setIsCopyButtonVisible(true);
    setHasCopiedText(false);
  };

  const resetContent = () => {
    setIsCopyButtonVisible(false);
    setHasCopiedText(false);
  };

  return (
    <div
      onMouseEnter={setupCopyableContext}
      onMouseLeave={resetContent}
      style={style}
    >
      <span id={fieldId} data-testid={testId}>
        {text}
      </span>
      <ExitingPersistence>
        <IconsContainer>
          {isCopyButtonVisible && (
            <SlideIn
              enterFrom={'left'}
              exitTo={'left'}
              duration={500}
              fade={'in'}
            >
              {(props) => (
                <div {...props} style={{ display: 'inline-block' }}>
                  {!hasCopiedText ? (
                    <Tooltip content="Copy text" tag="span">
                      <CopyableTextIconContainer
                        data-testid="copyable-text-icon"
                        onClick={() => copyText()}
                      >
                        <CopyIcon label={'Copy text'} size={'small'} />
                      </CopyableTextIconContainer>
                    </Tooltip>
                  ) : (
                    <Tooltip content="Copied text" tag="span">
                      <CopiedTextIconContainer>
                        <CompleteIcon label={'Copied text'} size={'small'} />
                      </CopiedTextIconContainer>
                    </Tooltip>
                  )}
                </div>
              )}
            </SlideIn>
          )}
        </IconsContainer>
      </ExitingPersistence>
    </div>
  );
};

export default CopyableText;
