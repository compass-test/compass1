import chalk from 'chalk';
import { askConfirm, askSelect, askInput } from './prompt';
import { UserInputType, Query, Decision, Flags } from './types';

export const DECISIONS: Map<keyof UserInputType, Decision> = new Map();

export const ANSWERS = {
  TASK_DEPENDENCY_UPGRADE: 'Dependency upgrade',
  TASK_CONFIGURATION_CHANGE: 'Configuration change',
  ROLLOUT_SINGLE: 'Single rollout (monolithic PR)',
  ROLLOUT_PER_TEAM: 'One pull request per team (for all of their packages)',
  ROLLOUT_PER_PACKAGE:
    'One pull request per package (potentially multiple PRs per team)',
};

function addDecision(decision: Decision) {
  DECISIONS.set(decision.key, decision);
  decision.prev = () => undefined;
  decision.next = () => {
    const nextDecisionKey = decision.nextKey(decision.answer!);
    if (nextDecisionKey && DECISIONS.has(nextDecisionKey)) {
      return DECISIONS.get(nextDecisionKey);
    }
  };
  if (!decision.setUserInput) {
    // Set default implementation
    decision.setUserInput = (userInput: UserInputType) => {
      if (typeof decision.answer === 'boolean') {
        (userInput[decision.key] as boolean) = decision.answer;
      } else if (typeof decision.answer === 'string') {
        (userInput[decision.key] as string) = decision.answer;
      } else if (Array.isArray(decision.answer)) {
        (userInput[decision.key] as string[]) = decision.answer;
      }
    };
  }
}

export async function startDecisionTree(flags: Flags): Promise<UserInputType> {
  if (flags.debug) {
    // eslint-disable-next-line no-console
    console.log(
      chalk.magenta('Debug mode: WIP prefixes will be used on generated PRs'),
    );
  }
  const sequence = await askQuestion(DECISIONS.get('task')!);
  const summary = sequence.map(decision => {
    const { answer } = decision;
    const { query } = decision.question;
    const q = typeof query === 'string' ? query : query.question;
    const a =
      typeof answer === 'boolean'
        ? answer === true
          ? 'Yes'
          : 'No'
        : (Array.isArray(answer) ? answer.join(', ') : answer) || '';
    return `${chalk.bold(q)}\n${chalk.green(a)}`;
  });
  const proceed = await askConfirm(
    [
      chalk.magenta('Confirm summary:'),
      ...summary,
      chalk.magenta('Is this correct?'),
    ].join('\n'),
  );
  if (proceed) {
    const userInput: UserInputType = sequence.reduce((acc, item) => {
      item.setUserInput && item.setUserInput(acc);
      return acc;
    }, {});
    return userInput;
  }
  // Start over with prefilled answers
  return startDecisionTree(flags);
}

function getQuestionText(query: Query | string) {
  let question: string;
  if (typeof query === 'string') {
    question = query;
  } else {
    question = `${query.question}\n`;
    if (query.context) {
      const context: string =
        typeof query.context === 'string'
          ? query.context
          : query.context.join('\n');
      question = `${question}${context}\n`;
    }
  }
  return question;
}

export async function askQuestion(
  decision: Decision,
  sequence: Decision[] = [],
): Promise<Decision[]> {
  // Set previous decision
  if (sequence.length > 0) {
    decision.prev = () => sequence[sequence.length - 1];
  }

  // Store order the qustion was asked in
  sequence.push(decision);

  // Construct question
  const {
    answer,
    question: { type, query },
  } = decision;
  const question = getQuestionText(query);

  // Ask question
  switch (type) {
    case 'confirm':
      decision.answer = await askConfirm(question, answer as boolean);
      break;
    case 'input':
      decision.answer = await askInput(question, answer as string);
      break;
    case 'select':
    case 'select-multi':
      const { choices } = decision.question;
      if (!choices) {
        throw new Error("A 'select' question must provide choices.");
      }
      const isMulti = type === 'select-multi';
      const initial = isMulti
        ? undefined // TODO: answers for multi select
        : choices.findIndex(choice => choice.value === answer);
      decision.answer = await askSelect(question, choices, initial, isMulti);
      break;
  }
  if (decision.answer === undefined) {
    throw new Error('Missing answer for the question.');
  }
  const nextDecision = decision.next && decision.next();
  if (nextDecision) {
    // Ask next question recursively
    return askQuestion(nextDecision, sequence);
  }

  // All questions have been asked. Return the sequence.
  return sequence;
}

addDecision({
  key: 'task',
  question: {
    type: 'select',
    query: {
      question: 'Which task do you wish to perform?',
    },
    choices: [
      {
        value: ANSWERS.TASK_DEPENDENCY_UPGRADE,
        nextDecisionKey: 'allDependencies',
      },
      { value: ANSWERS.TASK_CONFIGURATION_CHANGE },
    ],
  },
  nextKey(answer) {
    return this.question.choices?.find(choice => choice.value === answer)
      ?.nextDecisionKey;
  },
  next: () => undefined,
});

addDecision({
  key: 'allDependencies',
  question: {
    type: 'input',
    query: {
      question: 'Which dependencies do you wish to upgrade?',
      context: [
        chalk.italic(
          'Please provide as a comma separated list of scoped packages including their version range.',
        ),
        chalk.grey(
          'e.g. react@^17.0.0, react-dom@^17.0.0, @types/react@^17.0.0, @types/react-dom@^17.0.0',
        ),
      ],
    },
  },
  nextKey() {
    return 'hasSingletons';
  },
  setUserInput(userInput) {
    userInput.allDependencies = (this.answer as string)
      .split(',')
      .map(x => x.trim());
  },
});

addDecision({
  key: 'hasSingletons',
  question: {
    type: 'confirm',
    query: {
      question: 'Are any of these libs singletons?',
      context: chalk.grey(
        `e.g. a library that doesn't support multiple versions of itself`,
      ),
    },
  },
  nextKey(answer) {
    return answer ? 'upgradeIdentifier' : 'hasPostUpgradeTasks';
  },
});

addDecision({
  key: 'upgradeIdentifier',
  question: {
    type: 'input',
    query: {
      question: 'Please provide an human readable identifier for this upgrade',
      context: chalk.grey(
        `This key will be used as a prefix on generated build pipelines`,
      ),
    },
  },
  nextKey() {
    return 'hasPostUpgradeTasks';
  },
});

addDecision({
  key: 'rolloutStrategy',
  question: {
    type: 'select',
    query: {
      question: 'How should the rollout be split?',
    },
    choices: [
      { value: ANSWERS.ROLLOUT_SINGLE },
      {
        value: ANSWERS.ROLLOUT_PER_TEAM,
      },
      {
        value: ANSWERS.ROLLOUT_PER_PACKAGE,
      },
    ],
  },
  nextKey(answer) {
    return this.question.choices?.find(choice => choice.value === answer)
      ?.nextDecisionKey;
  },
});

addDecision({
  key: 'hasPostUpgradeTasks',
  question: {
    type: 'confirm',
    query: {
      question: 'Do you require post upgrade tasks?',
      context: chalk.grey(`e.g. to run a script, or codemod.`),
    },
  },
  nextKey() {
    return 'rolloutStrategy';
  },
});
