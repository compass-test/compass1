import React from 'react';
import { injectIntl } from 'react-intl';
import Button, { ButtonGroup } from '@atlaskit/button';
import messages from '../messages';
import Tooltip from '@atlaskit/tooltip';
import {
  PreviewWrapper,
  TopBar,
  TopBarDot,
  Content,
  BottomBar,
  PreviewTeaser,
} from './styled';
import { TemplatePreviewViewProps } from './types';
import { useTemplate } from '../../../controllers/template';
import { TemplateType } from '../../../controllers/template/types';

const TemplatePreviewView = ({
  intl,
  onTryClick,
  onLearnMoreClick,
}: TemplatePreviewViewProps) => {
  const template = useTemplate();
  let content = null;

  // eslint-disable-next-line no-undef
  if (!__SERVER__ && template && template.type === TemplateType.Confluence) {
    content = <img src={template.screenShot.preExpand} width="100%" />;
  }

  return (
    <PreviewWrapper>
      <TopBar>
        <TopBarDot />
        <TopBarDot />
        <TopBarDot />
      </TopBar>
      <Content>{content}</Content>
      <BottomBar>
        <PreviewTeaser>
          {intl.formatMessage(messages.previewTeaser)}
        </PreviewTeaser>
        <ButtonGroup>
          <Button appearance="subtle-link" onClick={onLearnMoreClick}>
            {intl.formatMessage(messages.learnMoreButton)}
          </Button>
          <Tooltip content={intl.formatMessage(messages.tryButtonTooltip)}>
            <Button appearance="primary" onClick={onTryClick}>
              {intl.formatMessage(messages.tryButton)}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </BottomBar>
    </PreviewWrapper>
  );
};

export default injectIntl(TemplatePreviewView);
