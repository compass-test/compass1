import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import Button, { ButtonGroup } from '@atlaskit/button';
import OpenIcon from '@atlaskit/icon/glyph/open';
import {
  useCallbackWithAnalyticsController,
  useCallbackWithUIEventController,
} from '@atlassian/mpt-analytics';

import * as S from '../../styled';

import { messages } from './messages';

type Props = {
  listOfOccurrences: string[];
  appAssessmentUrl: string;
  alphaStageUrl: string;
  onRemoveApps: (appKeys: string[]) => void;
};

const AppReliability: FC<Props> = ({
  listOfOccurrences,
  appAssessmentUrl,
  alphaStageUrl,
  onRemoveApps,
}: Props) => {
  const wrappedOnRemoveApps = useCallbackWithUIEventController(onRemoveApps, {
    eventType: 'UI',
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'removeNonReliableAppsFromMigration',
  });

  const wrappedOnClick = useCallbackWithAnalyticsController(() => {}, {
    eventType: 'UI',
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'goToAppAssessment',
  });

  return (
    <>
      <S.Description>
        <FormattedMessage
          {...messages.appReliabilityMessage}
          values={{
            stageOne: (
              <a href={alphaStageUrl} target="_blank">
                <FormattedMessage {...messages.stageOne} />
              </a>
            ),
          }}
        />
      </S.Description>
      <S.List>
        <S.ListRow>
          <FormattedMessage
            {...messages.changeAppsInAssessmentOption}
            values={{
              changeInAssessmentMessage: (
                <strong>
                  <FormattedMessage
                    {...messages.changeDecisionInAppAssessment}
                  />
                </strong>
              ),
            }}
          />
        </S.ListRow>
        <S.ListRow>
          <FormattedMessage
            {...messages.removeAppsFromMigrationOption}
            values={{
              removeAppsMessage: (
                <strong>
                  <FormattedMessage
                    {...messages.removeAppsMessage}
                    values={{
                      count: listOfOccurrences.length,
                    }}
                  />
                </strong>
              ),
            }}
          />
        </S.ListRow>
        <S.ListRow>
          <FormattedMessage {...messages.proceedWithMigrationOption} />
        </S.ListRow>
      </S.List>

      <ButtonGroup>
        <Button
          href={appAssessmentUrl}
          target="_blank"
          iconAfter={<OpenIcon label="download" />}
          onClick={wrappedOnClick}
        >
          <FormattedMessage {...messages.changeDecisionInAppAssessment} />
        </Button>
        <Button onClick={wrappedOnRemoveApps} role="button">
          <FormattedMessage
            {...messages.removeAppsMessage}
            values={{
              count: listOfOccurrences.length,
            }}
          />
        </Button>
      </ButtonGroup>
      {listOfOccurrences && (
        <S.Table>
          <thead>
            <tr>
              <th>
                <FormattedMessage {...messages.appsListHeader} />
              </th>
            </tr>
          </thead>
          <tbody>
            {listOfOccurrences.map((name) => (
              <tr key={name}>
                <td>
                  <p>{name}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      )}
    </>
  );
};

export default AppReliability;
