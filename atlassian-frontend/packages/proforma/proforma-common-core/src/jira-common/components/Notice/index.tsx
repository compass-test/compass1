import React from 'react';

import {
  AsyncIntlProvider,
  DEFAULT_LOCALE,
  Locale,
  ProFormaIntlProvider,
} from '@atlassian/proforma-translations';

import * as i18n from '../../../i18n';

import { NoticeDialog } from './NoticeDialog';
import { Notices, NoticeType } from './noticeTypes';

export interface IntlValues {
  titleVars?: { [varName: string]: string };
  msgVars?: { [varName: string]: string };
}

export interface NoticeSettings {
  customLocale?: Locale;
  intlValues?: IntlValues;
  errorDetails?: string;
  overrideZIndex?: boolean;
}

interface NoticeComponentProps {
  noticeType: NoticeType;
  handleClose: (confirmed?: boolean) => void;
  settings: NoticeSettings;
}

export const Notice: React.FC<NoticeComponentProps> = ({
  noticeType,
  handleClose,
  settings: {
    customLocale = DEFAULT_LOCALE,
    intlValues,
    errorDetails,
    overrideZIndex,
  },
}) => {
  const notice = Notices[noticeType];

  if (!notice) {
    // eslint-disable-next-line no-console
    console.error(
      `Could not show notice, notice type ${noticeType} does not exist`,
    );
    handleClose();
  }

  return (
    <AsyncIntlProvider locale={customLocale}>
      <ProFormaIntlProvider i18nMessages={i18n} customLocale={customLocale}>
        <NoticeDialog
          title={notice.title}
          titleVars={
            intlValues && intlValues.titleVars
              ? intlValues.titleVars
              : undefined
          }
          message={notice.message}
          messageVars={
            intlValues && intlValues.msgVars ? intlValues.msgVars : undefined
          }
          confirmText={notice.confirmText}
          confirmLink={notice.confirmLink}
          handleClose={handleClose}
          isErrorNotice={notice.isErrorNotice}
          errorDetails={errorDetails}
          isWarningNotice={notice.isWarningNotice}
          overrideZIndex={overrideZIndex}
        />
      </ProFormaIntlProvider>
    </AsyncIntlProvider>
  );
};
