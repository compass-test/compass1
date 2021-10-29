import React, { Fragment, useState } from 'react';
import '@atlaskit/css-reset';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import Form, { CheckboxField } from '@atlaskit/form';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import SectionMessage from '@atlaskit/section-message';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/header';
import CorporateCLAContent from '../components/content/corporate-cla-content';
import {
  IntroCLAContent,
  CallToActionCLAContent,
  HelpDeskContent,
  CLASubmittedContent,
  ErrorContent,
} from '../components/content/common-content';
import CompanyInformation from '../components/form-sections/company-information';
import PersonalInformation from '../components/form-sections/personal-information';
import PointOfContact from '../components/form-sections/point-of-contact';
import ScheduleA from '../components/form-sections/schedule-a';
import ScheduleB from '../components/form-sections/schedule-b';
import { formStyles } from '../components/form.styles';

/* eslint-disable jsx-a11y/anchor-is-valid */
// next.js `<Link>` isn't a11y friendly because `a` doesn't need/have an `href` defined
// https://github.com/zeit/next.js/issues/5533
const CorporateCLA = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async data => {
    setErrors(null);
    setSubmitted(false);

    const response = await fetch('/contributor/corporate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const { errorMessage } = await response.json();
      setErrors(errorMessage);
    }

    setSubmitted(true);
  };

  return (
    <Fragment>
      <Head>
        <title>Atlassian CLA - Corporate</title>
      </Head>
      <Page>
        <Grid spacing="comfortable">
          <GridColumn>
            <Header>Corporate Contributor License Agreement (CLA)</Header>
            <Fragment>
              <IntroCLAContent />
              <p>
                This version of the Agreement allows an entity (the
                &quot;Corporation&quot;) to submit Contributions to Atlassian,
                to authorize Contributions submitted by its designated employees
                to Atlassian, and to grant copyright and patent licenses
                thereto.
              </p>
              <CallToActionCLAContent />
              <p>
                If you are making contributions as an individual, then please
                complete the{' '}
                <Link href="/individual">
                  <a>Individual CLA</a>
                </Link>
                .
              </p>
              <HelpDeskContent />
              <section>
                {submitted &&
                  (errors ? (
                    <SectionMessage appearance="error" title="Uh oh!">
                      <ErrorContent errorMessage={errors} />
                    </SectionMessage>
                  ) : (
                    <SectionMessage appearance="success" title="Thank you!">
                      <CLASubmittedContent />
                    </SectionMessage>
                  ))}
              </section>
            </Fragment>
            <Form onSubmit={data => handleSubmit(data)}>
              {({ formProps, dirty, submitting }) => (
                <form {...formProps}>
                  <section className="cla-container">
                    <article className="cla">
                      <CompanyInformation />
                      <PointOfContact />
                      <PersonalInformation />
                      <ScheduleA />
                      <ScheduleB />
                    </article>
                    <article className="cla">
                      <div className="cla-legal">
                        <CorporateCLAContent />
                      </div>
                      <div className="cla-footer">
                        <div className="cla-footer-item checkbox">
                          <CheckboxField name="agree" isRequired>
                            {({ fieldProps }) => (
                              <Checkbox {...fieldProps} label="I agree" />
                            )}
                          </CheckboxField>
                        </div>
                        <div className="cla-footer-item submit">
                          <Button
                            type="submit"
                            isDisabled={!dirty || submitting}
                            appearance="primary"
                            isLoading={submitting}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </article>
                  </section>
                </form>
              )}
            </Form>
          </GridColumn>
        </Grid>
      </Page>
      <style jsx>{formStyles}</style>
    </Fragment>
  );
};

export default CorporateCLA;
