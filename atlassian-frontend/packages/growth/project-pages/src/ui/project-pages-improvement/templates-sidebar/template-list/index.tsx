import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import React, { useState } from 'react';
import OriginTracing from '@atlassiansox/origin-tracing';
import { connectUIAnalytics } from '../../../../common/analytics/util';
import styled from 'styled-components';
import { Template, TemplateType } from '../../../../controllers/template/types';
import TemplateCard from './template-card';

const Wrapper = styled.div`
  margin-top: ${gridSize() * 2}px;
`;

interface Props {
  templates: Template[];
  activeTemplate?: Template;
  onTemplateClick?: (
    template: Template,
    analyticsEvent?: UIAnalyticsEvent,
  ) => void;
  onTemplateMouseEnter?: (template: Template) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hoverRef?: React.Ref<any>;
  isDisabled: boolean;
  origin: OriginTracing | null | undefined;
}

const TemplateList = ({
  onTemplateClick,
  onTemplateMouseEnter,
  onMouseLeave,
  hoverRef,
  templates,
  activeTemplate,
  isDisabled,
  origin,
}: Props) => {
  const [hoveredTemplate, setHoveredTemplate] = useState<Template | null>(null);
  const handleClick = (template: Template) => (
    _: React.MouseEvent,
    analyticsEvent?: UIAnalyticsEvent,
  ) => {
    const originAttributes = origin?.toAnalyticsAttributes({
      hasGeneratedId: true,
    });
    if (originAttributes) {
      analyticsEvent?.update(originAttributes);
    }
    onTemplateClick && onTemplateClick(template, analyticsEvent);
  };
  const handleMouseEnter = (template: Template) => () => {
    onTemplateMouseEnter && onTemplateMouseEnter(template);
    setHoveredTemplate(template);
  };
  return (
    <Wrapper onMouseLeave={onMouseLeave}>
      {templates.map<React.ReactNode>((tmpl) => (
        <div
          key={tmpl.key}
          ref={
            hoveredTemplate &&
            hoveredTemplate.type === TemplateType.Confluence &&
            hoveredTemplate.key === tmpl.key
              ? hoverRef
              : undefined
          }
        >
          <TemplateCard
            name={tmpl.name}
            description={tmpl.description}
            icon={tmpl.iconRender({
              size: 'medium',
              color: tmpl.defaultIconColor,
            })}
            onClick={handleClick(tmpl)}
            onMouseEnter={handleMouseEnter(tmpl)}
            tooltip={tmpl.tooltip}
            isDisabled={isDisabled}
            isActive={tmpl.key === activeTemplate?.key}
            renderShortcutIcon={
              tmpl.type === TemplateType.Link && tmpl.renderShortcutIcon
            }
          />
        </div>
      ))}
    </Wrapper>
  );
};

export default connectUIAnalytics<Props>({
  onTemplateClick: (template: Template) => ({
    name: template.key,
  }),
})(TemplateList);
