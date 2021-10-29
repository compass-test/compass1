/* eslint-disable no-else-return */
import isNumeric from 'validator/lib/isNumeric';

import { convertDateFormatToSlashes } from '../../../jira-common/utils/CommonUtils';
import { FormChoice, FormQuestionType } from '../../models/Form';

import {
  ChoiceValidationError,
  ChoiceValidationErrorMsg,
  DateTimeValidationError,
  DateTimeValidationErrorMsg,
  NumberValidationError,
  NumberValidationErrorMsg,
  TextValidationError,
  TextValidationErrorMsg,
  UserPickerValidationError,
  UserPickerValidationErrorMsg,
  ValidationErrorMsg,
} from './validationErrorMessages.intl';
import { wordCounter } from './wordCounter';

export const getTextValidation = (
  requirements: any,
  text: string,
  questionType?: FormQuestionType,
): TextValidationError[] | null => {
  const trimmedText = text.trim();
  let wordCount;
  if (requirements.mnw || requirements.mxw) {
    wordCount = wordCounter(trimmedText);
  }

  // text is empty AND a response is required (requirements.rq)
  if (trimmedText.length === 0) {
    if (requirements.rq) {
      return [{ message: ValidationErrorMsg.Required }];
    }
  } else {
    // the char count in the trimmed text does not match the char count in the validation rule
    if (
      requirements.mnc &&
      requirements.mnc === requirements.mxc &&
      trimmedText.length !== requirements.mnc
    ) {
      return [
        {
          message: TextValidationErrorMsg.ExactChars,
          data: { mnc: requirements.mnc },
        },
      ];
    }

    // the word count in the trimmed text does not match the word count in the validation rule
    if (
      requirements.mnw &&
      requirements.mnw === requirements.mxw &&
      wordCount !== requirements.mnw
    ) {
      return [
        {
          message: TextValidationErrorMsg.ExactWords,
          data: { mnw: requirements.mnw },
        },
      ];
    }

    // the char count in the trimmed text is outside the [min,max] range in the validation rule
    if (
      requirements.mnc &&
      requirements.mxc &&
      (trimmedText.length < requirements.mnc ||
        trimmedText.length > requirements.mxc)
    ) {
      return [
        {
          message: TextValidationErrorMsg.BetweenChars,
          data: { mnc: requirements.mnc, mxc: requirements.mxc },
        },
      ];
    }

    // the word count in the trimmed text is outside the [min,max] range in the validation rule
    if (
      requirements.mnw &&
      requirements.mxw &&
      wordCount &&
      (wordCount < requirements.mnw || wordCount > requirements.mxw)
    ) {
      return [
        {
          message: TextValidationErrorMsg.BetweenWords,
          data: { mnw: requirements.mnw, mxw: requirements.mxw },
        },
      ];
    }

    // the char count in the trimmed text is below the min value in the validation rule
    if (requirements.mnc && trimmedText.length < requirements.mnc) {
      return [
        {
          message: TextValidationErrorMsg.MinChars,
          data: { mnc: requirements.mnc - 1 },
        },
      ];
    } // Note: threshold is modified here to fit the validation error messages wording see (PF-1683)

    // the word count in the trimmed text is below the min value in the validation rule
    if (requirements.mnw && wordCount && wordCount < requirements.mnw) {
      return [
        {
          message: TextValidationErrorMsg.MinWords,
          data: { mnw: requirements.mnw - 1 },
        },
      ];
    } // Note: threshold is modified here to fit the validation error messages wording see (PF-1683)

    // the char count in the trimmed text is above the max value in the validation rule
    if (requirements.mxc && trimmedText.length > requirements.mxc) {
      return [
        {
          message: TextValidationErrorMsg.MaxChars,
          data: { mxc: requirements.mxc + 1 },
        },
      ];
    } // Note: threshold is modified here to fit the validation error messages wording see (PF-1683)

    // the word count in the trimmed text is above the max value in the validation rule
    if (requirements.mxw && wordCount && wordCount > requirements.mxw) {
      return [
        {
          message: TextValidationErrorMsg.MaxWords,
          data: { mxw: requirements.mxw + 1 },
        },
      ];
    } // Note: threshold is modified here to fit the validation error messages wording see (PF-1683)

    // a custom regex pattern was provided
    if (requirements.rgx && requirements.rgx.p) {
      try {
        // don't use the trimmedText for regex validation
        if (!text.match(requirements.rgx.p)) {
          if (questionType === FormQuestionType.TextUrl) {
            return [{ message: TextValidationErrorMsg.InvalidUrl }];
          }

          if (questionType === FormQuestionType.TextEmail) {
            return [{ message: TextValidationErrorMsg.InvalidEmail }];
          }

          if (requirements.rgx.m) {
            return [
              {
                message: TextValidationErrorMsg.RegexCustomMsg,
                data: { message: requirements.rgx.m },
              },
            ];
          }

          return [{ message: TextValidationErrorMsg.RegexDefaultMsg }];
        }
      } catch {
        // eslint-disable-next-line no-console
        console.log(`Invalid regex: ${requirements.rgx.p}`);

        return [{ message: TextValidationErrorMsg.RegexInvalidMsg }];
      }
    }
  }

  return null;
};

export const getNumberValidation = (
  requirements: any,
  value: string,
): NumberValidationError[] | null => {
  if (value.length > 0 && !isNumeric(value)) {
    return [{ message: NumberValidationErrorMsg.InvalidNum }];
  }

  // Remove number decorations
  const cleanNumber = value.replace(/[\,]/g, '');
  const number = parseFloat(cleanNumber);

  if (!value.length) {
    if (requirements.rq && value.length === 0) {
      return [{ message: ValidationErrorMsg.Required }];
    }
  } else {
    if (isNaN(number)) {
      return [{ message: NumberValidationErrorMsg.InvalidNum }];
    }

    if (requirements.wh && !Number.isInteger(number)) {
      return [{ message: NumberValidationErrorMsg.WholeNum }];
    }

    // Check equal
    if (
      requirements.mnn &&
      requirements.mnn === requirements.mxn &&
      number !== requirements.mnn
    ) {
      return [
        {
          message: NumberValidationErrorMsg.ExactNum,
          data: { mnn: requirements.mnn },
        },
      ];
    }

    // check between
    if (
      requirements.mnn &&
      requirements.mxn &&
      (number < requirements.mnn || number > requirements.mxn)
    ) {
      return [
        {
          message: NumberValidationErrorMsg.BetweenNum,
          data: { mnn: requirements.mnn, mxn: requirements.mxn },
        },
      ];
    }

    if (requirements.mnn && number < requirements.mnn) {
      return [
        {
          message: NumberValidationErrorMsg.MinNum,
          data: { mnn: requirements.mnn },
        },
      ];
    }

    if (requirements.mxn && number > requirements.mxn) {
      return [
        {
          message: NumberValidationErrorMsg.MaxNum,
          data: { mxn: requirements.mxn },
        },
      ];
    }
  }
  return null;
};

export const getDateValidation = (
  requirements: any,
  dateValue: string,
): DateTimeValidationError[] | null => {
  // Date values to be reused throughout the validation logic
  let minDate: Date | undefined;
  let maxDate: Date | undefined;
  let enteredDate: Date | undefined;

  if (requirements.mnd) {
    minDate = new Date(convertDateFormatToSlashes(requirements.mnd));
  }

  if (requirements.mxd) {
    maxDate = new Date(convertDateFormatToSlashes(requirements.mxd));
  }

  // Boolean values for validation logic
  const hasExactDateRequirements =
    requirements.mnd && requirements.mnd === requirements.mxd;
  const hasBetweenDateRequirements = !!requirements.mnd && !!requirements.mxd;

  // Check if empty
  if (!dateValue && requirements.rq) {
    return [{ message: ValidationErrorMsg.Required }];
  } else {
    enteredDate = new Date(convertDateFormatToSlashes(dateValue));
    const validationErrors: DateTimeValidationError[] = [];

    if (hasExactDateRequirements && minDate) {
      if (enteredDate.valueOf() !== minDate.valueOf()) {
        validationErrors.push({
          message: DateTimeValidationErrorMsg.ExactDate,
          data: { mnd: minDate },
        });
      } // No need to compare with both max and min again
    } else if (hasBetweenDateRequirements && minDate && maxDate) {
      // Between dates scenario
      if (enteredDate < minDate || enteredDate > maxDate) {
        validationErrors.push({
          message: DateTimeValidationErrorMsg.BetweenDate,
          data: { mnd: minDate, mxd: maxDate },
        });
      }
    } else {
      if (requirements.mnd && minDate) {
        if (enteredDate < minDate) {
          validationErrors.push({
            message: DateTimeValidationErrorMsg.MinDate,
            data: { mnd: minDate },
          });
        }
      }
      if (requirements.mxd && maxDate) {
        if (enteredDate > maxDate) {
          validationErrors.push({
            message: DateTimeValidationErrorMsg.MaxDate,
            data: { mxd: maxDate },
          });
        }
      }
    }
    if (validationErrors.length > 0) {
      return validationErrors;
    }
  }
  return null;
};

export const getTimeValidation = (
  requirements: any,
  timeValue: string,
): DateTimeValidationError[] | null => {
  if (!timeValue && requirements.rq) {
    return [{ message: ValidationErrorMsg.Required }];
  } else if (!!timeValue) {
    const time = new Date(`01/01/1999 ${timeValue}`); // Add arbitrary fixed date to allow Date() object creation
    const validationErrors:
      | [{ message: ValidationErrorMsg; data?: any }]
      | any[] = [];

    if (isNaN(time.getTime())) {
      // Check time is valid
      validationErrors.push({
        message: DateTimeValidationErrorMsg.InvalidTime,
      });
    } else if (requirements.mnt && requirements.mnt === requirements.mxt) {
      // Exact time scenario
      const minTime = new Date(`01/01/1999 ${requirements.mnt}`);
      if (time.getTime() !== minTime.getTime()) {
        validationErrors.push({
          message: DateTimeValidationErrorMsg.ExactTime,
          data: { mnt: minTime },
        });
      }
    } else if (requirements.mnt && requirements.mxt) {
      // Between times scenario
      const minTime = new Date(`01/01/1999 ${requirements.mnt}`);
      const maxTime = new Date(`01/01/1999 ${requirements.mxt}`);
      if (time < minTime || time > maxTime) {
        validationErrors.push({
          message: DateTimeValidationErrorMsg.BetweenTime,
          data: { mnt: minTime, mxt: maxTime },
        });
      }
    } else {
      if (requirements.mnt) {
        const minTime = new Date(`01/01/1999 ${requirements.mnt}`);
        if (time < minTime) {
          validationErrors.push({
            message: DateTimeValidationErrorMsg.MinTime,
            data: { mnt: minTime },
          });
        }
      }
      if (requirements.mxt) {
        const maxTime = new Date(`01/01/1999 ${requirements.mxt}`);
        if (time > maxTime) {
          validationErrors.push({
            message: DateTimeValidationErrorMsg.MaxTime,
            data: { mxt: maxTime },
          });
        }
      }
    }
    if (validationErrors.length > 0) {
      return validationErrors;
    }
  }
  return null;
};

export const getDateTimeValidation = (
  requirements: any,
  dateTime: { date: string; time: string },
): DateTimeValidationError[] | null => {
  // DateTime values to be reused throughout the validation logic
  let minDateTime: Date | undefined;
  let maxDateTime: Date | undefined;
  let enteredDateTime: Date | undefined;

  if (requirements.mnd && requirements.mnt) {
    minDateTime = new Date(
      `${convertDateFormatToSlashes(requirements.mnd)} ${requirements.mnt}`,
    );
  }

  if (requirements.mxd && requirements.mxt) {
    maxDateTime = new Date(
      `${convertDateFormatToSlashes(requirements.mxd)} ${requirements.mxt}`,
    );
  }

  if (dateTime.date) {
    enteredDateTime = new Date(
      `${convertDateFormatToSlashes(dateTime.date)} ${dateTime.time}`,
    );
  }

  // Boolean values for validation logic
  const hasMinDateTimeRequirements = !!requirements.mnd && !!requirements.mnt;
  const hasMaxDateTimeRequirements = !!requirements.mxd && !!requirements.mxt;
  const hasExactDateTimeRequirements =
    hasMinDateTimeRequirements &&
    requirements.mnd === requirements.mxd &&
    requirements.mnt === requirements.mxt;
  const hasBetweenDateTimeRequirements =
    hasMinDateTimeRequirements && hasMaxDateTimeRequirements;

  // Date or time required
  if (requirements.rq && (!dateTime.date || !dateTime.time)) {
    return [{ message: DateTimeValidationErrorMsg.RequiredDateTime }];
  }

  if (hasExactDateTimeRequirements && minDateTime && enteredDateTime) {
    if (enteredDateTime.valueOf() !== minDateTime.valueOf()) {
      return [
        {
          message: DateTimeValidationErrorMsg.ExactDateTime,
          data: {
            mnd: new Date(convertDateFormatToSlashes(requirements.mnd)),
            mnt: new Date(`01/01/1999 ${requirements.mnt}`),
          },
        },
      ];
    }
  } else if (
    hasBetweenDateTimeRequirements &&
    minDateTime &&
    maxDateTime &&
    enteredDateTime
  ) {
    if (enteredDateTime < minDateTime || enteredDateTime > maxDateTime) {
      return [
        {
          message: DateTimeValidationErrorMsg.BetweenDateTime,
          data: {
            mnd: new Date(convertDateFormatToSlashes(requirements.mnd)),
            mnt: new Date(`01/01/1999 ${requirements.mnt}`),
            mxd: new Date(convertDateFormatToSlashes(requirements.mxd)),
            mxt: new Date(`01/01/1999 ${requirements.mxt}`),
          },
        },
      ];
    }
  } else if (hasMinDateTimeRequirements || hasMaxDateTimeRequirements) {
    if (hasMinDateTimeRequirements && minDateTime && enteredDateTime) {
      if (enteredDateTime < minDateTime) {
        return [
          {
            message: DateTimeValidationErrorMsg.MinDateTime,
            data: {
              mnd: new Date(convertDateFormatToSlashes(requirements.mnd)),
              mnt: new Date(`01/01/1999 ${requirements.mnt}`),
            },
          },
        ];
      }
    }

    // Max Date and time
    if (hasMaxDateTimeRequirements && enteredDateTime && maxDateTime) {
      if (enteredDateTime > maxDateTime) {
        return [
          {
            message: DateTimeValidationErrorMsg.MaxDateTime,
            data: {
              mxd: new Date(convertDateFormatToSlashes(requirements.mxd)),
              mxt: new Date(`01/01/1999 ${requirements.mxt}`),
            },
          },
        ];
      }
    }
  } else {
    // Individual date and time validations

    const validationErrors: DateTimeValidationError[] = [];

    // Validate Date
    const dateValidationErrors = getDateValidation(requirements, dateTime.date);
    if (dateValidationErrors) {
      validationErrors.push(...dateValidationErrors);
    }

    // Validate Time
    const timeValidationErrors = getTimeValidation(requirements, dateTime.time);
    if (timeValidationErrors) {
      validationErrors.push(...timeValidationErrors);
    }

    if (validationErrors.length > 0) {
      return validationErrors;
    }
  }

  return null;
};

// Helper functions for choice validation

const choiceIsSelected = (selectedChoices: string[], choiceId: string) => {
  return selectedChoices.includes(choiceId);
};

export const getChoiceValidation = (
  requirements: any,
  choices: FormChoice[],
  choiceAnswers: { text: string; choices: string[] },
): ChoiceValidationError[] | null => {
  const numChoicesSelected = choiceAnswers.choices.length;
  // Validate required
  if (requirements.rq) {
    if (numChoicesSelected === 0) {
      return [{ message: ValidationErrorMsg.Required }];
    }
  }

  const validationErrors: ChoiceValidationError[] = [];

  if (numChoicesSelected !== 0) {
    if (requirements.mns && requirements.mns === requirements.mxs) {
      // Check for exact num of choices
      if (numChoicesSelected !== requirements.mns) {
        validationErrors.push({
          message: ChoiceValidationErrorMsg.ExactChoices,
          data: { mns: requirements.mns },
        });
      }
    } else if (requirements.mns && requirements.mxs) {
      // check for in between num of choices
      if (
        numChoicesSelected < requirements.mns ||
        numChoicesSelected > requirements.mxs
      ) {
        validationErrors.push({
          message: ChoiceValidationErrorMsg.BetweenChoices,
          data: { mns: requirements.mns, mxs: requirements.mxs },
        });
      }
    } else {
      // min or max num of choices
      if (requirements.mns && numChoicesSelected < requirements.mns) {
        validationErrors.push({
          message: ChoiceValidationErrorMsg.MinChoices,
          data: { mns: requirements.mns },
        });
      }

      if (requirements.mxs && numChoicesSelected > requirements.mxs) {
        validationErrors.push({
          message: ChoiceValidationErrorMsg.MaxChoices,
          data: { mxs: requirements.mxs },
        });
      }
    }

    if (requirements.ch) {
      // check for required choice
      const requiredChoice = choices.find(
        choice => choice.id === requirements.ch,
      );
      if (
        requiredChoice &&
        !choiceIsSelected(choiceAnswers.choices, requirements.ch)
      ) {
        validationErrors.push({
          message: ChoiceValidationErrorMsg.ReqChoice,
          data: { label: requiredChoice.label },
        });
      }
    }
  }

  if (validationErrors.length > 0) {
    return validationErrors;
  }

  return null;
};

export const getUserPickerValidation = (
  requirements: any,
  userPickerAnswers: { displayName: string; userIdentifier: string }[],
): UserPickerValidationError[] | null => {
  const numChoicesSelected = userPickerAnswers.length;

  if (requirements.rq) {
    if (numChoicesSelected === 0) {
      return [{ message: ValidationErrorMsg.Required }];
    }
  }

  const validationErrors: UserPickerValidationError[] = [];

  if (requirements.mns && requirements.mns === requirements.mxs) {
    // Check for exact num of choices
    if (numChoicesSelected !== requirements.mns) {
      validationErrors.push({
        message: UserPickerValidationErrorMsg.ExactChoices,
        data: { mns: requirements.mns },
      });
    }
  } else if (requirements.mns && requirements.mxs) {
    // check for in between num of choices
    if (
      numChoicesSelected < requirements.mns ||
      numChoicesSelected > requirements.mxs
    ) {
      validationErrors.push({
        message: UserPickerValidationErrorMsg.BetweenChoices,
        data: { mns: requirements.mns, mxs: requirements.mxs },
      });
    }
  } else {
    // min or max num of choices
    if (requirements.mns && numChoicesSelected < requirements.mns) {
      validationErrors.push({
        message: UserPickerValidationErrorMsg.MinChoices,
        data: { mns: requirements.mns },
      });
    }

    if (requirements.mxs && numChoicesSelected > requirements.mxs) {
      validationErrors.push({
        message: UserPickerValidationErrorMsg.MaxChoices,
        data: { mxs: requirements.mxs },
      });
    }
  }

  if (validationErrors.length > 0) {
    return validationErrors;
  }

  return null;
};
