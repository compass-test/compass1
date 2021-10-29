import React, { Fragment, useState } from 'react';
import '@atlaskit/css-reset';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import Form, { Field, ErrorMessage, CheckboxField } from '@atlaskit/form';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import SectionMessage from '@atlaskit/section-message';
import TextArea from '@atlaskit/textarea';
import TextField from '@atlaskit/textfield';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/header';
import IndividualCLAContent from '../components/content/individual-cla-content';
import {
  IntroCLAContent,
  CallToActionCLAContent,
  HelpDeskContent,
  CLASubmittedContent,
  ErrorContent,
} from '../components/content/common-content';
import { formStyles } from '../components/form.styles';
import { emailRegex } from '../utils/constants';
import {
  validateLength,
  validateLengthAndCharacters,
  displayErrorMessages,
} from '../utils/form-validation-helper';

/* eslint-disable jsx-a11y/anchor-is-valid */
// next.js `<Link>` isn't a11y friendly because `a` doesn't need/have an `href` defined
// https://github.com/zeit/next.js/issues/5533
const IndividualCLA = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async data => {
    setErrors(null);
    setSubmitted(false);

    const response = await fetch('/contributor/individual', {
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
        <title>Atlassian CLA - Individual</title>
      </Head>
      <Page>
        <Grid spacing="comfortable">
          <GridColumn>
            <Header>Individual Contributor License Agreement (CLA)</Header>
            <Fragment>
              <IntroCLAContent />
              <CallToActionCLAContent />
              <p>
                If you will be contributing on behalf of your employer, you will
                need to complete the{' '}
                <Link href="/corporate">
                  <a>Corporate CLA</a>
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
                      <Field
                        name="github_name"
                        label="GitHub username"
                        defaultValue=""
                        isRequired
                        validate={validateLengthAndCharacters}
                      >
                        {({ fieldProps, error }) => (
                          <Fragment>
                            <TextField {...fieldProps} />
                            {displayErrorMessages(error)}
                          </Fragment>
                        )}
                      </Field>
                      <Field
                        name="first_name"
                        label="First name"
                        defaultValue=""
                        isRequired
                        validate={validateLength}
                      >
                        {({ fieldProps, error }) => (
                          <Fragment>
                            <TextField {...fieldProps} />
                            {displayErrorMessages(error)}
                          </Fragment>
                        )}
                      </Field>
                      <Field
                        name="last_name"
                        label="Last name"
                        defaultValue=""
                        isRequired
                        validate={validateLength}
                      >
                        {({ fieldProps, error }) => (
                          <Fragment>
                            <TextField {...fieldProps} />
                            {displayErrorMessages(error)}
                          </Fragment>
                        )}
                      </Field>
                      <Field
                        name="address"
                        label="Mailing Address"
                        defaultValue=""
                        isRequired
                      >
                        {({ fieldProps }) => (
                          <Fragment>
                            <TextArea {...fieldProps} minimumRows={4} />
                          </Fragment>
                        )}
                      </Field>
                      <Field
                        name="email"
                        label="Email"
                        defaultValue=""
                        isRequired
                        validate={value =>
                          value && !emailRegex.test(value)
                            ? 'INVALID_EMAIL'
                            : undefined
                        }
                      >
                        {({ fieldProps, error }) => (
                          <Fragment>
                            <TextField {...fieldProps} />
                            {error === 'INVALID_EMAIL' && (
                              <ErrorMessage>Invalid email</ErrorMessage>
                            )}
                          </Fragment>
                        )}
                      </Field>
                    </article>
                    <article className="cla">
                      <div className="scrollable-area cla-legal">
                        <IndividualCLAContent />
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

export default IndividualCLA;
