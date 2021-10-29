# Stricter Rules

This houses all repo-specific stricter rules that do not fall under the tech stack initiative.

All new rules should be written in TypeScript.

We implement the rules as a plugin over a rules directory to reduce boilerplate and make creating rules in typescript easier.

## CONTRIBUTING

⚠️ **New stricter rules need to be approved by the AFP Monorepo team** ⚠️

Add your rule to `./src/rules` as a folder with the name of the stricter rule (using kebab-case). If the folder is `validate-package-jsons` then the rule would be enabled with `@repo/rules/validate-package-jsons`.

The rule should be exported from an `index.ts` file and take this shape:

```TypeScript
import { RuleDefinition } from '../../types';

const ruleDefinition: RuleDefinition = {
  onProject: ({ files, dependencies, rootPath, config }) => {
    const errors: string[] = [];

    // Determine errors

    return errors;
  },
};

export default ruleDefinition;
```

This folder provides a wrapper over all exported rules that injects the list of all packages in the repo and the information contained in the root `teams.json`. See [types.ts](./src/types.ts) for what exactly is provided.

Most `onProject` rule functions return a list of strings that represent the errors to be logged to the console, however, rules can now return both an error message and function to run when `yarn lint:stricter --fix` is executed. The shape of the returned array looks like:

```TypeScript
Array<string | { message: string; fix: () => void; }>
```
