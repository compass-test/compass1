import React, { useCallback } from 'react';
import EditIcon from '@atlaskit/icon/glyph/edit';
import AddIcon from '@atlaskit/icon/glyph/add';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button/button-group';
import Tooltip from '@atlaskit/tooltip';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import messages from '../../../messages';
import ShareButton from './share-button';
import { PageActionHandler } from '../../confluence-page-tree/types';
import { PageTreeItemProperties } from '../types';
import { UIAnalyticsEvent, AnalyticsContext } from '@atlaskit/analytics-next';
import { pageAnalyticsAttributes } from '../utils';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import OriginTracing from '@atlassiansox/origin-tracing';

interface Props {
  page: PageTreeItemProperties;
  readOnly?: boolean;
  onEditClick?: PageActionHandler;
  onShareToggle?: (page: PageTreeItemProperties, isOpen: boolean) => void;
  onAddChildClick?: (parentContentId: string) => void;
  origin: OriginTracing;
}

const PageControls = injectIntl(
  ({
    page,
    readOnly,
    onEditClick,
    onShareToggle,
    onAddChildClick,
    origin,
    intl: { formatMessage },
  }: Props & InjectedIntlProps) => {
    const handleEditClick = useCallback(
      (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
        onEditClick?.(page);
        fireUIAnalytics(
          analyticsEvent,
          'editPageButton',
          origin.toAnalyticsAttributes({
            hasGeneratedId: true,
          }),
        );
      },
      [onEditClick, origin, page],
    );
    const handleAddChildClick = useCallback(
      (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
        onAddChildClick?.(page.id);
        fireUIAnalytics(
          analyticsEvent,
          'createChildPageButton',
          origin.toAnalyticsAttributes({
            hasGeneratedId: true,
          }),
        );
      },
      [onAddChildClick, origin, page.id],
    );
    if (readOnly) {
      return null;
    }
    return (
      <ButtonGroup>
        <Tooltip
          content={formatMessage(
            page.hasEmbeddedEdit ? messages.edit : messages.editInConfluence,
          )}
          position="top"
        >
          <Button
            appearance="subtle"
            iconBefore={<EditIcon label="edit" />}
            onClick={handleEditClick}
          />
        </Tooltip>
        {!page.isDraft && <ShareButton page={page} onToggle={onShareToggle} />}
        {!page.isDraft && (
          <Tooltip
            content={formatMessage(messages.createChildPage)}
            position="top"
          >
            <Button
              appearance="subtle"
              iconBefore={<AddIcon label="create child page" />}
              onClick={handleAddChildClick}
            />
          </Tooltip>
        )}
      </ButtonGroup>
    );
  },
);

export default (props: Props) => (
  <AnalyticsContext data={{ attributes: pageAnalyticsAttributes(props.page) }}>
    <PageControls {...props} />
  </AnalyticsContext>
);
