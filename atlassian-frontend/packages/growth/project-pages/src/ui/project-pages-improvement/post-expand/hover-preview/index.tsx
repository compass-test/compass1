import React from 'react';
import { Template, TemplateType } from '../../../../controllers/template/types';
import { Popper } from '@atlaskit/popper';
import { gridSize } from '@atlaskit/theme/constants';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import {
  HoverPreviewContainer,
  TemplateInfo,
  Icon,
  TemplateName,
  Screenshot,
} from './styled';

interface Props {
  template?: Template;
  boundaryRef: React.RefObject<HTMLElement>;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
}

const HoverPreview = ({
  template,
  boundaryRef,
  onMouseEnter,
  onMouseLeave,
  intl,
}: Props & InjectedIntlProps) => {
  if (!template || template.type !== TemplateType.Confluence) {
    return null;
  }
  return (
    <Popper
      placement="left"
      modifiers={[
        { name: 'offset', options: { offset: [0, gridSize() * 4] } },
        {
          name: 'preventOverflow',
          options: {
            padding: gridSize() * 2,
            boundary: boundaryRef.current || undefined,
          },
        },
      ]}
      strategy="absolute"
    >
      {({ ref, style }) => (
        <HoverPreviewContainer
          innerRef={ref || undefined}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <TemplateInfo>
            <Icon>
              {template.iconRender({
                size: 'small',
                color: template.defaultIconColor,
              })}
            </Icon>
            <TemplateName>{intl.formatMessage(template.name)}</TemplateName>
          </TemplateInfo>
          <Screenshot>
            <img src={template.screenShot.postExpand} width="100%" />
          </Screenshot>
        </HoverPreviewContainer>
      )}
    </Popper>
  );
};

export default injectIntl(HoverPreview);
