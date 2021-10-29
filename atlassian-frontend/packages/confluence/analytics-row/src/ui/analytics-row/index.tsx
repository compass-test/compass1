import React, { FC, useCallback, useState } from 'react';

import Avatar, { AppearanceType, SizeType } from '@atlaskit/avatar';
import Button from '@atlaskit/button/custom-theme-button';
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import { N300, N600, N800, N900 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';

import {
  EntityColumn,
  EntityName,
  EntityRow,
  EntitySubname,
  ForwardedRefToolTipTag,
  MetricsCellUnit,
  MetricsCellValue,
  MetricsColumn,
  ReadOnlyRow,
  Row,
  rowTheme,
  StyledAnalyticsIcon,
  StyledAnalyticsIconOnHover,
  StyledAvatar,
  StyledRow,
} from './styled';
import {
  AnalyticsIconType,
  AnalyticsRowContainer,
  AnalyticsRowContent,
  AnalyticsRowLinkType,
  MetricsCellType,
  RowEntityMetric,
  RowEntryType,
} from './types';

const formatAbbreviatedNumber = (value: number): string => {
  try {
    return Intl.NumberFormat().format(value);
  } catch (e) {
    return String(value);
  }
};

const getAvatar = (
  atlaskitIcon: React.ReactNode,
  content: AnalyticsRowContent,
  shape: AppearanceType | undefined,
  size?: SizeType,
) => {
  if (atlaskitIcon) {
    return atlaskitIcon;
  }
  return (
    <Avatar
      appearance={shape}
      src={content.iconUrl}
      size={size || 'medium'}
      borderColor={'none'}
    />
  );
};

const MetricCellValue: FC<MetricsCellType> = ({ value }: { value: string }) => {
  return <MetricsCellValue>{value}</MetricsCellValue>;
};

const FirstRowEntityMetric: FC<RowEntityMetric> = ({ content }) => {
  const metric =
    content.value === 1 ? content.metric?.singular : content.metric.plural;
  const formattedNumber = formatAbbreviatedNumber(content.value);
  const fontCellUnitColor = content.hasSubname ? N300 : N600;
  return (
    <MetricsColumn>
      <div>
        <MetricCellValue value={formattedNumber} />
        <MetricsCellUnit color={fontCellUnitColor}>{metric}</MetricsCellUnit>
      </div>
    </MetricsColumn>
  );
};

const AnalyticsReadOnlyRow: FC<AnalyticsRowLinkType> = ({ children }) => {
  return (
    <Row>
      <ReadOnlyRow>{children}</ReadOnlyRow>
    </Row>
  );
};

const RowEntity: FC<RowEntryType> = ({ content, showIcon, avatarSize }) => {
  const shape = showIcon ? 'square' : 'circle';
  const isAtlaskitIcon = showIcon && content.atlaskitIcon;
  const avatarIcon = getAvatar(isAtlaskitIcon, content, shape, avatarSize);
  const fontColor = content.hasSubname ? N800 : N900;

  const entityRow = (
    <EntityRow>
      <div style={{ display: 'block' }}>
        <StyledAvatar>{avatarIcon}</StyledAvatar>
      </div>
      <Tooltip
        content={`${content.name}`}
        tag={ForwardedRefToolTipTag}
        position="bottom"
      >
        <EntityName color={fontColor}>{`${content.name}`}</EntityName>
      </Tooltip>
    </EntityRow>
  );

  const entityRowWithSubname = (
    <EntityRow>
      <div style={{ display: 'block' }}>
        <StyledAvatar>{avatarIcon}</StyledAvatar>
      </div>
      <EntityColumn>
        <EntityName color={`${N800}`}>{`${content.name}`}</EntityName>
        <EntitySubname>{`${content.subname}`}</EntitySubname>
      </EntityColumn>
    </EntityRow>
  );

  return content.hasSubname ? entityRowWithSubname : entityRow;
};

const AnalyticsRowLink: FC<AnalyticsRowLinkType> = ({
  onClick,
  href,
  enableAnalyticsIconOnHover,
  disableAnalyticsIconOnHover,
  children,
}) => {
  return (
    <Row data-testid={'analytics-row-link'}>
      <Button
        testId={'search-analytics-panel-table-button'}
        theme={rowTheme}
        appearance="subtle"
        href={href}
        onClick={onClick}
        onMouseEnter={enableAnalyticsIconOnHover}
        onMouseLeave={disableAnalyticsIconOnHover}
      >
        {children}
      </Button>
    </Row>
  );
};

const AnalyticsIcon: FC<AnalyticsIconType> = ({ tooltipMessage, onClick }) => {
  return (
    <StyledAnalyticsIconOnHover>
      <Tooltip content={tooltipMessage} position="top">
        <StyledAnalyticsIcon onClick={onClick}>
          <GraphLineIcon label="view analytics" />
        </StyledAnalyticsIcon>
      </Tooltip>
    </StyledAnalyticsIconOnHover>
  );
};

const AnalyticsRow: FC<RowEntryType> = ({
  content,
  showIcon,
  avatarSize,
  isReadOnly,
  isFirstEntry,
  analyticsIconOnHoverDetails,
}) => {
  const formattedNumber = content.value
    ? formatAbbreviatedNumber(content.value)
    : '0';
  const [isAnalyticsIconSet, setAnalyticsIconOnHover] = useState(false);
  const enableAnalyticsIconOnHover = useCallback(() => {
    setAnalyticsIconOnHover(true);
  }, [setAnalyticsIconOnHover]);

  const disableAnalyticsIconOnHover = useCallback(() => {
    setAnalyticsIconOnHover(false);
  }, [setAnalyticsIconOnHover]);

  const showAnalyticsIcon =
    analyticsIconOnHoverDetails?.tooltipMessage && isAnalyticsIconSet;

  const metricsColumn =
    showAnalyticsIcon && analyticsIconOnHoverDetails ? (
      <AnalyticsIcon
        onClick={analyticsIconOnHoverDetails?.onClick}
        tooltipMessage={analyticsIconOnHoverDetails.tooltipMessage}
      />
    ) : isFirstEntry ? (
      <FirstRowEntityMetric content={content} />
    ) : (
      <MetricCellValue value={formattedNumber} />
    );
  const rowEntry = (
    <StyledRow>
      <RowEntity
        content={content}
        showIcon={showIcon}
        avatarSize={avatarSize}
      />
      {metricsColumn}
    </StyledRow>
  );

  return isReadOnly ? (
    <AnalyticsReadOnlyRow>{rowEntry}</AnalyticsReadOnlyRow>
  ) : (
    <AnalyticsRowLink
      onClick={content.onClick}
      href={content.href}
      enableAnalyticsIconOnHover={enableAnalyticsIconOnHover}
      disableAnalyticsIconOnHover={disableAnalyticsIconOnHover}
    >
      {rowEntry}
    </AnalyticsRowLink>
  );
};

export const AnalyticsRows: FC<AnalyticsRowContainer> = ({
  content,
  maxRows,
  showIcon,
  atlaskitIcon,
  avatarSize,
  isReadOnly,
  analyticsIconOnHoverDetails,
  testId,
}) => {
  const data =
    maxRows && content.length > maxRows ? content.slice(0, maxRows) : content;
  if (data?.length) {
    return (
      <div data-testid={testId}>
        {data.map((rowData, index) => {
          return (
            <AnalyticsRow
              key={rowData.key}
              content={rowData}
              showIcon={showIcon}
              atlaskitIcon={atlaskitIcon}
              avatarSize={avatarSize}
              isFirstEntry={index === 0}
              isReadOnly={isReadOnly}
              analyticsIconOnHoverDetails={analyticsIconOnHoverDetails}
            />
          );
        })}
      </div>
    );
  }
  return null;
};

export default AnalyticsRows;
