import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

export class Service {
  readonly name: string = '';
  readonly origin: string = '';
  readonly uuid: string = '';
  // flattened props
  readonly 'image.name': string = '';
  readonly 'resource_limits.memory_limit_in_megabytes': number = 0;
  readonly 'resource_limits.cpu_limit_in_millicores': number = 0;

  constructor(props: Partial<Service> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
    });
    Object.freeze(this);
  }

  get imageName() {
    return this['image.name'];
  }

  get memoryLimitInMegabytes(): number {
    return this['resource_limits.memory_limit_in_megabytes'];
  }

  get cpuLimitInMilicores(): number {
    return this['resource_limits.cpu_limit_in_millicores'];
  }
}
