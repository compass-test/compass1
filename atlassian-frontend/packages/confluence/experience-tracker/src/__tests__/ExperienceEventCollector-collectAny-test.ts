import { collectAny } from '../ExperienceEventCollector';
import { ExperienceTracker, StartOptions } from '../ExperienceTracker';

let tracker: ExperienceTracker;
let subscriber: jest.Mock;
enum Experience {
  Main = 'main experience (compound)',
  SubExperience1 = 'secondary experience 1 (discrete)',
  SubExperience2 = 'secondary experience 2 (discrete)',
}

function startExperience(
  experience: Experience,
  collect?: StartOptions['collect'],
) {
  tracker.start({
    name: experience,
    id: experience,
    collect,
  });
}
function failExperience(experience: Experience) {
  tracker.fail({
    name: experience,
    error: new Error(),
  });
}
function abortExperience(experience: Experience) {
  tracker.abort({
    name: experience,
    reason: '',
  });
}
function succeedExperience(experience: Experience) {
  tracker.succeed({
    name: experience,
  });
}

function expectExperienceToSucceed(experience: Experience) {
  expect(subscriber).toHaveBeenCalledWith(
    expect.objectContaining({
      action: 'taskSuccess',
      id: experience,
      name: experience,
    }),
  );
}

function expectExperienceToFail(experience: Experience) {
  expect(subscriber).toHaveBeenCalledWith(
    expect.objectContaining({
      action: 'taskFail',
      id: experience,
      name: experience,
    }),
  );
}

function expectExperienceToAbort(experience: Experience) {
  expect(subscriber).toHaveBeenCalledWith(
    expect.objectContaining({
      action: 'taskAbort',
      id: experience,
      name: experience,
    }),
  );
}

beforeEach(() => {
  subscriber = jest.fn();
  tracker = new ExperienceTracker();
  tracker.subscribe(subscriber);
});

it('should succeed the main experience as soon as any of the sub-experiences succeed', () => {
  // Arrange
  startExperience(
    Experience.Main,
    collectAny([Experience.SubExperience1, Experience.SubExperience2]),
  );

  // Act
  startExperience(Experience.SubExperience1);
  succeedExperience(Experience.SubExperience1);

  // Assert
  expectExperienceToSucceed(Experience.Main);
});

it('should abort the main experience as soon as a collected sub-experience is aborted', () => {
  // Arrange
  startExperience(
    Experience.Main,
    collectAny([Experience.SubExperience1, Experience.SubExperience2]),
  );

  // Act
  startExperience(Experience.SubExperience1);
  abortExperience(Experience.SubExperience1);

  // Assert
  expectExperienceToAbort(Experience.Main);
});

it('should fail the main experience as soon as a collected sub-experience is failed', () => {
  // Arrange
  startExperience(
    Experience.Main,
    collectAny([Experience.SubExperience1, Experience.SubExperience2]),
  );

  // Act
  startExperience(Experience.SubExperience1);
  failExperience(Experience.SubExperience1);

  // Assert
  expectExperienceToFail(Experience.Main);
});
