import { GuardPolicy } from '../constants';
export const InvalidPolicyErrorName = 'InvalidPolicyError';

export default class InvalidPolicyError extends Error {
  constructor(policy: GuardPolicy, method: string) {
    super(`Method '${method}' cannot be called with policy '${policy}'.`);
    this.name = InvalidPolicyErrorName;
  }
}
