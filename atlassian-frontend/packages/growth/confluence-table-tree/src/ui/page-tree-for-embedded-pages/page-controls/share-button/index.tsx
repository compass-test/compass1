import React, { useCallback, useMemo, useState } from 'react';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItemGroup } from '@atlaskit/dropdown-menu';
import CheckCircleOutlineIcon from '@atlaskit/icon/glyph/check-circle-outline';
import ShareIcon from '@atlaskit/icon/glyph/share';
import Textfield from '@atlaskit/textfield';
import { G400, N10 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import OriginTracing from '@atlassiansox/origin-tracing';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import messages from './messages';
import {
  Content,
  InlineMessage,
  ShareMenuWrapper,
  Subtitle,
  Title,
} from './styled';
import { PageTreeItemProperties } from '../../types';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  fireUIAnalytics,
  FireScreenAnalytics,
  ContextualAnalyticsData,
  DROPDOWN,
} from '@atlassian/analytics-bridge';

interface Props {
  page: PageTreeItemProperties;
  onToggle?: (page: PageTreeItemProperties, isOpen: boolean) => void;
}

const ShareButton = ({
  page,
  onToggle,
  intl: { formatMessage },
}: Props & InjectedIntlProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // the page-tree gets re-rendered every time a share is clicked so we have to create a new origin here,
  // otherwise the actual generated ID would be behind by 1 render
  const origin = useMemo(() => new OriginTracing({ product: 'jira' }), []);

  const handleCopy = useCallback(
    (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
      navigator.clipboard.writeText(origin.addToUrl(page.url)).then(() => {
        setIsCopied(true);
        fireUIAnalytics(
          analyticsEvent,
          'copyPageLinkButton',
          origin.toAnalyticsAttributes(),
        );
      });
    },
    [origin, page.url],
  );

  const handleOpenChange = useCallback(
    ({ isOpen }: { isOpen: boolean }, analyticsEvent: UIAnalyticsEvent) => {
      if (isOpen) {
        setIsCopied(false);
      }
      onToggle?.(page, isOpen);
      fireUIAnalytics(analyticsEvent, 'sharePageButton', {
        isOpen,
        ...origin.toAnalyticsAttributes({ hasGeneratedId: isOpen }), // start an origin trace when the share toggle is opened
      });
    },
    [onToggle, page, origin],
  );

  return (
    <Tooltip content={formatMessage(messages.tooltip)} position="top">
      <DropdownMenu
        triggerButtonProps={{
          iconBefore: <ShareIcon label="share" />,
          appearance: 'subtle',
        }}
        triggerType="button"
        onOpenChange={handleOpenChange}
        position="bottom right"
        boundariesElement="scrollParent"
      >
        <ContextualAnalyticsData sourceName="sharePage" sourceType={DROPDOWN}>
          <DropdownItemGroup>
            <ShareMenuWrapper>
              <Title>{formatMessage(messages.title)}</Title>
              <Subtitle>{formatMessage(messages.subtitle)}</Subtitle>
              <Content>
                <Textfield
                  isCompact
                  name="link"
                  isReadOnly
                  value={origin.addToUrl(page.url)}
                  appearance="subtle"
                  css={{
                    backgroundColor: N10,
                  }}
                />
                <Button onClick={handleCopy}>
                  {formatMessage(messages.copyButton)}
                </Button>
              </Content>
              {isCopied && (
                <InlineMessage>
                  <CheckCircleOutlineIcon
                    size="small"
                    label="copied"
                    primaryColor={G400}
                  />
                  {formatMessage(messages.copied)}
                </InlineMessage>
              )}
            </ShareMenuWrapper>
          </DropdownItemGroup>
          <FireScreenAnalytics attributes={origin.toAnalyticsAttributes()} />
        </ContextualAnalyticsData>
      </DropdownMenu>
    </Tooltip>
  );
};

export default injectIntl(ShareButton);
