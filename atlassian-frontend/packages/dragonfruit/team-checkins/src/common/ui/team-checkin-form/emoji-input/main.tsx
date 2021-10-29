import React, { useCallback, useState } from 'react';

import { useIntl } from '@atlassian/dragonfruit-utils';

import { ImageRadio } from '../../../../common/ui/image-radio';
import { Bad, Good, Great, NotGreat, Ok } from '../../assets';

import messages from './messages';
import { Emoji, InputWrapper } from './styled';

interface EmojiInputProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
  value?: string;
}

export const EmojiInput: React.FC<EmojiInputProps> = ({
  name,
  onChange: providedOnChange,
  testId,
  value: defaultValue,
}) => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (providedOnChange) {
        providedOnChange(e);
      }

      setValue(e.target.value);
    },
    [providedOnChange, setValue],
  );

  // This is... potentially confusing. All that's going on is creating dynamic,
  // spreadable properties for each ImageRadio. This includes:
  //
  //   * Shared properties across all inputs: name, onChange, value
  //   * The `optionValue`, `label`, and `image` unique to each ImageRadio
  //   * The `testId` which is conditionally derived from the input `testId`.
  //     Derived testIds is what precipated this mess.
  //
  // Syntactically not much worse than explicit instantiation of each ImageRadio,
  // but just making the decision and result a bit more clear.

  const baseRadioProps = {
    name,
    currentValue: value,
    onChange,
  };

  const radioProps = [
    {
      ...baseRadioProps,
      value: '1',
      label: formatMessage(messages.bad),
      image: <Emoji src={Bad} alt={formatMessage(messages.bad)} />,
      ...(testId && {
        testId: `${testId}.bad`,
      }),
    },
    {
      ...baseRadioProps,
      value: '2',
      label: formatMessage(messages.notGreat),
      image: <Emoji src={NotGreat} alt={formatMessage(messages.notGreat)} />,
      ...(testId && {
        testId: `${testId}.not-great`,
      }),
    },
    {
      ...baseRadioProps,
      value: '3',
      label: formatMessage(messages.ok),
      image: <Emoji src={Ok} alt={formatMessage(messages.ok)} />,
      ...(testId && {
        testId: `${testId}.ok`,
      }),
    },
    {
      ...baseRadioProps,
      value: '4',
      label: formatMessage(messages.good),
      image: <Emoji src={Good} alt={formatMessage(messages.good)} />,
      ...(testId && {
        testId: `${testId}.good`,
      }),
    },
    {
      ...baseRadioProps,
      value: '5',
      label: formatMessage(messages.great),
      image: <Emoji src={Great} alt={formatMessage(messages.great)} />,
      ...(testId && {
        testId: `${testId}.great`,
      }),
    },
  ];

  const wrapperProps = {
    ...(testId && {
      'data-testid': testId,
    }),
  };

  return (
    <InputWrapper {...wrapperProps}>
      {radioProps.map(props => (
        <ImageRadio key={`image-radio--${props.value}`} {...props} />
      ))}
    </InputWrapper>
  );
};
