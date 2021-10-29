import React from 'react';

export const IntroCLAContent = () => {
  return (
    <p>
      Thank you for your interest in Atlassian Pty Ltd's and its affiliates'
      ("Atlassian") open source projects. In order to clarify the intellectual
      property license granted with Contributions from any person or entity,
      Atlassian must have a Contributor License Agreement on file that has been
      signed by each Contributor, indicating agreement to the license terms
      below. This license is for your protection as a Contributor as well as the
      protection of Atlassian and its users; it does not change your rights to
      use your own Contributions for any other purpose.
    </p>
  );
};

export const CallToActionCLAContent = () => {
  return (
    <p>
      If you have not already done so, please complete and sign (checking "I
      agree"). Please read this page carefully before signing and keep a copy
      for your records.
    </p>
  );
};

export const HelpDeskContent = () => {
  return (
    <p>
      <small>
        For questions, or if you have previously signed the CLA and would like
        to update your details, please email us at{' '}
        <a href="mailto:contributions@atlassian.com">
          contributions@atlassian.com
        </a>
        .
      </small>
    </p>
  );
};

export const CLASubmittedContent = () => {
  return (
    <div>
      <p>
        Thank you for taking the time to register as an open source contributor.
        You may print the submission below for your records.
      </p>
      <p>
        We will now be able to accept any pull requests that you make to
        projects on our GitHub account. If you have already opened a pull
        request prior to signing the CLA, please reload the pull request page,
        and it should update accordingly. If you haven't submitted a pull
        request yet, then we look forward to your future contributions!
      </p>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
export const ErrorContent = ({ errorMessage }) => {
  return (
    <div>
      <p>Unfortunately, there was an error submitting your details.</p>
      <p>{errorMessage}</p>
    </div>
  );
};
