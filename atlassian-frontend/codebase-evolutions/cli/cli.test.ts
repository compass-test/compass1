import enquirer from 'enquirer';
import { startDecisionTree } from './constants';
import type { Answer } from './types';
import {
  makeSequenceInOrder,
  convertToUserInput,
  DEP_UPGRADE_SINGLE_ROLLOUT,
  DEP_UPGRADE_PACKAGE_ROLLOUT,
  DEP_UPGRADE_TEAM_ROLLOUT,
} from './__fixtures__/cli-answers';

function mockAnswers(answers: Answer[] = []) {
  const spy = jest.spyOn(enquirer.prototype, 'prompt');
  spy.mockImplementation(() => {
    throw new Error('Unmocked answers...');
  });
  answers.forEach(answer => {
    spy.mockImplementationOnce(() => Promise.resolve({ answer }));
  });
  return spy;
}

describe('get user input from cli', () => {
  let answersSpy: jest.SpyInstance;
  beforeAll(() => {
    answersSpy = mockAnswers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    answersSpy.mockReset();
  });

  it('should return dependency upgrade/singletons/identifier/post tasks/single rollout/no debug', async () => {
    answersSpy = mockAnswers(makeSequenceInOrder(DEP_UPGRADE_SINGLE_ROLLOUT));
    const userInput = await startDecisionTree({
      debug: false,
    });
    expect(userInput).toEqual(
      expect.objectContaining(convertToUserInput(DEP_UPGRADE_SINGLE_ROLLOUT)),
    );
  });

  it('should return dependency upgrade/no singletons/post tasks/per package rollout/debug', async () => {
    answersSpy = mockAnswers(makeSequenceInOrder(DEP_UPGRADE_PACKAGE_ROLLOUT));
    const userInput = await startDecisionTree({
      debug: true,
    });
    expect(userInput).toEqual(
      expect.objectContaining(convertToUserInput(DEP_UPGRADE_PACKAGE_ROLLOUT)),
    );
  });

  it('should return dependency upgrade/no singletons/no post tasks/per team rollout/debug/retry', async () => {
    answersSpy = mockAnswers([
      ...makeSequenceInOrder(DEP_UPGRADE_PACKAGE_ROLLOUT, false),
      ...makeSequenceInOrder(DEP_UPGRADE_TEAM_ROLLOUT),
    ]);
    const userInput = await startDecisionTree({
      debug: true,
    });
    expect(userInput).toEqual(
      expect.objectContaining(convertToUserInput(DEP_UPGRADE_TEAM_ROLLOUT)),
    );
  });
});
