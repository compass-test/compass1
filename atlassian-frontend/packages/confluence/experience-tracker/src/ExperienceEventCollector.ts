import { Experience } from './Experience';
import { ExperienceEvent, hasName, isStop } from './ExperienceEvent';

export function collectAll(experienceNames: string[]) {
  const experienceNameSet = new Set(experienceNames);

  return (events: ExperienceEvent[], experience: Experience) => {
    // Fail as soon as any sub-experience is failed or aborted
    experience.stopOn(
      events.find(
        (event) =>
          experienceNameSet.has(event.name) &&
          (event.action === 'taskFail' || event.action === 'taskAbort'),
      ),
    );

    // If there's a success remove the experience from the set
    // of experiences we're waiting for.
    events.forEach((event) => {
      if (isStop(event)) {
        experienceNameSet.delete(event.name);
      }
    });

    // Experience is considered complete if all sub-experiences
    // are complete.
    if (experienceNameSet.size === 0) {
      experience.succeed();
    }
  };
}

export function collectAny(experienceNames: string[]) {
  return (events: ExperienceEvent[], experience: Experience) =>
    experience.stopOn(
      events.find(
        (event) => isStop(event) && hasName(event, ...experienceNames),
      ),
    );
}
