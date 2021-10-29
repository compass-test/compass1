import React, { FC } from 'react';

import { LegalNote } from '@atlassian/commerce-legal-notes';

import { Breadcrumb } from '../common/utils/events';

export const ReCaptchaErrorMessage: FC = () => (
  <Breadcrumb name="reCaptchaErrorMessage">
    {/* TODO: Add a message for reCAPTCHA errors */}
  </Breadcrumb>
);

/**
 * Use this if you need to style the legal text yourself
 * @see {@link ReCaptchaLegalText}
 */
export const RawReCaptchaLegalText: FC = () => (
  <Breadcrumb name="legalNoteScreen">
    This site is protected by reCAPTCHA and the Google{' '}
    <a
      href="https://policies.google.com/privacy"
      target="_blank"
      rel="noreferrer"
    >
      Privacy Policy
    </a>{' '}
    and{' '}
    <a
      href="https://policies.google.com/terms"
      target="_blank"
      rel="noreferrer"
    >
      Terms of Service
    </a>{' '}
    apply.
  </Breadcrumb>
);

/**
 * You need to put this somewhere in your payment flow
 * @see https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
 * @see {@link RawReCaptchaLegalText}
 */
export const ReCaptchaLegalText: FC = () => (
  // TODO: TS ignore is just a temporary solution for: https://github.com/emotion-js/emotion/issues/1431
  // @ts-ignore
  <LegalNote data-testid="commerce-recaptcha-base.legal-note">
    <RawReCaptchaLegalText />
  </LegalNote>
);
