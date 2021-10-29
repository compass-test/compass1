import { prompt } from 'enquirer';
import type { ConfirmResponse, InputResponse, SelectResponse } from './types';

export async function askConfirm(message: string, initial = false) {
  const response = await prompt<ConfirmResponse>({
    message,
    name: 'answer',
    type: 'confirm',
    initial,
  });
  return response.answer;
}

export async function askInput(
  message: string,
  initial = '',
  validate?: (x: string) => string | boolean,
) {
  const response = await prompt<InputResponse>({
    message,
    name: 'answer',
    type: 'input',
    validate,
    initial,
  });
  return response.answer;
}

export async function askSelect(
  message: string,
  choices: any[],
  initial = 0,
  multiple = false,
) {
  const response = await prompt<SelectResponse>({
    type: 'autocomplete',
    name: 'answer',
    message,
    choices,
    initial,
    multiple,
  });
  return response.answer;
}
