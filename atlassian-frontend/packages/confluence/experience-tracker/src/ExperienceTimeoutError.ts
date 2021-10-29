export class ExperienceTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExperienceTimeoutError';
  }
}
