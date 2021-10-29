import { Options } from '../types';

import {
  DEFAULT_BUILD_CONTAINER_MEMORY_LIMIT,
  DEFAULT_ENVIRONMENTS,
  DEFAULT_MEMORY_LIMIT,
} from './const';

/**
 * Holds all information needed by the validator.
 */
export class ParsingState {
  private nextEnvironmentGroupAllowed = 0;
  private JSObject: any;
  private environments = [] as any;
  private customPipelines = false;

  constructor(options?: Options) {
    this.environments =
      options &&
      options.environments &&
      [].concat(...(options.environments || [])).length
        ? options.environments
        : DEFAULT_ENVIRONMENTS;
  }

  visitEnvironment(value: string): InvalidEnvironment | void {
    let environmentGroup = 0;
    const isDefinedEnvironment = this.environments.some(
      (group: any, groupIndex: number) => {
        if (group.indexOf(value) !== -1) {
          this.environments[groupIndex].splice(group.indexOf(value), 1);
          environmentGroup = groupIndex;
          return true;
        }
        return false;
      },
    );
    if (
      isDefinedEnvironment &&
      environmentGroup >= this.nextEnvironmentGroupAllowed
    ) {
      this.nextEnvironmentGroupAllowed = environmentGroup;
      return;
    }
    return new InvalidEnvironment();
  }

  setCustomPipelines(customStep: any): void {
    this.customPipelines = customStep;
  }

  hasCustomPipelines(): boolean {
    return this.customPipelines;
  }

  resetEnvironments(): void {
    this.nextEnvironmentGroupAllowed = 0;
  }

  setJSObject(JSObject: any): void {
    this.JSObject = JSObject;
    this.updateEnvironments();
  }

  getDefinitions() {
    return this.JSObject.definitions;
  }

  getOptions() {
    return this.JSObject.options;
  }

  getPipelines() {
    return this.JSObject.pipelines;
  }

  getCachesDefinitions(): string[] {
    let custom: string[] = [];

    const defaults = [
      'maven',
      'gradle',
      'node',
      'pip',
      'composer',
      'dotnetcore',
      'sbt',
      'ivy2',
      'docker',
    ];

    const definitions = this.getDefinitions();

    if (definitions && definitions.caches) {
      custom = Object.keys(definitions.caches);
    }

    return custom.concat(defaults);
  }

  getServicesDefinitions(): any {
    const allDefinitions = { docker: { memory: DEFAULT_MEMORY_LIMIT } } as any;
    const definitions = this.getDefinitions();

    if (definitions && definitions.services) {
      for (const key in definitions.services) {
        // overwrite defaults
        if (key) {
          allDefinitions[key] = definitions.services[key];
        }
      }
    }

    return allDefinitions;
  }

  getGlobalOptionsSize(): string | undefined {
    const options = this.getOptions();
    return options ? options.size : undefined;
  }

  getGlobalOptionsDocker(): boolean | undefined {
    const options = this.getOptions();
    return options ? options.docker : undefined;
  }

  getSumOfServicesMemory(services: string[]): number {
    let totalMemory = 0;
    services.forEach((service) => {
      const servicesDefinitions = this.getServicesDefinitions();
      if (servicesDefinitions && servicesDefinitions[service]) {
        const memory = servicesDefinitions[service].memory;
        totalMemory += memory ? memory : DEFAULT_MEMORY_LIMIT;
      }
    });
    return totalMemory;
  }

  updateEnvironments() {
    // if there are multiple pipelines allow for duplicate environment names
    let pipelinesSize = 1;
    try {
      pipelinesSize = Object.keys(this.JSObject.pipelines).length;
    } catch (ignore) {} // tslint:disable-line
    this.environments = this.environments.map((group: any) =>
      group.reduce(
        (res: any, current: any) =>
          res.concat(Array.from({ length: pipelinesSize }).map(() => current)),
        [],
      ),
    ) as any;
  }

  convertToSize(sizex?: string): number {
    return sizex === '2x' ? 2 : 1;
  }

  getBuildContainerMemoryLimit(stepSize?: string): number {
    return (
      this.convertToSize(stepSize || this.getGlobalOptionsSize()) *
      DEFAULT_BUILD_CONTAINER_MEMORY_LIMIT
    );
  }
}

export class InvalidEnvironment {
  constructor(public readonly validValues?: string[]) {}
}
