import { BasePrompt } from 'enquirer';

declare module 'enquirer' {
  type AutoCompletePromptOptions = PromptOptions;

  export class AutoComplete extends BasePrompt {
    constructor(options?: PromptOptions);
    render(): void;
    run(): Promise<any>;
  }

  function prompt<T = object>(
    questions:
      | PromptOptions
      | ((this: Enquirer) => PromptOptions)
      | (PromptOptions | ((this: Enquirer) => PromptOptions))[],
  ): Promise<T>;
}
