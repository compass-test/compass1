import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import * as S from './styled';

export type Title = string | FormattedMessage.MessageDescriptor;
export type Description = string | FormattedMessage.MessageDescriptor;

export type Step = {
  key: string;
  img: string;
  title: Title;
  description: Description;
};

export type HowItWorksProps = {
  steps: Step[];
};

const HowItWorks: FC<HowItWorksProps> = ({ steps }) => {
  return (
    <S.StepList role="list">
      {steps &&
        steps.map(({ description, img, title, key }) => {
          return (
            <S.Step key={key} img={img}>
              <S.StepTitle>
                {typeof title === 'string' ? (
                  title
                ) : (
                  <FormattedMessage {...title} />
                )}
              </S.StepTitle>
              {typeof description === 'string' ? (
                description
              ) : (
                <FormattedMessage {...description} />
              )}
            </S.Step>
          );
        })}
    </S.StepList>
  );
};

export default HowItWorks;
