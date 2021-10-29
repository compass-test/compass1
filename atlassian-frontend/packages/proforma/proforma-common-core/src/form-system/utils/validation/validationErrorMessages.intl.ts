import { defineMessages } from 'react-intl';

//
// ─── INTERFACES ─────────────────────────────────────────────────────────────────
//
export enum ValidationErrorMsg {
  Required = 'Required',
}

export interface ValidationError {
  message: ValidationErrorMsg.Required;
}

export enum NumberValidationErrorMsg {
  WholeNum = 'WholeNum',
  MinNum = 'MinNum',
  MaxNum = 'MaxNum',
  BetweenNum = 'BetweenNum',
  ExactNum = 'ExactNum',
  InvalidNum = 'InvalidNum',
}

export interface NumberValidationError {
  message: NumberValidationErrorMsg | ValidationErrorMsg.Required;
  data?: {
    mnn?: number;
    mxn?: number;
  };
}

export enum TextValidationErrorMsg {
  MinChars = 'MinChars',
  MaxChars = 'MaxChars',
  BetweenChars = 'BetweenChars',
  ExactChars = 'ExactChars',
  MinWords = 'MinWords',
  MaxWords = 'MaxWords',
  BetweenWords = 'BetweenWords',
  ExactWords = 'ExactWords',
  RegexCustomMsg = 'RegexCustomMsg',
  RegexDefaultMsg = 'RegexDefaultMSg',
  RegexInvalidMsg = 'RegexInvalidMsg',
  InvalidEmail = 'InvalidEmail',
  InvalidUrl = 'InvalidUrl',
}

export interface TextValidationError {
  message: TextValidationErrorMsg | ValidationErrorMsg.Required;
  data?: {
    mnc?: number;
    mxc?: number;
    mnw?: number;
    mxw?: number;
    message?: string;
  };
}

export enum DateTimeValidationErrorMsg {
  MinDate = 'MinDate',
  MaxDate = 'MaxDate',
  BetweenDate = 'BetweenDate',
  ExactDate = 'ExactDate',
  MinTime = 'MinTime',
  MaxTime = 'MaxTime',
  BetweenTime = 'BetweenTime',
  ExactTime = 'ExactTime',
  InvalidTime = 'InvalidTime',
  RequiredDateTime = 'RequiredDateTime',
  MinDateTime = 'MinDateTime',
  MaxDateTime = 'MaxDateTime',
  ExactDateTime = 'ExactDateTime',
  BetweenDateTime = 'BetweenDateTime',
}

export interface DateTimeValidationError {
  message: DateTimeValidationErrorMsg | ValidationErrorMsg.Required;
  data?: {
    mnd?: string | Date;
    mnt?: string | Date;
    mxd?: string | Date;
    mxt?: string | Date;
  };
}

export enum ChoiceValidationErrorMsg {
  MinChoices = 'MinChoices',
  MaxChoices = 'MaxChoices',
  ReqChoice = 'ReqChoice',
  ExactChoices = 'ExactChoices',
  BetweenChoices = 'BetweenChoices',
}

export interface ChoiceValidationError {
  message: ChoiceValidationErrorMsg | ValidationErrorMsg.Required;
  data?: {
    mns?: number;
    mxs?: number;
    ch?: number;
    label?: string;
  };
}

export enum UserPickerValidationErrorMsg {
  MinChoices = 'UpMinChoices',
  MaxChoices = 'UpMaxChoices',
  ExactChoices = 'UpExactChoices',
  BetweenChoices = 'UpBetweenChoices',
}

export interface UserPickerValidationError {
  message: UserPickerValidationErrorMsg | ValidationErrorMsg.Required;
  data?: {
    mns?: number;
    mxs?: number;
  };
}
//
// ─── MESSAGES ───────────────────────────────────────────────────────────────────
//
export const IntlValidationErrorMessages = defineMessages({
  //
  // General Validation messages
  //
  [ValidationErrorMsg.Required]: {
    id: 'form-system.validationErrorMsg.Required',
    defaultMessage: 'This field is required.',
  },
  //
  // Text Validation messages
  //
  [TextValidationErrorMsg.MinChars]: {
    id: 'form-system.validationErrorMsg.text.MinChars',
    defaultMessage: 'Must be more than {mnc} character(s).',
  },
  [TextValidationErrorMsg.MinWords]: {
    id: 'form-system.validationErrorMsg.text.MinWords',
    defaultMessage: 'Must be more than {mnw} word(s).',
  },
  [TextValidationErrorMsg.MaxChars]: {
    id: 'form-system.validationErrorMsg.text.MaxChars',
    defaultMessage: 'Must be less than {mxc} character(s).',
  },
  [TextValidationErrorMsg.MaxWords]: {
    id: 'form-system.validationErrorMsg.text.MaxWords',
    defaultMessage: 'Must be less than {mxw} word(s).',
  },
  [TextValidationErrorMsg.BetweenChars]: {
    id: 'form-system.validationErrorMsg.text.BetweenChars',
    defaultMessage: 'Must be between {mnc} and {mxc} characters.',
  },
  [TextValidationErrorMsg.ExactChars]: {
    id: 'form-system.validationErrorMsg.text.ExactChars',
    defaultMessage: 'Must be exactly {mnc} character(s).',
  },
  [TextValidationErrorMsg.BetweenWords]: {
    id: 'form-system.validationErrorMsg.text.BetweenWords',
    defaultMessage: 'Must be between {mnw} and {mxw} word(s).',
  },
  [TextValidationErrorMsg.ExactWords]: {
    id: 'form-system.validationErrorMsg.text.ExactWords',
    defaultMessage: 'Must be exactly {mnw} word(s).',
  },
  [TextValidationErrorMsg.RegexCustomMsg]: {
    id: 'form-system.validationErrorMsg.text.RegexCustomMsg',
    defaultMessage: '{message}',
  },
  [TextValidationErrorMsg.RegexDefaultMsg]: {
    id: 'form-system.validationErrorMsg.text.RegexDefaultMsg',
    defaultMessage: 'Response does not match required pattern.',
  },
  [TextValidationErrorMsg.RegexInvalidMsg]: {
    id: 'form-system.validationErrorMsg.text.RegexInvalidMsg',
    defaultMessage:
      'The regex pattern on this question is invalid. Answer unable to be validated.',
  },
  [TextValidationErrorMsg.InvalidEmail]: {
    id: 'form-system.validationErrorMsg.text.InvalidEmail',
    defaultMessage: 'Must be an email address',
  },
  [TextValidationErrorMsg.InvalidUrl]: {
    id: 'form-system.validationErrorMsg.text.InvalidUrl',
    defaultMessage: 'Must be a valid URL e.g. https://www.google.com/images',
  },

  //
  // Number validation messages
  //
  [NumberValidationErrorMsg.InvalidNum]: {
    id: 'form-system.validationErrorMsg.number.InvalidNum',
    defaultMessage: 'Please enter a valid number.',
  },
  [NumberValidationErrorMsg.WholeNum]: {
    id: 'form-system.validationErrorMsg.number.WholeNum',
    defaultMessage: 'Must be a whole number.',
  },
  [NumberValidationErrorMsg.MinNum]: {
    id: 'form-system.validationErrorMsg.number.MinNum',
    defaultMessage: 'Must be more than or equal to {mnn}.',
  },
  [NumberValidationErrorMsg.MaxNum]: {
    id: 'form-system.validationErrorMsg.number.MaxNum',
    defaultMessage: 'Must be less than or equal to {mxn}.',
  },
  [NumberValidationErrorMsg.BetweenNum]: {
    id: 'form-system.validationErrorMsg.number.BetweenNum',
    defaultMessage: 'Must be between {mnn} and {mxn}.',
  },
  [NumberValidationErrorMsg.ExactNum]: {
    id: 'form-system.validationErrorMsg.number.ExactNum',
    defaultMessage: 'Must be exactly {mnn}.',
  },
  //
  // DateTime validation messages
  //
  [DateTimeValidationErrorMsg.RequiredDateTime]: {
    id: 'form-system.validationErrorMsg.datetime.RequiredDateTime',
    defaultMessage: 'This field is required. Please specify a date and time.',
  },
  [DateTimeValidationErrorMsg.ExactDateTime]: {
    id: 'form-system.validationErrorMsg.datetime.ExactDateTime',
    defaultMessage:
      'The date and time must be exactly the {mnd, date, medium} at {mnt, time, short}.',
  },
  [DateTimeValidationErrorMsg.BetweenDateTime]: {
    id: 'form-system.validationErrorMsg.datetime.BetweenDateTime',
    defaultMessage:
      'The date and time must be between the {mnd, date, medium} at {mnt, time, short} and the {mxd, date, medium} at {mxt, time, short}.',
  },
  [DateTimeValidationErrorMsg.MinDateTime]: {
    id: 'form-system.validationErrorMsg.datetime.MinDateTime',
    defaultMessage:
      'The date and time must be on or after the {mnd, date, medium} at {mnt, time, short}.',
  },
  [DateTimeValidationErrorMsg.MaxDateTime]: {
    id: 'form-system.validationErrorMsg.datetime.MaxDateTime',
    defaultMessage:
      'The date and time must be on or before the {mxd, date, medium} at {mxt, time, short}.',
  },
  [DateTimeValidationErrorMsg.MinDate]: {
    id: 'form-system.validationErrorMsg.datetime.MinDate',
    defaultMessage: 'The date must be on or after {mnd, date, medium}.',
  },
  [DateTimeValidationErrorMsg.MaxDate]: {
    id: 'form-system.validationErrorMsg.datetime.MaxDate',
    defaultMessage: 'The date must be on or before {mxd, date, medium}.',
  },
  [DateTimeValidationErrorMsg.BetweenDate]: {
    id: 'form-system.validationErrorMsg.datetime.BetweenDate',
    defaultMessage:
      'The date must be between {mnd, date, medium} and {mxd, date, medium}.',
  },
  [DateTimeValidationErrorMsg.ExactDate]: {
    id: 'form-system.validationErrorMsg.datetime.ExactDate',
    defaultMessage: 'The date must be exactly {mnd, date, medium}.',
  },
  [DateTimeValidationErrorMsg.MinTime]: {
    id: 'form-system.validationErrorMsg.datetime.MinTime',
    defaultMessage: 'The time must be at or after {mnt, time, short}.',
  },
  [DateTimeValidationErrorMsg.MaxTime]: {
    id: 'form-system.validationErrorMsg.datetime.MaxTime',
    defaultMessage: 'The time must be at or before {mxt, time, short}.',
  },
  [DateTimeValidationErrorMsg.BetweenTime]: {
    id: 'form-system.validationErrorMsg.datetime.BetweenTime',
    defaultMessage:
      'The time must be between {mnt, time, short} and {mxt, time, short}.',
  },
  [DateTimeValidationErrorMsg.ExactTime]: {
    id: 'form-system.validationErrorMsg.datetime.ExactTime',
    defaultMessage: 'The time must be exactly {mnt, time, short}.',
  },
  [DateTimeValidationErrorMsg.InvalidTime]: {
    id: 'form-system.validationErrorMsg.datetime.InvalidTime',
    defaultMessage: 'The time is invalid.',
  },
  //
  // Choice validation messages
  //
  [ChoiceValidationErrorMsg.ExactChoices]: {
    id: 'form-system.validationErrorMsg.choice.ExactChoices',
    defaultMessage: 'Choose exactly {mns}.',
  },
  [ChoiceValidationErrorMsg.BetweenChoices]: {
    id: 'form-system.validationErrorMsg.choice.BetweenChoices',
    defaultMessage: 'Choose between {mns} and {mxs}.',
  },
  [ChoiceValidationErrorMsg.MinChoices]: {
    id: 'form-system.validationErrorMsg.choice.MinChoices',
    defaultMessage: 'Choose at least {mns}.',
  },
  [ChoiceValidationErrorMsg.MaxChoices]: {
    id: 'form-system.validationErrorMsg.choice.MaxChoices',
    defaultMessage: 'Choose no more than {mxs}.',
  },
  [ChoiceValidationErrorMsg.ReqChoice]: {
    id: 'form-system.validationErrorMsg.choice.ReqChoice',
    defaultMessage: "The '{label}' choice is required.",
  },
  //
  // User Picker validation messages
  //
  [UserPickerValidationErrorMsg.ExactChoices]: {
    id: 'form-system.validationErrorMsg.userpicker.ExactChoices',
    defaultMessage: 'Choose exactly {mns} user(s).',
  },
  [UserPickerValidationErrorMsg.BetweenChoices]: {
    id: 'form-system.validationErrorMsg.userpicker.BetweenChoices',
    defaultMessage: 'Choose between {mns} and {mxs} users.',
  },
  [UserPickerValidationErrorMsg.MinChoices]: {
    id: 'form-system.validationErrorMsg.userpicker.MinChoices',
    defaultMessage: 'Choose at least {mns} user(s).',
  },
  [UserPickerValidationErrorMsg.MaxChoices]: {
    id: 'form-system.validationErrorMsg.userpicker.MaxChoices',
    defaultMessage: 'Choose no more than {mxs} user(s).',
  },
});
